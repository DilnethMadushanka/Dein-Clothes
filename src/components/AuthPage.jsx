import { useState } from "react";
import { Eye, EyeSlash, ArrowLeft } from "@phosphor-icons/react";

const emailOk = (v) => /^\S+@\S+\.\S+$/.test(v);

function Field({ id, label, error, right, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">{label}</label>
      <div className="relative">
        <input
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className="w-full border border-ink bg-paper px-4 py-3 text-base placeholder:text-mute"
          {...props}
        />
        {right}
      </div>
      {error && <p id={`${id}-err`} className="mt-1 text-sm text-red-700">{error}</p>}
    </div>
  );
}

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(null);

  const isReg = mode === "register";
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const switchMode = (m) => {
    setMode(m);
    setErrors({});
  };

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (isReg && form.name.trim().length < 2) er.name = "Enter your name";
    if (!emailOk(form.email)) er.email = "Enter a valid email address";
    if (form.password.length < 6) er.password = "Password must be at least 6 characters";
    if (isReg && form.confirm !== form.password) er.confirm = "Passwords do not match";
    setErrors(er);
    if (Object.keys(er).length) return;
    setUser({ name: isReg ? form.name.trim() : form.email.split("@")[0], isReg });
  };

  const tab = (active) =>
    `flex-1 border-b-2 py-3 text-sm transition ${active ? "border-ink font-semibold" : "border-transparent text-mute hover:text-ink"}`;

  return (
    <main className="mx-auto grid min-h-[70vh] max-w-[1400px] place-items-center px-4 py-12 md:px-8">
      <div className="w-full max-w-md">
        <a href="#/" className="mb-8 inline-flex items-center gap-2 text-sm hover:underline">
          <ArrowLeft size={16} /> Back to shop
        </a>

        {user ? (
          <div className="border border-ink/10 bg-paper-2 p-8 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {user.isReg ? "Welcome to DEIN" : "Welcome back"}, {user.name}
            </h1>
            <p className="mt-2 text-mute">
              {user.isReg ? "Your account has been created." : "You are signed in."}
            </p>
            <a href="#/" className="mt-6 inline-block bg-ink px-6 py-3 text-sm font-semibold text-paper transition active:scale-95">
              Continue shopping
            </a>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-semibold tracking-tight">{isReg ? "Create account" : "Sign in"}</h1>
            <p className="mt-1 text-mute">
              {isReg ? "Join DEIN for faster checkout and your saved bag." : "Welcome back. Sign in to your DEIN account."}
            </p>

            <div role="tablist" className="mt-6 flex border-b border-ink/10">
              <button role="tab" aria-selected={!isReg} onClick={() => switchMode("login")} className={tab(!isReg)}>Login</button>
              <button role="tab" aria-selected={isReg} onClick={() => switchMode("register")} className={tab(isReg)}>Register</button>
            </div>

            <form onSubmit={submit} noValidate className="mt-6 space-y-4">
              {isReg && (
                <Field id="name" label="Full name" autoComplete="name" value={form.name} onChange={set("name")} error={errors.name} />
              )}
              <Field id="email" type="email" label="Email" autoComplete="email" value={form.email} onChange={set("email")} error={errors.email} />
              <Field
                id="password"
                type={show ? "text" : "password"}
                label="Password"
                autoComplete={isReg ? "new-password" : "current-password"}
                value={form.password}
                onChange={set("password")}
                error={errors.password}
                right={
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    aria-label={show ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 grid w-11 place-items-center"
                  >
                    {show ? <EyeSlash size={18} /> : <Eye size={18} />}
                  </button>
                }
              />
              {isReg && (
                <Field
                  id="confirm"
                  type={show ? "text" : "password"}
                  label="Confirm password"
                  autoComplete="new-password"
                  value={form.confirm}
                  onChange={set("confirm")}
                  error={errors.confirm}
                />
              )}

              {!isReg && (
                <div className="text-right">
                  <a href="#/account" className="text-sm text-mute underline underline-offset-4 hover:text-ink">Forgot password?</a>
                </div>
              )}

              <button type="submit" className="w-full bg-ink py-3.5 text-sm font-semibold text-paper transition active:scale-[0.98]">
                {isReg ? "Create account" : "Sign in"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-mute">
              {isReg ? "Already have an account?" : "New to DEIN?"}{" "}
              <button onClick={() => switchMode(isReg ? "login" : "register")} className="font-semibold text-ink underline underline-offset-4">
                {isReg ? "Sign in" : "Create one"}
              </button>
            </p>
          </>
        )}
      </div>
    </main>
  );
}
