'use client';

import type { ReactNode } from 'react';

type MonitorSetupProps = {
  children: ReactNode;
};

export function MonitorSetup({ children }: MonitorSetupProps) {
  return (
    <div className="desk-scene min-h-screen overflow-hidden">
      <div className="desk-vignette pointer-events-none" aria-hidden />

      <div className="desk-stage">
        <div className="monitor-unit">
          <div className="monitor-bezel">
            <div className="monitor-brand">
              <span className="monitor-led" aria-hidden />
              <span>BIZVISION</span>
            </div>

            <div className="monitor-screen">
              <div className="monitor-scanlines pointer-events-none" aria-hidden />
              <div className="monitor-glass pointer-events-none" aria-hidden />
              {children}
            </div>

            <div className="monitor-chin">
              <span className="monitor-power">● PWR</span>
              <span className="monitor-model">Model 580 CRT</span>
            </div>
          </div>

          <div className="monitor-stand" aria-hidden>
            <div className="monitor-neck" />
            <div className="monitor-base" />
          </div>
        </div>

        <div className="desk-keyboard" aria-hidden>
          <div className="desk-keyboard-top" />
          <div className="desk-keyboard-keys" />
        </div>
      </div>
    </div>
  );
}
