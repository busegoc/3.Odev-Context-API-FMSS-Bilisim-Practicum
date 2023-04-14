import './App.css';
import CurrentWeather from './components/CurrentWeather'
import Dropdown from './components/Dropdown';
import WeatherProvider from "./context/WeatherContext"

function App() {

  return (
    <div>
      <WeatherProvider>
        <Dropdown/>
        <CurrentWeather/>
      </WeatherProvider>

    </div>

  );
}

export default App;
