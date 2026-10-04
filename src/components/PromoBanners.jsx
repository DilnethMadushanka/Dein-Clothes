import { ArrowUpRight } from "@phosphor-icons/react";

const banners = [
  { title: "Winter coats", note: "Up to 40% off", cta: "Shop coats", cat: "Outerwear", img: "/images/categories/outerwear.jpg" },
  { title: "Footwear edit", note: "Boots and sneakers from Rs 17,900", cta: "Shop shoes", cat: "Shoes", img: "/images/categories/footwear.jpg" },
];

export default function PromoBanners({ onPick }) {
  return (
    <section className="mx-auto grid max-w-[1400px] gap-4 px-4 pt-14 md:grid-cols-2 md:px-8">
      {banners.map((b) => (
        <button
          key={b.title}
          onClick={() => onPick(b.cat)}
          className="group relative block min-h-[320px] overflow-hidden bg-ink-2 text-left md:min-h-[380px]"
        >
          <img src={b.img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-paper">
            <div>
              <h2 className="text-3xl font-medium tracking-tight md:text-4xl">{b.title}</h2>
              <p className="mt-1 text-sm text-paper/80">{b.note}</p>
            </div>
            <span className="inline-flex items-center gap-2 whitespace-nowrap bg-paper px-5 py-3 text-sm font-medium text-ink transition group-hover:bg-ink group-hover:text-paper">
              {b.cta} <ArrowUpRight size={16} />
            </span>
          </div>
        </button>
      ))}
    </section>
  );
}
