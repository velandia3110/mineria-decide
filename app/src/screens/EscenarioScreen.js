import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Fila from '../components/Fila';
import Grupo from '../components/Grupo';
import PanelFeedback from '../components/PanelFeedback';
import ResumenEscenario from '../components/ResumenEscenario';
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
    return (
      <ResumenEscenario
        escenario={escenario}
        estado={estado}
        onReintentar={reintentar}
        onVolver={() => navigation.goBack()}
        onTema={(tema) => navigation.navigate('Tema', { categoriaId: escenario.categoriaId, temaId: tema.id, titulo: tema.titulo })}
      />
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
});
