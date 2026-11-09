import { StatusBar } from 'expo-status-bar';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colores } from './src/theme';
import InicioScreen from './src/screens/InicioScreen';
import TeoriaScreen from './src/screens/TeoriaScreen';
import TemaScreen from './src/screens/TemaScreen';
import EscenariosScreen from './src/screens/EscenariosScreen';
import EscenarioScreen from './src/screens/EscenarioScreen';
import DesempenoScreen from './src/screens/DesempenoScreen';

const Stack = createNativeStackNavigator();

const tema = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, primary: colores.primario, background: colores.fondo, card: colores.fondo, text: colores.texto, border: colores.separador },
};

const tituloGrande = {
  headerLargeTitle: true,
  headerLargeTitleShadowVisible: false,
  headerLargeStyle: { backgroundColor: colores.fondo },
};

export default function App() {
  return (
    <NavigationContainer theme={tema}>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colores.fondo },
          headerTintColor: colores.primario,
          headerTitleStyle: { color: colores.texto },
          headerShadowVisible: false,
          headerBackTitle: 'Atrás',
          contentStyle: { backgroundColor: colores.fondo },
        }}
      >
        <Stack.Screen name="Inicio" component={InicioScreen} options={{ title: 'Inicio', headerShown: false }} />
        <Stack.Screen name="Teoria" component={TeoriaScreen} options={{ title: 'Teoría', ...tituloGrande }} />
        <Stack.Screen name="Tema" component={TemaScreen} options={({ route }) => ({ title: route.params.titulo })} />
        <Stack.Screen name="Escenarios" component={EscenariosScreen} options={{ title: 'Escenarios', ...tituloGrande }} />
        <Stack.Screen name="Escenario" component={EscenarioScreen} options={({ route }) => ({ title: route.params.titulo })} />
        <Stack.Screen name="Desempeno" component={DesempenoScreen} options={{ title: 'Mi desempeño', ...tituloGrande }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
