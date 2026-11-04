const items = [
  "ひらがな",
  "カタカナ",
  "漢字",
  "語彙",
  "文法",
  "N5 → N4",
  "書く",
  "聞く",
  "話す",
];

export function Ticker() {
  return (
    <div className="relative overflow-hidden border-y border-line bg-paper py-3">
      <div
        className="flex w-max animate-[marquee_38s_linear_infinite] items-center gap-8 hover:[animation-play-state:paused]"
        aria-hidden="true"
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-8 pr-8">
            {items.map((item) => (
              <span key={`${copy}-${item}`} className="flex items-center gap-8">
                <span className="font-jp text-[12px] tracking-[0.18em] text-ink-muted">
                  {item}
                </span>
                <span className="size-1 bg-accent/70" />
              </span>
            ))}
          </div>
        ))}
      </div>
      <span className="sr-only">
        Hiragana, katakana, kanji, kosakata, tata bahasa, dari N5 ke N4.
      </span>
    </div>
  );
}
