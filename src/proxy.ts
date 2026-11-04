import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  isSupabaseConfigured,
  requireSupabaseConfig,
} from "@/lib/supabase/config";

const LOGIN_PATH = "/login";
const LEARNING_PREFIX = "/preview";
const CACHE_HEADERS = ["cache-control", "expires", "pragma"] as const;

function isLearningPath(pathname: string) {
  return (
    pathname === LEARNING_PREFIX ||
    pathname.startsWith(`${LEARNING_PREFIX}/`)
  );
}

function safeNextPath(value: string | null) {
  if (!value) return null;
  if (!value.startsWith("/") || value.startsWith("//")) return null;
  if (value === LOGIN_PATH || value.startsWith(`${LOGIN_PATH}?`)) return null;
  return value;
}

/**
 * Redirect sambil tetap membawa cookie sesi yang baru disegarkan. Kalau cookie
 * ini hilang, pengguna akan ter-logout pada request berikutnya.
 */
function redirectWithSession(url: URL, response: NextResponse) {
  const redirect = NextResponse.redirect(url);

  response.cookies
    .getAll()
    .forEach((cookie) => redirect.cookies.set(cookie));

  for (const header of CACHE_HEADERS) {
    const value = response.headers.get(header);
    if (value) redirect.headers.set(header, value);
  }

  return redirect;
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const learning = isLearningPath(pathname);
  const login = pathname === LOGIN_PATH;

  if (!learning && !login) {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = LOGIN_PATH;
  loginUrl.search = "";
  loginUrl.searchParams.set("next", pathname + search);

  if (!isSupabaseConfigured) {
    if (login) return NextResponse.next();

    loginUrl.searchParams.set("error", "config");
    return NextResponse.redirect(loginUrl);
  }

  const { url, key } = requireSupabaseConfig();
  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );

        response = NextResponse.next({ request });

        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );

        Object.entries(headers).forEach(([header, value]) =>
          response.headers.set(header, value),
        );
      },
    },
  });

  // getClaims() memverifikasi tanda tangan JWT, bukan sekadar membaca cookie.
  let signedIn = false;

  try {
    const { data } = await supabase.auth.getClaims();
    signedIn = Boolean(data?.claims?.sub);
  } catch {
    // Auth tidak terjangkau: perlakukan sebagai belum masuk, jangan buka rute.
    signedIn = false;
  }

  if (!signedIn && learning) {
    return redirectWithSession(loginUrl, response);
  }

  if (signedIn && login) {
    const destination =
      safeNextPath(request.nextUrl.searchParams.get("next")) ??
      LEARNING_PREFIX;

    return redirectWithSession(
      new URL(destination, request.url),
      response,
    );
  }

  return response;
}

export const config = {
  matcher: ["/preview/:path*", "/login"],
};
