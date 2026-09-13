export const TIME_LIMIT = 60;   // seconds per problem; there is a full statement to read now
export const ROUND_SIZE = 5;
export const MAX_PICKS = 3;

const FLOOR_POINTS = 60;   // what a perfect answer is worth as the clock expires
const SPEED_POINTS = 90;   // the extra value available at full speed
const COMBO_BONUS = 10;    // naming the best approach AND a valid alternative
const WRONG_COST = 15;

export const MAX_PER = FLOOR_POINTS + SPEED_POINTS + COMBO_BONUS;  // 160
export const MAX_ROUND = MAX_PER * ROUND_SIZE;                      // 800

export const TIERS = {
  optimal:   { mult: 1,    call: 'Best approach', share: '\u{1F7E9}' },
  accepted:  { mult: 0.6,  call: 'That works',    share: '\u{1F7E8}' },
  plausible: { mult: 0.25, call: 'Close',         share: '\u{1F7E7}' },
  miss:      { mult: 0,    call: 'Not this one',  share: '\u2B1B' }
};

/** What a perfect answer pays at this instant. Drains 150 -> 60 across the clock. */
export function potential(timeLeft) {
  const frac = Math.max(0, Math.min(1, timeLeft / TIME_LIMIT));
  return FLOOR_POINTS + Math.round(SPEED_POINTS * frac);
}

export function grade(problem, picks, timeLeft) {
  const hitOptimal = picks.filter((t) => problem.optimal.includes(t));
  const hitAccepted = picks.filter((t) => problem.accepted.includes(t));
  const hitPlausible = picks.filter((t) => problem.plausible.includes(t));
  const wrong = picks.filter(
    (t) => !problem.optimal.includes(t) && !problem.accepted.includes(t) && !problem.plausible.includes(t)
  );

  const tier = hitOptimal.length ? 'optimal'
    : hitAccepted.length ? 'accepted'
    : hitPlausible.length ? 'plausible'
    : 'miss';

  const pot = potential(timeLeft);
  const combo = tier === 'optimal' && hitAccepted.length ? COMBO_BONUS : 0;
  const points = Math.max(0, Math.round(pot * TIERS[tier].mult) + combo - wrong.length * WRONG_COST);

  return {
    tier,
    points,
    combo,
    wrong,
    picks,
    penalty: wrong.length * WRONG_COST,
    timeUsed: Math.max(0, TIME_LIMIT - timeLeft)
  };
}

export function gradeLine(total) {
  const pct = total / MAX_ROUND;
  if (pct >= 0.85) return 'You read all five on sight. Nothing left to teach you here today.';
  if (pct >= 0.65) return 'Strong. The patterns are landing; the clock is the thing to work on now.';
  if (pct >= 0.4) return 'You know these problems. Recognising them cold is the skill being drilled.';
  if (pct > 0) return 'Rough round. Read the reasoning under each problem before tomorrow.';
  return 'Nothing landed. Start with the three groups you reach for least.';
}
