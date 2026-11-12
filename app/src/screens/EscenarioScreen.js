import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PanelFeedback from '../components/PanelFeedback';
import Portada from '../components/Portada';
import ResumenEscenario from '../components/ResumenEscenario';
import escenarios from '../data/escenarios.json';
import { avance, contarResultados, elegir, esFinal, iniciar, nodoActual } from '../logic/motor';
import { borrarProgreso, cargarProgreso, guardarProgreso, guardarResultado } from '../storage';
import { colores, espacio, fuente, radio } from '../theme';

const LETRAS = 'ABCDEFGH';

function BarraAvance({ paso, total, aciertos }) {
  return (
    <View style={styles.avance}>
      <View style={styles.barra}>
        <Text style={styles.etiqueta}>
          Decisión {paso} de {total}
        </Text>
        <View style={styles.aciertos}>
          <Ionicons name="star" size={18} color={colores.primario} />
          <Text style={styles.aciertosTexto}>{aciertos}</Text>
        </View>
      </View>
      <View style={styles.pista} accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: total, now: paso }}>
        <View style={[styles.relleno, { width: `${(paso / total) * 100}%` }]} />
      </View>
    </View>
  );
}

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

  const { hechas, total } = avance(escenario, estado);
  const { aciertos } = contarResultados(estado);

  if (feedback) {
    return (
      <ScrollView contentContainerStyle={styles.contenedor}>
        <BarraAvance paso={hechas} total={total} aciertos={aciertos} />
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
      <BarraAvance paso={hechas + 1} total={total} aciertos={aciertos} />
      <View style={styles.situacion}>
        <Portada imagen={nodo.imagen ?? nodo.tema} icono="warning" alto={170} style={styles.imagen} />
        <Text style={styles.situacionTexto}>{nodo.situacion}</Text>
        <Text style={styles.pregunta}>¿Qué debes hacer?</Text>
      </View>
      {nodo.opciones.map((op, i) => (
        <Pressable
          key={`${estado.nodoId}-${i}`}
          accessibilityRole="button"
          onPress={() => onElegir(i)}
          style={({ pressed }) => [styles.opcion, pressed && styles.opcionPresionada]}
        >
          {({ pressed }) => (
            <>
              <Text style={[styles.letra, pressed && { color: colores.sobrePrimario }]}>{LETRAS[i]}.</Text>
              <Text style={[styles.opcionTexto, pressed && { color: colores.sobrePrimario }]}>{op.texto}</Text>
            </>
          )}
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cargando: { flex: 1 },
  contenedor: { padding: espacio.m, paddingBottom: espacio.xl },
  avance: { marginBottom: espacio.m },
  barra: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: espacio.s },
  pista: { height: 8, borderRadius: 4, backgroundColor: colores.borde, overflow: 'hidden' },
  relleno: { height: '100%', backgroundColor: colores.primario },
  etiqueta: { fontSize: fuente.pie, fontWeight: '700', color: colores.primario, textTransform: 'uppercase' },
  aciertos: { flexDirection: 'row', alignItems: 'center' },
  aciertosTexto: { fontSize: fuente.normal, fontWeight: '700', color: colores.primario, marginLeft: espacio.xs },
  situacion: {
    backgroundColor: colores.tarjeta,
    borderRadius: radio.l,
    borderWidth: 1,
    borderColor: colores.separador,
    overflow: 'hidden',
    marginBottom: espacio.m,
  },
  imagen: { borderRadius: 0 },
  situacionTexto: { fontSize: fuente.normal + 1, color: colores.texto, lineHeight: 26, padding: espacio.m, paddingBottom: espacio.s, textAlign: 'center' },
  pregunta: { fontSize: fuente.normal + 1, fontWeight: '700', color: colores.texto, textAlign: 'center', paddingBottom: espacio.m },
  opcion: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: 52,
    borderRadius: radio.m,
    borderWidth: 1,
    borderColor: colores.borde,
    backgroundColor: colores.tarjeta,
    paddingVertical: espacio.m - 2,
    paddingHorizontal: espacio.m,
    marginBottom: espacio.s,
  },
  opcionPresionada: { backgroundColor: colores.primario, borderColor: colores.primario },
  letra: { fontSize: fuente.normal, fontWeight: '800', color: colores.primario, width: 26 },
  opcionTexto: { flex: 1, fontSize: fuente.normal - 1, color: colores.texto, lineHeight: 22 },
});
