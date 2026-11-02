import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BotonGrande from './BotonGrande';
import { colores, espacio, fuente, radio } from '../theme';

export default function PanelFeedback({ opcion, onContinuar }) {
  const color = opcion.correcta ? colores.correcto : colores.incorrecto;
  return (
    <View>
      <View style={styles.panel}>
        <Ionicons name={opcion.correcta ? 'checkmark-circle' : 'close-circle'} size={64} color={color} />
        <Text style={[styles.resultado, { color }]}>{opcion.correcta ? 'Correcto' : 'Incorrecto'}</Text>
        <Text style={styles.etiqueta}>Tu elección</Text>
        <Text style={styles.elegida}>{opcion.texto}</Text>
        <View style={styles.separador} />
        <Text style={styles.texto}>{opcion.feedback}</Text>
      </View>
      <BotonGrande titulo="Continuar" icono="arrow-forward" onPress={onContinuar} />
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { backgroundColor: colores.tarjeta, borderRadius: radio.l, padding: espacio.l, alignItems: 'center', marginBottom: espacio.m },
  resultado: { fontSize: fuente.titulo, fontWeight: '700', marginTop: espacio.s, marginBottom: espacio.m },
  etiqueta: { fontSize: fuente.pie, color: colores.textoSuave, textTransform: 'uppercase', marginBottom: espacio.xs },
  elegida: { fontSize: fuente.normal, color: colores.texto, fontWeight: '600', textAlign: 'center' },
  separador: { alignSelf: 'stretch', height: 1, backgroundColor: colores.fondo, marginVertical: espacio.m },
  texto: { fontSize: fuente.normal, color: colores.texto, lineHeight: 25 },
});
