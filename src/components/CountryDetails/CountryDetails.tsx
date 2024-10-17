import { CountryInfoDetailed, WeatherInfo } from '../../types';
import { getCountryDetails } from '../../lib/restcountries-api';
import { getWeather } from '../../lib/openweather-api';
import numeral from 'numeral';
import { FC, useEffect, useState } from 'react';
import WeatherDetails from './WeatherDetails.tsx/WeatherDetails';

interface CountryDetailsProps {
  alpha3: string | null;
}

const CountryDetails: FC<CountryDetailsProps> = ({ alpha3 }) => {
  const [details, setDetails] = useState<CountryInfoDetailed>();
  const [neighborsDetails, setNeighborsDetails] = useState<CountryInfoDetailed[]>([]);
  const [capitalWeather, setCapitalWeather] = useState<WeatherInfo>();

  useEffect(() => {
    if (!alpha3) {
      return;
    }

    const fetchData = async () => {
      try {
        const data = await getCountryDetails(alpha3);
        setDetails(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [alpha3]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setNeighborsDetails([]);

        if (details?.borders) {
          const data = await Promise.all(details.borders.map((x) => getCountryDetails(x)));
          setNeighborsDetails(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [details]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCapitalWeather(undefined);

        if (details) {
          const data = await getWeather(details.capital, details.alpha3Code);
          setCapitalWeather(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [details]);

  return (
    <div>
      {!details ? (
        'Select a country first.'
      ) : (
        <div className='card'>
          <div className='row g-0 mb-3' style={{ height: '200px' }}>
            <div className='col-6'>
              <img src={details.flag} alt={details.name} style={{ width: '100%' }} />
            </div>
            <div className='col-6'>
              <div className='card-body'>
                <h3 className='card-title'>{details.name}</h3>
                <p className='card-text text-start'>
                  <h6 className='d-inline me-1 fw-bold'>Capital:</h6>
                  {details.capital}
                </p>
                <p className='card-text text-start'>
                  <h6 className='d-inline me-1 fw-bold'>Population:</h6>
                  {numeral(details.population).format('0.0a')}
                </p>
              </div>
            </div>
          </div>
          <div className='row g-0'>
            <div className='col text-start px-5 py-2 '>
              <h5>Weather:</h5>
              {capitalWeather && (
                <p className='card-text text-start'>
                  <WeatherDetails weather={capitalWeather} />
                </p>
              )}
            </div>
          </div>
          <div className='row g-0'>
            <div className='col text-start px-5 py-2'>
              <h5>Borders with:</h5>
              <ul>{!neighborsDetails.length ? 'No borders' : neighborsDetails.map((x) => <li key={x.alpha3Code}>{x.name}</li>)}</ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
