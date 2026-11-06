# 08 · Resumen y desempeño (RF10 / RF07 · HU06 / HU05)

Cierra el ciclo **aprender → practicar → ver en qué fallo → repasar**:

- **Resumen al terminar un escenario (HU06):** aciertos, errores, porcentaje, cada decisión tomada y los temas de teoría que conviene repasar.
- **Desempeño por categoría (HU05):** acumulado de todos los escenarios completados, ordenado de peor a mejor, con aviso de "Necesita refuerzo".

| Archivo | Rol |
|---|---|
| [resumen.js](../../app/src/logic/resumen.js) | Lógica pura: `resumir` y `desempenoPorCategoria` |
| [resumen.test.mjs](../../app/src/logic/resumen.test.mjs) | Pruebas de esa lógica y de la coherencia escenarios ↔ teoría |
| [ResumenEscenario.js](../../app/src/components/ResumenEscenario.js) | Vista de fin de escenario (reemplaza la vista de fin simple de la primera mitad) |
| [DesempenoScreen.js](../../app/src/screens/DesempenoScreen.js) | Pantalla "Mi desempeño" |
| [escenarios.json](../../app/src/data/escenarios.json) | Campo nuevo `tema` en cada nodo de decisión |

Igual que el motor, la lógica no conoce React ni AsyncStorage: recibe datos y devuelve datos. Por eso se prueba con `node --test` (ver [06-pruebas.md](06-pruebas.md)).

---

## 1. De dónde salen las recomendaciones

Cada **nodo de decisión** tiene un campo `tema` con el `id` de un tema de la teoría, **dentro de la categoría del escenario** (p. ej. [escenarios.json:11](../../app/src/data/escenarios.json#L11)):

```json
"n1": {
  "situacion": "Terminó la voladura en la galería 3...",
  "tema": "ventilacion-socavon",
  "opciones": [ ... ]
}
```

La recomendación se **deriva**: si el usuario se equivocó en un nodo, se le recomienda el tema de ese nodo.

**Por qué así y no un texto de recomendación escrito en cada final:**

- Un final se alcanza por varios caminos (p. ej. `finIntoxicado` llega desde `n2b`, `n2c` y `n3b`), así que un texto fijo no sabe qué hizo mal *este* usuario.
- Un tema existente lleva directo a la teoría: la recomendación se puede tocar, no solo leer.
- Es un solo campo por nodo, fácil de mantener; la prueba [resumen.test.mjs:46-55](../../app/src/logic/resumen.test.mjs#L46-L55) falla si un `tema` o un `categoriaId` no existe en `teoria.json`.

El campo es opcional: un nodo sin `tema` simplemente no genera recomendación.

## 2. `resumen.js`

### `resumir(escenario, estado)` — [L7-L16](../../app/src/logic/resumen.js#L7-L16)

Recibe el escenario y el estado del motor al terminar (`{ escenarioId, nodoId, decisiones }`) y devuelve:

```js
{
  aciertos, errores,            // de contarResultados (motor.js), no se recalcula
  porcentaje,                   // 0-100, entero
  decisiones: [{ situacion, texto, correcta, feedback, tema }],
  temasRecomendados: ['ventilacion-socavon', ...]
}
```

- [L9-L13](../../app/src/logic/resumen.js#L9-L13): reconstruye cada decisión a partir de `nodoId` y el índice `opcion` guardados en el estado. **No hace falta guardar textos en el estado**: el escenario ya los tiene, y así el estado guardado sigue siendo pequeño (ver [04-almacenamiento.md](04-almacenamiento.md)).
- [L14](../../app/src/logic/resumen.js#L14): temas de las decisiones incorrectas, sin repetir (`Set`) y en el orden en que ocurrieron los errores.
- [L5](../../app/src/logic/resumen.js#L5): el porcentaje devuelve 0 si no hubo decisiones, para no dividir entre cero.

### `desempenoPorCategoria(resultados)` — [L18-L32](../../app/src/logic/resumen.js#L18-L32)

Recibe el arreglo de `cargarResultados()` (un registro por escenario completado, [forma en 04](04-almacenamiento.md#forma-del-resultado-para-hu05)) y devuelve una fila por categoría:

```js
[{ categoriaId, intentos, aciertos, errores, porcentaje, necesitaRefuerzo }]
```

- [L20-L25](../../app/src/logic/resumen.js#L20-L25): suma por `categoriaId` en una sola pasada.
- [L28](../../app/src/logic/resumen.js#L28): el porcentaje se calcula sobre **todas las decisiones** de la categoría, no como promedio de porcentajes; así un escenario de 6 decisiones pesa más que uno de 3.
- [L29](../../app/src/logic/resumen.js#L29): `necesitaRefuerzo` si queda por debajo de `UMBRAL_REFUERZO` (70 %, [L3](../../app/src/logic/resumen.js#L3)). Es una constante exportada para que la pantalla muestre el mismo número que usa la lógica. Si las pruebas de usabilidad sugieren otro umbral, se cambia solo ahí.
- [L31](../../app/src/logic/resumen.js#L31): ordena de menor a mayor porcentaje, para que lo que más necesita refuerzo quede arriba (HU05: "saber en qué temas necesito reforzar más").

## 3. `ResumenEscenario` — vista de fin (HU06)

[ResumenEscenario.js](../../app/src/components/ResumenEscenario.js). Se muestra desde [EscenarioScreen.js:54-64](../../app/src/screens/EscenarioScreen.js#L54-L64) cuando el escenario termina y ya se vio el feedback de la última decisión.

| Prop | Uso |
|---|---|
| `escenario`, `estado` | Datos para `resumir` |
| `onReintentar` | Reinicia el escenario (`reintentar` de `EscenarioScreen`) |
| `onVolver` | `navigation.goBack()` |
| `onTema(tema)` | Abre el tema recomendado: `navigate('Tema', { categoriaId, temaId, titulo })` ([EscenarioScreen.js:61](../../app/src/screens/EscenarioScreen.js#L61)) |

Bloques, de arriba abajo:

1. **Desenlace** ([L28-L32](../../app/src/components/ResumenEscenario.js#L28-L32)): icono `flag` y la `situacion` del nodo final.
2. **Tres datos** ([L34-L38](../../app/src/components/ResumenEscenario.js#L34-L38)): aciertos, errores y desempeño en %, con el componente local `Dato` ([L10-L18](../../app/src/components/ResumenEscenario.js#L10-L18)).
3. **Tus decisiones** ([L40-L55](../../app/src/components/ResumenEscenario.js#L40-L55)): cada opción elegida con check verde o cruz roja. En las incorrectas se repite el `feedback` ([L51](../../app/src/components/ResumenEscenario.js#L51)), para que el usuario no tenga que recordar la explicación de una pantalla anterior. Estas filas **no** son tocables, por eso no usan `Fila` (que lleva chevron).
4. **Te recomendamos repasar** ([L57-L63](../../app/src/components/ResumenEscenario.js#L57-L63)): una `Fila` por tema recomendado, con el icono del tema y el color de la categoría. Si no hubo errores se muestra en su lugar un mensaje de felicitación ([L64-L67](../../app/src/components/ResumenEscenario.js#L64-L67)).
5. **Reintentar / Volver** ([L70-L71](../../app/src/components/ResumenEscenario.js#L70-L71)).

**Por qué es un componente y no una pantalla nueva:** el resumen necesita el estado final de la partida, que vive en `EscenarioScreen`. Una ruta aparte obligaría a pasar el estado por parámetros de navegación. Además, "Volver" debe regresar a la lista de escenarios, no a la última decisión.

El guardado del resultado **no** ocurre aquí: ya se hizo en `onElegir` al llegar al nodo final ([04-almacenamiento.md](04-almacenamiento.md)). El resumen solo lee.

## 4. `DesempenoScreen` — Mi desempeño (HU05)

[DesempenoScreen.js](../../app/src/screens/DesempenoScreen.js). Ruta `Desempeno`, accesible desde la fila "Mi desempeño" del Inicio ([InicioScreen.js:28-37](../../app/src/screens/InicioScreen.js#L28-L37)).

- [L52-L56](../../app/src/screens/DesempenoScreen.js#L52-L56): `useFocusEffect` relee `cargarResultados()` cada vez que la pantalla gana foco. Mismo motivo que en la lista de escenarios ([05-pantallas-escenarios.md](05-pantallas-escenarios.md#por-qué-usefocuseffect-y-no-useeffect)): al volver de un escenario debe verse el resultado nuevo.
- [L58](../../app/src/screens/DesempenoScreen.js#L58): mientras carga devuelve `null` (la lectura es casi instantánea; un spinner solo parpadearía).
- [L60-L71](../../app/src/screens/DesempenoScreen.js#L60-L71): **estado vacío**. Si no hay resultados, explica qué hacer y ofrece el botón "Ir a escenarios".
- [L73](../../app/src/screens/DesempenoScreen.js#L73): `desempenoPorCategoria(resultados)`.
- `FilaCategoria` ([L14-L47](../../app/src/screens/DesempenoScreen.js#L14-L47)): icono y color de la categoría, porcentaje, barra de progreso, intentos/aciertos/errores y, si corresponde, "Necesita refuerzo: repasa la teoría". Al tocarla abre la teoría.
  - La barra ([L31-L33](../../app/src/screens/DesempenoScreen.js#L31-L33)) es un `View` con ancho en %, sin librería de gráficos ni animación (ver [07-diseno-ui.md](07-diseno-ui.md#reglas-de-rendimiento)).
  - Color naranja si necesita refuerzo, verde si no ([L16](../../app/src/screens/DesempenoScreen.js#L16)), además del texto: no depende solo del color.
- Solo aparecen categorías **con al menos un intento**. Una categoría sin practicar no tiene porcentaje que mostrar; mostrarla en 0 % confundiría "no practicado" con "todo mal".

## 5. Escenario 2: `tiro-fallado`

Categoría `explosivos`. Grafo y contenido en [03-motor-escenarios.md](03-motor-escenarios.md#escenario-2-tiro-fallado). Con él cada categoría de teoría tiene un escenario, así que la pantalla de desempeño puede mostrar las dos.
