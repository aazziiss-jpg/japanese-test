"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

type Mode = "login" | "register" | "forgot";

const COPY: Record<
  Mode,
  { eyebrow: string; title: string; description: string }
> = {
  login: {
    eyebrow: "アカウント · Akun",
    title: "Selamat datang kembali.",
    description:
      "Masuk untuk melanjutkan pelajaran, ulangan, dan sesi menulismu.",
  },
  register: {
    eyebrow: "登録 · Akun baru",
    title: "Mulai kebiasaan baru.",
    description:
      "Buat akun dengan email, lalu masukkan kode verifikasi 6 angka yang kami kirim.",
  },
  forgot: {
    eyebrow: "再設定 · Kata sandi",
    title: "Atur ulang kata sandi.",
    description:
      "Masukkan email akunmu. Kami kirim kode verifikasi untuk membuat kata sandi baru.",
  },
};

const TABS = [
  { value: "login", label: "Masuk" },
  { value: "register", label: "Daftar" },
] as const;

export function AuthPanel() {
  const [mode, setMode] = useState<Mode>("login");
  const copy = COPY[mode];

  return (
    <div>
      {mode === "forgot" ? (
        <button
          type="button"
          onClick={() => setMode("login")}
          className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted transition-colors hover:text-ink"
        >
          ← Kembali ke masuk
        </button>
      ) : (
        <div
          role="tablist"
          aria-label="Jenis akses"
          className="flex gap-7 border-b border-line"
        >
          {TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={mode === tab.value}
              onClick={() => setMode(tab.value)}
              className={cn(
                "-mb-px border-b-2 pb-3 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors",
                mode === tab.value
                  ? "border-ink text-ink"
                  : "border-transparent text-ink-faint hover:text-ink-muted",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      <p className="mt-7 font-mono text-eyebrow uppercase text-ink-muted">
        {copy.eyebrow}
      </p>
      <h1 className="mt-4 text-title">{copy.title}</h1>
      <p className="mt-3 text-pretty text-[14px] leading-[1.75] text-ink-muted">
        {copy.description}
      </p>

      {mode === "login" ? (
        <LoginForm
          onForgot={() => setMode("forgot")}
          onRegister={() => setMode("register")}
        />
      ) : null}

      {mode === "register" ? (
        <RegisterForm onLogin={() => setMode("login")} />
      ) : null}

      {mode === "forgot" ? (
        <ForgotPasswordForm onBack={() => setMode("login")} />
      ) : null}
    </div>
  );
}
