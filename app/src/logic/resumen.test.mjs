import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { elegir, esFinal, iniciar } from './motor.js';
import { desempenoPorCategoria, resumir } from './resumen.js';

const escenarios = JSON.parse(readFileSync(new URL('../data/escenarios.json', import.meta.url)));
const teoria = JSON.parse(readFileSync(new URL('../data/teoria.json', import.meta.url)));

function jugar(escenario, indices) {
  let estado = iniciar(escenario);
  for (const i of indices) estado = elegir(escenario, estado, i).estado;
  return estado;
}

test('resumir lista decisiones y recomienda solo temas de los errores, sin repetir', () => {
  const escenario = escenarios.find((e) => e.id === 'gas-galeria');
  const estado = jugar(escenario, [1, 0, 0]);
  assert.ok(esFinal(escenario, estado));
  const r = resumir(escenario, estado);
  assert.equal(r.decisiones.length, 3);
  assert.deepEqual([r.aciertos, r.errores, r.porcentaje], [2, 1, 67]);
  assert.deepEqual(r.temasRecomendados, ['ventilacion-socavon']);
  assert.equal(r.decisiones[0].correcta, false);
});

test('resumir sin errores no recomienda temas', () => {
  const escenario = escenarios.find((e) => e.id === 'tiro-fallado');
  const r = resumir(escenario, jugar(escenario, [0, 0, 0]));
  assert.deepEqual([r.aciertos, r.errores, r.porcentaje, r.temasRecomendados.length], [3, 0, 100, 0]);
});

test('desempenoPorCategoria acumula intentos y ordena de menor a mayor porcentaje', () => {
  const d = desempenoPorCategoria([
    { categoriaId: 'ventilacion', aciertos: 3, errores: 0 },
    { categoriaId: 'explosivos', aciertos: 1, errores: 2 },
    { categoriaId: 'ventilacion', aciertos: 1, errores: 1 },
  ]);
  assert.deepEqual(d.map((c) => [c.categoriaId, c.intentos, c.porcentaje, c.necesitaRefuerzo]), [
    ['explosivos', 1, 33, true],
    ['ventilacion', 2, 80, false],
  ]);
  assert.deepEqual(desempenoPorCategoria([]), []);
});

test('cada escenario usa una categoría y temas que existen en teoria.json', () => {
  for (const e of escenarios) {
    const categoria = teoria.find((c) => c.id === e.categoriaId);
    assert.ok(categoria, `${e.id}: categoría ${e.categoriaId} inexistente`);
    for (const [id, nodo] of Object.entries(e.nodos)) {
      if (nodo.tema) assert.ok(categoria.temas.some((t) => t.id === nodo.tema), `${e.id}/${id}: tema ${nodo.tema} inexistente`);
    }
  }
});
