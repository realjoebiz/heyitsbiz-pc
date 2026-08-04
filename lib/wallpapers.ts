import type { WallpaperId } from '@/lib/types';

export const WALLPAPERS: Record<
  WallpaperId,
  { label: string; style: string }
> = {
  teal: {
    label: 'Classic Teal',
    style: '#008080',
  },
  bliss: {
    label: 'Open Road',
    style:
      'linear-gradient(180deg, #6eb5ff 0%, #8ec8ff 38%, #4a8f3c 38%, #3d7a32 62%, #2d5c24 100%)',
  },
  night: {
    label: 'Night Drive',
    style:
      'radial-gradient(ellipse at 50% 20%, #1a2848 0%, #0a0e18 45%, #050810 100%)',
  },
};

export const WALLPAPER_ORDER: WallpaperId[] = ['teal', 'bliss', 'night'];

export function nextWallpaper(current: WallpaperId): WallpaperId {
  const idx = WALLPAPER_ORDER.indexOf(current);
  return WALLPAPER_ORDER[(idx + 1) % WALLPAPER_ORDER.length];
}
