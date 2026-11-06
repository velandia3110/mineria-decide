# 09 · Pruebas de usabilidad (semana 5)

Objetivo específico de [entrega2.md](../entrega2.md): *"Validar la usabilidad de la aplicación con usuarios representativos del perfil objetivo mediante pruebas de tareas y valoración de la experiencia de uso."*

> **Estado:** el protocolo está listo; **las sesiones con usuarios todavía no se han hecho.** Los resultados se registran en la sección 6 de este documento.

## 1. Participantes

- **2 o 3 personas** con el perfil del usuario primario: trabajadores operativos de minería subterránea (operarios, ayudantes, personal de campo). Si no es posible, usar personas con baja familiaridad tecnológica y explicarlo en los hallazgos.
- Celular **Android de gama básica o media** (RNF03), idealmente el del participante.
- Antes de la sesión: instalar Expo Go y abrir la app, o usar un build de prueba. **Borrar los datos de la app**, para que "Mi desempeño" empiece vacío.

## 2. Preparación

| Elemento | Detalle |
|---|---|
| Duración | 20-25 minutos por persona |
| Roles | Una persona modera (lee las tareas, no ayuda) y otra observa y anota |
| Conectividad | Activar **modo avión** antes de la tarea 1 (valida RNF02 y HU01/HU04) |
| Registro | Tiempo por tarea, éxito o fracaso, errores, comentarios en voz alta. Fotos o video solo con consentimiento |
| Consentimiento | Explicar que se evalúa la app, no a la persona, y que puede detenerse cuando quiera |

Pedir al participante que **piense en voz alta**. El moderador no indica dónde tocar. Si la persona se bloquea más de 2 minutos, se anota como fracaso y se pasa a la siguiente tarea.

## 3. Tareas

| # | Tarea (se lee tal cual) | Historia | Éxito si… |
|---|---|---|---|
| T1 | "Busque qué hacer cuando el detector de gases da una alarma." | HU01 | Llega al tema "Detector multigás y alarmas" y encuentra la acción en los puntos clave |
| T2 | "Practique el escenario de gases después de la voladura hasta el final." | HU02, HU03 | Completa el escenario y lee al menos un panel de retroalimentación |
| T3 | "Al terminar, diga qué tema le recomienda repasar la app y ábralo." | HU06 | Identifica la sección "Te recomendamos repasar" y abre un tema. Si no tuvo errores, basta con que explique el mensaje de felicitación |
| T4 | "Empiece el escenario del tiro fallado, tome una decisión y cierre la app por completo. Vuelva a abrirla y continúe." | HU04 | Ve la etiqueta "En progreso" y continúa desde la decisión siguiente |
| T5 | "Diga en qué tema le va peor según la app." | HU05 | Entra a "Mi desempeño" e identifica la categoría de arriba o la que dice "Necesita refuerzo" |

## 4. Métricas

- **Tasa de éxito** por tarea: completadas / intentadas.
- **Tiempo** por tarea.
- **Errores**: toques en el lugar equivocado y regresos atrás.
- **SUS** (System Usability Scale): 10 preguntas al final, escala de 1 a 5. Puntaje = ((suma de impares − 5) + (25 − suma de pares)) × 2,5. Más de 68 se considera aceptable.
  1. Creo que me gustaría usar esta app con frecuencia.
  2. La app me pareció más complicada de lo necesario.
  3. La app fue fácil de usar.
  4. Necesitaría ayuda de otra persona para poder usarla.
  5. Las partes de la app están bien integradas.
  6. La app tiene demasiadas cosas inconsistentes.
  7. La mayoría de las personas aprendería a usarla muy rápido.
  8. La app fue muy incómoda de usar.
  9. Me sentí seguro usando la app.
  10. Tuve que aprender muchas cosas antes de poder usarla.
- **Preguntas abiertas:** ¿Qué fue lo más confuso? ¿Usaría esto entre turnos? ¿Los textos se leen bien en su celular?

## 5. Qué observar en particular

| Aspecto | Por qué | Si falla, dónde se ajusta |
|---|---|---|
| Tamaño de letra y de toque | RNF01/RNF09, posible uso con guantes | `fuente` y alturas mínimas en [theme.js](../../app/src/theme.js), [Fila.js](../../app/src/components/Fila.js), [BotonGrande.js](../../app/src/components/BotonGrande.js) |
| Comprensión de los textos de escenarios | Lenguaje del trabajador | [escenarios.json](../../app/src/data/escenarios.json) |
| ¿Se entiende que el feedback hay que leerlo antes de "Continuar"? | HU03 | [PanelFeedback.js](../../app/src/components/PanelFeedback.js) |
| ¿Encuentra "Mi desempeño"? | HU05 | Orden de los grupos en [InicioScreen.js](../../app/src/screens/InicioScreen.js) |
| Umbral "Necesita refuerzo" | ¿70 % le parece justo? | `UMBRAL_REFUERZO` en [resumen.js:3](../../app/src/logic/resumen.js#L3) |
| Fluidez en gama baja | RNF03 | Revisar las [reglas de rendimiento](07-diseno-ui.md#reglas-de-rendimiento) |

## 6. Resultados (completar después de las sesiones)

### Participantes

| ID | Rol | Edad aprox. | Celular | Familiaridad tecnológica (baja/media/alta) |
|---|---|---|---|---|
| P1 | | | | |
| P2 | | | | |
| P3 | | | | |

### Tareas

| Tarea | P1 (éxito / tiempo) | P2 | P3 | Observaciones |
|---|---|---|---|---|
| T1 | | | | |
| T2 | | | | |
| T3 | | | | |
| T4 | | | | |
| T5 | | | | |

### SUS

| P1 | P2 | P3 | Promedio |
|---|---|---|---|
| | | | |

### Hallazgos y correcciones (entrada para la semana 6)

| # | Hallazgo | Gravedad (alta/media/baja) | Corrección propuesta | Archivo | Estado |
|---|---|---|---|---|---|
| H1 | | | | | |
