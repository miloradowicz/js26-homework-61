import { CountryInfoBrief } from '../../types.d';
import { useEffect, useState } from 'react';
import CountriesList from '../../components/CountriesList/CountriesList';
import CountryDetails from '../../components/CountryDetails/CountryDetails';
import { getCountries } from '../../lib/restcountries-api';

export const Countries = () => {
  const [countries, setCountries] = useState<CountryInfoBrief[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCountries();
        setCountries(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='row row-cols-2'>
      <div className='col'>
        <CountriesList countries={countries} onChange={(alpha3: string) => setSelectedCountry(alpha3)} />
      </div>
      <div className='col'>
        <CountryDetails alpha3={selectedCountry} />
      </div>
    </div>
  );
};
