/*
 * repositories/example.repository.js
 *
 * Los repositorios son la única parte del módulo que toca
 * el archivo de datos directamente (leer/escribir JSON).
 * El resto del módulo nunca debería usar `fs` directo --
 * siempre pasa por acá. Esto hace más fácil encontrar y
 * arreglar bugs de datos más adelante.
 */

import fs from 'fs';
import path from 'path';

/*
 * OJO: cuando copies esta plantilla, cambiá "example" acá
 * abajo por el nombre real de la carpeta de tu módulo
 * (el mismo que uses en modules/tu-modulo/).
 */
const dataPath = path.resolve(
  'src/modules/example/data/example-data.json'
);

function ensureDataFile() {

  const directory = path.dirname(dataPath);

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '{}', 'utf8');
  }

}

function load() {

  ensureDataFile();

  try {

    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  } catch {

    return {};

  }

}

function save(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
}

/**
 * Devuelve cuántas veces un usuario usó el módulo.
 */
export function getUsageCount(userId) {

  const data = load();

  return data[userId] ?? 0;

}

/**
 * Suma 1 al contador de uso de un usuario, y devuelve el
 * nuevo total.
 */
export function incrementUsage(userId) {

  const data = load();

  data[userId] = (data[userId] ?? 0) + 1;

  save(data);

  return data[userId];

}
