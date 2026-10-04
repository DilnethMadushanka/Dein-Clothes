import { MagnifyingGlass, Heart, ShoppingBagOpen, User } from "@phosphor-icons/react";
import { navCats } from "../data.js";

function IconBtn({ label, count, onClick, children }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="relative grid size-10 place-items-center transition active:scale-95 hover:bg-ink/5"
    >
      {children}
      {count > 0 && (
        <span className="absolute right-0 top-0 grid min-w-4 place-items-center bg-ink px-1 font-mono text-[10px] leading-4 text-paper">
          {count}
        </span>
      )}
    </button>
  );
}

export default function Header({ count, wishCount, query, setQuery, cat, pickCat, onCart }) {
  const link = (active) =>
    `whitespace-nowrap px-3 py-2 text-sm transition ${active ? "font-semibold underline underline-offset-8" : "hover:bg-ink/5"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-4 md:gap-8 md:px-8">
        <a href="#top" className="text-xl font-semibold tracking-[0.3em]">DEIN</a>

        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="relative mx-auto hidden w-full max-w-2xl md:block"
        >
          <label htmlFor="search" className="sr-only">Search products</label>
          <input
            id="search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search coats, tees, boots"
            className="w-full border border-ink bg-paper py-2.5 pl-4 pr-12 text-sm placeholder:text-mute"
          />
          <button type="submit" aria-label="Search" className="absolute inset-y-0 right-0 grid w-11 place-items-center bg-ink text-paper">
            <MagnifyingGlass size={18} />
          </button>
        </form>

        <div className="ml-auto flex items-center md:ml-0">
          <IconBtn label="Account"><User size={22} /></IconBtn>
          <IconBtn label={`Wishlist, ${wishCount} saved`} count={wishCount}><Heart size={22} /></IconBtn>
          <IconBtn label={`Open bag, ${count} items`} count={count} onClick={onCart}><ShoppingBagOpen size={22} /></IconBtn>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 pb-2 md:hidden">
        <label htmlFor="search-m" className="sr-only">Search products</label>
        <input
          id="search-m"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search coats, tees, boots"
          className="w-full border border-ink bg-paper px-4 py-2.5 text-sm placeholder:text-mute"
        />
      </div>

      <nav aria-label="Categories" className="border-t border-ink/10">
        <div className="mx-auto flex max-w-[1400px] gap-1 overflow-x-auto px-2 md:px-6 [scrollbar-width:none]">
          <button onClick={() => pickCat("All")} className={link(cat === "All")}>New in</button>
          {navCats.map((c) => (
            <button key={c} onClick={() => pickCat(c)} className={link(cat === c)}>{c}</button>
          ))}
          <button onClick={() => pickCat("Sale")} className={`ml-auto ${link(cat === "Sale")} font-semibold`}>Sale</button>
        </div>
      </nav>
    </header>
  );
}
