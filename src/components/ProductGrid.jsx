import { useMemo, useState } from "react";
import { navCats, products } from "../data.js";
import ProductCard from "./ProductCard.jsx";

const tabs = ["All", ...navCats, "Sale"];
const sorts = {
  featured: ["Featured", () => 0],
  low: ["Price: low to high", (a, b) => a.price - b.price],
  high: ["Price: high to low", (a, b) => b.price - a.price],
  rated: ["Top rated", (a, b) => b.rating - a.rating],
};

export default function ProductGrid({ query, cat, setCat, wish, onWish, onQuick }) {
  const [sort, setSort] = useState("featured");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products
      .filter((p) => cat === "All" || cat === "Sale" || p.cat === cat)
      .filter((p) => !q || p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q))
      .sort(sorts[sort][1]);
  }, [query, cat, sort]);

  return (
    <section id="shop" className="mx-auto max-w-[1400px] px-4 pt-14 md:px-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {cat === "All" ? "New in" : cat}
          <span className="ml-3 font-mono text-sm font-normal text-mute">{list.length} items</span>
        </h2>
        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="sr-only">Sort products</label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-ink bg-paper px-3 py-2 text-sm"
          >
            {Object.entries(sorts).map(([k, [label]]) => (
              <option key={k} value={k}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div role="tablist" aria-label="Filter by category" className="mt-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={cat === t}
            onClick={() => setCat(t)}
            className={`whitespace-nowrap border border-ink px-4 py-2 text-sm transition active:scale-[0.98] ${
              cat === t ? "bg-ink text-paper" : "hover:bg-ink/5"
            }`}
          >
            {t === "All" ? "New in" : t}
          </button>
        ))}
      </div>

      {list.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {list.map((p) => (
            <ProductCard key={p.id} p={p} wished={wish.includes(p.id)} onWish={onWish} onQuick={onQuick} />
          ))}
        </div>
      ) : (
        <div className="mt-8 border border-dashed border-ink/30 py-20 text-center">
          <p className="font-medium">No items match your search</p>
          <p className="mt-1 text-sm text-mute">Try a different word or pick another category.</p>
          <button onClick={() => setCat("All")} className="mt-5 bg-ink px-6 py-3 text-sm font-medium text-paper">
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
