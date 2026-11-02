import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BotonGrande from '../components/BotonGrande';
import Fila from '../components/Fila';
import Grupo from '../components/Grupo';
import PanelFeedback from '../components/PanelFeedback';
import escenarios from '../data/escenarios.json';
import { contarResultados, elegir, esFinal, iniciar, nodoActual } from '../logic/motor';
import { borrarProgreso, cargarProgreso, guardarProgreso, guardarResultado } from '../storage';
import { colores, espacio, fuente, radio } from '../theme';

export default function EscenarioScreen({ route, navigation }) {
  const escenario = escenarios.find((e) => e.id === route.params.escenarioId);
  const [estado, setEstado] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    cargarProgreso(escenario.id).then((guardado) =>
      setEstado(guardado && escenario.nodos[guardado.nodoId] && !esFinal(escenario, guardado) ? guardado : iniciar(escenario))
    );
  }, [escenario]);

  if (!estado) return <ActivityIndicator style={styles.cargando} size="large" color={colores.primario} />;

  const nodo = nodoActual(escenario, estado);
  const terminado = !feedback && esFinal(escenario, estado);

  function onElegir(indice) {
    const resultado = elegir(escenario, estado, indice);
    if (esFinal(escenario, resultado.estado)) {
      const { aciertos, errores } = contarResultados(resultado.estado);
      guardarResultado({ escenarioId: escenario.id, categoriaId: escenario.categoriaId, aciertos, errores, fecha: new Date().toISOString() });
      borrarProgreso(escenario.id);
    } else {
      guardarProgreso(escenario.id, resultado.estado);
    }
    setEstado(resultado.estado);
    setFeedback(resultado.opcion);
  }

  function reintentar() {
    setFeedback(null);
    setEstado(iniciar(escenario));
  }

  if (feedback) {
    return (
      <ScrollView contentContainerStyle={styles.contenedor}>
        <PanelFeedback opcion={feedback} onContinuar={() => setFeedback(null)} />
      </ScrollView>
    );
  }

  if (terminado) {
    const { aciertos, errores } = contarResultados(estado);
    return (
      <ScrollView contentContainerStyle={styles.contenedor}>
        <View style={styles.fin}>
          <Ionicons name="flag" size={40} color={colores.primario} />
          <Text style={styles.finTitulo}>Fin del escenario</Text>
          <Text style={styles.finTexto}>{nodo.situacion}</Text>
        </View>
        <View style={styles.conteo}>
          <View style={styles.dato}>
            <Ionicons name="checkmark-circle" size={28} color={colores.correcto} />
            <Text style={styles.numero}>{aciertos}</Text>
            <Text style={styles.datoTexto}>Aciertos</Text>
          </View>
          <View style={styles.dato}>
            <Ionicons name="close-circle" size={28} color={colores.incorrecto} />
            <Text style={styles.numero}>{errores}</Text>
            <Text style={styles.datoTexto}>Errores</Text>
          </View>
        </View>
        <BotonGrande titulo="Reintentar" icono="refresh" onPress={reintentar} />
        <BotonGrande titulo="Volver" icono="arrow-back" secundario onPress={() => navigation.goBack()} />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      <Text style={styles.etiqueta}>Decisión {estado.decisiones.length + 1}</Text>
      <View style={styles.situacion}>
        <Text style={styles.situacionTexto}>{nodo.situacion}</Text>
      </View>
      <Grupo titulo="¿Qué haces?">
        {nodo.opciones.map((op, i) => (
          <Fila key={`${estado.nodoId}-${i}`} titulo={op.texto} onPress={() => onElegir(i)} />
        ))}
      </Grupo>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cargando: { flex: 1 },
  contenedor: { padding: espacio.m, paddingBottom: espacio.xl },
  etiqueta: { fontSize: fuente.pie, fontWeight: '600', color: colores.primario, textTransform: 'uppercase', marginLeft: espacio.m, marginBottom: espacio.s },
  situacion: { backgroundColor: colores.tarjeta, borderRadius: radio.m, padding: espacio.m, marginBottom: espacio.l },
  situacionTexto: { fontSize: fuente.normal + 2, color: colores.texto, lineHeight: 28 },
  fin: { backgroundColor: colores.tarjeta, borderRadius: radio.l, padding: espacio.l, alignItems: 'center', marginBottom: espacio.m },
  finTitulo: { fontSize: fuente.titulo, fontWeight: '700', color: colores.texto, marginTop: espacio.s, marginBottom: espacio.s },
  finTexto: { fontSize: fuente.normal, color: colores.texto, lineHeight: 25, textAlign: 'center' },
  conteo: { flexDirection: 'row', marginBottom: espacio.m },
  dato: { flex: 1, backgroundColor: colores.tarjeta, borderRadius: radio.m, padding: espacio.m, alignItems: 'center', marginHorizontal: espacio.xs },
  numero: { fontSize: fuente.grande, fontWeight: '700', color: colores.texto },
  datoTexto: { fontSize: fuente.pie, color: colores.textoSuave },
});
