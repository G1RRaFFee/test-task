import countries from '@/api/countries.api.json';
import { getRandom } from '@/lib';

import type { CountryInfo } from './api.types';

interface ICountryService {
  getCountryByName(countryName: string): Promise<CountryInfo[]>;
}

class CountryService implements ICountryService {
  public async getCountryByName(countryName: string): Promise<CountryInfo[]> {
    return new Promise((resolve) => {
      setTimeout(resolve, getRandom(100, 800));
    }).then(() => {
      if (typeof countryName !== 'string' || !countryName) {
        return [];
      }

      const searchText = countryName.toLocaleLowerCase();

      return countries.filter(
        (country) =>
          country.name.toLocaleLowerCase().startsWith(searchText) ||
          country.fullName.toLocaleLowerCase().startsWith(searchText),
      );
    });
  }
}

export const countryService: ICountryService = new CountryService();
