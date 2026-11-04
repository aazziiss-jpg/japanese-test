"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowGlyph, Button } from "@/components/ui/button";
import { CodeInput } from "@/components/auth/code-input";
import { PasswordInput } from "@/components/auth/password-input";
import { FormError } from "@/components/auth/form-message";
import { authErrorMessage } from "@/components/auth/auth-errors";
import {
  fieldClasses,
  helperClasses,
  labelClasses,
} from "@/components/auth/field-styles";
import { nextPath } from "@/components/auth/next-path";
import { createClient } from "@/lib/supabase/client";

type Step = "details" | "code";

const RESEND_SECONDS = 60;

export function RegisterForm({ onLogin }: { onLogin: () => void }) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("details");
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setTimeout(
      () => setCooldown((value) => value - 1),
      1000,
    );
    return () => window.clearTimeout(timer);
  }, [cooldown]);

  async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const formData = new FormData(event.currentTarget);
    const emailValue = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirm = String(formData.get("confirm") ?? "");

    setError(null);

    if (password.length < 8) {
      setError("Kata sandi minimal 8 karakter.");
      return;
    }

    if (password !== confirm) {
      setError("Konfirmasi kata sandi belum sama.");
      return;
    }

    setPending(true);

    try {
      const supabase = createClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: emailValue,
        password,
      });

      if (signUpError) {
        setError(
          authErrorMessage(
            signUpError.code,
            "Gagal membuat akun. Periksa koneksi lalu coba lagi.",
          ),
        );
        setPending(false);
        return;
      }

      // "Confirm email" dimatikan: Supabase langsung memberi sesi.
      if (data.session) {
        router.replace(nextPath());
        router.refresh();
        return;
      }

      // Email sudah terdaftar: Supabase mengembalikan user palsu tanpa identitas.
      if (data.user && data.user.identities?.length === 0) {
        setError(
          "Email ini sudah terdaftar. Coba masuk atau atur ulang kata sandi.",
        );
        setPending(false);
        return;
      }

      setEmail(emailValue);
      setCooldown(RESEND_SECONDS);
      setStep("code");
      setPending(false);
    } catch {
      setError("Gagal menghubungi server. Coba lagi sebentar lagi.");
      setPending(false);
    }
  }

  async function handleVerify(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const formData = new FormData(event.currentTarget);
    const token = String(formData.get("code") ?? "").trim();

    setError(null);

    if (!/^\d{6}$/.test(token)) {
      setError("Masukkan 6 angka kode verifikasi.");
      return;
    }

    setPending(true);

    try {
      const { error: verifyError } = await createClient().auth.verifyOtp({
        email,
        token,
        type: "signup",
      });

      if (verifyError) {
        setError(
          authErrorMessage(
            verifyError.code,
            "Kode verifikasi salah atau sudah kedaluwarsa.",
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

  async function handleResend() {
    if (pending || cooldown > 0) return;

    setError(null);
    setPending(true);

    try {
      const { error: resendError } = await createClient().auth.resend({
        type: "signup",
        email,
      });

      if (resendError) {
        setError(
          authErrorMessage(
            resendError.code,
            "Gagal mengirim ulang kode. Coba lagi nanti.",
          ),
        );
        setPending(false);
        return;
      }

      setCooldown(RESEND_SECONDS);
      setPending(false);
    } catch {
      setError("Gagal menghubungi server. Coba lagi sebentar lagi.");
      setPending(false);
    }
  }

  if (step === "code") {
    return (
      <form className="mt-7 flex flex-col gap-5" onSubmit={handleVerify}>
        <div className="border border-line bg-paper-raised px-3 py-2.5 text-[12px] leading-relaxed text-ink-muted">
          Kode 6 angka dikirim ke{" "}
          <span className="text-ink">{email}</span>. Periksa kotak masuk atau
          folder spam.
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="register-code" className={labelClasses}>
            Kode verifikasi
          </label>
          <CodeInput
            id="register-code"
            name="code"
            autoFocus
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
          {pending ? "Memverifikasi…" : "Verifikasi & aktifkan"}
          <ArrowGlyph />
        </Button>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5 text-[12px]">
          <button
            type="button"
            onClick={handleResend}
            disabled={pending || cooldown > 0}
            className="text-ink-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-ink disabled:no-underline disabled:opacity-50"
          >
            {cooldown > 0 ? `Kirim ulang dalam ${cooldown} dtk` : "Kirim ulang kode"}
          </button>
          <button
            type="button"
            onClick={() => {
              setError(null);
              setStep("details");
            }}
            className="text-ink-muted transition-colors hover:text-ink"
          >
            Ganti email
          </button>
        </div>
      </form>
    );
  }

  return (
    <form className="mt-7 flex flex-col gap-5" onSubmit={handleSignUp}>
      <div className="flex flex-col gap-2">
        <label htmlFor="register-email" className={labelClasses}>
          Email
        </label>
        <input
          id="register-email"
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
        <label htmlFor="register-password" className={labelClasses}>
          Kata sandi
        </label>
        <PasswordInput
          id="register-password"
          name="password"
          autoComplete="new-password"
          placeholder="Minimal 8 karakter"
          minLength={8}
          required
          aria-invalid={error ? true : undefined}
        />
        <p className={helperClasses}>
          Gunakan minimal 8 karakter, campur huruf dan angka.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="register-confirm" className={labelClasses}>
          Ulangi kata sandi
        </label>
        <PasswordInput
          id="register-confirm"
          name="confirm"
          autoComplete="new-password"
          placeholder="••••••••"
          minLength={8}
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
        {pending ? "Membuat akun…" : "Daftar"}
        <ArrowGlyph />
      </Button>

      <p className="border-t border-line pt-5 text-center text-[12px] text-ink-muted">
        Sudah punya akun?{" "}
        <button
          type="button"
          onClick={onLogin}
          className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
        >
          Masuk
        </button>
      </p>
    </form>
  );
}
