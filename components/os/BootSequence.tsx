'use client';

import { useEffect, useState } from 'react';
import { playSound, playWin98Startup } from '@/lib/sounds';

type BootSequenceProps = {
  onDone: () => void;
};

export function BootSequence({ onDone }: BootSequenceProps) {
  const [phase, setPhase] = useState(0);
  const [memory, setMemory] = useState(0);

  useEffect(() => {
    const memoryTimer = window.setInterval(() => {
      setMemory((value) => Math.min(65536, value + 4096));
    }, 55);
    const timers = [
      setTimeout(() => playSound('bios'), 320),
      setTimeout(() => setPhase(1), 2800),
      setTimeout(() => {
        setPhase(2);
        playWin98Startup();
      }, 4100),
      setTimeout(() => onDone(), 7800),
    ];
    return () => {
      window.clearInterval(memoryTimer);
      timers.forEach(clearTimeout);
    };
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
        <div className="bios-post">
          <div className="bios-energy-star" aria-hidden>
            <span>★</span>
            <b>Energy</b>
          </div>
          <p>Award Modular BIOS v4.51PG, An Energy Star Ally</p>
          <p>Copyright (C) 1984-98, BIZVISION Software, Inc.</p>
          <br />
          <p>BIZ-486DX2 PCIset(TM)</p>
          <p>PENTIUM-S CPU at 75MHz</p>
          <p>Memory Test : {memory.toString().padStart(5, '0')}K OK</p>
          <br />
          <p>Detecting IDE Primary Master ... BIZ Quantum 850MB</p>
          <p>Detecting IDE Primary Slave&nbsp;&nbsp; ... CD-ROM 24X</p>
          <p className="bios-bottom">Press DEL to enter SETUP, ESC to skip memory test</p>
        </div>
      ) : null}
      {phase === 1 ? (
        <div className="bios-disk-check">
          <p>Verifying DMI Pool Data ........</p>
          <p>Boot from ATAPI CD-ROM : Failure</p>
          <p>Starting Windows 98...</p>
        </div>
      ) : null}
      {phase === 2 ? (
        <div className="windows-boot">
          <div className="windows-flag" aria-hidden>
            <i /><i /><i /><i />
          </div>
          <p className="windows-wordmark"><small>Microsoft</small> Windows <b>98</b></p>
          <p className="windows-subtitle">Getting you connected to the BIZ internet...</p>
          <div className="windows-loader"><span /></div>
        </div>
      ) : null}
      <p className="boot-skip">Press any key or click to skip</p>
    </button>
  );
}
