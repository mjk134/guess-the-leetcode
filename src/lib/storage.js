const KEY = 'triage.v2';

const EMPTY = { streak: 0, best: 0, played: 0, lastDay: null, days: {} };

export function loadStore() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...EMPTY, ...JSON.parse(raw) };
  } catch {
    // private mode or blocked storage: play anyway, just without history
  }
  return { ...EMPTY };
}

export function saveStore(store) {
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    // nothing to do; the round still finished
  }
  return store;
}
