export interface ButtonConfig<TVm> {
  text: string;
  onClick: (vm?: TVm) => void;
  ariaLabel?: string;
}
