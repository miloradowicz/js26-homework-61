import { WeatherInfo } from '../../../types.d';
import { FC } from 'react';
import './WeatherDetails.css';

const dir = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

interface WeatherDetailsProps {
  weather: WeatherInfo;
}

const WeatherDetails: FC<WeatherDetailsProps> = ({ weather }) => {
  return (
    <>
      <span className='p-1'>
        {weather.weather.map((x) => (
          <span key={x.id} className='weather-description' style={{ backgroundImage: `url(https://openweathermap.org/img/wn/${x.icon}.png)` }}>
            {x.description}
          </span>
        ))}
      </span>
      <span className='p-1'>{weather.main.temp}°</span>
      <span className='p-1'>
        <span className='me-1'>Wind:</span>
        {dir[Math.round((weather.wind.deg * 16) / 360) % 16]} {weather.wind.speed}
      </span>
    </>
  );
};

export default WeatherDetails;
