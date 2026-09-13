/* Drives the real UI in a browser and checks the round bookkeeping.
   Loaded by test/run-e2e.mjs against a production build. */
(async () => {
  const out = [];
  const log = (...a) => out.push(a.join(' '));
  const ok = (cond, msg) => log((cond ? 'PASS' : 'FAIL') + '  ' + msg);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const byText = (sel, text) =>
    [...document.querySelectorAll(sel)].find((n) => n.textContent.trim() === text);
  const until = async (fn, label, tries = 60) => {
    for (let i = 0; i < tries; i++) {
      const v = fn();
      if (v) return v;
      await sleep(50);
    }
    throw new Error('timed out waiting for ' + label);
  };

  try {
    const start = await until(() => byText('button', "Start today's five"), 'home');
    start.click();

    const played = [];
    for (let i = 0; i < 5; i++) {
      const title = (await until(() => document.querySelector('.problem-title'), 'problem')).textContent;
      await until(() => document.querySelector('.tag'), 'board');

      ok(document.querySelectorAll('.example').length === 2, `${title}: two examples shown`);
      ok(document.querySelectorAll('.constraints li').length > 0, `${title}: constraints shown`);
      ok(document.querySelector('.prose p'), `${title}: statement shown`);

      const problem = window.__triage.PROBLEMS.find((p) => p.title === title);
      const wanted = window.__triage.TAGS.find((t) => t.id === problem.optimal[0]).label;
      played.push({ title, wanted });

      byText('.tag', wanted).click();
      await until(() => document.querySelector('.pick'), 'pick chip');

      byText('button', 'Lock in answer').click();
      const verdict = await until(() => document.querySelector('.verdict'), 'verdict');
      ok(verdict.classList.contains('is-optimal'), `${title}: graded optimal`);

      await sleep(450); // clear the guard that stops one keystroke doing both
      const next = byText('button', i === 4 ? 'See the round' : 'Next problem');
      next.click();
      // A repeated activation must not submit the same answer twice.
      next.click();
    }

    await until(() => document.querySelector('.recap'), 'results');

    const rows = [...document.querySelectorAll('.recap li')];
    ok(rows.length === 5, `recap lists 5 rows (got ${rows.length})`);

    const run = window.__triage.run;
    ok(run.results.length === 5, 'exactly five results recorded');

    let aligned = true;
    run.results.forEach((r, i) => {
      const p = run.problems[i];
      const wanted = p.optimal[0];
      if (r.picks.length !== 1 || r.picks[0] !== wanted) {
        aligned = false;
        log(`     row ${i}: ${p.title} expected picks=[${wanted}] but got [${r.picks}]`);
      }
      if (r.problemId !== p.id) {
        aligned = false;
        log(`     row ${i}: ${p.title} result belongs to problem id ${r.problemId}, not ${p.id}`);
      }
    });
    ok(aligned, 'every answer is stored against the problem it was given for');

    const ids = run.results.map((r) => r.problemId);
    ok(new Set(ids).size === 5, 'no duplicated answers');
    ok(run.results.every((r) => r.tier === 'optimal'), 'all five graded optimal');
    ok(run.total >= 700, `round scored ${run.total}/800`);

    log('');
    log('played: ' + played.map((p) => `${p.title} -> ${p.wanted}`).join(' | '));
  } catch (e) {
    log('THREW  ' + e.message);
  }

  const pre = document.createElement('pre');
  pre.id = 'e2e-out';
  pre.textContent = out.join('\n');
  document.body.appendChild(pre);
})();
