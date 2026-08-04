'use client';

import { useEffect, useState } from 'react';
import { useDeskInput } from '@/components/desk/DeskInputContext';

const KEY = 'bizpc-notepad';

type NotepadAppProps = {
  inputId: string;
};

export function NotepadApp({ inputId }: NotepadAppProps) {
  const { registerHandler, unregisterHandler } = useDeskInput();
  const [text, setText] = useState('Welcome to BIZ-PC.\n\nLeave a note from the open road…');

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved) setText(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, text);
  }, [text]);

  useEffect(() => {
    const handler = (key: string) => {
      if (key === 'Backspace') {
        setText((t) => t.slice(0, -1));
        return;
      }
      if (key === 'Enter') {
        setText((t) => `${t}\n`);
        return;
      }
      if (key.length === 1) setText((t) => t + key);
    };
    registerHandler(inputId, handler);
    return () => unregisterHandler(inputId);
  }, [inputId, registerHandler, unregisterHandler]);

  return (
    <textarea
      className="h-full w-full resize-none border-0 bg-white p-2 font-mono text-sm outline-none"
      value={text}
      onChange={(e) => setText(e.target.value)}
      spellCheck={false}
    />
  );
}
