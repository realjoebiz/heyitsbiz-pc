type AppIconProps = {
  id: string;
  size?: number;
};

export function AppIcon({ id, size = 32 }: AppIconProps) {
  const common = { width: size, height: size, viewBox: '0 0 32 32' };

  switch (id) {
    case 'computer':
      return (
        <svg {...common} aria-hidden>
          <rect x="4" y="6" width="24" height="16" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
          <rect x="6" y="8" width="20" height="11" fill="#1084d0" />
          <rect x="12" y="22" width="8" height="3" fill="#808080" />
          <rect x="8" y="25" width="16" height="2" fill="#a0a0a0" />
        </svg>
      );
    case 'radio':
      return (
        <svg {...common} aria-hidden>
          <rect x="5" y="8" width="22" height="14" fill="#8b4513" stroke="#000" />
          <rect x="8" y="11" width="10" height="5" fill="#f4d35e" />
          <circle cx="22" cy="15" r="3" fill="#d62828" />
          <rect x="7" y="23" width="18" height="2" fill="#5c3d1e" />
        </svg>
      );
    case 'globe':
      return (
        <svg {...common} aria-hidden>
          <circle cx="16" cy="16" r="11" fill="#1084d0" stroke="#000" />
          <ellipse cx="16" cy="16" rx="5" ry="11" fill="none" stroke="#fff" strokeWidth="1" />
          <line x1="5" y1="16" x2="27" y2="16" stroke="#fff" strokeWidth="1" />
        </svg>
      );
    case 'notepad':
      return (
        <svg {...common} aria-hidden>
          <rect x="7" y="5" width="18" height="22" fill="#fff" stroke="#000" />
          <line x1="10" y1="10" x2="22" y2="10" stroke="#1084d0" />
          <line x1="10" y1="14" x2="22" y2="14" stroke="#ccc" />
          <line x1="10" y1="18" x2="22" y2="18" stroke="#ccc" />
        </svg>
      );
    case 'calculator':
      return (
        <svg {...common} aria-hidden>
          <rect x="7" y="4" width="18" height="24" fill="#c0c0c0" stroke="#000" />
          <rect x="9" y="6" width="14" height="5" fill="#fff" stroke="#808080" />
          <rect x="9" y="13" width="4" height="3" fill="#dfdfdf" stroke="#808080" />
          <rect x="14" y="13" width="4" height="3" fill="#dfdfdf" stroke="#808080" />
          <rect x="19" y="13" width="4" height="3" fill="#dfdfdf" stroke="#808080" />
        </svg>
      );
    case 'chat':
      return (
        <svg {...common} aria-hidden>
          <rect x="5" y="7" width="22" height="14" fill="#fff" stroke="#000" />
          <polygon points="8,21 12,17 8,17" fill="#fff" stroke="#000" />
          <circle cx="11" cy="14" r="1" fill="#000" />
          <circle cx="16" cy="14" r="1" fill="#000" />
          <circle cx="21" cy="14" r="1" fill="#000" />
        </svg>
      );
    case 'map':
      return (
        <svg {...common} aria-hidden>
          <rect x="6" y="8" width="20" height="16" fill="#f4d35e" stroke="#000" />
          <path d="M8 20 L14 12 L18 18 L24 10" fill="none" stroke="#2d5c24" strokeWidth="2" />
        </svg>
      );
    case 'tv':
      return (
        <svg {...common} aria-hidden>
          <rect x="6" y="9" width="20" height="14" fill="#404040" stroke="#000" />
          <rect x="8" y="11" width="16" height="10" fill="#6eb5ff" />
          <rect x="13" y="23" width="6" height="2" fill="#808080" />
        </svg>
      );
    case 'music':
      return (
        <svg {...common} aria-hidden>
          <rect x="8" y="18" width="16" height="8" fill="#8b4513" stroke="#000" />
          <circle cx="12" cy="22" r="3" fill="#222" />
          <circle cx="20" cy="22" r="3" fill="#222" />
          <rect x="14" y="8" width="2" height="12" fill="#000" />
        </svg>
      );
    case 'recycle':
      return (
        <svg {...common} aria-hidden>
          <rect x="9" y="10" width="14" height="16" fill="#c0c0c0" stroke="#000" />
          <rect x="11" y="7" width="10" height="3" fill="#808080" />
          <line x1="13" y1="14" x2="13" y2="22" stroke="#404040" />
          <line x1="16" y1="14" x2="16" y2="22" stroke="#404040" />
          <line x1="19" y1="14" x2="19" y2="22" stroke="#404040" />
        </svg>
      );
    default:
      return (
        <svg {...common} aria-hidden>
          <rect x="6" y="6" width="20" height="20" fill="#c0c0c0" stroke="#000" />
        </svg>
      );
  }
}
