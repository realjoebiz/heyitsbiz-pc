import { SITE } from '@/lib/shortcuts';

export function AboutApp() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 bg-[#c0c0c0] p-6 text-center text-sm">
      <div className="text-4xl font-bold text-[#000080]">BIZ-PC</div>
      <p>Microsoft Windows 98<br />Internet Lab Edition</p>
      <p className="text-xs text-[#404040]">
        {SITE.monitorBrand} CRT · {SITE.computerName}
        <br />
        Built for fun at heyitsbiz.com
      </p>
    </div>
  );
}
