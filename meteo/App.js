import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import WeatherData from './components/WeatherData';
import WeekWeatherData from './components/WeekWeatherData';

export default function App() {

  return (
    <View style={styles.container}>
      <Text>Bienvenue</Text>
      <WeatherData />
      <WeekWeatherData />
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
