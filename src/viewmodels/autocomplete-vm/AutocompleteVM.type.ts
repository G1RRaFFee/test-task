import type { CountryInfo } from '@/services';

export interface IAutocompleteVM {
  query: string;
  suggestions: CountryInfo[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  maxSuggestions: number;
  setQuery(value: string): void;
  close(): void;
  open(): void;
  select(item: CountryInfo): void;
  fetchSuggestions(): Promise<void>;
}
