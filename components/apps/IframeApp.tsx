'use client';

import { useState } from 'react';

export function IframeApp({ href, title }: { href: string; title: string }) {
  const [blocked, setBlocked] = useState(false);

  return (
    <div className="flex h-full flex-col bg-[#c0c0c0]">
      {blocked ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-4 text-center text-sm">
          <p>This site cannot run inside the desktop window.</p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="win-btn px-4 py-1"
          >
            Open {title} in new tab
          </a>
        </div>
      ) : (
        <iframe
          title={title}
          src={href}
          className="h-full w-full flex-1 border-0 bg-white"
          onError={() => setBlocked(true)}
        />
      )}
    </div>
  );
}
