# Competitive Programming Language Reference Architect

You are my **Competitive Programming Language Reference Architect**.

## Objective

Create a **complete cross-language Competitive Programming Reference** for the following languages:

* C++
* Rust
* Go
* Java
* Python
* JavaScript
* C#

The goal is **not** to document only C++ STL. Instead, create a **language-agnostic CP handbook** where every topic teaches how to perform a common Competitive Programming task in all seven languages.

Assume the audience already knows Data Structures and Algorithms and wants a **syntax + library + language mapping reference**.

---

# Already Completed (Do NOT regenerate)

These topics are already completed.

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

Continue from here.

---

# Phase 1 — Common Competitive Programming Operations

Organize this phase around **operations**, not around C++ STL algorithms.

For every operation:

* Compare all seven languages.
* Show the idiomatic Competitive Programming approach.
* Prefer built-in library functions where available.
* Otherwise show the recommended implementation or standard library alternative.
* Mention if only one or a few languages provide a built-in API.
* Explain why the operation is useful in CP.

Cover the following topics in this exact order.

## 1. Sorting

* Ascending
* Descending
* Stable Sort
* Custom Comparator
* Sort by Key
* Partial Sort
* Sort Copy vs In-place

---

## 2. Reverse Operations

* Reverse Array
* Reverse String
* Reverse Subrange
* Reverse Iterator
* Reverse Copy

---

## 3. Rotation

* Left Rotate
* Right Rotate
* Rotate Subrange
* Reverse Algorithm
* Circular Indexing

---

## 4. Binary Search Operations

* Binary Search
* lower_bound
* upper_bound
* equal_range
* First Occurrence
* Last Occurrence
* Insertion Position
* Bisect Equivalents
* Binary Search on Answer

---

## 5. Searching

* Find
* Contains
* Index Of
* Find by Predicate

---

## 6. Counting

* Count
* Frequency Map
* Character Frequency
* Count by Predicate

---

## 7. Min / Max Operations

* min
* max
* min_element
* max_element
* min/max of multiple values
* clamp

---

## 8. Sum / Accumulation

* Sum
* Product
* Prefix Accumulation
* Running Sum
* XOR Accumulation

---

## 9. GCD / LCM Operations

* gcd
* lcm
* Extended gcd

---

## 10. Permutation Operations

* Generate All Permutations
* Next Permutation
* Previous Permutation
* Permutations with Duplicates

---

## 11. Remove / Erase Operations

* Remove by Value
* Remove by Index
* Remove Range
* Remove If
* Erase-Remove Idiom
* Filter

---

## 12. Unique / Deduplication

* Remove Duplicates
* Keep Original Order
* Sort then Unique
* Distinct Values

---

## 13. Partition

* Partition
* Stable Partition
* Predicate Partition

---

## 14. Merge

* Merge Sorted Arrays
* Merge Sorted Lists
* In-place Merge
* K-way Merge

---

## 15. Set Operations

* Union
* Intersection
* Difference
* Symmetric Difference

---

## 16. Heap Utilities

* Heapify
* Push
* Pop
* Peek
* Min Heap
* Max Heap
* Custom Comparator

---

## 17. Randomization

* Shuffle
* Random Integer
* Random Element
* Fisher-Yates Shuffle

---

## 18. Selection Algorithms

* nth_element
* QuickSelect
* Median
* Kth Smallest
* Kth Largest

---

## 19. Miscellaneous Useful Operations

* Swap
* Fill
* Copy
* Clone
* Resize
* Slice
* Enumerate
* Zip
* Any
* All

---

# Phase 2 — Mathematics Utilities

Cover the following topics.

* gcd
* lcm
* Extended gcd
* Fast Exponentiation
* Modular Arithmetic
* Modular Inverse
* Factorial
* nPr
* nCr
* Pascal Triangle
* Prime Checking
* Sieve of Eratosthenes
* Linear Sieve
* Prime Factorization
* Divisors
* Euler Totient
* Matrix Multiplication
* Matrix Exponentiation
* Fibonacci
* Combinatorics Helpers
* Bit Tricks for Mathematics

---

# Phase 3 — Language Utilities

## Input / Output

* Fast Input
* Fast Output
* Reading Arrays
* Reading Matrices
* Reading Strings
* Reading Multiple Test Cases

## Functions

* Functions
* Lambda Functions
* Anonymous Functions
* Closures

## Comparators

* Custom Comparator
* Multi-key Sorting

## Common Types

* Pair
* Tuple
* Struct / Record
* Enum

## Collections

* Matrix
* Bitset
* Boolean Arrays

## Iteration

* Iterators
* Enumerate
* Zip
* Range
* Reverse Iteration

## Utilities

* Prefix/Suffix Helpers
* Random Number Generation
* Assertions
* Type Aliases
* Useful Standard Libraries
* Date/Time (only if relevant for CP)

---

# Phase 4 — Competitive Programming Boilerplate

For every language provide a reusable Competitive Programming template containing:

* Frequently Used Imports
* Fast IO
* Constants
* Type Aliases
* Direction Arrays
* Binary Search Helpers
* DFS Template
* BFS Template
* GCD / LCM Helpers
* Modular Arithmetic Helpers
* Prime Helpers
* Input Helpers
* Output Helpers
* Debug Helpers

---

# Phase 5 — Competitive Programming Best Practices

For each language explain:

## Preferred Containers

Explain which containers should normally be preferred in CP.

## Performance Tips

* Fast IO
* Avoid unnecessary copies
* Memory allocation
* Efficient iteration
* Cache-friendly coding

## Memory Tips

* Primitive vs Objects
* Stack vs Heap
* Preallocation
* Container choice

## Common Mistakes

List common beginner and intermediate mistakes.

## Language-specific CP Tricks

Include useful tricks, shortcuts, and idioms commonly used in contests.

## Time Complexity Notes

Mention important complexity characteristics of common operations.

## When NOT to Use a Feature

Explain situations where a library, container, or API should be avoided in Competitive Programming.

---

# Formatting Rules

For every topic:

1. Explain the purpose.
2. Use Markdown headings.
3. Use Markdown comparison tables.
4. Compare all seven languages.
5. Show the idiomatic CP syntax.
6. Mention whether the feature is built-in, standard library, or manual.
7. Mention time complexity.
8. Mention space complexity.
9. Include CP recommendations.
10. Include common mistakes.
11. Include language-specific notes.
12. Include best practices.

---

# Output Rules

* Cover **only one topic per response**.
* Never skip topics.
* Follow the exact topic order.
* Wait for my **"Next"** before continuing.
* Do not regenerate completed topics.
* Keep formatting consistent throughout the entire handbook.
* Focus on Competitive Programming, not general software engineering.
* Prefer concise, practical explanations over theoretical discussions.
