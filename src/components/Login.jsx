import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
const navigate = useNavigate();

  const [error, setError] = useState(" ");

  const [form, setForm] = useState({
    identificacion: "",
    contraseña: "",
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

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    )
    event.preventDefault();
    // Enviar los datos de inicio de sesión al servidor
    try {
      let datos = () => console.log(form.identificacion, form.contraseña);
      datos();
      const response = await axios.post("http://localhost:3000/login", {
        identificacion: form.identificacion,
        contraseña: form.contraseña,
      });

      alert("Inicio de sesion exitoso");
      // Limpiar los campos después de un inicio de sesión exitoso
      navigate('/cuestionario');
      setForm({
        identificacion: "",
        contraseña: "",
      });


    } catch (error) {
      // Aquí podrías mostrar un mensaje de error al usuario.
      alert("Error de inicio de sesión:", error);
      //Limpiar los campos despues de mostrar el mensaje de error. 
      setForm({
        identificacion: "",
        contraseña: "",
      });
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
          name="identificacion"
          onChange={handleChange}
          value={form.identificacion}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="p-4 rounded-xl border-2"
          name="contraseña"
          onChange={handleChange}
          value={form.contraseña}
        />
        <button className="bg-violet-700 py-2 px-10 rounded-md text-white">

          Ingresar
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
