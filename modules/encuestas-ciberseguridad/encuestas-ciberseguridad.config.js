import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const runtimeConfigPath = path.join(__dirname, 'data', 'config.json');

const defaults = {
  enabled: true,
  channelId: null,
  automatic: false,
  intervalMinutes: 1440,
  durationMinutes: 60,
  category: 'todas',
  difficulty: 'todas'
};

let runtimeConfig = { ...defaults };

try {
  if (fs.existsSync(runtimeConfigPath)) {
    const stored = JSON.parse(fs.readFileSync(runtimeConfigPath, 'utf8'));
    runtimeConfig = { ...defaults, ...stored };
  }
} catch (error) {
  console.error('[encuestas-ciberseguridad] No se pudo leer data/config.json:', error);
}

const encuestasConfig = {
  enabled: runtimeConfig.enabled,
  ...runtimeConfig,
  appearance: {
    accentColor: 0x5865F2
  },
  runtimeConfigPath
};

export default encuestasConfig;
