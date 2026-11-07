// ─── Problems Data ──────────────────────────────────────────────────────────
export const problems = [
  // DSA - Arrays
  { id: 1, title: 'Two Sum', category: 'DSA', topic: 'Arrays', difficulty: 'Easy', tags: ['Array', 'HashMap'], solved: true, submissions: 15420, acceptance: 72 },
  { id: 2, title: 'Best Time to Buy and Sell Stock', category: 'DSA', topic: 'Arrays', difficulty: 'Easy', tags: ['Array', 'Greedy'], solved: true, submissions: 12300, acceptance: 68 },
  { id: 3, title: 'Container With Most Water', category: 'DSA', topic: 'Arrays', difficulty: 'Medium', tags: ['Array', 'Two Pointers'], solved: false, submissions: 9800, acceptance: 55 },
  { id: 4, title: 'Trapping Rain Water', category: 'DSA', topic: 'Arrays', difficulty: 'Hard', tags: ['Array', 'Stack', 'DP'], solved: false, submissions: 7200, acceptance: 42 },
  { id: 5, title: 'Maximum Subarray', category: 'DSA', topic: 'Arrays', difficulty: 'Medium', tags: ['Array', 'DP', 'Kadane'], solved: true, submissions: 11000, acceptance: 63 },
  // DSA - Linked List
  { id: 6, title: 'Reverse Linked List', category: 'DSA', topic: 'Linked List', difficulty: 'Easy', tags: ['Linked List', 'Recursion'], solved: true, submissions: 14200, acceptance: 75 },
  { id: 7, title: 'Merge Two Sorted Lists', category: 'DSA', topic: 'Linked List', difficulty: 'Easy', tags: ['Linked List', 'Recursion'], solved: false, submissions: 13100, acceptance: 70 },
  { id: 8, title: 'Detect Cycle in Linked List', category: 'DSA', topic: 'Linked List', difficulty: 'Medium', tags: ['Linked List', 'Floyd\'s Algorithm'], solved: false, submissions: 8900, acceptance: 58 },
  // DSA - Trees
  { id: 9, title: 'Maximum Depth of Binary Tree', category: 'DSA', topic: 'Trees', difficulty: 'Easy', tags: ['Tree', 'DFS', 'BFS'], solved: true, submissions: 16000, acceptance: 78 },
  { id: 10, title: 'Validate Binary Search Tree', category: 'DSA', topic: 'Trees', difficulty: 'Medium', tags: ['Tree', 'DFS', 'BST'], solved: false, submissions: 9200, acceptance: 52 },
  { id: 11, title: 'Binary Tree Level Order Traversal', category: 'DSA', topic: 'Trees', difficulty: 'Medium', tags: ['Tree', 'BFS', 'Queue'], solved: false, submissions: 8700, acceptance: 60 },
  // DSA - Graphs
  { id: 12, title: 'Number of Islands', category: 'DSA', topic: 'Graphs', difficulty: 'Medium', tags: ['Graph', 'DFS', 'BFS', 'Matrix'], solved: false, submissions: 10500, acceptance: 57 },
  { id: 13, title: 'Course Schedule', category: 'DSA', topic: 'Graphs', difficulty: 'Medium', tags: ['Graph', 'Topological Sort', 'Cycle Detection'], solved: false, submissions: 7800, acceptance: 48 },
  // DSA - Dynamic Programming
  { id: 14, title: 'Climbing Stairs', category: 'DSA', topic: 'Dynamic Programming', difficulty: 'Easy', tags: ['DP', 'Fibonacci', 'Memoization'], solved: true, submissions: 18000, acceptance: 82 },
  { id: 15, title: 'Longest Common Subsequence', category: 'DSA', topic: 'Dynamic Programming', difficulty: 'Medium', tags: ['DP', 'String'], solved: false, submissions: 8200, acceptance: 56 },
  { id: 16, title: '0/1 Knapsack Problem', category: 'DSA', topic: 'Dynamic Programming', difficulty: 'Hard', tags: ['DP', 'Greedy', 'Optimization'], solved: false, submissions: 5600, acceptance: 38 },
  // DSA - Sorting
  { id: 17, title: 'Bubble Sort', category: 'DSA', topic: 'Sorting', difficulty: 'Easy', tags: ['Sorting', 'Array'], solved: true, submissions: 20000, acceptance: 90, hasVisualizer: true },
  { id: 18, title: 'Merge Sort', category: 'DSA', topic: 'Sorting', difficulty: 'Medium', tags: ['Sorting', 'Divide & Conquer'], solved: false, submissions: 12000, acceptance: 65, hasVisualizer: true },
  { id: 19, title: 'Quick Sort', category: 'DSA', topic: 'Sorting', difficulty: 'Medium', tags: ['Sorting', 'Recursion'], solved: false, submissions: 10000, acceptance: 58 },
  // OOPs
  { id: 20, title: 'Design a Parking Lot', category: 'OOPs', topic: 'System Design', difficulty: 'Medium', tags: ['OOPs', 'Design Patterns', 'Class Design'], solved: false, submissions: 6200, acceptance: 45 },
  { id: 21, title: 'Implement Stack using OOPs', category: 'OOPs', topic: 'Data Structures', difficulty: 'Easy', tags: ['OOPs', 'Stack', 'Encapsulation'], solved: true, submissions: 9400, acceptance: 72 },
  { id: 22, title: 'Design a Library System', category: 'OOPs', topic: 'System Design', difficulty: 'Hard', tags: ['OOPs', 'Inheritance', 'Polymorphism'], solved: false, submissions: 3800, acceptance: 32 },
  // SQL
  { id: 23, title: 'Select All Employees', category: 'SQL', topic: 'Basic Queries', difficulty: 'Easy', tags: ['SQL', 'SELECT', 'WHERE'], solved: true, submissions: 22000, acceptance: 92 },
  { id: 24, title: 'Find Duplicate Emails', category: 'SQL', topic: 'Aggregation', difficulty: 'Easy', tags: ['SQL', 'GROUP BY', 'HAVING'], solved: true, submissions: 18000, acceptance: 85 },
  { id: 25, title: 'Employees Earning More Than Manager', category: 'SQL', topic: 'Joins', difficulty: 'Medium', tags: ['SQL', 'JOIN', 'Self Join'], solved: false, submissions: 11000, acceptance: 62 },
  { id: 26, title: 'Rank Scores', category: 'SQL', topic: 'Window Functions', difficulty: 'Medium', tags: ['SQL', 'Window Functions', 'RANK'], solved: false, submissions: 8500, acceptance: 54 },
  { id: 27, title: 'Department Top Salary', category: 'SQL', topic: 'Subqueries', difficulty: 'Hard', tags: ['SQL', 'Subquery', 'MAX'], solved: false, submissions: 5500, acceptance: 40 },
  // Languages
  { id: 28, title: 'Python List Comprehension', category: 'Language', topic: 'Python', difficulty: 'Easy', tags: ['Python', 'List', 'Comprehension'], solved: true, submissions: 14000, acceptance: 80 },
  { id: 29, title: 'JavaScript Closures', category: 'Language', topic: 'JavaScript', difficulty: 'Medium', tags: ['JavaScript', 'Closures', 'Scope'], solved: false, submissions: 9800, acceptance: 58 },
  { id: 30, title: 'Java Generics', category: 'Language', topic: 'Java', difficulty: 'Hard', tags: ['Java', 'Generics', 'Type Safety'], solved: false, submissions: 5200, acceptance: 36 },
];

export const categories = ['All', 'DSA', 'OOPs', 'SQL', 'Language'];
export const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
export const topics = {
  DSA: ['All Topics', 'Arrays', 'Linked List', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting', 'Searching'],
  OOPs: ['All Topics', 'System Design', 'Data Structures', 'Design Patterns'],
  SQL: ['All Topics', 'Basic Queries', 'Aggregation', 'Joins', 'Window Functions', 'Subqueries'],
  Language: ['All Topics', 'Python', 'JavaScript', 'Java', 'C++'],
};
