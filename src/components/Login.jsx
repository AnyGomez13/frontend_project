import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({
    usuario: "",
    contraseña: "",
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

  async function handleSubmit(event) {
    event.preventDefault();

    // Enviar los datos de inicio de sesión al servidor
    try {
      const response = await axios.post("/login", {
        usuario: form.usuario,
        contraseña: form.contraseña,
      });

      if (response.status === 200) {
        console.log("Inicio de sesión exitoso");
        // Aquí podrías redirigir al usuario a la página de inicio de sesión exitoso, por ejemplo.
      }
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      // Aquí podrías mostrar un mensaje de error al usuario.
    }
  }

  return (
    <div className="flex items-center justify-center bg-violet-800 h-screen text-zinc-900">
      <form
        className="md:h-3/5 md:w-[400px] h-[400px] w-[350px] flex flex-col items-center justify-center gap-6 bg-slate-50 rounded-3xl shadow-2xl"
        onSubmit={handleSubmit}
      >
        <input
          placeholder="Identificacion"
          className="p-4 rounded-xl border-2"
          name="email"
          onChange={handleChange}
          value={form.email}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="p-4 rounded-xl border-2"
          name="password"
          onChange={handleChange}
          value={form.password}
        />
        <button className="bg-violet-700 py-2 px-10 rounded-md text-white">
          Sign up
        </button>
      </form>
    </div>
  );
}
