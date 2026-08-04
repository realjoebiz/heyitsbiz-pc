import type { IconPosition, WallpaperId } from '@/lib/types';

const KEYS = {
  icons: 'bizpc-icon-positions',
  wallpaper: 'bizpc-wallpaper',
  mute: 'bizpc-mute',
  booted: 'bizpc-skip-boot',
} as const;

export function loadIconPositions(): Record<string, IconPosition> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(KEYS.icons);
    return raw ? (JSON.parse(raw) as Record<string, IconPosition>) : {};
  } catch {
    return {};
  }
}

export function saveIconPositions(positions: Record<string, IconPosition>) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEYS.icons, JSON.stringify(positions));
  } catch {
    // ignore
  }
}

export function loadWallpaper(): WallpaperId {
  if (typeof window === 'undefined') return 'bliss';
  const raw = localStorage.getItem(KEYS.wallpaper);
  if (raw === 'teal' || raw === 'bliss' || raw === 'night') return raw;
  return 'bliss';
}

export function saveWallpaper(id: WallpaperId) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEYS.wallpaper, id);
}

export function loadMuted(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(KEYS.mute) === '1';
}

export function saveMuted(muted: boolean) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEYS.mute, muted ? '1' : '0');
}

export function shouldSkipBoot(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(KEYS.booted) === '1';
}

export function markBooted() {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(KEYS.booted, '1');
}
