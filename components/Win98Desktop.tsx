'use client';

import { useCallback, useEffect, useState } from 'react';
import { DesktopIcon } from '@/components/DesktopIcon';
import { MessageBox } from '@/components/MessageBox';
import { TaskbarClock } from '@/components/TaskbarClock';
import { SHORTCUTS, SITE, type Shortcut } from '@/lib/shortcuts';

export function Win98Desktop() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [startOpen, setStartOpen] = useState(false);
  const [dialog, setDialog] = useState<Shortcut | null>(null);

  const openShortcut = useCallback((shortcut: Shortcut) => {
    if (shortcut.status === 'live' && shortcut.href) {
      window.open(shortcut.href, '_blank', 'noopener,noreferrer');
      return;
    }
    setDialog(shortcut);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setStartOpen(false);
        setDialog(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="flex min-h-screen flex-col font-win">
      <div
        className="relative flex-1 bg-win-teal p-3 sm:p-4"
        onClick={() => setSelectedId(null)}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className="pointer-events-none absolute inset-x-0 top-3 text-center text-[11px] text-white/70 sm:top-4">
          {SITE.tagline}
        </div>

        <div
          className="relative z-10 grid grid-cols-3 gap-1 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
          onClick={(e) => e.stopPropagation()}
        >
          {SHORTCUTS.map((shortcut) => (
            <DesktopIcon
              key={shortcut.id}
              shortcut={shortcut}
              selected={selectedId === shortcut.id}
              onSelect={() => setSelectedId(shortcut.id)}
              onOpen={() => openShortcut(shortcut)}
            />
          ))}
        </div>

        {dialog ? <MessageBox shortcut={dialog} onClose={() => setDialog(null)} /> : null}
      </div>

      <footer className="relative z-20 flex h-10 items-center gap-2 border-t-2 border-win-light bg-win-face px-1 shadow-outset">
        <div className="relative">
          <button
            type="button"
            className={[
              'flex items-center gap-1 border border-win-light px-2 py-0.5 text-sm font-bold shadow-outset active:shadow-inset',
              startOpen ? 'shadow-inset' : '',
            ].join(' ')}
            onClick={() => setStartOpen((v) => !v)}
            aria-expanded={startOpen}
          >
            <span className="text-base leading-none" aria-hidden>
              🪟
            </span>
            Start
          </button>

          {startOpen ? (
            <div className="absolute bottom-full left-0 mb-1 w-56 border-2 border-win-light bg-win-face shadow-outset">
              <div className="flex">
                <div className="flex w-7 shrink-0 items-end bg-gradient-to-t from-[#000080] to-[#1084d0] p-1">
                  <span className="rotate-180 text-[10px] font-bold tracking-widest text-white [writing-mode:vertical-rl]">
                    Windows<span className="font-normal">98</span>
                  </span>
                </div>
                <ul className="flex-1 py-1">
                  {SHORTCUTS.map((shortcut) => (
                    <li key={shortcut.id}>
                      <button
                        type="button"
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm hover:bg-[#000080] hover:text-white"
                        onClick={() => {
                          setStartOpen(false);
                          openShortcut(shortcut);
                        }}
                      >
                        <span aria-hidden>{shortcut.icon}</span>
                        {shortcut.label}
                        {shortcut.status === 'soon' ? (
                          <span className="ml-auto text-[10px] opacity-60">soon</span>
                        ) : null}
                      </button>
                    </li>
                  ))}
                  <li className="my-1 border-t border-win-dark" />
                  <li>
                    <button
                      type="button"
                      className="w-full px-3 py-1.5 text-left text-sm hover:bg-[#000080] hover:text-white"
                      onClick={() => setStartOpen(false)}
                    >
                      Shut Down…
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : null}
        </div>

        <div className="hidden flex-1 items-center gap-1 sm:flex">
          {SHORTCUTS.filter((s) => s.status === 'live').map((shortcut) => (
            <button
              key={shortcut.id}
              type="button"
              className="max-w-[9rem] truncate border border-win-light bg-win-face px-2 py-0.5 text-xs shadow-inset"
              onClick={() => openShortcut(shortcut)}
              title={shortcut.label}
            >
              {shortcut.icon} {shortcut.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2 pr-1 text-xs">
          <span className="hidden text-win-dark sm:inline">{SITE.computerName}</span>
          <TaskbarClock />
        </div>
      </footer>
    </div>
  );
}
