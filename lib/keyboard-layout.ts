export type KeyLabel =
  | string
  | { top: string; bottom: string }
  | { small: string };

export type KeyDef = {
  id: string;
  code: string;
  label: KeyLabel;
  mod?: 'function' | 'single';
  hideMobile?: boolean;
  width?: 'esc' | 'tab' | 'caps' | 'shift' | 'rshift' | 'backspace' | 'enter' | 'ctrl' | 'alt' | 'space' | 'delete';
};

export const KEYBOARD_ROWS: KeyDef[][] = [
  [
    { id: 'ESC', code: 'Escape', label: { small: 'ESC' }, mod: 'function', width: 'esc', hideMobile: true },
    { id: '1', code: 'Digit1', label: { top: '!', bottom: '1' } },
    { id: '2', code: 'Digit2', label: { top: '@', bottom: '2' } },
    { id: '3', code: 'Digit3', label: { top: '#', bottom: '3' } },
    { id: '4', code: 'Digit4', label: { top: '$', bottom: '4' } },
    { id: '5', code: 'Digit5', label: { top: '%', bottom: '5' } },
    { id: '6', code: 'Digit6', label: { top: '^', bottom: '6' } },
    { id: '7', code: 'Digit7', label: { top: '&', bottom: '7' } },
    { id: '8', code: 'Digit8', label: { top: '*', bottom: '8' } },
    { id: '9', code: 'Digit9', label: { top: '(', bottom: '9' } },
    { id: '0', code: 'Digit0', label: { top: ')', bottom: '0' } },
    { id: '-', code: 'Minus', label: { top: '_', bottom: '-' }, hideMobile: true },
    { id: '=', code: 'Equal', label: { top: '+', bottom: '=' }, hideMobile: true },
    { id: 'BACKSPACE', code: 'Backspace', label: { small: '← BACKSPACE' }, mod: 'function', width: 'backspace' },
  ],
  [
    { id: 'TAB', code: 'Tab', label: { small: 'TAB' }, mod: 'function', width: 'tab', hideMobile: true },
    { id: 'Q', code: 'KeyQ', label: 'Q', mod: 'single' },
    { id: 'W', code: 'KeyW', label: 'W', mod: 'single' },
    { id: 'E', code: 'KeyE', label: 'E', mod: 'single' },
    { id: 'R', code: 'KeyR', label: 'R', mod: 'single' },
    { id: 'T', code: 'KeyT', label: 'T', mod: 'single' },
    { id: 'Y', code: 'KeyY', label: 'Y', mod: 'single' },
    { id: 'U', code: 'KeyU', label: 'U', mod: 'single' },
    { id: 'I', code: 'KeyI', label: 'I', mod: 'single' },
    { id: 'O', code: 'KeyO', label: 'O', mod: 'single' },
    { id: 'P', code: 'KeyP', label: 'P', mod: 'single' },
    { id: '[', code: 'BracketLeft', label: { top: '{', bottom: '[' }, hideMobile: true },
    { id: ']', code: 'BracketRight', label: { top: '}', bottom: ']' }, hideMobile: true },
    { id: '\\', code: 'Backslash', label: { top: '|', bottom: '\\' }, hideMobile: true },
  ],
  [
    { id: 'CAPS', code: 'CapsLock', label: { small: 'CAPS' }, mod: 'function', width: 'caps', hideMobile: true },
    { id: 'A', code: 'KeyA', label: 'A', mod: 'single' },
    { id: 'S', code: 'KeyS', label: 'S', mod: 'single' },
    { id: 'D', code: 'KeyD', label: 'D', mod: 'single' },
    { id: 'F', code: 'KeyF', label: 'F', mod: 'single' },
    { id: 'G', code: 'KeyG', label: 'G', mod: 'single' },
    { id: 'H', code: 'KeyH', label: 'H', mod: 'single' },
    { id: 'J', code: 'KeyJ', label: 'J', mod: 'single' },
    { id: 'K', code: 'KeyK', label: 'K', mod: 'single' },
    { id: 'L', code: 'KeyL', label: 'L', mod: 'single' },
    { id: ';', code: 'Semicolon', label: { top: ':', bottom: ';' }, hideMobile: true },
    { id: "'", code: 'Quote', label: { top: '"', bottom: "'" }, hideMobile: true },
    { id: 'ENTER', code: 'Enter', label: { small: '↵ ENTER' }, mod: 'function', width: 'enter' },
  ],
  [
    { id: 'SHIFT', code: 'ShiftLeft', label: { small: '⇧ SHIFT' }, mod: 'function', width: 'shift' },
    { id: 'Z', code: 'KeyZ', label: 'Z', mod: 'single' },
    { id: 'X', code: 'KeyX', label: 'X', mod: 'single' },
    { id: 'C', code: 'KeyC', label: 'C', mod: 'single' },
    { id: 'V', code: 'KeyV', label: 'V', mod: 'single' },
    { id: 'B', code: 'KeyB', label: 'B', mod: 'single' },
    { id: 'N', code: 'KeyN', label: 'N', mod: 'single' },
    { id: 'M', code: 'KeyM', label: 'M', mod: 'single' },
    { id: ',', code: 'Comma', label: ',', mod: 'single', hideMobile: true },
    { id: '.', code: 'Period', label: '.', mod: 'single', hideMobile: true },
    { id: '/', code: 'Slash', label: { top: '?', bottom: '/' }, hideMobile: true },
    { id: 'RSHIFT', code: 'ShiftRight', label: { small: '⇧ SHIFT' }, mod: 'function', width: 'rshift' },
    { id: 'PRINT', code: 'PrintScreen', label: { small: 'PRINT' }, mod: 'function', width: 'delete', hideMobile: true },
  ],
  [
    { id: 'CTRL', code: 'ControlLeft', label: { small: 'CTRL' }, mod: 'function', width: 'ctrl' },
    { id: 'ALT', code: 'AltLeft', label: { small: 'ALT' }, mod: 'function', width: 'alt' },
    { id: 'SPACE', code: 'Space', label: ' ', mod: 'function', width: 'space' },
    { id: 'ALTR', code: 'AltRight', label: { small: 'ALT' }, mod: 'function', width: 'alt', hideMobile: true },
    { id: 'ARROWUP', code: 'ArrowUp', label: '↑', mod: 'single', hideMobile: true },
    { id: 'ARROWLEFT', code: 'ArrowLeft', label: '←', mod: 'single' },
    { id: 'ARROWDOWN', code: 'ArrowDown', label: '↓', mod: 'single' },
    { id: 'ARROWRIGHT', code: 'ArrowRight', label: '→', mod: 'single' },
  ],
];

const CODE_TO_ID = new Map<string, string>();
for (const row of KEYBOARD_ROWS) {
  for (const key of row) {
    CODE_TO_ID.set(key.code, key.id);
  }
}

export function codeToKeyId(code: string): string | null {
  return CODE_TO_ID.get(code) ?? null;
}

export function keyIdToOutput(id: string, shift: boolean): string | null {
  if (id === 'SHIFT' || id === 'RSHIFT' || id === 'CAPS' || id === 'CTRL' || id === 'ALT' || id === 'ALTR' || id === 'PRINT' || id === 'TAB' || id === 'ESC') {
    return null;
  }
  if (id === 'BACKSPACE') return 'Backspace';
  if (id === 'ENTER') return 'Enter';
  if (id === 'SPACE') return ' ';
  if (id.length === 1 && /[A-Z]/.test(id)) return shift ? id : id.toLowerCase();
  if (id.length === 1) return id;
  return null;
}
