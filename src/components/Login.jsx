import { useState } from "react";

export default function Login() {
  /**
   * Challenge: Connect the form to local state
   *
   * 1. Create a state object to store the 4 values we need to save.
   * 2. Create a single handleChange function that can
   *    manage the state of all the inputs and set it up
   *    correctly
   * 3. When the user clicks "Sign up", check if the
   *    password & confirmation match each other. If
   *    so, log "Successfully signed up" to the console.
   *    If not, log "passwords to not match" to the console.
   * 4. Also when submitting the form, if the person checked
   *    the "newsletter" checkbox, log "Thanks for signing
   *    up for our newsletter!" to the console.
   */

  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    wantJoin: false,
  });

  function handleChange(event) {
    const { name, type, value, checked } = event.target;

    setForm((prevForm) => {
      return {
        ...prevForm,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (form.password === form.passwordConfirm) {
      console.log("Logeado correctamente");
    } else {
      console.log("Vuelvalo a intentar");
      return;
    }

    if (form.wantJoin) {
      console.log("Thanks for signing up for our newsletter!");
    }

    alert(JSON.stringify(form));
  }

  return (
    <div className="flex items-center justify-center bg-violet-800 h-screen text-zinc-900">
      <form
        className="md:h-3/5 md:w-[400px] h-[400px] w-[350px] flex flex-col items-center justify-center gap-6 bg-slate-50 rounded-3xl shadow-2xl"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Email address"
          className="p-4 rounded-xl border-2"
          name="email"
          onChange={handleChange}
          value={form.email}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 rounded-xl border-2"
          name="password"
          onChange={handleChange}
          value={form.password}
        />
        <input
          type="password"
          placeholder="Confirm password"
          className="p-4 rounded-xl border-2"
          name="passwordConfirm"
          onChange={handleChange}
          value={form.passwordConfirm}
        />

        <div className="flex gap-4">
          <input
            id="okayToEmail"
            type="checkbox"
            className="accent-violet-700"
            name="wantJoin"
            checked={form.wantJoin}
            onChange={handleChange}
          />
          <label htmlFor="okayToEmail">I want to join the newsletter</label>
        </div>
        <button className="bg-violet-700 py-2 px-10 rounded-md text-white">
          Sign up
        </button>
      </form>
    </div>
  );
}
