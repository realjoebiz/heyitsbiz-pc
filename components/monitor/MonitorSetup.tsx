'use client';

import type { ReactNode } from 'react';
import { DeskKeyboard } from '@/components/desk/DeskKeyboard';
import { DeskMouse } from '@/components/desk/DeskMouse';
import { DeskToolbar } from '@/components/desk/DeskToolbar';

type MonitorSetupProps = {
  children: ReactNode;
  lampOn: boolean;
  onToggleLamp: () => void;
  onDeskActivity?: () => void;
};

export function MonitorSetup({ children, lampOn, onToggleLamp, onDeskActivity }: MonitorSetupProps) {
  return (
    <div
      className={`desk-scene pieter-stage ${lampOn ? 'desk-scene-lit' : 'desk-scene-dark'}`}
    >
      <div className="desk-wall-texture" aria-hidden />
      <div className="desk-vignette pointer-events-none" aria-hidden />

      <DeskToolbar lightsOn={lampOn} onToggleLights={onToggleLamp} />

      <div className="pieter-workspace">
        <div className="pieter-monitor-zone">
          <div className="pieter-computer-rig">
            <div className="monitor-screen-glow" aria-hidden />
            <div className="monitor-unit">
              <div className="monitor-bezel">
                <div className="monitor-brand">
                  <span className="monitor-led" aria-hidden />
                  <span>BIZVISION</span>
                </div>

                <div className="monitor-screen">
                  <div className="monitor-scanlines pointer-events-none" aria-hidden />
                  <div className="monitor-glass pointer-events-none" aria-hidden />
                  <div className="monitor-crt-curve pointer-events-none" aria-hidden />
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
          </div>
        </div>

        <div className="pieter-input-deck">
          <DeskKeyboard onAnyKey={onDeskActivity} />
          <DeskMouse />
        </div>
      </div>
    </div>
  );
}
