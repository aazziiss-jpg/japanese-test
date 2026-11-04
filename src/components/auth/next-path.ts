export function nextPath() {
  if (typeof window === "undefined") return "/preview";

  const value = new URLSearchParams(window.location.search).get("next");

  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\")
  ) {
    return "/preview";
  }

  if (value === "/login" || value.startsWith("/login?") || value === "/daftar") {
    return "/preview";
  }

  return value;
}
