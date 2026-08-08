/*
 * index.js
 *
 * Este es el MANIFIESTO de tu módulo -- el bot lo lee al
 * arrancar para saber que tu módulo existe, qué permisos
 * de Discord necesita, y qué eventos/comandos tiene.
 *
 * Es el único archivo que el bot está OBLIGADO a leer de
 * tu módulo. Todo lo demás (services, views, etc.) es
 * organización tuya -- las carpetas de este ejemplo son
 * una convención, no una regla estricta del bot.
 */

import { GatewayIntentBits } from 'discord.js';

import exampleConfig from './example.config.js';

const exampleModule = {


  /*
   * Tiene que ser único en todo el bot, y coincidir con el
   * nombre de esta carpeta. Cuando copies la plantilla,
   * cambialo por el nombre real de tu módulo.
   */
  name: 'example',

  version: '1.0.0',

  description: 'Módulo de ejemplo -- copiá esta carpeta para empezar el tuyo.',

  enabled: exampleConfig.enabled,


  /*
   * Los "intents" son permisos que le pedís a Discord para
   * que tu módulo pueda ver ciertas cosas (mensajes,
   * miembros, etc.). Pedí solo los que realmente uses --
   * cuantos menos, mejor.
   */
  intents: [

    GatewayIntentBits.Guilds

  ],


  /*
   * Rutas a tus archivos de evento, relativas a esta
   * carpeta. Los slash commands NO van acá (se detectan
   * solos por estar en la carpeta slash-commands/).
   */
  events: [

    './events/example-ready.event.js'

  ],


  /*
   * Acá SÍ van los comandos de prefijo (tipo "?ejemplo").
   * Si tu módulo no tiene ninguno, dejá el arreglo vacío.
   */
  commands: [

    './commands/example.command.js'

  ]


};


export default exampleModule;
