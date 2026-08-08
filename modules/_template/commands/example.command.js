/*
 * commands/example.command.js
 *
 * A diferencia de los slash commands, los comandos de
 * prefijo (tipo "?ejemplo") SÍ hay que listarlos a mano en
 * el manifiesto (index.js), en el arreglo "commands".
 *
 * "ownerOnly: true" hace que solo vos (o el/los dueños del
 * bot) puedan usarlo -- útil para comandos de prueba o
 * administración que no son para todo el mundo.
 */

import { getExampleStats } from '../services/example.service.js';

export default {

  name: 'ejemplo',

  description: 'Muestra cuántas veces usaste el módulo de ejemplo.',

  ownerOnly: false,

  async execute({ message }) {

    const { usageCount } = getExampleStats(message.author.id);

    await message.reply(
      `Usaste el módulo de ejemplo ${usageCount} ${usageCount === 1 ? 'vez' : 'veces'}.`
    );

  }

};
