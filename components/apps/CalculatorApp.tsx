'use client';

import { useState } from 'react';

export function CalculatorApp() {
  const [display, setDisplay] = useState('0');
  const [acc, setAcc] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);

  const press = (key: string) => {
    if (key >= '0' && key <= '9') {
      setDisplay((d) => (d === '0' ? key : d + key));
      return;
    }
    if (key === 'C') {
      setDisplay('0');
      setAcc(null);
      setOp(null);
      return;
    }
    if (key === '=' && acc !== null && op) {
      const cur = Number(display);
      let result = cur;
      if (op === '+') result = acc + cur;
      if (op === '-') result = acc - cur;
      if (op === '×') result = acc * cur;
      if (op === '÷') result = acc / cur;
      setDisplay(String(result));
      setAcc(null);
      setOp(null);
      return;
    }
    if (['+', '-', '×', '÷'].includes(key)) {
      setAcc(Number(display));
      setDisplay('0');
      setOp(key);
    }
  };

  const keys = ['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', 'C', '0', '=', '+'];

  return (
    <div className="flex h-full flex-col gap-2 bg-[#c0c0c0] p-2">
      <div className="win-inset bg-white px-2 py-1 text-right font-mono text-lg">{display}</div>
      <div className="grid flex-1 grid-cols-4 gap-1">
        {keys.map((k) => (
          <button key={k} type="button" className="win-btn text-sm" onClick={() => press(k)}>
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}
