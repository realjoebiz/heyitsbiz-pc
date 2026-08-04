'use client';

import { useState } from 'react';
import { playSound } from '@/lib/sounds';

type DeskPropsProps = {
  lampOn: boolean;
  onToggleLamp: () => void;
};

export function DeskProps({ lampOn, onToggleLamp }: DeskPropsProps) {
  const [floppyTip, setFloppyTip] = useState(false);
  const [mugTip, setMugTip] = useState(false);
  const [noteTip, setNoteTip] = useState(false);

  return (
    <>
      <div className={`desk-lamp-glow ${lampOn ? 'desk-lamp-glow-on' : ''}`} aria-hidden />

      <button
        type="button"
        className="desk-prop desk-lamp"
        onClick={() => {
          playSound('click');
          onToggleLamp();
        }}
        aria-label={lampOn ? 'Turn desk lamp off' : 'Turn desk lamp on'}
        title="Desk lamp"
      >
        <span className="desk-lamp-shade" />
        <span className="desk-lamp-arm" />
        <span className="desk-lamp-base" />
      </button>

      <button
        type="button"
        className="desk-prop desk-mouse"
        onClick={() => playSound('mouse')}
        aria-label="Ball mouse"
        title="PS/2 ball mouse — click!"
      >
        <span className="desk-mouse-body" />
        <span className="desk-mouse-ball" />
        <span className="desk-mouse-cord" />
      </button>

      <button
        type="button"
        className="desk-prop desk-floppy"
        onClick={() => {
          playSound('click');
          setFloppyTip((v) => !v);
        }}
        aria-label="Floppy disk"
      >
        <span className="desk-floppy-label">KWEST</span>
        {floppyTip ? (
          <span className="desk-prop-tooltip">KWEST Radio backup · 1.44 MB · 1998</span>
        ) : null}
      </button>

      <button
        type="button"
        className="desk-prop desk-mug"
        onClick={() => {
          playSound('click');
          setMugTip((v) => !v);
        }}
        aria-label="Coffee mug"
      >
        <span className="desk-mug-steam" aria-hidden />
        <span className="desk-mug-cup" />
        {mugTip ? <span className="desk-prop-tooltip">Cowboy coffee — still warm</span> : null}
      </button>

      <button
        type="button"
        className="desk-prop desk-sticky"
        onClick={() => {
          playSound('click');
          setNoteTip((v) => !v);
        }}
        aria-label="Sticky note"
      >
        <span>fix DNS</span>
        <span className="desk-sticky-sub">— Biz</span>
        {noteTip ? <span className="desk-prop-tooltip">heyitsbiz.com A records @ www pc</span> : null}
      </button>

      <div className="desk-prop desk-paper-stack" aria-hidden>
        <span />
        <span />
        <span />
      </div>

      <div className="desk-prop desk-pen-cup" aria-hidden>
        <span className="desk-pen desk-pen-red" />
        <span className="desk-pen desk-pen-blue" />
      </div>
    </>
  );
}
