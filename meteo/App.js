import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WeatherData from './Component/CurrentWeatherData';

export default function App() {

  return (
    <View style={styles.container}>
      <Text>Bienvenue</Text>
      <Text>Voici la météo du jour</Text>
      <WeatherData />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
