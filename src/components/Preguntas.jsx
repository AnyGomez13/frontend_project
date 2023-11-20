import React from "react";
import { useEffect } from 'react';
import axios from 'axios';

import React, { useState } from 'react';

function FormularioPreguntas() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [apartados, setApartados] = useState([
    {
      pregunta: '',
      opcionSeleccionada: '',
      checkboxOptions: [''],
    },
  ]);

  const handleTituloChange = (event) => {
    setTitulo(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handlePreguntaChange = (event, index) => {
    const updatedApartados = [...apartados];
    updatedApartados[index].pregunta = event.target.value;
    setApartados(updatedApartados);
  };

  const handleOpcionSeleccionadaChange = (event, index) => {
    const updatedApartados = [...apartados];
    updatedApartados[index].opcionSeleccionada = event.target.value;
    setApartados(updatedApartados);
  };

  const handleCheckboxOptionChange = (event, index, checkboxIndex) => {
    const updatedApartados = [...apartados];
    updatedApartados[index].checkboxOptions[checkboxIndex] = event.target.value;
    setApartados(updatedApartados);
  };

  const handleAgregarCheckbox = (index) => {
    const updatedApartados = [...apartados];
    updatedApartados[index].checkboxOptions.push('');
    setApartados(updatedApartados);
  };

  const handleEliminarCheckbox = (index, checkboxIndex) => {
    const updatedApartados = [...apartados];
    updatedApartados[index].checkboxOptions.splice(checkboxIndex, 1);
    setApartados(updatedApartados);
  };

  const handleMostrarDetallesChange = (event) => {
    setMostrarDetalles(event.target.checked);
  };

  const handleDetallesAdicionalesChange = (event) => {
    setDetallesAdicionales(event.target.value);
  };

  const handleAgregarApartado = () => {
    const updatedApartados = [...apartados, {
      pregunta: '',
      opcionSeleccionada: '',
      checkboxOptions: [''],
    }];
    setApartados(updatedApartados);
  };

  const apartadoElements = [];
  for (let index = 0; index < apartados.length; index++) {
    const apartado = apartados[index];
    apartadoElements.push(
      <div className="apartado" key={index}>
        <input
          type="text"
          value={apartado.pregunta}
          onChange={(event) => handlePreguntaChange(event, index)}
        />
        <CustomSelect
          value={apartado.opcionSeleccionada}
          onChange={(event) => handleOpcionSeleccionadaChange(event, index)}
        />
      </div>
    );
  }

  return (
    <div className="formulario-container">
      <div className="apartado">
        <h2>Título</h2>
        <input type="text" value={titulo} onChange={handleTituloChange} />
        <h2>Descripción</h2>
        <textarea value={descripcion} onChange={handleDescripcionChange} />
      </div>

      {apartadoElements}

      <div className="apartado">
        <button className="agrega" onClick={handleAgregarApartado}>Agregar pregunta</button>
      </div>
    </div>
  );
}

const CustomSelect = ({ value, onChange }) => (
  <div className="custom-select-container">
    <select value={value} onChange={onChange} className="custom-select">
      <option value="parrafo">Párrafo</option>
      <option value="varias_opciones">Varias Opciones</option>
      <option value="casillas">Casillas</option>
      <option value="desplegables">Desplegables</option>
    </select>
  </div>
);

export default FormularioPreguntas;
