import React, { useEffect, useState, useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import {
  UilArrowDown,
  UilArrowUp,
  UilSpinnerAlt
} from "@iconscout/react-unicons";
const WeeklyWeather = () => {

  const { weather } = useContext(WeatherContext)
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tempMax, setTempMax] = useState([]);
  const [tempMin, setTempMin] = useState([]);


  const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

  useEffect(() => {
    setIsLoading(false)
    setWeatherData(weather)
  }, [weather]);

  useEffect(() => {
    if (weatherData.list && weatherData.list.length !== 0) {
      formatMaxTemp()
      formatMinTemp()
    }
  }, [weatherData])

  const formatMaxTemp = () => {
    const temps = []
    let firstTemp = weatherData.list[0].main.temp
    const leng = weatherData.list.length

    for (let i = 1; i < leng + 1; i++) {
      if (firstTemp < weatherData.list[i - 1].main.temp) {
        firstTemp = weatherData.list[i - 1].main.temp
      }
      if (i % 8 === 0 && i !== 0) {
        temps.push(firstTemp)
        firstTemp = weatherData.list[i - 1].main.temp
      }

    }
    setTempMax(temps)
  }


  const formatMinTemp = () => {
    const temps = []
    let firstTemp = weatherData.list[0].main.temp
    const leng = weatherData.list.length

    for (let i = 1; i < leng + 1; i++) {
      if (firstTemp > weatherData.list[i - 1].main.temp) {
        firstTemp = weatherData.list[i - 1].main.temp
      }
      if (i % 8 === 0 && i !== 0) {
        temps.push(firstTemp)
        firstTemp = weatherData.list[i - 1].main.temp
      }

    }
    setTempMin(temps)
  }

  return (
    <>
      {isLoading ? (
        <UilSpinnerAlt />
      ) : !weather || weather.length === 0 ? (
        <UilSpinnerAlt />
      ) : (
        <div className="info-side">
          <div className="week-container">
            <ul className="week-list">
              {weatherData.list.slice(0, 5).map((item, index) => {
                const date = new Date();
                date.setDate(date.getDate() + index);
                const dayOfWeek = days[date.getDay()];

                const maxTemp = tempMax[index];
                const minTemp = tempMin[index];
                return (
                  <li key={index} className={index === 0 ? "active" : ""}>
                    <div>
                      <img
                        src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                        alt={item.weather[0].description}
                      />
                    </div>
                    <span className="day-name">{dayOfWeek }</span>
                    <div>
                      <span className="day-temp"><UilArrowUp />{`${Math.floor(maxTemp)}°C`}</span>

                    </div>
                    <div>
                      <span className="day-temp"><UilArrowDown /> {`${Math.floor(minTemp)}°C`}</span>
                    </div>
                  </li>
                );
              })}
              <div className="clear"></div>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
export default WeeklyWeather
