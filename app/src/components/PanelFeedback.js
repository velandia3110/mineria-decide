import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BotonGrande from './BotonGrande';
import { colores, espacio, fuente, radio } from '../theme';

export default function PanelFeedback({ opcion, onContinuar }) {
  const color = opcion.correcta ? colores.correcto : colores.incorrecto;
  return (
    <View>
      <View style={styles.panel}>
        <View style={[styles.circulo, { borderColor: color }]}>
          <Ionicons name={opcion.correcta ? 'checkmark' : 'close'} size={64} color={color} />
        </View>
        <Text style={[styles.resultado, { color }]}>{opcion.correcta ? '¡Correcto!' : '¡Incorrecto!'}</Text>
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
  panel: {
    backgroundColor: colores.tarjeta,
    borderRadius: radio.l,
    borderWidth: 1,
    borderColor: colores.separador,
    padding: espacio.l,
    alignItems: 'center',
    marginBottom: espacio.m,
  },
  circulo: { width: 112, height: 112, borderRadius: 56, borderWidth: 4, alignItems: 'center', justifyContent: 'center' },
  resultado: { fontSize: fuente.grande - 4, fontWeight: '800', marginTop: espacio.m, marginBottom: espacio.m },
  etiqueta: { fontSize: fuente.pie, color: colores.textoSuave, textTransform: 'uppercase', marginBottom: espacio.xs },
  elegida: { fontSize: fuente.normal, color: colores.texto, fontWeight: '600', textAlign: 'center' },
  separador: { alignSelf: 'stretch', height: 1, backgroundColor: colores.separador, marginVertical: espacio.m },
  texto: { fontSize: fuente.normal, color: colores.texto, lineHeight: 25, textAlign: 'center' },
});
