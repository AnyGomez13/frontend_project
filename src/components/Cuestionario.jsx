import React, { useState } from 'react';
import "../styles/Cuestionario.css"
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function CrearPreguntas() {

  const navigate = useNavigate();
  const [cuestionarios, setCuestionarios] = useState([]);
  const [nuevoCuestionario, setNuevoCuestionario] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombreModificado, setNombreModificado] = useState('');
  const [cuestionarioModificando, setCuestionarioModificando] = useState(null);

  useEffect(() => {
    // Lógica para obtener cuestionarios desde el backend
    obtenerCuestionarios();
  }, []);

  const obtenerCuestionarios = () => {
    axios.get('http://localhost:3000/cuestionario')
      .then((response) => {
        setCuestionarios(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener cuestionarios:', error);
      });
  };

  const abrirCuestionario = (id) => {
    console.log("Abriendo cuestionanrio con id", id);
    // Lógica para redirigir a la ventana de preguntas del cuestionario
    navigate(`/preguntas/${id}`);
  };

  const agregarCuestionario = () => {
    // Lógica para agregar un nuevo cuestionario en el backend
    if (nuevoCuestionario.length > 0) {
      axios.post('http://localhost:3000/cuestionario', { nombre: nuevoCuestionario })
        .then((response) => {
          console.log(response.data.message);
          obtenerCuestionarios(); // Actualizar la lista de cuestionarios después de agregar uno nuevo
        })
        .catch((error) => {
          console.error('Error al agregar cuestionario:', error);
        });

      // También puedes limpiar el estado del nuevo cuestionario después de agregarlo
      setNuevoCuestionario('');
      setMostrarFormulario(false);
    } else {
      alert("No puede agregar nombres vacíos");
    }
  };

  const eliminarCuestionario = async (id) => {
    // Lógica para eliminar un cuestionario en el backend
    axios.delete(`http://localhost:3000/cuestionario/${id}`)
      .then((response) => {
        console.log(response.data.message);
        obtenerCuestionarios(); // Actualizar la lista de cuestionarios después de eliminar uno
      })
      .catch((error) => {
        console.error('Error al eliminar cuestionario:', error);
      });
  };

  const iniciarModificacion = (cuestionario) => {
    setNombreModificado(cuestionario.nombre);
    setCuestionarioModificando(cuestionario);
    setMostrarFormulario(true);
  };

  const cancelarModificacion = () => {
    setNombreModificado('');
    setCuestionarioModificando(null);
    setMostrarFormulario(false);
  };

  const modificarCuestionario = () => {


    if (cuestionarioModificando && nombreModificado) {
      axios.put(`http://localhost:3000/cuestionario/${cuestionarioModificando.id}`, {
        nombre: nombreModificado,
      })
        .then((response) => {
          console.log(response.data.message);
          obtenerCuestionarios();
          setNombreModificado('');
          setCuestionarioModificando(null);
        })
        .catch((error) => {
          console.error('Error al modificar cuestionario:', error);
        });
        setMostrarFormulario(false);

    }
  };
  return (
    <div className="contenedorPrincipal">
      <div className="contenedorCentrado">
        <h2>Cuestionarios</h2>
        {mostrarFormulario && (
          <div className="formularioNuevoCuestionario">
            {cuestionarioModificando ? (
              <>
                <input
                  type="text"
                  value={nombreModificado}
                  onChange={(e) => setNombreModificado(e.target.value)}
                  placeholder="Nuevo Nombre"
                />
                <button onClick={modificarCuestionario}>Guardar</button>
                <button onClick={cancelarModificacion}>Cancelar</button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={nuevoCuestionario}
                  onChange={(e) => setNuevoCuestionario(e.target.value)}
                  placeholder="Nombre"
                />
                <button onClick={agregarCuestionario}>Agregar Cuestionario</button>
              </>
            )}
          </div>
        )}
        <button
          className={`mostrarFormulario ${mostrarFormulario ? 'ocultar' : ''}`}
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          +
        </button>
        <div className="contenedorCuestionarios">
          <div className="formularioCuestionario">
            {cuestionarios.length > 0 ? (
              cuestionarios.map((cuestionario) => (
                <div key={cuestionario.id} className="filaCuestionario">
                  <span>{cuestionario.nombre}</span>
                  <button onClick={() => abrirCuestionario(cuestionario.id)}>Abrir</button>
                  <button onClick={() => eliminarCuestionario(cuestionario.id)}>Eliminar</button>
                  <button onClick={() => iniciarModificacion(cuestionario)}>Modificar</button>
                </div>
              ))
            ) : (
              <p>No hay cuestionarios. ¡Agrega uno!</p>
            )}
          </div>
        </div>
      </div>
      <div className="contenedorArriba">
        <nav className="navbar">
          <div className="logo">Udi-WebCaracteriza</div>
          <ul className="nav-links">
            <li className="nav-link selected">Cuestionario</li>

          </ul>
        </nav>
      </div>
      <div className="contenedorAbajo"></div>
    </div>
  );
};