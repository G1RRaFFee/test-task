import { useCallback, useMemo } from 'react';

import type { ButtonConfig } from '@/shared/ui';
import { AutocompleteVM, TextControlVM } from '@/viewmodels';

export const useMainContent = () => {
  const vmA = useMemo(() => new TextControlVM(''), []);
  const vmB = useMemo(() => new TextControlVM(''), []);

  const ac3 = useMemo(() => new AutocompleteVM(3), []);
  const ac10 = useMemo(() => new AutocompleteVM(10), []);

  const handleClearA = useCallback(() => vmA.clear(), [vmA]);
  const handleHelloA = useCallback(() => vmA.setHello(), [vmA]);

  const rightButtonsA: ButtonConfig<TextControlVM>[] = useMemo(
    () => [
      { text: 'Очистить', onClick: () => handleClearA(), ariaLabel: 'Очистить поле' },
      { text: 'Hello', onClick: () => handleHelloA(), ariaLabel: 'Вставить Hello world!' },
    ],
    [handleClearA, handleHelloA],
  );

  const handleCheckNumberB = useCallback(() => {
    const num = vmB.parseNumber();

    if (num === null) {
      alert('Введите число');
    } else {
      alert(String(num));
    }
  }, [vmB]);

  const handleShowTextB = useCallback(() => {
    alert(vmB.displayText);
  }, [vmB]);

  const leftButtonsB: ButtonConfig<TextControlVM>[] = useMemo(
    () => [{ text: 'Число?', onClick: () => handleCheckNumberB(), ariaLabel: 'Проверить число' }],
    [handleCheckNumberB],
  );

  const rightButtonsB: ButtonConfig<TextControlVM>[] = useMemo(
    () => [{ text: 'Показать', onClick: () => handleShowTextB(), ariaLabel: 'Показать текст' }],
    [handleShowTextB],
  );

  return { rightButtonsB, leftButtonsB, rightButtonsA, ac3, ac10, vmA, vmB };
};
