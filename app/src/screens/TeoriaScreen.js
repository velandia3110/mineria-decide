import { ScrollView, StyleSheet } from 'react-native';
import Fila from '../components/Fila';
import Grupo from '../components/Grupo';
import teoria from '../data/teoria.json';
import { espacio } from '../theme';

export default function TeoriaScreen({ navigation }) {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.contenedor}>
      {teoria.map((categoria) => (
        <Grupo key={categoria.id} titulo={categoria.titulo} pie={categoria.descripcion}>
          {categoria.temas.map((tema) => (
            <Fila
              key={tema.id}
              titulo={tema.titulo}
              icono={tema.icono}
              colorIcono={categoria.color}
              onPress={() => navigation.navigate('Tema', { categoriaId: categoria.id, temaId: tema.id, titulo: tema.titulo })}
            />
          ))}
        </Grupo>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: { padding: espacio.m },
});
