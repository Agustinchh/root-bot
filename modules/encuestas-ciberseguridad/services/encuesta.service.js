import preguntas from '../data/preguntas.js';

const usadas = new Set();
const votos = new Map();

function normalizarFiltro(valor) {
  return typeof valor === 'string' ? valor.trim().toLowerCase() : 'todas';
}

export function obtenerCategorias() {
  return [...new Set(preguntas.map((pregunta) => pregunta.categoria))].sort();
}

export function obtenerDificultades() {
  return [...new Set(preguntas.map((pregunta) => pregunta.dificultad))].sort();
}

export function obtenerPreguntaAleatoria({ categoria = 'todas', dificultad = 'todas' } = {}) {
  const categoriaFiltro = normalizarFiltro(categoria);
  const dificultadFiltro = normalizarFiltro(dificultad);

  let disponibles = preguntas.filter((pregunta) => {
    const coincideCategoria =
      categoriaFiltro === 'todas' || pregunta.categoria === categoriaFiltro;

    const coincideDificultad =
      dificultadFiltro === 'todas' || pregunta.dificultad === dificultadFiltro;

    return coincideCategoria && coincideDificultad;
  });

  if (disponibles.length === 0) {
    return null;
  }

  const noUsadas = disponibles.filter((pregunta) => !usadas.has(pregunta.id));

  if (noUsadas.length === 0) {
    disponibles.forEach((pregunta) => usadas.delete(pregunta.id));
    disponibles = [...disponibles];
  } else {
    disponibles = noUsadas;
  }

  const pregunta = disponibles[Math.floor(Math.random() * disponibles.length)];
  usadas.add(pregunta.id);

  return pregunta;
}

export function registrarVoto(pollId, userId, opcion) {
  if (!votos.has(pollId)) {
    votos.set(pollId, new Map());
  }

  votos.get(pollId).set(userId, opcion);
}

export function obtenerVotos(pollId) {
  return votos.get(pollId) ?? new Map();
}

export function obtenerResultados(pollId, cantidadOpciones) {
  const registros = obtenerVotos(pollId);
  const resultados = Array.from({ length: cantidadOpciones }, () => 0);

  for (const opcion of registros.values()) {
    if (Number.isInteger(opcion) && opcion >= 0 && opcion < cantidadOpciones) {
      resultados[opcion] += 1;
    }
  }

  return resultados;
}

export function obtenerTotalVotos(pollId) {
  return obtenerVotos(pollId).size;
}

export function limpiarEncuesta(pollId) {
  votos.delete(pollId);
}
