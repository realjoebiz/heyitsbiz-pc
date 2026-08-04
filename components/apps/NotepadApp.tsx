'use client';

import { useEffect, useState } from 'react';

const KEY = 'bizpc-notepad';

export function NotepadApp() {
  const [text, setText] = useState('Welcome to BIZ-PC.\n\nLeave a note from the open road…');

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved) setText(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, text);
  }, [text]);

  return (
    <textarea
      className="h-full w-full resize-none border-0 bg-white p-2 font-mono text-sm outline-none"
      value={text}
      onChange={(e) => setText(e.target.value)}
      spellCheck={false}
    />
  );
}
