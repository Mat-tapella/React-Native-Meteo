import React, { Component } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

class WeatherData extends Component {
    state = {
        latitude: 0,
        longitude: 0,
        weatherData: {}
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&WeatherDataid={votre-clé-api}`)
                    .then(response => {
                        this.setState({
                            weatherData: response.data
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }

    render() {
        return (
            <View>
                <Text>Latitude: {this.state.latitude}</Text>
                <Text>Longitude: {this.state.longitude}</Text>
                <Text>Temperature: {this.state.weatherData.main.temp}</Text>
                <Text>Weather: {this.state.weatherData.weather[0].main}</Text>
            </View>
        );
    }
}

export default WeatherData;
