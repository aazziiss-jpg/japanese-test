import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { footer, site } from "@/content/landing";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-[16rem] text-[12.5px] leading-relaxed text-ink-muted">
              {site.tagline} Satu tempat untuk membangun fondasi bahasa Jepang
              yang benar-benar bisa dipakai.
            </p>
            <p className="font-jp text-[11px] tracking-[0.2em] text-ink-faint">
              毎日、少しずつ。
            </p>
          </div>

          {footer.columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <h3 className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[12.5px] text-ink-muted transition-colors duration-300 hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-start md:justify-between">
          <p
            id="atribusi"
            className="max-w-xl text-[10.5px] leading-relaxed text-ink-faint"
          >
            {footer.attribution}
          </p>
          <p className="shrink-0 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-faint">
            © {site.year} {site.name} · dibuat untuk belajar
          </p>
        </div>
      </div>
    </footer>
  );
}
