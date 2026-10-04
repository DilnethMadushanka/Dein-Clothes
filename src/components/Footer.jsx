import { InstagramLogo, TiktokLogo, PinterestLogo, FacebookLogo } from "@phosphor-icons/react";

const cols = [
  ["Shop", ["New in", "Women", "Men", "Outerwear", "Shoes", "Accessories", "Sale"]],
  ["Help", ["Track order", "Shipping", "Returns", "Size guide", "Contact us"]],
  ["Company", ["About Dein", "Careers", "Stockists", "Privacy", "Terms"]],
];

export default function Footer() {
  return (
    <footer className="mt-20 overflow-hidden bg-ink text-paper">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 pt-16 sm:grid-cols-2 md:grid-cols-12 md:px-8">
        <div className="md:col-span-4">
          <p className="text-xl font-semibold tracking-[0.3em]">DEIN</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/70">
            Clothing and accessories in black and white. Delivered island wide.
          </p>
          <div className="mt-6 flex gap-3">
            {[InstagramLogo, TiktokLogo, PinterestLogo, FacebookLogo].map((Icon, i) => (
              <a key={i} href="#top" aria-label="Social link" className="grid size-10 place-items-center border border-paper/30 transition hover:bg-paper hover:text-ink">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        {cols.map(([h, items]) => (
          <div key={h} className="md:col-span-2">
            <h3 className="text-sm font-medium">{h}</h3>
            <ul className="mt-4 space-y-2 text-sm text-paper/70">
              {items.map((i) => (
                <li key={i}><a href="#top" className="transition hover:text-paper">{i}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="select-none px-4 pt-14 text-center text-[26vw] font-semibold leading-[0.8] tracking-tighter text-paper/90 md:px-8">
        DEIN
      </p>
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-6 text-xs text-paper/60 md:px-8">
        <p>© 2026 Dein Clothes. All rights reserved.</p>
        <p>Visa, Mastercard, Cash on delivery</p>
      </div>
    </footer>
  );
}
