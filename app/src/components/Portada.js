import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { imagen as buscar } from '../imagenes';
import { colores, espacio, fuente, radio } from '../theme';

export default function Portada({ imagen, alto = 160, titulo, subtitulo, icono, colorIcono = colores.primario, style, children }) {
  return (
    <ImageBackground source={buscar(imagen)} fadeDuration={0} resizeMode="cover" style={[styles.portada, { height: alto }, style]}>
      {children}
      {icono && (
        <View style={styles.insignia}>
          <Ionicons name={icono} size={18} color={colorIcono} />
        </View>
      )}
      {(titulo || subtitulo) && (
        <View style={styles.banda}>
          {subtitulo && <Text style={[styles.subtitulo, { color: colorIcono }]}>{subtitulo}</Text>}
          {titulo && <Text style={styles.titulo}>{titulo}</Text>}
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  portada: { overflow: 'hidden', borderRadius: radio.l, backgroundColor: colores.tarjeta },
  insignia: {
    position: 'absolute',
    top: espacio.s,
    left: espacio.s,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  banda: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: espacio.m, paddingTop: espacio.s, backgroundColor: 'rgba(0,0,0,0.6)' },
  subtitulo: { fontSize: fuente.pie, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  titulo: { fontSize: fuente.titulo, fontWeight: '800', color: colores.texto, marginTop: 2 },
});
