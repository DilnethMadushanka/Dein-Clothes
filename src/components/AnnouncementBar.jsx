import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const msgs = [
  "Free island wide delivery on orders above Rs 25,000",
  "10% off your first order. Join the list below",
  "14 day easy returns on every order",
];

export default function AnnouncementBar() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % msgs.length), 4000);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <div className="bg-ink text-paper" role="status">
      <div className="mx-auto flex min-h-10 max-w-[1400px] items-center justify-center overflow-hidden px-4 py-2 text-[11px] leading-snug sm:text-xs">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={i}
            initial={reduce ? false : { y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: -14, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            {msgs[i]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
