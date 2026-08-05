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
                <div className="monitor-top-depth" aria-hidden />
                <div className="monitor-left-depth" aria-hidden />
                <div className="monitor-right-depth" aria-hidden />
                <div className="monitor-brand">
                  <span>BIZVISION</span>
                  <small>Multiscan 98</small>
                </div>

                <div className="monitor-screen">
                  <div className="monitor-scanlines pointer-events-none" aria-hidden />
                  <div className="monitor-glass pointer-events-none" aria-hidden />
                  <div className="monitor-crt-curve pointer-events-none" aria-hidden />
                  {children}
                </div>

                <div className="monitor-chin">
                  <span className="monitor-model">DIGITAL COLOR DISPLAY</span>
                  <span className="monitor-controls" aria-hidden>● ◉ ◉</span>
                  <span className="monitor-power"><i className="monitor-led" /> PWR</span>
                </div>
              </div>

              <div className="monitor-stand" aria-hidden>
                <div className="monitor-neck" />
                <div className="monitor-base" />
              </div>
            </div>
          </div>
        </div>

        <div className="desk-horizon" aria-hidden />
        <div className="desk-surface" aria-hidden />
        <div className="pieter-input-deck">
          <DeskKeyboard onAnyKey={onDeskActivity} />
          <DeskMouse />
        </div>
      </div>
    </div>
  );
}
