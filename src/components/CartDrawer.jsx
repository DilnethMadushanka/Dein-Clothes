import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Minus, Plus, ShoppingBagOpen } from "@phosphor-icons/react";
import { fmt, FREE_SHIP } from "../data.js";

export default function CartDrawer({ open, items, onClose, onQty }) {
  const total = items.reduce((n, i) => n + i.price * i.qty, 0);
  const left = Math.max(0, FREE_SHIP - total);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-ink/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-paper"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
          >
            <div className="flex h-16 items-center justify-between border-b border-ink/10 px-5">
              <h2 className="text-lg font-medium">Your bag</h2>
              <button onClick={onClose} aria-label="Close bag" className="grid size-10 place-items-center">
                <X size={22} />
              </button>
            </div>

            {items.length > 0 && (
              <div className="border-b border-ink/10 px-5 py-4 text-sm">
                {left > 0 ? (
                  <p>Add <span className="font-mono font-semibold">{fmt(left)}</span> more for free delivery</p>
                ) : (
                  <p className="font-medium">You have free delivery</p>
                )}
                <div className="mt-2 h-1 bg-ink/10">
                  <div className="h-full bg-ink transition-all duration-500" style={{ width: `${Math.min(100, (total / FREE_SHIP) * 100)}%` }} />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-5">
              {items.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <ShoppingBagOpen size={40} className="mx-auto text-mute" />
                    <p className="mt-4 font-medium">Your bag is empty</p>
                    <p className="mt-1 text-sm text-mute">Add something from the new arrivals.</p>
                    <button onClick={onClose} className="mt-6 bg-ink px-6 py-3 text-sm font-medium text-paper">Keep shopping</button>
                  </div>
                </div>
              ) : (
                <ul className="divide-y divide-ink/10">
                  {items.map((i) => (
                    <li key={i.key} className="flex gap-4 py-5">
                      <img src={i.img} alt="" className="h-28 w-20 object-cover" />
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <p className="font-medium leading-tight">{i.name}</p>
                          <p className="mt-1 text-sm text-mute">Size {i.size}</p>
                          <p className="mt-1 font-mono text-sm">{fmt(i.price)}</p>
                        </div>
                        <div className="flex w-fit items-center border border-ink">
                          <button onClick={() => onQty(i.key, -1)} aria-label="Decrease quantity" className="grid size-8 place-items-center hover:bg-ink hover:text-paper">
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center font-mono text-sm">{i.qty}</span>
                          <button onClick={() => onQty(i.key, 1)} aria-label="Increase quantity" className="grid size-8 place-items-center hover:bg-ink hover:text-paper">
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-ink/10 p-5">
                <div className="flex justify-between text-base font-medium">
                  <span>Subtotal</span>
                  <span className="font-mono">{fmt(total)}</span>
                </div>
                <button className="mt-4 w-full bg-ink py-4 text-sm font-medium text-paper transition active:scale-[0.98]">
                  Checkout
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
