/*
 * slash-commands/example.slash.js
 *
 * Cualquier archivo dentro de la carpeta "slash-commands/"
 * se detecta y registra SOLO -- no hace falta listarlo en
 * el manifiesto (index.js).
 */

import { MessageFlags, SlashCommandBuilder } from 'discord.js';

import { runExampleAction } from '../services/example.service.js';
import { createExampleView } from '../views/example.view.js';

export default {

  data:

    new SlashCommandBuilder()
      .setName('ejemplo')
      .setDescription('Comando de ejemplo del módulo plantilla.'),


  async execute({ interaction }) {

    const { greeting, usageCount } = runExampleAction(interaction.user.id);

    const container = createExampleView({
      member: interaction.member,
      greeting,
      usageCount
    });

    await interaction.reply({
      components: [container],
      flags: MessageFlags.IsComponentsV2
    });

  }

};
