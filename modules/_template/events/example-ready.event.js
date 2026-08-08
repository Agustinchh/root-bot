/*
 * events/example-ready.event.js
 *
 * Cada archivo de evento exporta un objeto con "name"
 * (cuál evento de Discord.js escuchar), "once" (si se
 * ejecuta una sola vez o cada vez que pasa), y "execute"
 * (la función que corre cuando pasa).
 *
 * Este ejemplo solo escribe un mensaje en la consola del
 * bot cuando arranca -- reemplazalo por la lógica real que
 * tu módulo necesite.
 */

import { Events } from 'discord.js';

export default {

  name: Events.ClientReady,

  once: true,

  async execute(client) {

    console.log('Módulo de ejemplo: listo y cargado correctamente.');

  }

};
