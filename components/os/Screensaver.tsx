'use client';

type ScreensaverProps = {
  onDismiss: () => void;
};

export function Screensaver({ onDismiss }: ScreensaverProps) {
  return (
    <button
      type="button"
      className="screensaver absolute inset-0 z-[90] cursor-none bg-black"
      onMouseMove={onDismiss}
      onClick={onDismiss}
      onKeyDown={onDismiss}
      aria-label="Screensaver — move mouse to dismiss"
    >
      <div className="screensaver-float text-2xl font-bold text-[#1084d0]">heyitsbiz</div>
      <div className="screensaver-float screensaver-float-2 text-xl text-[#f4d35e]">BIZ-PC</div>
      <div className="screensaver-float screensaver-float-3 text-lg text-white">open road lab</div>
    </button>
  );
}
