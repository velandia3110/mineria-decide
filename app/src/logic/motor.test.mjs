import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { iniciar, nodoActual, elegir, esFinal, contarResultados, validarEscenario } from './motor.js';

const escenarios = JSON.parse(readFileSync(new URL('../data/escenarios.json', import.meta.url)));

const mini = {
  id: 'mini',
  inicio: 'a',
  nodos: {
    a: { situacion: 'A', opciones: [{ texto: 'bien', correcta: true, siguiente: 'b' }, { texto: 'mal', correcta: false, siguiente: 'c' }] },
    b: { situacion: 'B', final: true },
    c: { situacion: 'C', final: true },
  },
};

test('iniciar parte del nodo de inicio sin decisiones', () => {
  assert.deepEqual(iniciar(mini), { escenarioId: 'mini', nodoId: 'a', decisiones: [] });
  assert.equal(nodoActual(mini, iniciar(mini)).situacion, 'A');
});

test('elección correcta e incorrecta llevan a ramas distintas y no mutan el estado', () => {
  const e0 = iniciar(mini);
  const bien = elegir(mini, e0, 0);
  const mal = elegir(mini, e0, 1);
  assert.equal(bien.estado.nodoId, 'b');
  assert.equal(mal.estado.nodoId, 'c');
  assert.equal(bien.opcion.correcta, true);
  assert.equal(mal.opcion.correcta, false);
  assert.deepEqual(e0, { escenarioId: 'mini', nodoId: 'a', decisiones: [] });
  assert.ok(esFinal(mini, bien.estado));
  assert.ok(!esFinal(mini, e0));
  assert.deepEqual(contarResultados(mal.estado), { aciertos: 0, errores: 1 });
});

test('recorrido completo del escenario real por la ruta correcta', () => {
  const esc = escenarios[0];
  let estado = iniciar(esc);
  while (!esFinal(esc, estado)) {
    const i = nodoActual(esc, estado).opciones.findIndex((o) => o.correcta);
    estado = elegir(esc, estado, i).estado;
  }
  assert.equal(estado.nodoId, 'finExito');
  assert.deepEqual(contarResultados(estado), { aciertos: 3, errores: 0 });
});

test('validarEscenario detecta errores y acepta los escenarios reales', () => {
  const roto = { id: 'x', inicio: 'a', nodos: { a: { opciones: [{ siguiente: 'z' }] }, b: { situacion: 'B' } } };
  assert.equal(validarEscenario(roto).length, 3);
  for (const esc of escenarios) assert.deepEqual(validarEscenario(esc), []);
});
