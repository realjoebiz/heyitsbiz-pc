'use client';

import { createContext, useCallback, useContext, useMemo, useRef } from 'react';

type KeyHandler = (key: string) => void;

type DeskInputContextValue = {
  registerHandler: (id: string, handler: KeyHandler) => void;
  unregisterHandler: (id: string) => void;
  setActiveHandler: (id: string | null) => void;
  sendKey: (key: string) => void;
};

const DeskInputContext = createContext<DeskInputContextValue | null>(null);

export function DeskInputProvider({ children }: { children: React.ReactNode }) {
  const handlersRef = useRef(new Map<string, KeyHandler>());
  const activeIdRef = useRef<string | null>(null);

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

  const value = useMemo(
    () => ({ registerHandler, unregisterHandler, setActiveHandler, sendKey }),
    [registerHandler, unregisterHandler, setActiveHandler, sendKey]
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
