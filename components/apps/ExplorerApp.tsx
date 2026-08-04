'use client';

import { SHORTCUTS } from '@/lib/shortcuts';
import { AppIcon } from '@/components/icons/AppIcon';

type ExplorerAppProps = {
  onOpen: (id: string) => void;
};

export function ExplorerApp({ onOpen }: ExplorerAppProps) {
  const items = SHORTCUTS.filter((s) => s.id !== 'my-computer' && s.id !== 'recycle');

  return (
    <div className="h-full bg-white p-2">
      <p className="mb-2 border-b border-[#808080] pb-1 text-xs text-[#808080]">C:\heyitsbiz\lab</p>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className="flex w-full flex-col items-center gap-1 rounded p-2 hover:bg-[#000080] hover:text-white"
              onDoubleClick={() => onOpen(item.id)}
              onClick={() => onOpen(item.id)}
            >
              <AppIcon id={item.iconId} size={28} />
              <span className="text-center text-xs">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
