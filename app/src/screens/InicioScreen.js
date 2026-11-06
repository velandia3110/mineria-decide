import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Fila from '../components/Fila';
import Grupo from '../components/Grupo';
import { colores, espacio, fuente } from '../theme';

export default function InicioScreen({ navigation }) {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.contenedor}>
      <Text style={styles.subtitulo}>Capacitación en seguridad minera subterránea. Repasa la teoría y practica tus decisiones.</Text>
      <Grupo titulo="Aprender">
        <Fila
          key="teoria"
          titulo="Contenido teórico"
          subtitulo="Ventilación, gases y explosivos"
          icono="book-outline"
          onPress={() => navigation.navigate('Teoria')}
        />
        <Fila
          key="escenarios"
          titulo="Escenarios de decisión"
          subtitulo="Practica situaciones de riesgo"
          icono="git-branch-outline"
          colorIcono={colores.acento}
          onPress={() => navigation.navigate('Escenarios')}
        />
      </Grupo>
      <Grupo titulo="Progreso">
        <Fila
          key="desempeno"
          titulo="Mi desempeño"
          subtitulo="Resultados por categoría de riesgo"
          icono="stats-chart-outline"
          colorIcono={colores.correcto}
          onPress={() => navigation.navigate('Desempeno')}
        />
      </Grupo>
      <View style={styles.offline}>
        <Ionicons name="cloud-offline-outline" size={16} color={colores.textoSuave} />
        <Text style={styles.offlineTexto}>Funciona sin conexión a internet</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: { padding: espacio.m },
  subtitulo: { fontSize: fuente.normal, color: colores.textoSuave, lineHeight: 24, marginHorizontal: espacio.xs, marginBottom: espacio.l },
  offline: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  offlineTexto: { fontSize: fuente.pie, color: colores.textoSuave, marginLeft: espacio.xs },
});
