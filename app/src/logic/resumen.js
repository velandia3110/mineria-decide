import { contarResultados } from './motor.js';

export const UMBRAL_REFUERZO = 70;

const porcentaje = (aciertos, total) => (total ? Math.round((aciertos / total) * 100) : 0);

export function resumir(escenario, estado) {
  const { aciertos, errores } = contarResultados(estado);
  const decisiones = estado.decisiones.map((d) => {
    const nodo = escenario.nodos[d.nodoId];
    const opcion = nodo.opciones[d.opcion];
    return { situacion: nodo.situacion, texto: opcion.texto, correcta: d.correcta, feedback: opcion.feedback, tema: nodo.tema };
  });
  const temasRecomendados = [...new Set(decisiones.filter((d) => !d.correcta && d.tema).map((d) => d.tema))];
  return { aciertos, errores, porcentaje: porcentaje(aciertos, aciertos + errores), decisiones, temasRecomendados };
}

export function desempenoPorCategoria(resultados) {
  const porCategoria = {};
  for (const r of resultados) {
    const c = (porCategoria[r.categoriaId] ??= { categoriaId: r.categoriaId, intentos: 0, aciertos: 0, errores: 0 });
    c.intentos += 1;
    c.aciertos += r.aciertos;
    c.errores += r.errores;
  }
  return Object.values(porCategoria)
    .map((c) => {
      const p = porcentaje(c.aciertos, c.aciertos + c.errores);
      return { ...c, porcentaje: p, necesitaRefuerzo: p < UMBRAL_REFUERZO };
    })
    .sort((a, b) => a.porcentaje - b.porcentaje);
}
