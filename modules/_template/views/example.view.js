/*
 * views/example.view.js
 *
 * ROOT usa "Components V2" de discord.js para casi todo lo
 * visual (en vez de los EmbedBuilder clásicos). Esto es lo
 * que le da esa consistencia visual a todos los módulos.
 * Si nunca lo usaste, este archivo es un buen punto de
 * partida -- copiá el patrón para tu propio módulo.
 */

import { ContainerBuilder, TextDisplayBuilder } from 'discord.js';

import exampleConfig from '../example.config.js';

export function createExampleView({ member, greeting, usageCount }) {

  const container = new ContainerBuilder()
    .setAccentColor(exampleConfig.appearance.accentColor);

  container.addTextDisplayComponents(

    new TextDisplayBuilder().setContent(
      `## 🧩 Módulo de ejemplo\n\n` +
      `${greeting}\n\n` +
      `${member}, usaste este módulo **${usageCount}** ${usageCount === 1 ? 'vez' : 'veces'}.`
    )

  );

  return container;

}
