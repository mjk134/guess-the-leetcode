// Technique taxonomy. `group` drives the board layout; `label` is what players read.
export const TAGS = [
  { id: 'array',           label: 'Array',            group: 'Fundamentals' },
  { id: 'string',          label: 'String',           group: 'Fundamentals' },
  { id: 'hashmap',         label: 'Hash Map / Set',   group: 'Fundamentals' },
  { id: 'sorting',         label: 'Sorting',          group: 'Fundamentals' },
  { id: 'math',            label: 'Math',             group: 'Fundamentals' },
  { id: 'matrix',          label: 'Matrix',           group: 'Fundamentals' },

  { id: 'two-pointers',    label: 'Two Pointers',     group: 'Scanning' },
  { id: 'sliding-window',  label: 'Sliding Window',   group: 'Scanning' },
  { id: 'prefix-sum',      label: 'Prefix Sum',       group: 'Scanning' },
  { id: 'intervals',       label: 'Intervals',        group: 'Scanning' },

  { id: 'stack',           label: 'Stack',            group: 'Linear structures' },
  { id: 'monotonic',       label: 'Monotonic Stack',  group: 'Linear structures' },
  { id: 'queue',           label: 'Queue / Deque',    group: 'Linear structures' },
  { id: 'linked-list',     label: 'Linked List',      group: 'Linear structures' },
  { id: 'heap',            label: 'Heap',             group: 'Linear structures' },

  { id: 'binary-search',   label: 'Binary Search',    group: 'Search & strategy' },
  { id: 'backtracking',    label: 'Backtracking',     group: 'Search & strategy' },
  { id: 'divide-conquer',  label: 'Divide & Conquer', group: 'Search & strategy' },
  { id: 'greedy',          label: 'Greedy',           group: 'Search & strategy' },
  { id: 'bitmask',         label: 'Bit Manipulation', group: 'Search & strategy' },

  { id: 'tree',            label: 'Tree',             group: 'Trees & graphs' },
  { id: 'bst',             label: 'Binary Search Tree', group: 'Trees & graphs' },
  { id: 'trie',            label: 'Trie',             group: 'Trees & graphs' },
  { id: 'graph',           label: 'Graph',            group: 'Trees & graphs' },
  { id: 'dfs',             label: 'DFS',              group: 'Trees & graphs' },
  { id: 'bfs',             label: 'BFS',              group: 'Trees & graphs' },
  { id: 'topo-sort',       label: 'Topological Sort', group: 'Trees & graphs' },
  { id: 'union-find',      label: 'Union Find',       group: 'Trees & graphs' },

  { id: 'dp',              label: 'Dynamic Programming', group: 'Heavy machinery' },
  { id: 'design',          label: 'Data Structure Design', group: 'Heavy machinery' }
];
