# Triage

**NOTE: This project is 80% vibed.**

Five LeetCode problems a day. You don't solve them - you name the technique that
cracks each one, as fast as you can. The drill is pattern recognition: the thing
that actually separates people in an interview is seeing "prefix sum" in
*Product of Array Except Self* within two seconds, not writing the loop.

## Running it

```sh
npm install
npm run dev      # http://localhost:5180
```

```sh
npm run build    # production bundle into dist/
npm run preview  # serve that bundle
npm test         # builds, then drives the real UI in headless Chrome
```

React 19 + Vite. No backend and no network calls: the whole problem set ships in
the bundle and your history lives in `localStorage`.

## How a round works

Each problem shows the full statement, two worked examples, and the constraints -
the constraints matter, because they are usually the tell. `n <= 20` means bitmask
or backtracking. "O(log n) required" means binary search. "O(1) extra space" is
what rules out the hash set you were about to reach for.

You pick up to three techniques from the board of 30 and lock in. The clock gives
you 60 seconds per problem.

| Answer | Worth |
|---|---|
| Best approach | full value |
| Works, but slower | 60% |
| Close | 25% |
| Off | 0, and each wrong pick costs 15 |

Each problem is worth up to 160, so a round is out of 800. Speed is worth 90 of
those 160, so the same correct answer pays 150 at second one and 60 at second
sixty. Naming the best approach *and* a valid alternative adds 10 - that is the
reward for knowing a problem has more than one door.

After every answer you get the full key and one line on why the best approach
wins, which is where the learning actually happens.

## Playing by keyboard

The drill is timed, so it is built for the keyboard. Type to filter the board,
press Enter to take the only remaining match, and press Enter again to lock in.
Enter moves to the next problem. Escape clears the filter.

## The daily set

The five problems come from a seeded shuffle over the date, so everyone playing on
the same day gets the same set and reloading does not reroll it. Selection
guarantees five *different* best-answers and at most two Hard problems. Practice
runs draw a random five and leave your streak alone.

## Layout

```
index.html              Vite entry
src/
  main.jsx              mounts App
  App.jsx               screen routing, round state, persistence
  styles.css            all styling
  screens/
    Home.jsx            streak, stats, scoring rules
    Play.jsx            the clock, picks, and locking in
    Results.jsx         round recap and the shareable grid
  components/
    ProblemStatement.jsx  statement, examples, constraints
    TechniqueBoard.jsx    the 30 techniques, filtered
    Verdict.jsx           grading and the answer key
  lib/
    scoring.js          tiers, the clock's value curve, grading
    daily.js            seeded daily selection
    storage.js          localStorage, with the failure cases handled
  data/
    tags.js             the 30 techniques, grouped for the board
    problems.js         the problem pool
test/
  e2e.js                drives the real UI and checks round bookkeeping
  run-e2e.mjs           serves dist/ and runs the above in headless Chrome
```

## Verifying the data

The problem set was written by hand, so there is a checker that holds it against
the real thing:

```sh
python tools/verify-problems.py --out tools/dataset-check.md
```

It reads LeetCode's public problem index and GraphQL content endpoint and reports
any disagreement in title, difficulty, example input/output, or the numeric bounds
in the constraints. It sleeps between requests and never touches premium content.

The last run: **103 of 107 checked against leetcode.com with 0 findings.**

Two sets in the script are deliberate exceptions, each annotated with why:

- `TRACE_FORMAT` - design problems where LeetCode writes the example as an
  operation trace (`["MinStack","push",...]`). No parser will line that up with a
  readable call sequence, so those eight were checked by hand and match exactly.
- `OWN_EXAMPLES` - problems where this app uses a smaller or more pointed example
  than the official one, such as `[9,9]` for Plus One to show the carry adding a
  digit.

The four premium problems have no public content and are checked against
neetcode.io instead. Note that NeetCode rewrites problems with its own bounds, so
it confirms the semantics and examples but not LeetCode's exact constraint numbers.

## Adding problems

Append to `src/data/problems.js`:

```js
{
  id: 238, title: 'Product of Array Except Self', difficulty: 'Medium',
  statement: `Paragraphs separated by a blank line.

Include the constraint that forces the technique.`,
  examples: [
    { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' },
    { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]', note: 'Optional explanation.' }
  ],
  constraints: ['2 <= nums.length <= 10^5', 'O(n) time, and division is not allowed'],
  optimal: ['prefix-sum'],   // best approach - full credit
  accepted: ['array'],       // also solves it, less well - 60%
  plausible: ['math'],       // near miss - 25%
  why: 'One line on why the best answer is best.'
}
```

`difficulty` is `'Easy'`, `'Medium'` or `'Hard'`. Every id in `optimal`,
`accepted` and `plausible` must exist in `src/data/tags.js`. Write the statement
in your own words rather than pasting LeetCode's.

Two things to keep true:

- Give every technique at least one problem where it genuinely wins. A tag that
  only ever appears in `accepted` and `plausible` becomes a free skip once players
  notice it is never the answer.
- Keep the constraints honest. They are the main signal a player reads, so a
  missing "O(1) space" turns a fair problem into a coin flip.
