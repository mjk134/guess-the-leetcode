import { useState } from 'react';
import Home from './screens/Home.jsx';
import Play from './screens/Play.jsx';
import Results from './screens/Results.jsx';
import { dailyRound, dayBefore, practiceRound, todayISO } from './lib/daily.js';
import { loadStore, saveStore } from './lib/storage.js';
import { ROUND_SIZE } from './lib/scoring.js';
import { PROBLEMS } from './data/problems.js';
import { TAGS } from './data/tags.js';

export default function App() {
  const [store, setStore] = useState(loadStore);
  const [screen, setScreen] = useState('home');
  const [run, setRun] = useState(null);
  const [reviewOnly, setReviewOnly] = useState(false);

  const today = todayISO();

  const start = (mode) => {
    const day = todayISO();
    setRun({
      mode,
      day,
      problems: mode === 'daily' ? dailyRound(day) : practiceRound(),
      results: [],
      index: 0,
      total: 0
    });
    setReviewOnly(false);
    setScreen('play');
  };

  const startDaily = () => {
    const finished = store.days[today];
    if (!finished) {
      start('daily');
      return;
    }
    // Already played today: show the finished round rather than letting it be replayed.
    setRun({
      mode: 'daily',
      day: today,
      problems: dailyRound(today),
      results: finished.tiers.map((tier) => ({ tier, points: 0, picks: [], timeUsed: 0 })),
      index: ROUND_SIZE,
      total: finished.total
    });
    setReviewOnly(true);
    setScreen('done');
  };

  const answer = (result) => {
    if (!result) return;
    // Never record the same problem twice, whatever the caller does.
    if (run.results.some((r) => r.problemId === result.problemId)) return;
    if (run.results.length >= ROUND_SIZE) return;
    const results = [...run.results, result];

    if (results.length < ROUND_SIZE) {
      setRun({ ...run, results, index: run.index + 1 });
      return;
    }

    const total = results.reduce((sum, r) => sum + r.points, 0);
    setRun({ ...run, results, total });

    if (run.mode === 'daily' && !store.days[run.day]) {
      const next = {
        ...store,
        days: {
          ...store.days,
          [run.day]: { total, tiers: results.map((r) => r.tier) }
        },
        streak: store.lastDay === dayBefore(run.day) ? store.streak + 1 : 1,
        lastDay: run.day,
        played: store.played + 1,
        best: Math.max(store.best, total)
      };
      setStore(saveStore(next));
    }

    setScreen('done');
  };

  // Inspection hook for the end-to-end test in test/. Read-only; nothing reads it back.
  if (typeof window !== 'undefined') {
    window.__triage = { PROBLEMS, TAGS, run, store };
  }

  return (
    <div className="frame">
      {screen === 'home' && (
        <Home
          store={store}
          today={today}
          onDaily={startDaily}
          onPractice={() => start('practice')}
        />
      )}

      {screen === 'play' && (
        <Play problems={run.problems} index={run.index} onAnswer={answer} />
      )}

      {screen === 'done' && (
        <Results
          run={run}
          store={store}
          reviewOnly={reviewOnly}
          onPractice={() => start('practice')}
          onHome={() => setScreen('home')}
        />
      )}
    </div>
  );
}
