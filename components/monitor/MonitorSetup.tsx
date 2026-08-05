'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { DeskToolbar } from '@/components/desk/DeskToolbar';

type MonitorSetupProps = {
  children: ReactNode;
  lampOn: boolean;
  onToggleLamp: () => void;
  onDeskActivity?: () => void;
};

export function MonitorSetup({
  children,
  lampOn,
  onToggleLamp,
  onDeskActivity,
}: MonitorSetupProps) {
  const compositionRef = useRef<HTMLDivElement>(null);
  const [screenScale, setScreenScale] = useState(1);

  useEffect(() => {
    const composition = compositionRef.current;
    if (!composition) return;

    const resize = () => setScreenScale((composition.clientWidth * 0.35) / 800);
    const observer = new ResizeObserver(resize);
    observer.observe(composition);
    resize();
    return () => observer.disconnect();
  }, []);

  return (
    <main className={`biz-room ${lampOn ? 'biz-room-lit' : 'biz-room-dark'}`}>
      <div ref={compositionRef} className="room-composition">
        <div className="room-art" aria-hidden />
        <section
          className="fixed-crt-screen"
          aria-label="Interactive BIZ-PC screen"
          onPointerDown={onDeskActivity}
        >
          <div
            className="fixed-crt-content"
            style={{ transform: `scale(${screenScale})` }}
          >
            {children}
          </div>
          <div className="crt-screen-glass" aria-hidden />
        </section>
      </div>

      <DeskToolbar lightsOn={lampOn} onToggleLights={onToggleLamp} />
      <div className="room-lighting" aria-hidden />
      <div className="biz-room-vignette" aria-hidden />
    </main>
  );
}
