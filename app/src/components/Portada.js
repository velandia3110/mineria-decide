import { ImageBackground, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colores, radio } from '../theme';

const tunel = require('../../assets/tunel.jpg');

export default function Portada({ icono, color = colores.primario, alto = 160, tamano = 56, style, children }) {
  return (
    <ImageBackground source={tunel} resizeMode="cover" style={[styles.portada, { height: alto }, style]} imageStyle={styles.imagen}>
      {icono && (
        <View style={styles.icono}>
          <Ionicons name={icono} size={tamano} color={color} />
        </View>
      )}
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  portada: { overflow: 'hidden', borderRadius: radio.l, backgroundColor: colores.tarjeta },
  imagen: { borderRadius: radio.l },
  icono: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.25)' },
});
