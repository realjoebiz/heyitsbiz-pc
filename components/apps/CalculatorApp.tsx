'use client';

import { useEffect, useRef, useState } from 'react';
import { useDeskInput } from '@/components/desk/DeskInputContext';

type CalcState = {
  display: string;
  acc: number | null;
  op: string | null;
};

function applyKey(
  key: string,
  state: CalcState,
  setDisplay: (v: string | ((d: string) => string)) => void,
  setAcc: (v: number | null) => void,
  setOp: (v: string | null) => void
) {
  if (key >= '0' && key <= '9') {
    setDisplay((d) => (d === '0' ? key : d + key));
    return;
  }
  if (key === 'C' || key === 'c') {
    setDisplay('0');
    setAcc(null);
    setOp(null);
    return;
  }
  if (key === '=') {
    if (state.acc === null || !state.op) return;
    const cur = Number(state.display);
    let result = cur;
    if (state.op === '+') result = state.acc + cur;
    if (state.op === '-') result = state.acc - cur;
    if (state.op === '×') result = state.acc * cur;
    if (state.op === '÷') result = state.acc / cur;
    setDisplay(String(result));
    setAcc(null);
    setOp(null);
    return;
  }
  if (['+', '-', '×', '÷'].includes(key)) {
    setAcc(Number(state.display));
    setDisplay('0');
    setOp(key);
  }
}

type CalculatorAppProps = {
  inputId: string;
};

export function CalculatorApp({ inputId }: CalculatorAppProps) {
  const { registerHandler, unregisterHandler } = useDeskInput();
  const [display, setDisplay] = useState('0');
  const [acc, setAcc] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const stateRef = useRef<CalcState>({ display, acc, op });
  stateRef.current = { display, acc, op };

  useEffect(() => {
    const handler = (key: string) =>
      applyKey(key, stateRef.current, setDisplay, setAcc, setOp);
    registerHandler(inputId, handler);
    return () => unregisterHandler(inputId);
  }, [inputId, registerHandler, unregisterHandler]);

  const keys = ['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', 'C', '0', '=', '+'];

  return (
    <div className="flex h-full flex-col gap-2 bg-[#c0c0c0] p-2">
      <div className="win-inset bg-white px-2 py-1 text-right font-mono text-lg">{display}</div>
      <div className="grid flex-1 grid-cols-4 gap-1">
        {keys.map((k) => (
          <button
            key={k}
            type="button"
            className="win-btn text-sm"
            onClick={() => applyKey(k, stateRef.current, setDisplay, setAcc, setOp)}
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}
