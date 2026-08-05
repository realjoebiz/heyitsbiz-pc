'use client';

import { useState } from 'react';
import { KEYBOARD_ROWS, keyIdToOutput, type KeyLabel } from '@/lib/keyboard-layout';
import { playSound } from '@/lib/sounds';
import { useDeskInputOptional } from '@/components/desk/DeskInputContext';

type DeskKeyboardProps = {
  onAnyKey?: () => void;
};

function renderLabel(label: KeyLabel) {
  if (typeof label === 'string') {
    return (
      <div>
        <span className="kb-single">{label}</span>
      </div>
    );
  }
  if ('small' in label) {
    return (
      <div>
        <span className="kb-small">{label.small}</span>
      </div>
    );
  }
  return (
    <div>
      <span className="kb-shifted">{label.top}</span>
      <span className="kb-main">{label.bottom}</span>
    </div>
  );
}

export function DeskKeyboard({ onAnyKey }: DeskKeyboardProps) {
  const deskInput = useDeskInputOptional();
  const [localPressed, setLocalPressed] = useState<string | null>(null);
  const [shift, setShift] = useState(false);
  const pressed = deskInput?.pressedDeskKey ?? localPressed;

  const flash = (id: string) => {
    deskInput?.flashDeskKey(id);
    setLocalPressed(id);
    window.setTimeout(() => setLocalPressed(null), 120);
  };

  const fire = (id: string) => {
    playSound('key');
    onAnyKey?.();
    flash(id);

    if (id === 'SHIFT' || id === 'RSHIFT') {
      setShift((s) => !s);
      return;
    }

    const out = keyIdToOutput(id, shift);
    if (out) deskInput?.sendKey(out);
  };

  return (
    <div className="keyboard-container">
      <div className="keyboard" role="group" aria-label="On-screen keyboard">
        {KEYBOARD_ROWS.map((row, ri) => (
          <div key={ri} className="keyboard-row">
            {row.map((key) => (
              <button
                key={key.id}
                type="button"
                data-code={key.code}
                className={[
                  'keyboard-key',
                  key.mod === 'function' ? 'keyboard-key-fn' : '',
                  key.mod === 'single' ? 'keyboard-key-single' : '',
                  key.hideMobile ? 'keyboard-key-hide-mobile' : '',
                  key.width ? `keyboard-key-${key.width}` : '',
                  pressed === key.id ? 'keyboard-key-pressed' : '',
                  (key.id === 'SHIFT' || key.id === 'RSHIFT') && shift ? 'keyboard-key-pressed' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => fire(key.id)}
              >
                {renderLabel(key.label)}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
