'use client';

import { playSound } from '@/lib/sounds';

type ShutdownDialogProps = {
  onCancel: () => void;
  onShutdown: () => void;
};

export function ShutdownDialog({ onCancel, onShutdown }: ShutdownDialogProps) {
  return (
    <div className="win-dialog-backdrop absolute inset-0 z-[95] flex items-center justify-center bg-black/40">
      <div className="win-dialog w-72">
        <div className="win-titlebar win-titlebar-active">
          <span className="px-2 text-xs font-bold">Shut Down Windows</span>
        </div>
        <div className="bg-[#c0c0c0] p-4 text-sm">
          <p>What do you want the computer to do?</p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              className="win-btn px-3 py-1"
              onClick={() => {
                playSound('click');
                onCancel();
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="win-btn px-3 py-1"
              onClick={() => {
                playSound('shutdown');
                onShutdown();
              }}
            >
              Shut down
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
