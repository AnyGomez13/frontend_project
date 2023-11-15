import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        identificacion: "", contraseña: "",
    });

// Cambia la declaración del estado errorMessage
    const [errorMessage, setErrorMessage] = useState(false);

    function handleChange(event) {
        const {name, type, value, checked} = event.target;

        setForm((prevForm) => {
            return {
                ...prevForm, [name]: type === "checkbox" ? checked : value,
            };
        });
    }


    async function handleSubmit(event) {

        axios.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            return Promise.reject(error);
        })
        event.preventDefault();
        // Enviar los datos de inicio de sesión al servidor
        try {
            let datos = () => console.log(form.identificacion, form.contraseña);
            datos();
            const response = await axios.post("http://localhost:3000/login", {
                identificacion: form.identificacion, contraseña: form.contraseña,
            });
            // Verificar si la respuesta tiene un código de estado 200
            if (response.status === 200) {
                // Guardar información de sesión en localStorage
                localStorage.setItem('token', response.data.token);
                // Puedes guardar más información si es necesario

                // Redirigir a la página de cuestionario
                navigate('/cuestionario');
            }
            setErrorMessage(false);
            // Limpiar los campos después de un inicio de sesión exitoso
            setForm({
                identificacion: "", contraseña: "",
            });

            // Navegar a la página de cuestionario después del inicio de sesión exitoso
            navigate('/cuestionario');

            //Guardar sesion

        } catch (error) {
            // Aquí podrías mostrar un mensaje de error al usuario.
            // Limpiar los campos después de mostrar el mensaje de error.
            setForm({
                identificacion: "", contraseña: "",
            });
            // Dentro de la función donde manejas el error
            setErrorMessage(true);

            // Configurar el temporizador para cambiar errorMessage a false después de 2000 milisegundos (2 segundos)
            setTimeout(() => {
                setErrorMessage(false);
            }, 2000);

        }
    }

    return (<div className="flex items-center justify-center bg-blue-700 h-screen text-zinc-900">
        <div
            className={`container flex items-center justify-center w-[350px] md:h-3/5 md:w-3/5 rounded-3xl shadow-2xl bg-slate-100`}>
            <div className="hidden md:flex md:w-3/5 md:h-full">
                <img src="../../public/img/loginImg.jpg" alt="Guy reading some textbooks"
                     className="hidden w-0 md:block md:h-full md:w-full object-cover rounded-l-3xl"/>
            </div>
            <form
                className={`md:h-full md:w-2/5 h-[400px] w-[350px] flex flex-col items-center justify-center gap-6`}
                onSubmit={handleSubmit}
            >
                <img src="https://web.udi.edu.co/files/img/logo-udi-web.png" alt="logo udi" className={"w-3/5"}/>
                <input
                    placeholder="Identificacion"
                    className="p-4 rounded-xl border-2 focus:border-blue-400"
                    name="identificacion"
                    onChange={handleChange}
                    value={form.identificacion}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="p-4 rounded-xl border-2 focus:border-blue-400"
                    name="contraseña"
                    onChange={handleChange}
                    value={form.contraseña}
                />
                <button className="bg-blue-500 hover:bg-blue-700 hover:ease-in py-2 px-10 rounded-md text-white">
                    Ingresar
                </button>
                <span className={errorMessage ? "block text-red-500" : "hidden"}>error inicio de sesion</span>
            </form>
        </div>
    </div>);
}
