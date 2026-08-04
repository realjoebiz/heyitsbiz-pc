'use client';

import { useEffect, useState } from 'react';
import { playWin98Startup } from '@/lib/sounds';

type BootSequenceProps = {
  onDone: () => void;
};

export function BootSequence({ onDone }: BootSequenceProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 700),
      setTimeout(() => {
        setPhase(2);
        playWin98Startup();
      }, 1800),
      setTimeout(() => onDone(), 4800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  const skip = () => {
    playWin98Startup();
    onDone();
  };

  return (
    <button
      type="button"
      className="boot-screen absolute inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-black font-win text-white"
      onClick={skip}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') skip();
      }}
      aria-label="Skip boot sequence"
    >
      {phase === 0 ? (
        <div className="text-center">
          <p className="text-sm tracking-widest text-[#a0a0a0]">BIZVISION BIOS 4.2</p>
          <p className="mt-3 text-[10px] text-[#505050]">Copyright (C) 1981-1998, BIZVISION Corp.</p>
        </div>
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
