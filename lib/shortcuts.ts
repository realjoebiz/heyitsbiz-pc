export type Shortcut = {
  id: string;
  label: string;
  icon: string;
  href?: string;
  blurb: string;
  status: 'live' | 'soon';
};

export const SHORTCUTS: Shortcut[] = [
  {
    id: 'radio',
    label: 'KWEST Radio',
    icon: '📻',
    href: 'https://radio.heyitsbiz.com',
    blurb: 'Country radio by Biz — vintage cabinet stream player.',
    status: 'live',
  },
  {
    id: 'hub',
    label: 'heyitsbiz.com',
    icon: '🌐',
    href: 'https://heyitsbiz.com',
    blurb: 'Lab homepage — list of experiments and toys.',
    status: 'live',
  },
  {
    id: 'irc',
    label: 'IRC Wire',
    icon: '💬',
    blurb: 'Wild-west chat room — coming to the lab.',
    status: 'soon',
  },
  {
    id: 'geo',
    label: 'Geo Guess',
    icon: '🗺️',
    blurb: 'Map toys and place experiments.',
    status: 'soon',
  },
  {
    id: 'tv',
    label: 'Retro TV',
    icon: '📺',
    blurb: 'Curated retro video channel.',
    status: 'soon',
  },
  {
    id: 'jukebox',
    label: 'Jukebox',
    icon: '🎵',
    blurb: 'Vote for the next track on the road.',
    status: 'soon',
  },
];

export const SITE = {
  computerName: 'BIZ-PC',
  userName: 'Biz',
  tagline: 'heyitsbiz internet lab',
};
