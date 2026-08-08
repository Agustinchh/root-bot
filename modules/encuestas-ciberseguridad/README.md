# 🛡️ Encuestas de Ciberseguridad para ROOT

Módulo comunitario para ROOT que genera encuestas interactivas sobre ciberseguridad.

## Funciones

- `/encuesta` genera una pregunta aleatoria.
- Filtros por categoría y dificultad.
- Votación mediante botones.
- Un voto por usuario, permitiendo cambiarlo mientras la encuesta está abierta.
- Cierre automático por tiempo.
- Resultados y explicación de la respuesta correcta.
- `/encuesta-config` permite configurar el canal, activación automática, intervalo y duración.
- `/encuesta-status` muestra la configuración actual.
- Banco inicial de preguntas en `data/preguntas.js`.
- Sin API externas y sin credenciales.

## Estructura

```text
encuestas-ciberseguridad/
├── data/
├── events/
├── repositories/
├── services/
├── slash-commands/
├── views/
├── encuestas-ciberseguridad.config.js
└── index.js
```

## Configuración automática

Un usuario con permiso **Administrar servidor** puede ejecutar:

```text
/encuesta-config canal:#canal automatica:true intervalo:1440 duracion:60
```

El intervalo está expresado en minutos. El módulo guarda la configuración operativa en `data/config.json`.

> Nota para la integración: el mantenedor de ROOT debe probar el comportamiento de escritura del módulo en el entorno donde se ejecuta el bot. Si el entorno es de solo lectura o efímero, conviene conectar la configuración a un repositorio/persistencia oficial del bot antes de integrar.

## Seguridad

Este módulo no requiere tokens, API keys ni servicios externos.

Las preguntas son educativas y están orientadas a concientización y buenas prácticas de ciberseguridad.
