import type { Shortcut } from '@/lib/types';

export const SHORTCUTS: Shortcut[] = [
  {
    id: 'my-computer',
    label: 'My Computer',
    iconId: 'computer',
    kind: 'explorer',
    blurb: 'Browse the heyitsbiz lab drives.',
    status: 'system',
    defaultSize: { w: 420, h: 320 },
  },
  {
    id: 'radio',
    label: 'KWEST Radio',
    iconId: 'radio',
    kind: 'iframe',
    href: 'https://radio.heyitsbiz.com',
    blurb: 'Country radio by Biz — vintage cabinet stream player.',
    status: 'live',
    defaultSize: { w: 560, h: 640 },
  },
  {
    id: 'hub',
    label: 'heyitsbiz.com',
    iconId: 'globe',
    kind: 'iframe',
    href: 'https://heyitsbiz.com',
    blurb: 'Lab homepage — list of experiments and toys.',
    status: 'live',
    defaultSize: { w: 520, h: 480 },
  },
  {
    id: 'notepad',
    label: 'Notepad',
    iconId: 'notepad',
    kind: 'notepad',
    blurb: 'Scratch notes from the open road.',
    status: 'system',
    defaultSize: { w: 400, h: 300 },
  },
  {
    id: 'calculator',
    label: 'Calculator',
    iconId: 'calculator',
    kind: 'calculator',
    blurb: 'Crunch miles, gallons, and honky-tonk math.',
    status: 'system',
    defaultSize: { w: 240, h: 320 },
  },
  {
    id: 'irc',
    label: 'IRC Wire',
    iconId: 'chat',
    kind: 'message',
    blurb: 'Wild-west chat room — coming to the lab.',
    status: 'soon',
  },
  {
    id: 'geo',
    label: 'Geo Guess',
    iconId: 'map',
    kind: 'message',
    blurb: 'Map toys and place experiments.',
    status: 'soon',
  },
  {
    id: 'tv',
    label: 'Retro TV',
    iconId: 'tv',
    kind: 'message',
    blurb: 'Curated retro video channel.',
    status: 'soon',
  },
  {
    id: 'jukebox',
    label: 'Jukebox',
    iconId: 'music',
    kind: 'message',
    blurb: 'Vote for the next track on the road.',
    status: 'soon',
  },
  {
    id: 'recycle',
    label: 'Recycle Bin',
    iconId: 'recycle',
    kind: 'message',
    blurb: 'Nothing deleted yet. The trail is clean.',
    status: 'system',
  },
];

export const SITE = {
  computerName: 'BIZ-PC',
  userName: 'Biz',
  tagline: 'heyitsbiz internet lab',
  monitorBrand: 'BIZVISION',
};

export function getShortcut(id: string): Shortcut | undefined {
  return SHORTCUTS.find((s) => s.id === id);
}

export const DEFAULT_ICON_LAYOUT: Record<string, { x: number; y: number }> = {
  'my-computer': { x: 16, y: 16 },
  radio: { x: 16, y: 104 },
  hub: { x: 16, y: 192 },
  notepad: { x: 16, y: 280 },
  calculator: { x: 16, y: 368 },
  irc: { x: 112, y: 16 },
  geo: { x: 112, y: 104 },
  tv: { x: 112, y: 192 },
  jukebox: { x: 112, y: 280 },
  recycle: { x: 112, y: 368 },
};
