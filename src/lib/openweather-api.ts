import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

const API_KEY = '1806a8d49056881463f6a13fb77ab8cd';

const headers = {
  Accept: 'application/json',
};

export interface CountryInfoBrief {
  name: string;
  alpha3Code: string;
}

export interface WeatherInfo {
  weather: { id: number; main: string; description: string; icon: string }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  name: string;
}

export const getWeather = async (city: string, alpha3: string) => {
  const endpoint = 'weather';
  const params = {
    units: 'metric',
  };

  const url = new URL(endpoint, BASE_URL);
  const p = {
    ...params,
    q: `${city},${alpha3}`,
    appid: API_KEY,
  };
  const { data, status } = await axios.get<WeatherInfo>(url.href, { params: p, headers });

  if (status !== 200) {
    throw new Error(`${status}`);
  }

  return data;
};
