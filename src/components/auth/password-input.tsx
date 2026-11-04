"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/cn";
import { fieldClasses } from "@/components/auth/field-styles";

export function PasswordInput({
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "type">) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        type={visible ? "text" : "password"}
        className={cn(fieldClasses, "pr-11", className)}
      />
      <button
        type="button"
        onClick={() => setVisible((value) => !value)}
        aria-label={visible ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
        aria-pressed={visible}
        className="absolute inset-y-0 right-0 grid w-10 place-items-center text-ink-faint transition-colors hover:text-ink"
      >
        {visible ? (
          <EyeOff className="size-4" strokeWidth={1.5} aria-hidden="true" />
        ) : (
          <Eye className="size-4" strokeWidth={1.5} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
