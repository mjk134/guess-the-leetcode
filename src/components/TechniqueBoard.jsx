import { useEffect, useMemo } from 'react';
import { TAGS } from '../data/tags.js';
import { MAX_PICKS } from '../lib/scoring.js';

export default function TechniqueBoard({ picks, onToggle, filter, onFilter, filterRef, onEnter }) {
  // The board mounts fresh for each problem, so this is the reliable place to
  // take focus: the parent cannot, since the input does not exist yet when its
  // per-problem effect runs.
  useEffect(() => {
    // Not on touch devices: taking focus there pops the on-screen keyboard and
    // scrolls straight past the problem the player still has to read.
    if (window.matchMedia?.('(pointer: coarse)').matches) return;
    filterRef.current?.focus();
  }, [filterRef]);

  const groups = useMemo(() => {
    const order = [];
    const byGroup = new Map();
    for (const tag of TAGS) {
      if (!byGroup.has(tag.group)) {
        byGroup.set(tag.group, []);
        order.push(tag.group);
      }
      byGroup.get(tag.group).push(tag);
    }
    return order.map((name) => ({ name, tags: byGroup.get(name) }));
  }, []);

  const query = filter.trim().toLowerCase();
  const matches = (tag) =>
    query === '' || `${tag.label} ${tag.id}`.toLowerCase().includes(query);

  const full = picks.length >= MAX_PICKS;

  return (
    <div className="techniques">
      <div className="filter-wrap">
        <input
          ref={filterRef}
          className="filter"
          type="text"
          autoComplete="off"
          spellCheck="false"
          placeholder="Type to narrow the board"
          aria-label="Filter techniques"
          value={filter}
          onChange={(e) => onFilter(e.target.value)}
          onKeyDown={onEnter}
        />
        <span className="picked-count">
          {picks.length} / {MAX_PICKS}
        </span>
      </div>

      <div className="tagboard">
        {groups.map((group) => {
          const visible = group.tags.filter(matches);
          if (visible.length === 0) return null;
          return (
            <div className="group" key={group.name}>
              <p className="group-name">{group.name}</p>
              <div className="group-tags">
                {group.tags.map((tag) => {
                  const on = picks.includes(tag.id);
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      className={`tag${matches(tag) ? '' : ' is-dimmed'}`}
                      aria-pressed={on}
                      disabled={!on && full}
                      onClick={() => onToggle(tag.id)}
                    >
                      {tag.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
