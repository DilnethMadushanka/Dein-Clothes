import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Star } from "@phosphor-icons/react";
import { fmt, off } from "../data.js";

function Body({ product: p, onClose, onAdd }) {
  const one = p.sizes.length === 1;
  const [size, setSize] = useState(one ? p.sizes[0] : null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const submit = () => (size ? onAdd(p, size) : setErr(true));

  return (
    <>
      <motion.div className="fixed inset-0 z-50 bg-ink/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={p.name}
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
        className="fixed inset-x-4 top-1/2 z-50 mx-auto grid max-h-[90dvh] max-w-3xl -translate-y-1/2 grid-cols-1 overflow-y-auto bg-paper md:grid-cols-2"
      >
        <div className="aspect-[4/3] bg-paper-2 md:aspect-auto">
          <img src={p.img} alt={p.name} className="h-full w-full object-cover" />
        </div>
        <div className="relative flex flex-col p-6 md:p-8">
          <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 grid size-10 place-items-center hover:bg-ink/5">
            <X size={20} />
          </button>
          <p className="text-sm text-mute">{p.cat}</p>
          <h2 className="mt-1 pr-8 text-2xl font-medium tracking-tight">{p.name}</h2>
          <p className="mt-2 flex items-center gap-1 text-sm text-mute">
            <Star size={14} weight="fill" className="text-ink" /> {p.rating} ({p.reviews.toLocaleString("en-LK")} reviews)
          </p>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-mono text-xl font-semibold">{fmt(p.price)}</span>
            <span className="font-mono text-sm text-mute line-through">{fmt(p.was)}</span>
            <span className="bg-ink px-2 py-0.5 font-mono text-xs text-paper">-{off(p)}%</span>
          </div>

          <fieldset className="mt-6">
            <legend className="text-sm font-medium">Size</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {p.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSize(s);
                    setErr(false);
                  }}
                  aria-pressed={size === s}
                  className={`min-w-12 border border-ink px-3 py-2 text-sm transition ${size === s ? "bg-ink text-paper" : "hover:bg-ink/5"}`}
                >
                  {s}
                </button>
              ))}
            </div>
            {err && <p className="mt-2 text-sm font-medium" role="alert">Select a size to continue.</p>}
          </fieldset>

          <button onClick={submit} className="mt-auto bg-ink py-4 text-sm font-medium text-paper transition active:scale-[0.98] md:mt-8">
            Add to bag
          </button>
        </div>
      </motion.div>
    </>
  );
}

export default function QuickView({ product, onClose, onAdd }) {
  return (
    <AnimatePresence>
      {product && <Body key={product.id} product={product} onClose={onClose} onAdd={onAdd} />}
    </AnimatePresence>
  );
}
