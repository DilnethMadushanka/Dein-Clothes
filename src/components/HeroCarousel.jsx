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
      <motion.div
        onPanEnd={(_, info) => {
          if (info.offset.x < -60) go(1);
          else if (info.offset.x > 60) go(-1);
        }}
        style={{ touchAction: "pan-y" }}
        className="relative flex min-h-[min(600px,calc(100svh-9rem))] flex-col overflow-hidden bg-ink-2 max-sm:min-h-[520px] md:grid md:min-h-[520px] md:grid-cols-12 md:bg-paper-2"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={i}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="contents"
          >
            <div className="relative z-10 mt-auto flex flex-col justify-center gap-4 p-5 pb-6 text-paper sm:p-8 md:order-1 md:col-span-5 md:mt-0 md:gap-6 md:p-14 md:text-ink">
              <h1 className="text-[2rem] font-medium leading-[1.02] tracking-tighter sm:text-5xl md:text-6xl">{s.title}</h1>
              <p className="max-w-[34ch] text-base leading-relaxed text-paper/85 md:text-mute">{s.text}</p>
              <div>
                <button
                  onClick={() => onPick(s.cat)}
                  className="group inline-flex items-center gap-3 whitespace-nowrap bg-paper px-8 py-4 text-sm font-medium text-ink transition active:scale-[0.98] md:bg-ink md:text-paper"
                >
                  {s.cta}
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
            <div className="absolute inset-0 md:static md:order-2 md:col-span-7">
              <img src={s.img} alt="" className="h-full w-full object-cover object-top" fetchPriority={i === 0 ? "high" : "auto"} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/5 md:hidden" />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute right-4 top-4 z-20 flex items-center gap-2 md:bottom-6 md:right-6 md:top-auto">
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
      </motion.div>
    </section>
  );
}
