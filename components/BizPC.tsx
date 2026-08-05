'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AboutApp } from '@/components/apps/AboutApp';
import { CalculatorApp } from '@/components/apps/CalculatorApp';
import { ExplorerApp } from '@/components/apps/ExplorerApp';
import { IframeApp } from '@/components/apps/IframeApp';
import { MessageApp } from '@/components/apps/MessageApp';
import { NotepadApp } from '@/components/apps/NotepadApp';
import { DeskInputProvider, useDeskInput } from '@/components/desk/DeskInputContext';
import { PhysicalKeyboard } from '@/components/desk/PhysicalKeyboard';
import { MonitorSetup } from '@/components/monitor/MonitorSetup';
import { BootSequence } from '@/components/os/BootSequence';
import { ContextMenu } from '@/components/os/ContextMenu';
import { Desktop } from '@/components/os/Desktop';
import { Screensaver } from '@/components/os/Screensaver';
import { ShutdownDialog } from '@/components/os/ShutdownDialog';
import { Taskbar } from '@/components/os/Taskbar';
import { WindowFrame } from '@/components/os/WindowFrame';
import { DEFAULT_ICON_LAYOUT, getShortcut } from '@/lib/shortcuts';
import {
  loadMuted,
  loadWallpaper,
  markBooted,
  saveIconPositions,
  saveMuted,
  saveWallpaper,
  shouldSkipBoot,
} from '@/lib/storage';
import { playSound, resetStartupSound, setMuted } from '@/lib/sounds';
import type { ContextMenuState, WallpaperId, WindowRecord } from '@/lib/types';
import { WALLPAPERS, nextWallpaper } from '@/lib/wallpapers';
import { createWindow, focusWindow, openShortcutWindow } from '@/lib/windows';

function renderWindowBody(
  win: WindowRecord,
  onOpenShortcut: (id: string) => void
) {
  const shortcut = getShortcut(win.shortcutId);

  switch (win.kind) {
    case 'iframe':
      return win.href ? <IframeApp href={win.href} title={win.title} /> : null;
    case 'notepad':
      return <NotepadApp inputId={win.id} />;
    case 'calculator':
      return <CalculatorApp inputId={win.id} />;
    case 'explorer':
      return <ExplorerApp onOpen={onOpenShortcut} />;
    case 'about':
      return <AboutApp />;
    case 'message':
      return (
        <MessageApp
          title={win.title}
          message={win.message ?? ''}
          soon={shortcut?.status === 'soon'}
          href={shortcut?.href}
        />
      );
    default:
      return null;
  }
}

export function BizPC() {
  return (
    <DeskInputProvider>
      <BizPCInner />
    </DeskInputProvider>
  );
}

function BizPCInner() {
  const { setActiveHandler } = useDeskInput();
  const desktopRef = useRef<HTMLDivElement>(null);
  const [booting, setBooting] = useState(() => !shouldSkipBoot());
  const [poweredOff, setPoweredOff] = useState(false);
  const [screensaver, setScreensaver] = useState(false);
  const [windows, setWindows] = useState<WindowRecord[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [startOpen, setStartOpen] = useState(false);
  const [shutdownOpen, setShutdownOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenuState>(null);
  const [wallpaper, setWallpaper] = useState<WallpaperId>('bliss');
  const [muted, setMutedState] = useState(false);
  const [layoutKey, setLayoutKey] = useState(0);
  const [lampOn, setLampOn] = useState(true);
  const idleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setWallpaper(loadWallpaper());
    const m = loadMuted();
    setMutedState(m);
    setMuted(m);
  }, []);

  const resetIdle = useCallback(() => {
    if (idleRef.current) clearTimeout(idleRef.current);
    setScreensaver(false);
    idleRef.current = setTimeout(() => setScreensaver(true), 120_000);
  }, []);

  useEffect(() => {
    resetIdle();
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart'] as const;
    events.forEach((e) => window.addEventListener(e, resetIdle));
    return () => {
      events.forEach((e) => window.removeEventListener(e, resetIdle));
      if (idleRef.current) clearTimeout(idleRef.current);
    };
  }, [resetIdle]);

  useEffect(() => {
    const active = windows.find((w) => w.id === activeWindowId && !w.minimized);
    if (active && (active.kind === 'notepad' || active.kind === 'calculator')) {
      setActiveHandler(active.id);
    } else {
      setActiveHandler(null);
    }
  }, [activeWindowId, windows, setActiveHandler]);

  const activeInputKind = (() => {
    const active = windows.find((w) => w.id === activeWindowId && !w.minimized);
    if (active?.kind === 'notepad' || active?.kind === 'calculator') return active.kind;
    return null;
  })();

  const keyboardEnabled = !booting && !poweredOff && !screensaver && !shutdownOpen;

  const openShortcut = useCallback((shortcutId: string) => {
    setStartOpen(false);
    setContextMenu(null);

    if (shortcutId === 'recycle') {
      playSound('error');
    } else {
      playSound('click');
    }

    setWindows((prev) => {
      const result = openShortcutWindow(prev, shortcutId);
      if (result.opened) setActiveWindowId(result.opened.id);
      return result.windows;
    });
  }, []);

  const openAbout = useCallback(() => {
    const win = createWindow({
      id: 'about',
      label: 'About BIZ-PC',
      iconId: 'computer',
      kind: 'about',
      blurb: 'System information',
      status: 'system',
      defaultSize: { w: 360, h: 240 },
    });
    setWindows((prev) => focusWindow([...prev, win], win.id));
    setActiveWindowId(win.id);
  }, []);

  const finishBoot = useCallback(() => {
    markBooted();
    setBooting(false);
  }, []);

  const handleShutdown = () => {
    setShutdownOpen(false);
    setWindows([]);
    setPoweredOff(true);
  };

  const reboot = () => {
    resetStartupSound();
    setPoweredOff(false);
    setBooting(true);
  };

  const monitorProps = {
    lampOn,
    onToggleLamp: () => setLampOn((v) => !v),
    onDeskActivity: resetIdle,
  };

  if (poweredOff) {
    return (
      <MonitorSetup {...monitorProps}>
        <button
          type="button"
          className="crt-off absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black font-win text-[#606060]"
          onClick={reboot}
        >
          <p className="text-sm">It is now safe to turn off your computer.</p>
          <p className="mt-4 text-xs text-[#404040]">Click to power on</p>
        </button>
      </MonitorSetup>
    );
  }

  return (
    <MonitorSetup {...monitorProps}>
      <PhysicalKeyboard
        enabled={keyboardEnabled}
        activeKind={activeInputKind}
        onActivity={resetIdle}
      />
      <div className="os-shell relative flex h-full min-h-0 flex-col font-win">
        {booting ? <BootSequence onDone={finishBoot} /> : null}

        <div className="relative min-h-0 flex-1">
          <Desktop
            key={layoutKey}
            wallpaper={wallpaper}
            selectedId={selectedIcon}
            onSelect={setSelectedIcon}
            onOpen={openShortcut}
            onContextMenu={(x, y) => {
              const rect = desktopRef.current?.getBoundingClientRect();
              if (!rect) return;
              setContextMenu({ x: x - rect.left, y: y - rect.top });
            }}
            desktopRef={desktopRef}
          />

          {windows.map((win) => (
            <WindowFrame
              key={win.id}
              window={win}
              active={activeWindowId === win.id}
              desktopRect={desktopRef.current?.getBoundingClientRect() ?? null}
              onFocus={() => {
                setActiveWindowId(win.id);
                setWindows((prev) => focusWindow(prev, win.id));
              }}
              onClose={() => {
                setWindows((prev) => prev.filter((w) => w.id !== win.id));
                setActiveWindowId((id) => (id === win.id ? null : id));
              }}
              onMinimize={() => {
                playSound('minimize');
                setWindows((prev) =>
                  prev.map((w) => (w.id === win.id ? { ...w, minimized: true } : w))
                );
              }}
              onToggleMaximize={() => {
                playSound('click');
                setWindows((prev) =>
                  prev.map((w) =>
                    w.id === win.id ? { ...w, maximized: !w.maximized, minimized: false } : w
                  )
                );
              }}
              onMove={(x, y) => {
                setWindows((prev) =>
                  prev.map((w) => (w.id === win.id ? { ...w, x, y, maximized: false } : w))
                );
              }}
              popOutHref={win.kind === 'iframe' ? win.href : undefined}
            >
              {renderWindowBody(win, openShortcut)}
            </WindowFrame>
          ))}

          {screensaver && !booting ? <Screensaver onDismiss={resetIdle} /> : null}
          {shutdownOpen ? (
            <ShutdownDialog onCancel={() => setShutdownOpen(false)} onShutdown={handleShutdown} />
          ) : null}

          {contextMenu ? (
            <ContextMenu
              x={contextMenu.x}
              y={contextMenu.y}
              onClose={() => setContextMenu(null)}
              onArrange={() => {
                saveIconPositions(DEFAULT_ICON_LAYOUT);
                setLayoutKey((k) => k + 1);
              }}
              onWallpaper={() => {
                setWallpaper((w) => {
                  const next = nextWallpaper(w);
                  saveWallpaper(next);
                  return next;
                });
              }}
              onAbout={openAbout}
            />
          ) : null}
        </div>

        <Taskbar
          windows={windows}
          activeWindowId={activeWindowId}
          startOpen={startOpen}
          muted={muted}
          onToggleStart={() => setStartOpen((v) => !v)}
          onOpenShortcut={openShortcut}
          onFocusWindow={(id) => {
            setWindows((prev) =>
              focusWindow(
                prev.map((w) => (w.id === id ? { ...w, minimized: false } : w)),
                id
              )
            );
            setActiveWindowId(id);
          }}
          onShutdown={() => setShutdownOpen(true)}
          onToggleMute={() => {
            setMutedState((m) => {
              const next = !m;
              setMuted(next);
              saveMuted(next);
              return next;
            });
          }}
        />
      </div>
    </MonitorSetup>
  );
}
