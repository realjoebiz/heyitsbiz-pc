'use client';

import type { Shortcut, WindowRecord } from '@/lib/types';
import { getShortcut } from '@/lib/shortcuts';

let zSeed = 10;

export function createWindow(shortcut: Shortcut, offset = 0): WindowRecord {
  const size = shortcut.defaultSize ?? { w: 420, h: 320 };
  zSeed += 1;

  return {
    id: `${shortcut.id}-${Date.now()}`,
    shortcutId: shortcut.id,
    title: shortcut.label,
    kind: shortcut.kind,
    href: shortcut.href,
    message: shortcut.blurb,
    x: 48 + offset * 24,
    y: 36 + offset * 24,
    w: size.w,
    h: size.h,
    minimized: false,
    maximized: false,
    zIndex: zSeed,
  };
}

export function focusWindow(windows: WindowRecord[], id: string): WindowRecord[] {
  zSeed += 1;
  return windows.map((w) => (w.id === id ? { ...w, zIndex: zSeed, minimized: false } : w));
}

export function openShortcutWindow(
  windows: WindowRecord[],
  shortcutId: string
): { windows: WindowRecord[]; opened?: WindowRecord } {
  const existing = windows.find((w) => w.shortcutId === shortcutId && !w.minimized);
  if (existing) {
    return { windows: focusWindow(windows, existing.id), opened: existing };
  }

  const shortcut = getShortcut(shortcutId);
  if (!shortcut) return { windows };

  if (shortcut.status === 'soon' || shortcut.kind === 'message') {
    const win = createWindow({ ...shortcut, kind: 'message' }, windows.length);
    return { windows: [...windows, win], opened: win };
  }

  const win = createWindow(shortcut, windows.length % 5);
  return { windows: [...focusWindow([...windows, win], win.id)], opened: win };
}
