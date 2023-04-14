import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import allCities from "../allCities.json"
export const WeatherContext = createContext();


const WeatherProvider = ({ children }) => {
    const key = process.env.REACT_APP_WEATHER_API_KEY;
    const [weather, setWeather] = useState([]);
    const [location, setLocation] = useState(null);
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [cities, setCities] = useState(allCities);
    const [selectedCity, setSelectedCity] = useState(cities[9]);
    useEffect(() => {
        setCities(allCities)
    }, []);

    useEffect(() => {
        const getData = async () => {
            const defaultLatitude = 39.653298;
            const defaultLongitude = 27.890342;
            const selectedLatitude = selectedCity.latitude;
            const selectedLongitude = selectedCity.longitude;

            setLatitude(selectedLatitude);
            setLongitude(selectedLongitude);

            
            if (!selectedLatitude || !selectedLongitude) {
                selectedLatitude = defaultLatitude;
                selectedLongitude = defaultLongitude;
              }
            
              setLatitude(selectedLatitude);
              setLongitude(selectedLongitude);
 
            try {
                const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${selectedLatitude}&lon=${selectedLongitude}&units=metric&appid=${key}&lang=tr`);
                setWeather(data)
            }
            catch {
                alert("Something went wrong")
            };
        }
         getData()
    }, [selectedCity])
   

    const handleCityChange = (event) => {
        const selectedId = parseInt(event.target.value);
        const nextCityIndex = selectedId - 1;
        const nextCity = cities[nextCityIndex];
        if (nextCity) {
          setSelectedCity(nextCity);
        }
      }
      
    return (
        <WeatherContext.Provider value={{ weather, location, handleCityChange, selectedCity, cities }}>
            {children}
        </WeatherContext.Provider>
    )


}
export default WeatherProvider