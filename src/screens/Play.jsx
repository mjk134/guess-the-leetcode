import { useCallback, useEffect, useRef, useState } from 'react';
import ProblemStatement from '../components/ProblemStatement.jsx';
import TechniqueBoard from '../components/TechniqueBoard.jsx';
import Verdict from '../components/Verdict.jsx';
import { TAGS } from '../data/tags.js';
import { MAX_PICKS, ROUND_SIZE, TIME_LIMIT, grade, potential } from '../lib/scoring.js';

const LABEL = Object.fromEntries(TAGS.map((t) => [t.id, t.label]));

export default function Play({ problems, index, onAnswer }) {
  const problem = problems[index];

  const [picks, setPicks] = useState([]);
  const [filter, setFilter] = useState('');
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);

  const deadline = useRef(0);
  const lockedAt = useRef(0);
  const advanced = useRef(false);
  const filterRef = useRef(null);

  // Refs so the ticker can read current values without being torn down each keystroke.
  const picksRef = useRef(picks);
  picksRef.current = picks;
  const resultRef = useRef(result);
  resultRef.current = result;

  const lockIn = useCallback(
    (expired) => {
      if (resultRef.current) return;
      const left = expired ? 0 : Math.max(0, (deadline.current - Date.now()) / 1000);
      const graded = grade(problem, picksRef.current, left);
      graded.expired = Boolean(expired);
      graded.problemId = problem.id;
      lockedAt.current = Date.now();
      resultRef.current = graded;
      setResult(graded);
    },
    [problem]
  );

  // Fresh clock and a clean board for every problem.
  useEffect(() => {
    setPicks([]);
    setFilter('');
    setResult(null);
    resultRef.current = null;
    setTimeLeft(TIME_LIMIT);
    deadline.current = Date.now() + TIME_LIMIT * 1000;
    advanced.current = false;
  }, [index]);

  useEffect(() => {
    if (result) return undefined;
    const id = setInterval(() => {
      const left = Math.max(0, (deadline.current - Date.now()) / 1000);
      setTimeLeft(left);
      if (left <= 0) lockIn(true);
    }, 100);
    return () => clearInterval(id);
  }, [result, lockIn]);

  const toggle = (id) => {
    if (resultRef.current) return;
    setPicks((current) => {
      if (current.includes(id)) return current.filter((t) => t !== id);
      if (current.length >= MAX_PICKS) return current;
      return [...current, id];
    });
    filterRef.current?.focus();
  };

  const onEnter = (e) => {
    if (e.key === 'Escape') {
      setFilter('');
      return;
    }
    if (e.key !== 'Enter') return;

    const query = filter.trim().toLowerCase();
    if (query) {
      const hits = TAGS.filter((t) => `${t.label} ${t.id}`.toLowerCase().includes(query));
      // One match left on the board: take it and clear the filter for the next one.
      if (hits.length === 1 && (picks.includes(hits[0].id) || picks.length < MAX_PICKS)) {
        toggle(hits[0].id);
        setFilter('');
        return;
      }
    }
    if (picks.length) lockIn(false);
  };

  // "No idea" scores the problem with nothing selected.
  const pass = () => {
    picksRef.current = [];
    setPicks([]);
    lockIn(false);
  };

  // Takes the graded result as an argument rather than reading the ref, which the
  // per-problem reset clears: reading it here handed the last answer back as null.
  const advance = (graded) => {
    // The same Enter that locked the answer must not also dismiss the explanation.
    if (Date.now() - lockedAt.current < 400) return;
    // One advance per problem. Without this latch a repeated activation submits the
    // same result twice, which pushes every later answer into the wrong slot.
    if (advanced.current) return;
    advanced.current = true;
    onAnswer(graded);
  };

  const frac = timeLeft / TIME_LIMIT;
  const late = frac < 0.25;

  return (
    <section className="screen">
      <div className="clockbar">
        <div
          className={`clockbar-fill${late ? ' is-late' : ''}`}
          style={{ transform: `scaleX(${result ? 0 : frac})` }}
        />
      </div>

      <div className="board">
        <ProblemStatement problem={problem} counter={`${index + 1} / ${ROUND_SIZE}`} />

        <div className="answer-column">
          <div className={`worth${late && !result ? ' is-draining' : ''}`}>
            <span className="worth-value">{result ? result.points : potential(timeLeft)}</span>
            <span className="worth-label">
              {result ? 'points scored' : 'points if you nail it now'}
            </span>
          </div>

          {result ? (
            <Verdict
              problem={problem}
              result={result}
              isLast={index + 1 >= ROUND_SIZE}
              onNext={() => advance(result)}
            />
          ) : (
            <>
              <TechniqueBoard
                picks={picks}
                onToggle={toggle}
                filter={filter}
                onFilter={setFilter}
                filterRef={filterRef}
                onEnter={onEnter}
              />

              <div className="picks">
                {picks.length === 0 ? (
                  <span className="picks-empty">Nothing picked yet. Up to three.</span>
                ) : (
                  picks.map((id) => (
                    <button key={id} type="button" className="pick" onClick={() => toggle(id)}>
                      {LABEL[id]}
                      <span aria-hidden="true">&times;</span>
                    </button>
                  ))
                )}
              </div>

              <div className="commit">
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={picks.length === 0}
                  onClick={() => lockIn(false)}
                >
                  Lock in answer
                </button>
                <button type="button" className="btn btn-quiet" onClick={pass}>
                  No idea, move on
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
