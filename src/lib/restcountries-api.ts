import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v2/';

const headers = {
  Accept: 'application/json',
};

export interface CountryInfoBrief {
  name: string;
  alpha3Code: string;
}

export interface CountryInfoDetailed {
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  capital: string;
  population: number;
  borders: string[];
  flags: { svg: string; png: string };
  flag: string;
}

export const getCountries = async () => {
  const endpoint = 'all';
  const fields = ['alpha3Code', 'name'];

  const url = new URL(endpoint, BASE_URL);
  url.searchParams.append('fields', fields.join(','));
  const { data, status } = await axios.get<CountryInfoBrief[]>(url.href, { headers });

  if (status !== 200) {
    throw new Error(`${status}`);
  }

  return data;
};

export const getCountryDetails = async (alpha3: string) => {
  const endpoint = 'alpha';

  const url = new URL(alpha3, new URL(endpoint, BASE_URL).href + '/');
  const { data, status } = await axios.get<CountryInfoDetailed>(url.href, { headers });

  if (status !== 200) {
    throw new Error(`${status}`);
  }

  return data;
};
