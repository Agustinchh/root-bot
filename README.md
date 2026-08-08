# 🧩 ROOT Modules

Repositorio comunitario de módulos para **ROOT**, el bot oficial de Mundo Hacker.

Acá cualquiera puede desarrollar un módulo nuevo que le gustaría ver en el bot. Todo lo que se aporte pasa por revisión antes de integrarse al bot en producción — nada se activa automáticamente.

## 🚨 Antes de empezar

**No estás construyendo el bot.** ROOT ya existe y tiene su propio núcleo (loaders, configuración, conexión a Discord) que vive en un repositorio privado que no vas a ver ni tocar.

Lo que vas a construir es **una pieza que el bot carga sola** — un módulo independiente, dentro de su propia carpeta, que no toca nada fuera de sí mismo.

## 📖 Guía completa: ir a la Wiki

Toda la explicación detallada — estructura de un módulo, cómo armar el manifiesto, ejemplos, cómo conectar con otros módulos existentes, y qué no hacer — está en la Wiki de este repositorio:

👉 **[Ver la guía completa en la Wiki](https://github.com/Mundo-Hacker/root-bot/wiki)**

Léela antes de empezar a programar.

## 📁 Lo esencial, resumido

root-modules/
└── modules/
    ├── _template/          ← copiá esta carpeta para empezar
    ├── tu-modulo-1/
    └── tu-modulo-2/

Cada módulo va en su propia carpeta dentro de `modules/`, con nombre corto en minúsculas y guiones (ej: `meme-diario`).

## ✅ Cómo se revisa y acepta un módulo

1. Hacé fork de este repositorio.
2. Desarrollá tu módulo dentro de `modules/tu-modulo/`.
3. Abrí un Pull Request explicando qué hace tu módulo y por qué.
4. Un mantenedor lo prueba localmente antes de aceptar nada.
5. Si se aprueba, se integra manualmente al bot en producción.

## 🙋 ¿Dudas?

Preguntá en el servidor de Mundo Hacker antes de ponerte a programar — capaz ya existe algo similar, o hay una forma más simple de lograr lo que buscás.
