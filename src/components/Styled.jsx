import { styled } from "../data.js";

export default function Styled() {
  return (
    <section id="lookbook" className="mx-auto max-w-[1400px] px-4 pt-20 md:px-8">
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Styled by our customers</h2>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {styled.map((s, i) => (
          <div key={s} className="group aspect-[3/4] overflow-hidden bg-paper-2">
            <img src={s} alt={`Customer outfit ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          </div>
        ))}
      </div>
    </section>
  );
}
