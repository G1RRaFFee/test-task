import { makeAutoObservable } from 'mobx';

export class TextControlVM {
  text: string = '';

  constructor(initialText: string = '') {
    this.text = initialText;
    makeAutoObservable(this);
  }

  setText = (value: string) => {
    this.text = value;
  };

  clear = () => {
    this.text = '';
  };

  setHello = () => {
    this.text = 'Hello world!';
  };

  isNumeric = (): boolean => {
    if (this.text.trim() === '') return false;
    return !isNaN(Number(this.text));
  };

  // Returns a number if current text is numeric, otherwise null
  parseNumber = (): number | null => {
    const trimmed = this.text.trim();
    if (trimmed === '') return null;
    const n = Number(trimmed);
    return Number.isNaN(n) ? null : n;
  };

  // Text for displaying to user (never empty)
  get displayText(): string {
    return this.text ? this.text : '(пусто)';
  }
}
