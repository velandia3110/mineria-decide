MINERIA: DECIDE
Aplicación móvil interactiva para la capacitación en
seguridad minera subterránea

PRESENTA:
Mabel Dalemne Bautista Rodriguez-55824016
Lizeth Vanesa Triana Abril-55824012

PRESENTADO A:
MAURICIO FONSECA

2

1. Planteamiento del problema

El  personal  operativo  del  sector  minero  requiere  capacitación  constante  en  temas  de

seguridad, tales como el manejo de explosivos, la ventilación en socavones, la identificación de

riesgos atmosféricos, la estabilidad de labores subterráneas y los protocolos ante emergencias. Sin

embargo,  los  métodos  de  capacitación  empleados  actualmente  suelen  limitarse  a  sesiones

presenciales,  material  impreso  o  plataformas  web  que  no  responden  adecuadamente  a  las

condiciones reales del entorno de trabajo minero.

Estos  métodos  tradicionales  presentan  tres  limitaciones  principales.  En  primer  lugar,  el

contenido se transmite de forma pasiva: lectura de manuales, observación de videos o diapositivas

sin exigir al trabajador que demuestre su capacidad real de respuesta ante una situación de riesgo.

En segundo lugar, no existe trazabilidad individual del progreso ni de las áreas específicas en las

que  cada  trabajador  presenta  debilidades,  lo  que  impide  reforzar  la  capacitación  de  forma

personalizada.  En  tercer  lugar,  buena  parte  del  trabajo  minero  ocurre  en  zonas  donde  la

conectividad a internet es limitada o variable, condición que restringe el uso de soluciones que

dependan de una conexión constante.

Como  consecuencia,  los  procesos  de  capacitación  actuales  tienden  a  priorizar  la

memorización de información sobre el desarrollo de la capacidad de decisión, lo cual resulta crítico

en un entorno donde una respuesta tardía o incorrecta ante una condición de riesgo puede derivar

en  accidentes  graves.  Diversos  estudios  en  el  sector  minero  coinciden  en  que  el  ensayo  de

decisiones  frente  a  situaciones  de  riesgo simuladas  es  una  estrategia  necesaria  y  validada  para

fortalecer la capacidad real de respuesta del trabajador (Alfonso, 2020; Zapata Escobar, 2015).

Frente  a  este  panorama,  surge  la  necesidad  de  una  solución  que  permita  capacitar  al

personal minero no solo en el conocimiento teórico de los riesgos, sino en la toma de decisiones

3

frente a situaciones simuladas, de forma accesible desde un dispositivo móvil y sin depender de

una conexión permanente a internet.

Pregunta  de  investigación:  ¿De  qué  manera  una  aplicación  móvil  basada  en  escenarios

interactivos  de  toma  de  decisiones  puede  fortalecer  la  capacitación  en  seguridad  minera

subterránea, en comparación con los métodos de capacitación tradicionales?

4

2.1 Pertinencia del enfoque basado en decisiones

2. Justificación

La capacitación tradicional en seguridad minera suele evaluar el conocimiento adquirido

mediante  preguntas  de  selección  múltiple  aisladas,  sin  que  el  trabajador  deba  demostrar  cómo

actuaría ante una secuencia real de eventos. Un enfoque basado en escenarios de decisión, en el

que cada elección genera una consecuencia y habilita la siguiente situación, permite evaluar no

solo qué sabe el trabajador, sino cómo actúa bajo presión, acercándose de forma más fiel a las

condiciones reales del entorno laboral (Zapata Escobar, 2015; LearnNovators, s.f.). Este tipo de

metodología transforma al aprendiz de receptor pasivo de información a tomador de decisiones

activo dentro de una historia con consecuencias reales (iSpring Solutions, s.f.).

2.2 Justificación de la plataforma móvil

La aplicación se plantea como una solución móvil, y no web, considerando el contexto de

uso del personal operativo: el acceso se realiza principalmente desde un dispositivo portátil, en

distintos  espacios  y  momentos  de  la  jornada,  y  no  desde  un  computador  de  escritorio.

Adicionalmente,  dado  que  la  conectividad  en  zonas  mineras  subterráneas  puede  ser  limitada  o

variable,  condición  que  debe  validarse  mediante  trabajo  de  campo,  se  plantea  un  modelo  de

funcionamiento offline-first: el contenido de capacitación se descarga previamente cuando existe

conexión, y las actividades (visualización de contenido, resolución de escenarios, evaluaciones)

pueden  realizarse  sin  depender  de  conexión  constante,  sincronizando  los  resultados  cuando  la

conexión esté disponible nuevamente.

2.3 Justificación tecnológica

Se  propone  el  uso  de  React  Native  como  framework  de  desarrollo,  dado  que  permite

construir una aplicación multiplataforma (Android e iOS) a partir de una única base de código,

5

reduciendo  el  tiempo  de  desarrollo  sin  sacrificar  el  acceso  a  funcionalidades  nativas  como

almacenamiento local, reproducción de audio y video, y navegación fluida entre pantallas, todas

necesarias  para  el  funcionamiento  offline  de  la  aplicación  (React  Native,  s.f.).  El  uso

complementario  de  Expo  y  React  Navigation  facilita  la  gestión  del  ciclo  de  compilación  y  la

navegación entre pantallas dentro de este mismo ecosistema (Expo, s.f.; React Navigation, s.f.).

2.4 Justificación disciplinar

El proyecto integra competencias propias de Ingeniería Multimedia: diseño de interacción

(UX/UI), producción de contenido visual, diseño de retroalimentación formativa, estructuración

de contenido educativo y desarrollo de software. Esto permite abordar el problema planteado desde

una perspectiva multidisciplinar, en lugar de reducirlo a una solución exclusivamente técnica.

2.5 Justificación social

La seguridad minera es un tema de alto impacto humano: los accidentes derivados de una

respuesta inadecuada ante condiciones de riesgo pueden tener consecuencias graves para la vida

de  los  trabajadores.  Fortalecer  la  capacidad  de  decisión  del  personal  operativo  mediante  una

herramienta accesible, replicable y de bajo costo de implementación representa un aporte concreto

a la reducción de dicho riesgo.

6

3.1 Objetivo general

3. Objetivos

Desarrollar una aplicación móvil de capacitación en seguridad minera subterránea, basada

en  escenarios  interactivos  de  toma  de  decisiones,  que  permita  a  los  trabajadores  fortalecer  su

capacidad  de  respuesta  ante  situaciones  de  riesgo,  con  funcionamiento  offline  y  seguimiento

individual del progreso.

3.2 Objetivos específicos

•  Diseñar escenarios de capacitación basados en secuencias de decisiones encadenadas, que

representen situaciones reales de riesgo en el entorno minero subterráneo.

•  Implementar un sistema de retroalimentación formativa inmediata, que explique al usuario

las razones y consecuencias de cada decisión tomada dentro de un escenario.

•  Desarrollar un módulo de capacitación teórica previo a los escenarios, que introduzca los

conceptos necesarios para la toma de decisiones.

•  Implementar el almacenamiento local del progreso del usuario, permitiendo el uso de la

aplicación sin dependencia de una conexión constante a internet.

•  Diseñar un sistema de seguimiento de desempeño por categoría de riesgo, que permita

identificar los temas en los que el usuario presenta mayores dificultades.

•  Validar la usabilidad de la aplicación con usuarios representativos del perfil objetivo,

mediante pruebas de tareas simples.

4. Análisis de proyectos similares (competencia)

Antes de definir el alcance de la propuesta, se revisaron soluciones existentes orientadas a

la seguridad y capacitación minera, con el fin de identificar qué enfoques ya están cubiertos y en

7

qué aspecto la propuesta aporta un diferencial concreto.

Solución

Enfoque

Fortaleza

Información y reporte
de incidentes

Respaldo institucional,
alcance nacional

Limitación frente a la
propuesta

Contenido informativo
pasivo, sin evaluación
de decisiones

Miner Safety
and Health
(MSHA, EE.
UU.) (U.S.
Department of
Labor, MSHA,
2023)

Minería Contigo
(Chile) (Guía
Minera, 2021)

Safety First
(Perú) (SGS,
2019)

Simuladores de
realidad virtual
(ej. CESSO,
Austral 3D)
(Codelco, 2024-
2025)

Videos cortos +
preguntas + puntos

Gratuita, orientada a
pequeña minería,
gamificación básica

Evaluación aislada por
video, no hay
escenarios encadenados

Gestión y auditoría de
seguridad

Integral para la
empresa (indicadores,
supervisiones)

Inmersión total con
hardware
especializado

Alto realismo y
efectividad de
entrenamiento

Dirigida a gestión
corporativa, no a la
capacitación individual
del operario

Alto costo de
infraestructura, no
portátil, no escalable a
bajo costo

4.1 Diferencial de la propuesta frente a la competencia

Las soluciones informativas y de gestión (MSHA, Safety First, ISEM Móvil) cubren bien

la difusión de contenido y la administración de cursos, pero no exigen al usuario demostrar una

capacidad  de  decisión  ante  una  secuencia  de  eventos.  Las  soluciones  de  gamificación  simple

(Minería  Contigo)  sí evalúan,  pero  de  forma  aislada,  pregunta  por  video,  sin  que una  decisión

afecte el desarrollo de la situación siguiente. Las soluciones de mayor inmersión (realidad virtual,

8

simuladores físicos) sí logran ese nivel de exigencia decisional, pero a un costo de infraestructura

que las hace inviables para una implementación amplia y de bajo costo.

La propuesta se posiciona en un punto intermedio no cubierto por las soluciones anteriores:

escenarios de decisión encadenada, con consecuencias y retroalimentación formativa, ejecutados

en un smartphone estándar, sin hardware adicional y con funcionamiento offline. Esto la hace más

exigente cognitivamente que una app de video y preguntas, y considerablemente más económica

y escalable que una solución de realidad virtual.

9

5.1 Usuario primario

5. Usuarios objetivo

Trabajadores  operativos  de  minería  subterránea  (operarios,  ayudantes  y  personal  de

campo), con acceso a un smartphone Android de gama básica o media, y con nivel de familiaridad

tecnológica variable. Este perfil requiere una interfaz simple, con iconografía clara, textos breves

y navegación sin pasos innecesarios.

5.2 Usuario secundario

Supervisores y responsables del área de seguridad y salud ocupacional, quienes asignan los

cursos  y  escenarios  correspondientes  a  cada  trabajador  y  hacen  seguimiento  a  su  progreso  y

desempeño  por categoría  de  riesgo.  Aunque  el  desarrollo  de  un  panel administrativo  completo

queda fuera del alcance de esta fase, el modelo de datos de la aplicación contempla esta necesidad

para una fase posterior.

5.3 Contexto de uso

•  Zonas con conectividad limitada o intermitente (interior de la mina), donde la app debe

funcionar sin conexión.

•  Puntos con conectividad ocasional (oficinas, campamentos, casa de cambio), donde se

realiza la descarga inicial de contenido y la sincronización del progreso.

•  Uso en sesiones cortas, entre turnos o en tiempos de espera, más que en sesiones largas y

continuas.

5.4 Enfoque de negocio / a quién se dirige la solución

La  propuesta  está  dirigida  en  primer  lugar  a  empresas  mineras  de  pequeña  y  mediana

escala, que no cuentan con presupuesto para soluciones de realidad virtual o simuladores físicos,

pero sí requieren fortalecer la capacitación en seguridad de su personal operativo. El software se

10

justifica frente a alternativas manuales (capacitación presencial, material impreso) porque permite

estandarizar  el  contenido,  medir  el  desempeño  individual  y  escalar  la  capacitación  a  más

trabajadores sin aumentar proporcionalmente el costo, algo que un instructor presencial o un aula

móvil no logran de la misma forma.

Referencias

11

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

https://bibliotecadigital.udea.edu.co/dspace/bitstream/10495/2780/1/ZapataAndresMauric

io_2015_ProgramaFormacionTrabajoSeguros.pdf

12

