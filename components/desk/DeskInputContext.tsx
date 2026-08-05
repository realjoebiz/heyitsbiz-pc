'use client';

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

type KeyHandler = (key: string) => void;

type DeskInputContextValue = {
  registerHandler: (id: string, handler: KeyHandler) => void;
  unregisterHandler: (id: string) => void;
  setActiveHandler: (id: string | null) => void;
  sendKey: (key: string) => void;
  pressedDeskKey: string | null;
  flashDeskKey: (keyId: string) => void;
};

const DeskInputContext = createContext<DeskInputContextValue | null>(null);

export function DeskInputProvider({ children }: { children: React.ReactNode }) {
  const handlersRef = useRef(new Map<string, KeyHandler>());
  const activeIdRef = useRef<string | null>(null);
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pressedDeskKey, setPressedDeskKey] = useState<string | null>(null);

  const registerHandler = useCallback((id: string, handler: KeyHandler) => {
    handlersRef.current.set(id, handler);
  }, []);

  const unregisterHandler = useCallback((id: string) => {
    handlersRef.current.delete(id);
    if (activeIdRef.current === id) activeIdRef.current = null;
  }, []);

  const setActiveHandler = useCallback((id: string | null) => {
    activeIdRef.current = id;
  }, []);

  const sendKey = useCallback((key: string) => {
    const id = activeIdRef.current;
    if (!id) return;
    handlersRef.current.get(id)?.(key);
  }, []);

  const flashDeskKey = useCallback((keyId: string) => {
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    setPressedDeskKey(keyId);
    flashTimerRef.current = setTimeout(() => setPressedDeskKey(null), 120);
  }, []);

  const value = useMemo(
    () => ({
      registerHandler,
      unregisterHandler,
      setActiveHandler,
      sendKey,
      pressedDeskKey,
      flashDeskKey,
    }),
    [registerHandler, unregisterHandler, setActiveHandler, sendKey, pressedDeskKey, flashDeskKey]
  );

  return <DeskInputContext.Provider value={value}>{children}</DeskInputContext.Provider>;
}

export function useDeskInput() {
  const ctx = useContext(DeskInputContext);
  if (!ctx) throw new Error('useDeskInput must be used within DeskInputProvider');
  return ctx;
}

export function useDeskInputOptional() {
  return useContext(DeskInputContext);
}
