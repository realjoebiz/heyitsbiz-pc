'use client';

import { useCallback, useState } from 'react';
import { playSound } from '@/lib/sounds';

type DeskToolbarProps = {
  lightsOn: boolean;
  onToggleLights: () => void;
};

export function DeskToolbar({ lightsOn, onToggleLights }: DeskToolbarProps) {
  const [helpOpen, setHelpOpen] = useState(false);

  const goFullscreen = useCallback(() => {
    playSound('click');
    if (document.fullscreenElement) {
      void document.exitFullscreen();
      return;
    }
    void document.documentElement.requestFullscreen().catch(() => undefined);
  }, []);

  return (
    <div className="desk-toolbar">
      <button type="button" className="desk-toolbar-btn" onClick={goFullscreen}>
        Go fullscreen
      </button>
      <button
        type="button"
        className={`desk-toolbar-btn ${lightsOn ? '' : 'desk-toolbar-btn-active'}`}
        onClick={() => {
          playSound('click');
          onToggleLights();
        }}
      >
        {lightsOn ? 'Lights on' : 'Lights off'}
      </button>
      <button
        type="button"
        className="desk-toolbar-btn"
        onClick={() => {
          playSound('click');
          setHelpOpen((v) => !v);
        }}
      >
        ? Help
      </button>
      {helpOpen ? (
        <div className="desk-toolbar-help">
          <p>Open <strong>Notepad</strong> or <strong>Calculator</strong>, then type on your real keyboard.</p>
          <p>On-screen keys light up as you press them. Tap keys on mobile.</p>
        </div>
      ) : null}
    </div>
  );
}
