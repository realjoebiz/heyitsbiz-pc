'use client';

import { playSound } from '@/lib/sounds';

export function DeskMouse() {
  return (
    <div className="desk-mouse-pad" aria-hidden>
      <div className="desk-mousemat">
        <span className="desk-mousemat-art">BIZ</span>
      </div>
      <button
        type="button"
        className="desk-mouse-unit"
        onClick={() => playSound('mouse')}
        aria-label="Ball mouse"
      >
        <span className="desk-mouse-top" />
        <span className="desk-mouse-buttons">
          <span className="desk-mouse-btn desk-mouse-btn-left" />
          <span className="desk-mouse-btn desk-mouse-btn-right" />
        </span>
        <span className="desk-mouse-ball" />
      </button>
    </div>
  );
}
