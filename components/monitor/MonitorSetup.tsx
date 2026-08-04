'use client';

import type { ReactNode } from 'react';
import { DeskKeyboard } from '@/components/desk/DeskKeyboard';
import { DeskProps } from '@/components/desk/DeskProps';

type MonitorSetupProps = {
  children: ReactNode;
  lampOn: boolean;
  onToggleLamp: () => void;
  onDeskActivity?: () => void;
};

export function MonitorSetup({ children, lampOn, onToggleLamp, onDeskActivity }: MonitorSetupProps) {
  return (
    <div className={`desk-scene min-h-screen overflow-x-hidden overflow-y-auto ${lampOn ? 'desk-scene-lit' : ''}`}>
      <div className="desk-vignette pointer-events-none" aria-hidden />
      <div className="desk-wood-grain pointer-events-none" aria-hidden />

      <div className="desk-stage">
        <DeskProps lampOn={lampOn} onToggleLamp={onToggleLamp} />

        <div className="monitor-unit">
          <div className="monitor-bezel">
            <div className="monitor-brand">
              <span className="monitor-led" aria-hidden />
              <span>BIZVISION</span>
              <span className="monitor-dial monitor-dial-left" aria-hidden />
              <span className="monitor-dial monitor-dial-right" aria-hidden />
            </div>

            <div className="monitor-screen">
              <div className="monitor-scanlines pointer-events-none" aria-hidden />
              <div className="monitor-glass pointer-events-none" aria-hidden />
              <div className="monitor-crt-curve pointer-events-none" aria-hidden />
              {children}
            </div>

            <div className="monitor-chin">
              <span className="monitor-power">● PWR</span>
              <span className="monitor-model">Model 580 CRT · Made in USA</span>
            </div>
          </div>

          <div className="monitor-stand" aria-hidden>
            <div className="monitor-neck" />
            <div className="monitor-base" />
          </div>
        </div>

        <DeskKeyboard onAnyKey={onDeskActivity} />
      </div>
    </div>
  );
}
