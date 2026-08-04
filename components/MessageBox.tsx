'use client';

import type { Shortcut } from '@/lib/shortcuts';

type MessageBoxProps = {
  shortcut: Shortcut;
  onClose: () => void;
};

export function MessageBox({ shortcut, onClose }: MessageBoxProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4">
      <div
        className="w-full max-w-md border-2 border-win-light bg-win-face font-win shadow-outset"
        role="dialog"
        aria-labelledby="msg-title"
      >
        <div className="flex items-center justify-between bg-gradient-to-r from-win-title to-win-title2 px-2 py-1">
          <p id="msg-title" className="text-sm font-bold text-white">
            {shortcut.label}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="h-5 w-5 border border-win-face bg-win-face text-xs font-bold leading-none shadow-outset"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="flex gap-3 p-4">
          <span className="text-2xl" aria-hidden>
            ℹ️
          </span>
          <div>
            <p className="text-sm">{shortcut.blurb}</p>
            {shortcut.status === 'soon' && (
              <p className="mt-2 text-sm font-bold">This toy is not installed yet.</p>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-2 px-4 pb-4">
          {shortcut.href && shortcut.status === 'live' ? (
            <a
              href={shortcut.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-win-light bg-win-face px-4 py-1 text-sm shadow-outset active:shadow-inset"
            >
              Open
            </a>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="min-w-[4.5rem] border border-win-light bg-win-face px-4 py-1 text-sm shadow-outset active:shadow-inset"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
