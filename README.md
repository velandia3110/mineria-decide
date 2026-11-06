# Minería: Decide

App móvil de capacitación en seguridad minera subterránea, **offline**, basada en escenarios de decisiones encadenadas. Expo SDK 58, JavaScript, React Navigation (native-stack), AsyncStorage.

El código **no tiene comentarios a propósito**: la carpeta [docs/desarrollo/](docs/desarrollo/) es la única explicación de dónde está cada cosa, cómo funciona y por qué se hizo así. Si cambias el código, actualiza el documento correspondiente (sobre todo las referencias de línea).

Especificación del proyecto (requisitos RF/RNF, historias HU, cronograma): [docs/entrega2.md](docs/entrega2.md).

## Índice de la documentación

| Doc | Contenido |
| --- | --- |
| [01-arquitectura.md](docs/desarrollo/01-arquitectura.md) | Capas, flujo de datos y mapa de navegación. |
| [02-modulo-teorico.md](docs/desarrollo/02-modulo-teorico.md) | Módulo teórico (RF02/HU01): `teoria.json`, `TeoriaScreen`, `TemaScreen`. |
| [03-motor-escenarios.md](docs/desarrollo/03-motor-escenarios.md) | Motor puro de escenarios (`motor.js`), formato de `escenarios.json` y los dos escenarios. |
| [04-almacenamiento.md](docs/desarrollo/04-almacenamiento.md) | `storage.js`: claves, política de errores y cuándo se guarda el progreso. |
| [05-pantallas-escenarios.md](docs/desarrollo/05-pantallas-escenarios.md) | `EscenariosScreen`, `EscenarioScreen` y `PanelFeedback` (RF03/RF04). |
| [06-pruebas.md](docs/desarrollo/06-pruebas.md) | Pruebas automáticas (`node:test`), verificación de bundle y checklist manual por HU. |
| [07-diseno-ui.md](docs/desarrollo/07-diseno-ui.md) | Sistema de diseño estilo iOS: colores, iconos (sin emojis), componentes y reglas de rendimiento. |
| [08-resumen-desempeno.md](docs/desarrollo/08-resumen-desempeno.md) | Resumen con recomendaciones (RF10/HU06) y desempeño por categoría (RF07/HU05). |
| [09-pruebas-usabilidad.md](docs/desarrollo/09-pruebas-usabilidad.md) | Protocolo de pruebas de usabilidad con usuarios y plantilla de hallazgos. |

## Cómo ejecutar

```bash
cd app
pnpm install         # el proyecto usa pnpm (pnpm-lock.yaml), no npm
pnpm expo start      # abre en Expo Go (escanear QR) o emulador
pnpm test            # pruebas de la lógica pura (node:test, sin dependencias)
```

Para agregar librerías usa siempre `pnpm expo install <paquete>` (resuelve versiones compatibles con el SDK 58).

## Estructura de `app/`

```text
app/
├── App.js                      # NavigationContainer + Stack con las 6 rutas
├── index.js                    # registerRootComponent (plantilla de Expo)
├── app.json                    # config Expo (nombre, iconos, orientación vertical)
├── package.json                # dependencias y script "test"
├── assets/                     # iconos y splash
└── src/
    ├── theme.js                # tokens de diseño estilo iOS (colores, espacios, fuentes, radios)
    ├── storage.js              # única puerta a AsyncStorage
    ├── components/
    │   ├── BotonGrande.js      # botón de acción con icono (relleno o secundario)
    │   ├── Fila.js             # fila tocable estilo iOS: icono en cuadro, textos, chevron
    │   ├── Grupo.js            # lista agrupada con esquinas redondeadas y separadores
    │   ├── PanelFeedback.js    # tarjeta de retroalimentación tras cada decisión
    │   └── ResumenEscenario.js # resumen final: aciertos, decisiones y temas a repasar
    ├── data/
    │   ├── teoria.json         # categorías → temas (contenido embebido)
    │   └── escenarios.json     # 2 escenarios como grafo de nodos
    ├── logic/
    │   ├── motor.js            # funciones puras del motor de escenarios
    │   ├── motor.test.mjs
    │   ├── resumen.js          # funciones puras: resumen de un escenario y desempeño por categoría
    │   └── resumen.test.mjs
    └── screens/
        ├── InicioScreen.js
        ├── TeoriaScreen.js
        ├── TemaScreen.js
        ├── EscenariosScreen.js
        ├── EscenarioScreen.js
        └── DesempenoScreen.js
```

## Trazabilidad: requisito → archivos → estado

| Requisito | Historia | Implementado en | Estado |
| --- | --- | --- | --- |
| RF02 Contenido teórico (1-2 categorías) | HU01 | [teoria.json](app/src/data/teoria.json) (ventilación, explosivos; 3 temas c/u), [TeoriaScreen.js](app/src/screens/TeoriaScreen.js), [TemaScreen.js](app/src/screens/TemaScreen.js) | Hecho |
| RF03 Motor de decisiones encadenadas (1-2 escenarios) | HU02 | [motor.js](app/src/logic/motor.js), [escenarios.json](app/src/data/escenarios.json) (`gas-galeria`, `tiro-fallado`), [EscenarioScreen.js](app/src/screens/EscenarioScreen.js) | Hecho |
| RF04 Retroalimentación inmediata | HU03 | [PanelFeedback.js](app/src/components/PanelFeedback.js), campo `feedback` de cada opción, [EscenarioScreen.js:46-52](app/src/screens/EscenarioScreen.js#L46-L52) | Hecho |
| RF05 Progreso local | HU04 | [storage.js](app/src/storage.js), [EscenarioScreen.js:17-39](app/src/screens/EscenarioScreen.js#L17-L39), etiqueta en [EscenariosScreen.js:16-22](app/src/screens/EscenariosScreen.js#L16-L22) | Hecho |
| RF10 Resumen al finalizar | HU06 | [resumen.js](app/src/logic/resumen.js) (`resumir`), [ResumenEscenario.js](app/src/components/ResumenEscenario.js) | Hecho |
| RF07 Desempeño por categoría | HU05 | [resumen.js](app/src/logic/resumen.js) (`desempenoPorCategoria`), [DesempenoScreen.js](app/src/screens/DesempenoScreen.js) | Hecho |
| RF01 Contenido embebido (sin backend) | HU01 | `import` directo de los JSON (p. ej. [TeoriaScreen.js:4](app/src/screens/TeoriaScreen.js#L4), [EscenarioScreen.js:7](app/src/screens/EscenarioScreen.js#L7)) | Hecho |
| RF-DATA Modelo local usuario/escenario/decisión/resultado | — | Estado del motor (decisiones) y resultados en AsyncStorage, ver [04-almacenamiento.md](docs/desarrollo/04-almacenamiento.md) | Hecho (sin entidad usuario: un dispositivo = un trabajador) |
| RF06/RF08/RF09 Sincronización, login, panel de supervisores | — | — | Fuera del MVP (*Won't*) |

## Avance frente al cronograma de entrega2.md

| Semana | Entregable | Estado |
| --- | --- | --- |
| 1 (5-11 oct) | Esqueleto Expo + React Navigation, app navegable | Hecho |
| 2 (12-18 oct) | Módulo teórico funcional sin conexión + almacenamiento local | Hecho |
| 3 (19-25 oct) | Escenario 1 jugable de inicio a fin (ramas + retroalimentación) | Hecho |
| 4 (26 oct-1 nov) | Escenario 2, resumen con recomendaciones, desempeño por categoría | Hecho |
| 5 (2-8 nov) | MVP integrado + pruebas de usabilidad con 2-3 usuarios | Integración hecha. Protocolo listo en [09-pruebas-usabilidad.md](docs/desarrollo/09-pruebas-usabilidad.md); **falta ejecutarlo con usuarios reales** |
| 6 (9-13 nov) | Correcciones según hallazgos + documento final | Pendiente de los resultados de la semana 5 |

## Decisiones de proyecto

- **React Navigation directo, no Expo Router.** [app/AGENTS.md](app/AGENTS.md) (generado por la plantilla de Expo) recomienda Expo Router, pero la especificación (entrega2.md, semana 1: "esqueleto de la app (Expo + React Navigation)") pide React Navigation. Con 6 pantallas, un único Stack declarado en [App.js](app/App.js) es más fácil de leer para el equipo que rutas basadas en archivos. Ignora esa sección de AGENTS.md mientras se mantenga esta decisión.
- **Contenido embebido en JSON (RF01), sin backend.** Los textos viven en `src/data/*.json` y se empaquetan con la app. Así todo funciona sin señal dentro del socavón (RNF02) y no hay servidor que mantener; sincronización/login/panel de supervisores (RF06/RF08/RF09) están fuera del MVP. Cambiar contenido = editar el JSON y publicar una nueva versión.
- **Recomendaciones derivadas, no escritas a mano.** Cada nodo de decisión indica qué `tema` de la teoría cubre; el resumen recomienda los temas de los nodos donde el usuario se equivocó. Ver [08-resumen-desempeno.md](docs/desarrollo/08-resumen-desempeno.md).
