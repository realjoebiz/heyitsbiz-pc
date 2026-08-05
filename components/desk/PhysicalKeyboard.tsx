'use client';

import { useEffect } from 'react';
import { eventToCalcKey, eventToDeskKeyId, isEditableTarget } from '@/lib/desk-keys';
import { playSound } from '@/lib/sounds';
import { useDeskInput } from '@/components/desk/DeskInputContext';

type PhysicalKeyboardProps = {
  enabled: boolean;
  activeKind: 'notepad' | 'calculator' | null;
  onActivity?: () => void;
};

export function PhysicalKeyboard({ enabled, activeKind, onActivity }: PhysicalKeyboardProps) {
  const { sendKey, flashDeskKey } = useDeskInput();

  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const deskKeyId = eventToDeskKeyId(e);
      if (deskKeyId) flashDeskKey(deskKeyId);

      if (!activeKind) return;

      if (activeKind === 'calculator') {
        const calcKey = eventToCalcKey(e);
        if (!calcKey) return;
        e.preventDefault();
        playSound('key');
        onActivity?.();
        sendKey(calcKey);
        return;
      }

      if (activeKind === 'notepad') {
        if (isEditableTarget(e.target)) return;

        if (e.key === 'Backspace' || e.key === 'Enter' || e.key === ' ' || e.key.length === 1) {
          e.preventDefault();
          playSound('key');
          onActivity?.();
          if (e.key === 'Backspace') sendKey('Backspace');
          else if (e.key === 'Enter') sendKey('Enter');
          else sendKey(e.key);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [enabled, activeKind, sendKey, flashDeskKey, onActivity]);

  return null;
}
