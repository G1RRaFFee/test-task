import type { JSX } from 'react';

import { useKeyboardNavigation } from '@/hooks';
import type { CountryInfo } from '@/services/api-service/api.types';
import { AutocompleteVM } from '@/viewmodels/AutocompleteVM';
import { observer } from 'mobx-react-lite';

type AutocompleteProps = {
  vm: AutocompleteVM;
  label?: string;
  placeholder?: string;
};

export const Autocomplete = observer(
  ({ vm, label, placeholder = 'Страна...' }: AutocompleteProps): JSX.Element => {
    const { selectedIndex, setSelectedIndex, listRef, handleKeyDown } =
      useKeyboardNavigation<CountryInfo>({
        items: vm.suggestions,
        onSelect: (item) => {
          vm.select(item);
          setSelectedIndex(-1);
        },
      });

    return (
      <div className="w-full">
        {label && <label className="block mb-1 text-sm text-gray-700">{label}</label>}
        <div className="relative">
          <input
            value={vm.query}
            onChange={(e) => vm.setQuery(e.target.value)}
            onFocus={vm.open}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-autocomplete="list"
            aria-expanded={vm.isOpen}
            aria-controls="autocomplete-list"
            className="w-full h-10 px-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {vm.isLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
              Загрузка…
            </div>
          )}

          {vm.isOpen && vm.suggestions.length > 0 && (
            <ul
              id="autocomplete-list"
              ref={listRef}
              role="listbox"
              tabIndex={0}
              className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md border bg-white shadow"
            >
              {vm.suggestions.map((s, idx) => (
                <li
                  key={s.name + idx}
                  role="option"
                  aria-selected={false}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    vm.select(s);
                  }}
                  className={`list-item ${idx === selectedIndex ? 'bg-gray-100' : ''} px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-50 focus:bg-gray-100`}
                >
                  {s.flag && (
                    <img src={s.flag} alt="" className="w-6 h-4 object-cover rounded-sm" />
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm">{s.name}</span>
                    {s.fullName && <span className="text-xs text-gray-500">{s.fullName}</span>}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {vm.error && (
            <div className="mt-1 text-sm text-red-600" role="alert">
              {vm.error}
            </div>
          )}
        </div>
      </div>
    );
  },
);
