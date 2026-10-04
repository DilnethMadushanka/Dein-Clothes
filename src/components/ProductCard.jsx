import { useState } from "react";
import { Heart, Star, Plus } from "@phosphor-icons/react";
import { fmt, off } from "../data.js";

export default function ProductCard({ p, wished, onWish, onQuick, className = "" }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <article className={`group ${className}`}>
      <div className="relative aspect-[3/4] overflow-hidden bg-paper-2">
        {!loaded && <div className="absolute inset-0 animate-pulse bg-paper-2" />}
        <button onClick={() => onQuick(p)} className="absolute inset-0 block h-full w-full" aria-label={`Quick view ${p.name}`}>
          <img
            src={p.img}
            alt={p.name}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
          />
        </button>
        <span className="pointer-events-none absolute left-0 top-0 bg-ink px-2 py-1 font-mono text-xs text-paper">-{off(p)}%</span>
        <button
          onClick={() => onWish(p.id)}
          aria-label={wished ? `Remove ${p.name} from wishlist` : `Save ${p.name} to wishlist`}
          aria-pressed={wished}
          className="absolute right-1.5 top-1.5 grid size-10 place-items-center bg-paper transition hover:bg-ink hover:text-paper active:scale-95"
        >
          <Heart size={18} weight={wished ? "fill" : "regular"} />
        </button>
        <button
          onClick={() => onQuick(p)}
          aria-label={`Choose size for ${p.name}`}
          className="absolute bottom-2 right-2 grid size-10 place-items-center bg-ink text-paper transition active:scale-95 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:focus-visible:translate-y-0 md:focus-visible:opacity-100"
        >
          <Plus size={18} />
        </button>
      </div>
      <div className="mt-3">
        <h3 className="truncate text-sm font-medium">{p.name}</h3>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-mono text-sm font-semibold">{fmt(p.price)}</span>
          <span className="font-mono text-xs text-mute line-through">{fmt(p.was)}</span>
        </div>
        <div className="mt-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs text-mute">
            <Star size={13} weight="fill" className="text-ink" />
            {p.rating} ({p.reviews.toLocaleString("en-LK")})
          </span>
          <span className="flex gap-1" aria-hidden="true">
            {p.colors.map((c) => (
              <span key={c} className="size-3 border border-ink/40" style={{ background: c }} />
            ))}
          </span>
        </div>
      </div>
    </article>
  );
}
