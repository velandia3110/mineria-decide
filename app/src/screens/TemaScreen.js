import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BotonGrande from '../components/BotonGrande';
import Portada from '../components/Portada';
import teoria from '../data/teoria.json';
import { colores, espacio, fuente, radio } from '../theme';

function Flecha({ icono, tema, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={tema ? tema.titulo : undefined}
      disabled={!tema}
      onPress={onPress}
      style={({ pressed }) => [styles.flecha, tema && styles.flechaActiva, { opacity: !tema ? 0.3 : pressed ? 0.7 : 1 }]}
    >
      <Ionicons name={icono} size={24} color={tema ? colores.sobrePrimario : colores.textoSuave} />
    </Pressable>
  );
}

export default function TemaScreen({ route, navigation }) {
  const { categoriaId, temaId } = route.params;
  const categoria = teoria.find((c) => c.id === categoriaId);
  const indice = categoria ? categoria.temas.findIndex((t) => t.id === temaId) : -1;
  const tema = categoria?.temas[indice];

  if (!tema) {
    return <Text style={styles.parrafo}>Tema no encontrado.</Text>;
  }

  const ir = (otro) => navigation.replace('Tema', { categoriaId, temaId: otro.id, titulo: otro.titulo });
  const anterior = categoria.temas[indice - 1];
  const siguiente = categoria.temas[indice + 1];

  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      <Portada imagen={tema.id} alto={190} icono={tema.icono} colorIcono={categoria.color} subtitulo={categoria.titulo} titulo={tema.titulo} />

      <View style={styles.tarjeta}>
        {tema.parrafos.map((parrafo, i) => (
          <View key={i} style={styles.bloque}>
            <View style={[styles.marca, { backgroundColor: categoria.color }]} />
            <Text style={styles.parrafo}>{parrafo}</Text>
          </View>
        ))}
      </View>

      <View style={styles.puntos}>
        <View style={styles.puntosCabecera}>
          <Ionicons name="shield-checkmark" size={22} color={colores.primario} />
          <Text style={styles.puntosTitulo}>Puntos clave</Text>
        </View>
        {tema.puntosClave.map((punto, i) => (
          <View key={i} style={styles.punto}>
            <Ionicons name="checkbox" size={20} color={colores.primario} style={styles.puntoIcono} />
            <Text style={styles.puntoTexto}>{punto}</Text>
          </View>
        ))}
      </View>

      <View style={styles.paginacion}>
        <Flecha icono="chevron-back" tema={anterior} onPress={() => ir(anterior)} />
        <Text style={styles.pagina}>
          {indice + 1} / {categoria.temas.length}
        </Text>
        <Flecha icono="chevron-forward" tema={siguiente} onPress={() => ir(siguiente)} />
      </View>

      <BotonGrande titulo="Practicar un escenario" icono="play-circle-outline" onPress={() => navigation.navigate('Escenarios')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: { padding: espacio.m, paddingBottom: espacio.xl },
  tarjeta: {
    backgroundColor: colores.tarjeta,
    borderRadius: radio.l,
    borderWidth: 1,
    borderColor: colores.separador,
    padding: espacio.m,
    marginVertical: espacio.m,
  },
  bloque: { flexDirection: 'row', marginVertical: espacio.xs + 2 },
  marca: { width: 3, borderRadius: 2, marginRight: espacio.m - 4 },
  parrafo: { flex: 1, fontSize: fuente.normal, lineHeight: 26, color: colores.texto },
  puntos: { backgroundColor: colores.aviso, borderRadius: radio.l, borderWidth: 1, borderColor: '#4A3E12', padding: espacio.m, marginBottom: espacio.m },
  puntosCabecera: { flexDirection: 'row', alignItems: 'center', marginBottom: espacio.s },
  puntosTitulo: { fontSize: fuente.normal + 1, fontWeight: '800', color: colores.primario, marginLeft: espacio.s },
  punto: { flexDirection: 'row', alignItems: 'flex-start', marginVertical: espacio.xs },
  puntoIcono: { marginTop: 2, marginRight: espacio.s },
  puntoTexto: { flex: 1, fontSize: fuente.normal, lineHeight: 24, color: colores.texto },
  paginacion: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: espacio.m },
  flecha: { width: 48, height: 48, borderRadius: 24, borderWidth: 1, borderColor: colores.borde, alignItems: 'center', justifyContent: 'center' },
  flechaActiva: { backgroundColor: colores.primario, borderColor: colores.primario },
  pagina: { fontSize: fuente.normal, fontWeight: '700', color: colores.texto },
});
