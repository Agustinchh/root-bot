import crypto from 'node:crypto';

import {
  obtenerResultados,
  registrarVoto,
  obtenerTotalVotos,
  limpiarEncuesta
} from './encuesta.service.js';

const polls = new Map();

export function registerPoll({ pregunta, durationMinutes, channelId, pollId = null, message = null }) {
  if (pollId && polls.has(pollId)) {
    const poll = polls.get(pollId);
    if (message) poll.message = message;
    return pollId;
  }

  const id = pollId ?? crypto.randomUUID();
  const expiresAt = Date.now() + (durationMinutes * 60 * 1000);

  polls.set(id, {
    id,
    pregunta,
    durationMinutes,
    channelId,
    message,
    expiresAt,
    closed: false
  });

  return id;
}

export function getPoll(pollId) {
  return polls.get(pollId) ?? null;
}

export function getActivePolls() {
  return [...polls.values()].filter((poll) => !poll.closed);
}

export function closePoll(pollId) {
  const poll = polls.get(pollId);
  if (!poll || poll.closed) return null;

  poll.closed = true;

  const resultados = obtenerResultados(
    pollId,
    poll.pregunta.opciones.length
  );

  return {
    ...poll,
    resultados,
    totalVotos: obtenerTotalVotos(pollId)
  };
}

export function removePoll(pollId) {
  polls.delete(pollId);
  limpiarEncuesta(pollId);
}
