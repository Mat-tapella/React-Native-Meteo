import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import WeatherData from './components/WeatherData';
import WeekWeatherData from './components/WeekWeatherData';


export default function App() {

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={styles.welcome}>Bienvenue</Text>
        <Text style={styles.text}>La météo du jour</Text>
      </View>
      <WeatherData />
      <Text style={styles.text}>La météo des jours à venir</Text>
      <WeekWeatherData />
    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5220AD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerTop: {
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: '#EAE53D',
    alignItems: 'center',
  }
});
