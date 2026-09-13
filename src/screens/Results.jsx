import { useState } from 'react';
import { TAGS } from '../data/tags.js';
import { MAX_ROUND, ROUND_SIZE, TIERS, gradeLine } from '../lib/scoring.js';
import { prettyDay } from '../lib/daily.js';

const LABEL = Object.fromEntries(TAGS.map((t) => [t.id, t.label]));

export default function Results({ run, store, onPractice, onHome, reviewOnly }) {
  const [note, setNote] = useState(
    reviewOnly ? 'Reviewing a finished round, so the per-problem detail is not kept.' : ''
  );

  const names = (ids) => (ids.length ? ids.map((id) => LABEL[id]).join(', ') : 'nothing');

  const share = () => {
    const grid = run.results.map((r) => TIERS[r.tier].share).join('');
    const avg = run.results.reduce((s, r) => s + r.timeUsed, 0) / ROUND_SIZE;
    const lines = [
      `${run.mode === 'daily' ? `Triage ${run.day}` : 'Triage practice'}  ${run.total}/${MAX_ROUND}`,
      grid,
      `${avg.toFixed(1)}s average`
    ];
    if (run.mode === 'daily' && store.streak > 1) lines.push(`${store.streak} day streak`);

    navigator.clipboard?.writeText(lines.join('\n')).then(
      () => setNote('Copied to the clipboard.'),
      () => setNote('Copy failed \u2014 select the recap above instead.')
    );
  };

  return (
    <section className="screen">
      <header className="masthead">
        <p className="run-label">{run.mode === 'daily' ? prettyDay(run.day) : 'Practice run'}</p>
        <h2 className="score-total">
          {run.total}
          <span className="score-of">/ {MAX_ROUND}</span>
        </h2>
        <p className="grade">{gradeLine(run.total)}</p>
      </header>

      <ol className="recap">
        {run.results.map((r, i) => {
          const problem = run.problems[i];
          return (
            <li key={problem.id} className={`is-${r.tier}`}>
              <span className="recap-mark" />
              <div>
                <div className="recap-name">{problem.title}</div>
                {!reviewOnly && (
                  <div className="recap-sub">
                    best: {names(problem.optimal)} &nbsp;&middot;&nbsp; you: {names(r.picks)}
                    &nbsp;&middot;&nbsp; {r.timeUsed.toFixed(1)}s
                  </div>
                )}
              </div>
              {!reviewOnly && <span className="recap-pts">{r.points}</span>}
            </li>
          );
        })}
      </ol>

      <div className="actions">
        {!reviewOnly && (
          <button type="button" className="btn btn-primary" onClick={share}>
            Copy result
          </button>
        )}
        <button type="button" className="btn" onClick={onPractice}>
          Practice run
        </button>
        <button type="button" className="btn btn-quiet" onClick={onHome}>
          Back
        </button>
      </div>
      <p className="note">{note}</p>
    </section>
  );
}
