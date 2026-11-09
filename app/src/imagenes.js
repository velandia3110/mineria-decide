// Ilustraciones locales (640x360, ~12 KB) indexadas por id de vista, categoría, tema o escenario.
const tunel = require('../assets/img/tunel.jpg');
const ventilacion = require('../assets/img/ventilacion.jpg');
const gases = require('../assets/img/gases.jpg');
const detector = require('../assets/img/detector.jpg');
const almacen = require('../assets/img/almacen.jpg');
const manipulacion = require('../assets/img/manipulacion.jpg');
const tiros = require('../assets/img/tiros.jpg');
const teoria = require('../assets/img/teoria.jpg');
const progreso = require('../assets/img/progreso.jpg');
const salida = require('../assets/img/salida.jpg');

const imagenes = {
  inicio: tunel,
  teoria,
  desempeno: progreso,
  fin: salida,
  // categorías
  ventilacion,
  explosivos: manipulacion,
  // temas
  'ventilacion-socavon': ventilacion,
  'gases-peligrosos': gases,
  'detector-multigas': detector,
  almacenamiento: almacen,
  manipulacion,
  'tiros-fallados': tiros,
  // escenarios
  'gas-galeria': gases,
  'tiro-fallado': tiros,
};

export const imagen = (id) => imagenes[id] ?? tunel;
