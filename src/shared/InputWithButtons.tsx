import type { JSX } from 'react';

import { TextControlVM } from '@/viewmodels';
import { observer } from 'mobx-react-lite';

type ControlButton = {
  text: string;
  onClick: (vm: TextControlVM) => void;
  ariaLabel?: string;
};

interface InputWithButtonsProps {
  vm: TextControlVM;
  leftButtons?: ControlButton[];
  rightButtons?: ControlButton[];
  placeholder?: string;
}

export const InputWithButtons = observer(
  ({
    vm,
    leftButtons = [],
    rightButtons = [],
    placeholder = 'Введите текст...',
  }: InputWithButtonsProps): JSX.Element => {
    const renderBtn = (btn: ControlButton, idx: number): JSX.Element => (
      <button
        key={idx}
        type="button"
        onClick={() => btn.onClick(vm)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') btn.onClick(vm);
        }}
        tabIndex={0}
        aria-label={btn.ariaLabel ?? btn.text}
        className="px-3 py-2 text-sm rounded-md border bg-white hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {btn.text}
      </button>
    );

    return (
      <div className="w-full flex items-stretch gap-2">
        {leftButtons.length > 0 && (
          <div className="flex items-center gap-2">{leftButtons.map(renderBtn)}</div>
        )}

        <input
          value={vm.text}
          onChange={(e) => vm.setText(e.target.value)}
          placeholder={placeholder}
          className="flex-1 h-10 px-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Текстовый контрол"
        />

        {rightButtons.length > 0 && (
          <div className="flex items-center gap-2">{rightButtons.map(renderBtn)}</div>
        )}
      </div>
    );
  },
);
