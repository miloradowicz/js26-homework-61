import { CountryInfoBrief } from '../../types.d';
import { FC } from 'react';

interface CountriesListProps {
  countries: CountryInfoBrief[];
  onChange: (_: string) => void;
}

const CountriesList: FC<CountriesListProps> = ({ countries, onChange }) => {
  return (
    <div>
      <select title='Country:' className='form-select' name='country' onChange={(e) => onChange(e.target.value)} defaultValue='Select a country...' size={30}>
        {countries.map((x) => (
          <option key={x.alpha3Code} value={x.alpha3Code}>
            {x.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountriesList;
