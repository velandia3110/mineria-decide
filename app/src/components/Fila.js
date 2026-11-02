import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colores, espacio, fuente } from '../theme';

export default function Fila({ titulo, subtitulo, icono, colorIcono = colores.primario, etiqueta, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.fila, pressed && { backgroundColor: colores.presionado }]}
    >
      {icono && (
        <View style={[styles.cuadro, { backgroundColor: colorIcono }]}>
          <Ionicons name={icono} size={18} color={colores.textoClaro} />
        </View>
      )}
      <View style={styles.textos}>
        <Text style={styles.titulo}>{titulo}</Text>
        {subtitulo && <Text style={styles.subtitulo}>{subtitulo}</Text>}
      </View>
      {etiqueta && <Text style={styles.etiqueta}>{etiqueta}</Text>}
      <Ionicons name="chevron-forward" size={18} color={colores.separador} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    paddingVertical: espacio.m - 4,
    paddingHorizontal: espacio.m,
    backgroundColor: colores.tarjeta,
  },
  cuadro: { width: 30, height: 30, borderRadius: 7, alignItems: 'center', justifyContent: 'center', marginRight: espacio.m - 2 },
  textos: { flex: 1, marginRight: espacio.s },
  titulo: { fontSize: fuente.normal, color: colores.texto },
  subtitulo: { fontSize: fuente.pie + 2, color: colores.textoSuave, marginTop: 2, lineHeight: 20 },
  etiqueta: { fontSize: fuente.pie + 2, color: colores.acento, fontWeight: '600', marginRight: espacio.s },
});
