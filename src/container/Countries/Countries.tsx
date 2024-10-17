import { CountryInfoBrief } from '../../types.d';
import { useCallback, useEffect, useState } from 'react';
import CountriesList from '../../components/CountriesList/CountriesList';
import CountryDetails from '../../components/CountryDetails/CountryDetails';
import { getCountries } from '../../lib/restcountries-api';
import Preloader from '../../components/Preloader/Preloader';

export const Countries = () => {
  const [countries, setCountries] = useState<CountryInfoBrief[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [operationsPending, setOperationsPending] = useState(0);

  const increaseOperationsPending = useCallback(() => setOperationsPending((count) => count + 1), []);

  const decreaseOperationsPending = useCallback(() => setOperationsPending((count) => count - 1), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        increaseOperationsPending();

        const data = await getCountries();
        setCountries(data);
      } catch (err) {
        console.error(err);
      } finally {
        decreaseOperationsPending();
      }
    };

    fetchData();
  }, [increaseOperationsPending, decreaseOperationsPending]);

  return (
    <>
      <div className='row row-cols-2'>
        <div className='col'>
          <CountriesList
            countries={countries}
            onChange={(alpha3: string) => setSelectedCountry(alpha3)}
            onLoading={increaseOperationsPending}
            onLoaded={decreaseOperationsPending}
          />
        </div>
        <div className='col'>
          <CountryDetails alpha3={selectedCountry} onLoading={increaseOperationsPending} onLoaded={decreaseOperationsPending} />
        </div>
      </div>
      {operationsPending > 0 ? <Preloader /> : null}
    </>
  );
};
