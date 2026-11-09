import { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Grupo from '../components/Grupo';
import BotonGrande from '../components/BotonGrande';
import teoria from '../data/teoria.json';
import { desempenoPorCategoria, UMBRAL_REFUERZO } from '../logic/resumen';
import { cargarResultados } from '../storage';
import { colores, espacio, fuente, radio } from '../theme';

const categorias = Object.fromEntries(teoria.map((c) => [c.id, c]));

function FilaCategoria({ dato, onPress }) {
  const categoria = categorias[dato.categoriaId];
  const color = dato.necesitaRefuerzo ? colores.acento : colores.correcto;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.fila, pressed && { backgroundColor: colores.presionado }]}
    >
      <View style={styles.cuadro}>
        <Ionicons name={categoria?.icono ?? 'help-outline'} size={20} color={categoria?.color ?? colores.primario} />
      </View>
      <View style={styles.textos}>
        <View style={styles.cabecera}>
          <Text style={styles.titulo}>{categoria?.titulo ?? dato.categoriaId}</Text>
          <Text style={[styles.porcentaje, { color }]}>{dato.porcentaje}%</Text>
        </View>
        <View style={styles.barra}>
          <View style={[styles.relleno, { width: `${dato.porcentaje}%`, backgroundColor: color }]} />
        </View>
        <Text style={styles.detalle}>
          {dato.intentos} {dato.intentos === 1 ? 'intento' : 'intentos'} · {dato.aciertos} aciertos · {dato.errores} errores
        </Text>
        {dato.necesitaRefuerzo && (
          <View style={styles.refuerzo}>
            <Ionicons name="alert-circle" size={16} color={colores.acento} />
            <Text style={styles.refuerzoTexto}>Necesita refuerzo: repasa la teoría</Text>
          </View>
        )}
      </View>
      <Ionicons name="chevron-forward" size={18} color={colores.textoSuave} />
    </Pressable>
  );
}

function Estadistica({ icono, valor, texto }) {
  return (
    <View style={styles.estadistica}>
      <Ionicons name={icono} size={24} color={colores.primario} />
      <Text style={styles.estadisticaTexto}>{texto}</Text>
      <Text style={styles.estadisticaValor}>{valor}</Text>
    </View>
  );
}

export default function DesempenoScreen({ navigation }) {
  const [resultados, setResultados] = useState(null);

  useFocusEffect(
    useCallback(() => {
      cargarResultados().then(setResultados);
    }, [])
  );

  if (!resultados) return null;

  if (resultados.length === 0) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.contenedor}>
        <View style={styles.vacio}>
          <Ionicons name="stats-chart-outline" size={48} color={colores.textoSuave} />
          <Text style={styles.vacioTitulo}>Aún no hay resultados</Text>
          <Text style={styles.vacioTexto}>Completa un escenario para ver tu desempeño por categoría de riesgo.</Text>
        </View>
        <BotonGrande titulo="Ir a escenarios" icono="git-branch-outline" onPress={() => navigation.navigate('Escenarios')} />
      </ScrollView>
    );
  }

  const datos = desempenoPorCategoria(resultados);
  const aciertos = resultados.reduce((t, r) => t + r.aciertos, 0);
  const decisiones = resultados.reduce((t, r) => t + r.aciertos + r.errores, 0);
  const porcentaje = decisiones ? Math.round((aciertos / decisiones) * 100) : 0;

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.contenedor}>
      <View style={styles.resumen}>
        <View style={styles.anillo}>
          <Text style={styles.anilloValor}>{porcentaje}%</Text>
        </View>
        <Text style={styles.resumenTexto}>Decisiones seguras</Text>
      </View>
      <View style={styles.estadisticas}>
        <Estadistica icono="trophy" texto="Escenarios" valor={resultados.length} />
        <Estadistica icono="star" texto="Aciertos" valor={aciertos} />
        <Estadistica icono="git-branch" texto="Decisiones" valor={decisiones} />
      </View>
      <Grupo
        titulo="Por categoría de riesgo"
        pie={`Ordenado de menor a mayor desempeño. Por debajo de ${UMBRAL_REFUERZO}% se recomienda reforzar.`}
      >
        {datos.map((d) => (
          <FilaCategoria key={d.categoriaId} dato={d} onPress={() => navigation.navigate('Teoria')} />
        ))}
      </Grupo>
      <Text style={styles.total}>
        {resultados.length} {resultados.length === 1 ? 'escenario completado' : 'escenarios completados'}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: { padding: espacio.m },
  fila: { flexDirection: 'row', alignItems: 'center', padding: espacio.m, backgroundColor: colores.tarjeta },
  cuadro: { width: 36, height: 36, borderRadius: 10, backgroundColor: colores.presionado, alignItems: 'center', justifyContent: 'center', marginRight: espacio.m - 2 },
  textos: { flex: 1, marginRight: espacio.s },
  cabecera: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  titulo: { fontSize: fuente.normal, color: colores.texto, flex: 1 },
  porcentaje: { fontSize: fuente.normal, fontWeight: '700' },
  barra: { height: 6, borderRadius: 3, backgroundColor: colores.presionado, marginVertical: espacio.s, overflow: 'hidden' },
  relleno: { height: 6, borderRadius: 3 },
  detalle: { fontSize: fuente.pie, color: colores.textoSuave },
  refuerzo: { flexDirection: 'row', alignItems: 'center', marginTop: espacio.xs },
  refuerzoTexto: { fontSize: fuente.pie, color: colores.acento, fontWeight: '600', marginLeft: espacio.xs },
  resumen: { alignItems: 'center', marginVertical: espacio.m },
  anillo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 12,
    borderColor: colores.primario,
    alignItems: 'center',
    justifyContent: 'center',
  },
  anilloValor: { fontSize: fuente.grande, fontWeight: '800', color: colores.texto },
  resumenTexto: { fontSize: fuente.normal, color: colores.textoSuave, marginTop: espacio.s },
  estadisticas: { flexDirection: 'row', marginHorizontal: -espacio.xs, marginBottom: espacio.l },
  estadistica: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colores.tarjeta,
    borderRadius: radio.m,
    borderWidth: 1,
    borderColor: colores.separador,
    padding: espacio.m,
    marginHorizontal: espacio.xs,
  },
  estadisticaTexto: { fontSize: fuente.pie, color: colores.textoSuave, marginTop: espacio.xs },
  estadisticaValor: { fontSize: fuente.titulo, fontWeight: '700', color: colores.primario },
  total: { fontSize: fuente.pie, color: colores.textoSuave, textAlign: 'center' },
  vacio: { backgroundColor: colores.tarjeta, borderRadius: radio.l, padding: espacio.l, alignItems: 'center', marginBottom: espacio.m },
  vacioTitulo: { fontSize: fuente.titulo, fontWeight: '700', color: colores.texto, marginTop: espacio.s },
  vacioTexto: { fontSize: fuente.normal, color: colores.textoSuave, textAlign: 'center', lineHeight: 24, marginTop: espacio.xs },
});
