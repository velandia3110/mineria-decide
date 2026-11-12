import { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Portada from '../components/Portada';
import escenarios from '../data/escenarios.json';
import teoria from '../data/teoria.json';
import { cargarProgreso } from '../storage';
import { colores, espacio, fuente, radio } from '../theme';

const categorias = Object.fromEntries(teoria.map((c) => [c.id, c]));

function Punto({ icono, titulo, texto }) {
  return (
    <View style={styles.punto}>
      <Ionicons name={icono} size={22} color={colores.primario} style={styles.puntoIcono} />
      <View style={styles.textos}>
        <Text style={styles.puntoTitulo}>{titulo}</Text>
        <Text style={styles.puntoTexto}>{texto}</Text>
      </View>
    </View>
  );
}

export default function EscenariosScreen({ navigation }) {
  const [enProgreso, setEnProgreso] = useState({});

  useFocusEffect(
    useCallback(() => {
      Promise.all(escenarios.map((e) => cargarProgreso(e.id))).then((progresos) =>
        setEnProgreso(Object.fromEntries(escenarios.map((e, i) => [e.id, Boolean(progresos[i])])))
      );
    }, [])
  );

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.contenedor}>
      <View style={styles.intro}>
        <Portada imagen="escenarios" alto={130} style={styles.introPortada} subtitulo="Aprende practicando" titulo="Escenarios interactivos" />
        <Punto
          icono="help-circle-outline"
          titulo="¿Qué son?"
          texto="Situaciones reales de la mina contadas paso a paso. En cada paso eliges qué hacer y la historia cambia según tu decisión."
        />
        <Punto
          icono="shield-checkmark-outline"
          titulo="¿En qué te ayudan?"
          texto="Practicas sin riesgo cómo actuar ante una emergencia. Cada respuesta te explica por qué es segura o peligrosa y al final te dice qué temas repasar."
        />
      </View>
      {escenarios.map((e) => {
        const categoria = categorias[e.categoriaId];
        return (
          <Pressable
            key={e.id}
            accessibilityRole="button"
            onPress={() => navigation.navigate('Escenario', { escenarioId: e.id, titulo: e.titulo })}
            style={({ pressed }) => [styles.tarjeta, pressed && { backgroundColor: colores.presionado }]}
          >
            <Portada imagen={e.id} icono={categoria?.icono} colorIcono={categoria?.color} alto={92} style={styles.miniatura} />
            <View style={styles.textos}>
              <Text style={styles.titulo}>{e.titulo}</Text>
              <Text style={[styles.categoria, { color: categoria?.color ?? colores.primario }]}>{categoria?.titulo}</Text>
              {enProgreso[e.id] && <Text style={styles.progreso}>En progreso</Text>}
            </View>
            <Ionicons name="chevron-forward" size={20} color={colores.textoSuave} />
          </Pressable>
        );
      })}
      <Text style={styles.pie}>Tu avance se guarda en el dispositivo después de cada decisión.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: { padding: espacio.m },
  intro: {
    backgroundColor: colores.tarjeta,
    borderRadius: radio.l,
    borderWidth: 1,
    borderColor: colores.separador,
    overflow: 'hidden',
    paddingBottom: espacio.s,
    marginBottom: espacio.m,
  },
  introPortada: { borderRadius: 0, marginBottom: espacio.s },
  punto: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: espacio.m, paddingVertical: espacio.s },
  puntoIcono: { marginTop: 1 },
  puntoTitulo: { fontSize: fuente.normal - 1, fontWeight: '700', color: colores.texto },
  puntoTexto: { fontSize: fuente.pie + 2, color: colores.textoSuave, lineHeight: 21, marginTop: 2 },
  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colores.tarjeta,
    borderRadius: radio.l,
    borderWidth: 1,
    borderColor: colores.separador,
    padding: espacio.s,
    paddingRight: espacio.m,
    marginBottom: espacio.s + 4,
  },
  miniatura: { width: 92, borderRadius: radio.m },
  textos: { flex: 1, marginHorizontal: espacio.m },
  titulo: { fontSize: fuente.normal, fontWeight: '600', color: colores.texto, lineHeight: 22 },
  categoria: { fontSize: fuente.pie, fontWeight: '600', marginTop: espacio.xs },
  progreso: {
    alignSelf: 'flex-start',
    fontSize: fuente.pie - 1,
    fontWeight: '700',
    color: colores.sobrePrimario,
    backgroundColor: colores.primario,
    borderRadius: 6,
    overflow: 'hidden',
    paddingHorizontal: espacio.s,
    paddingVertical: 2,
    marginTop: espacio.s,
  },
  pie: { fontSize: fuente.pie, color: colores.textoSuave, textAlign: 'center', marginTop: espacio.s },
});
