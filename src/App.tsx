import { type JSX, useMemo } from 'react';

import { Autocomplete, InputWithButtons } from '@/shared';
import { AutocompleteVM, TextControlVM } from '@/viewmodels';

const App = (): JSX.Element => {
  const vmA = useMemo(() => new TextControlVM(''), []);
  const vmB = useMemo(() => new TextControlVM(''), []);

  const ac3 = useMemo(() => new AutocompleteVM(3), []);
  const ac10 = useMemo(() => new AutocompleteVM(10), []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl p-6 space-y-8">
        <header className="pt-4">
          <h1 className="text-2xl font-semibold">Тестовое задание</h1>
          <p className="text-gray-600">Контролы с кнопками и автокомплит (MobX + MVVM)</p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-medium">Контрол с кнопками</h2>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700">Два справа</h3>
            <InputWithButtons
              vm={vmA}
              rightButtons={[
                { text: 'Очистить', onClick: (vm) => vm.clear(), ariaLabel: 'Очистить поле' },
                {
                  text: 'Hello',
                  onClick: (vm) => vm.setHello(),
                  ariaLabel: 'Вставить Hello world!',
                },
              ]}
              placeholder="Введите любой текст…"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700">Одна слева, одна справа</h3>
            <InputWithButtons
              vm={vmB}
              leftButtons={[
                {
                  text: 'Число?',
                  onClick: (vm) => {
                    const num = vm.parseNumber();
                    if (num === null) {
                      alert('Введите число');
                    } else {
                      alert(num);
                    }
                  },
                  ariaLabel: 'Проверить число',
                },
              ]}
              rightButtons={[
                {
                  text: 'Показать',
                  onClick: (vm) => alert(vm.displayText),
                  ariaLabel: 'Показать текст',
                },
              ]}
              placeholder="Попробуйте ввести число…"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-medium">Контрол-автокомплит</h2>
          <div className="space-y-4">
            <Autocomplete vm={ac3} label="Автокомплит (макс. 3 подсказки)" />
            <Autocomplete vm={ac10} label="Автокомплит (макс. 10 подсказок)" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
