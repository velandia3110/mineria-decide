import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Portada from '../components/Portada';
import teoria from '../data/teoria.json';
import { colores, espacio, fuente, radio } from '../theme';

const totalTemas = teoria.reduce((t, c) => t + c.temas.length, 0);

function TarjetaTema({ tema, indice, color, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.tema, pressed && { backgroundColor: colores.presionado }]}
    >
      <View style={[styles.temaIcono, { borderColor: color }]}>
        <Ionicons name={tema.icono} size={22} color={color} />
      </View>
      <Text style={styles.temaNumero}>Tema {indice + 1}</Text>
      <Text style={styles.temaTitulo}>{tema.titulo}</Text>
      <Text style={styles.temaPuntos}>{tema.puntosClave.length} puntos clave</Text>
    </Pressable>
  );
}

export default function TeoriaScreen({ navigation }) {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.contenedor}>
      <Portada imagen="teoria" alto={150} titulo="Normas de seguridad" subtitulo={`${teoria.length} categorías · ${totalTemas} temas`} />

      {teoria.map((categoria) => (
        <View key={categoria.id} style={styles.categoria}>
          <Portada
            imagen={categoria.id}
            alto={130}
            icono={categoria.icono}
            colorIcono={categoria.color}
            subtitulo={`${categoria.temas.length} temas`}
            titulo={categoria.titulo}
          />
          <Text style={styles.descripcion}>{categoria.descripcion}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carrusel}>
            {categoria.temas.map((tema, i) => (
              <TarjetaTema
                key={tema.id}
                tema={tema}
                indice={i}
                color={categoria.color}
                onPress={() => navigation.navigate('Tema', { categoriaId: categoria.id, temaId: tema.id, titulo: tema.titulo })}
              />
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: { padding: espacio.m, paddingBottom: espacio.xl },
  categoria: { marginTop: espacio.l },
  descripcion: { fontSize: fuente.normal - 2, color: colores.textoSuave, lineHeight: 21, marginTop: espacio.s, marginHorizontal: espacio.xs },
  carrusel: { paddingVertical: espacio.m - 4, paddingRight: espacio.m },
  tema: {
    width: 156,
    backgroundColor: colores.tarjeta,
    borderRadius: radio.l,
    borderWidth: 1,
    borderColor: colores.separador,
    padding: espacio.m,
    marginRight: espacio.s + 2,
  },
  temaIcono: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  temaNumero: { fontSize: fuente.pie - 1, fontWeight: '700', color: colores.textoSuave, textTransform: 'uppercase', marginTop: espacio.m - 4 },
  temaTitulo: { fontSize: fuente.normal - 1, fontWeight: '700', color: colores.texto, lineHeight: 21, marginTop: 2, minHeight: 42 },
  temaPuntos: { fontSize: fuente.pie, color: colores.primario, fontWeight: '600', marginTop: espacio.s },
});
