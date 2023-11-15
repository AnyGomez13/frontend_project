import React, { useState } from 'react';
import '../styles/Cuestionario.css';
import { useEffect } from 'react';


export default function CrearPreguntas() {
  const [cuestionarios, setCuestionarios] = useState([]);
  const [nuevoCuestionario, setNuevoCuestionario] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    // Lógica para obtener cuestionarios desde el backend
    // Puedes hacer una solicitud a tu API o base de datos aquí
    // Aquí un ejemplo de cuestionarios estáticos para demostración
    setCuestionarios([
      { id: 1, nombre: 'Nombre 1' },
      { id: 2, nombre: 'Nombre 2' },
      // Agrega más cuestionarios si es necesario
    ]);
  }, []);

  const abrirCuestionario = (id) => {
    // Lógica para redirigir a la ventana de preguntas del cuestionario
    console.log(`Abrir cuestionario con ID: ${id}`);
  };

  const agregarCuestionario = () => {
    // Lógica para agregar un nuevo cuestionario en el backend
    // Puedes hacer una solicitud a tu API o base de datos aquí
    // Aquí un ejemplo de cómo podrías hacerlo
    const nuevoCuestionarioObj = {
      id: Date.now(), // Generar un ID único
      nombre: nuevoCuestionario,
    };

    setCuestionarios([...cuestionarios, nuevoCuestionarioObj]);

    // Aquí deberías enviar el nuevoCuestionarioObj al backend para guardarlo en la base de datos

    // También puedes limpiar el estado del nuevo cuestionario después de agregarlo
    setNuevoCuestionario('');
  };

  const eliminarCuestionario = (id) => {
    // Lógica para eliminar un cuestionario en el backend
    // Puedes hacer una solicitud a tu API o base de datos aquí
    // Aquí un ejemplo de cómo podrías hacerlo
    const cuestionariosActualizados = cuestionarios.filter((c) => c.id !== id);
    setCuestionarios(cuestionariosActualizados);

    // Aquí deberías enviar la solicitud al backend para eliminar el cuestionario con el ID correspondiente
  };

  return (
    <div className="contenedorPrincipal">
      <div className="contenedorCentrado">
        <h2>Cuestionarios</h2>
        {mostrarFormulario && (
          <div className="formularioNuevoCuestionario">
            <input
              type="text"
              value={nuevoCuestionario}
              onChange={(e) => setNuevoCuestionario(e.target.value)}
              placeholder="Nombre"
            />
            <button onClick={agregarCuestionario}>Agregar Cuestionario</button>
          </div>
        )}
        <button className={`mostrarFormulario ${mostrarFormulario ? 'ocultar' : ''}`}
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
            <li className="nav-link">Informes</li>
            <li className="nav-link">Procesos</li>
          </ul>
        </nav>
      </div>
      <div className="contenedorAbajo"></div>
    </div>
  );
}
