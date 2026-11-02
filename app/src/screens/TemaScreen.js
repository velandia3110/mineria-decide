import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BotonGrande from '../components/BotonGrande';
import teoria from '../data/teoria.json';
import { colores, espacio, fuente, radio } from '../theme';

export default function TemaScreen({ route, navigation }) {
  const { categoriaId, temaId } = route.params;
  const categoria = teoria.find((c) => c.id === categoriaId);
  const tema = categoria?.temas.find((t) => t.id === temaId);

  if (!tema) {
    return <Text style={styles.parrafo}>Tema no encontrado.</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      <View style={[styles.icono, { backgroundColor: categoria.color }]}>
        <Ionicons name={tema.icono} size={36} color={colores.textoClaro} />
      </View>
      <View style={styles.tarjeta}>
        {tema.parrafos.map((parrafo, i) => (
          <Text key={i} style={styles.parrafo}>{parrafo}</Text>
        ))}
      </View>
      <View style={styles.puntos}>
        <View style={styles.puntosCabecera}>
          <Ionicons name="warning" size={20} color={colores.acento} />
          <Text style={styles.puntosTitulo}>Puntos clave</Text>
        </View>
        {tema.puntosClave.map((punto, i) => (
          <View key={i} style={styles.punto}>
            <Ionicons name="checkmark-circle" size={20} color={colores.acento} style={styles.puntoIcono} />
            <Text style={styles.puntoTexto}>{punto}</Text>
          </View>
        ))}
      </View>
      <BotonGrande titulo="Practicar un escenario" icono="play-circle-outline" onPress={() => navigation.navigate('Escenarios')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: { padding: espacio.m, paddingBottom: espacio.xl },
  icono: {
    width: 72,
    height: 72,
    borderRadius: radio.l,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: espacio.m,
  },
  tarjeta: { backgroundColor: colores.tarjeta, borderRadius: radio.m, padding: espacio.m, marginBottom: espacio.m },
  parrafo: { fontSize: fuente.normal, lineHeight: 26, color: colores.texto, marginVertical: espacio.xs },
  puntos: { backgroundColor: colores.aviso, borderRadius: radio.m, padding: espacio.m, marginBottom: espacio.m },
  puntosCabecera: { flexDirection: 'row', alignItems: 'center', marginBottom: espacio.s },
  puntosTitulo: { fontSize: fuente.normal, fontWeight: '700', color: colores.texto, marginLeft: espacio.s },
  punto: { flexDirection: 'row', alignItems: 'flex-start', marginVertical: espacio.xs },
  puntoIcono: { marginTop: 2, marginRight: espacio.s },
  puntoTexto: { flex: 1, fontSize: fuente.normal, lineHeight: 24, color: colores.texto },
});
