"use client";

import { cn } from "@/lib/cn";
import { fieldClasses } from "@/components/auth/field-styles";

export function CodeInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      {...props}
      inputMode="numeric"
      autoComplete="one-time-code"
      pattern="[0-9]*"
      maxLength={6}
      placeholder="000000"
      className={cn(
        fieldClasses,
        "text-center font-mono text-lg tracking-[0.4em] placeholder:tracking-[0.4em]",
        className,
      )}
    />
  );
}
