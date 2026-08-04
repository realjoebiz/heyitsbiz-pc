'use client';

import { useState } from 'react';
import { playSound } from '@/lib/sounds';
import { useDeskInputOptional } from '@/components/desk/DeskInputContext';

const ROWS = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'"],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'],
];

type DeskKeyboardProps = {
  onAnyKey?: () => void;
};

export function DeskKeyboard({ onAnyKey }: DeskKeyboardProps) {
  const deskInput = useDeskInputOptional();
  const [pressed, setPressed] = useState<string | null>(null);
  const [shift, setShift] = useState(false);

  const fire = (raw: string) => {
    playSound('key');
    onAnyKey?.();
    setPressed(raw);
    window.setTimeout(() => setPressed(null), 120);

    let key = raw;
    if (raw === 'SHIFT') {
      setShift((s) => !s);
      return;
    }
    if (raw === 'BKSP') {
      deskInput?.sendKey('Backspace');
      return;
    }
    if (raw === 'ENTER') {
      deskInput?.sendKey('Enter');
      return;
    }
    if (raw === 'SPACE') {
      deskInput?.sendKey(' ');
      return;
    }
    if (shift && key.length === 1) key = key.toUpperCase();
    else if (!shift && key.length === 1) key = key.toLowerCase();
    deskInput?.sendKey(key);
  };

  return (
    <div className="desk-keyboard-unit">
      <div className="desk-keyboard-plate">
        <p className="desk-keyboard-label">Click keys to type into Notepad or Calculator</p>
        <div className="desk-keyboard-rows">
          {ROWS.map((row, ri) => (
            <div key={ri} className="desk-keyboard-row">
              {ri === 3 ? (
                <button
                  type="button"
                  className={`desk-key desk-key-wide ${shift ? 'desk-key-pressed' : ''}`}
                  onClick={() => fire('SHIFT')}
                >
                  Shift
                </button>
              ) : null}
              {row.map((k) => (
                <button
                  key={k}
                  type="button"
                  className={`desk-key ${pressed === k ? 'desk-key-pressed' : ''}`}
                  onClick={() => fire(k)}
                >
                  {k}
                </button>
              ))}
              {ri === 1 ? (
                <button
                  type="button"
                  className={`desk-key desk-key-wide ${pressed === 'BKSP' ? 'desk-key-pressed' : ''}`}
                  onClick={() => fire('BKSP')}
                >
                  Back
                </button>
              ) : null}
              {ri === 2 ? (
                <button
                  type="button"
                  className={`desk-key desk-key-tall ${pressed === 'ENTER' ? 'desk-key-pressed' : ''}`}
                  onClick={() => fire('ENTER')}
                >
                  Enter
                </button>
              ) : null}
            </div>
          ))}
          <div className="desk-keyboard-row">
            <button
              type="button"
              className={`desk-key desk-key-space ${pressed === 'SPACE' ? 'desk-key-pressed' : ''}`}
              onClick={() => fire('SPACE')}
            >
              space
            </button>
          </div>
        </div>
      </div>
      <div className="desk-keyboard-cable" aria-hidden />
    </div>
  );
}
