import React, { useState, useEffect } from 'react';
import '../styles/Preguntas.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


export default function Preguntas() {
  const { id } = useParams();
  const cuestionarioId = id;
  const [tipoPregunta, setTipoPregunta] = useState('1');
  const [nuevaPregunta, setNuevaPregunta] = useState('');
  const [opcionesRespuesta, setOpcionesRespuesta] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [mostrarFormularioPreguntas, setMostrarFormularioPreguntas] = useState(false);
  const [preguntaEditando, setPreguntaEditando] = useState(null);
  const [detallesPregunta, setDetallesPregunta] = useState(null);



  useEffect(() => {
    console.log('Cuestionario id:', cuestionarioId);
    const obtenerPreguntas = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/preguntas/${cuestionarioId}`);
        setPreguntas(response.data);
      } catch (error) {
        console.error('Error al obtener preguntas del cuestionario:', error);
      }
    };

    obtenerPreguntas();
  }, [cuestionarioId]);

  const agregarPregunta = async () => {
    if (nuevaPregunta.trim() === '') {
      alert('La descripción de la pregunta no puede estar vacía.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/crear', {
        descripcion: nuevaPregunta,
        id_cuestionario: cuestionarioId,
        cod_tema: parseInt(tipoPregunta),
        opcionesRespuesta: tipoPregunta === '2' || tipoPregunta === '3' ? opcionesRespuesta : [],
      });

      const nuevaPreguntaObj = {
        id: Date.now(),
        tipo: tipoPregunta,
        descripcion: nuevaPregunta,
        opciones: tipoPregunta === '2' || tipoPregunta === '3' ? opcionesRespuesta : [],
      };

      setPreguntas([...preguntas, nuevaPreguntaObj]);
      setNuevaPregunta('');
      setOpcionesRespuesta([]);
      setMostrarFormularioPreguntas(false);
    } catch (error) {
      console.error('Error al agregar pregunta:', error);
    }
  };

  const agregarOpcionRespuesta = () => {
    setOpcionesRespuesta([...opcionesRespuesta, '']);
  };

  const handleOpcionRespuestaChange = (index, value) => {
    const nuevasOpciones = [...opcionesRespuesta];
    nuevasOpciones[index] = value;
    setOpcionesRespuesta(nuevasOpciones);
  };

  const eliminarOpcionRespuesta = (index) => {
    const nuevasOpciones = [...opcionesRespuesta];
    nuevasOpciones.splice(index, 1);
    setOpcionesRespuesta(nuevasOpciones);
  };

  const editarPregunta = (id) => {
    const preguntaAEditar = preguntas.find((pregunta) => pregunta.id === id);
    setPreguntaEditando(preguntaAEditar);
    setTipoPregunta(preguntaAEditar.cod_tema.toString());
    setNuevaPregunta(preguntaAEditar.descripcion);
    setOpcionesRespuesta(preguntaAEditar.opciones);
    setMostrarFormularioPreguntas(true);
  };

  const guardarEdicionPregunta = async () => {
    if (nuevaPregunta.trim() === '') {
      alert('La descripción de la pregunta no puede estar vacía.');
      return;
    }
  
    if (
      (tipoPregunta === '2' || tipoPregunta === '3') &&
      opcionesRespuesta.some((opcion) => opcion.trim() === '')
    ) {
      alert('Las opciones de respuesta no pueden estar vacías.');
      return;
    }
  
    try {
      await axios.put(`http://localhost:3000/editar/${preguntaEditando.id}`, {
        descripcion: nuevaPregunta,
        cod_tema: parseInt(tipoPregunta),
        opcionesRespuesta:
          tipoPregunta === '2' || tipoPregunta === '3' ? opcionesRespuesta : [],
      });
  
      const preguntasActualizadas = preguntas.map((pregunta) =>
        pregunta.id === preguntaEditando.id
          ? {
              ...pregunta,
              cod_tema: parseInt(tipoPregunta),
              descripcion: nuevaPregunta,
              opciones: tipoPregunta === '2' || tipoPregunta === '3' ? opcionesRespuesta : [],
            }
          : pregunta
      );
  
      setPreguntas(preguntasActualizadas);
      setPreguntaEditando(null);
      setTipoPregunta('1');
      setNuevaPregunta('');
      setOpcionesRespuesta([]);
      setMostrarFormularioPreguntas(false);
    } catch (error) {
      console.error('Error al editar pregunta:', error);
    }
  };
  

  const cancelarEdicionPregunta = () => {
    setPreguntaEditando(null);
    setTipoPregunta('abierta');
    setNuevaPregunta('');
    setOpcionesRespuesta([]);
    setMostrarFormularioPreguntas(false);
  };

  const eliminarPregunta = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/eliminar/${id}`);
      const preguntasActualizadas = preguntas.filter((pregunta) => pregunta.id !== id);
      setPreguntas(preguntasActualizadas);
    } catch (error) {
      console.error('Error al eliminar pregunta:', error);
    }
  };

  const mostrarDetallesPregunta = (id) => {
    const preguntaDetalle = preguntas.find((pregunta) => pregunta.id === id);
    setDetallesPregunta(preguntaDetalle);
  };

  const cerrarDetallesPregunta = () => {
    setDetallesPregunta(null);
  };

  return (
    <div className="contenedorPrincipal">
      <div className="contenedorArriba">
        <nav className="navbar">
          <div className="logo">Udi-WebCaracteriza</div>
          <ul className="nav-links">
            <li className="nav-link selected">Cuestionario-Preguntas</li>

          </ul>
        </nav>
      </div>
      <div className="contenedorCentral">
        <h2>Preguntas</h2>

        {/* Botón para mostrar/ocultar el formulario de preguntas */}
        <button
          className={`mostrarFormularioPreguntas ${mostrarFormularioPreguntas ? 'ocultar' : ''}`}
          onClick={() => setMostrarFormularioPreguntas(!mostrarFormularioPreguntas)}
        >
          +
        </button>

        {mostrarFormularioPreguntas && (
          <div className="formularioNuevaPregunta">
            <label htmlFor="tipoPregunta">Tipo de Pregunta: </label>
            <select
              id="tipoPregunta"
              value={tipoPregunta}
              onChange={(e) => setTipoPregunta(e.target.value)}
            >
              <option value="1">Pregunta Abierta</option>
              <option value="2">Pregunta Cerrada</option>
              <option value="3">Pregunta Cerrada Múltiple</option>
            </select>

            <input
              type="text"
              value={nuevaPregunta}
              onChange={(e) => setNuevaPregunta(e.target.value)}
              placeholder="Descripción de la Pregunta"
            />

            {tipoPregunta === '2' || tipoPregunta === '3' ? (
              <div>
                <p>Opciones de Respuesta:</p>
                {opcionesRespuesta.map((opcion, index) => (
                  <div key={index} className="opcionRespuesta">
                    <input
                      type="text"
                      value={opcion}
                      onChange={(e) => handleOpcionRespuestaChange(index, e.target.value)}
                      placeholder={`Opción ${index + 1}`}
                    />
                    <button onClick={() => eliminarOpcionRespuesta(index)}>Eliminar</button>
                  </div>
                ))}
                <button onClick={agregarOpcionRespuesta}>Agregar Opción</button>
              </div>
            ) : null}

            {preguntaEditando ? (
              <>
                <button onClick={guardarEdicionPregunta}>Guardar Edición</button>
                <button onClick={cancelarEdicionPregunta}>Cancelar Edición</button>
              </>
            ) : (
              <button onClick={agregarPregunta}>Agregar Pregunta</button>
            )}
          </div>
        )}

        {/* Lista de preguntas */}
        <div className="listaPreguntas">
          {preguntas.map((pregunta) => (
            <div key={pregunta.id} className="filaPregunta">
              <span>{pregunta.descripcion}</span>

              <button onClick={() => mostrarDetallesPregunta(pregunta.id)}>Detalles</button>
              <button onClick={() => editarPregunta(pregunta.id)}>Editar</button>
              <button onClick={() => eliminarPregunta(pregunta.id)}>Eliminar</button>
            </div>
          ))}
        </div>
      </div>


      {/* Detalles de la pregunta */}
      {detallesPregunta && (
        <div className="modal">
          <div className="modal-contenido">
            <h3>Detalles de la Pregunta</h3>
            <p>Descripción: {detallesPregunta.descripcion}</p>
            {detallesPregunta.opciones && detallesPregunta.opciones.length > 0 && (
              <div>
                <p>Opciones de Respuesta:</p>
                <ul>
                  {detallesPregunta.opciones.map((opcion, index) => (
                    <li key={index}>{opcion}</li>
                  ))}
                </ul>
              </div>
            )}
            <button onClick={cerrarDetallesPregunta}>Cerrar Detalles</button>
          </div>
        </div>
      )}
      <div className="contenedorAbajo"></div>
    </div>
  );
};
