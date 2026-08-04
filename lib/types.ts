export type AppKind = 'iframe' | 'notepad' | 'calculator' | 'explorer' | 'about' | 'message';

export type ShortcutStatus = 'live' | 'soon' | 'system';

export type Shortcut = {
  id: string;
  label: string;
  iconId: string;
  kind: AppKind;
  href?: string;
  blurb: string;
  status: ShortcutStatus;
  defaultSize?: { w: number; h: number };
};

export type WindowRecord = {
  id: string;
  shortcutId: string;
  title: string;
  kind: AppKind;
  href?: string;
  message?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
};

export type IconPosition = { x: number; y: number };

export type WallpaperId = 'teal' | 'bliss' | 'night';

export type ContextMenuState = {
  x: number;
  y: number;
} | null;
