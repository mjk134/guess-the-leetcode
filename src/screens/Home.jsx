import { MAX_ROUND, ROUND_SIZE } from '../lib/scoring.js';

export default function Home({ store, today, onDaily, onPractice }) {
  const done = store.days[today];

  const stats = [
    ['Streak', store.streak ? `${store.streak} ${store.streak === 1 ? 'day' : 'days'}` : '\u2014'],
    ['Best round', store.best || '\u2014'],
    ['Rounds played', store.played || '\u2014']
  ];

  return (
    <section className="screen">
      <header className="masthead">
        <h1 className="wordmark">Triage</h1>
        <p className="lede">
          Five problems. Name the technique that cracks each one before the clock runs down.
        </p>
      </header>

      <div className="slotrow" aria-hidden="true">
        {Array.from({ length: ROUND_SIZE }, (_, i) => (
          <div key={i} className={`slot${done ? ` is-${done.tiers[i]}` : ''}`} />
        ))}
      </div>

      <div className="actions">
        <button type="button" className="btn btn-primary" onClick={onDaily}>
          {done ? "Review today's round" : "Start today's five"}
        </button>
        <button type="button" className="btn" onClick={onPractice}>
          Practice run
        </button>
      </div>
      <p className="note">
        {done
          ? `Today is done \u2014 ${done.total} out of ${MAX_ROUND}. The next set unlocks at midnight.`
          : 'One set a day, the same five for everyone.'}
      </p>

      <dl className="stats">
        {stats.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <details className="rules">
        <summary>How scoring works</summary>
        <div className="rules-body">
          <p>
            Each problem is worth up to <strong>160</strong>. Answer fast and answer well.
          </p>
          <ul>
            <li>
              <span className="swatch is-optimal" />
              <strong>Best approach</strong> &mdash; full value. Some problems accept more than one.
            </li>
            <li>
              <span className="swatch is-accepted" />
              <strong>Works, but slower</strong> &mdash; 60% of the value. Sorting where hashing was
              O(n), say.
            </li>
            <li>
              <span className="swatch is-plausible" />
              <strong>Close</strong> &mdash; 25%. The right neighbourhood, wrong tool.
            </li>
            <li>
              <span className="swatch is-miss" />
              <strong>Off</strong> &mdash; nothing, and each wrong pick costs 15.
            </li>
          </ul>
          <p>
            Speed is worth 90 of those 160 points, so a guess at second one pays far more than the
            same guess at second sixty. Read the constraints: they are usually the tell. Pick up to
            three techniques; naming a valid alternative alongside the best one adds 10.
          </p>
        </div>
      </details>
    </section>
  );
}
