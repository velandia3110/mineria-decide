import AsyncStorage from '@react-native-async-storage/async-storage';

const claveProgreso = (escenarioId) => `@mineria/progreso/${escenarioId}`;
const CLAVE_RESULTADOS = '@mineria/resultados';

async function leer(clave) {
  try {
    const valor = await AsyncStorage.getItem(clave);
    return valor ? JSON.parse(valor) : null;
  } catch {
    return null;
  }
}

async function escribir(clave, valor) {
  try {
    await AsyncStorage.setItem(clave, JSON.stringify(valor));
  } catch {}
}

export function guardarProgreso(escenarioId, estado) {
  return escribir(claveProgreso(escenarioId), estado);
}

export function cargarProgreso(escenarioId) {
  return leer(claveProgreso(escenarioId));
}

export async function borrarProgreso(escenarioId) {
  try {
    await AsyncStorage.removeItem(claveProgreso(escenarioId));
  } catch {}
}

export async function cargarResultados() {
  const resultados = await leer(CLAVE_RESULTADOS);
  return Array.isArray(resultados) ? resultados : [];
}

export async function guardarResultado(resultado) {
  const resultados = await cargarResultados();
  await escribir(CLAVE_RESULTADOS, [...resultados, resultado]);
}
