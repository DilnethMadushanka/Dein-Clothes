import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { slides } from "../data.js";

export default function HeroCarousel({ onPick }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const n = slides.length;
  const go = (d) => setI((x) => (x + d + n) % n);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 6000);
    return () => clearInterval(t);
  }, [reduce, paused, n]);

  const s = slides[i];

  return (
    <section
      id="top"
      aria-roledescription="carousel"
      aria-label="Featured offers"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative mx-auto max-w-[1400px] px-4 pt-4 md:px-8 md:pt-6"
    >
      <div className="relative grid min-h-[440px] grid-cols-1 overflow-hidden bg-paper-2 md:min-h-[520px] md:grid-cols-12">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={i}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="contents"
          >
            <div className="order-2 flex flex-col justify-center gap-6 p-6 md:order-1 md:col-span-5 md:p-14">
              <h1 className="text-4xl font-medium leading-[1] tracking-tighter md:text-6xl">{s.title}</h1>
              <p className="max-w-[34ch] text-base leading-relaxed text-mute">{s.text}</p>
              <div>
                <button
                  onClick={() => onPick(s.cat)}
                  className="group inline-flex items-center gap-3 whitespace-nowrap bg-ink px-8 py-4 text-sm font-medium text-paper transition active:scale-[0.98]"
                >
                  {s.cta}
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
            <div className="order-1 h-64 md:order-2 md:col-span-7 md:h-auto">
              <img src={s.img} alt="" className="h-full w-full object-cover" fetchPriority={i === 0 ? "high" : "auto"} />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-4 right-4 flex items-center gap-2 md:bottom-6 md:right-6">
          <div className="mr-2 flex gap-1.5">
            {slides.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Show slide ${k + 1}`}
                aria-current={k === i}
                className={`h-1 transition-all ${k === i ? "w-8 bg-paper" : "w-4 bg-paper/50"}`}
              />
            ))}
          </div>
          <button onClick={() => go(-1)} aria-label="Previous slide" className="grid size-10 place-items-center bg-paper text-ink transition hover:bg-ink hover:text-paper">
            <CaretLeft size={18} />
          </button>
          <button onClick={() => go(1)} aria-label="Next slide" className="grid size-10 place-items-center bg-paper text-ink transition hover:bg-ink hover:text-paper">
            <CaretRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
