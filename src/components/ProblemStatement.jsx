const LEVEL = { Easy: 1, Medium: 2, Hard: 3 };

function DifficultyMark({ difficulty }) {
  const level = LEVEL[difficulty] ?? 2;
  return (
    <span className="difficulty">
      <i aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <b key={n} className={n <= level ? 'on' : undefined} />
        ))}
      </i>
      {difficulty}
    </span>
  );
}

export default function ProblemStatement({ problem, counter }) {
  return (
    <article className="statement-pane">
      <div className="statement-head">
        <span className="counter">{counter}</span>
        <DifficultyMark difficulty={problem.difficulty} />
      </div>

      <h2 className="problem-title">{problem.title}</h2>

      <div className="prose">
        {problem.statement.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="examples">
        {problem.examples.map((ex, i) => (
          <div className="example" key={i}>
            <p className="example-label">Example {i + 1}</p>
            <dl>
              <div>
                <dt>Input</dt>
                <dd>{ex.input}</dd>
              </div>
              <div>
                <dt>Output</dt>
                <dd>{ex.output}</dd>
              </div>
              {ex.note && (
                <div>
                  <dt>Why</dt>
                  <dd className="example-note">{ex.note}</dd>
                </div>
              )}
            </dl>
          </div>
        ))}
      </div>

      <div className="constraints">
        <p className="constraints-label">Constraints</p>
        <ul>
          {problem.constraints.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
