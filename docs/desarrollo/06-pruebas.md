# 06 — Pruebas

## Estrategia: solo lo necesario

| Qué | Cómo | Por qué |
| --- | --- | --- |
| Lógica pura ([motor.js](../../app/src/logic/motor.js), [resumen.js](../../app/src/logic/resumen.js)) | Pruebas automáticas con `node:test` (incluido en Node) | Es donde están las reglas que pueden romperse en silencio: ramas, conteo, grafo del JSON. |
| Que la app compile | `pnpm expo export` (verificación de bundle) | Detecta imports rotos o errores de sintaxis en pantallas/componentes sin emulador. |
| Pantallas y flujos | Checklist manual en teléfono (abajo) | Son pocas pantallas; probar UI automáticamente (Jest + Testing Library) añadiría dependencias y configuración que el equipo tendría que mantener. |

No se usa Jest ni ninguna dependencia de pruebas: `motor.js` y `resumen.js` no importan React ni AsyncStorage, así que node lo ejecuta directo.

## Pruebas automáticas — [motor.test.mjs](../../app/src/logic/motor.test.mjs)

El archivo carga el escenario real desde `escenarios.json` ([L6](../../app/src/logic/motor.test.mjs#L6)) y define un escenario mínimo `mini` de un nodo con dos salidas finales ([L8-L16](../../app/src/logic/motor.test.mjs#L8-L16)).

| Test | Líneas | Qué asegura |
| --- | --- | --- |
| iniciar parte del nodo de inicio sin decisiones | [L18-L21](../../app/src/logic/motor.test.mjs#L18-L21) | `iniciar` crea `{ escenarioId, nodoId: inicio, decisiones: [] }` y `nodoActual` devuelve el nodo de inicio. |
| elección correcta e incorrecta llevan a ramas distintas y no mutan el estado | [L23-L35](../../app/src/logic/motor.test.mjs#L23-L35) | Cada opción lleva a su `siguiente` (criterio HU02: rama distinta); `elegir` devuelve la opción (para el feedback de HU03); el estado original queda intacto (inmutabilidad, necesaria para React); `esFinal` y `contarResultados` funcionan. |
| recorrido completo del escenario real por la ruta correcta | [L37-L46](../../app/src/logic/motor.test.mjs#L37-L46) | Eligiendo siempre la opción correcta del escenario 1 se llega a `finExito` con 3 aciertos: confirma las ≥3 decisiones encadenadas de HU02 con el contenido real. |
| validarEscenario detecta errores y acepta los escenarios reales | [L48-L52](../../app/src/logic/motor.test.mjs#L48-L52) | Un escenario roto produce 3 errores (siguiente inexistente, nodo no final sin opciones, nodo inalcanzable) y **todos** los escenarios de `escenarios.json` son válidos. |

El último test es la red de seguridad del contenido: `validarEscenario` no se ejecuta dentro de la app, así que cualquier edición de `escenarios.json` debe pasar `pnpm test` antes de publicarse. Si el test 3 falla tras editar el escenario 1, actualiza `finExito` o el número de aciertos esperado.

## Pruebas automáticas — [resumen.test.mjs](../../app/src/logic/resumen.test.mjs)

| Test | Líneas | Qué asegura |
| --- | --- | --- |
| resumir lista decisiones y recomienda solo temas de los errores | [L16-L25](../../app/src/logic/resumen.test.mjs#L16-L25) | Jugando el escenario 1 con un error en `n1`: 3 decisiones, 2 aciertos, 67 %, y se recomienda solo el tema de `n1` (HU06). |
| resumir sin errores no recomienda temas | [L27-L31](../../app/src/logic/resumen.test.mjs#L27-L31) | Ruta correcta del escenario 2: 100 % y ninguna recomendación. También confirma que el escenario 2 se puede completar. |
| desempenoPorCategoria acumula y ordena | [L33-L44](../../app/src/logic/resumen.test.mjs#L33-L44) | Suma intentos por categoría, calcula el % sobre todas las decisiones, marca `necesitaRefuerzo` bajo 70 % y ordena de peor a mejor (HU05). Un historial vacío da `[]`. |
| escenarios ↔ teoría | [L46-L55](../../app/src/logic/resumen.test.mjs#L46-L55) | Cada `categoriaId` y cada `tema` de los escenarios existen en `teoria.json`. Evita recomendaciones que lleven a "Tema no encontrado". |

En total `pnpm test` ejecuta **8 pruebas**.

### Cómo ejecutarlas

```bash
cd app
pnpm test
```

El script es `node --test "src/logic/*.test.mjs"` ([package.json:21](../../app/package.json#L21)).

- Se usa un **glob** porque `node --test src/logic/` (pasar la carpeta) falla en Node 24: interpreta el argumento como archivo. El glob entre comillas lo expande node, así funciona igual en Windows y Linux.
- Aparece un aviso `[MODULE_TYPELESS_PACKAGE_JSON]`: node no sabe si `motor.js` es CommonJS o ES module y lo reinterpreta como ES module. Es **inofensivo**. No se agregó `"type": "module"` al `package.json` para eliminarlo porque cambia cómo node interpreta todos los `.js` del proyecto, incluidos archivos de configuración que lee Metro/Expo (p. ej. un futuro `metro.config.js` o `babel.config.js` en CommonJS), y podría romper el arranque de la app.
- El test es `.mjs` para que node lo trate como ES module sin esa configuración.

## Verificación de bundle (smoke check)

```bash
cd app
pnpm expo export --platform android --output-dir <carpeta-temporal>
```

Si termina con `Exported: ...`, todas las pantallas y componentes compilan e importan bien. No prueba comportamiento; es el chequeo rápido antes de entregar o después de refactorizar. Usa una carpeta fuera del proyecto (o bórrala después) para no versionar el bundle.

## Checklist manual por historia de usuario

Probar en un teléfono Android real con Expo Go (idealmente uno de gama básica).

### HU01 — Contenido teórico sin conexión (RF02, RF01)

- [ ] Con **modo avión** activado, abrir la app → Contenido teórico: se ven las 2 categorías (Ventilación, Explosivos) con sus temas.
- [ ] Abrir un tema: aparecen icono, párrafos y "Puntos clave"; el header muestra el título del tema.
- [ ] En toda la app se ven iconos (Ionicons), nunca emojis ni cuadros "?" (icono con nombre inválido).
- [ ] "Practicar un escenario" desde un tema lleva a la lista de escenarios.
- [ ] Textos legibles sin hacer zoom; botones fáciles de tocar.

### HU02 — Escenario de decisiones encadenadas (RF03)

- [ ] Completar el escenario por la ruta correcta: al menos 3 decisiones ("Decisión 1, 2, 3") hasta "Fin del escenario".
- [ ] Repetir eligiendo una opción incorrecta en la primera decisión: la situación siguiente es distinta (otra rama).
- [ ] Llegar a un final distinto del de éxito por alguna rama incorrecta.

### HU03 — Retroalimentación inmediata (RF04)

- [ ] Tras cada decisión aparece el panel con icono verde de check y "Correcto" o icono rojo de cruz e "Incorrecto", la opción elegida y la explicación.
- [ ] La siguiente decisión no aparece hasta pulsar "Continuar".
- [ ] En el final, el conteo de aciertos/errores coincide con lo que se eligió.

### HU04 — Progreso guardado localmente (RF05)

- [ ] En modo avión, empezar el escenario, tomar 1-2 decisiones, **cerrar la app por completo** (quitarla de recientes) y reabrir: la lista muestra el badge "En progreso" y al entrar continúa en la decisión siguiente, con la numeración correcta.
- [ ] Cerrar la app **mientras se ve el panel de retroalimentación**: al reabrir aparece la siguiente decisión (se pierde solo esa explicación; la decisión no se repite).
- [ ] Terminar el escenario y volver: el badge "En progreso" ya no aparece.
- [ ] Terminar el escenario, cerrar y reabrir: al entrar empieza desde la decisión 1 (no se queda en el final).
- [ ] "Reintentar" en el final empieza desde la decisión 1.

### HU05 — Desempeño por categoría (RF07)

- [ ] Sin haber completado escenarios, "Mi desempeño" muestra el estado vacío y el botón "Ir a escenarios".
- [ ] Tras terminar un escenario y volver, la categoría aparece con su porcentaje, intentos, aciertos y errores.
- [ ] Con desempeño menor a 70 % aparece "Necesita refuerzo" en naranja; la categoría con peor resultado queda arriba.
- [ ] Tocar una categoría abre la teoría.

### HU06 — Resumen al finalizar (RF10)

- [ ] Al terminar se ven aciertos, errores, porcentaje y la lista de decisiones con check o cruz.
- [ ] Las decisiones incorrectas repiten su explicación.
- [ ] Con errores aparece "Te recomendamos repasar" y tocar un tema abre su teoría; sin errores aparece el mensaje de felicitación.

### Escenario 2

- [ ] "Tiro fallado en el frente" aparece en la lista con el icono de explosivos y se juega de inicio a fin por cada rama.

## Pruebas con usuarios

El protocolo de usabilidad con 2-3 usuarios (tareas, métricas, SUS y plantilla de hallazgos) está en [09-pruebas-usabilidad.md](09-pruebas-usabilidad.md).
