import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

export default function WeatherData() {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=44.5612032&lon=6.0820639&appid=b0c846745fe0887c91d1ed6dfd4a0719`)
            .then(response => response.json())
            .then(data => {
                setWeatherData(data);
            })
            .catch(error => {
                console.error(error);
            });

    }, []);


    return (
        <View>
            {weatherData ? (
                <Card>
                    <Image source={{ uri: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png` }} style={{ width: 50, height: 50 }} />
                    <Text>Ville: {weatherData.name}</Text>
                    <Text>Météo: {weatherData.weather[0].description}</Text>
                    <Text>Température: {weatherData.main.temp}</Text>
                </Card>
            ) : (
                <Text>Chargement...</Text>
            )}
        </View>

    );
}
