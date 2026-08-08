/*
 * services/example.service.js
 *
 * Los servicios contienen la LÓGICA de tu módulo -- ideal
 * que no sepan nada de Discord (nada de "interaction" o
 * "message" acá adentro). Eso los hace fáciles de probar
 * y de reutilizar desde un comando slash, uno de prefijo,
 * o un evento, sin repetir código.
 */

import exampleConfig from '../example.config.js';
import { getUsageCount, incrementUsage } from '../repositories/example.repository.js';

/**
 * Ejemplo de una función de servicio: registra un uso y
 * devuelve los datos que la vista va a necesitar mostrar.
 */
export function runExampleAction(userId) {

  const newCount = incrementUsage(userId);

  return {
    greeting: exampleConfig.message.greeting,
    usageCount: newCount
  };

}

/**
 * Ejemplo de una función de solo lectura (no cambia nada).
 */
export function getExampleStats(userId) {

  return {
    usageCount: getUsageCount(userId)
  };

}
