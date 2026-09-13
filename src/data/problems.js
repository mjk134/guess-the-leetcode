/* Problem pool.
 *
 * Statements are written from scratch, not copied from LeetCode. Examples and
 * constraints follow the real problems, because the constraints are half the
 * puzzle: "n <= 20" means bitmask, "O(log n) required" means binary search.
 *
 *   optimal    the technique that gives the best solution  -> full credit
 *   accepted   a legitimate alternative that also solves it -> 60%
 *   plausible  the right neighbourhood, wrong tool          -> 25%
 *   why        one line on why the optimal answer wins
 */

export const PROBLEMS = [
  {
    id: 1, title: 'Two Sum', difficulty: 'Easy',
    statement: `You are given an array of integers and a target value. Return the indices of the two numbers that add up to the target.

Each input has exactly one solution, and you may not reuse the same element twice. The order of the two indices does not matter.`,
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', note: 'nums[0] + nums[1] = 2 + 7 = 9.' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' }
    ],
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9', 'Exactly one valid answer exists'],
    optimal: ['hashmap'], accepted: ['array'], plausible: ['two-pointers', 'sorting'],
    why: 'One pass storing each complement. Sorting plus two pointers works but destroys the original indices and the O(n) bound.'
  },
  {
    id: 121, title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy',
    statement: `An array holds the price of a stock on each day. You may buy on one day and sell on a single later day.

Return the largest profit available. If no pair of days turns a profit, return 0.`,
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5', note: 'Buy on day 2 at 1, sell on day 5 at 6.' },
      { input: 'prices = [7,6,4,3,1]', output: '0', note: 'Prices only fall, so no trade is worth making.' }
    ],
    constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
    optimal: ['greedy'], accepted: ['array', 'dp'], plausible: [],
    why: 'Track the cheapest price seen so far and the best profit against it, in a single sweep.'
  },
  {
    id: 217, title: 'Contains Duplicate', difficulty: 'Easy',
    statement: `Given an integer array, decide whether any value appears more than once.

Return true if some value occurs at least twice, and false if every element is distinct.`,
    examples: [
      { input: 'nums = [1,2,3,1]', output: 'true' },
      { input: 'nums = [1,2,3,4]', output: 'false' }
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    optimal: ['hashmap'], accepted: ['array', 'sorting'], plausible: [],
    why: 'A set answers it in O(n). Sorting first gets there too, at O(n log n).'
  },
  {
    id: 238, title: 'Product of Array Except Self', difficulty: 'Medium',
    statement: `Given an integer array, return an array where each position holds the product of every element except the one at that position.

Your algorithm must run in O(n) time, and you are not allowed to use the division operator.`,
    examples: [
      { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' },
      { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]', note: 'Every product that includes the zero is zero; only position 2 skips it.' }
    ],
    constraints: ['2 <= nums.length <= 10^5', '-30 <= nums[i] <= 30', 'Every prefix or suffix product fits in a 32-bit integer', 'O(n) time, and division is not allowed'],
    optimal: ['prefix-sum'], accepted: ['array'], plausible: ['math'],
    why: 'Running products from the left, then from the right: prefix and suffix scans in disguise.'
  },
  {
    id: 53, title: 'Maximum Subarray', difficulty: 'Medium',
    statement: `Given an integer array, find the contiguous run of at least one element that has the largest sum, and return that sum.`,
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', note: 'The run [4,-1,2,1] sums to 6.' },
      { input: 'nums = [-2,-1]', output: '-1', note: 'All negative, so the best run is the single largest element.' }
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    optimal: ['dp'], accepted: ['greedy', 'array'], plausible: ['divide-conquer'],
    why: 'Kadane’s: best-ending-here is a one-state DP recurrence. Divide and conquer solves it in O(n log n).'
  },
  {
    id: 56, title: 'Merge Intervals', difficulty: 'Medium',
    statement: `You are given a list of intervals, each written as [start, end].

Merge every group of overlapping intervals and return the resulting list, which must cover exactly the same points with no two intervals touching.`,
    examples: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]', note: '[1,3] and [2,6] overlap, so they collapse into [1,6].' },
      { input: 'intervals = [[1,4],[4,5]]', output: '[[1,5]]', note: 'Touching at a single point counts as overlapping.' }
    ],
    constraints: ['1 <= intervals.length <= 10^4', 'intervals[i].length == 2', '0 <= start <= end <= 10^4'],
    optimal: ['intervals'], accepted: ['sorting', 'array'], plausible: [],
    why: 'Sort by start, then either extend the open interval or emit it. The sweep is the whole trick.'
  },
  {
    id: 57, title: 'Insert Interval', difficulty: 'Medium',
    statement: `You are given a list of non-overlapping intervals sorted by start time, plus one new interval.

Insert the new interval in the right place, merging anything it overlaps, and return the resulting list still sorted and still non-overlapping.`,
    examples: [
      { input: 'intervals = [[1,3],[6,9]], newInterval = [2,5]', output: '[[1,5],[6,9]]' },
      { input: 'intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]', output: '[[1,2],[3,10],[12,16]]', note: 'The new interval swallows [3,5], [6,7] and [8,10].' }
    ],
    constraints: ['0 <= intervals.length <= 10^4', 'intervals is sorted by start and has no overlaps', '0 <= start <= end <= 10^5'],
    optimal: ['intervals'], accepted: ['array', 'greedy'], plausible: ['binary-search'],
    why: 'Three phases in one pass: everything before, everything overlapping, everything after. The input is already sorted, so no sort is needed.'
  },
  {
    id: 15, title: '3Sum', difficulty: 'Medium',
    statement: `Given an integer array, find every triple of distinct positions whose values sum to zero.

The returned list must not contain duplicate triples, though the same value may appear more than once in the input.`,
    examples: [
      { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]', note: 'The two -1 values sit at different positions, so [-1,-1,2] is legal.' },
      { input: 'nums = [0,1,1]', output: '[]', note: 'No triple sums to zero.' }
    ],
    constraints: ['3 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5'],
    optimal: ['two-pointers'], accepted: ['sorting', 'array'], plausible: ['hashmap'],
    why: 'Sort, fix one element, then close in from both ends. Deduplication falls out of the sorted order for free.'
  },
  {
    id: 11, title: 'Container With Most Water', difficulty: 'Medium',
    statement: `Each entry of an array is the height of a vertical line drawn at that index.

Pick two lines so that, together with the x-axis, they hold as much water as possible, and return that amount. The container may not be tilted.`,
    examples: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49', note: 'The lines at index 1 and index 8 are 7 apart and the shorter is 7, giving 7 x 7.' },
      { input: 'height = [1,1]', output: '1' }
    ],
    constraints: ['n == height.length', '2 <= n <= 10^5', '0 <= height[i] <= 10^4'],
    optimal: ['two-pointers'], accepted: ['greedy', 'array'], plausible: [],
    why: 'Start at the widest pair and always move the shorter wall inward, since that is the only move that can ever improve the area.'
  },
  {
    id: 42, title: 'Trapping Rain Water', difficulty: 'Hard',
    statement: `An array gives an elevation map where every bar is one unit wide.

After it rains, compute how many units of water settle in the dips between the bars.`,
    examples: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' },
      { input: 'height = [4,2,0,3,2,5]', output: '9' }
    ],
    constraints: ['n == height.length', '1 <= n <= 2 * 10^4', '0 <= height[i] <= 10^5'],
    optimal: ['two-pointers'], accepted: ['monotonic', 'dp', 'prefix-sum'], plausible: ['stack'],
    why: 'Converging pointers do it in O(1) space. Prefix-maximum arrays or a monotonic stack also run in O(n), but cost O(n) space.'
  },
  {
    id: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium',
    statement: `Given a string, find the length of the longest contiguous stretch that contains no repeated character.`,
    examples: [
      { input: 's = "abcabcbb"', output: '3', note: 'The answer is "abc".' },
      { input: 's = "pwwkew"', output: '3', note: '"wke" counts; "pwke" does not, because it is a subsequence rather than a substring.' }
    ],
    constraints: ['0 <= s.length <= 10^5', 's consists of English letters, digits, symbols and spaces'],
    optimal: ['sliding-window'], accepted: ['hashmap', 'string'], plausible: ['two-pointers'],
    why: 'Grow the window to the right and jump the left edge past the previous occurrence of the offending character.'
  },
  {
    id: 76, title: 'Minimum Window Substring', difficulty: 'Hard',
    statement: `Given strings s and t, find the shortest contiguous slice of s that contains every character of t, including repeats.

If no such slice exists, return the empty string. The answer is guaranteed to be unique.`,
    examples: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' },
      { input: 's = "a", t = "aa"', output: '""', note: 's has only one a, so it can never cover two.' }
    ],
    constraints: ['m == s.length, n == t.length', '1 <= m, n <= 10^5', 's and t consist of uppercase and lowercase English letters'],
    optimal: ['sliding-window'], accepted: ['hashmap', 'string'], plausible: ['two-pointers'],
    why: 'Expand until the window is valid, contract while it stays valid, and record the best as you go.'
  },
  {
    id: 424, title: 'Longest Repeating Character Replacement', difficulty: 'Medium',
    statement: `You are given a string of uppercase letters and an integer k. You may change at most k characters to any other uppercase letter.

Return the length of the longest run of one repeated letter you can produce.`,
    examples: [
      { input: 's = "ABAB", k = 2', output: '4', note: 'Turn both A characters into B, or both B into A.' },
      { input: 's = "AABABBA", k = 1', output: '4', note: 'Change the one A in "ABBA" to get "BBBB".' }
    ],
    constraints: ['1 <= s.length <= 10^5', 's consists of uppercase English letters only', '0 <= k <= s.length'],
    optimal: ['sliding-window'], accepted: ['string', 'hashmap'], plausible: ['greedy'],
    why: 'A window is legal while its length minus the count of its most frequent letter stays within k.'
  },
  {
    id: 242, title: 'Valid Anagram', difficulty: 'Easy',
    statement: `Given two strings, decide whether one is a rearrangement of the other.

Both strings must use exactly the same letters the same number of times.`,
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true' },
      { input: 's = "rat", t = "car"', output: 'false' }
    ],
    constraints: ['1 <= s.length, t.length <= 5 * 10^4', 's and t consist of lowercase English letters'],
    optimal: ['hashmap'], accepted: ['string', 'sorting'], plausible: [],
    why: 'Counting letters is O(n). Sorting both strings is the O(n log n) fallback.'
  },
  {
    id: 49, title: 'Group Anagrams', difficulty: 'Medium',
    statement: `Given a list of strings, group together the ones that are rearrangements of each other.

Return the groups in any order, and the strings within each group in any order.`,
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { input: 'strs = ["",""]', output: '[["",""]]' }
    ],
    constraints: ['1 <= strs.length <= 10^4', '0 <= strs[i].length <= 100', 'strs[i] consists of lowercase English letters'],
    optimal: ['hashmap'], accepted: ['string', 'sorting'], plausible: [],
    why: 'Key each word by its letter-count signature, then bucket by that key.'
  },
  {
    id: 20, title: 'Valid Parentheses', difficulty: 'Easy',
    statement: `A string contains only the characters ( ) [ ] { }.

Decide whether the brackets are balanced: every opener is closed by the matching type, and closers arrive in the correct order.`,
    examples: [
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "([)]"', output: 'false', note: 'The types interleave instead of nesting.' }
    ],
    constraints: ['1 <= s.length <= 10^4', 's consists of the characters ()[]{} only'],
    optimal: ['stack'], accepted: ['string'], plausible: [],
    why: 'Push openers, pop and match on closers. Nothing else models nesting this cleanly.'
  },
  {
    id: 155, title: 'Min Stack', difficulty: 'Medium',
    statement: `Design a stack that supports push, pop, reading the top element, and reading the smallest element currently held.

Every one of those four operations must run in O(1) time.`,
    examples: [
      { input: 'push(-2), push(0), push(-3), getMin()', output: '-3' },
      { input: '...then pop(), top(), getMin()', output: 'top = 0, getMin = -2' }
    ],
    constraints: ['-2^31 <= val <= 2^31 - 1', 'pop, top and getMin are only called on a non-empty stack', 'At most 3 * 10^4 calls in total', 'All four operations must be O(1)'],
    optimal: ['design'], accepted: ['stack'], plausible: [],
    why: 'The real question is what to store alongside each element so the minimum survives a pop, which makes it a design problem.'
  },
  {
    id: 739, title: 'Daily Temperatures', difficulty: 'Medium',
    statement: `Given a list of daily temperatures, produce an array where each position says how many days you must wait for a warmer temperature.

If no warmer day ever comes, put 0 in that position.`,
    examples: [
      { input: 'temperatures = [73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]' },
      { input: 'temperatures = [30,40,50,60]', output: '[1,1,1,0]' }
    ],
    constraints: ['1 <= temperatures.length <= 10^5', '30 <= temperatures[i] <= 100'],
    optimal: ['monotonic'], accepted: ['stack', 'array'], plausible: [],
    why: 'A decreasing stack of indices resolves each waiting day the moment a warmer reading arrives.'
  },
  {
    id: 84, title: 'Largest Rectangle in Histogram', difficulty: 'Hard',
    statement: `An array gives the heights of bars in a histogram, each one unit wide.

Find the area of the largest rectangle that fits entirely inside the histogram.`,
    examples: [
      { input: 'heights = [2,1,5,6,2,3]', output: '10', note: 'The bars of height 5 and 6 give a 2-wide rectangle of height 5.' },
      { input: 'heights = [2,4]', output: '4' }
    ],
    constraints: ['1 <= heights.length <= 10^5', '0 <= heights[i] <= 10^4'],
    optimal: ['monotonic'], accepted: ['stack', 'array'], plausible: ['divide-conquer'],
    why: 'An increasing stack hands every bar its left and right boundaries in a single pass.'
  },
  {
    id: 150, title: 'Evaluate Reverse Polish Notation', difficulty: 'Medium',
    statement: `Evaluate an arithmetic expression written in reverse Polish (postfix) notation.

Operators are +, -, * and /. Division truncates toward zero. The expression is always valid.`,
    examples: [
      { input: 'tokens = ["2","1","+","3","*"]', output: '9', note: 'That is (2 + 1) * 3.' },
      { input: 'tokens = ["4","13","5","/","+"]', output: '6', note: 'That is 4 + (13 / 5), and 13 / 5 truncates to 2.' }
    ],
    constraints: ['1 <= tokens.length <= 10^4', 'Each token is +, -, * , / or an integer in [-200, 200]', 'The expression is always a valid postfix expression'],
    optimal: ['stack'], accepted: ['math', 'array'], plausible: [],
    why: 'Postfix evaluation is the canonical stack exercise: push operands, pop two whenever an operator arrives.'
  },
  {
    id: 704, title: 'Binary Search', difficulty: 'Easy',
    statement: `Given a sorted array of distinct integers and a target, return the index of the target, or -1 if it is absent.

Your algorithm must run in O(log n) time.`,
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1' }
    ],
    constraints: ['1 <= nums.length <= 10^4', '-10^4 < nums[i], target < 10^4', 'All values are unique and sorted in ascending order', 'O(log n) runtime required'],
    optimal: ['binary-search'], accepted: ['array'], plausible: [],
    why: 'The runtime bound names the technique outright.'
  },
  {
    id: 33, title: 'Search in Rotated Sorted Array', difficulty: 'Medium',
    statement: `An ascending array of distinct integers was rotated at some unknown pivot before you received it.

Given a target, return its index or -1. Your algorithm must run in O(log n) time.`,
    examples: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' },
      { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1' }
    ],
    constraints: ['1 <= nums.length <= 5000', '-10^4 <= nums[i] <= 10^4', 'All values are unique', 'nums is an ascending array rotated at some pivot', 'O(log n) runtime required'],
    optimal: ['binary-search'], accepted: ['array'], plausible: [],
    why: 'One half of every split is still sorted. Work out which half that is, then decide where the target can live.'
  },
  {
    id: 153, title: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium',
    statement: `An ascending array of distinct integers was rotated some number of times.

Return its smallest element, in O(log n) time.`,
    examples: [
      { input: 'nums = [3,4,5,1,2]', output: '1', note: 'The original array was rotated three positions.' },
      { input: 'nums = [11,13,15,17]', output: '11', note: 'Rotated a full turn, so it is already sorted.' }
    ],
    constraints: ['n == nums.length', '1 <= n <= 5000', '-5000 <= nums[i] <= 5000', 'All values are unique', 'O(log n) runtime required'],
    optimal: ['binary-search'], accepted: ['array'], plausible: [],
    why: 'Compare the middle against the right end to learn which side still holds the rotation point.'
  },
  {
    id: 875, title: 'Koko Eating Bananas', difficulty: 'Medium',
    statement: `There are piles of bananas and h hours before the guards return. Koko picks one eating speed k, in bananas per hour, and keeps it for the whole time.

Each hour she picks a pile and eats k bananas from it; if the pile is smaller she finishes it and waits out the hour. Return the smallest k that clears every pile within h hours.`,
    examples: [
      { input: 'piles = [3,6,7,11], h = 8', output: '4' },
      { input: 'piles = [30,11,23,4,20], h = 5', output: '30', note: 'With only 5 hours and 5 piles she must finish the largest in one hour.' }
    ],
    constraints: ['1 <= piles.length <= 10^4', 'piles.length <= h <= 10^9', '1 <= piles[i] <= 10^9'],
    optimal: ['binary-search'], accepted: ['greedy', 'array'], plausible: ['math'],
    why: 'Binary search over the answer itself: if speed k works then every larger speed works, so feasibility is monotonic.'
  },
  {
    id: 4, title: 'Median of Two Sorted Arrays', difficulty: 'Hard',
    statement: `You are given two sorted arrays. Return the median of the combined collection.

Your algorithm must run in O(log(m + n)) time.`,
    examples: [
      { input: 'nums1 = [1,3], nums2 = [2]', output: '2.00000', note: 'Merged the arrays are [1,2,3].' },
      { input: 'nums1 = [1,2], nums2 = [3,4]', output: '2.50000', note: 'Merged they are [1,2,3,4], so the median is (2 + 3) / 2.' }
    ],
    constraints: ['nums1.length == m, nums2.length == n', '0 <= m <= 1000, 0 <= n <= 1000', '1 <= m + n <= 2000', '-10^6 <= values <= 10^6', 'O(log(m + n)) runtime required'],
    optimal: ['binary-search'], accepted: ['divide-conquer', 'array'], plausible: ['two-pointers'],
    why: 'Binary search the partition point of the shorter array until both halves balance. Merging would be O(m + n).'
  },
  {
    id: 206, title: 'Reverse Linked List', difficulty: 'Easy',
    statement: `Given the head of a singly linked list, reverse it and return the new head.`,
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
      { input: 'head = []', output: '[]' }
    ],
    constraints: ['The number of nodes is in [0, 5000]', '-5000 <= Node.val <= 5000'],
    optimal: ['linked-list'], accepted: ['two-pointers'], plausible: ['stack'],
    why: 'Pointer rewiring with prev, curr and next. Iterative or recursive, it is list surgery either way.'
  },
  {
    id: 21, title: 'Merge Two Sorted Lists', difficulty: 'Easy',
    statement: `You are given the heads of two sorted linked lists.

Splice them into one sorted list by relinking the existing nodes, and return its head.`,
    examples: [
      { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]' },
      { input: 'list1 = [], list2 = [0]', output: '[0]' }
    ],
    constraints: ['The number of nodes in each list is in [0, 50]', '-100 <= Node.val <= 100', 'Both lists are sorted in non-decreasing order'],
    optimal: ['linked-list'], accepted: ['two-pointers'], plausible: ['divide-conquer'],
    why: 'Walk both lists behind a dummy head, always attaching whichever node is smaller.'
  },
  {
    id: 141, title: 'Linked List Cycle', difficulty: 'Easy',
    statement: `Given the head of a linked list, decide whether it contains a cycle.

A cycle exists if some node can be reached again by continuously following next pointers. Return true if there is one.`,
    examples: [
      { input: 'head = [3,2,0,-4], pos = 1', output: 'true', note: 'The tail links back to the node at index 1.' },
      { input: 'head = [1], pos = -1', output: 'false', note: 'pos = -1 means the tail points at null.' }
    ],
    constraints: ['The number of nodes is in [0, 10^4]', '-10^5 <= Node.val <= 10^5', 'pos is -1 or a valid index', 'Follow-up: solve it using O(1) memory'],
    optimal: ['two-pointers'], accepted: ['linked-list'], plausible: ['hashmap'],
    why: 'Floyd’s fast and slow pointers do it in O(1) space. A visited set also works but costs O(n).'
  },
  {
    id: 143, title: 'Reorder List', difficulty: 'Medium',
    statement: `You are given the head of a singly linked list. Reorder it so the nodes run first, last, second, second-to-last, third, and so on.

You may not change any node's value; only the links may be rearranged.`,
    examples: [
      { input: 'head = [1,2,3,4]', output: '[1,4,2,3]' },
      { input: 'head = [1,2,3,4,5]', output: '[1,5,2,4,3]' }
    ],
    constraints: ['The number of nodes is in [1, 5 * 10^4]', '1 <= Node.val <= 1000', 'Node values may not be modified'],
    optimal: ['linked-list'], accepted: ['two-pointers', 'stack'], plausible: [],
    why: 'Find the middle, reverse the back half, then zip the two halves together. Three list routines stacked.'
  },
  {
    id: 23, title: 'Merge k Sorted Lists', difficulty: 'Hard',
    statement: `You are given an array of k linked lists, each sorted in ascending order.

Merge all of them into a single sorted linked list and return its head.`,
    examples: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' },
      { input: 'lists = []', output: '[]' }
    ],
    constraints: ['k == lists.length', '0 <= k <= 10^4', '0 <= lists[i].length <= 500', '-10^4 <= lists[i][j] <= 10^4', 'The sum of all list lengths will not exceed 10^4'],
    optimal: ['heap'], accepted: ['linked-list', 'divide-conquer'], plausible: [],
    why: 'A k-sized min-heap of list heads gives O(N log k). Merging lists pairwise reaches the same bound by recursion.'
  },
  {
    id: 146, title: 'LRU Cache', difficulty: 'Medium',
    statement: `Design a cache with a fixed capacity that evicts the least recently used key when it overflows.

get returns a key's value or -1 if absent. put inserts or updates a key. Both count as a use. Both must run in O(1) average time.`,
    examples: [
      { input: 'capacity = 2; put(1,1), put(2,2), get(1)', output: '1' },
      { input: '...then put(3,3), get(2)', output: '-1', note: 'Adding key 3 evicted key 2, which was the least recently used.' }
    ],
    constraints: ['1 <= capacity <= 3000', '0 <= key <= 10^4', '0 <= value <= 10^5', 'At most 2 * 10^5 calls to get and put', 'get and put must run in O(1) average time'],
    optimal: ['design'], accepted: ['hashmap', 'linked-list'], plausible: [],
    why: 'A hash map pointing into a doubly linked list. The composition of the two structures is the entire answer.'
  },
  {
    id: 226, title: 'Invert Binary Tree', difficulty: 'Easy',
    statement: `Given the root of a binary tree, mirror it by swapping every node's left and right child, then return the root.`,
    examples: [
      { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' },
      { input: 'root = []', output: '[]' }
    ],
    constraints: ['The number of nodes is in [0, 100]', '-100 <= Node.val <= 100'],
    optimal: ['tree'], accepted: ['dfs', 'bfs'], plausible: [],
    why: 'Swap the children at every node, in whatever traversal order you like.'
  },
  {
    id: 104, title: 'Maximum Depth of Binary Tree', difficulty: 'Easy',
    statement: `Return the maximum depth of a binary tree, meaning the number of nodes along the longest path from the root down to a leaf.`,
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '3' },
      { input: 'root = [1,null,2]', output: '2' }
    ],
    constraints: ['The number of nodes is in [0, 10^4]', '-100 <= Node.val <= 100'],
    optimal: ['tree'], accepted: ['dfs', 'bfs'], plausible: [],
    why: 'Depth is one plus the deeper of the two subtrees. Counting levels breadth-first works equally well.'
  },
  {
    id: 102, title: 'Binary Tree Level Order Traversal', difficulty: 'Medium',
    statement: `Return the values of a binary tree level by level, from the root downward, reading each level left to right.

The result is a list of lists, one per level.`,
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' },
      { input: 'root = [1]', output: '[[1]]' }
    ],
    constraints: ['The number of nodes is in [0, 2000]', '-1000 <= Node.val <= 1000'],
    optimal: ['bfs'], accepted: ['tree', 'queue'], plausible: ['dfs'],
    why: 'A queue drained one level at a time. DFS carrying a depth index also groups nodes correctly.'
  },
  {
    id: 98, title: 'Validate Binary Search Tree', difficulty: 'Medium',
    statement: `Decide whether a binary tree is a valid binary search tree.

Every node in a left subtree must be strictly smaller than its ancestor, and every node in a right subtree strictly larger. The rule applies to whole subtrees, not just to direct children.`,
    examples: [
      { input: 'root = [2,1,3]', output: 'true' },
      { input: 'root = [5,1,4,null,null,3,6]', output: 'false', note: 'The 3 is in the right subtree of 5 but is smaller than 5.' }
    ],
    constraints: ['The number of nodes is in [1, 10^4]', '-2^31 <= Node.val <= 2^31 - 1'],
    optimal: ['bst'], accepted: ['dfs', 'tree'], plausible: ['bfs'],
    why: 'Carry a (min, max) bound down the tree, or check that the in-order traversal comes out strictly increasing.'
  },
  {
    id: 230, title: 'Kth Smallest Element in a BST', difficulty: 'Medium',
    statement: `Given the root of a binary search tree and an integer k, return the kth smallest value in the tree, counting from 1.`,
    examples: [
      { input: 'root = [3,1,4,null,2], k = 1', output: '1' },
      { input: 'root = [5,3,6,2,4,null,null,1], k = 3', output: '3' }
    ],
    constraints: ['n == the number of nodes', '1 <= k <= n <= 10^4', '0 <= Node.val <= 10^4'],
    optimal: ['bst'], accepted: ['dfs', 'tree'], plausible: ['heap'],
    why: 'In-order traversal visits a BST in sorted order, so you can stop the moment you reach the kth node.'
  },
  {
    id: 235, title: 'Lowest Common Ancestor of a Binary Search Tree', difficulty: 'Medium',
    statement: `Given a binary search tree and two nodes in it, return their lowest common ancestor.

A node counts as a descendant of itself.`,
    examples: [
      { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8', output: '6' },
      { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4', output: '2', note: 'A node may be an ancestor of itself.' }
    ],
    constraints: ['The number of nodes is in [2, 10^5]', '-10^9 <= Node.val <= 10^9', 'All values are unique, p != q, and both exist in the tree'],
    optimal: ['bst'], accepted: ['tree', 'dfs'], plausible: [],
    why: 'Walk down while both targets sit on the same side. The first node that splits them is the answer.'
  },
  {
    id: 105, title: 'Construct Binary Tree from Preorder and Inorder Traversal', difficulty: 'Medium',
    statement: `Given the preorder and inorder traversals of a binary tree with unique values, rebuild the tree and return its root.`,
    examples: [
      { input: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]', output: '[3,9,20,null,null,15,7]' },
      { input: 'preorder = [-1], inorder = [-1]', output: '[-1]' }
    ],
    constraints: ['1 <= preorder.length <= 3000', 'inorder.length == preorder.length', '-3000 <= values <= 3000', 'All values are unique and both arrays describe the same tree'],
    optimal: ['tree'], accepted: ['divide-conquer', 'hashmap'], plausible: ['dfs'],
    why: 'Preorder hands you the root; inorder splits what remains into a left and a right subproblem.'
  },
  {
    id: 124, title: 'Binary Tree Maximum Path Sum', difficulty: 'Hard',
    statement: `A path is any sequence of nodes connected by edges, where no node appears twice. It does not need to pass through the root.

Return the largest sum of node values along any path in the tree.`,
    examples: [
      { input: 'root = [1,2,3]', output: '6', note: 'The path 2 -> 1 -> 3 sums to 6.' },
      { input: 'root = [-10,9,20,null,null,15,7]', output: '42', note: 'The path 15 -> 20 -> 7 sums to 42 and skips the root entirely.' }
    ],
    constraints: ['The number of nodes is in [1, 3 * 10^4]', '-1000 <= Node.val <= 1000'],
    optimal: ['dfs'], accepted: ['tree', 'dp'], plausible: [],
    why: 'Each node returns its best single downward arm while quietly updating a global best for the path that bends through it.'
  },
  {
    id: 297, title: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard',
    statement: `Write two functions: one that encodes a binary tree as a string, and one that rebuilds the identical tree from that string.

You may choose any encoding you like, as long as the round trip is faithful.`,
    examples: [
      { input: 'root = [1,2,3,null,null,4,5]', output: '[1,2,3,null,null,4,5]', note: 'The tree that comes back must match the tree that went in.' },
      { input: 'root = []', output: '[]' }
    ],
    constraints: ['The number of nodes is in [0, 10^4]', '-1000 <= Node.val <= 1000', 'Any encoding is allowed, as long as it round-trips'],
    optimal: ['design'], accepted: ['tree', 'dfs', 'bfs'], plausible: ['string'],
    why: 'Choosing the encoding, with its null markers and traversal order, is the whole of the work.'
  },
  {
    id: 208, title: 'Implement Trie (Prefix Tree)', difficulty: 'Medium',
    statement: `Implement a prefix tree supporting three operations: insert a word, search for an exact word, and test whether any stored word starts with a given prefix.`,
    examples: [
      { input: 'insert("apple"), search("apple")', output: 'true' },
      { input: 'search("app"), startsWith("app")', output: 'false, then true', note: '"app" was never inserted, but it is a prefix of "apple".' }
    ],
    constraints: ['1 <= word.length, prefix.length <= 2000', 'Words and prefixes consist of lowercase English letters', 'At most 3 * 10^4 calls in total'],
    optimal: ['trie'], accepted: ['design', 'string'], plausible: ['hashmap'],
    why: 'Prefix queries are the exact thing a trie exists to answer.'
  },
  {
    id: 212, title: 'Word Search II', difficulty: 'Hard',
    statement: `You are given a grid of letters and a list of words. A word is present if it can be spelled by walking through horizontally or vertically adjacent cells, using each cell at most once per word.

Return every word from the list that appears in the grid.`,
    examples: [
      { input: 'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]', output: '["eat","oath"]' },
      { input: 'board = [["a","b"],["c","d"]], words = ["abcb"]', output: '[]', note: 'The b would have to be reused.' }
    ],
    constraints: ['m == board.length, n == board[i].length', '1 <= m, n <= 12', '1 <= words.length <= 3 * 10^4', '1 <= words[i].length <= 10', 'All letters are lowercase English letters'],
    optimal: ['trie'], accepted: ['backtracking', 'dfs', 'matrix'], plausible: [],
    why: 'Up to 30,000 words makes one search per word hopeless. A trie prunes the grid search so a single DFS handles them all at once.'
  },
  {
    id: 211, title: 'Design Add and Search Words Data Structure', difficulty: 'Medium',
    statement: `Design a structure that stores words and answers search queries, where a dot in the query matches any single letter.

addWord inserts a word. search returns true if any stored word matches the pattern.`,
    examples: [
      { input: 'addWord("bad"), addWord("dad"), search("pad")', output: 'false' },
      { input: 'search("b.."), search(".ad")', output: 'true, then true' }
    ],
    constraints: ['1 <= word.length <= 25', 'Added words consist of lowercase English letters', 'Search patterns may also contain dots', 'At most 2 dots appear in any search pattern', 'At most 10^4 calls in total'],
    optimal: ['trie'], accepted: ['design', 'dfs'], plausible: ['backtracking'],
    why: 'A dot means branching into every child at that level, which is a trie walk with DFS on top.'
  },
  {
    id: 215, title: 'Kth Largest Element in an Array', difficulty: 'Medium',
    statement: `Given an unsorted integer array and an integer k, return the kth largest element.

This is the kth largest by sorted position, not the kth distinct value.`,
    examples: [
      { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' },
      { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', output: '4', note: 'Duplicates each occupy their own position.' }
    ],
    constraints: ['1 <= k <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    optimal: ['heap'], accepted: ['sorting', 'divide-conquer'], plausible: ['binary-search'],
    why: 'A size-k heap gives O(n log k). Quickselect averages O(n) by partitioning like quicksort but recursing on one side only.'
  },
  {
    id: 347, title: 'Top K Frequent Elements', difficulty: 'Medium',
    statement: `Given an integer array and an integer k, return the k values that appear most often. You may return them in any order.`,
    examples: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' },
      { input: 'nums = [1], k = 1', output: '[1]' }
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', 'k is in the range [1, number of distinct values]', 'The answer is guaranteed to be unique', 'Follow-up: do better than O(n log n)'],
    optimal: ['heap'], accepted: ['hashmap', 'sorting', 'array'], plausible: [],
    why: 'Count, then keep the best k in a heap. Bucketing by frequency beats even that, at O(n).'
  },
  {
    id: 295, title: 'Find Median from Data Stream', difficulty: 'Hard',
    statement: `Numbers arrive one at a time. Design a structure that accepts each new number and can report the median of everything seen so far at any moment.

With an even count, the median is the average of the two middle values.`,
    examples: [
      { input: 'addNum(1), addNum(2), findMedian()', output: '1.5' },
      { input: 'addNum(3), findMedian()', output: '2.0' }
    ],
    constraints: ['-10^5 <= num <= 10^5', 'findMedian is only called after at least one addNum', 'At most 5 * 10^4 calls in total'],
    optimal: ['heap'], accepted: ['design'], plausible: ['binary-search', 'sorting'],
    why: 'Two heaps balanced around the middle keep the median sitting right at their tops. Re-sorting on every insert would be far too slow.'
  },
  {
    id: 621, title: 'Task Scheduler', difficulty: 'Medium',
    statement: `You have a list of CPU tasks labelled by letter, and a cooldown n. Two runs of the same task must be separated by at least n intervals.

Each interval either runs one task or sits idle. Return the fewest intervals needed to finish every task.`,
    examples: [
      { input: 'tasks = ["A","A","A","B","B","B"], n = 2', output: '8', note: 'A B idle A B idle A B.' },
      { input: 'tasks = ["A","A","A","B","B","B"], n = 0', output: '6', note: 'No cooldown, so no idling.' }
    ],
    constraints: ['1 <= tasks.length <= 10^4', 'tasks[i] is an uppercase English letter', '0 <= n <= 100'],
    optimal: ['greedy'], accepted: ['heap', 'hashmap', 'math'], plausible: [],
    why: 'The most frequent task sets the skeleton and everything else fills the gaps, so a closed-form count settles it.'
  },
  {
    id: 78, title: 'Subsets', difficulty: 'Medium',
    statement: `Given an array of distinct integers, return every possible subset, including the empty one.

The answer may be in any order but must contain no duplicate subsets.`,
    examples: [
      { input: 'nums = [1,2,3]', output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' },
      { input: 'nums = [0]', output: '[[],[0]]' }
    ],
    constraints: ['1 <= nums.length <= 10', '-10 <= nums[i] <= 10', 'All values are unique'],
    optimal: ['backtracking'], accepted: ['bitmask'], plausible: ['dp'],
    why: 'Include-or-exclude recursion. Note n <= 10: iterating every bitmask from 0 to 2^n - 1 enumerates exactly the same thing.'
  },
  {
    id: 39, title: 'Combination Sum', difficulty: 'Medium',
    statement: `Given an array of distinct integers and a target, return every unique combination of candidates that sums to the target.

The same candidate may be reused any number of times. Two combinations differing only in order count as the same.`,
    examples: [
      { input: 'candidates = [2,3,6,7], target = 7', output: '[[2,2,3],[7]]' },
      { input: 'candidates = [2], target = 1', output: '[]' }
    ],
    constraints: ['1 <= candidates.length <= 30', '2 <= candidates[i] <= 40', 'All candidates are distinct', '1 <= target <= 40'],
    optimal: ['backtracking'], accepted: ['dfs'], plausible: ['dp'],
    why: 'Recurse on the same index to permit reuse, and undo the choice on the way back out.'
  },
  {
    id: 46, title: 'Permutations', difficulty: 'Medium',
    statement: `Given an array of distinct integers, return every possible ordering of them, in any order.`,
    examples: [
      { input: 'nums = [1,2,3]', output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]' },
      { input: 'nums = [0,1]', output: '[[0,1],[1,0]]' }
    ],
    constraints: ['1 <= nums.length <= 6', '-10 <= nums[i] <= 10', 'All values are unique'],
    optimal: ['backtracking'], accepted: ['dfs'], plausible: ['bitmask'],
    why: 'Swap or mark-as-used, recurse, then undo. n <= 6 because the output itself is factorial in size.'
  },
  {
    id: 51, title: 'N-Queens', difficulty: 'Hard',
    statement: `Place n queens on an n by n chessboard so that no two attack each other along a row, column, or diagonal.

Return every distinct solution, each drawn as a list of strings using 'Q' and '.'.`,
    examples: [
      { input: 'n = 4', output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' },
      { input: 'n = 1', output: '[["Q"]]' }
    ],
    constraints: ['1 <= n <= 9'],
    optimal: ['backtracking'], accepted: ['dfs', 'matrix'], plausible: ['bitmask'],
    why: 'Place one queen per row against running constraint sets, abandoning a branch the instant it conflicts.'
  },
  {
    id: 139, title: 'Word Break', difficulty: 'Medium',
    statement: `Given a string and a dictionary of words, decide whether the string can be cut into a sequence of dictionary words.

Words may be reused as often as you like, and the whole string must be consumed.`,
    examples: [
      { input: 's = "leetcode", wordDict = ["leet","code"]', output: 'true' },
      { input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', output: 'false' }
    ],
    constraints: ['1 <= s.length <= 300', '1 <= wordDict.length <= 1000', '1 <= wordDict[i].length <= 20', 'All dictionary words are unique'],
    optimal: ['dp'], accepted: ['string', 'trie', 'dfs'], plausible: ['backtracking'],
    why: 'Whether a prefix is breakable depends on earlier positions, so memoize or the plain recursion blows up exponentially.'
  },
  {
    id: 200, title: 'Number of Islands', difficulty: 'Medium',
    statement: `You are given a grid where '1' is land and '0' is water.

Count the islands, where an island is a group of land cells connected horizontally or vertically. The grid is surrounded by water on all sides.`,
    examples: [
      { input: 'grid = [["1","1","0"],["1","1","0"],["0","0","1"]]', output: '2' },
      { input: 'grid = [["1","1","1"],["0","1","0"],["1","0","0"]]', output: '2', note: 'Diagonal contact does not connect cells.' }
    ],
    constraints: ['m == grid.length, n == grid[i].length', '1 <= m, n <= 300', "grid[i][j] is '0' or '1'"],
    optimal: ['dfs'], accepted: ['bfs', 'graph', 'matrix', 'union-find'], plausible: [],
    why: 'Flood-fill from each unvisited land cell and count how many fills you start. Union-find counts the same components.'
  },
  {
    id: 133, title: 'Clone Graph', difficulty: 'Medium',
    statement: `Given a reference to a node in a connected undirected graph, return a deep copy of the whole graph.

Each node holds a value and a list of neighbours. The copy must share no nodes with the original.`,
    examples: [
      { input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', output: '[[2,4],[1,3],[2,4],[1,3]]', note: 'Four nodes in a cycle; the returned graph has the same shape but new nodes.' },
      { input: 'adjList = [[]]', output: '[[]]', note: 'One node with no neighbours.' }
    ],
    constraints: ['The number of nodes is in [0, 100]', '1 <= Node.val <= 100', 'Values are unique, there are no repeated edges and no self-loops', 'The graph is connected'],
    optimal: ['graph'], accepted: ['dfs', 'bfs', 'hashmap'], plausible: [],
    why: 'Traverse once while keeping an old-node to new-node map, so cycles resolve instead of looping forever.'
  },
  {
    id: 207, title: 'Course Schedule', difficulty: 'Medium',
    statement: `There are numCourses courses labelled 0 to numCourses - 1, and a list of prerequisite pairs. The pair [a, b] means you must take b before a.

Decide whether it is possible to finish every course.`,
    examples: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true', note: 'Take course 0, then course 1.' },
      { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false', note: 'Each course requires the other, so neither can start.' }
    ],
    constraints: ['1 <= numCourses <= 2000', '0 <= prerequisites.length <= 5000', 'prerequisites[i].length == 2', '0 <= a, b < numCourses', 'All prerequisite pairs are distinct'],
    optimal: ['topo-sort'], accepted: ['graph', 'dfs', 'bfs'], plausible: [],
    why: 'It is cycle detection in a directed graph: Kahn’s algorithm peeling off zero-indegree nodes, or a DFS with colour marking.'
  },
  {
    id: 417, title: 'Pacific Atlantic Water Flow', difficulty: 'Medium',
    statement: `A grid of heights borders the Pacific Ocean on the top and left edges, and the Atlantic on the bottom and right edges.

Water flows from a cell to a neighbour of equal or lower height. Return every cell from which water can reach both oceans.`,
    examples: [
      { input: 'heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]', output: '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]' },
      { input: 'heights = [[1]]', output: '[[0,0]]', note: 'A single cell touches both oceans.' }
    ],
    constraints: ['m == heights.length, n == heights[r].length', '1 <= m, n <= 200', '0 <= heights[r][c] <= 10^5'],
    optimal: ['dfs'], accepted: ['bfs', 'matrix', 'graph'], plausible: [],
    why: 'Search inward from each coastline, marking what can drain there, then intersect the two reachable sets. Searching outward from every cell would be far slower.'
  },
  {
    id: 994, title: 'Rotting Oranges', difficulty: 'Medium',
    statement: `In a grid, 0 is empty, 1 is a fresh orange and 2 is a rotten one. Every minute, a rotten orange rots any fresh orange directly beside it.

Return the number of minutes until no fresh orange remains, or -1 if that never happens.`,
    examples: [
      { input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]', output: '4' },
      { input: 'grid = [[2,1,1],[0,1,1],[1,0,1]]', output: '-1', note: 'The orange in the bottom-left corner can never be reached.' }
    ],
    constraints: ['m == grid.length, n == grid[i].length', '1 <= m, n <= 10', 'grid[i][j] is 0, 1 or 2'],
    optimal: ['bfs'], accepted: ['matrix', 'queue', 'graph'], plausible: [],
    why: 'Multi-source BFS: every rotten orange starts in the queue at once, and the level count is the number of minutes.'
  },
  {
    id: 127, title: 'Word Ladder', difficulty: 'Hard',
    statement: `Given a start word, an end word, and a dictionary, transform the start into the end by changing one letter at a time. Every intermediate word must be in the dictionary.

Return the number of words in the shortest such chain, counting both ends, or 0 if there is none.`,
    examples: [
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: '5', note: 'hit -> hot -> dot -> dog -> cog.' },
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]', output: '0', note: '"cog" is not in the dictionary.' }
    ],
    constraints: ['1 <= beginWord.length <= 10', 'endWord.length == beginWord.length', '1 <= wordList.length <= 5000', 'All words are lowercase and the same length', 'beginWord != endWord and all words in wordList are unique'],
    optimal: ['bfs'], accepted: ['graph', 'string'], plausible: ['hashmap'],
    why: 'Shortest path on an unweighted graph of words is BFS by definition. DFS would find a chain, but not the shortest one.'
  },
  {
    id: 323, title: 'Number of Connected Components in an Undirected Graph', difficulty: 'Medium',
    statement: `You have n nodes labelled 0 to n - 1 and a list of undirected edges.

Return the number of connected components in the graph.`,
    examples: [
      { input: 'n = 5, edges = [[0,1],[1,2],[3,4]]', output: '2' },
      { input: 'n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]', output: '1' }
    ],
    constraints: ['1 <= n <= 2000', '1 <= edges.length <= 5000', 'edges[i].length == 2', 'There are no repeated edges and no self-loops'],
    optimal: ['union-find'], accepted: ['graph', 'dfs', 'bfs'], plausible: [],
    why: 'Union every edge and count the roots that survive. Building an adjacency list and running DFS ties it exactly.'
  },
  {
    id: 743, title: 'Network Delay Time', difficulty: 'Medium',
    statement: `You are given a directed weighted graph of n nodes, where each edge (u, v, w) means a signal takes w time to travel from u to v.

A signal is sent from node k. Return how long until every node has received it, or -1 if some node never does.`,
    examples: [
      { input: 'times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2', output: '2' },
      { input: 'times = [[1,2,1]], n = 2, k = 2', output: '-1', note: 'Node 1 cannot be reached from node 2.' }
    ],
    constraints: ['1 <= k <= n <= 100', '1 <= times.length <= 6000', '0 <= w <= 100', 'All (u, v) pairs are unique'],
    optimal: ['graph'], accepted: ['heap', 'bfs'], plausible: ['dp'],
    why: 'Weighted single-source shortest paths, then take the maximum. Dijkstra with a heap, or Bellman-Ford. Plain BFS ignores the weights.'
  },
  {
    id: 269, title: 'Alien Dictionary', difficulty: 'Hard',
    statement: `A list of words is sorted according to the rules of an unknown language that uses the lowercase English letters in some other order.

Infer that letter order and return it as a string. If the input is inconsistent, return the empty string.`,
    examples: [
      { input: 'words = ["wrt","wrf","er","ett","rftt"]', output: '"wertf"' },
      { input: 'words = ["z","x","z"]', output: '""', note: 'The ordering contradicts itself.' }
    ],
    constraints: ['1 <= words.length <= 100', '1 <= words[i].length <= 100', 'All words consist of lowercase English letters'],
    optimal: ['topo-sort'], accepted: ['graph', 'dfs', 'string'], plausible: [],
    why: 'Each adjacent pair of words yields one ordering edge, and the alphabet is a topological order of those edges.'
  },
  {
    id: 70, title: 'Climbing Stairs', difficulty: 'Easy',
    statement: `You are climbing a staircase of n steps. Each move takes you either one step or two steps up.

Count the distinct ways to reach the top.`,
    examples: [
      { input: 'n = 2', output: '2', note: '1 + 1, or 2.' },
      { input: 'n = 3', output: '3', note: '1+1+1, 1+2, or 2+1.' }
    ],
    constraints: ['1 <= n <= 45'],
    optimal: ['dp'], accepted: ['math'], plausible: [],
    why: 'The count for step n is the sum of the two before it, so it is Fibonacci. Two rolling variables suffice.'
  },
  {
    id: 198, title: 'House Robber', difficulty: 'Medium',
    statement: `Houses stand in a row, each holding some amount of money. Robbing two adjacent houses on the same night triggers the alarm.

Return the largest amount you can take without ever robbing two neighbours.`,
    examples: [
      { input: 'nums = [1,2,3,1]', output: '4', note: 'Rob house 1 and house 3.' },
      { input: 'nums = [2,7,9,3,1]', output: '12', note: 'Rob houses 1, 3 and 5.' }
    ],
    constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 400'],
    optimal: ['dp'], accepted: ['array'], plausible: ['greedy'],
    why: 'At each house: take it plus the best from two back, or skip it. Greedily taking the largest fails on inputs like [2,1,1,2].'
  },
  {
    id: 322, title: 'Coin Change', difficulty: 'Medium',
    statement: `Given coin denominations and a target amount, return the fewest coins needed to make that amount exactly.

You have an unlimited supply of each denomination. If the amount cannot be made, return -1.`,
    examples: [
      { input: 'coins = [1,2,5], amount = 11', output: '3', note: '11 = 5 + 5 + 1.' },
      { input: 'coins = [2], amount = 3', output: '-1' }
    ],
    constraints: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'],
    optimal: ['dp'], accepted: ['bfs'], plausible: ['greedy'],
    why: 'Unbounded knapsack over the amount. Taking the largest coin first breaks on denominations like [1,3,4] for amount 6.'
  },
  {
    id: 300, title: 'Longest Increasing Subsequence', difficulty: 'Medium',
    statement: `Given an integer array, return the length of the longest strictly increasing subsequence.

A subsequence keeps the original order but need not be contiguous.`,
    examples: [
      { input: 'nums = [10,9,2,5,3,7,101,18]', output: '4', note: 'One answer is [2,3,7,101].' },
      { input: 'nums = [7,7,7,7,7]', output: '1', note: 'Strictly increasing, so equal values do not extend the run.' }
    ],
    constraints: ['1 <= nums.length <= 2500', '-10^4 <= nums[i] <= 10^4', 'Follow-up: can you do it in O(n log n)?'],
    optimal: ['dp'], accepted: ['binary-search', 'array'], plausible: ['greedy'],
    why: 'The O(n^2) DP is the honest answer. Patience sorting, keeping the smallest tail per length and binary searching it, reaches O(n log n).'
  },
  {
    id: 1143, title: 'Longest Common Subsequence', difficulty: 'Medium',
    statement: `Given two strings, return the length of their longest common subsequence.

A subsequence keeps relative order but may skip characters. If there is none, return 0.`,
    examples: [
      { input: 'text1 = "abcde", text2 = "ace"', output: '3', note: 'The common subsequence is "ace".' },
      { input: 'text1 = "abc", text2 = "def"', output: '0' }
    ],
    constraints: ['1 <= text1.length, text2.length <= 1000', 'Both strings consist of lowercase English characters'],
    optimal: ['dp'], accepted: ['string', 'matrix'], plausible: [],
    why: 'A two-dimensional table over both prefixes: the textbook grid DP.'
  },
  {
    id: 72, title: 'Edit Distance', difficulty: 'Medium',
    statement: `Given two words, return the minimum number of single-character operations needed to turn the first into the second.

The permitted operations are insert, delete and replace.`,
    examples: [
      { input: 'word1 = "horse", word2 = "ros"', output: '3', note: 'horse -> rorse -> rose -> ros.' },
      { input: 'word1 = "intention", word2 = "execution"', output: '5' }
    ],
    constraints: ['0 <= word1.length, word2.length <= 500', 'Both words consist of lowercase English letters'],
    optimal: ['dp'], accepted: ['string', 'matrix'], plausible: [],
    why: 'Levenshtein distance: every cell takes the cheapest of its three neighbours.'
  },
  {
    id: 62, title: 'Unique Paths', difficulty: 'Medium',
    statement: `A robot starts in the top-left cell of an m by n grid and must reach the bottom-right cell. It can only move right or down.

Count the distinct paths.`,
    examples: [
      { input: 'm = 3, n = 7', output: '28' },
      { input: 'm = 3, n = 2', output: '3' }
    ],
    constraints: ['1 <= m, n <= 100'],
    optimal: ['dp'], accepted: ['math', 'matrix'], plausible: ['backtracking'],
    why: 'Each cell is the sum of the cell above and the cell to the left. Pure combinatorics also works: choose which of the moves go down.'
  },
  {
    id: 416, title: 'Partition Equal Subset Sum', difficulty: 'Medium',
    statement: `Given an array of positive integers, decide whether it can be split into two subsets whose sums are equal.

Every element must land in exactly one of the two subsets.`,
    examples: [
      { input: 'nums = [1,5,11,5]', output: 'true', note: '[1,5,5] and [11] both sum to 11.' },
      { input: 'nums = [1,2,3,5]', output: 'false', note: 'The total is 11, which is odd.' }
    ],
    constraints: ['1 <= nums.length <= 200', '1 <= nums[i] <= 100'],
    optimal: ['dp'], accepted: ['array', 'bitmask'], plausible: ['backtracking'],
    why: 'Subset-sum for half the total. A bitset shifted by each value runs the same DP a word at a time.'
  },
  {
    id: 5, title: 'Longest Palindromic Substring', difficulty: 'Medium',
    statement: `Given a string, return its longest contiguous substring that reads the same forwards and backwards.`,
    examples: [
      { input: 's = "babad"', output: '"bab"', note: '"aba" is also a valid answer.' },
      { input: 's = "cbbd"', output: '"bb"' }
    ],
    constraints: ['1 <= s.length <= 1000', 's consists of digits and English letters'],
    optimal: ['two-pointers'], accepted: ['dp', 'string'], plausible: [],
    why: 'Expand around each of the 2n - 1 centres, which needs O(1) space. The DP fills an n by n table instead.'
  },
  {
    id: 647, title: 'Palindromic Substrings', difficulty: 'Medium',
    statement: `Given a string, count how many of its substrings are palindromes.

Substrings at different positions count separately even if they read the same.`,
    examples: [
      { input: 's = "abc"', output: '3', note: 'Just "a", "b" and "c".' },
      { input: 's = "aaa"', output: '6', note: 'Three single letters, two "aa", and one "aaa".' }
    ],
    constraints: ['1 <= s.length <= 1000', 's consists of lowercase English letters'],
    optimal: ['two-pointers'], accepted: ['dp', 'string'], plausible: [],
    why: 'The same centre expansion as the longest-palindrome problem, counting hits instead of measuring the best.'
  },
  {
    id: 136, title: 'Single Number', difficulty: 'Easy',
    statement: `Every value in the array appears exactly twice, except one that appears once. Return that one.

Your solution must run in linear time and use only constant extra space.`,
    examples: [
      { input: 'nums = [2,2,1]', output: '1' },
      { input: 'nums = [4,1,2,1,2]', output: '4' }
    ],
    constraints: ['1 <= nums.length <= 3 * 10^4', '-3 * 10^4 <= nums[i] <= 3 * 10^4', 'Every element appears twice except one', 'Linear runtime and constant extra space required'],
    optimal: ['bitmask'], accepted: ['math'], plausible: ['hashmap'],
    why: 'XOR the whole array and the pairs cancel out. The constant-space rule is what rules out a hash set.'
  },
  {
    id: 191, title: 'Number of 1 Bits', difficulty: 'Easy',
    statement: `Given a positive integer, return the number of set bits in its binary representation, also called its Hamming weight.`,
    examples: [
      { input: 'n = 11', output: '3', note: 'Binary 1011 has three set bits.' },
      { input: 'n = 128', output: '1', note: 'Binary 10000000.' }
    ],
    constraints: ['1 <= n <= 2^31 - 1', 'Follow-up: can you do it faster if the function is called many times?'],
    optimal: ['bitmask'], accepted: ['math'], plausible: [],
    why: 'n &= n - 1 clears the lowest set bit, so the loop runs once per set bit rather than 32 times.'
  },
  {
    id: 338, title: 'Counting Bits', difficulty: 'Easy',
    statement: `Given an integer n, return an array of length n + 1 where each position i holds the number of set bits in i.`,
    examples: [
      { input: 'n = 2', output: '[0,1,1]' },
      { input: 'n = 5', output: '[0,1,1,2,1,2]' }
    ],
    constraints: ['0 <= n <= 10^5', 'Follow-up: do it in a single pass, in O(n) time, without a built-in popcount'],
    optimal: ['dp'], accepted: ['bitmask', 'math'], plausible: [],
    why: 'bits[i] = bits[i >> 1] + (i & 1), so every answer reuses one already computed. The follow-up is what makes it DP rather than bit twiddling.'
  },
  {
    id: 268, title: 'Missing Number', difficulty: 'Easy',
    statement: `An array holds n distinct numbers drawn from the range 0 to n. Exactly one value from that range is missing.

Return the missing number.`,
    examples: [
      { input: 'nums = [3,0,1]', output: '2' },
      { input: 'nums = [9,6,4,2,3,5,7,0,1]', output: '8' }
    ],
    constraints: ['n == nums.length', '1 <= n <= 10^4', '0 <= nums[i] <= n', 'All values are unique', 'Follow-up: O(1) extra space and O(n) runtime'],
    optimal: ['math'], accepted: ['bitmask', 'array'], plausible: ['hashmap', 'sorting'],
    why: 'Subtract the array sum from n(n + 1) / 2. XOR of all indices and values gets the same answer without overflow risk.'
  },
  {
    id: 371, title: 'Sum of Two Integers', difficulty: 'Medium',
    statement: `Return the sum of two integers without using the + or - operators.`,
    examples: [
      { input: 'a = 1, b = 2', output: '3' },
      { input: 'a = 2, b = 3', output: '5' }
    ],
    constraints: ['-1000 <= a, b <= 1000', 'The + and - operators may not be used'],
    optimal: ['bitmask'], accepted: ['math'], plausible: [],
    why: 'XOR is addition without carry, AND shifted left is the carry. Loop until there is no carry left.'
  },
  {
    id: 73, title: 'Set Matrix Zeroes', difficulty: 'Medium',
    statement: `Given an m by n matrix, if any cell is 0, set that cell's entire row and column to 0.

Do it in place.`,
    examples: [
      { input: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]', output: '[[1,0,1],[0,0,0],[1,0,1]]' },
      { input: 'matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]', output: '[[0,0,0,0],[0,4,5,0],[0,3,1,0]]' }
    ],
    constraints: ['m == matrix.length, n == matrix[0].length', '1 <= m, n <= 200', '-2^31 <= matrix[i][j] <= 2^31 - 1', 'Follow-up: a constant-space solution exists'],
    optimal: ['matrix'], accepted: ['array', 'hashmap'], plausible: [],
    why: 'The trap is blanking rows as you scan, which corrupts later reads. Use the first row and column as the marker storage to reach O(1) extra space.'
  },
  {
    id: 54, title: 'Spiral Matrix', difficulty: 'Medium',
    statement: `Given an m by n matrix, return all of its elements in spiral order, starting at the top-left and turning clockwise.`,
    examples: [
      { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[1,2,3,6,9,8,7,4,5]' },
      { input: 'matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]', output: '[1,2,3,4,8,12,11,10,9,5,6,7]' }
    ],
    constraints: ['m == matrix.length, n == matrix[i].length', '1 <= m, n <= 10', '-100 <= matrix[i][j] <= 100'],
    optimal: ['matrix'], accepted: ['array'], plausible: ['dfs'],
    why: 'Four shrinking boundaries and four directions. It is traversal bookkeeping, not an algorithm.'
  },
  {
    id: 48, title: 'Rotate Image', difficulty: 'Medium',
    statement: `Given an n by n matrix representing an image, rotate it 90 degrees clockwise.

You must modify the matrix in place, without allocating another matrix.`,
    examples: [
      { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[[7,4,1],[8,5,2],[9,6,3]]' },
      { input: 'matrix = [[1,2],[3,4]]', output: '[[3,1],[4,2]]' }
    ],
    constraints: ['n == matrix.length == matrix[i].length', '1 <= n <= 20', '-1000 <= matrix[i][j] <= 1000', 'The rotation must happen in place'],
    optimal: ['matrix'], accepted: ['math', 'array'], plausible: [],
    why: 'Transpose the matrix, then reverse each row. Two simple passes beat working out four-way cycles by hand.'
  },
  {
    id: 79, title: 'Word Search', difficulty: 'Medium',
    statement: `Given a grid of letters and a word, decide whether the word can be traced through the grid.

Letters must be horizontally or vertically adjacent, and no cell may be used twice in the same trace.`,
    examples: [
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: 'true' },
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"', output: 'false', note: 'The B would have to be reused.' }
    ],
    constraints: ['m == board.length, n == board[i].length', '1 <= m, n <= 6', '1 <= word.length <= 15', 'All characters are English letters'],
    optimal: ['backtracking'], accepted: ['dfs', 'matrix'], plausible: [],
    why: 'DFS from every starting cell, marking a cell as used on the way in and unmarking it on the way out.'
  },
  {
    id: 253, title: 'Meeting Rooms II', difficulty: 'Medium',
    statement: `Given the start and end time of every meeting, find the minimum number of rooms needed so that no two meetings share a room at the same time.

A meeting ending exactly when another starts does not conflict.`,
    examples: [
      { input: 'intervals = [[0,30],[5,10],[15,20]]', output: '2', note: '[0,30] overlaps both of the others, but those two do not overlap each other.' },
      { input: 'intervals = [[7,10],[2,4]]', output: '1' }
    ],
    constraints: ['1 <= intervals.length <= 10^4', '0 <= start < end <= 10^6'],
    optimal: ['intervals'], accepted: ['heap', 'sorting', 'prefix-sum'], plausible: ['greedy'],
    why: 'The answer is the peak number of simultaneous intervals: a min-heap of end times, or a sweep over sorted start and end events.'
  },
  {
    id: 435, title: 'Non-overlapping Intervals', difficulty: 'Medium',
    statement: `Given a list of intervals, return the minimum number you must remove so that none of the remaining intervals overlap.

Intervals that only touch at an endpoint do not count as overlapping.`,
    examples: [
      { input: 'intervals = [[1,2],[2,3],[3,4],[1,3]]', output: '1', note: 'Removing [1,3] leaves the rest disjoint.' },
      { input: 'intervals = [[1,2],[1,2],[1,2]]', output: '2' }
    ],
    constraints: ['1 <= intervals.length <= 10^5', 'intervals[i].length == 2', '-5 * 10^4 <= start < end <= 5 * 10^4'],
    optimal: ['greedy'], accepted: ['intervals', 'sorting'], plausible: ['dp'],
    why: 'Sort by end time and always keep the interval that finishes earliest: the classic activity-selection exchange argument.'
  },
  {
    id: 128, title: 'Longest Consecutive Sequence', difficulty: 'Medium',
    statement: `Given an unsorted integer array, find the length of the longest run of consecutive integers it contains. The run need not appear in order in the array.

Your algorithm must run in O(n) time.`,
    examples: [
      { input: 'nums = [100,4,200,1,3,2]', output: '4', note: 'The run is [1,2,3,4].' },
      { input: 'nums = [0,3,7,2,5,8,4,6,0,1]', output: '9' }
    ],
    constraints: ['0 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9', 'O(n) runtime required'],
    optimal: ['hashmap'], accepted: ['union-find', 'array'], plausible: ['sorting'],
    why: 'Put everything in a set and only start counting from values with no predecessor. Sorting is the obvious approach, but O(n log n) breaks the stated bound.'
  },
  {
    id: 271, title: 'Encode and Decode Strings', difficulty: 'Medium',
    statement: `Design an algorithm to encode a list of strings into a single string, and another to decode that string back into the original list.

The strings may contain any characters, including whatever separator you might be tempted to use.`,
    examples: [
      { input: 'dummy = ["lint","code","love","you"]', output: '["lint","code","love","you"]', note: 'The list that comes back must match exactly.' },
      { input: 'dummy = ["we", "say", ":", "yes"]', output: '["we","say",":","yes"]', note: 'A colon in the data is exactly what breaks naive separators.' }
    ],
    constraints: ['1 <= strs.length <= 200', '0 <= strs[i].length <= 200', 'strs[i] may contain any possible characters'],
    optimal: ['design'], accepted: ['string'], plausible: [],
    why: 'Length-prefix every entry, as in "4#lint". A separator alone fails the moment a string contains that separator.'
  },
  {
    id: 36, title: 'Valid Sudoku', difficulty: 'Medium',
    statement: `Determine whether a 9 by 9 Sudoku board is valid. Only the cells that are already filled need to be checked.

Each row, each column and each of the nine 3 by 3 boxes must contain the digits 1 to 9 without repetition. The board does not have to be solvable.`,
    examples: [
      {
        input: `board =
5 3 . . 7 . . . .
6 . . 1 9 5 . . .
. 9 8 . . . . 6 .
8 . . . 6 . . . 3
4 . . 8 . 3 . . 1
7 . . . 2 . . . 6
. 6 . . . . 2 8 .
. . . 4 1 9 . . 5
. . . . 8 . . 7 9`,
        output: 'true'
      },
      {
        input: 'The same board with the top-left 5 changed to an 8',
        output: 'false',
        note: 'Column 1 would then hold two 8s, one in the first row and one in the fourth.'
      }
    ],
    constraints: ['board.length == 9 and board[i].length == 9', "board[i][j] is a digit 1-9 or '.'", 'Only filled cells need to be validated'],
    optimal: ['hashmap'], accepted: ['matrix', 'array'], plausible: [],
    why: 'Nine sets each for rows, columns and boxes, all filled during one pass over the grid.'
  },
  {
    id: 560, title: 'Subarray Sum Equals K', difficulty: 'Medium',
    statement: `Given an integer array and an integer k, count the contiguous subarrays whose elements sum to exactly k.

Values may be negative.`,
    examples: [
      { input: 'nums = [1,1,1], k = 2', output: '2', note: 'The first two elements and the last two.' },
      { input: 'nums = [1,2,3], k = 3', output: '2', note: '[1,2] and [3].' }
    ],
    constraints: ['1 <= nums.length <= 2 * 10^4', '-1000 <= nums[i] <= 1000', '-10^7 <= k <= 10^7'],
    optimal: ['prefix-sum'], accepted: ['hashmap', 'array'], plausible: ['sliding-window'],
    why: 'Count how many earlier prefix sums equal the current one minus k. Negative values are what kill the sliding window here.'
  },
  {
    id: 303, title: 'Range Sum Query - Immutable', difficulty: 'Easy',
    statement: `Given an integer array that never changes, answer many queries of the form "what is the sum of elements between index left and index right, inclusive?"

Design the structure so the queries are fast.`,
    examples: [
      { input: 'nums = [-2,0,3,-5,2,-1]; sumRange(0,2)', output: '1' },
      { input: 'sumRange(2,5)', output: '-1' }
    ],
    constraints: ['1 <= nums.length <= 10^4', '-10^5 <= nums[i] <= 10^5', '0 <= left <= right < nums.length', 'At most 10^4 calls to sumRange'],
    optimal: ['prefix-sum'], accepted: ['design', 'array'], plausible: [],
    why: 'Precompute cumulative sums once in the constructor, and every query collapses to a single subtraction.'
  },
  {
    id: 239, title: 'Sliding Window Maximum', difficulty: 'Hard',
    statement: `A window of size k slides across an array one position at a time.

Return the maximum inside the window at each of its positions.`,
    examples: [
      { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]' },
      { input: 'nums = [1], k = 1', output: '[1]' }
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', '1 <= k <= nums.length'],
    optimal: ['monotonic'], accepted: ['queue', 'sliding-window', 'heap'], plausible: [],
    why: 'A decreasing deque keeps only the candidates that could still win, giving O(n). A heap with lazy deletion works too, at O(n log n).'
  },
  {
    id: 55, title: 'Jump Game', difficulty: 'Medium',
    statement: `Each element of the array is the maximum number of positions you may jump forward from there. You start at index 0.

Decide whether you can reach the last index.`,
    examples: [
      { input: 'nums = [2,3,1,1,4]', output: 'true', note: 'Jump 1 to index 1, then 3 to the end.' },
      { input: 'nums = [3,2,1,0,4]', output: 'false', note: 'Every route lands on the 0 at index 3.' }
    ],
    constraints: ['1 <= nums.length <= 10^4', '0 <= nums[i] <= 10^5'],
    optimal: ['greedy'], accepted: ['dp', 'array'], plausible: [],
    why: 'Track the furthest index reachable so far and fail the moment your position passes it. One pass, no table.'
  },
  {
    id: 66, title: 'Plus One', difficulty: 'Easy',
    statement: `A large integer is stored as an array of digits, most significant first, with no leading zeros.

Increment it by one and return the resulting digit array.`,
    examples: [
      { input: 'digits = [1,2,3]', output: '[1,2,4]' },
      { input: 'digits = [9,9]', output: '[1,0,0]', note: 'The carry propagates the whole way and adds a digit.' }
    ],
    constraints: ['1 <= digits.length <= 100', '0 <= digits[i] <= 9', 'The number has no leading zeros'],
    optimal: ['array'], accepted: ['math'], plausible: [],
    why: 'Carry propagation from the last digit backwards. You only prepend a 1 when every digit was 9.'
  },
  {
    id: 125, title: 'Valid Palindrome', difficulty: 'Easy',
    statement: `A phrase is a palindrome if, after lowercasing it and dropping everything that is not a letter or digit, it reads the same forwards and backwards.

Decide whether the given string is one.`,
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true', note: 'It reduces to "amanaplanacanalpanama".' },
      { input: 's = "race a car"', output: 'false' }
    ],
    constraints: ['1 <= s.length <= 2 * 10^5', 's consists of printable ASCII characters'],
    optimal: ['two-pointers'], accepted: ['string'], plausible: [],
    why: 'Converge from both ends, skipping anything non-alphanumeric, so no cleaned copy of the string is ever built.'
  },
  {
    id: 392, title: 'Is Subsequence', difficulty: 'Easy',
    statement: `Given strings s and t, decide whether s is a subsequence of t.

A subsequence keeps the original relative order but may skip characters.`,
    examples: [
      { input: 's = "abc", t = "ahbgdc"', output: 'true' },
      { input: 's = "axc", t = "ahbgdc"', output: 'false' }
    ],
    constraints: ['0 <= s.length <= 100', '0 <= t.length <= 10^4', 'Both strings consist of lowercase English letters'],
    optimal: ['two-pointers'], accepted: ['string', 'greedy'], plausible: ['dp'],
    why: 'One pointer per string, advancing through t. Matching at the earliest opportunity is always safe, so no backtracking is needed.'
  },
  {
    id: 1046, title: 'Last Stone Weight', difficulty: 'Easy',
    statement: `Each turn, take the two heaviest stones and smash them together. Equal stones destroy each other; otherwise the heavier one survives with the difference in weight.

Return the weight of the final stone, or 0 if none remain.`,
    examples: [
      { input: 'stones = [2,7,4,1,8,1]', output: '1' },
      { input: 'stones = [1]', output: '1' }
    ],
    constraints: ['1 <= stones.length <= 30', '1 <= stones[i] <= 1000'],
    optimal: ['heap'], accepted: ['sorting', 'array'], plausible: [],
    why: 'You need the two largest repeatedly from a collection that keeps changing, which is exactly what a max-heap is for.'
  },
  {
    id: 846, title: 'Hand of Straights', difficulty: 'Medium',
    statement: `You have a hand of cards and a group size. Decide whether the hand can be rearranged into groups of that size, where every group is a run of consecutive values.`,
    examples: [
      { input: 'hand = [1,2,3,6,2,3,4,7,8], groupSize = 3', output: 'true', note: 'The groups are [1,2,3], [2,3,4] and [6,7,8].' },
      { input: 'hand = [1,2,3,4,5], groupSize = 4', output: 'false', note: '5 does not divide evenly into groups of 4.' }
    ],
    constraints: ['1 <= hand.length <= 10^4', '0 <= hand[i] <= 10^9', '1 <= groupSize <= hand.length'],
    optimal: ['greedy'], accepted: ['hashmap', 'sorting', 'heap'], plausible: [],
    why: 'The smallest remaining card has no other legal home: it must begin a run. Committing to that forces the rest.'
  },
  {
    id: 287, title: 'Find the Duplicate Number', difficulty: 'Medium',
    statement: `An array of n + 1 integers holds values in the range 1 to n. By the pigeonhole principle at least one value repeats, and in fact exactly one does.

Return that value without modifying the array and using only constant extra space.`,
    examples: [
      { input: 'nums = [1,3,4,2,2]', output: '2' },
      { input: 'nums = [3,1,3,4,2]', output: '3' }
    ],
    constraints: ['1 <= n <= 10^5', 'nums.length == n + 1', '1 <= nums[i] <= n', 'Exactly one value is repeated', 'The array may not be modified and only O(1) extra space may be used'],
    optimal: ['two-pointers'], accepted: ['binary-search'], plausible: ['hashmap', 'bitmask'],
    why: 'The two constraints together rule out sorting and hashing, which forces Floyd’s cycle detection with values read as next-pointers.'
  },
  {
    id: 169, title: 'Majority Element', difficulty: 'Easy',
    statement: `Given an array of size n, return the element that appears more than n / 2 times.

You may assume such an element always exists.`,
    examples: [
      { input: 'nums = [3,2,3]', output: '3' },
      { input: 'nums = [2,2,1,1,1,2,2]', output: '2' }
    ],
    constraints: ['n == nums.length', '1 <= n <= 5 * 10^4', '-10^9 <= nums[i] <= 10^9', 'A majority element always exists', 'Follow-up: O(n) time and O(1) space'],
    optimal: ['greedy'], accepted: ['hashmap', 'sorting', 'math'], plausible: ['divide-conquer'],
    why: 'Boyer-Moore voting keeps one candidate and one counter, hitting O(1) space. Counting or sorting also works, but costs more.'
  },
  {
    id: 88, title: 'Merge Sorted Array', difficulty: 'Easy',
    statement: `You are given two sorted arrays. The first has m real values followed by n zeros, leaving exactly enough room for the second, which has n values.

Merge them so the first array ends up sorted. Do it in place.`,
    examples: [
      { input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3', output: '[1,2,2,3,5,6]' },
      { input: 'nums1 = [1], m = 1, nums2 = [], n = 0', output: '[1]' }
    ],
    constraints: ['nums1.length == m + n and nums2.length == n', '0 <= m, n <= 200 and 1 <= m + n <= 200', '-10^9 <= values <= 10^9', 'The merge must happen inside nums1'],
    optimal: ['two-pointers'], accepted: ['array', 'sorting'], plausible: [],
    why: 'Fill from the back. Merging forwards would overwrite values in nums1 that you have not read yet.'
  },
  {
    id: 112, title: 'Path Sum', difficulty: 'Easy',
    statement: `Given a binary tree and a target sum, decide whether some root-to-leaf path has node values adding up to that target.

A leaf is a node with no children.`,
    examples: [
      { input: 'root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22', output: 'true', note: 'The path 5 -> 4 -> 11 -> 2 sums to 22.' },
      { input: 'root = [1,2,3], targetSum = 5', output: 'false' }
    ],
    constraints: ['The number of nodes is in [0, 5000]', '-1000 <= Node.val <= 1000', '-1000 <= targetSum <= 1000'],
    optimal: ['dfs'], accepted: ['tree', 'bfs'], plausible: ['backtracking'],
    why: 'Subtract each node value as you descend and check whether the remainder hits zero exactly at a leaf.'
  },
  {
    id: 1584, title: 'Min Cost to Connect All Points', difficulty: 'Medium',
    statement: `You are given points on a plane. The cost of joining two points is their Manhattan distance.

Return the minimum total cost to connect every point, so that exactly one path exists between any two.`,
    examples: [
      { input: 'points = [[0,0],[2,2],[3,10],[5,2],[7,0]]', output: '20' },
      { input: 'points = [[3,12],[-2,5],[-4,1]]', output: '18' }
    ],
    constraints: ['1 <= points.length <= 1000', '-10^6 <= xi, yi <= 10^6', 'All points are distinct'],
    optimal: ['graph'], accepted: ['heap', 'union-find', 'greedy'], plausible: [],
    why: '"Exactly one path between any two" is the definition of a spanning tree, so this is a minimum spanning tree: Prim’s with a heap, or Kruskal’s with union-find.'
  },
  {
    id: 912, title: 'Sort an Array', difficulty: 'Medium',
    statement: `Given an integer array, sort it in ascending order and return it.

You may not use any built-in sorting function. Your solution must run in O(n log n) and use as little extra space as you can manage.`,
    examples: [
      { input: 'nums = [5,2,3,1]', output: '[1,2,3,5]' },
      { input: 'nums = [5,1,1,2,0,0]', output: '[0,0,1,1,2,5]' }
    ],
    constraints: ['1 <= nums.length <= 5 * 10^4', '-5 * 10^4 <= nums[i] <= 5 * 10^4', 'Built-in sort functions are not allowed', 'O(n log n) time required'],
    optimal: ['divide-conquer'], accepted: ['sorting', 'heap'], plausible: ['dp'],
    why: 'Merge sort and quicksort are both split, solve each half, combine. Heapsort reaches the same bound by a different route.'
  },
  {
    id: 315, title: 'Count of Smaller Numbers After Self', difficulty: 'Hard',
    statement: `For each position in an integer array, count how many elements to its right are strictly smaller.

Return those counts as an array.`,
    examples: [
      { input: 'nums = [5,2,6,1]', output: '[2,1,1,0]', note: 'To the right of 5 sit 2 and 1.' },
      { input: 'nums = [-1,-1]', output: '[0,0]' }
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    optimal: ['divide-conquer'], accepted: ['sorting', 'binary-search'], plausible: ['dp'],
    why: 'This is inversion counting, and merge sort tallies inversions for free while it merges. A Fenwick tree over compressed values also works.'
  },
  {
    id: 179, title: 'Largest Number', difficulty: 'Medium',
    statement: `Given a list of non-negative integers, arrange them so that concatenating them forms the largest possible number.

Return the result as a string, since it may be very large.`,
    examples: [
      { input: 'nums = [10,2]', output: '"210"' },
      { input: 'nums = [3,30,34,5,9]', output: '"9534330"' }
    ],
    constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 10^9', 'The answer may not have a leading zero unless it is "0"'],
    optimal: ['sorting'], accepted: ['string', 'greedy'], plausible: ['math'],
    why: 'Sort with the comparator "a + b versus b + a" as strings. Finding the right order relation is the entire problem.'
  },
  {
    id: 274, title: 'H-Index', difficulty: 'Medium',
    statement: `Given an array of citation counts, one per paper, compute the researcher's h-index.

The h-index is the largest h such that at least h papers have h or more citations each.`,
    examples: [
      { input: 'citations = [3,0,6,1,5]', output: '3', note: 'Three papers have at least 3 citations each.' },
      { input: 'citations = [1,3,1]', output: '1' }
    ],
    constraints: ['n == citations.length', '1 <= n <= 5000', '0 <= citations[i] <= 1000'],
    optimal: ['sorting'], accepted: ['array', 'math'], plausible: ['binary-search', 'hashmap'],
    why: 'Sort descending and walk until the citation count drops below the position. Counting sort makes it O(n) since counts are bounded.'
  },
  {
    id: 14, title: 'Longest Common Prefix', difficulty: 'Easy',
    statement: `Find the longest string that is a prefix of every string in the given array.

If there is no common prefix, return the empty string.`,
    examples: [
      { input: 'strs = ["flower","flow","flight"]', output: '"fl"' },
      { input: 'strs = ["dog","racecar","car"]', output: '""' }
    ],
    constraints: ['1 <= strs.length <= 200', '0 <= strs[i].length <= 200', 'strs[i] consists of lowercase English letters'],
    optimal: ['string'], accepted: ['array', 'trie'], plausible: ['divide-conquer', 'binary-search'],
    why: 'Walk the characters position by position across all the strings and stop at the first mismatch. Nothing cleverer is needed at this size.'
  },
  {
    id: 151, title: 'Reverse Words in a String', difficulty: 'Medium',
    statement: `Given a string of words separated by spaces, return the words in reverse order.

The result must have exactly one space between words and no leading or trailing spaces, even if the input had several.`,
    examples: [
      { input: 's = "the sky is blue"', output: '"blue is sky the"' },
      { input: 's = "  hello world  "', output: '"world hello"', note: 'The surrounding spaces are dropped.' }
    ],
    constraints: ['1 <= s.length <= 10^4', 's contains English letters, digits and spaces', 'There is at least one word', 'Follow-up: solve it in O(1) extra space'],
    optimal: ['string'], accepted: ['two-pointers', 'stack'], plausible: ['array'],
    why: 'Parse out the words and rebuild. The O(1)-space version reverses the whole string, then reverses each word back in place.'
  },
  {
    id: 622, title: 'Design Circular Queue', difficulty: 'Medium',
    statement: `Implement a queue of fixed capacity whose storage wraps around, so space freed at the front can be reused at the back.

Support enqueue, dequeue, reading the front and rear, and testing empty and full.`,
    examples: [
      { input: 'k = 3; enQueue(1), enQueue(2), enQueue(3), enQueue(4)', output: 'true, true, true, false', note: 'The fourth fails because the queue is full.' },
      { input: '...then Rear(), isFull(), deQueue(), enQueue(4), Rear()', output: '3, true, true, true, 4' }
    ],
    constraints: ['1 <= k <= 1000', '0 <= value <= 1000', 'At most 3000 calls in total', 'All operations should run in O(1)'],
    optimal: ['queue'], accepted: ['design', 'array'], plausible: ['linked-list'],
    why: 'Head and tail indices wrapping with modulo over one fixed array. The wraparound is the whole point of the exercise.'
  },
  {
    id: 933, title: 'Number of Recent Calls', difficulty: 'Easy',
    statement: `You are counting requests over a sliding time window. Each call to ping arrives with a strictly increasing timestamp t.

Return how many pings have arrived in the inclusive range [t - 3000, t].`,
    examples: [
      { input: 'ping(1), ping(100), ping(3001), ping(3002)', output: '1, 2, 3, 3', note: 'By t = 3002 the ping at t = 1 has aged out of the window.' },
      { input: 'ping(1)', output: '1' }
    ],
    constraints: ['1 <= t <= 10^9', 'Every call to ping uses a strictly larger t than the previous call', 'At most 10^4 calls to ping'],
    optimal: ['queue'], accepted: ['design'], plausible: ['binary-search', 'sliding-window'],
    why: 'Push each timestamp and drop from the front while it has aged out. Strictly increasing arrivals are what make a plain queue enough.'
  }
];
