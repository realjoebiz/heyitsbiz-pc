'use client';

import type { Shortcut } from '@/lib/shortcuts';

type DesktopIconProps = {
  shortcut: Shortcut;
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
};

export function DesktopIcon({ shortcut, selected, onSelect, onOpen }: DesktopIconProps) {
  return (
    <button
      type="button"
      className={[
        'flex w-[5.5rem] flex-col items-center gap-1 rounded px-1 py-2 text-center',
        selected ? 'bg-[#000080]/55 outline outline-1 outline-dotted outline-white/90' : 'hover:bg-white/10',
      ].join(' ')}
      onClick={onSelect}
      onDoubleClick={onOpen}
    >
      <span className="text-3xl leading-none drop-shadow-[1px_1px_0_#000]" aria-hidden>
        {shortcut.icon}
      </span>
      <span className="max-w-full break-words font-win text-xs leading-tight text-white [text-shadow:1px_1px_0_#000]">
        {shortcut.label}
      </span>
    </button>
  );
}
