'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { DeskKeyboard } from '@/components/desk/DeskKeyboard';
import { DeskMouse } from '@/components/desk/DeskMouse';
import { DeskToolbar } from '@/components/desk/DeskToolbar';
import { playSound } from '@/lib/sounds';

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
  const [notice, setNotice] = useState<string | null>(null);
  const [printing, setPrinting] = useState(false);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const composition = compositionRef.current;
    if (!composition) return;

    const resize = () => setScreenScale((composition.clientWidth * 0.35) / 800);
    const observer = new ResizeObserver(resize);
    observer.observe(composition);
    resize();
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => {
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
  }, []);

  const showNotice = (message: string) => {
    setNotice(message);
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(null), 1800);
  };

  const toggleRoomLight = () => {
    playSound('click');
    onToggleLamp();
    showNotice(lampOn ? 'Desk lamp switched off' : 'Desk lamp switched on');
  };

  return (
    <main className={`biz-room ${lampOn ? 'biz-room-lit' : 'biz-room-dark'}`}>
      <div ref={compositionRef} className="room-composition">
        <div className="room-art" aria-hidden />
        <div className="room-lighting" aria-hidden />

        <button
          type="button"
          className="room-hotspot hotspot-lamp"
          aria-label="Toggle desk lamp"
          title="Toggle desk lamp"
          onClick={toggleRoomLight}
        />
        <button
          type="button"
          className="room-hotspot hotspot-switch"
          aria-label="Toggle wall light switch"
          title="Light switch"
          onClick={toggleRoomLight}
        />
        <button
          type="button"
          className="room-hotspot hotspot-tower"
          aria-label="Press computer power button"
          title="Computer power"
          onClick={() => {
            playSound('click');
            const power = document.querySelector<HTMLButtonElement>('.pc-power-gate');
            if (power) {
              power.click();
              showNotice('BIZ-PC powering on');
            } else {
              showNotice('BIZ-PC is already running');
            }
          }}
        />
        <button
          type="button"
          className={`room-hotspot hotspot-printer ${printing ? 'hotspot-printing' : ''}`}
          aria-label="Print a test page"
          title="Print test page"
          onClick={() => {
            playSound('key');
            setPrinting(true);
            showNotice('Printing BIZ-PC test page...');
            setTimeout(() => setPrinting(false), 1600);
          }}
        />
        <div className="photo-keyboard">
          <DeskKeyboard onAnyKey={onDeskActivity} />
        </div>
        <div className="photo-mouse">
          <DeskMouse />
        </div>

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

        {notice ? <div className="room-notice">{notice}</div> : null}
      </div>

      <DeskToolbar lightsOn={lampOn} onToggleLights={onToggleLamp} />
      <div className="biz-room-vignette" aria-hidden />
    </main>
  );
}
