import { useEffect, useRef, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { products, off } from "../data.js";
import ProductCard from "./ProductCard.jsx";

const endOfDay = () => {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d.getTime();
};
const pad = (n) => String(n).padStart(2, "0");

function Countdown() {
  const [left, setLeft] = useState(() => Math.max(0, endOfDay() - Date.now()));
  useEffect(() => {
    const t = setInterval(() => setLeft(Math.max(0, endOfDay() - Date.now())), 1000);
    return () => clearInterval(t);
  }, []);
  const s = Math.floor(left / 1000);
  const parts = [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60];
  return (
    <div className="flex items-center gap-1 font-mono text-sm" role="timer" aria-label="Time left in sale">
      {parts.map((v, k) => (
        <span key={k} className="flex items-center gap-1">
          <span className="bg-ink px-2 py-1 text-paper">{pad(v)}</span>
          {k < 2 && <span aria-hidden="true">:</span>}
        </span>
      ))}
    </div>
  );
}

export default function FlashSale({ wish, onWish, onQuick }) {
  const ref = useRef(null);
  const list = [...products].sort((a, b) => off(b) - off(a)).slice(0, 8);
  const scroll = (d) => ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <section className="mx-auto max-w-[1400px] px-4 pt-14 md:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Flash sale</h2>
          <Countdown />
        </div>
        <div className="flex gap-2">
          <button onClick={() => scroll(-1)} aria-label="Scroll left" className="grid size-10 place-items-center border border-ink transition hover:bg-ink hover:text-paper">
            <CaretLeft size={18} />
          </button>
          <button onClick={() => scroll(1)} aria-label="Scroll right" className="grid size-10 place-items-center border border-ink transition hover:bg-ink hover:text-paper">
            <CaretRight size={18} />
          </button>
        </div>
      </div>
      <div ref={ref} className="mt-6 flex snap-x gap-4 overflow-x-auto pb-2 [scrollbar-width:none]">
        {list.map((p) => (
          <ProductCard
            key={p.id}
            p={p}
            wished={wish.includes(p.id)}
            onWish={onWish}
            onQuick={onQuick}
            className="w-[46%] shrink-0 snap-start sm:w-[30%] lg:w-[19%]"
          />
        ))}
      </div>
    </section>
  );
}
