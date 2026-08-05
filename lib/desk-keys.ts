import { codeToKeyId } from '@/lib/keyboard-layout';

/** Map a physical key event to an on-screen desk key id (for highlight). */
export function eventToDeskKeyId(e: KeyboardEvent): string | null {
  const fromCode = codeToKeyId(e.code);
  if (fromCode) return fromCode;

  if (e.key === 'Shift') return e.location === 2 ? 'RSHIFT' : 'SHIFT';
  return null;
}

/** Map physical keys to calculator button labels when Calculator is focused. */
export function eventToCalcKey(e: KeyboardEvent): string | null {
  if (e.key >= '0' && e.key <= '9') return e.key;
  if (e.key === '+') return '+';
  if (e.key === '-') return '-';
  if (e.key === '*' || e.code === 'NumpadMultiply') return '×';
  if (e.key === '/' || e.code === 'NumpadDivide') return '÷';
  if (e.key === 'Enter' || e.key === '=' || e.code === 'NumpadEnter') return '=';
  if (e.key === 'c' || e.key === 'C' || e.key === 'Escape') return 'C';
  if (e.code.startsWith('Numpad') && e.key.length === 1 && e.key >= '0' && e.key <= '9') {
    return e.key;
  }
  if (e.code === 'NumpadAdd') return '+';
  if (e.code === 'NumpadSubtract') return '-';
  return null;
}

export function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === 'TEXTAREA' || tag === 'INPUT' || tag === 'SELECT') return true;
  return target.isContentEditable;
}
