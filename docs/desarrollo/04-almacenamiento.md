# 04 — Almacenamiento local (RF05 / HU04)

Todo el acceso a disco pasa por [storage.js](../../app/src/storage.js), que envuelve `@react-native-async-storage/async-storage` (clave-valor, strings). Ninguna pantalla importa AsyncStorage directamente: si mañana se cambia a SQLite, solo cambia este archivo.

## Claves

| Clave | Contenido | Definida en |
| --- | --- | --- |
| `@mineria/progreso/<escenarioId>` | El estado del motor de una partida en curso: `{ escenarioId, nodoId, decisiones: [{ nodoId, opcion, correcta }] }`. Una clave por escenario. | [storage.js:3](../../app/src/storage.js#L3) |
| `@mineria/resultados` | Arreglo con un objeto por cada escenario terminado (historial, nunca se sobrescribe). | [storage.js:4](../../app/src/storage.js#L4) |

El prefijo `@mineria/` evita choques con otras librerías que usen AsyncStorage. Los valores se guardan como JSON.

## Funciones

| Función | Líneas | Qué hace |
| --- | --- | --- |
| `leer(clave)` (interna) | [L6-L13](../../app/src/storage.js#L6-L13) | `getItem` + `JSON.parse`. Si no existe, o falla la lectura o el parseo, devuelve `null`. |
| `escribir(clave, valor)` (interna) | [L15-L19](../../app/src/storage.js#L15-L19) | `JSON.stringify` + `setItem`. Si falla, no hace nada. |
| `guardarProgreso(escenarioId, estado)` | [L21-L23](../../app/src/storage.js#L21-L23) | Sobrescribe el progreso del escenario. |
| `cargarProgreso(escenarioId)` | [L25-L27](../../app/src/storage.js#L25-L27) | Devuelve el estado guardado o `null`. |
| `borrarProgreso(escenarioId)` | [L29-L33](../../app/src/storage.js#L29-L33) | `removeItem`; errores ignorados. |
| `cargarResultados()` | [L35-L38](../../app/src/storage.js#L35-L38) | Devuelve siempre un arreglo (`[]` si no hay nada o el dato no es un arreglo). |
| `guardarResultado(resultado)` | [L40-L43](../../app/src/storage.js#L40-L43) | Lee el arreglo, agrega al final y lo vuelve a escribir. |

### Política: nunca lanzar

Todas las funciones atrapan sus errores (`try/catch` vacío o que devuelve `null`) y **nunca rechazan la promesa**. Por qué:

- En teléfonos de gama básica el almacenamiento puede llenarse o un dato quedar corrupto (app cerrada a mitad de escritura, JSON truncado). Si `JSON.parse` lanzara dentro de la pantalla del escenario, el trabajador vería un error rojo o una pantalla en blanco.
- El peor caso con esta política es aceptable: un progreso ilegible se lee como `null` y el escenario **empieza de nuevo**. Para una práctica de 3-4 decisiones es mejor que un crash.
- Por eso las pantallas pueden llamar a estas funciones sin `await` ni `.catch()` (ver abajo).

`cargarResultados` además valida con `Array.isArray` ([L37](../../app/src/storage.js#L37)), para que un valor raro no rompa `guardarResultado` ni la futura pantalla de desempeño.

`guardarResultado` es leer-modificar-escribir, no atómico. No es un problema porque solo se llama una vez por escenario terminado y nunca en paralelo.

## Cuándo se guarda: diseño en `EscenarioScreen.onElegir`

La persistencia no está en un `useEffect` que observe el estado, sino dentro del manejador del toque, [EscenarioScreen.js:29-40](../../app/src/screens/EscenarioScreen.js#L29-L40):

```js
const resultado = elegir(escenario, estado, indice);
if (esFinal(escenario, resultado.estado)) {
  guardarResultado({ ... });
  borrarProgreso(escenario.id);
} else {
  guardarProgreso(escenario.id, resultado.estado);
}
setEstado(resultado.estado);
setFeedback(resultado.opcion);
```

### 1. Se guarda justo después de cada decisión, con el estado ya avanzado

`guardarProgreso` recibe `resultado.estado` ([L36](../../app/src/screens/EscenarioScreen.js#L36)), es decir, el nodo **siguiente** y la decisión ya agregada a `decisiones`. Lo que **no** se guarda es que el usuario está viendo el panel de retroalimentación (`feedback` es estado de React, [L16](../../app/src/screens/EscenarioScreen.js#L16)).

Consecuencia si la app se cierra mientras se lee la explicación: al volver, aparece directamente la siguiente decisión. Se pierde **solo una explicación**, pero la decisión nunca se pierde ni se cuenta dos veces (si se guardara el estado anterior, el usuario podría repetir la decisión y elegir otra opción tras ver la respuesta).

### 2. Al llegar a un nodo final: resultado + borrado dentro de `onElegir`

Si la opción lleva a un nodo final ([L31-L34](../../app/src/screens/EscenarioScreen.js#L31-L34)) se guarda el resultado y se borra el progreso **en el mismo manejador**, no en un efecto que reaccione a "terminado". Por qué:

- **Badge "En progreso" obsoleto.** [EscenariosScreen.js:16-22](../../app/src/screens/EscenariosScreen.js#L16-L22) relee el progreso cada vez que la lista recibe foco. Si el borrado ocurriera en un efecto posterior, una carrera asíncrona (usuario vuelve atrás rápido) podría dejar el badge encendido en un escenario ya terminado. Lanzando el borrado en el toque, ocurre mucho antes de que el usuario pueda pulsar Continuar y Volver.
- **Doble registro.** Un efecto que dependa del estado puede ejecutarse más de una vez (remontaje, StrictMode en desarrollo, cambios de dependencias), insertando el mismo resultado dos veces en `@mineria/resultados` y falseando el desempeño de HU05. Un evento de toque ocurre una sola vez por decisión.

Las llamadas no se esperan (`await`): gracias a la política "nunca lanzar" no hay errores que manejar, y la UI responde al instante aunque el disco sea lento.

"Reintentar" ([L42-L45](../../app/src/screens/EscenarioScreen.js#L42-L45)) solo reinicia el estado en memoria; el progreso ya estaba borrado y la primera decisión del nuevo intento lo vuelve a crear.

### 3. Guardia al reanudar

Al montar la pantalla ([L18-L22](../../app/src/screens/EscenarioScreen.js#L18-L22)) se usa el progreso guardado **solo si**:

1. existe (`guardado`),
2. su `nodoId` existe en el escenario actual (`escenario.nodos[guardado.nodoId]`), y
3. no es un nodo final (`!esFinal(...)`).

Si no, se llama a `iniciar(escenario)`. Esto protege contra cambios en `escenarios.json` entre versiones de la app: si se renombra o elimina un nodo, un progreso viejo apuntaría a un nodo inexistente y `nodoActual` devolvería `undefined` (crash al leer `nodo.situacion`). Mientras carga, la pantalla muestra un `ActivityIndicator` ([L24](../../app/src/screens/EscenarioScreen.js#L24)).

Si cambias la estructura del estado (p. ej. agregas campos a `decisiones`), revisa esta guardia: los progresos de usuarios con la versión anterior seguirán en el teléfono.

## Forma del resultado (para HU05)

Construido en [EscenarioScreen.js:33](../../app/src/screens/EscenarioScreen.js#L33):

```js
{
  escenarioId: 'gas-galeria',
  categoriaId: 'ventilacion',    // id de categoría de teoria.json
  aciertos: 3,
  errores: 0,
  fecha: '2026-10-25T14:03:00.000Z'  // ISO 8601
}
```

`categoriaId` viene del escenario en `escenarios.json` y coincide con los `id` de categoría de `teoria.json` (`ventilacion`, `explosivos`). Para el módulo de desempeño por categoría (RF07/HU05, semana 4): `cargarResultados()` → agrupar por `categoriaId` → sumar aciertos y errores. Conviene escribir esa agregación como función pura en `src/logic/` y probarla con node. Los resultados no guardan el detalle de cada decisión; si las recomendaciones de HU06 lo necesitan, añadir `decisiones: resultado.estado.decisiones` al objeto (los resultados viejos no lo tendrán: tratar como opcional).
