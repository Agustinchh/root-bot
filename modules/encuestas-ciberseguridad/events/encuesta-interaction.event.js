import { Events, MessageFlags } from 'discord.js';

import {
  obtenerResultados,
  registrarVoto,
  obtenerVotos
} from '../services/encuesta.service.js';
import { createEncuestaView } from '../views/encuesta.view.js';
import { closePoll, getPoll } from '../services/poll.service.js';

export default {
  name: Events.InteractionCreate,
  once: false,

  async execute(interaction) {
    if (!interaction.isButton()) return;

    const partes = interaction.customId.split(':');

    if (partes.length !== 4 || partes[0] !== 'ciberencuesta' || partes[1] !== 'v1') {
      return;
    }

    const [, , pollId, opcionTexto] = partes;
    const opcion = Number(opcionTexto);
    const poll = getPoll(pollId);

    if (!poll) {
      await interaction.reply({
        content: '❌ Esta encuesta ya no está disponible.',
        flags: MessageFlags.Ephemeral
      });
      return;
    }

    if (poll.closed || Date.now() >= poll.expiresAt) {
      const resultado = closePoll(pollId);

      if (poll.message && resultado) {
        await poll.message.edit({
          components: [
            createEncuestaView({
              pollId,
              pregunta: poll.pregunta,
              resultados: resultado.resultados,
              cerrada: true
            })
          ]
        });
      }

      await interaction.reply({
        content: '⏱️ La encuesta ya está cerrada.',
        flags: MessageFlags.Ephemeral
      });
      return;
    }

    if (!Number.isInteger(opcion) || opcion < 0 || opcion >= poll.pregunta.opciones.length) {
      return;
    }

    registrarVoto(pollId, interaction.user.id, opcion);

    const resultados = obtenerResultados(
      pollId,
      poll.pregunta.opciones.length
    );

    if (poll.message) {
      await poll.message.edit({
        components: [
          createEncuestaView({
            pollId,
            pregunta: poll.pregunta,
            resultados
          })
        ]
      });
    }

    const votosUsuario = obtenerVotos(pollId);
    const opcionElegida = votosUsuario.get(interaction.user.id);

    await interaction.reply({
      content: `🗳️ Voto registrado: **${String.fromCharCode(65 + opcionElegida)}**. Podés cambiarlo mientras la encuesta siga abierta.`,
      flags: MessageFlags.Ephemeral
    });
  }
};
