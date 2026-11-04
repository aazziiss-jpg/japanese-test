export function FormError({ children }: { children: React.ReactNode }) {
  return (
    <p
      role="alert"
      className="border-l-2 border-accent bg-accent-soft px-3 py-2 text-[12px] leading-relaxed text-ink"
    >
      {children}
    </p>
  );
}

export function FormSuccess({ children }: { children: React.ReactNode }) {
  return (
    <p
      role="status"
      className="border-l-2 border-ink bg-paper-raised px-3 py-2 text-[12px] leading-relaxed text-ink"
    >
      {children}
    </p>
  );
}
