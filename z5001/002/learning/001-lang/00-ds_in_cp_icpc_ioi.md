# Data Structures
```
Arrays / Vectors
Strings
Hash Map (Dictionary)
Hash Set
Stack
Queue
Deque
Heap (Priority Queue)
Ordered Map / Ordered Set
Graph (Adjacency List)
Union-Find (DSU)
Fenwick Tree (BIT)
Segment Tree
Trie
```

```
```
Yes. From the **data structure / container perspective**, you've covered almost everything needed for competitive programming.

## ✅ Core CP Data Structures (Completed)

| Category                | Status |
| ----------------------- | ------ |
| Arrays / Dynamic Arrays | ✅      |
| Strings                 | ✅      |
| Stack                   | ✅      |
| Queue                   | ✅      |
| Deque                   | ✅      |
| Hash Map                | ✅      |
| Hash Set                | ✅      |
| Heap / Priority Queue   | ✅      |
| Ordered Map             | ✅      |
| Ordered Set             | ✅      |
| Graph (Adjacency List)  | ✅      |
| DSU (Union-Find)        | ✅      |
| Fenwick Tree (BIT)      | ✅      |
| Segment Tree            | ✅      |
| Trie                    | ✅      |

---

## Small things still worth covering

These are not entirely new data structures but are very common in CP.

| Topic             | Importance | Why                                   |
| ----------------- | ---------- | ------------------------------------- |
| Pair / Tuple      | ⭐⭐⭐⭐⭐      | Store `(x,y)`, `(node,dist)`          |
| Matrix (2D Array) | ⭐⭐⭐⭐⭐      | Grid BFS/DFS                          |
| Bitset            | ⭐⭐⭐⭐       | DP, sieve, bit operations             |
| Linked List       | ⭐          | Rare in CP                            |
| Circular Queue    | ⭐          | Very rare (Deque usually replaces it) |
| Multiset          | ⭐⭐⭐⭐       | Sliding window median, duplicates     |
| Multimap          | ⭐⭐         | Rare                                  |
| Ordered Multiset  | ⭐⭐⭐        | PBDS (mainly C++)                     |

---

## More important than data structures: algorithms

Once the containers are done, the next major part of CP is algorithms.

### Sorting

* Quick Sort
* Merge Sort
* Heap Sort
* Counting Sort
* Radix Sort

### Searching

* Binary Search
* Binary Search on Answer
* Ternary Search

### Graph

* BFS
* DFS
* Topological Sort
* Dijkstra
* Bellman-Ford
* Floyd-Warshall
* Prim
* Kruskal
* SCC (Kosaraju, Tarjan)
* Bridges
* Articulation Points
* LCA

### Tree

* Traversals
* BST
* Binary Tree
* Euler Tour
* Heavy-Light Decomposition

### Dynamic Programming

* 1D DP
* 2D DP
* Knapsack
* LIS
* Digit DP
* Bitmask DP
* Tree DP
* Interval DP

### Strings

* KMP
* Z Algorithm
* Rabin-Karp
* Rolling Hash
* Manacher
* Suffix Array
* Suffix Automaton

### Math

* GCD
* LCM
* Modular Arithmetic
* Modular Inverse
* Fast Exponentiation
* Sieve
* Prime Factorization
* Combinatorics
* Matrix Exponentiation

### Miscellaneous

* Two Pointers
* Sliding Window
* Prefix Sum
* Difference Array
* Sweep Line
* Greedy
* Backtracking
* Meet in the Middle
* Mo's Algorithm

---

## Language-specific utilities

Each language also has a few "must-know" standard library utilities:

| Language   | Important Utilities                                                |
| ---------- | ------------------------------------------------------------------ |
| C++        | `algorithm`, `numeric`, `bitset`, `pair`, `tuple`, iterators       |
| Rust       | `Option`, `Result`, iterators, slices                              |
| Go         | `sort`, `slices`, `maps`, `container/heap`, `container/list`       |
| Java       | `Arrays`, `Collections`, `Math`, `StringBuilder`, `Comparator`     |
| Python     | `collections`, `heapq`, `bisect`, `itertools`, `math`, `functools` |
| JavaScript | `Map`, `Set`, array methods, `Math`                                |
| C#         | LINQ, `Array`, `Math`, `StringBuilder`, generic collections        |

## My recommendation for your project

Given your goal of building a **multi-language competitive programming platform**, you've already completed the most important cross-language reference: the standard data structures and their operations.

The next logical step would be to create the same kind of language comparison tables for:

1. **Built-in algorithms** (sort, binary search, reverse, next permutation, etc.).
2. **Mathematical utilities** (GCD, LCM, power, modulo, prime testing).
3. **Language idioms** (I/O, loops, functions, lambdas, comparators, custom sorting).

Those three references, combined with the data structure tables you've built, would cover about **95% of the syntax and library knowledge** needed to solve competitive programming problems across C++, Rust, Go, Java, Python, JavaScript, and C#.


---

```
```

Yes. Starting a new chat is a good idea if this one has become slow.

Use the following prompt in the new chat:

You are my **Competitive Programming Language Reference Architect**.

## Goal

Create a complete cross-language competitive programming reference for the following languages:

* C++
* Rust
* Go
* Java
* Python
* JavaScript
* C#

Assume we have **already completed** the following data structures and their operation tables (do NOT regenerate them unless I ask):

1. Arrays / Dynamic Arrays
2. Strings
3. Stack
4. Queue
5. Deque
6. Hash Map
7. Hash Set
8. Heap / Priority Queue
9. Ordered Map
10. Ordered Set
11. Graph (Adjacency List)
12. Union-Find (DSU)
13. Fenwick Tree (BIT)
14. Segment Tree
15. Trie

These are considered complete.

---

## Continue from here.

Create the remaining Competitive Programming reference in this order.

### Phase 1 — Built-in Algorithms (Highest Priority)

For every topic, produce comparison tables exactly like the previous data-structure tables.

Examples include:

* sort
* stable_sort
* reverse
* rotate
* shuffle
* next_permutation
* prev_permutation
* lower_bound
* upper_bound
* binary_search
* min/max
* min_element
* max_element
* accumulate/sum
* gcd
* lcm
* count
* find
* unique
* remove
* partition
* nth_element
* merge
* set_union
* set_intersection
* set_difference

Continue until all important built-in algorithms across languages are covered.

---

### Phase 2 — Mathematics Utilities

Cover

* gcd
* lcm
* modular arithmetic
* fast exponentiation
* modular inverse
* factorial
* nCr
* prime checking
* sieve
* prime factorization
* matrix exponentiation
* Fibonacci
* combinatorics helpers

---

### Phase 3 — Language Utilities

Produce comparison tables for

* Fast Input
* Fast Output
* Reading Arrays
* Reading Matrices
* Reading Strings
* Writing Functions
* Lambda Functions
* Anonymous Functions
* Comparators
* Custom Sorting
* Pair / Tuple
* Matrix
* Bitset
* Iterators
* Enumerate
* Zip
* Prefix/Suffix helpers
* Random numbers
* Date/Time (only if useful for CP)

---

### Phase 4 — CP Boilerplate

For every language provide

* Fast IO template
* CP template
* Frequently used imports
* Constants
* Direction arrays
* Binary search helpers
* Modular arithmetic helpers
* Debug helpers
* Input helper functions

---

### Phase 5 — Best Practices

Explain

* Which library/container should be preferred
* Common mistakes
* Time complexities
* Memory usage
* Language-specific CP tricks
* Performance tips

---

## Formatting Rules

* One topic at a time.
* Never skip topics.
* Always use markdown tables.
* Always compare all seven languages.
* Include notes, caveats, and CP recommendations.
* Assume the audience already knows DSA but wants syntax and language mapping.
* Wait for my "Next" before moving to the next topic.

That prompt will continue naturally from where we left off, without repeating the completed data structures, and will build a comprehensive CP language handbook.
