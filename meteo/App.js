import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat={45.81660461425781}&lon={4.8998847007751465}&appid=b0c846745fe0887c91d1ed6dfd4a0719`)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
      })
      .catch(error => {
        console.error(error);
      });

  }, []);

  return (
    <View style={styles.container}>
      {weatherData ? (
        <View>
          <Text>Ville: {weatherData.name}</Text>
          <Text>Météo: {weatherData.weather[0].description}</Text>
          <Text>Température: {weatherData.main.temp}</Text>
        </View>
      ) : (
        <Text>Chargement...</Text>
      )}
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
