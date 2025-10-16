export const getRandom = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export type Debounced<T extends (...args: unknown[]) => void> = ((
  ...args: Parameters<T>
) => void) & {
  cancel: () => void;
};

export function createDebounced<T extends (...args: unknown[]) => void>(
  fn: T,
  delayMs: number,
): Debounced<T> {
  let timerId: number | null = null;

  const debounced = ((...args: Parameters<T>) => {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
    timerId = window.setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delayMs);
  }) as Debounced<T>;

  debounced.cancel = () => {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  return debounced;
}
