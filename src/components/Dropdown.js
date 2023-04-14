import { UilSpinnerAlt } from "@iconscout/react-unicons";
import React, { useContext, useEffect, useState } from 'react';
import { WeatherContext } from '../context/WeatherContext';
const WeatherByCity = () => {
  const { weather, handleCityChange, selectedCity, cities } = useContext(WeatherContext)
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false)

  }, [selectedCity])
console.log(selectedCity);
  return (
    <>
      {isLoading ? (
          <UilSpinnerAlt />
        ) : !weather || weather.length === 0 ? (
          <UilSpinnerAlt />
        ) : (
      <div className="selectoption">

        <select  className="form-select" aria-label="Default select example" value={selectedCity} onChange={handleCityChange}>
          <option  value={selectedCity.id} key={selectedCity.id}>{selectedCity.name}</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      )}
    </>
  );
};

export default WeatherByCity;


