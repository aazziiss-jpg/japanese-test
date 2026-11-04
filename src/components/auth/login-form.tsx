"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowGlyph, Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/auth/password-input";
import { FormError } from "@/components/auth/form-message";
import { authErrorMessage } from "@/components/auth/auth-errors";
import { fieldClasses, labelClasses } from "@/components/auth/field-styles";
import { nextPath } from "@/components/auth/next-path";
import { createClient } from "@/lib/supabase/client";

export function LoginForm({
  onForgot,
  onRegister,
}: {
  onForgot: () => void;
  onRegister: () => void;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    setError(null);
    setPending(true);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(
          authErrorMessage(
            signInError.code,
            "Gagal masuk. Periksa koneksi lalu coba lagi.",
          ),
        );
        setPending(false);
        return;
      }

      router.replace(nextPath());
      router.refresh();
    } catch {
      setError("Gagal menghubungi server. Coba lagi sebentar lagi.");
      setPending(false);
    }
  }

  return (
    <form className="mt-7 flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor="login-email" className={labelClasses}>
          Email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="nama@contoh.com"
          required
          aria-invalid={error ? true : undefined}
          className={fieldClasses}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor="login-password" className={labelClasses}>
            Kata sandi
          </label>
          <button
            type="button"
            onClick={onForgot}
            className="text-[11px] text-ink-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
          >
            Lupa kata sandi?
          </button>
        </div>
        <PasswordInput
          id="login-password"
          name="password"
          autoComplete="current-password"
          placeholder="••••••••"
          required
          aria-invalid={error ? true : undefined}
        />
      </div>

      {error ? <FormError>{error}</FormError> : null}

      <Button
        type="submit"
        size="lg"
        className="mt-1 w-full"
        disabled={pending}
      >
        {pending ? "Memproses…" : "Masuk"}
        <ArrowGlyph />
      </Button>

      <p className="border-t border-line pt-5 text-center text-[12px] text-ink-muted">
        Belum punya akun?{" "}
        <button
          type="button"
          onClick={onRegister}
          className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
        >
          Daftar
        </button>
      </p>
    </form>
  );
}
