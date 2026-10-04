import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");

  const submit = (e) => {
    e.preventDefault();
    setState(/^\S+@\S+\.\S+$/.test(email) ? "done" : "error");
  };

  return (
    <section className="mx-auto mt-20 max-w-[1400px] px-4 md:px-8">
      <div className="grid gap-8 bg-ink px-6 py-14 text-paper md:grid-cols-12 md:px-14">
        <h2 className="text-3xl font-medium leading-tight tracking-tighter md:col-span-6 md:text-5xl">
          Get 10% off your first order.
        </h2>
        <form onSubmit={submit} noValidate className="md:col-span-5 md:col-start-8">
          {state === "done" ? (
            <p className="text-lg font-medium">You are in. Your code is on its way.</p>
          ) : (
            <>
              <label htmlFor="email" className="block text-sm font-medium">Email address</label>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state === "error") setState("idle");
                  }}
                  placeholder="name@example.com"
                  aria-invalid={state === "error"}
                  aria-describedby="email-help"
                  className="w-full border border-paper bg-transparent px-4 py-4 text-base text-paper placeholder:text-paper/60"
                />
                <button className="whitespace-nowrap bg-paper px-7 py-4 text-sm font-medium text-ink transition active:scale-[0.98]">
                  Subscribe
                </button>
              </div>
              <p id="email-help" className={`mt-2 text-sm ${state === "error" ? "font-medium" : "text-paper/70"}`}>
                {state === "error" ? "Enter a valid email address, for example name@example.com." : "One email per drop. Unsubscribe any time."}
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
