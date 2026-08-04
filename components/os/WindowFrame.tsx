'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { WindowRecord } from '@/lib/types';
import { playSound } from '@/lib/sounds';

type WindowFrameProps = {
  window: WindowRecord;
  active: boolean;
  desktopRect: DOMRect | null;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onMove: (x: number, y: number) => void;
  children: ReactNode;
  popOutHref?: string;
};

export function WindowFrame({
  window: win,
  active,
  desktopRect,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onMove,
  children,
  popOutHref,
}: WindowFrameProps) {
  const dragRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

  useEffect(() => {
    const onMoveEvt = (e: PointerEvent) => {
      if (!dragRef.current || !desktopRect) return;
      const dx = e.clientX - dragRef.current.x;
      const dy = e.clientY - dragRef.current.y;
      onMove(
        Math.max(0, dragRef.current.ox + dx),
        Math.max(0, dragRef.current.oy + dy)
      );
    };
    const onUp = () => {
      dragRef.current = null;
    };
    window.addEventListener('pointermove', onMoveEvt);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMoveEvt);
      window.removeEventListener('pointerup', onUp);
    };
  }, [desktopRect, onMove]);

  if (win.minimized) return null;

  const style = win.maximized
    ? { left: 0, top: 0, width: '100%', height: 'calc(100% - 40px)', zIndex: win.zIndex }
    : {
        left: win.x,
        top: win.y,
        width: win.w,
        height: win.h,
        zIndex: win.zIndex,
      };

  return (
    <div
      className={`win-window absolute flex flex-col ${active ? 'win-window-active' : ''}`}
      style={style}
      onMouseDown={onFocus}
    >
      <div
        className={`win-titlebar flex shrink-0 items-center justify-between ${active ? 'win-titlebar-active' : 'win-titlebar-inactive'}`}
        onPointerDown={(e) => {
          if (win.maximized) return;
          onFocus();
          dragRef.current = { x: e.clientX, y: e.clientY, ox: win.x, oy: win.y };
        }}
      >
        <span className="truncate px-1 text-xs font-bold">{win.title}</span>
        <div className="flex shrink-0 gap-[2px] pr-[2px]">
          {popOutHref ? (
            <a
              href={popOutHref}
              target="_blank"
              rel="noopener noreferrer"
              className="win-caption-btn text-[10px]"
              title="Open in browser"
              onClick={(e) => e.stopPropagation()}
            >
              ↗
            </a>
          ) : null}
          <button type="button" className="win-caption-btn" onClick={onMinimize} aria-label="Minimize">
            _
          </button>
          <button type="button" className="win-caption-btn" onClick={onToggleMaximize} aria-label="Maximize">
            □
          </button>
          <button
            type="button"
            className="win-caption-btn win-caption-close"
            onClick={() => {
              playSound('click');
              onClose();
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      </div>
      <div className="win-client min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
