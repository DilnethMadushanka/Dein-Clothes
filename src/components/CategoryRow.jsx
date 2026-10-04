import { catThumbs } from "../data.js";

export default function CategoryRow({ onPick }) {
  return (
    <section id="collections" aria-label="Shop by category" className="mx-auto max-w-[1400px] px-4 pt-8 md:px-8">
      <ul className="grid grid-flow-col auto-cols-[38%] gap-3 overflow-x-auto pb-2 [scrollbar-width:none] sm:auto-cols-[26%] md:auto-cols-fr">
        {catThumbs.map((c) => (
          <li key={c.label}>
            <button onClick={() => onPick(c.label)} className="group block w-full text-left">
              <div className="aspect-square overflow-hidden bg-paper-2">
                <img src={c.img} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <span className="mt-2 block text-sm font-medium group-hover:underline underline-offset-4">{c.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
