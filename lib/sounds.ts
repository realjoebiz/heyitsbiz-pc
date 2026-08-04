let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    try {
      ctx = new AudioContext();
    } catch {
      return null;
    }
  }
  return ctx;
}

function tone(freq: number, duration: number, type: OscillatorType = 'square', gain = 0.04) {
  const audio = getCtx();
  if (!audio) return;
  const osc = audio.createOscillator();
  const amp = audio.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  amp.gain.value = gain;
  osc.connect(amp);
  amp.connect(audio.destination);
  const now = audio.currentTime;
  amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.start(now);
  osc.stop(now + duration);
}

let muted = false;

export function setMuted(value: boolean) {
  muted = value;
}

export function playSound(kind: 'startup' | 'click' | 'error' | 'minimize' | 'shutdown') {
  if (muted) return;
  const audio = getCtx();
  if (!audio) return;
  void audio.resume();

  switch (kind) {
    case 'startup':
      tone(523, 0.08);
      setTimeout(() => tone(659, 0.1), 90);
      setTimeout(() => tone(784, 0.14), 190);
      break;
    case 'click':
      tone(880, 0.03, 'square', 0.02);
      break;
    case 'error':
      tone(180, 0.18, 'sawtooth', 0.05);
      break;
    case 'minimize':
      tone(440, 0.05, 'triangle', 0.03);
      break;
    case 'shutdown':
      tone(392, 0.12);
      setTimeout(() => tone(294, 0.2), 120);
      break;
  }
}
