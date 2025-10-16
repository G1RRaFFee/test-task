import { createDebounced } from '@/lib';
import { type CountryInfo, countryService } from '@/services';
import { makeAutoObservable, runInAction } from 'mobx';

import { DEBOUNCE_TIME } from './autocomplete.constant';
import type { IAutocompleteVM } from './autocompleteVM.type';

export class AutocompleteVM implements IAutocompleteVM {
  query: string = '';
  suggestions: CountryInfo[] = [];
  isOpen: boolean = false;
  isLoading: boolean = false;
  error: string | null = null;
  maxSuggestions: number;
  private readonly debouncedFetch: () => void;

  constructor(maxSuggestions: number = 5) {
    this.maxSuggestions = maxSuggestions;
    makeAutoObservable(this);
    this.debouncedFetch = createDebounced(() => this.fetchSuggestions(), DEBOUNCE_TIME);
  }

  setQuery = (value: string) => {
    this.query = value;

    const query = value.trim();
    if (query.length === 0) {
      this.suggestions = [];
      this.isOpen = false;
      this.isLoading = false;
      this.error = null;
      return;
    }

    this.debouncedFetch();
  };

  close = () => {
    this.isOpen = false;
  };

  open = () => {
    this.isOpen = true;
  };

  select = (item: CountryInfo) => {
    this.query = item.name;
    this.close();
  };

  private normalize(items: CountryInfo[]): CountryInfo[] {
    const map = new Map<string, CountryInfo>();
    for (const it of items) {
      const key = it.name.trim().toLowerCase();
      if (!map.has(key)) {
        map.set(key, {
          name: it.name?.toString() ?? '',
          fullName: it.fullName?.toString() ?? '',
          flag: it.flag?.toString() ?? '',
        });
      }
    }
    return Array.from(map.values());
  }

  fetchSuggestions = async () => {
    const q = this.query.trim();
    if (q.length === 0) {
      runInAction(() => {
        this.suggestions = [];
        this.isOpen = false;
        this.isLoading = false;
        this.error = null;
      });
      return;
    }

    this.isLoading = true;
    this.error = null;
    try {
      const data = await countryService.getCountryByName(q);
      const normalized = this.normalize(data).slice(0, this.maxSuggestions);
      runInAction(() => {
        this.suggestions = normalized;
        this.isOpen = normalized.length > 0;
        this.isLoading = false;
      });
    } catch (error: unknown) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Ошибка загрузки';
        this.suggestions = [];
        this.isOpen = false;
        this.isLoading = false;
      });
    }
  };
}
