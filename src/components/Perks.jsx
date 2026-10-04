import { Truck, ArrowsClockwise, ShieldCheck, Headset } from "@phosphor-icons/react";

const perks = [
  [Truck, "Free delivery", "Island wide on orders above Rs 25,000"],
  [ArrowsClockwise, "Easy returns", "14 days, no questions asked"],
  [ShieldCheck, "Secure payment", "Cards and cash on delivery"],
  [Headset, "Real support", "Chat with us every day, 9am to 9pm"],
];

export default function Perks() {
  return (
    <section className="mx-auto mt-20 max-w-[1400px] px-4 md:px-8">
      <ul className="grid grid-cols-1 gap-6 border-y border-ink/15 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {perks.map(([Icon, t, d]) => (
          <li key={t} className="flex items-start gap-4">
            <Icon size={28} weight="regular" className="shrink-0" />
            <div>
              <h3 className="font-medium">{t}</h3>
              <p className="mt-0.5 text-sm text-mute">{d}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
