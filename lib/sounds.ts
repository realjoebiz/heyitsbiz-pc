let ctx: AudioContext | null = null;
let muted = false;
let startupPlayed = false;

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

/**
 * Browsers block Web Audio until it is resumed inside a real user gesture.
 * Call this directly from the power button before starting the boot timer.
 */
export async function unlockAudio(): Promise<boolean> {
  const audio = getCtx();
  if (!audio || muted) return false;

  try {
    await audio.resume();
    const buffer = audio.createBuffer(1, 1, audio.sampleRate);
    const source = audio.createBufferSource();
    source.buffer = buffer;
    source.connect(audio.destination);
    source.start();
    return audio.state === 'running';
  } catch {
    return false;
  }
}

function scheduleNote(
  freq: number,
  startAt: number,
  duration: number,
  type: OscillatorType = 'triangle',
  peak = 0.07
) {
  const audio = getCtx();
  if (!audio || muted) return;

  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startAt);
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(peak, startAt + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start(startAt);
  osc.stop(startAt + duration + 0.05);
}

/** Windows 98–style startup fanfare (synthesized — no copyrighted samples). */
export function playWin98Startup() {
  if (muted || startupPlayed) return;
  const audio = getCtx();
  if (!audio) return;
  void audio.resume();

  startupPlayed = true;
  const t0 = audio.currentTime + 0.05;

  // Rising chime stack — iconic startup feel
  const melody = [
    { f: 329.63, t: 0.0, d: 0.55, peak: 0.05 },
    { f: 392.0, t: 0.1, d: 0.6, peak: 0.06 },
    { f: 493.88, t: 0.22, d: 0.65, peak: 0.07 },
    { f: 587.33, t: 0.34, d: 0.7, peak: 0.075 },
    { f: 659.25, t: 0.48, d: 0.85, peak: 0.08 },
    { f: 783.99, t: 0.62, d: 1.1, peak: 0.09 },
    { f: 987.77, t: 0.78, d: 1.4, peak: 0.085 },
  ];

  melody.forEach(({ f, t, d, peak }) => {
    scheduleNote(f, t0 + t, d, 'triangle', peak);
    scheduleNote(f * 2, t0 + t + 0.01, d * 0.6, 'sine', peak * 0.25);
  });

  // Soft bass pad
  scheduleNote(65.41, t0 + 0.48, 1.6, 'sine', 0.04);
}

export function resetStartupSound() {
  startupPlayed = false;
}

function blip(freq: number, duration: number, type: OscillatorType = 'square', gain = 0.03) {
  const audio = getCtx();
  if (!audio || muted) return;
  void audio.resume();
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

export function setMuted(value: boolean) {
  muted = value;
}

export function playSound(
  kind: 'startup' | 'bios' | 'click' | 'error' | 'minimize' | 'shutdown' | 'key' | 'mouse'
) {
  if (muted) return;
  const audio = getCtx();
  if (!audio) return;
  void audio.resume();

  switch (kind) {
    case 'startup':
      playWin98Startup();
      break;
    case 'bios':
      blip(1046.5, 0.11, 'square', 0.045);
      break;
    case 'click':
      blip(1200, 0.025, 'square', 0.018);
      break;
    case 'key':
      blip(680, 0.04, 'square', 0.022);
      blip(340, 0.03, 'triangle', 0.012);
      break;
    case 'mouse':
      blip(900, 0.02, 'square', 0.015);
      break;
    case 'error':
      blip(180, 0.18, 'sawtooth', 0.05);
      break;
    case 'minimize':
      blip(440, 0.05, 'triangle', 0.03);
      break;
    case 'shutdown':
      blip(392, 0.12);
      setTimeout(() => blip(294, 0.2), 120);
      break;
  }
}
