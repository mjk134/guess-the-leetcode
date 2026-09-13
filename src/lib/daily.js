import { PROBLEMS } from '../data/problems.js';
import { ROUND_SIZE } from './scoring.js';

export function todayISO(d = new Date()) {
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0')
  ].join('-');
}

export function dayBefore(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return todayISO(new Date(y, m - 1, d - 1));
}

export function prettyDay(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    weekday: 'long', month: 'long', day: 'numeric'
  });
}

function seedFrom(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Five problems with five different best-answers and at most two Hard. */
function pickRound(seed) {
  const rand = rng(seed);
  const pool = PROBLEMS.slice();
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const picked = [];
  const usedTags = new Set();
  let hard = 0;

  const sweep = (allowDupeTag, hardCap) => {
    for (const p of pool) {
      if (picked.length >= ROUND_SIZE) return;
      if (picked.includes(p)) continue;
      if (!allowDupeTag && usedTags.has(p.optimal[0])) continue;
      if (p.difficulty === 'Hard' && hard >= hardCap) continue;
      picked.push(p);
      usedTags.add(p.optimal[0]);
      if (p.difficulty === 'Hard') hard++;
    }
  };

  sweep(false, 2);
  sweep(true, 2);   // relax the distinct-technique rule if the pool runs thin
  sweep(true, ROUND_SIZE);
  return picked;
}

export function dailyRound(day) {
  return pickRound(seedFrom(`triage-${day}`));
}

export function practiceRound() {
  return pickRound((Math.random() * 4294967295) >>> 0);
}
