'use client';

import type { WindowRecord } from '@/lib/types';
import { SHORTCUTS, SITE } from '@/lib/shortcuts';
import { AppIcon } from '@/components/icons/AppIcon';
import { TaskbarClock } from '@/components/os/TaskbarClock';
import { playSound } from '@/lib/sounds';

type TaskbarProps = {
  windows: WindowRecord[];
  activeWindowId: string | null;
  startOpen: boolean;
  muted: boolean;
  onToggleStart: () => void;
  onOpenShortcut: (id: string) => void;
  onFocusWindow: (id: string) => void;
  onShutdown: () => void;
  onToggleMute: () => void;
};

export function Taskbar({
  windows,
  activeWindowId,
  startOpen,
  muted,
  onToggleStart,
  onOpenShortcut,
  onFocusWindow,
  onShutdown,
  onToggleMute,
}: TaskbarProps) {
  return (
    <footer className="taskbar relative z-[80] flex h-10 shrink-0 items-center gap-1 px-1">
      <div className="relative">
        <button
          type="button"
          className={`start-btn ${startOpen ? 'start-btn-pressed' : ''}`}
          onClick={() => {
            playSound('click');
            onToggleStart();
          }}
          aria-expanded={startOpen}
        >
          <span className="start-flag" aria-hidden />
          Start
        </button>

        {startOpen ? (
          <div className="start-menu absolute bottom-full left-0 mb-1">
            <div className="start-menu-rail">
              <span className="start-menu-rail-text">
                Windows<span>98</span>
              </span>
            </div>
            <ul className="start-menu-list">
              {SHORTCUTS.map((shortcut) => (
                <li key={shortcut.id}>
                  <button
                    type="button"
                    className="start-menu-item"
                    onClick={() => {
                      playSound('click');
                      onOpenShortcut(shortcut.id);
                    }}
                  >
                    <AppIcon id={shortcut.iconId} size={20} />
                    {shortcut.label}
                    {shortcut.status === 'soon' ? (
                      <span className="ml-auto text-[10px] opacity-60">soon</span>
                    ) : null}
                  </button>
                </li>
              ))}
              <li className="start-menu-divider" />
              <li>
                <button type="button" className="start-menu-item" onClick={onShutdown}>
                  Shut Down…
                </button>
              </li>
            </ul>
          </div>
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
        {windows.map((win) => {
          const shortcut = SHORTCUTS.find((s) => s.id === win.shortcutId);
          return (
            <button
              key={win.id}
              type="button"
              className={`taskbar-window-btn ${activeWindowId === win.id && !win.minimized ? 'taskbar-window-btn-active' : ''}`}
              onClick={() => {
                playSound('click');
                onFocusWindow(win.id);
              }}
              title={win.title}
            >
              {shortcut ? <AppIcon id={shortcut.iconId} size={14} /> : null}
              <span className="truncate">{win.title}</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="taskbar-tray-btn"
        onClick={onToggleMute}
        title={muted ? 'Unmute sounds' : 'Mute sounds'}
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? '🔇' : '🔊'}
      </button>

      <div className="taskbar-tray hidden items-center gap-2 sm:flex">
        <span className="text-[10px] text-[#404040]">{SITE.computerName}</span>
        <TaskbarClock />
      </div>
    </footer>
  );
}
