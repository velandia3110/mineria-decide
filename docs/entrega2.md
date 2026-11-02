1
Aplicación Móvil de Capacitación en Seguridad Minera Subterránea Basada en Escenarios
Interactivos de Toma de Decisiones
Lizeth Vanesa Triana Abril y Mabel Dalemne Bautista Rodríguez
Ingeniería Multimedia, Universidad de Boyacá
Aplicaciones Móviles
Johan Fonseca
25 de septiembre de 2026

2
1. Planteamiento del Problema
El personal operativo del sector minero requiere capacitación constante en temas
relacionados con la seguridad, entre ellos el manejo de explosivos, la ventilación en socavones,
la identificación de riesgos atmosféricos, la estabilidad de las labores subterráneas y los
protocolos de actuación ante situaciones de emergencia. Actualmente, estos procesos de
capacitación se desarrollan mediante diferentes estrategias, como sesiones presenciales, material
educativo, videos y charlas. Sin embargo, debido a las características propias de la actividad
minera, existen oportunidades para fortalecer estos procesos mediante herramientas que permitan
complementar los contenidos teóricos con ejercicios prácticos de toma de decisiones.
Uno de los principales aspectos susceptibles de fortalecimiento es la posibilidad de que el
trabajador ponga en práctica los conocimientos adquiridos frente a situaciones simuladas de
riesgo. En algunos procesos tradicionales, la capacitación se concentra principalmente en la
presentación y consulta de información, lo que permite adquirir conocimientos sobre los
procedimientos de seguridad, pero ofrece oportunidades limitadas para practicar la identificación
de riesgos y la selección de acciones ante situaciones que requieren una respuesta inmediata.
Asimismo, el seguimiento individual del proceso de aprendizaje puede representar un
reto. La identificación de los temas en los que cada trabajador presenta mayores dificultades
permitiría orientar actividades de refuerzo de acuerdo con sus necesidades. De esta manera,
además de transmitir información, la capacitación podría incorporar mecanismos que permitan
reconocer avances, identificar dificultades y reforzar conocimientos específicos.
Otro aspecto importante corresponde a las condiciones de conectividad presentes en
algunos entornos de trabajo minero. Las labores subterráneas pueden desarrollarse en lugares
donde el acceso a internet es limitado o variable, por lo que una herramienta de apoyo para la

3
capacitación debería contemplar alternativas que permitan consultar y desarrollar sus contenidos
sin depender permanentemente de una conexión a internet.
En este contexto, el uso de recursos digitales interactivos puede contribuir al
fortalecimiento de la capacitación existente al ofrecer espacios de práctica en los que el
trabajador pueda enfrentarse a escenarios simulados relacionados con situaciones de seguridad
minera, analizar las condiciones presentadas y seleccionar una respuesta de acuerdo con los
procedimientos establecidos. Este tipo de estrategia no busca sustituir la formación presencial ni
los protocolos institucionales, sino complementarlos mediante una experiencia interactiva que
favorezca la práctica, el refuerzo de conocimientos y el reconocimiento de posibles áreas de
mejora.
Por lo anterior, surge la necesidad de desarrollar una herramienta móvil de apoyo a la
capacitación en seguridad minera subterránea, basada en escenarios interactivos de toma de
decisiones, que pueda utilizarse como recurso complementario a los procesos de formación
existentes y que contemple condiciones de acceso sin conexión permanente a internet.
Pregunta de investigación: ¿De qué manera una aplicación móvil basada en escenarios
interactivos de toma de decisiones puede contribuir al fortalecimiento de los procesos de
capacitación en seguridad minera subterránea?
2. Justificación
2.1 Pertinencia del Enfoque Basado en Decisiones
Los procesos de capacitación en seguridad minera pueden complementarse mediante
estrategias que permitan al trabajador no solo consultar información, sino también poner en
práctica los conocimientos adquiridos frente a situaciones simuladas. El uso de escenarios

4
interactivos de toma de decisiones permite que el usuario analice diferentes condiciones de
riesgo, seleccione una acción y reciba retroalimentación sobre las consecuencias de su elección.
De esta manera, la aplicación se plantea como un recurso complementario a las
estrategias de capacitación existentes, aportando un espacio de práctica que favorezca el refuerzo
de conocimientos y la familiarización con procedimientos de actuación ante situaciones de riesgo
(Zapata Escobar, 2015; LearnNovators, s.f.). La interacción con escenarios y consecuencias
permite involucrar al usuario de manera activa en el proceso de aprendizaje, sin sustituir la
orientación de los responsables de la capacitación ni los protocolos establecidos por la
organización (iSpring Solutions, s.f.).
2.2 Justificación de la Plataforma Móvil
La aplicación se plantea como una solución móvil, y no web, considerando el contexto de
uso del personal operativo: el acceso se realiza principalmente desde un dispositivo portátil, en
distintos espacios y momentos de la jornada, y no desde un computador de escritorio.
Adicionalmente, dado que la conectividad en zonas mineras subterráneas puede ser limitada o
variable, condición que debe validarse mediante trabajo de campo, se plantea un modelo de
funcionamiento offline-first: el contenido de capacitación se descarga previamente cuando existe
conexión, y las actividades (visualización de contenido, resolución de escenarios, evaluaciones)
pueden realizarse sin depender de conexión constante, sincronizando los resultados cuando la
conexión esté disponible nuevamente.
2.3 Justificación Tecnológica
Se propone el uso de React Native como framework de desarrollo, dado que permite
construir una aplicación multiplataforma (Android e iOS) a partir de una única base de código,

5
reduciendo el tiempo de desarrollo sin sacrificar el acceso a funcionalidades nativas como
almacenamiento local, reproducción de audio y video, y navegación fluida entre pantallas, todas
necesarias para el funcionamiento offline de la aplicación (React Native, s.f.). El uso
complementario de Expo y React Navigation facilita la gestión del ciclo de compilación y la
navegación entre pantallas dentro de este mismo ecosistema (Expo, s.f.; React Navigation, s.f.).
2.4 Justificación Disciplinar
El proyecto integra competencias propias de Ingeniería Multimedia: diseño de interacción
(UX/UI), producción de contenido visual, diseño de retroalimentación formativa, estructuración
de contenido educativo y desarrollo de software. Esto permite abordar el problema planteado
desde una perspectiva multidisciplinar, en lugar de reducirlo a una solución exclusivamente
técnica.
2.5 Justificación Social
La seguridad minera es un tema de alto impacto humano, debido a que una actuación
inadecuada ante determinadas condiciones de riesgo puede generar consecuencias graves para
los trabajadores. En este contexto, fortalecer los procesos de capacitación mediante herramientas
accesibles e interactivas puede contribuir al refuerzo de conocimientos y a la práctica de la toma
de decisiones frente a situaciones simuladas.
La propuesta busca brindar un recurso complementario que facilite la práctica individual,
el reconocimiento de dificultades y el seguimiento del progreso, sin sustituir los procesos de
formación, supervisión y cumplimiento de los protocolos de seguridad establecidos por las
organizaciones mineras.

6
3. Objetivos
3.1 Objetivo General
Implementar una aplicación móvil como herramienta de apoyo a los procesos de
capacitación en seguridad minera subterránea, basada en escenarios interactivos de toma de
decisiones, que contribuya al fortalecimiento de conocimientos y prácticas frente a situaciones de
riesgo, con funcionamiento offline y seguimiento individual del progreso.
3.2 Objetivos Específicos
• Diseñar escenarios de apoyo a la capacitación basados en secuencias de decisiones
encadenadas, que representen situaciones de riesgo propias del entorno minero
subterráneo.
• Incorporar un sistema de retroalimentación formativa inmediata que explique al usuario
las razones y consecuencias de cada decisión tomada dentro de un escenario.
• Integrar un módulo de contenidos teóricos que sirva como apoyo previo a los escenarios
interactivos y facilite el refuerzo de los conceptos necesarios para la toma de decisiones.
• Incorporar el almacenamiento local del progreso del usuario, permitiendo el acceso a los
contenidos y actividades sin depender de una conexión constante a internet.
• Diseñar un sistema de seguimiento del desempeño por categoría de riesgo que permita
identificar los temas que requieren mayor refuerzo por parte del usuario.
• Validar la usabilidad de la aplicación con usuarios representativos del perfil objetivo
mediante pruebas de tareas y valoración de la experiencia de uso.

7

4. Análisis de Proyectos Similares (Competencia)
Antes de definir el alcance de la propuesta, se revisaron soluciones existentes orientadas a
la seguridad y capacitación minera, con el fin de identificar qué enfoques ya están cubiertos y en
qué aspecto la propuesta aporta un diferencial concreto.

Limitación frente a la
| Solución  | Enfoque  | Fortaleza  |     |
| --------- | -------- | ---------- | --- |
propuesta
Miner Safety and Health
Contenido informativo
| (MSHA, EE. UU.) (U.S.  | Información y reporte  | Respaldo institucional,  |     |
| ---------------------- | ---------------------- | ------------------------ | --- |
pasivo, sin evaluación de
| Department of Labor,  | de incidentes  | alcance nacional  |     |
| --------------------- | -------------- | ----------------- | --- |
decisiones
MSHA, 2023)
|                          |                     | Gratuita, orientada a  | Evaluación aislada por video,  |
| ------------------------ | ------------------- | ---------------------- | ------------------------------ |
| Minería Contigo (Chile)  | Videos cortos +     |                        |                                |
|                          |                     | pequeña minería,       | no hay escenarios              |
| (Guía Minera, 2021)      | preguntas + puntos  |                        |                                |
|                          |                     | gamificación básica    | encadenados                    |
Dirigida a gestión
Integral para la empresa
Safety First (Perú)  Gestión y auditoría de  corporativa, no a la
(indicadores,
| (SGS, 2019)  | seguridad  |     | capacitación individual del  |
| ------------ | ---------- | --- | ---------------------------- |
supervisiones)
operario
Simuladores de realidad
|                        | Inmersión total con  |                              | Alto costo de infraestructura,  |
| ---------------------- | -------------------- | ---------------------------- | ------------------------------- |
| virtual (ej. CESSO,    |                      | Alto realismo y efectividad  |                                 |
|                        | hardware             |                              | no portátil, no escalable a     |
| Austral 3D) (Codelco,  |                      | de entrenamiento             |                                 |
|                        | especializado        |                              | bajo costo                      |
2024-2025)

4.1 Diferencial de la Propuesta Frente a la Competencia
Las soluciones informativas y de gestión (MSHA, Safety First, ISEM Móvil) cubren bien
la difusión de contenido y la administración de cursos, pero no exigen al usuario demostrar una
capacidad de decisión ante una secuencia de eventos. Las soluciones de gamificación simple
(Minería Contigo) sí evalúan, pero de forma aislada, pregunta por video, sin que una decisión
afecte el desarrollo de la situación siguiente. Las soluciones de mayor inmersión (realidad

8
virtual, simuladores físicos) sí logran ese nivel de exigencia decisional, pero a un costo de
infraestructura que las hace inviables para una implementación amplia y de bajo costo.
La propuesta se posiciona en un punto intermedio no cubierto por las soluciones
anteriores: escenarios de decisión encadenada, con consecuencias y retroalimentación formativa,
ejecutados en un smartphone estándar, sin hardware adicional y con funcionamiento offline. Esto
la hace más exigente cognitivamente que una app de video y preguntas, y considerablemente más
económica y escalable que una solución de realidad virtual.
5. Usuarios Objetivo
5.1 Usuario Primario
Trabajadores operativos de minería subterránea (operarios, ayudantes y personal de
campo), con acceso a un smartphone Android de gama básica o media, y con nivel de
familiaridad tecnológica variable. Este perfil requiere una interfaz simple, con iconografía clara,
textos breves y navegación sin pasos innecesarios.
5.2 Usuario Secundario
Supervisores y responsables del área de seguridad y salud ocupacional, quienes asignan
los cursos y escenarios correspondientes a cada trabajador y hacen seguimiento a su progreso y
desempeño por categoría de riesgo. Aunque el desarrollo de un panel administrativo completo
queda fuera del alcance de esta fase, el modelo de datos de la aplicación contempla esta
necesidad para una fase posterior.
5.3 Contexto de Uso

9
• Zonas con conectividad limitada o intermitente (interior de la mina), donde la app debe
funcionar sin conexión.
• Puntos con conectividad ocasional (oficinas, campamentos, casa de cambio), donde se
realiza la descarga inicial de contenido y la sincronización del progreso.
• Uso en sesiones cortas, entre turnos o en tiempos de espera, más que en sesiones largas y
continuas.
5.4 Enfoque de Negocio / A Quién se Dirige la Solución
La propuesta está dirigida principalmente a empresas mineras de pequeña y mediana
escala que buscan fortalecer los procesos de capacitación en seguridad de su personal operativo
mediante recursos digitales accesibles. La aplicación se plantea como una herramienta
complementaria que puede apoyar la distribución de contenidos, la práctica mediante escenarios
interactivos y el seguimiento individual del progreso.
Su enfoque móvil y la posibilidad de acceder a los contenidos sin una conexión
permanente permiten considerar diferentes contextos de uso dentro de los procesos de formación,
especialmente en espacios donde la conectividad puede ser limitada o intermitente.
6. Requisitos Priorizados del MVP
Los requisitos de la aplicación ideal se redujeron a un alcance de MVP viable, usando el
esquema MoSCoW (Must / Should / Could / Won't) para dejar explícito qué se construye.
6.1 Requisitos Funcionales
ID Requisito Prioridad
RF02 Módulo de contenidos teóricos (1-2 categorías de riesgo) Must

10
| ID  | Requisito  | Prioridad  |
| --- | ---------- | ---------- |
RF03  Motor de escenarios de decisión encadenada (1-2 escenarios)  Must
RF04  Retroalimentación formativa inmediata tras cada decisión  Must
| RF05  | Almacenamiento local del progreso del usuario    | Must  |
| ----- | ------------------------------------------------ | ----- |
| RF10  | Resumen de resultados al finalizar el escenario  | Must  |
RF01  Contenido embebido en la app (sin backend de descarga)  Should
RF07  Seguimiento de desempeño por 1-2 categorías de riesgo  Should
RF-DATA*  Modelo de datos local: usuario, escenario, decisión y resultado  Should
| RF06 / RF08 /  | Sincronización con servidor, login con backend, panel de  |     |
| -------------- | --------------------------------------------------------- | --- |
Won't (fase posterior)
| RF09  | supervisores  |     |
| ----- | ------------- | --- |

6.2 Requisitos No Funcionales
| ID  | Requisito  | Prioridad  |
| --- | ---------- | ---------- |
RNF01  Usabilidad: interfaz simple e iconografía clara  Must
| RNF02  | Disponibilidad offline de las funciones clave  | Must  |
| ------ | ---------------------------------------------- | ----- |
RNF03  Rendimiento fluido en smartphones gama básica/media  Must
| RNF04  | Portabilidad multiplataforma (React Native)   | Must    |
| ------ | --------------------------------------------- | ------- |
| RNF07  | Mantenibilidad: arquitectura modular          | Should  |
| RNF09  | Accesibilidad: textos breves, fuente legible  | Could   |
Documentadas, sin
RNF06 / RNF08  Seguridad de datos y escalabilidad del modelo  implementación
exigida

7. Historias de Usuario
HU01 — Consulta de contenido teórico
Yo, como trabajador operativo de minería subterránea,
quiero consultar contenido teórico de seguridad sin necesitar conexión a internet,
para poder repasar antes de un escenario en cualquier momento y lugar de mi turno.

11
Criterio de aceptación: el usuario abre el módulo teórico sin conexión y visualiza
texto/imagen de al menos una categoría de riesgo.
HU02 — Escenario de decisiones encadenadas
Yo, como trabajador operativo,
quiero enfrentarme a un escenario de decisiones encadenadas sobre una situación de
riesgo,
para practicar cómo actuaría en una situación real antes de que ocurra.
Criterio de aceptación: el usuario completa un escenario de mínimo 3 decisiones
encadenadas; cada una conduce a una rama distinta de la secuencia.
HU03 — Retroalimentación inmediata
Yo, como trabajador operativo,
quiero recibir una explicación inmediata después de cada decisión que tomo en un
escenario,
para entender por qué esa acción es correcta o incorrecta.
Criterio de aceptación: tras cada decisión se muestra si fue correcta o incorrecta y la
razón, antes de continuar al siguiente paso.
HU04 — Progreso guardado localmente
Yo, como trabajador operativo,
quiero que mi progreso se guarde en mi dispositivo aunque no tenga conexión,
para no perder mi avance entre sesiones cortas de práctica.

12
Criterio de aceptación: al cerrar y reabrir la app, el progreso del último escenario
permanece guardado sin conexión.
HU05 — Desempeño por categoría de riesgo
Yo, como trabajador operativo,
quiero ver un resumen de mi desempeño por categoría de riesgo,
para saber en qué temas necesito reforzar más.
Criterio de aceptación: al finalizar al menos un escenario completo, se muestra el
desempeño acumulado por categoría de riesgo.
HU06 — Resumen al finalizar el escenario
Yo, como trabajador operativo,
quiero ver un resumen al terminar cada escenario,
para saber qué aciertos y errores tuve inmediatamente.
Criterio de aceptación: al terminar un escenario se presenta un resumen con aciertos,
errores y recomendaciones.
8. Matriz de Trazabilidad
Cada requisito funcional del MVP se conecta con su historia de usuario y con un criterio
de aceptación verificable, para evitar ambigüedad al momento de dar por completada una
funcionalidad.

13
| RF  | Historia  | Criterio de aceptación  |
| --- | --------- | ----------------------- |
El usuario abre el módulo teórico sin conexión y visualiza texto/imagen de
| RF02  | HU01  |     |
| ----- | ----- | --- |
al menos una categoría de riesgo.
El usuario completa un escenario de mínimo 3 decisiones encadenadas;
| RF03  | HU02  |     |
| ----- | ----- | --- |
cada decisión conduce a una rama distinta de la secuencia.
Tras cada decisión se muestra si fue correcta o incorrecta y la razón, antes
| RF04  | HU03  |     |
| ----- | ----- | --- |
de continuar al siguiente paso.
Al cerrar y reabrir la app, el progreso del último escenario permanece
| RF05  | HU04  |     |
| ----- | ----- | --- |
guardado sin conexión.
Al finalizar al menos un escenario completo, se muestra el desempeño
| RF07  | HU05  |     |
| ----- | ----- | --- |
acumulado por categoría de riesgo.
Al terminar un escenario se presenta un resumen con aciertos, errores y
| RF10  | HU06  |     |
| ----- | ----- | --- |
recomendaciones.
RF09  HU07  Fuera de alcance del MVP; solo documentado para fase posterior.
|     |     |     |
| --- | --- | --- |

14

Cronograma de Trabajo (2 Personas)
Distribución semanal desde el 5 de octubre hasta el 13 de noviembre de 2026 (6
semanas). Se manejará metodología Scrum con reuniones de 2 horas por semana.

Entregable de la
| Semana  Fechas  | Lizeth  | Mabel  |     |
| --------------- | ------- | ------ | --- |
semana
|     | Wireframes de navegación  | Guion final de escenarios 1  | App navegable vacía  |
| --- | ------------------------- | ---------------------------- | -------------------- |
1  5-11 oct  + esqueleto de la app (Expo  y 2 + contenido teórico  + guiones y contenido
|     | + React Navigation)  | redactado  | cerrados  |
| --- | -------------------- | ---------- | --------- |
Construcción de las
|     | Motor de almacenamiento  |     | Módulo teórico  |
| --- | ------------------------ | --- | --------------- |
pantallas del módulo teórico
| 2  12-18 oct  | local  |     | funcional y visible,  |
| ------------- | ------ | --- | --------------------- |
(JSX + estilos) sobre el
|     | (AsyncStorage/SQLite)  |     | sin conexión  |
| --- | ---------------------- | --- | ------------- |
esqueleto de Lizeth
Construcción de las
Lógica del árbol de
|               |                         | pantallas del Escenario 1     | Escenario 1 jugable  |
| ------------- | ----------------------- | ----------------------------- | -------------------- |
| 3  19-25 oct  | decisiones y manejo de  |                               |                      |
|               |                         | (botones de decisión, ramas,  | de inicio a fin      |
estado del Escenario 1
vista de retroalimentación)
|     | Lógica de cálculo de  | Pantallas del resumen final  |     |
| --- | --------------------- | ---------------------------- | --- |
Segundo escenario y
| 4  26 oct-1 nov  | desempeño por categoría +  | + Escenario 2 completo  |     |
| ---------------- | -------------------------- | ----------------------- | --- |
resumen funcionando
|     | lógica del resumen  | (contenido + interfaz)  |                        |
| --- | ------------------- | ----------------------- | ---------------------- |
|     |                     | Ejecuta las pruebas de  | MVP integrado + lista  |
Integración de todos los
| 5  2-8 nov  |     | usabilidad con 2-3 usuarios  | de hallazgos de  |
| ----------- | --- | ---------------------------- | ---------------- |
módulos
|     |                               | y documenta hallazgos  | usabilidad  |
| --- | ----------------------------- | ---------------------- | ----------- |
|     | Corrige lo que arrojaron las  | Ajustes de             |             |
Entrega del MVP en
| 6  9-13 nov  | pruebas de usabilidad (lado  | contenido/redacción +  |     |
| ------------ | ---------------------------- | ---------------------- | --- |
la materia
|     | técnico)  | documento final de entrega  |     |
| --- | --------- | --------------------------- | --- |
|     |           |                             |     |

15
Referencias
Alfonso, D. (2020). Simulacros de un rescate industrial, un riesgo necesario. Gestión de la
Seguridad y la Salud en el Trabajo, 2(2).
https://revistas.poligran.edu.co/index.php/gsst/article/download/2112/2004/5353
Codelco. (2024-2025). Centro de Entrenamiento El Teniente (CESSO): capacitación con realidad
virtual [Programa de entrenamiento]. Codelco.
Expo. (s.f.). Documentation. Recuperado el 8 de septiembre de 2026, de https://docs.expo.dev
Guía Minera. (2021). Minería Contigo [Aplicación móvil]. Ministerio de Minería de Chile.
iSpring Solutions. (s.f.). Scenario-based training to improve workplace decisions. iSpring.
Recuperado el 8 de septiembre de 2026, de https://www.ispringsolutions.com
LearnNovators. (s.f.). Scenario-based learning: Turning learners into decision-makers.
LearnNovators. https://learnnovators.com/?p=22906
React Native. (s.f.). Documentation. Recuperado el 8 de septiembre de 2026, de
https://reactnative.dev
React Navigation. (s.f.). Documentation. Recuperado el 8 de septiembre de 2026, de
https://reactnavigation.org
SGS. (2019). Safety First [Aplicación móvil]. Presentado en Perumin 2019.
U.S. Department of Labor, Mine Safety and Health Administration. (2023). Miner Safety and
Health app. https://www.dol.gov
Zapata Escobar, A. M. (2015). Acerca de un programa de formación en el lugar de trabajo para
la toma de decisiones de actos seguros [Tesis de maestría, Universidad de Antioquia].
Repositorio Institucional UdeA.

16
https://bibliotecadigital.udea.edu.co/dspace/bitstream/10495/2780/1/ZapataAndresMauric
io_2015_ProgramaFormacionTrabajoSeguros.pdf
Declaración sobre el uso de Inteligencia Artificial
Para la elaboración del presente trabajo se utilizó Inteligencia Artificial, como herramienta de apoyo y orientación
durante el proceso de consulta. Su uso estuvo enfocado principalmente en ayudar a comprender los temas
relacionados con las aplicaciones móviles, organizar la información, identificar conceptos relevantes y orientar la
búsqueda de fuentes.
La Inteligencia Artificial fue utilizada como una herramienta complementaria para facilitar la organización y
comprensión de la información.