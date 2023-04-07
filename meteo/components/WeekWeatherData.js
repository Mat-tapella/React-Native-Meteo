import React, { useEffect, useState } from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

export default function App() {
    const [forecastData, setForecastData] = useState(null);

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=44.5612032&lon=6.0820639&appid=b0c846745fe0887c91d1ed6dfd4a0719`)
            .then(response => response.json())
            .then(data => {
                const daysData = groupForecastByDay(data.list);
                setForecastData(daysData);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const groupForecastByDay = (list) => {
        const groups = {};
        list.forEach(item => {
            const date = item.dt_txt.split(' ')[0];
            const hour = item.dt_txt.split(' ')[1].split(':')[0];
            if (hour >= 8 && hour <= 23) {
                if (groups[date]) {
                    groups[date].push(item);
                } else {
                    groups[date] = [item];
                }
            }
        });
        const daysData = Object.keys(groups).map(key => ({
            date: key,
            data: groups[key]
        }));
        return daysData;
    };

    const renderItem = ({ item }) => (
        <View>
            <Text>Date: {item.date}</Text>
            {item.data.map(dataItem => (
                <Card key={dataItem.dt}>
                    <Text>Heure: {dataItem.dt_txt}</Text>
                    <Text>Météo: {dataItem.weather[0].description}</Text>
                    <Text>Température: {dataItem.main.temp}</Text>
                    <Image source={{ uri: `https://openweathermap.org/img/w/${dataItem.weather[0].icon}.png` }} style={{ width: 50, height: 50 }} />
                </Card>
            ))}
        </View>
    );

    return (
        <View>
            {forecastData ? (
                <FlatList
                    data={forecastData}
                    renderItem={renderItem}
                    keyExtractor={item => item.date}
                />
            ) : (
                <Text>Chargement...</Text>
            )}
        </View>
    );
}
