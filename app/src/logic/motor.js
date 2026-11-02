export function iniciar(escenario) {
  return { escenarioId: escenario.id, nodoId: escenario.inicio, decisiones: [] };
}

export function nodoActual(escenario, estado) {
  return escenario.nodos[estado.nodoId];
}

export function esFinal(escenario, estado) {
  return Boolean(nodoActual(escenario, estado)?.final);
}

export function elegir(escenario, estado, indiceOpcion) {
  const opcion = nodoActual(escenario, estado).opciones[indiceOpcion];
  return {
    estado: {
      ...estado,
      nodoId: opcion.siguiente,
      decisiones: [...estado.decisiones, { nodoId: estado.nodoId, opcion: indiceOpcion, correcta: opcion.correcta }],
    },
    opcion,
  };
}

export function contarResultados(estado) {
  const aciertos = estado.decisiones.filter((d) => d.correcta).length;
  return { aciertos, errores: estado.decisiones.length - aciertos };
}

export function validarEscenario(escenario) {
  const errores = [];
  const nodos = escenario.nodos;
  if (!nodos[escenario.inicio]) errores.push(`Nodo de inicio inexistente: ${escenario.inicio}`);
  for (const [id, nodo] of Object.entries(nodos)) {
    if (nodo.final) continue;
    if (!nodo.opciones?.length) errores.push(`Nodo ${id} sin opciones y no es final`);
    for (const op of nodo.opciones ?? []) {
      if (!nodos[op.siguiente]) errores.push(`Nodo ${id}: siguiente inexistente ${op.siguiente}`);
    }
  }
  const alcanzados = new Set();
  const pendientes = [escenario.inicio];
  while (pendientes.length) {
    const id = pendientes.pop();
    if (alcanzados.has(id) || !nodos[id]) continue;
    alcanzados.add(id);
    for (const op of nodos[id].opciones ?? []) pendientes.push(op.siguiente);
  }
  for (const id of Object.keys(nodos)) {
    if (!alcanzados.has(id)) errores.push(`Nodo ${id} inalcanzable`);
  }
  return errores;
}
