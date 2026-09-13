import { useEffect, useRef } from 'react';
import { TAGS } from '../data/tags.js';
import { TIERS } from '../lib/scoring.js';

const LABEL = Object.fromEntries(TAGS.map((t) => [t.id, t.label]));

function Row({ label, ids, classFor, yours }) {
  if (!ids.length) return null;
  return (
    <div className="answerkey-row">
      <span className="answerkey-label">{label}</span>
      {ids.map((id) => (
        <span
          key={id}
          className={`chip is-${classFor(id)}${yours.includes(id) ? ' is-yours' : ''}`}
        >
          {LABEL[id] ?? id}
        </span>
      ))}
    </div>
  );
}

export default function Verdict({ problem, result, isLast, onNext }) {
  // Keep the keyboard flow alive: the answer was locked from the filter input,
  // which is now unmounted, so nothing would hold focus without this.
  const nextRef = useRef(null);
  useEffect(() => {
    nextRef.current?.focus();
  }, []);

  const tierOf = (id) =>
    problem.optimal.includes(id) ? 'optimal'
      : problem.accepted.includes(id) ? 'accepted'
      : problem.plausible.includes(id) ? 'plausible'
      : 'miss';

  const call = result.expired && result.picks.length === 0
    ? 'Out of time'
    : TIERS[result.tier].call;

  const detail = [`+${result.points}`];
  if (result.combo) detail.push(`+${result.combo} for naming the alternative`);
  if (result.penalty) detail.push(`\u2212${result.penalty} for wrong picks`);

  return (
    <div className={`verdict is-${result.tier}`}>
      <div className="verdict-head">
        <span className="verdict-call">{call}</span>
        <span className="verdict-points">{detail.join(' \u00b7 ')}</span>
      </div>

      <div className="answerkey">
        <Row label="Best" ids={problem.optimal} classFor={() => 'optimal'} yours={result.picks} />
        <Row label="Also works" ids={problem.accepted} classFor={() => 'accepted'} yours={result.picks} />
        <Row label="You said" ids={result.picks} classFor={tierOf} yours={[]} />
      </div>

      <p className="verdict-why">{problem.why}</p>

      <button ref={nextRef} type="button" className="btn btn-primary verdict-next" onClick={onNext}>
        {isLast ? 'See the round' : 'Next problem'}
      </button>
    </div>
  );
}
