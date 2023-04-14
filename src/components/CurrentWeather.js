import React, { useContext, useEffect, useState } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import WeeklyWeather from './WeeklyWeather';
import { UilSpinnerAlt } from "@iconscout/react-unicons";

const CurrentWeather = () => {

  const { weather } = useContext(WeatherContext)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false)
  }, [weather])


  const cityName = weather?.city?.name;
  const countryName = weather?.city?.country
  const date = new Date(weather.list?.[0].dt * 1000).toLocaleDateString()

  const dayName = new Date();
  const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

  const temp = weather?.list?.[0].main?.temp

  const description = weather?.list?.[0].weather?.[0].description
  let descriptionUpperCase = description;
  descriptionUpperCase = descriptionUpperCase?.replace(/^\w/, c => c.toUpperCase());


  const feelsLike = weather?.list?.[0].main.feels_like
  const humidity = weather?.list?.[0].main.humidity
  const wind = weather?.list?.[0].wind.speed

  const icon = weather?.list?.[0].weather?.[0].icon;
  const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
  

  return (
   
    <>

      {
        isLoading ? (
          <UilSpinnerAlt />
        ) : !weather || weather.length === 0 ? (
          <UilSpinnerAlt />
        ) : (
          <div className='container'>
            <div className="weather-side">
              <div className="weather-gradient">
                <div className="date-container">
                  <h2 className="date-dayname">{days[dayName.getDay()]}</h2>
                  <br />
                  <span className="date-day">{date}</span>
                  <i className="location-icon" data-feather="map-pin"></i>
                  <span className="location">{cityName} , {countryName}</span>
                </div>
                <div className="weather-container">
                  <div>
                    <img src={iconUrl} alt="weather icon" />
                  </div>
                  <h1 className="weather-temp">{Math.floor(temp)} °C</h1>
                  <h3 className="weather-desc">{descriptionUpperCase}</h3>
                </div>
              </div>
            </div>
            <div className="info-side">
              <div className="today-info-container">
                <div className="today-info">
                  <div className="precipitation">
                    <span className="title">HİSSEDİLEN </span>
                    <span className="value">{Math.ceil(feelsLike)} °C</span>
                    <div className="clear"></div>
                  </div>
                  <div className="humidity">
                    <span className="title">NEM ORANI</span>
                    <span className="value">{humidity} %</span>
                    <div className="clear"></div>
                  </div>
                  <div className="wind">
                    <span className="title">RÜZGAR</span>
                    <span className="value">{Math.floor(wind)} km/h</span>
                    <div className="clear"></div>
                  </div>
                </div>
              </div>
              <WeeklyWeather />
            </div>
          </div>
        )
      }


    </>
  )

}

export default CurrentWeather
