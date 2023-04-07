import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import * as Location from 'expo-location';

export default function WeatherData() {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=b0c846745fe0887c91d1ed6dfd4a0719`)
                .then(response => response.json())
                .then(data => {
                    setWeatherData(data);
                })
                .catch(error => {
                    console.error(error);
                });

        })();
    }, []);

    // const celsius = ((fahrenheit - 32) * 5) / 9;


    return (
        <View>
            {weatherData ? (
                <Card containerStyle={styles.card} >
                    <Image source={{ uri: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png` }} style={{ width: 150, height: 150, alignContent: 'center' }} />
                    <Text>Ville: {weatherData.name}</Text>
                    <Text>Météo: {weatherData.weather[0].description}</Text>
                    <Text>Température: {weatherData.main.temp}</Text>
                </Card>
            ) : (
                <Text style={styles.textChargement} >Chargement...</Text>
            )}
        </View>

    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: '#E9E4F2'
    },
    textChargement: {
        color: '#fff'
    }
});
