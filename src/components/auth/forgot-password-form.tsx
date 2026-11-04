"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowGlyph, Button } from "@/components/ui/button";
import { CodeInput } from "@/components/auth/code-input";
import { PasswordInput } from "@/components/auth/password-input";
import {
  FormError,
  FormSuccess,
} from "@/components/auth/form-message";
import { authErrorMessage } from "@/components/auth/auth-errors";
import {
  fieldClasses,
  helperClasses,
  labelClasses,
} from "@/components/auth/field-styles";
import { nextPath } from "@/components/auth/next-path";
import { createClient } from "@/lib/supabase/client";

type Step = "email" | "reset";

const RESEND_SECONDS = 60;

export function ForgotPasswordForm({ onBack }: { onBack: () => void }) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setTimeout(
      () => setCooldown((value) => value - 1),
      1000,
    );
    return () => window.clearTimeout(timer);
  }, [cooldown]);

  async function sendCode(target: string) {
    const { error: sendError } =
      await createClient().auth.resetPasswordForEmail(target);

    if (sendError) {
      setError(
        authErrorMessage(
          sendError.code,
          "Gagal mengirim kode. Periksa email lalu coba lagi.",
        ),
      );
      return false;
    }

    setCooldown(RESEND_SECONDS);
    return true;
  }

  async function handleRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const formData = new FormData(event.currentTarget);
    const emailValue = String(formData.get("email") ?? "").trim();

    setError(null);
    setPending(true);

    try {
      if (!(await sendCode(emailValue))) {
        setPending(false);
        return;
      }

      setEmail(emailValue);
      setStep("reset");
      setPending(false);
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
      if (await sendCode(email)) {
        setNotice("Kode baru sudah dikirim. Periksa kotak masukmu.");
      }
      setPending(false);
    } catch {
      setError("Gagal menghubungi server. Coba lagi sebentar lagi.");
      setPending(false);
    }
  }

  async function handleReset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const formData = new FormData(event.currentTarget);
    const token = String(formData.get("code") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirm = String(formData.get("confirm") ?? "");

    setError(null);
    setNotice(null);

    if (!/^\d{6}$/.test(token)) {
      setError("Masukkan 6 angka kode verifikasi.");
      return;
    }

    if (password.length < 8) {
      setError("Kata sandi baru minimal 8 karakter.");
      return;
    }

    if (password !== confirm) {
      setError("Konfirmasi kata sandi belum sama.");
      return;
    }

    setPending(true);

    try {
      const supabase = createClient();
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "recovery",
      });

      if (verifyError) {
        setError(
          authErrorMessage(
            verifyError.code,
            "Kode salah atau sudah kedaluwarsa. Minta kode baru.",
          ),
        );
        setPending(false);
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(
          authErrorMessage(
            updateError.code,
            "Kata sandi gagal diperbarui. Coba lagi.",
          ),
        );
        setPending(false);
        return;
      }

      // Pemulihan sudah memberi sesi; lanjutkan ke halaman tujuan.
      router.replace(nextPath());
      router.refresh();
    } catch {
      setError("Gagal menghubungi server. Coba lagi sebentar lagi.");
      setPending(false);
    }
  }

  if (step === "reset") {
    return (
      <form className="mt-7 flex flex-col gap-5" onSubmit={handleReset}>
        <div className="border border-line bg-paper-raised px-3 py-2.5 text-[12px] leading-relaxed text-ink-muted">
          Kode 6 angka dikirim ke <span className="text-ink">{email}</span>.
          Masukkan kode itu bersama kata sandi baru.
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="reset-code" className={labelClasses}>
            Kode verifikasi
          </label>
          <CodeInput
            id="reset-code"
            name="code"
            autoFocus
            required
            aria-invalid={error ? true : undefined}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="reset-password" className={labelClasses}>
            Kata sandi baru
          </label>
          <PasswordInput
            id="reset-password"
            name="password"
            autoComplete="new-password"
            placeholder="Minimal 8 karakter"
            minLength={8}
            required
            aria-invalid={error ? true : undefined}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="reset-confirm" className={labelClasses}>
            Ulangi kata sandi baru
          </label>
          <PasswordInput
            id="reset-confirm"
            name="confirm"
            autoComplete="new-password"
            placeholder="••••••••"
            minLength={8}
            required
            aria-invalid={error ? true : undefined}
          />
          <p className={helperClasses}>
            Setelah berhasil, kamu langsung masuk dengan kata sandi baru.
          </p>
        </div>

        {error ? <FormError>{error}</FormError> : null}
        {notice ? <FormSuccess>{notice}</FormSuccess> : null}

        <Button
          type="submit"
          size="lg"
          className="mt-1 w-full"
          disabled={pending}
        >
          {pending ? "Menyimpan…" : "Simpan kata sandi baru"}
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
              setNotice(null);
              setStep("email");
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
    <form className="mt-7 flex flex-col gap-5" onSubmit={handleRequest}>
      <div className="flex flex-col gap-2">
        <label htmlFor="forgot-email" className={labelClasses}>
          Email terdaftar
        </label>
        <input
          id="forgot-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="nama@contoh.com"
          required
          aria-invalid={error ? true : undefined}
          className={fieldClasses}
        />
        <p className={helperClasses}>
          Kami kirim kode 6 angka untuk membuat kata sandi baru.
        </p>
      </div>

      {error ? <FormError>{error}</FormError> : null}

      <Button
        type="submit"
        size="lg"
        className="mt-1 w-full"
        disabled={pending}
      >
        {pending ? "Mengirim kode…" : "Kirim kode verifikasi"}
        <ArrowGlyph />
      </Button>

      <p className="border-t border-line pt-5 text-center text-[12px] text-ink-muted">
        Ingat kata sandinya?{" "}
        <button
          type="button"
          onClick={onBack}
          className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
        >
          Kembali masuk
        </button>
      </p>
    </form>
  );
}
