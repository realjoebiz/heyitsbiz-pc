'use client';

import { useEffect, useState } from 'react';
import { playSound } from '@/lib/sounds';

type BootSequenceProps = {
  onDone: () => void;
};

export function BootSequence({ onDone }: BootSequenceProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 700),
      setTimeout(() => setPhase(2), 1800),
      setTimeout(() => {
        playSound('startup');
        onDone();
      }, 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  const skip = () => {
    playSound('startup');
    onDone();
  };

  return (
    <button
      type="button"
      className="boot-screen absolute inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-black font-win text-white"
      onClick={skip}
      onKeyDown={(e) => e.key === 'Enter' && skip()}
      aria-label="Skip boot sequence"
    >
      {phase === 0 ? (
        <p className="text-sm tracking-widest text-[#a0a0a0]">BIZVISION BIOS 4.2</p>
      ) : null}
      {phase >= 1 ? (
        <div className="mt-6 text-center">
          <p className="text-xl font-bold">Microsoft Windows 98</p>
          <p className="mt-4 animate-pulse text-sm text-[#c0c0c0]">
            Starting Windows<span className="boot-dots" />
          </p>
        </div>
      ) : null}
      {phase >= 2 ? (
        <div className="boot-bar mt-8 h-4 w-48 border border-[#808080] bg-[#000080] p-[2px]">
          <div className="boot-bar-fill h-full bg-[#c0c0c0]" />
        </div>
      ) : null}
      <p className="absolute bottom-4 text-[10px] text-[#606060]">Press any key or click to skip</p>
    </button>
  );
}
