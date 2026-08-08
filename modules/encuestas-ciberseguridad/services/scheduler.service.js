import { MessageFlags } from 'discord.js';

import { loadRuntimeConfig } from './config.service.js';
import { obtenerPreguntaAleatoria, obtenerResultados } from './encuesta.service.js';
import { registerPoll } from './poll.service.js';
import { createEncuestaView } from '../views/encuesta.view.js';

let clientRef = null;
let timer = null;
let running = false;

export async function iniciarProgramacion(client) {
  clientRef = client;
  await programarSiguienteEncuesta();
}

export function reiniciarProgramacion() {
  if (!clientRef) return;

  if (timer) {
    clearTimeout(timer);
    timer = null;
  }

  running = false;
  void programarSiguienteEncuesta();
}

async function programarSiguienteEncuesta() {
  if (running) return;
  running = true;

  try {
    const config = await loadRuntimeConfig();

    if (
      config.enabled &&
      config.automatic &&
      config.channelId
    ) {
      timer = setTimeout(async () => {
        try {
          await publicarEncuestaAutomatica();
        } finally {
          running = false;
          timer = null;
          await programarSiguienteEncuesta();
        }
      }, config.intervalMinutes * 60 * 1000);
    } else {
      running = false;
    }
  } catch (error) {
    running = false;
    console.error('[encuestas-ciberseguridad] Error en scheduler:', error);
  }
}

async function publicarEncuestaAutomatica() {
  const config = await loadRuntimeConfig();
  const channel = await clientRef.channels.fetch(config.channelId).catch(() => null);

  if (!channel?.isTextBased()) {
    console.error('[encuestas-ciberseguridad] No se pudo acceder al canal configurado.');
    return;
  }

  const pregunta = obtenerPreguntaAleatoria({
    categoria: config.category,
    dificultad: config.difficulty
  });

  if (!pregunta) {
    console.error('[encuestas-ciberseguridad] No hay preguntas disponibles para los filtros configurados.');
    return;
  }

  const pollId = registerPoll({
    pregunta,
    durationMinutes: config.durationMinutes,
    channelId: config.channelId
  });

  const container = createEncuestaView({
    pollId,
    pregunta,
    resultados: obtenerResultados(pollId, pregunta.opciones.length)
  });

  const message = await channel.send({
    components: [container],
    flags: MessageFlags.IsComponentsV2
  });

  registerPoll({ pollId, message });
}
