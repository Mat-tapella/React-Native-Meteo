import React, { useEffect, useState } from 'react';
import { Text, View, Image, FlatList, ScrollView, StyleSheet } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import * as Location from 'expo-location';

export default function App() {
    const [forecastData, setForecastData] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=b0c846745fe0887c91d1ed6dfd4a0719`)
                .then(response => response.json())
                .then(data => {
                    const daysData = groupForecastByDay(data.list);
                    setForecastData(daysData);
                })
                .catch(error => {
                    console.error(error);
                });
        })();
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
            <Text style={styles.textDate} >Date: {item.date}</Text>
            {item.data.map(dataItem => (
                <Card key={dataItem.dt} containerStyle={styles.card} >
                    <Image source={{ uri: `https://openweathermap.org/img/w/${dataItem.weather[0].icon}.png` }} style={{ width: 50, height: 50 }} />
                    <Text>Heure: {dataItem.dt_txt}</Text>
                    <Text>Météo: {dataItem.weather[0].description}</Text>
                    <Text>Température: {dataItem.main.temp}</Text>
                </Card>
            ))}
        </View>
    );

    return (
        <ScrollView>
            <View>
                {forecastData ? (
                    <FlatList
                        data={forecastData}
                        renderItem={renderItem}
                        keyExtractor={item => item.date}
                        horizontal={true}
                    />
                ) : (
                    <Text style={styles.textChargement} >Chargement...</Text>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    textChargement: {
        color: '#fff'
    },
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
    textDate: {
        color: '#fff',
        marginLeft: 15
    }
});