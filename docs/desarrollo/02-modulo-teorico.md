# 02 · Módulo teórico (RF02 / HU01)

> **HU01:** el trabajador consulta contenido teórico de seguridad **sin conexión**.
> **Criterio de aceptación:** abre el módulo teórico sin conexión y ve el texto de al menos una categoría de riesgo.

Archivos involucrados:

| Archivo | Rol |
|---|---|
| [teoria.json](../../app/src/data/teoria.json) | Contenido: categorías → temas |
| [TeoriaScreen.js](../../app/src/screens/TeoriaScreen.js) | Lista de categorías y sus temas |
| [TemaScreen.js](../../app/src/screens/TemaScreen.js) | Detalle de un tema |
| [App.js:34-35](../../app/App.js#L34-L35) | Registro de las rutas `Teoria` y `Tema` |

Flujo: `Inicio` → fila "Contenido teórico" ([InicioScreen.js:17](../../app/src/screens/InicioScreen.js#L17)) → `Teoria` → toque en un tema → `Tema` → botón "Practicar un escenario" → `Escenarios`.

---

## 1. Por qué funciona sin conexión

El JSON se **importa** como módulo JavaScript:

```js
import teoria from '../data/teoria.json';
```

([TeoriaScreen.js:4](../../app/src/screens/TeoriaScreen.js#L4), [TemaScreen.js:4](../../app/src/screens/TemaScreen.js#L4))

Metro (el bundler de Expo) incrusta el contenido del JSON dentro del bundle de la app al compilar. En tiempo de ejecución no hay `fetch`, ni servidor, ni lectura de disco: los datos ya están en memoria. Por eso cumple HU01 y RF01 (contenido embebido) sin código extra.

Consecuencia práctica: **cambiar el contenido exige recompilar/recargar la app**. Es lo esperado en el MVP (no hay backend de descarga, ver RF06/RF08 fuera de alcance en [entrega2.md](../entrega2.md)).

---

## 2. Forma de `teoria.json`

Arreglo de **categorías**; cada categoría tiene un arreglo de **temas**.

```json
[
  {
    "id": "ventilacion",
    "titulo": "Ventilación y gases",
    "icono": "cloudy-outline",
    "color": "#5AC8FA",
    "descripcion": "Aire limpio en el socavón, ...",
    "temas": [
      {
        "id": "ventilacion-socavon",
        "titulo": "Ventilación en socavones",
        "icono": "sync-outline",
        "parrafos": ["...", "..."],
        "puntosClave": ["...", "..."]
      }
    ]
  }
]
```

| Campo | Nivel | Tipo | Uso en pantalla |
|---|---|---|---|
| `id` | categoría | string | `key` de React y parámetro `categoriaId` de navegación. **Debe coincidir con `categoriaId` de los escenarios** (ver [03-motor-escenarios.md](03-motor-escenarios.md)) para el desempeño por categoría (HU05). |
| `titulo` | categoría | string | Encabezado del grupo en `TeoriaScreen` |
| `icono` | categoría | string (nombre Ionicons) | Icono de los escenarios de esa categoría en `EscenariosScreen` |
| `color` | categoría | string (hex) | Color del cuadro de icono de sus temas y escenarios (estilo Ajustes de iOS) |
| `descripcion` | categoría | string | Pie gris bajo el grupo |
| `temas` | categoría | array | Filas tocables |
| `id` | tema | string | `key` y parámetro `temaId`. Único **dentro** de su categoría. |
| `titulo` | tema | string | Texto de la fila y **título del header** en `TemaScreen` |
| `icono` | tema | string (nombre Ionicons) | Cuadro de color en la fila e icono grande del detalle. Debe existir en Ionicons (buscar en icons.expo.fyi); si no existe se ve un "?". |
| `parrafos` | tema | string[] | Un `<Text>` por párrafo |
| `puntosClave` | tema | string[] | Viñetas del recuadro "Puntos clave" |

### Contenido actual

| Categoría (`id`) | Temas (`id`) |
|---|---|
| `ventilacion` — Ventilación y gases (`cloudy-outline`, celeste) | `ventilacion-socavon`, `gases-peligrosos`, `detector-multigas` |
| `explosivos` — Explosivos y voladura (`flame-outline`, naranja) | `almacenamiento`, `manipulacion`, `tiros-fallados` |

---

## 3. `TeoriaScreen` — lista de categorías

[TeoriaScreen.js](../../app/src/screens/TeoriaScreen.js)

- [L9](../../app/src/screens/TeoriaScreen.js#L9): un único `ScrollView`.
- [L11](../../app/src/screens/TeoriaScreen.js#L11): por cada categoría, un [`Grupo`](07-diseno-ui.md#grupo) con su título arriba y la descripción como pie.
- [L12-L20](../../app/src/screens/TeoriaScreen.js#L12-L20): por cada tema, una [`Fila`](07-diseno-ui.md#fila) con el icono del tema en un cuadro del color de la categoría y chevron. Accesibilidad y altura mínima vienen de `Fila`.
- [L18](../../app/src/screens/TeoriaScreen.js#L18): navegación.

```js
navigation.navigate('Tema', { categoriaId: categoria.id, temaId: tema.id, titulo: tema.titulo })
```

### Por qué `ScrollView` y no `FlatList`

`contentInsetAdjustmentBehavior="automatic"` ([L9](../../app/src/screens/TeoriaScreen.js#L9)) hace que el título grande de iOS se encoja al hacer scroll.

`FlatList` virtualiza (solo renderiza lo visible) y conviene con listas largas. Aquí hay **2 categorías × 3 temas = 6 filas** anidadas en secciones. Con `FlatList` habría que anidar listas (o pasar a `SectionList`) y escribir `keyExtractor`/`renderItem` sin ganancia medible de rendimiento. Si el contenido crece a decenas de temas, migrar a `SectionList`.

### Por qué se pasa `titulo` en los parámetros

`App.js` define el título del header **a partir de los parámetros de la ruta**:

```js
<Stack.Screen name="Tema" component={TemaScreen} options={({ route }) => ({ title: route.params.titulo })} />
```

([App.js:35](../../app/App.js#L35)). Así el header muestra el nombre del tema sin que `TemaScreen` tenga que llamar a `navigation.setOptions`. El mismo patrón se usa para `Escenario` ([App.js:37](../../app/App.js#L37)).

---

## 4. `TemaScreen` — detalle de un tema

[TemaScreen.js](../../app/src/screens/TemaScreen.js)

| Líneas | Qué hace |
|---|---|
| [L8](../../app/src/screens/TemaScreen.js#L8) | Lee `categoriaId` y `temaId` de `route.params` |
| [L9-L10](../../app/src/screens/TemaScreen.js#L9-L10) | Búsqueda en línea: `teoria.find(categoria)?.temas.find(tema)`. El `?.` evita un crash si la categoría no existe. |
| [L12-L14](../../app/src/screens/TemaScreen.js#L12-L14) | Fallback: si no se encontró, muestra "Tema no encontrado." en vez de romper |
| [L18-L20](../../app/src/screens/TemaScreen.js#L18-L20) | Icono del tema en un cuadro de 72 px con el color de la categoría ([L46-L54](../../app/src/screens/TemaScreen.js#L46-L54)) |
| [L21-L25](../../app/src/screens/TemaScreen.js#L21-L25) | Párrafos dentro de una tarjeta blanca |
| [L26-L37](../../app/src/screens/TemaScreen.js#L26-L37) | Recuadro "Puntos clave": icono `warning` en el encabezado y un `checkmark-circle` naranja por punto |
| [L38](../../app/src/screens/TemaScreen.js#L38) | Botón "Practicar un escenario" (icono `play-circle-outline`) → `navigate('Escenarios')` |

**Por qué se pasan ids y no el objeto tema completo:** los parámetros de navegación deben ser pequeños y serializables; con los ids la pantalla busca la fuente de verdad (el JSON). Con 6 temas la búsqueda lineal es instantánea, no hace falta índice ni helper.

**Cuándo aparece "Tema no encontrado":** solo si alguien navega con ids que no existen (p. ej. se renombró un `id` en el JSON y quedó un enlace viejo). Es una red de seguridad, no un flujo normal.

### Recuadro de puntos clave

Estilo en [L56](../../app/src/screens/TemaScreen.js#L56): fondo `colores.aviso` (`#FFF4E5`, naranja muy claro) con iconos en `colores.acento` (`#FF9500`, el *systemOrange* de iOS, [theme.js:5](../../app/src/theme.js#L5)).

**Por qué naranja:** en señalización de seguridad industrial el amarillo/naranja significa **advertencia/precaución**. El trabajador ya asocia ese color con "atención", así que el recuadro destaca lo que no debe olvidar.

### Botón teoría → práctica

El botón de [L38](../../app/src/screens/TemaScreen.js#L38) cierra el ciclo "aprender → aplicar": tras leer, el usuario va directo a la lista de escenarios. No filtra por categoría (hoy hay un solo escenario); si se agregan más, se podría pasar `categoriaId` y filtrar en `EscenariosScreen`.

---

## 5. Cómo agregar contenido

### Agregar un tema a una categoría existente

1. Abrir [teoria.json](../../app/src/data/teoria.json).
2. Dentro del arreglo `temas` de la categoría, agregar un objeto con `id`, `titulo`, `icono` (nombre de Ionicons, nunca emoji), `parrafos`, `puntosClave`.
3. El `id` debe ser único dentro de la categoría, en minúsculas con guiones (`uso-autorrescatador`). No cambiar ids existentes: rompería navegaciones y referencias.
4. Guardar. Expo recarga la app; el tema aparece solo en `TeoriaScreen`. **No hay que tocar código.**

### Agregar una categoría nueva

1. Agregar un objeto al arreglo raíz con `id`, `titulo`, `icono` (Ionicons), `color` (hex), `descripcion` y `temas` (al menos un tema).
2. Elegir el `id` pensando en los escenarios: los escenarios de esa categoría usarán ese mismo valor en `categoriaId` (p. ej. `sostenimiento`).
3. Guardar y verificar en el dispositivo:
   - Aparece la sección en "Contenido teórico".
   - Cada tema abre su detalle con el título correcto en el header.
   - Modo avión activado: todo sigue funcionando (HU01).
4. Validar que el JSON sea correcto: si la app muestra un error de sintaxis al recargar, revisar comas finales y comillas (JSON no admite comentarios ni comas al final).

### Reglas de redacción (RNF09)

- Párrafos cortos (2-3 frases), lenguaje del trabajador operativo.
- 3-4 puntos clave por tema, en imperativo ("Reporta…", "No entres…").
