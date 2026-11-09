import { Children, Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colores, espacio, fuente, linea, radio } from '../theme';

export default function Grupo({ titulo, pie, children }) {
  const filas = Children.toArray(children);
  return (
    <View style={styles.grupo}>
      {titulo && <Text style={styles.titulo}>{titulo}</Text>}
      <View style={styles.caja}>
        {filas.map((fila, i) => (
          <Fragment key={fila.key}>
            {i > 0 && <View style={styles.separador} />}
            {fila}
          </Fragment>
        ))}
      </View>
      {pie && <Text style={styles.pie}>{pie}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  grupo: { marginBottom: espacio.l },
  titulo: {
    fontSize: fuente.pie,
    color: colores.textoSuave,
    textTransform: 'uppercase',
    marginLeft: espacio.m,
    marginBottom: espacio.s,
  },
  caja: { backgroundColor: colores.tarjeta, borderRadius: radio.l, borderWidth: 1, borderColor: colores.separador, overflow: 'hidden' },
  separador: { height: linea, backgroundColor: colores.separador, marginLeft: 66 },
  pie: { fontSize: fuente.pie, color: colores.textoSuave, marginHorizontal: espacio.m, marginTop: espacio.s, lineHeight: 18 },
});
