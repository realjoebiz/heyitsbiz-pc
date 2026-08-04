'use client';

type ContextMenuProps = {
  x: number;
  y: number;
  onClose: () => void;
  onArrange: () => void;
  onWallpaper: () => void;
  onAbout: () => void;
};

export function ContextMenu({ x, y, onClose, onArrange, onWallpaper, onAbout }: ContextMenuProps) {
  const items = [
    { label: 'Arrange Icons', action: onArrange },
    { label: 'Refresh', action: onClose },
    { label: 'Change Wallpaper', action: onWallpaper },
    { label: 'Properties', action: onAbout },
  ];

  return (
    <>
      <button type="button" className="context-dismiss" onClick={onClose} aria-label="Close menu" />
      <ul className="context-menu" style={{ left: x, top: y }}>
        {items.map((item) => (
          <li key={item.label}>
            <button
              type="button"
              className="context-menu-item"
              onClick={() => {
                item.action();
                onClose();
              }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
