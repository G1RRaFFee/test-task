import { type KeyboardEvent, useEffect, useRef, useState } from 'react';

interface UseKeyboardNavigationProps<T> {
  items: T[];
  onSelect: (item: T) => void;
}

export const useKeyboardNavigation = <T>({ items, onSelect }: UseKeyboardNavigationProps<T>) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const listRef = useRef<HTMLUListElement>(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex((previousIndex) =>
          previousIndex < items.length - 1 ? previousIndex + 1 : 0,
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex((previousIndex) =>
          previousIndex > 0 ? previousIndex - 1 : items.length - 1,
        );
        break;
      case 'Enter':
        event.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          onSelect(items[selectedIndex]);
        }
        break;
      case 'Escape':
        setSelectedIndex(-1);
        break;
    }
  };

  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex] as HTMLElement;
      selectedElement?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  return {
    selectedIndex,
    setSelectedIndex,
    listRef,
    handleKeyDown,
  };
};
