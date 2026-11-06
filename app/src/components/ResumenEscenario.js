import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BotonGrande from './BotonGrande';
import Fila from './Fila';
import Grupo from './Grupo';
import teoria from '../data/teoria.json';
import { resumir } from '../logic/resumen';
import { colores, espacio, fuente, radio } from '../theme';

function Dato({ icono, color, valor, texto }) {
  return (
    <View style={styles.dato}>
      <Ionicons name={icono} size={24} color={color} />
      <Text style={styles.numero}>{valor}</Text>
      <Text style={styles.datoTexto}>{texto}</Text>
    </View>
  );
}

export default function ResumenEscenario({ escenario, estado, onReintentar, onVolver, onTema }) {
  const resumen = resumir(escenario, estado);
  const categoria = teoria.find((c) => c.id === escenario.categoriaId);
  const temas = resumen.temasRecomendados.map((id) => categoria?.temas.find((t) => t.id === id)).filter(Boolean);
  const final = escenario.nodos[estado.nodoId];

  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      <View style={styles.fin}>
        <Ionicons name="flag" size={40} color={colores.primario} />
        <Text style={styles.finTitulo}>Fin del escenario</Text>
        <Text style={styles.finTexto}>{final.situacion}</Text>
      </View>

      <View style={styles.conteo}>
        <Dato icono="checkmark-circle" color={colores.correcto} valor={resumen.aciertos} texto="Aciertos" />
        <Dato icono="close-circle" color={colores.incorrecto} valor={resumen.errores} texto="Errores" />
        <Dato icono="speedometer-outline" color={colores.primario} valor={`${resumen.porcentaje}%`} texto="Desempeño" />
      </View>

      <Grupo titulo="Tus decisiones">
        {resumen.decisiones.map((d, i) => (
          <View key={i} style={styles.decision}>
            <Ionicons
              name={d.correcta ? 'checkmark-circle' : 'close-circle'}
              size={22}
              color={d.correcta ? colores.correcto : colores.incorrecto}
              style={styles.decisionIcono}
            />
            <View style={styles.decisionTextos}>
              <Text style={styles.decisionTexto}>{d.texto}</Text>
              {!d.correcta && <Text style={styles.decisionFeedback}>{d.feedback}</Text>}
            </View>
          </View>
        ))}
      </Grupo>

      {temas.length > 0 ? (
        <Grupo titulo="Te recomendamos repasar" pie="Toca un tema para abrir la teoría.">
          {temas.map((t) => (
            <Fila key={t.id} titulo={t.titulo} icono={t.icono} colorIcono={categoria.color} onPress={() => onTema(t)} />
          ))}
        </Grupo>
      ) : (
        <View style={styles.felicitacion}>
          <Ionicons name="ribbon-outline" size={24} color={colores.correcto} />
          <Text style={styles.felicitacionTexto}>Tomaste decisiones seguras en todo el escenario. Practica otro para seguir reforzando.</Text>
        </View>
      )}

      <BotonGrande titulo="Reintentar" icono="refresh" onPress={onReintentar} />
      <BotonGrande titulo="Volver" icono="arrow-back" secundario onPress={onVolver} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: { padding: espacio.m, paddingBottom: espacio.xl },
  fin: { backgroundColor: colores.tarjeta, borderRadius: radio.l, padding: espacio.l, alignItems: 'center', marginBottom: espacio.m },
  finTitulo: { fontSize: fuente.titulo, fontWeight: '700', color: colores.texto, marginTop: espacio.s, marginBottom: espacio.s },
  finTexto: { fontSize: fuente.normal, color: colores.texto, lineHeight: 25, textAlign: 'center' },
  conteo: { flexDirection: 'row', marginBottom: espacio.l, marginHorizontal: -espacio.xs },
  dato: { flex: 1, backgroundColor: colores.tarjeta, borderRadius: radio.m, padding: espacio.m, alignItems: 'center', marginHorizontal: espacio.xs },
  numero: { fontSize: fuente.titulo + 6, fontWeight: '700', color: colores.texto, marginTop: espacio.xs },
  datoTexto: { fontSize: fuente.pie, color: colores.textoSuave },
  decision: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: espacio.m - 4, paddingHorizontal: espacio.m },
  decisionIcono: { marginTop: 1, marginRight: espacio.m - 2, width: 30, textAlign: 'center' },
  decisionTextos: { flex: 1 },
  decisionTexto: { fontSize: fuente.normal, color: colores.texto, lineHeight: 23 },
  decisionFeedback: { fontSize: fuente.pie + 2, color: colores.textoSuave, lineHeight: 20, marginTop: espacio.xs },
  felicitacion: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colores.tarjeta,
    borderRadius: radio.m,
    padding: espacio.m,
    marginBottom: espacio.l,
  },
  felicitacionTexto: { flex: 1, fontSize: fuente.normal, color: colores.texto, lineHeight: 23, marginLeft: espacio.m - 2 },
});
