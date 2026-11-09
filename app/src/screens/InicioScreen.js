import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Portada from '../components/Portada';
import { colores, espacio, fuente, radio } from '../theme';

function Mosaico({ titulo, icono, onPress, ancho }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.mosaico, ancho && styles.mosaicoAncho, pressed && { backgroundColor: colores.presionado }]}
    >
      <Ionicons name={icono} size={36} color={colores.primario} />
      <Text style={[styles.mosaicoTexto, ancho && styles.mosaicoTextoAncho]}>{titulo}</Text>
    </Pressable>
  );
}

export default function InicioScreen({ navigation }) {
  const { top } = useSafeAreaInsets();
  return (
    <ScrollView contentContainerStyle={[styles.contenedor, { paddingTop: top + espacio.l }]}>
      <View style={styles.marca}>
        <MaterialCommunityIcons name="hard-hat" size={64} color={colores.primario} />
        <Text style={styles.nombre}>
          Minería<Text style={{ color: colores.primario }}>Decide</Text>
        </Text>
        <Text style={styles.lema}>Capacitación en seguridad minera</Text>
      </View>

      <Text style={styles.saludo}>¡Hola, trabajador!</Text>
      <Text style={styles.subtitulo}>Elige una opción para continuar</Text>

      <View style={styles.rejilla}>
        <Mosaico titulo={'Escenarios\ninteractivos'} icono="play" onPress={() => navigation.navigate('Escenarios')} />
        <Mosaico titulo={'Contenido\nteórico'} icono="book" onPress={() => navigation.navigate('Teoria')} />
        <Mosaico titulo="Mi desempeño" icono="stats-chart" ancho onPress={() => navigation.navigate('Desempeno')} />
      </View>

      <Portada alto={170}>
        <View style={styles.pie}>
          <Ionicons name="cloud-offline-outline" size={16} color={colores.texto} />
          <Text style={styles.pieTexto}>Aprende · Decide · Trabaja seguro — sin conexión</Text>
        </View>
      </Portada>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: { padding: espacio.m, paddingBottom: espacio.xl },
  marca: { alignItems: 'center', marginBottom: espacio.l },
  nombre: { fontSize: fuente.grande, fontWeight: '800', color: colores.texto, marginTop: espacio.xs },
  lema: { fontSize: fuente.normal - 2, color: colores.textoSuave, marginTop: espacio.xs },
  saludo: { fontSize: fuente.titulo, fontWeight: '700', color: colores.texto, textAlign: 'center' },
  subtitulo: { fontSize: fuente.normal - 2, color: colores.textoSuave, textAlign: 'center', marginTop: espacio.xs, marginBottom: espacio.l },
  rejilla: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: espacio.s },
  mosaico: {
    width: '48.5%',
    minHeight: 120,
    backgroundColor: colores.tarjeta,
    borderRadius: radio.l,
    borderWidth: 1,
    borderColor: colores.separador,
    alignItems: 'center',
    justifyContent: 'center',
    padding: espacio.m,
    marginBottom: espacio.s,
  },
  mosaicoAncho: { width: '100%', minHeight: 72, flexDirection: 'row' },
  mosaicoTexto: { fontSize: fuente.normal - 1, fontWeight: '600', color: colores.texto, textAlign: 'center', marginTop: espacio.s },
  mosaicoTextoAncho: { marginTop: 0, marginLeft: espacio.m },
  pie: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: espacio.s,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  pieTexto: { fontSize: fuente.pie, color: colores.texto, marginLeft: espacio.xs },
});
