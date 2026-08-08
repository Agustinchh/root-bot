/*
 * example.config.js
 *
 * Cada módulo tiene su propio archivo de configuración,
 * separado de la lógica. Poné acá todo lo que alguien
 * podría necesitar cambiar sin tocar código: IDs de
 * canales, textos, colores, límites, etc.
 */

/*
 * Si tu módulo necesita algún dato sensible (una API key,
 * por ejemplo), se importa así -- nunca escribas la key
 * directo en este archivo. secrets.js no existe en este
 * repositorio (vive en el bot privado), así que este
 * import está protegido con try/catch para que el módulo
 * no se rompa si lo corrés/revisás por fuera del bot real.
 */
let secrets = {};

try {

  const imported = await import('../../../config/secrets.js');
  secrets = imported.default ?? {};

} catch {

  secrets = {};

}

const exampleConfig = {


  enabled: true,


  /*
   * Placeholders como este se dejan en mayúsculas y con un
   * nombre descriptivo -- así, quien integre tu módulo al
   * bot real sabe exactamente qué tiene que completar.
   */
  channelId: 'ID_DEL_CANAL',


  message: {

    greeting: '¡Hola! Este es un módulo de ejemplo 👋'

  },


  /*
   * Ejemplo de cómo se vería una API key, si tu módulo
   * necesitara una. Se resuelve a `null` si no existe
   * secrets.js todavía (como en este repositorio público).
   */
  apiKey: secrets?.example?.apiKey ?? null,


  appearance: {

    accentColor: 0x5865F2

  }


};


export default exampleConfig;
