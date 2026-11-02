# 07 — Diseño de interfaz

La interfaz sigue el estilo de iOS (Human Interface Guidelines): fondo gris claro, listas agrupadas en tarjetas blancas con esquinas redondeadas, títulos grandes y colores del sistema. Tres reglas mandan sobre cualquier decisión visual:

1. **Rendimiento primero (RNF03).** Teléfonos Android de gama básica. Nada de sombras, desenfoques, gradientes ni animaciones propias.
2. **Iconos, nunca emojis.** Se usa [Ionicons](https://icons.expo.fyi) vía `@expo/vector-icons`. Los emojis se ven distinto en cada teléfono y no se pueden colorear; los iconos son una fuente vectorial, se ven nítidos en cualquier pantalla y toman el color del tema.
3. **Legibilidad para el trabajador (RNF01, RNF09).** Texto base de 17, áreas táctiles de 52-56 px, icono + palabra + color para todo lo que comunica un resultado.

## Tokens — [theme.js](../../app/src/theme.js)

| Token | Líneas | Valores | Uso |
| --- | --- | --- | --- |
| `colores` | [L3-L16](../../app/src/theme.js#L3-L16) | `primario #007AFF` (systemBlue), `acento #FF9500` (systemOrange), `correcto #34C759` (systemGreen), `incorrecto #FF3B30` (systemRed), `fondo #F2F2F7` (systemGroupedBackground), `tarjeta #FFF`, `presionado #E5E5EA`, `texto #1C1C1E`, `textoSuave #6C6C70`, `separador #C6C6C8`, `aviso #FFF4E5` | Paleta única: ninguna pantalla escribe un color a mano, salvo el `color` de cada categoría en `teoria.json` (es contenido). |
| `espacio` | [L18](../../app/src/theme.js#L18) | `xs 4`, `s 8`, `m 16`, `l 24`, `xl 32` | Márgenes y paddings. |
| `fuente` | [L20](../../app/src/theme.js#L20) | `pie 13`, `normal 17`, `titulo 22`, `grande 34` | Tamaños de iOS: footnote, body, title2 y large title. |
| `radio` | [L22](../../app/src/theme.js#L22) | `m 12`, `l 16` | Esquinas de tarjetas y botones. |
| `linea` | [L24](../../app/src/theme.js#L24) | `StyleSheet.hairlineWidth` | Separadores de 1 píxel físico, como en iOS. |

**Por qué naranja como acento:** en la señalización de seguridad industrial el naranja/amarillo significa precaución. Se reserva para "Puntos clave", la etiqueta "En progreso" y los escenarios. El azul es el color de acción (botones, enlaces, flecha de atrás), igual que en iOS.

## Header — [App.js](../../app/App.js)

- `screenOptions` ([L24-L31](../../app/App.js#L24-L31)): header del mismo gris que el fondo y sin línea de sombra, de modo que el contenido parece continuar debajo. Flecha y "Atrás" en azul.
- `tituloGrande` ([L13-L17](../../app/App.js#L13-L17)): título grande de iOS en `Inicio`, `Teoria` y `Escenarios`; al hacer scroll se encoge al centro. Lo dibuja `react-native-screens` de forma nativa, así que no cuesta JavaScript. En Android se ve como un header normal.
- Para que el título grande funcione, el primer hijo de la pantalla debe ser un `ScrollView` con `contentInsetAdjustmentBehavior="automatic"` (p. ej. [TeoriaScreen.js:9](../../app/src/screens/TeoriaScreen.js#L9)).
- `StatusBar style="dark"` ([L22](../../app/App.js#L22)): iconos oscuros sobre el fondo claro.

## Componentes

### Grupo

[Grupo.js](../../app/src/components/Grupo.js): lista agrupada estilo iOS (*inset grouped*).

| Prop | Uso |
| --- | --- |
| `titulo` | Encabezado gris en mayúsculas sobre la tarjeta (opcional) |
| `pie` | Texto explicativo gris bajo la tarjeta (opcional) |
| `children` | Normalmente varias `Fila` |

- [L6](../../app/src/components/Grupo.js#L6): `Children.toArray` normaliza los hijos (incluye los que vienen de un `.map`) y conserva sus `key`.
- [L11-L16](../../app/src/components/Grupo.js#L11-L16): intercala un separador **entre** filas, no antes de la primera ni después de la última. Así las pantallas no tienen que calcular "¿soy la última fila?".
- [L33](../../app/src/components/Grupo.js#L33): el separador arranca a 60 px de la izquierda, alineado con el texto y no con el icono, como en Ajustes de iOS.
- `overflow: 'hidden'` en la caja recorta el gris de "presionado" de la primera y la última fila a las esquinas redondeadas.

### Fila

[Fila.js](../../app/src/components/Fila.js): fila tocable de lista. Se usa en Inicio, Teoría, Escenarios y para las **opciones de cada decisión**.

| Prop | Uso |
| --- | --- |
| `titulo` | Texto principal; puede ocupar varias líneas (las opciones son frases largas) |
| `subtitulo` | Texto gris secundario (opcional) |
| `icono`, `colorIcono` | Nombre de Ionicons y color de fondo del cuadro (opcionales) |
| `etiqueta` | Texto naranja a la derecha, p. ej. "En progreso" (opcional) |
| `onPress` | Acción al tocar |

- [L10](../../app/src/components/Fila.js#L10): al presionar, el fondo cambia a `presionado` (gris), igual que una celda de iOS. Es un cambio de color, no una animación: cuesta lo mismo que cualquier render.
- [L12-L16](../../app/src/components/Fila.js#L12-L16): icono blanco dentro de un cuadro de 30 px con esquinas de 7 px y el color de la categoría, el patrón de Ajustes de iOS. Permite reconocer la categoría por color sin leer.
- [L22](../../app/src/components/Fila.js#L22): chevron `chevron-forward` gris: indica que la fila lleva a otra pantalla o avanza.
- [L31](../../app/src/components/Fila.js#L31): `minHeight: 56` para dedos con guantes; crece si el texto ocupa varias líneas.
- `accessibilityRole="button"` ([L8](../../app/src/components/Fila.js#L8)): los lectores de pantalla la anuncian como botón.

### BotonGrande

[BotonGrande.js](../../app/src/components/BotonGrande.js): botón de acción ("Practicar un escenario", "Continuar", "Reintentar", "Volver").

| Prop | Uso |
| --- | --- |
| `titulo`, `onPress` | Texto y acción |
| `icono` | Nombre de Ionicons a la izquierda del texto (opcional) |
| `color` | Color del botón; por defecto `primario` |
| `secundario` | `true`: fondo blanco con texto e icono del color, para la acción menos importante (p. ej. "Volver") |
| `disabled` | Atenúa el botón y bloquea el toque |

- [L6-L7](../../app/src/components/BotonGrande.js#L6-L7): el modo secundario invierte fondo y tinta en vez de duplicar estilos.
- [L13](../../app/src/components/BotonGrande.js#L13): opacidad 0.75 al presionar y 0.4 deshabilitado.
- [L23](../../app/src/components/BotonGrande.js#L23): `minHeight: 52`, la altura de un botón grande de iOS.

### PanelFeedback

Detalle en [05-pantallas-escenarios.md](05-pantallas-escenarios.md#3-panelfeedback-hu03). Visualmente: una tarjeta centrada con un icono de 64 px (`checkmark-circle` verde o `close-circle` rojo), la palabra del resultado, la opción elegida y la explicación, con el botón "Continuar" debajo.

## Iconos usados

| Dónde | Icono Ionicons |
| --- | --- |
| Inicio: Contenido teórico / Escenarios / sin conexión | `book-outline` / `git-branch-outline` / `cloud-offline-outline` |
| Categorías (`teoria.json`) | `cloudy-outline` (ventilación), `flame-outline` (explosivos) |
| Temas (`teoria.json`) | `sync-outline`, `skull-outline`, `speedometer-outline`, `cube-outline`, `hand-left-outline`, `warning-outline` |
| Puntos clave | `warning` (encabezado), `checkmark-circle` (cada punto) |
| Feedback / fin | `checkmark-circle`, `close-circle`, `flag` |
| Botones | `play-circle-outline`, `arrow-forward`, `refresh`, `arrow-back` |
| Filas | `chevron-forward` |

Para agregar un icono, buscar el nombre en [icons.expo.fyi](https://icons.expo.fyi) con el filtro Ionicons. Un nombre que no existe se ve como un "?", sin error al compilar. Por eso [06-pruebas.md](06-pruebas.md) incluye revisarlo a mano.

## Reglas de rendimiento

| Regla | Por qué |
| --- | --- |
| Sin sombras (`shadow*`, `elevation`) | En Android cada sombra es una capa extra de dibujo; la separación se logra con el contraste entre el fondo gris y la tarjeta blanca. |
| Sin `BlurView` ni gradientes | Son de los efectos más caros en gama baja y no aportan a la tarea. |
| Sin animaciones propias | El feedback al tocar es solo cambio de color u opacidad. Las transiciones entre pantallas y el título grande son nativas. |
| Una sola familia de iconos (Ionicons) | Solo se carga la fuente de Ionicons. Expo Go ya la trae incluida. |
| Fuente del sistema | San Francisco en iOS y Roboto en Android, sin descargar fuentes. |
| `StyleSheet.create` al final de cada archivo | Los estilos se crean una vez, no en cada render. Los estilos en línea se limitan a valores que dependen de props (color, presionado). |
| Datos derivados fuera del componente | P. ej. `categorias` en [EscenariosScreen.js:11](../../app/src/screens/EscenariosScreen.js#L11) se calcula una vez al cargar el módulo. |
| `ScrollView` en vez de `FlatList` | Con menos de ~20 filas, la virtualización no compensa su costo; ver [02-modulo-teorico.md](02-modulo-teorico.md#por-qué-scrollview-y-no-flatlist). |
