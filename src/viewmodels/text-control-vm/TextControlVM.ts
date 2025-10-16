import { makeAutoObservable } from 'mobx';

import type { ITextControlVM } from './textControlVM.type';

export class TextControlVM implements ITextControlVM {
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

  parseNumber = (): number | null => {
    const trimmed = this.text.trim();
    if (trimmed === '') return null;
    const n = Number(trimmed);
    return Number.isNaN(n) ? null : n;
  };

  get displayText(): string {
    return this.text ? this.text : '(пусто)';
  }
}
