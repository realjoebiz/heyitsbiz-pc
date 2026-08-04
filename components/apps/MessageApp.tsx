'use client';

type MessageAppProps = {
  title: string;
  message: string;
  soon?: boolean;
  href?: string;
};

export function MessageApp({ title, message, soon, href }: MessageAppProps) {
  return (
    <div className="flex h-full items-start gap-3 bg-[#c0c0c0] p-4 text-sm">
      <span className="text-2xl" aria-hidden>
        {soon ? '⚠️' : 'ℹ️'}
      </span>
      <div>
        <p className="font-bold">{title}</p>
        <p className="mt-2">{message}</p>
        {soon ? <p className="mt-2 font-bold">This program is not installed yet.</p> : null}
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="win-btn mt-3 inline-block px-3 py-1">
            Open in browser
          </a>
        ) : null}
      </div>
    </div>
  );
}
