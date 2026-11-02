# Documentación de desarrollo — Minería: Decide

App móvil de capacitación en seguridad minera subterránea, **offline**, basada en escenarios de decisiones encadenadas. Expo SDK 58, JavaScript, React Navigation (native-stack), AsyncStorage.

El código **no tiene comentarios a propósito**: esta carpeta es la única explicación de dónde está cada cosa, cómo funciona y por qué se hizo así. Si cambias el código, actualiza el documento correspondiente (sobre todo las referencias de línea).

Especificación del proyecto (requisitos RF/RNF, historias HU, cronograma): [entrega2.md](../entrega2.md).

## Índice

| Doc | Contenido |
| --- | --- |
| [01-arquitectura.md](01-arquitectura.md) | Capas, flujo de datos y mapa de navegación. |
| [02-modulo-teorico.md](02-modulo-teorico.md) | Módulo teórico (RF02/HU01): `teoria.json`, `TeoriaScreen`, `TemaScreen`. |
| [03-motor-escenarios.md](03-motor-escenarios.md) | Motor puro de escenarios (`motor.js`) y formato de `escenarios.json`. |
| [04-almacenamiento.md](04-almacenamiento.md) | `storage.js`: claves, política de errores y cuándo se guarda el progreso. |
| [05-pantallas-escenarios.md](05-pantallas-escenarios.md) | `EscenariosScreen`, `EscenarioScreen` y `PanelFeedback` (RF03/RF04). |
| [06-pruebas.md](06-pruebas.md) | Pruebas automáticas (`node:test`), verificación de bundle y checklist manual por HU. |
| [07-diseno-ui.md](07-diseno-ui.md) | Sistema de diseño estilo iOS: colores, iconos (sin emojis), `Fila`, `Grupo`, `BotonGrande`, `PanelFeedback` y reglas de rendimiento. |

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
├── App.js                      # NavigationContainer + Stack con las 5 rutas
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
    │   └── PanelFeedback.js    # tarjeta de retroalimentación tras cada decisión
    ├── data/
    │   ├── teoria.json         # categorías → temas (contenido embebido)
    │   └── escenarios.json     # escenarios como grafo de nodos
    ├── logic/
    │   ├── motor.js            # funciones puras del motor de escenarios
    │   └── motor.test.mjs      # pruebas con node:test
    └── screens/
        ├── InicioScreen.js
        ├── TeoriaScreen.js
        ├── TemaScreen.js
        ├── EscenariosScreen.js
        └── EscenarioScreen.js
```

## Trazabilidad: requisito → archivos → estado

| Requisito | Historia | Implementado en | Estado |
| --- | --- | --- | --- |
| RF02 Contenido teórico (1-2 categorías) | HU01 | [teoria.json](../../app/src/data/teoria.json) (ventilación, explosivos; 3 temas c/u), [TeoriaScreen.js](../../app/src/screens/TeoriaScreen.js), [TemaScreen.js](../../app/src/screens/TemaScreen.js) | Hecho |
| RF03 Motor de decisiones encadenadas | HU02 | [motor.js](../../app/src/logic/motor.js), [escenarios.json](../../app/src/data/escenarios.json) (1 escenario: `gas-galeria`), [EscenarioScreen.js](../../app/src/screens/EscenarioScreen.js) | Hecho (escenario 1) |
| RF04 Retroalimentación inmediata | HU03 | [PanelFeedback.js](../../app/src/components/PanelFeedback.js), campo `feedback` de cada opción, [EscenarioScreen.js:47-53](../../app/src/screens/EscenarioScreen.js#L47-L53) | Hecho |
| RF05 Progreso local | HU04 | [storage.js](../../app/src/storage.js), [EscenarioScreen.js:18-40](../../app/src/screens/EscenarioScreen.js#L18-L40), badge en [EscenariosScreen.js:16-22](../../app/src/screens/EscenariosScreen.js#L16-L22) | Hecho |
| RF01 Contenido embebido (sin backend) | HU01 | `import` directo de los JSON en las pantallas (p. ej. [TeoriaScreen.js:4](../../app/src/screens/TeoriaScreen.js#L4), [EscenarioScreen.js:8](../../app/src/screens/EscenarioScreen.js#L8)) | Hecho |
| RF10 Resumen con recomendaciones | HU06 | Solo hay conteo de aciertos/errores en [EscenarioScreen.js:55-80](../../app/src/screens/EscenarioScreen.js#L55-L80); faltan recomendaciones | Pendiente (semana 4) |
| RF07 Desempeño por categoría | HU05 | Datos ya guardados: `cargarResultados()` en [storage.js:35-38](../../app/src/storage.js#L35-L38) (cada resultado lleva `categoriaId`); falta la pantalla | Pendiente (semana 4) |

## Avance frente al cronograma de entrega2.md

| Semana | Entregable | Estado |
| --- | --- | --- |
| 1 (5-11 oct) | Esqueleto Expo + React Navigation, app navegable | Hecho |
| 2 (12-18 oct) | Módulo teórico funcional sin conexión + almacenamiento local | Hecho |
| 3 (19-25 oct) | Escenario 1 jugable de inicio a fin (ramas + retroalimentación) | Hecho |
| 4 (26 oct-1 nov) | Resumen final con recomendaciones (RF10/HU06), desempeño por categoría (RF07/HU05), escenario 2 | **Pendiente** |
| 5 (2-8 nov) | Integración + pruebas de usabilidad con 2-3 usuarios | **Pendiente** |
| 6 (9-13 nov) | Correcciones y entrega del MVP | **Pendiente** |

Pistas para lo pendiente:

- **Escenario 2**: agregar un objeto más al arreglo de [escenarios.json](../../app/src/data/escenarios.json) (p. ej. con `categoriaId: "explosivos"`). No hace falta tocar código; la lista y el motor lo recogen solos. El test de [motor.test.mjs:48-52](../../app/src/logic/motor.test.mjs#L48-L52) lo valida automáticamente.
- **HU06 recomendaciones**: los nodos finales hoy solo tienen `situacion` y `final`; se puede añadir un campo (p. ej. `recomendacion`) en el JSON o derivarlo de las decisiones incorrectas (`estado.decisiones`). Ver [03-motor-escenarios.md](03-motor-escenarios.md).
- **HU05 desempeño**: agrupar `cargarResultados()` por `categoriaId`. La forma de cada resultado está en [04-almacenamiento.md](04-almacenamiento.md#forma-del-resultado-para-hu05).

## Decisiones de proyecto

- **React Navigation directo, no Expo Router.** [app/AGENTS.md](../../app/AGENTS.md) (generado por la plantilla de Expo) recomienda Expo Router, pero la especificación (entrega2.md, semana 1: "esqueleto de la app (Expo + React Navigation)") pide React Navigation. Con 5 pantallas, un único Stack declarado en [App.js](../../app/App.js) es más fácil de leer para el equipo que rutas basadas en archivos. Ignora esa sección de AGENTS.md mientras se mantenga esta decisión.
- **Contenido embebido en JSON (RF01), sin backend.** Los textos viven en `src/data/*.json` y se empaquetan con la app. Así todo funciona sin señal dentro del socavón (RNF02) y no hay servidor que mantener; sincronización/login/panel de supervisores (RF06/RF08/RF09) están fuera del MVP. Cambiar contenido = editar el JSON y publicar una nueva versión.
