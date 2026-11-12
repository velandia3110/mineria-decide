// Ilustraciones locales (800x450 JPG, ~60 KB) generadas desde las imágenes originales de assets/img/<carpeta>.
// Se indexan por id de vista, categoría, tema, escenario o imagen de nodo (campo "imagen" en escenarios.json).
const img = {
  'gas-n1': require('../assets/img/gas-n1.jpg'),
  'gas-n2': require('../assets/img/gas-n2.jpg'),
  'gas-n3': require('../assets/img/gas-n3.jpg'),
  'tiro-n1': require('../assets/img/tiro-n1.jpg'),
  'tiro-n2': require('../assets/img/tiro-n2.jpg'),
  'tiro-n3': require('../assets/img/tiro-n3.jpg'),
  'pa-n1': require('../assets/img/pa-n1.jpg'),
  'pa-n2': require('../assets/img/pa-n2.jpg'),
  'pa-n3': require('../assets/img/pa-n3.jpg'),
  'derrumbe-n1': require('../assets/img/derrumbe-n1.jpg'),
  'derrumbe-n2': require('../assets/img/derrumbe-n2.jpg'),
  'derrumbe-n3': require('../assets/img/derrumbe-n3.jpg'),
  'apoyo-1': require('../assets/img/apoyo-1.jpg'),
  'apoyo-2': require('../assets/img/apoyo-2.jpg'),
  'apoyo-3': require('../assets/img/apoyo-3.jpg'),
  'apoyo-4': require('../assets/img/apoyo-4.jpg'),
  'apoyo-5': require('../assets/img/apoyo-5.jpg'),
  'apoyo-6': require('../assets/img/apoyo-6.jpg'),
};

const imagenes = {
  ...img,
  inicio: img['apoyo-5'],
  teoria: img['apoyo-2'],
  desempeno: img['apoyo-4'],
  fin: img['apoyo-1'],
  escenarios: img['apoyo-6'],
  // categorías
  ventilacion: img['gas-n1'],
  explosivos: img['tiro-n1'],
  emergencias: img['pa-n2'],
  // temas
  'ventilacion-socavon': img['gas-n1'],
  'gases-peligrosos': img['gas-n3'],
  'detector-multigas': img['gas-n2'],
  almacenamiento: img['tiro-n3'],
  manipulacion: img['tiro-n3'],
  'tiros-fallados': img['tiro-n2'],
  'primeros-auxilios': img['pa-n2'],
  derrumbes: img['apoyo-3'],
  // escenarios
  'gas-galeria': img['gas-n1'],
  'tiro-fallado': img['tiro-n1'],
  'primeros-auxilios-galeria': img['pa-n1'],
  'derrumbe-galeria': img['derrumbe-n1'],
};

export const imagen = (id) => imagenes[id] ?? img['apoyo-5'];
