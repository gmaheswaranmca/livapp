# LeetCode 75 Study Plan

## Recommended Learning Order for Learning

| Phase    | Topics                           | Key Problems         |
| -------- | -------------------------------- | -------------------- |
| Phase 1  | Array/String                     | 1768, 605, 345, <151  |
| Phase 2  | Two Pointers                     | 283, 392, <11         |
| Phase 3  | Sliding Window                   | 643, 1456, <1004      |
| Phase 4  | Prefix Sum + Hashing             | 724, 1207, <2352      |
| Phase 5  | Stack + Queue                    | 2390, 394, <933       |
| Phase 6  | Linked List                      | 206, 141, <328        |
| Phase 7  | Binary Search                    | <374, 875, <162        |
| Phase 8  | Backtracking                     | 17, <216              |
| Phase 9  | Dynamic Programming              | <1137, <746, 198, 1143 |
| Phase 10 | Binary Tree                      | 104, 199, 1448       |
| Phase 11 | BST                              | 700, <450             |
| Phase 12 | Graph                            | 841, 547, <1926       |
| Phase 13 | Heap                             | 215, <2462            |
| Phase 14 | Bit Manipulation                 | <136, <338             |
| Phase 15 | Trie, Intervals, Monotonic Stack | 208, 435, 739        |

The most important 25 problems are:

`1768, 605, 345, 283, 392, 643, 724, 1207, 2390, 394, 206, 141, 875, 17, 104, 199, 1448, 700, 841, 547, 215, 198, 1143, 208, 739`

These 25 teach almost every major DSA pattern used in interviews.

## 1. Array / String

| LC # | Title                                    | Description                                                                              | Sample Input                  | Sample Output             | Idea                                                 |
| ---- | ---------------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------- | ------------------------- | ---------------------------------------------------- |
| 1768 | Merge Strings Alternately                | Merge two strings by taking characters alternately from each string.                     | word1="abc", word2="pqr"      | "apbqcr"                  | Use two pointers to pick characters alternately.     |
| 1071 | Greatest Common Divisor of Strings       | Find largest string that can repeatedly form both strings.                               | str1="ABCABC", str2="ABC"     | "ABC"                     | Check concatenation property and use GCD of lengths. |
| 1431 | Kids With the Greatest Number of Candies | Determine whether each child can have the maximum candies after receiving extra candies. | [2,3,5,1,3], extra=3          | [T,T,T,F,T]               | Find maximum candy count first.                      |
| 605  | Can Place Flowers                        | Determine if n flowers can be planted without adjacent flowers.                          | [1,0,0,0,1], n=1              | true                      | Greedy placement whenever possible.                  |
| 345  | Reverse Vowels of a String               | Reverse only vowels while keeping other characters fixed.                                | "hello"                       | "holle"                   | Two pointers from both ends.                         |
| 151  | Reverse Words in a String                | Reverse order of words in a sentence.                                                    | "the sky is blue"             | "blue is sky the"         | Split, reverse, join.                                |
| 238  | Product of Array Except Self             | Return product of all elements except current index.                                     | [1,2,3,4]                     | [24,12,8,6]               | Prefix and suffix products.                          |
| 334  | Increasing Triplet Subsequence           | Determine whether increasing subsequence of length 3 exists.                             | [1,2,3,4,5]                   | true                      | Track smallest and second smallest values.           |
| 443  | String Compression                       | Compress repeated characters in-place.                                                   | ["a","a","b","b","c","c","c"] | ["a","2","b","2","c","3"] | Two pointers and count frequencies.                  |

---

## 2. Two Pointers

| LC # | Title                     | Description                                     | Sample Input        | Sample Output | Idea                                |
| ---- | ------------------------- | ----------------------------------------------- | ------------------- | ------------- | ----------------------------------- |
| 283  | Move Zeroes               | Move all zeroes to end while maintaining order. | [0,1,0,3,12]        | [1,3,12,0,0]  | Slow-fast pointers.                 |
| 392  | Is Subsequence            | Check if one string is subsequence of another.  | s="abc", t="ahbgdc" | true          | Move pointers through both strings. |
| 11   | Container With Most Water | Find maximum water container.                   | [1,8,6,2,5,4,8,3,7] | 49            | Two pointers from both ends.        |
| 1679 | Max Number of K-Sum Pairs | Count maximum pairs summing to k.               | [1,2,3,4], k=5      | 2             | Sort + two pointers.                |

---

## 3. Sliding Window

| LC # | Title                                                   | Description                                     | Sample Input             | Sample Output | Idea                              |
| ---- | ------------------------------------------------------- | ----------------------------------------------- | ------------------------ | ------------- | --------------------------------- |
| 643  | Maximum Average Subarray I                              | Find max average of size k.                     | [1,12,-5,-6,50,3], k=4   | 12.75         | Fixed-size sliding window.        |
| 1456 | Maximum Number of Vowels in a Substring of Given Length | Maximum vowels in window size k.                | "abciiidef", k=3         | 3             | Sliding window vowel count.       |
| 1004 | Max Consecutive Ones III                                | Longest subarray with at most k zero flips.     | [1,1,1,0,0,0,1,1,1], k=2 | 6             | Variable-size window.             |
| 1493 | Longest Subarray of 1's After Deleting One Element      | Delete one element and maximize consecutive 1s. | [1,1,0,1]                | 3             | Sliding window allowing one zero. |

---

## 4. Prefix Sum

| LC # | Title                     | Description                                 | Sample Input  | Sample Output | Idea                       |
| ---- | ------------------------- | ------------------------------------------- | ------------- | ------------- | -------------------------- |
| 724  | Find Pivot Index          | Find index where left sum equals right sum. | [1,7,3,6,5,6] | 3             | Total sum and running sum. |
| 1732 | Find the Highest Altitude | Find highest altitude after gains.          | [-5,1,5,0,-7] | 1             | Running prefix sum.        |

---

## 5. Hash Map / Set

| LC # | Title                              | Description                                            | Sample Input    | Sample Output | Idea                          |
| ---- | ---------------------------------- | ------------------------------------------------------ | --------------- | ------------- | ----------------------------- |
| 2215 | Find the Difference of Two Arrays  | Return distinct values unique to each array.           | [1,2,3],[2,4,6] | [[1,3],[4,6]] | Use sets.                     |
| 1207 | Unique Number of Occurrences       | Check whether frequencies are unique.                  | [1,2,2,1,1,3]   | true          | HashMap frequency count.      |
| 1657 | Determine if Two Strings Are Close | Check if strings can transform via allowed operations. | "abc","bca"     | true          | Frequency and character sets. |
| 2352 | Equal Row and Column Pairs         | Count matching row-column pairs.                       | Matrix          | count         | Hash rows and columns.        |

---

## 6. Stack

| LC # | Title                        | Description                     | Sample Input  | Sample Output | Idea                       |
| ---- | ---------------------------- | ------------------------------- | ------------- | ------------- | -------------------------- |
| 2390 | Removing Stars From a String | Remove character before each *. | "leet**cod*e" | "lecoe"       | Stack simulation.          |
| 735  | Asteroid Collision           | Simulate asteroid collisions.   | [5,10,-5]     | [5,10]        | Stack.                     |
| 394  | Decode String                | Decode nested encoded string.   | "3[a2[c]]"    | "accaccacc"   | Stack for nested patterns. |
| 901  | Online Stock Span            | Find stock span for each day.   | stream        | spans         | Monotonic stack.           |

---

## 7. Queue

| LC # | Title                  | Description                     | Sample Input      | Sample Output | Idea              |
| ---- | ---------------------- | ------------------------------- | ----------------- | ------------- | ----------------- |
| 933  | Number of Recent Calls | Count requests in last 3000 ms. | ping(1),ping(100) | counts        | Queue.            |
| 649  | Dota2 Senate           | Predict winning party.          | "RDD"             | "Dire"        | Queue simulation. |

---

# 8. Linked List

| LC # | Title                                   | Description                                             | Sample Input           | Sample Output | Idea                                       |
| ---- | --------------------------------------- | ------------------------------------------------------- | ---------------------- | ------------- | ------------------------------------------ |
| 2095 | Delete the Middle Node of a Linked List | Delete the middle node and return the modified list.    | head=[1,3,4,7,1,2,6]   | [1,3,4,1,2,6] | Use slow and fast pointers to find middle. |
| 328  | Odd Even Linked List                    | Group odd-indexed nodes followed by even-indexed nodes. | [1,2,3,4,5]            | [1,3,5,2,4]   | Maintain odd and even chains separately.   |
| 206  | Reverse Linked List                     | Reverse a singly linked list.                           | [1,2,3,4,5]            | [5,4,3,2,1]   | Iteratively reverse next pointers.         |
| 2130 | Maximum Twin Sum of a Linked List       | Find maximum twin sum.                                  | [5,4,2,1]              | 6             | Reverse second half and compare pairs.     |
| 141  | Linked List Cycle                       | Determine if cycle exists.                              | head=[3,2,0,-4], pos=1 | true          | Floyd Cycle Detection.                     |
| 142  | Linked List Cycle II                    | Return node where cycle begins.                         | head=[3,2,0,-4], pos=1 | node 2        | Floyd Cycle Detection + reset pointer.     |

---

# 9. Binary Tree DFS

| LC # | Title                                | Description                                         | Sample Input                         | Sample Output | Idea                      |
| ---- | ------------------------------------ | --------------------------------------------------- | ------------------------------------ | ------------- | ------------------------- |
| 104  | Maximum Depth of Binary Tree         | Return maximum depth of tree.                       | [3,9,20,null,null,15,7]              | 3             | DFS recursively.          |
| 872  | Leaf Similar Trees                   | Check whether leaf sequences are identical.         | root1=[3,5,1...], root2=[3,5,1...]   | true          | Collect leaves using DFS. |
| 1448 | Count Good Nodes in Binary Tree      | Count nodes greater than or equal to all ancestors. | [3,1,4,3,null,1,5]                   | 4             | DFS with max-so-far.      |
| 437  | Path Sum III                         | Count paths whose sum equals target.                | root=[10,5,-3,3,2,null,11], target=8 | 3             | Prefix Sum + DFS.         |
| 1372 | Longest ZigZag Path in a Binary Tree | Find longest zigzag path.                           | [1,null,1,1,1,null,null,1,1,null,1]  | 3             | DFS tracking direction.   |

---

# 10. Binary Tree BFS

| LC # | Title                               | Description                           | Sample Input          | Sample Output | Idea                   |
| ---- | ----------------------------------- | ------------------------------------- | --------------------- | ------------- | ---------------------- |
| 199  | Binary Tree Right Side View         | Return nodes visible from right side. | [1,2,3,null,5,null,4] | [1,3,4]       | Level Order Traversal. |
| 1161 | Maximum Level Sum of a Binary Tree  | Find level with largest sum.          | [1,7,0,7,-8]          | 2             | BFS level by level.    |
| 515  | Find Largest Value in Each Tree Row | Largest value at every level.         | [1,3,2,5,3,null,9]    | [1,3,9]       | BFS level maximum.     |

---

# 11. Binary Search Tree

| LC # | Title              | Description                   | Sample Input                   | Sample Output       | Idea                      |
| ---- | ------------------ | ----------------------------- | ------------------------------ | ------------------- | ------------------------- |
| 700  | Search in BST      | Find node with given value.   | root=[4,2,7,1,3], val=2        | subtree rooted at 2 | Use BST property.         |
| 450  | Delete Node in BST | Delete node and preserve BST. | root=[5,3,6,2,4,null,7], key=3 | modified BST        | Handle 0,1,2 child cases. |

---

# 12. Graphs

| LC # | Title                                              | Description                           | Sample Input                                     | Sample Output | Idea                         |
| ---- | -------------------------------------------------- | ------------------------------------- | ------------------------------------------------ | ------------- | ---------------------------- |
| 841  | Keys and Rooms                                     | Visit all rooms using available keys. | [[1],[2],[3],[]]                                 | true          | DFS/BFS traversal.           |
| 547  | Number of Provinces                                | Count connected components.           | [[1,1,0],[1,1,0],[0,0,1]]                        | 2             | DFS/BFS on adjacency matrix. |
| 1466 | Reorder Routes to Make All Paths Lead to City Zero | Minimum edge reversals.               | n=6, connections=[[0,1],[1,3],[2,3],[4,0],[4,5]] | 3             | DFS with direction tracking. |
| 399  | Evaluate Division                                  | Evaluate division queries.            | equations=[["a","b"],["b","c"]]                  | [6.0]         | Weighted graph traversal.    |
| 1926 | Nearest Exit from Entrance in Maze                 | Find nearest exit.                    | maze, entrance=[1,2]                             | 1             | BFS shortest path.           |

---

# 13. Heap / Priority Queue

| LC # | Title                           | Description               | Sample Input                        | Sample Output | Idea             |
| ---- | ------------------------------- | ------------------------- | ----------------------------------- | ------------- | ---------------- |
| 215  | Kth Largest Element in an Array | Find kth largest element. | [3,2,1,5,6,4], k=2                  | 5             | Min Heap size k. |
| 2336 | Smallest Number in Infinite Set | Pop/add smallest number.  | commands                            | outputs       | Heap + HashSet.  |
| 2542 | Maximum Subsequence Score       | Maximize score formula.   | nums1, nums2, k                     | score         | Sort + Heap.     |
| 2462 | Total Cost to Hire K Workers    | Minimum hiring cost.      | costs=[17,12,10,2,7,2,11,20,8], k=3 | 11            | Two heaps.       |

---

# 14. Binary Search

| LC # | Title                                  | Description                                                 | Sample Input                                   | Sample Output | Idea                            |
| ---- | -------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------- | ------------- | ------------------------------- |
| 374  | Guess Number Higher or Lower           | Guess a hidden number using API feedback.                   | n=10, pick=6                                   | 6             | Classic Binary Search.          |
| 2300 | Successful Pairs of Spells and Potions | Count potions that form a successful pair with each spell.  | spells=[5,1,3], potions=[1,2,3,4,5], success=7 | [4,0,3]       | Sort potions and binary search. |
| 875  | Koko Eating Bananas                    | Find minimum eating speed to finish bananas within h hours. | piles=[3,6,7,11], h=8                          | 4             | Binary Search on answer.        |
| 162  | Find Peak Element                      | Find any peak element.                                      | [1,2,3,1]                                      | 2             | Binary Search on slope.         |

---

# 15. Backtracking

| LC # | Title                                 | Description                                  | Sample Input | Sample Output                                  | Idea                               |
| ---- | ------------------------------------- | -------------------------------------------- | ------------ | ---------------------------------------------- | ---------------------------------- |
| 216  | Combination Sum III                   | Find combinations of k numbers summing to n. | k=3, n=7     | [[1,2,4]]                                      | Generate combinations recursively. |
| 17   | Letter Combinations of a Phone Number | Generate all letter combinations.            | digits="23"  | ["ad","ae","af","bd","be","bf","cd","ce","cf"] | Backtracking over digit choices.   |

---

# 16. Dynamic Programming

| LC # | Title                                                | Description                                          | Sample Input                | Sample Output | Idea                      |
| ---- | ---------------------------------------------------- | ---------------------------------------------------- | --------------------------- | ------------- | ------------------------- |
| 1137 | N-th Tribonacci Number                               | Return nth Tribonacci number.                        | n=4                         | 4             | DP recurrence.            |
| 746  | Min Cost Climbing Stairs                             | Minimum cost to reach top.                           | [10,15,20]                  | 15            | DP from bottom-up.        |
| 198  | House Robber                                         | Maximum money without robbing adjacent houses.       | [1,2,3,1]                   | 4             | Include/Exclude DP.       |
| 790  | Domino and Tromino Tiling                            | Count tilings of 2×n board.                          | n=3                         | 5             | State DP.                 |
| 62   | Unique Paths                                         | Count paths in grid.                                 | m=3,n=7                     | 28            | Grid DP.                  |
| 1143 | Longest Common Subsequence                           | Length of LCS between strings.                       | "abcde","ace"               | 3             | 2D DP table.              |
| 714  | Best Time to Buy and Sell Stock with Transaction Fee | Max stock profit with fee.                           | prices=[1,3,2,8,4,9], fee=2 | 8             | DP states buy/sell.       |
| 72   | Edit Distance                                        | Minimum operations to convert one string to another. | "horse","ros"               | 3             | Classic DP.               |
| 583  | Delete Operation for Two Strings                     | Minimum deletions to make strings equal.             | "sea","eat"                 | 2             | Based on LCS.             |
| 1318 | Minimum Flips to Make a OR b Equal c                 | Minimum bit flips required.                          | a=2,b=6,c=5                 | 3             | Bit DP/Bit manipulation.  |
| 338  | Counting Bits                                        | Count set bits from 0 to n.                          | n=5                         | [0,1,1,2,1,2] | DP using previous values. |
| 1987 | Number of Unique Good Subsequences                   | Count unique binary subsequences.                    | "001"                       | 2             | DP on binary string.      |

---

# 17. Bit Manipulation

| LC # | Title                                | Description                                            | Sample Input     | Sample Output | Idea                    |
| ---- | ------------------------------------ | ------------------------------------------------------ | ---------------- | ------------- | ----------------------- |
| 136  | Single Number                        | Find element appearing once.                           | [2,2,1]          | 1             | XOR cancels duplicates. |
| 137  | Single Number II                     | Find element appearing once when others appear thrice. | [2,2,3,2]        | 3             | Count bits.             |
| 338  | Counting Bits                        | Count set bits.                                        | n=5              | [0,1,1,2,1,2] | DP + bit relation.      |
| 1318 | Minimum Flips to Make a OR b Equal c | Minimum flips needed.                                  | 2,6,5            | 3             | Examine bits.           |
| 2220 | Minimum Bit Flips to Convert Number  | Convert start to goal.                                 | start=10, goal=7 | 3             | XOR then count bits.    |

---

# 18. Trie

| LC # | Title                        | Description                                      | Sample Input                     | Sample Output | Idea                     |
| ---- | ---------------------------- | ------------------------------------------------ | -------------------------------- | ------------- | ------------------------ |
| 208  | Implement Trie (Prefix Tree) | Design insert, search and startsWith operations. | insert("apple"), search("apple") | true          | Trie node with children. |

---

# 19. Intervals

| LC # | Title                                      | Description                                | Sample Input                 | Sample Output | Idea                    |
| ---- | ------------------------------------------ | ------------------------------------------ | ---------------------------- | ------------- | ----------------------- |
| 435  | Non-overlapping Intervals                  | Remove minimum intervals to avoid overlap. | [[1,2],[2,3],[3,4],[1,3]]    | 1             | Greedy by end time.     |
| 452  | Minimum Number of Arrows to Burst Balloons | Minimum arrows to burst balloons.          | [[10,16],[2,8],[1,6],[7,12]] | 2             | Sort by end coordinate. |

---

# 20. Monotonic Stack

| LC # | Title              | Description                         | Sample Input              | Sample Output     | Idea                        |
| ---- | ------------------ | ----------------------------------- | ------------------------- | ----------------- | --------------------------- |
| 739  | Daily Temperatures | Find days until warmer temperature. | [73,74,75,71,69,72,76,73] | [1,1,4,2,1,1,0,0] | Monotonic decreasing stack. |

---

This gives the complete categorized LeetCode 75 roadmap. For teaching purposes, I would recommend learning in this order:

**Array/String → Two Pointers → Sliding Window → Hashing → Stack → Queue → Linked List → Binary Tree → BST → Graph → Heap → Binary Search → Backtracking → DP → Bit Manipulation → Trie → Intervals → Monotonic Stack.**
