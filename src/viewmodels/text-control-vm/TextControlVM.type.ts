export interface ITextControlVM {
  text: string;
  readonly displayText: string;
  setText(value: string): void;
  clear(): void;
  setHello(): void;
  isNumeric(): boolean;
  parseNumber(): number | null;
}
