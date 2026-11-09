import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colores, espacio, fuente, radio } from '../theme';

export default function BotonGrande({ titulo, onPress, icono, color = colores.primario, secundario = false, disabled = false }) {
  const tinta = secundario ? colores.texto : colores.sobrePrimario;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.boton,
        secundario ? styles.secundario : { backgroundColor: color },
        { opacity: disabled ? 0.4 : pressed ? 0.75 : 1 },
      ]}
    >
      {icono && <Ionicons name={icono} size={20} color={secundario ? color : tinta} style={styles.icono} />}
      <Text style={[styles.texto, { color: tinta }]}>{titulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    minHeight: 52,
    borderRadius: radio.m,
    paddingHorizontal: espacio.m,
    marginVertical: espacio.xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secundario: { borderWidth: 1, borderColor: colores.borde, backgroundColor: colores.tarjeta },
  icono: { marginRight: espacio.s },
  texto: { fontSize: fuente.normal, fontWeight: '700' },
});
