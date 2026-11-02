import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Fila from '../components/Fila';
import Grupo from '../components/Grupo';
import escenarios from '../data/escenarios.json';
import teoria from '../data/teoria.json';
import { cargarProgreso } from '../storage';
import { espacio } from '../theme';

const categorias = Object.fromEntries(teoria.map((c) => [c.id, c]));

export default function EscenariosScreen({ navigation }) {
  const [enProgreso, setEnProgreso] = useState({});

  useFocusEffect(
    useCallback(() => {
      Promise.all(escenarios.map((e) => cargarProgreso(e.id))).then((progresos) =>
        setEnProgreso(Object.fromEntries(escenarios.map((e, i) => [e.id, Boolean(progresos[i])])))
      );
    }, [])
  );

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.contenedor}>
      <Grupo titulo="Disponibles" pie="Tu avance se guarda en el dispositivo después de cada decisión.">
        {escenarios.map((e) => (
          <Fila
            key={e.id}
            titulo={e.titulo}
            subtitulo={e.descripcion}
            icono={categorias[e.categoriaId]?.icono}
            colorIcono={categorias[e.categoriaId]?.color}
            etiqueta={enProgreso[e.id] ? 'En progreso' : null}
            onPress={() => navigation.navigate('Escenario', { escenarioId: e.id, titulo: e.titulo })}
          />
        ))}
      </Grupo>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: { padding: espacio.m },
});
