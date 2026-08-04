'use client';

import { useEffect, useRef, useState } from 'react';
import { AppIcon } from '@/components/icons/AppIcon';
import { DEFAULT_ICON_LAYOUT, SHORTCUTS } from '@/lib/shortcuts';
import { loadIconPositions, saveIconPositions } from '@/lib/storage';
import type { IconPosition, WallpaperId } from '@/lib/types';
import { WALLPAPERS } from '@/lib/wallpapers';
import { playSound } from '@/lib/sounds';

type DesktopProps = {
  wallpaper: WallpaperId;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onOpen: (id: string) => void;
  onContextMenu: (x: number, y: number) => void;
  desktopRef: React.RefObject<HTMLDivElement>;
};

export function Desktop({
  wallpaper,
  selectedId,
  onSelect,
  onOpen,
  onContextMenu,
  desktopRef,
}: DesktopProps) {
  const [positions, setPositions] = useState<Record<string, IconPosition>>(DEFAULT_ICON_LAYOUT);
  const dragRef = useRef<{ id: string; ox: number; oy: number; px: number; py: number } | null>(null);
  const positionsRef = useRef(positions);
  positionsRef.current = positions;

  useEffect(() => {
    const saved = loadIconPositions();
    const merged = { ...DEFAULT_ICON_LAYOUT, ...saved };
    setPositions(merged);
    positionsRef.current = merged;
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.px;
      const dy = e.clientY - dragRef.current.py;
      setPositions((prev) => {
        const next = {
          ...prev,
          [dragRef.current!.id]: {
            x: Math.max(4, dragRef.current!.ox + dx),
            y: Math.max(4, dragRef.current!.oy + dy),
          },
        };
        positionsRef.current = next;
        return next;
      });
    };
    const onUp = () => {
      if (dragRef.current) {
        saveIconPositions(positionsRef.current);
        dragRef.current = null;
      }
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  const wp = WALLPAPERS[wallpaper];

  return (
    <div
      ref={desktopRef}
      className="desktop-area relative h-full overflow-hidden"
      style={{ background: wp.style }}
      onClick={() => onSelect(null)}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextMenu(e.clientX, e.clientY);
      }}
    >
      {SHORTCUTS.map((shortcut) => {
        const pos = positions[shortcut.id] ?? DEFAULT_ICON_LAYOUT[shortcut.id] ?? { x: 16, y: 16 };
        return (
          <button
            key={shortcut.id}
            type="button"
            className={[
              'desktop-icon absolute flex w-[4.5rem] flex-col items-center gap-0.5 p-1 text-center',
              selectedId === shortcut.id ? 'desktop-icon-selected' : '',
            ].join(' ')}
            style={{ left: pos.x, top: pos.y }}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(shortcut.id);
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              playSound('click');
              onOpen(shortcut.id);
            }}
            onPointerDown={(e) => {
              if (e.button !== 0) return;
              dragRef.current = {
                id: shortcut.id,
                ox: pos.x,
                oy: pos.y,
                px: e.clientX,
                py: e.clientY,
              };
            }}
          >
            <AppIcon id={shortcut.iconId} size={32} />
            <span className="desktop-icon-label font-win text-[11px] leading-tight text-white">
              {shortcut.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
