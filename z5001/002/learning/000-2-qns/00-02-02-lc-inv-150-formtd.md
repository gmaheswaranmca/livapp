# Phase 1 – Array / String (Top Interview 150)

| S.No | LC # | Title                                              | Description                                       | Sample Input                       | Sample Output     | Idea                                    |
| ---- | ---- | -------------------------------------------------- | ------------------------------------------------- | ---------------------------------- | ----------------- | --------------------------------------- |
| 1    | 88   | Merge Sorted Array                                 | Merge nums2 into nums1 as one sorted array.       | nums1=[1,2,3,0,0,0], nums2=[2,5,6] | [1,2,2,3,5,6]     | Use 3 pointers from the end.            |
| 2    | 27   | Remove Element                                     | Remove all occurrences of val in-place.           | nums=[3,2,2,3], val=3              | 2, [2,2]          | Two pointers overwrite unwanted values. |
| 3    | 26   | Remove Duplicates from Sorted Array                | Keep only unique values in sorted array.          | [1,1,2]                            | 2, [1,2]          | Slow-fast pointers.                     |
| 4    | 80   | Remove Duplicates from Sorted Array II             | Allow at most two occurrences of each value.      | [1,1,1,2,2,3]                      | 5, [1,1,2,2,3]    | Track valid insertion position.         |
| 5    | 169  | Majority Element                                   | Find element appearing more than n/2 times.       | [3,2,3]                            | 3                 | Boyer-Moore Voting Algorithm.           |
| 6    | 189  | Rotate Array                                       | Rotate array right by k positions.                | [1,2,3,4,5,6,7], k=3               | [5,6,7,1,2,3,4]   | Reverse entire array and parts.         |
| 7    | 121  | Best Time to Buy and Sell Stock                    | Max profit from one transaction.                  | [7,1,5,3,6,4]                      | 5                 | Track minimum price so far.             |
| 8    | 122  | Best Time to Buy and Sell Stock II                 | Max profit from multiple transactions.            | [7,1,5,3,6,4]                      | 7                 | Add every positive difference.          |
| 9    | 55   | Jump Game                                          | Check if last index can be reached.               | [2,3,1,1,4]                        | true              | Track farthest reachable index.         |
| 10   | 45   | Jump Game II                                       | Find minimum jumps to reach end.                  | [2,3,1,1,4]                        | 2                 | Greedy BFS-like range expansion.        |
| 11   | 274  | H-Index                                            | Find researcher's H-index.                        | [3,0,6,1,5]                        | 3                 | Sort citations and evaluate.            |
| 12   | 380  | Insert Delete GetRandom O(1)                       | Design data structure supporting O(1) operations. | insert(1), remove(1)               | true/false        | HashMap + Dynamic Array.                |
| 13   | 238  | Product of Array Except Self                       | Product except current index.                     | [1,2,3,4]                          | [24,12,8,6]       | Prefix and suffix products.             |
| 14   | 134  | Gas Station                                        | Find starting station to complete circuit.        | gas=[1,2,3,4,5], cost=[3,4,5,1,2]  | 3                 | Greedy cumulative balance.              |
| 15   | 135  | Candy                                              | Minimum candies satisfying ratings rule.          | [1,0,2]                            | 5                 | Left-to-right and right-to-left passes. |
| 16   | 42   | Trapping Rain Water                                | Compute trapped rain water.                       | [0,1,0,2,1,0,1,3,2,1,2,1]          | 6                 | Two pointers with left/right max.       |
| 17   | 13   | Roman to Integer                                   | Convert Roman numeral to integer.                 | "MCMXCIV"                          | 1994              | Handle subtraction pairs.               |
| 18   | 12   | Integer to Roman                                   | Convert integer to Roman numeral.                 | 1994                               | "MCMXCIV"         | Greedy largest symbol selection.        |
| 19   | 58   | Length of Last Word                                | Return length of last word.                       | "Hello World"                      | 5                 | Traverse from end.                      |
| 20   | 14   | Longest Common Prefix                              | Find longest common prefix.                       | ["flower","flow","flight"]         | "fl"              | Compare characters column-wise.         |
| 21   | 151  | Reverse Words in a String                          | Reverse word order.                               | "the sky is blue"                  | "blue is sky the" | Split, reverse, join.                   |
| 22   | 6    | Zigzag Conversion                                  | Convert string into zigzag pattern.               | s="PAYPALISHIRING", rows=3         | "PAHNAPLSIIGYIR"  | Simulate row traversal.                 |
| 23   | 28   | Find the Index of the First Occurrence in a String | Find first occurrence of needle.                  | haystack="sadbutsad", needle="sad" | 0                 | String matching.                        |
| 24   | 68   | Text Justification                                 | Fully justify text to fixed width.                | words=["This","is","an"], width=16 | justified lines   | Greedy line formation and spacing.      |

---

### Phase 1 Patterns Learned

| Pattern            | Problems                |
| ------------------ | ----------------------- |
| Two Pointers       | 88, 26, 27, 80          |
| Greedy             | 55, 45, 134, 135        |
| Prefix/Suffix      | 238                     |
| Array Reversal     | 189                     |
| Voting Algorithm   | 169                     |
| Simulation         | 6, 68                   |
| String Processing  | 13, 12, 14, 28, 58, 151 |
| Stock Problems     | 121, 122                |
| Advanced DS Design | 380                     |
| Water Trapping     | 42                      |

# Phase 2 – Two Pointers (Top Interview 150)

| S.No | LC # | Title                              | Description                                                                                              | Sample Input                       | Sample Output        | Idea                                                                   |
| ---- | ---- | ---------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------- | -------------------- | ---------------------------------------------------------------------- |
| 25   | 125  | Valid Palindrome                   | Determine whether a string is a palindrome after removing non-alphanumeric characters and ignoring case. | s="A man, a plan, a canal: Panama" | true                 | Use two pointers from both ends, skipping non-alphanumeric characters. |
| 26   | 392  | Is Subsequence                     | Check whether string s is a subsequence of string t.                                                     | s="abc", t="ahbgdc"                | true                 | Move pointers through both strings and match characters.               |
| 27   | 167  | Two Sum II - Input Array Is Sorted | Find two numbers in a sorted array that add up to target.                                                | numbers=[2,7,11,15], target=9      | [1,2]                | Use left and right pointers based on current sum.                      |
| 28   | 11   | Container With Most Water          | Find two lines that together hold the maximum amount of water.                                           | height=[1,8,6,2,5,4,8,3,7]         | 49                   | Use two pointers and move the shorter line inward.                     |
| 29   | 15   | 3Sum                               | Find all unique triplets whose sum is zero.                                                              | nums=[-1,0,1,2,-1,-4]              | [[-1,-1,2],[-1,0,1]] | Sort array, fix one element, then use two pointers.                    |

---

### Phase 2 Patterns Learned

| Pattern                          | Problems |
| -------------------------------- | -------- |
| Basic Two Pointers               | 125, 392 |
| Opposite-End Pointers            | 167, 11  |
| Sorted Array Technique           | 167, 15  |
| Duplicate Handling               | 15       |
| Optimization from O(n³) to O(n²) | 15       |
| Greedy + Two Pointers            | 11       |

---

### Key Learning Outcomes

| Problem | Concept                          |
| ------- | -------------------------------- |
| 125     | String Processing + Two Pointers |
| 392     | Subsequence Checking             |
| 167     | Pair Sum in Sorted Array         |
| 11      | Two Pointer Optimization         |
| 15      | Foundation for k-Sum Problems    |

---

### Interview Importance Ranking

| Priority      | Problems         |
| ------------- | ---------------- |
| Must Do       | 125, 167, 11, 15 |
| Good Practice | 392              |

---

# Phase 3 – Sliding Window (Top Interview 150)

| S.No | LC # | Title                                          | Description                                                                      | Sample Input                                | Sample Output | Idea                                                              |
| ---- | ---- | ---------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------- | ------------- | ----------------------------------------------------------------- |
| 30   | 209  | Minimum Size Subarray Sum                      | Find the minimum length of a subarray whose sum is at least target.              | target=7, nums=[2,3,1,2,4,3]                | 2             | Expand window until sum ≥ target, then shrink it.                 |
| 31   | 3    | Longest Substring Without Repeating Characters | Find the length of the longest substring without repeating characters.           | s="abcabcbb"                                | 3             | Maintain a window with unique characters using a HashSet/HashMap. |
| 32   | 30   | Substring with Concatenation of All Words      | Find all starting indices where all words appear exactly once and consecutively. | s="barfoothefoobarman", words=["foo","bar"] | [0,9]         | Sliding window with word-frequency maps.                          |
| 33   | 76   | Minimum Window Substring                       | Find the smallest substring containing all characters of t.                      | s="ADOBECODEBANC", t="ABC"                  | "BANC"        | Expand to satisfy requirement, shrink to minimize window.         |

---

### Phase 3 Patterns Learned

| Pattern                        | Problems |
| ------------------------------ | -------- |
| Fixed-Length Sliding Window    | —        |
| Variable-Length Sliding Window | 209, 76  |
| Sliding Window + HashSet       | 3        |
| Sliding Window + Frequency Map | 30, 76   |
| Expand and Shrink Window       | 209, 76  |
| Hard Sliding Window            | 30, 76   |

---

### Key Learning Outcomes

| Problem | Concept                        |
| ------- | ------------------------------ |
| 209     | Basic Variable Window          |
| 3       | Unique Character Window        |
| 30      | Word-Based Window Matching     |
| 76      | Classic Minimum Window Pattern |

---

### Interview Importance Ranking

| Priority | Problems   |
| -------- | ---------- |
| Must Do  | 209, 3, 76 |
| Advanced | 30         |

---

# Phase 3 – Sliding Window (Top Interview 150)

| S.No | LC # | Title                                          | Description                                                                      | Sample Input                                | Sample Output | Idea                                                              |
| ---- | ---- | ---------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------- | ------------- | ----------------------------------------------------------------- |
| 30   | 209  | Minimum Size Subarray Sum                      | Find the minimum length of a subarray whose sum is at least target.              | target=7, nums=[2,3,1,2,4,3]                | 2             | Expand window until sum ≥ target, then shrink it.                 |
| 31   | 3    | Longest Substring Without Repeating Characters | Find the length of the longest substring without repeating characters.           | s="abcabcbb"                                | 3             | Maintain a window with unique characters using a HashSet/HashMap. |
| 32   | 30   | Substring with Concatenation of All Words      | Find all starting indices where all words appear exactly once and consecutively. | s="barfoothefoobarman", words=["foo","bar"] | [0,9]         | Sliding window with word-frequency maps.                          |
| 33   | 76   | Minimum Window Substring                       | Find the smallest substring containing all characters of t.                      | s="ADOBECODEBANC", t="ABC"                  | "BANC"        | Expand to satisfy requirement, shrink to minimize window.         |

---

### Phase 3 Patterns Learned

| Pattern                        | Problems |
| ------------------------------ | -------- |
| Fixed-Length Sliding Window    | —        |
| Variable-Length Sliding Window | 209, 76  |
| Sliding Window + HashSet       | 3        |
| Sliding Window + Frequency Map | 30, 76   |
| Expand and Shrink Window       | 209, 76  |
| Hard Sliding Window            | 30, 76   |

---

### Key Learning Outcomes

| Problem | Concept                        |
| ------- | ------------------------------ |
| 209     | Basic Variable Window          |
| 3       | Unique Character Window        |
| 30      | Word-Based Window Matching     |
| 76      | Classic Minimum Window Pattern |

---

### Interview Importance Ranking

| Priority | Problems   |
| -------- | ---------- |
| Must Do  | 209, 3, 76 |
| Advanced | 30         |

---

# Phase 4 – Matrix (Top Interview 150)

| S.No | LC # | Title             | Description                                                 | Sample Input                            | Sample Output             | Idea                                              |
| ---- | ---- | ----------------- | ----------------------------------------------------------- | --------------------------------------- | ------------------------- | ------------------------------------------------- |
| 34   | 36   | Valid Sudoku      | Determine whether a partially filled Sudoku board is valid. | board=[["5","3",".",...]]               | true                      | Use sets to track rows, columns, and 3×3 boxes.   |
| 35   | 54   | Spiral Matrix     | Return all elements of the matrix in spiral order.          | matrix=[[1,2,3],[4,5,6],[7,8,9]]        | [1,2,3,6,9,8,7,4,5]       | Maintain top, bottom, left, and right boundaries. |
| 36   | 48   | Rotate Image      | Rotate the n×n matrix by 90 degrees clockwise in-place.     | [[1,2,3],[4,5,6],[7,8,9]]               | [[7,4,1],[8,5,2],[9,6,3]] | Transpose the matrix, then reverse each row.      |
| 37   | 73   | Set Matrix Zeroes | If an element is 0, set its entire row and column to 0.     | [[1,1,1],[1,0,1],[1,1,1]]               | [[1,0,1],[0,0,0],[1,0,1]] | Use first row and first column as markers.        |
| 38   | 289  | Game of Life      | Compute the next state of Conway's Game of Life.            | board=[[0,1,0],[0,0,1],[1,1,1],[0,0,0]] | Updated board             | Encode current and next state in-place.           |

---

### Phase 4 Patterns Learned

| Pattern                | Problems    |
| ---------------------- | ----------- |
| Matrix Traversal       | 54          |
| Boundary Traversal     | 54          |
| Matrix Transformation  | 48          |
| In-Place Matrix Update | 48, 73, 289 |
| Row/Column Marking     | 73          |
| Simulation             | 289         |
| HashSet Validation     | 36          |

---

### Key Learning Outcomes

| Problem | Concept            |
| ------- | ------------------ |
| 36      | Matrix Validation  |
| 54      | Spiral Traversal   |
| 48      | Matrix Rotation    |
| 73      | Space Optimization |
| 289     | Grid Simulation    |

---

### Interview Importance Ranking

| Priority      | Problems   |
| ------------- | ---------- |
| Must Do       | 54, 48, 73 |
| Good Practice | 36         |
| Advanced      | 289        |

---

# Phase 5 – HashMap (Top Interview 150)

| S.No | LC # | Title                        | Description                                                        | Sample Input                          | Sample Output | Idea                                            |
| ---- | ---- | ---------------------------- | ------------------------------------------------------------------ | ------------------------------------- | ------------- | ----------------------------------------------- |
| 39   | 383  | Ransom Note                  | Determine if ransom note can be constructed from magazine letters. | ransomNote="aa", magazine="aab"       | true          | Count character frequencies.                    |
| 40   | 205  | Isomorphic Strings           | Check if characters in one string can map uniquely to another.     | s="egg", t="add"                      | true          | Maintain two-way mapping.                       |
| 41   | 290  | Word Pattern                 | Check whether words follow the given pattern.                      | pattern="abba", s="dog cat cat dog"   | true          | HashMap between pattern chars and words.        |
| 42   | 242  | Valid Anagram                | Determine whether two strings are anagrams.                        | s="anagram", t="nagaram"              | true          | Compare frequency counts.                       |
| 43   | 49   | Group Anagrams               | Group words that are anagrams.                                     | ["eat","tea","tan","ate","nat","bat"] | grouped lists | Use sorted string as key.                       |
| 44   | 1    | Two Sum                      | Find two indices whose values sum to target.                       | nums=[2,7,11,15], target=9            | [0,1]         | Store complements in HashMap.                   |
| 45   | 202  | Happy Number                 | Determine if repeated digit-square sum reaches 1.                  | n=19                                  | true          | Use HashSet to detect cycles.                   |
| 46   | 219  | Contains Duplicate II        | Check if duplicate values occur within distance k.                 | nums=[1,2,3,1], k=3                   | true          | HashMap stores latest index.                    |
| 47   | 128  | Longest Consecutive Sequence | Find longest sequence of consecutive numbers.                      | [100,4,200,1,3,2]                     | 4             | Use HashSet and start from sequence beginnings. |

---

### Phase 5 Patterns Learned

| Pattern            | Problems |
| ------------------ | -------- |
| Frequency Counting | 383, 242 |
| Character Mapping  | 205, 290 |
| HashMap Lookup     | 1, 219   |
| HashSet Membership | 202, 128 |
| Grouping by Key    | 49       |
| Cycle Detection    | 202      |
| Sequence Expansion | 128      |

---

### Key Learning Outcomes

| Problem | Concept                       |
| ------- | ----------------------------- |
| 383     | Frequency Map                 |
| 205     | Bi-Directional Mapping        |
| 242     | Counting                      |
| 49      | Hashing + Grouping            |
| 1       | Classic HashMap               |
| 202     | Cycle Detection               |
| 128     | Optimal O(n) HashSet Solution |

---

### Interview Importance Ranking

| Priority      | Problems           |
| ------------- | ------------------ |
| Must Do       | 1, 49, 128, 242    |
| Good Practice | 383, 205, 290, 219 |
| Advanced      | 202                |

---

# Phase 6 – Intervals (Top Interview 150)

| S.No | LC # | Title                                      | Description                                                  | Sample Input                               | Sample Output          | Idea                                                   |
| ---- | ---- | ------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------ | ---------------------- | ------------------------------------------------------ |
| 48   | 228  | Summary Ranges                             | Summarize consecutive ranges in a sorted unique array.       | nums=[0,1,2,4,5,7]                         | ["0->2","4->5","7"]    | Track start and end of consecutive sequences.          |
| 49   | 56   | Merge Intervals                            | Merge all overlapping intervals.                             | [[1,3],[2,6],[8,10],[15,18]]               | [[1,6],[8,10],[15,18]] | Sort by start time and merge overlaps.                 |
| 50   | 57   | Insert Interval                            | Insert a new interval into sorted non-overlapping intervals. | intervals=[[1,3],[6,9]], newInterval=[2,5] | [[1,5],[6,9]]          | Process left, overlap, and right intervals separately. |
| 51   | 452  | Minimum Number of Arrows to Burst Balloons | Find minimum arrows needed to burst all balloons.            | points=[[10,16],[2,8],[1,6],[7,12]]        | 2                      | Sort by end position and greedily shoot arrows.        |

---

### Phase 6 Patterns Learned

| Pattern            | Problems    |
| ------------------ | ----------- |
| Interval Merging   | 56, 57      |
| Interval Traversal | 228         |
| Greedy Intervals   | 452         |
| Sorting Intervals  | 56, 57, 452 |
| Overlap Detection  | 56, 57      |

---

### Key Learning Outcomes

| Problem | Concept                      |
| ------- | ---------------------------- |
| 228     | Consecutive Range Processing |
| 56      | Classic Interval Merge       |
| 57      | Insert + Merge               |
| 452     | Greedy Interval Scheduling   |

---

### Interview Importance Ranking

| Priority      | Problems    |
| ------------- | ----------- |
| Must Do       | 56, 57, 452 |
| Good Practice | 228         |

---

# Phase 7 – Stack (Top Interview 150)

| S.No | LC # | Title                            | Description                                      | Sample Input          | Sample Output | Idea                                             |
| ---- | ---- | -------------------------------- | ------------------------------------------------ | --------------------- | ------------- | ------------------------------------------------ |
| 52   | 20   | Valid Parentheses                | Determine whether brackets are balanced.         | s="()[]{}"            | true          | Use stack to match opening and closing brackets. |
| 53   | 71   | Simplify Path                    | Simplify an absolute Unix path.                  | path="/home//foo/"    | "/home/foo"   | Use stack for directory processing.              |
| 54   | 155  | Min Stack                        | Design stack supporting getMin() in O(1).        | push,pop,getMin       | values        | Maintain an auxiliary minimum stack.             |
| 55   | 150  | Evaluate Reverse Polish Notation | Evaluate postfix expression.                     | ["2","1","+","3","*"] | 9             | Push operands, compute on operators.             |
| 56   | 224  | Basic Calculator                 | Evaluate arithmetic expression with parentheses. | s="1 + (2 - 3)"       | 0             | Stack stores previous results and signs.         |

---

### Phase 7 Patterns Learned

| Pattern               | Problems |
| --------------------- | -------- |
| Parentheses Matching  | 20       |
| Expression Evaluation | 150, 224 |
| Stack Simulation      | 71       |
| Auxiliary Stack       | 155      |
| Parsing               | 224      |

---

### Key Learning Outcomes

| Problem | Concept                 |
| ------- | ----------------------- |
| 20      | Fundamental Stack Usage |
| 71      | Path Processing         |
| 155     | Stack Design            |
| 150     | Postfix Evaluation      |
| 224     | Expression Parsing      |

---

### Interview Importance Ranking

| Priority      | Problems     |
| ------------- | ------------ |
| Must Do       | 20, 155, 150 |
| Good Practice | 71           |
| Advanced      | 224          |

---

# Phase 8 – Linked List (Top Interview 150)

| S.No | LC # | Title                                 | Description                                            | Sample Input                  | Sample Output | Idea                                     |
| ---- | ---- | ------------------------------------- | ------------------------------------------------------ | ----------------------------- | ------------- | ---------------------------------------- |
| 57   | 141  | Linked List Cycle                     | Determine whether a linked list contains a cycle.      | head=[3,2,0,-4], pos=1        | true          | Floyd's Slow and Fast Pointer algorithm. |
| 58   | 21   | Merge Two Sorted Lists                | Merge two sorted linked lists into one sorted list.    | [1,2,4], [1,3,4]              | [1,1,2,3,4,4] | Compare nodes and build merged list.     |
| 59   | 2    | Add Two Numbers                       | Add two numbers represented as linked lists.           | [2,4,3], [5,6,4]              | [7,0,8]       | Digit-by-digit addition with carry.      |
| 60   | 138  | Copy List with Random Pointer         | Deep copy a linked list with next and random pointers. | Linked list with random links | Cloned list   | HashMap old node → new node.             |
| 61   | 92   | Reverse Linked List II                | Reverse nodes between positions left and right.        | [1,2,3,4,5], left=2, right=4  | [1,4,3,2,5]   | Reverse only the required segment.       |
| 62   | 25   | Reverse Nodes in k-Group              | Reverse linked list in groups of size k.               | [1,2,3,4,5], k=2              | [2,1,4,3,5]   | Reverse every k nodes.                   |
| 63   | 19   | Remove Nth Node From End of List      | Remove nth node from the end.                          | [1,2,3,4,5], n=2              | [1,2,3,5]     | Two-pointer gap technique.               |
| 64   | 82   | Remove Duplicates from Sorted List II | Remove all nodes having duplicate values.              | [1,2,3,3,4,4,5]               | [1,2,5]       | Dummy node + duplicate skipping.         |
| 65   | 61   | Rotate List                           | Rotate list to the right by k places.                  | [1,2,3,4,5], k=2              | [4,5,1,2,3]   | Form cycle and break at new tail.        |
| 66   | 86   | Partition List                        | Rearrange nodes so values < x come before others.      | [1,4,3,2,5,2], x=3            | [1,2,2,4,3,5] | Build two separate lists and join.       |
| 67   | 146  | LRU Cache                             | Design Least Recently Used cache.                      | put/get operations            | values        | HashMap + Doubly Linked List.            |

---

### Phase 8 Patterns Learned

| Pattern                  | Problems   |
| ------------------------ | ---------- |
| Fast & Slow Pointers     | 141, 19    |
| List Reversal            | 92, 25     |
| Merge Lists              | 21         |
| Carry Handling           | 2          |
| HashMap with Linked List | 138, 146   |
| Dummy Node Technique     | 19, 82, 86 |
| Circular List Logic      | 61         |
| Design Problem           | 146        |

---

### Key Learning Outcomes

| Problem | Concept                         |
| ------- | ------------------------------- |
| 141     | Cycle Detection                 |
| 21      | Merge Pattern                   |
| 2       | Arithmetic on Linked Lists      |
| 138     | Deep Copy Structure             |
| 92      | Partial Reversal                |
| 25      | K-Group Reversal                |
| 19      | Two-Pointer Gap                 |
| 146     | System Design + Data Structures |

---

### Interview Importance Ranking

| Priority      | Problems            |
| ------------- | ------------------- |
| Must Do       | 141, 21, 2, 19, 146 |
| Good Practice | 92, 61, 86          |
| Advanced      | 138, 25, 82         |

---

# Phase 9 – Binary Tree General (Top Interview 150)

| S.No | LC # | Title                                                      | Description                                    | Sample Input               | Sample Output   | Idea                                   |
| ---- | ---- | ---------------------------------------------------------- | ---------------------------------------------- | -------------------------- | --------------- | -------------------------------------- |
| 68   | 104  | Maximum Depth of Binary Tree                               | Find maximum depth of the tree.                | [3,9,20,null,null,15,7]    | 3               | DFS recursion returning max depth.     |
| 69   | 100  | Same Tree                                                  | Check whether two trees are identical.         | p=[1,2,3], q=[1,2,3]       | true            | Recursively compare nodes.             |
| 70   | 226  | Invert Binary Tree                                         | Mirror the binary tree.                        | [4,2,7,1,3,6,9]            | [4,7,2,9,6,3,1] | Swap left and right recursively.       |
| 71   | 101  | Symmetric Tree                                             | Check if tree is symmetric.                    | [1,2,2,3,4,4,3]            | true            | Compare mirror subtrees recursively.   |
| 72   | 105  | Construct Binary Tree from Preorder and Inorder Traversal  | Build tree from preorder and inorder arrays.   | preorder=[3,9,20,15,7]     | Tree            | Root from preorder, split by inorder.  |
| 73   | 106  | Construct Binary Tree from Inorder and Postorder Traversal | Build tree from inorder and postorder arrays.  | inorder=[9,3,15,20,7]      | Tree            | Root from postorder, split by inorder. |
| 74   | 117  | Populating Next Right Pointers in Each Node II             | Connect nodes at same level.                   | Binary tree                | Connected tree  | Level-order traversal.                 |
| 75   | 114  | Flatten Binary Tree to Linked List                         | Convert tree into linked-list form.            | [1,2,5,3,4,null,6]         | Flattened tree  | Reverse preorder processing.           |
| 76   | 112  | Path Sum                                                   | Check whether root-to-leaf path equals target. | root=[5,4,8,11], target=22 | true            | DFS accumulating path sum.             |
| 77   | 129  | Sum Root to Leaf Numbers                                   | Sum all root-to-leaf numbers.                  | [1,2,3]                    | 25              | DFS builds numbers along path.         |
| 78   | 124  | Binary Tree Maximum Path Sum                               | Find maximum path sum in tree.                 | [-10,9,20,null,null,15,7]  | 42              | DFS returning maximum gain.            |
| 79   | 173  | Binary Search Tree Iterator                                | Implement BST iterator.                        | BST operations             | next values     | Stack-based inorder traversal.         |
| 80   | 222  | Count Complete Tree Nodes                                  | Count nodes in complete binary tree.           | [1,2,3,4,5,6]              | 6               | Height comparison optimization.        |
| 81   | 236  | Lowest Common Ancestor of a Binary Tree                    | Find lowest common ancestor of two nodes.      | Tree, p, q                 | LCA node        | DFS identifies split point.            |

---

# Phase 10 – Binary Tree BFS (Top Interview 150)

| S.No | LC # | Title                                    | Description                                                        | Sample Input            | Sample Output       | Idea                                                    |
| ---- | ---- | ---------------------------------------- | ------------------------------------------------------------------ | ----------------------- | ------------------- | ------------------------------------------------------- |
| 82   | 199  | Binary Tree Right Side View              | Return nodes visible when looking at the tree from the right side. | [1,2,3,null,5,null,4]   | [1,3,4]             | Level-order traversal and take last node of each level. |
| 83   | 637  | Average of Levels in Binary Tree         | Find average value of nodes at each level.                         | [3,9,20,null,null,15,7] | [3.0,14.5,11.0]     | BFS level by level and compute average.                 |
| 84   | 102  | Binary Tree Level Order Traversal        | Return nodes level by level from top to bottom.                    | [3,9,20,null,null,15,7] | [[3],[9,20],[15,7]] | Standard BFS using queue.                               |
| 85   | 103  | Binary Tree Zigzag Level Order Traversal | Return level order traversal in zigzag fashion.                    | [3,9,20,null,null,15,7] | [[3],[20,9],[15,7]] | BFS and reverse alternate levels.                       |

---

### Phase 10 Patterns Learned

| Pattern           | Problems           |
| ----------------- | ------------------ |
| Queue-Based BFS   | 199, 637, 102, 103 |
| Level Processing  | 637, 102, 103      |
| Level Aggregation | 637                |
| Right View Logic  | 199                |
| Zigzag Traversal  | 103                |

---

### Key Learning Outcomes

| Problem | Concept                   |
| ------- | ------------------------- |
| 102     | Foundation BFS            |
| 199     | Level End Processing      |
| 637     | Level Statistics          |
| 103     | Alternate Level Traversal |

---

### Interview Importance Ranking

| Priority      | Problems |
| ------------- | -------- |
| Must Do       | 102, 199 |
| Good Practice | 637      |
| Advanced      | 103      |

---

# Phase 11 – Binary Search Tree (Top Interview 150)

| S.No | LC # | Title                              | Description                                           | Sample Input             | Sample Output | Idea                                            |
| ---- | ---- | ---------------------------------- | ----------------------------------------------------- | ------------------------ | ------------- | ----------------------------------------------- |
| 86   | 530  | Minimum Absolute Difference in BST | Find minimum difference between any two nodes in BST. | [4,2,6,1,3]              | 1             | Inorder traversal gives sorted values.          |
| 87   | 230  | Kth Smallest Element in a BST      | Return kth smallest value in BST.                     | root=[3,1,4,null,2], k=1 | 1             | Inorder traversal visits nodes in sorted order. |
| 88   | 98   | Validate Binary Search Tree        | Determine whether tree satisfies BST rules.           | [2,1,3]                  | true          | DFS with valid min/max range.                   |

---

### Phase 11 Patterns Learned

| Pattern           | Problems |
| ----------------- | -------- |
| Inorder Traversal | 530, 230 |
| BST Property      | 98       |
| Sorted Traversal  | 530, 230 |
| Range Validation  | 98       |

---

### Key Learning Outcomes

| Problem | Concept                    |
| ------- | -------------------------- |
| 230     | BST Inorder Property       |
| 530     | Sorted Sequence Processing |
| 98      | BST Validation             |

---

### Interview Importance Ranking

| Priority      | Problems |
| ------------- | -------- |
| Must Do       | 98, 230  |
| Good Practice | 530      |

---

# Phase 12 – Graph General (Top Interview 150)

| S.No | LC # | Title              | Description                                | Sample Input                                     | Sample Output | Idea                                     |
| ---- | ---- | ------------------ | ------------------------------------------ | ------------------------------------------------ | ------------- | ---------------------------------------- |
| 89   | 200  | Number of Islands  | Count connected groups of land in a grid.  | grid=[["1","1","0"],["1","0","0"],["0","0","1"]] | 2             | DFS/BFS to mark visited land.            |
| 90   | 130  | Surrounded Regions | Capture all regions surrounded by X.       | board matrix                                     | updated board | Mark border-connected O's first.         |
| 91   | 133  | Clone Graph        | Create deep copy of connected graph.       | Graph                                            | Cloned graph  | DFS/BFS + HashMap old→new node.          |
| 92   | 399  | Evaluate Division  | Evaluate division queries using equations. | equations=[["a","b"],["b","c"]]                  | [6.0,...]     | Weighted graph traversal.                |
| 93   | 207  | Course Schedule    | Determine if all courses can be completed. | numCourses=2, prerequisites=[[1,0]]              | true          | Detect cycle using Topological Sort/DFS. |
| 94   | 210  | Course Schedule II | Return valid course order.                 | numCourses=2, prerequisites=[[1,0]]              | [0,1]         | Topological Sort.                        |

---

# Phase 13 – Graph BFS (Top Interview 150)

| S.No | LC # | Title                    | Description                                                      | Sample Input                         | Sample Output | Idea                               |
| ---- | ---- | ------------------------ | ---------------------------------------------------------------- | ------------------------------------ | ------------- | ---------------------------------- |
| 95   | 909  | Snakes and Ladders       | Find minimum dice throws to reach the last square.               | board=[[-1,-1,-1],[-1,9,8],[-1,8,9]] | minimum moves | BFS on board positions.            |
| 96   | 433  | Minimum Genetic Mutation | Find minimum mutations needed to convert start gene to end gene. | start="AACCGGTT", end="AACCGGTA"     | 1             | BFS on valid gene transformations. |
| 97   | 127  | Word Ladder              | Find shortest transformation sequence between two words.         | beginWord="hit", endWord="cog"       | 5             | BFS on word graph.                 |

---

### Phase 13 Patterns Learned

| Pattern                           | Problems      |
| --------------------------------- | ------------- |
| Shortest Path in Unweighted Graph | 909, 433, 127 |
| State Space Search                | 909           |
| Transformation Graph              | 433, 127      |
| Level-by-Level BFS                | 909, 433, 127 |

---

### Key Learning Outcomes

| Problem | Concept                   |
| ------- | ------------------------- |
| 909     | BFS on Board              |
| 433     | BFS on Strings            |
| 127     | Classic Shortest Path BFS |

---

### Interview Importance Ranking

| Priority      | Problems |
| ------------- | -------- |
| Must Do       | 127      |
| Good Practice | 433      |
| Advanced      | 909      |

---

# Phase 14 – Trie (Top Interview 150)

| S.No | LC # | Title                                      | Description                                            | Sample Input                     | Sample Output  | Idea                                    |
| ---- | ---- | ------------------------------------------ | ------------------------------------------------------ | -------------------------------- | -------------- | --------------------------------------- |
| 98   | 208  | Implement Trie (Prefix Tree)               | Design Trie supporting insert, search, and startsWith. | insert("apple"), search("apple") | true           | Trie node stores children and end flag. |
| 99   | 211  | Design Add and Search Words Data Structure | Support word search with '.' wildcard.                 | addWord("bad"), search(".ad")    | true           | Trie + DFS for wildcard matching.       |
| 100  | 212  | Word Search II                             | Find all dictionary words in a board.                  | board + words list               | matching words | Trie + DFS backtracking.                |

---

### Phase 14 Patterns Learned

| Pattern           | Problems |
| ----------------- | -------- |
| Trie Construction | 208      |
| Trie Search       | 208, 211 |
| Wildcard Search   | 211      |
| Trie + DFS        | 212      |
| Prefix Pruning    | 212      |

---

### Key Learning Outcomes

| Problem | Concept              |
| ------- | -------------------- |
| 208     | Basic Trie           |
| 211     | Advanced Trie Search |
| 212     | Trie + Backtracking  |

---

### Interview Importance Ranking

| Priority      | Problems |
| ------------- | -------- |
| Must Do       | 208      |
| Good Practice | 211      |
| Advanced      | 212      |

---

# Phase 15 – Backtracking (Top Interview 150)

| S.No | LC # | Title                                 | Description                                            | Sample Input                   | Sample Output                                  | Idea                                          |
| ---- | ---- | ------------------------------------- | ------------------------------------------------------ | ------------------------------ | ---------------------------------------------- | --------------------------------------------- |
| 101  | 17   | Letter Combinations of a Phone Number | Generate all possible letter combinations from digits. | digits="23"                    | ["ad","ae","af","bd","be","bf","cd","ce","cf"] | Choose a letter and recurse.                  |
| 102  | 77   | Combinations                          | Generate all combinations of k numbers from 1 to n.    | n=4, k=2                       | [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]          | Include/exclude recursion.                    |
| 103  | 46   | Permutations                          | Generate all permutations of distinct numbers.         | [1,2,3]                        | 6 permutations                                 | Choose unused number and recurse.             |
| 104  | 39   | Combination Sum                       | Find combinations summing to target.                   | candidates=[2,3,6,7], target=7 | [[2,2,3],[7]]                                  | Choose same number multiple times.            |
| 105  | 52   | N-Queens II                           | Count valid N-Queens arrangements.                     | n=4                            | 2                                              | Backtracking with column and diagonal checks. |
| 106  | 79   | Word Search                           | Determine if a word exists in grid.                    | board, word="ABCCED"           | true                                           | DFS with backtracking.                        |

---

### Phase 15 Patterns Learned

| Pattern                 | Problems |
| ----------------------- | -------- |
| Combination Generation  | 77, 39   |
| Permutation Generation  | 46       |
| State Space Search      | 17, 79   |
| Constraint Satisfaction | 52       |
| Grid DFS                | 79       |

---

### Key Learning Outcomes

| Problem | Concept                    |
| ------- | -------------------------- |
| 17      | Recursive Tree Exploration |
| 77      | Combinations               |
| 46      | Permutations               |
| 39      | Combination Sum Pattern    |
| 52      | Constraint Backtracking    |
| 79      | Grid Backtracking          |

---

### Interview Importance Ranking

| Priority      | Problems       |
| ------------- | -------------- |
| Must Do       | 17, 46, 39, 79 |
| Good Practice | 77             |
| Advanced      | 52             |

---

# Phase 16 – Divide & Conquer (Top Interview 150)

| S.No | LC # | Title                                      | Description                                      | Sample Input            | Sample Output     | Idea                                            |
| ---- | ---- | ------------------------------------------ | ------------------------------------------------ | ----------------------- | ----------------- | ----------------------------------------------- |
| 107  | 108  | Convert Sorted Array to Binary Search Tree | Convert sorted array into a height-balanced BST. | nums=[-10,-3,0,5,9]     | Balanced BST      | Choose middle element as root recursively.      |
| 108  | 148  | Sort List                                  | Sort a linked list in O(n log n) time.           | [4,2,1,3]               | [1,2,3,4]         | Merge Sort on linked list.                      |
| 109  | 427  | Construct Quad Tree                        | Build Quad Tree from binary grid.                | grid=[[1,1],[1,1]]      | Quad Tree         | Recursively divide into four quadrants.         |
| 110  | 23   | Merge k Sorted Lists                       | Merge k sorted linked lists.                     | [[1,4,5],[1,3,4],[2,6]] | [1,1,2,3,4,4,5,6] | Divide lists into halves and merge recursively. |

---

### Phase 16 Patterns Learned

| Pattern                    | Problems          |
| -------------------------- | ----------------- |
| Divide & Conquer           | 108, 148, 427, 23 |
| Recursive Partitioning     | 427               |
| Balanced Tree Construction | 108               |
| Merge Sort                 | 148               |
| Recursive Merging          | 23                |

---

### Key Learning Outcomes

| Problem | Concept                   |
| ------- | ------------------------- |
| 108     | Recursive Tree Building   |
| 148     | Linked List Merge Sort    |
| 427     | Recursive Grid Division   |
| 23      | Merge K Sorted Structures |

---

### Interview Importance Ranking

| Priority      | Problems |
| ------------- | -------- |
| Must Do       | 23, 148  |
| Good Practice | 108      |
| Advanced      | 427      |

---

# Phase 17 – Kadane's Algorithm (Top Interview 150)

| S.No | LC # | Title                         | Description                                  | Sample Input            | Sample Output | Idea                                           |
| ---- | ---- | ----------------------------- | -------------------------------------------- | ----------------------- | ------------- | ---------------------------------------------- |
| 111  | 53   | Maximum Subarray              | Find contiguous subarray with maximum sum.   | [-2,1,-3,4,-1,2,1,-5,4] | 6             | Kadane's Algorithm maintains best ending here. |
| 112  | 918  | Maximum Sum Circular Subarray | Find maximum subarray sum in circular array. | [1,-2,3,-2]             | 3             | Use Kadane for max and min subarrays.          |

---

### Phase 17 Patterns Learned

| Pattern                  | Problems |
| ------------------------ | -------- |
| Kadane's Algorithm       | 53, 918  |
| Running Sum Optimization | 53       |
| Circular Array Logic     | 918      |

---

### Key Learning Outcomes

| Problem | Concept                   |
| ------- | ------------------------- |
| 53      | Classic Kadane            |
| 918     | Circular Kadane Variation |

---

### Interview Importance Ranking

| Priority      | Problems |
| ------------- | -------- |
| Must Do       | 53       |
| Good Practice | 918      |

---

# Phase 18 – Binary Search (Top Interview 150)

| S.No | LC # | Title                                                   | Description                                           | Sample Input                        | Sample Output | Idea                              |
| ---- | ---- | ------------------------------------------------------- | ----------------------------------------------------- | ----------------------------------- | ------------- | --------------------------------- |
| 113  | 35   | Search Insert Position                                  | Find index where target exists or should be inserted. | nums=[1,3,5,6], target=5            | 2             | Classic binary search.            |
| 114  | 74   | Search a 2D Matrix                                      | Search target in sorted matrix.                       | matrix=[[1,3,5],[7,9,11]], target=9 | true          | Treat matrix as sorted 1D array.  |
| 115  | 162  | Find Peak Element                                       | Find any peak element.                                | [1,2,3,1]                           | 2             | Binary search on slope direction. |
| 116  | 33   | Search in Rotated Sorted Array                          | Search target in rotated sorted array.                | [4,5,6,7,0,1,2], target=0           | 4             | Determine which half is sorted.   |
| 117  | 34   | Find First and Last Position of Element in Sorted Array | Find starting and ending index of target.             | [5,7,7,8,8,10], target=8            | [3,4]         | Perform two binary searches.      |
| 118  | 153  | Find Minimum in Rotated Sorted Array                    | Find smallest element in rotated array.               | [3,4,5,1,2]                         | 1             | Binary search around pivot.       |
| 119  | 4    | Median of Two Sorted Arrays                             | Find median of two sorted arrays.                     | nums1=[1,3], nums2=[2]              | 2.0           | Binary search partition.          |

---

### Phase 18 Patterns Learned

| Pattern                       | Problems |
| ----------------------------- | -------- |
| Classic Binary Search         | 35       |
| Binary Search on Answer Space | —        |
| Rotated Array Search          | 33, 153  |
| Boundary Search               | 34       |
| Peak Search                   | 162      |
| Partition-Based Search        | 4        |
| Matrix Binary Search          | 74       |

---

### Key Learning Outcomes

| Problem | Concept                 |
| ------- | ----------------------- |
| 35      | Basic Binary Search     |
| 74      | Binary Search on Matrix |
| 33      | Rotated Array           |
| 34      | Lower/Upper Bound       |
| 153     | Pivot Search            |
| 162     | Peak Search             |
| 4       | Advanced Binary Search  |

---

### Interview Importance Ranking

| Priority      | Problems            |
| ------------- | ------------------- |
| Must Do       | 35, 74, 33, 34, 153 |
| Good Practice | 162                 |
| Advanced      | 4                   |

---

# Phase 19 – Heap (Top Interview 150)

| S.No | LC # | Title                           | Description                                           | Sample Input                       | Sample Output   | Idea                             |
| ---- | ---- | ------------------------------- | ----------------------------------------------------- | ---------------------------------- | --------------- | -------------------------------- |
| 120  | 215  | Kth Largest Element in an Array | Find kth largest element.                             | [3,2,1,5,6,4], k=2                 | 5               | Maintain min heap of size k.     |
| 121  | 502  | IPO                             | Maximize capital after completing at most k projects. | k=2, capital=[0,1,1]               | maximum capital | Sort projects and use max heap.  |
| 122  | 373  | Find K Pairs with Smallest Sums | Return k pairs with smallest sums.                    | nums1=[1,7,11], nums2=[2,4,6], k=3 | pairs           | Min heap for pair generation.    |
| 123  | 295  | Find Median from Data Stream    | Continuously find median.                             | addNum(), findMedian()             | median values   | Two heaps (max heap + min heap). |

---

# Phase 20 – Bit Manipulation (Top Interview 150)

| S.No | LC # | Title                        | Description                                                         | Sample Input    | Sample Output | Idea                                        |
| ---- | ---- | ---------------------------- | ------------------------------------------------------------------- | --------------- | ------------- | ------------------------------------------- |
| 124  | 67   | Add Binary                   | Add two binary strings and return the result as a binary string.    | a="11", b="1"   | "100"         | Simulate binary addition with carry.        |
| 125  | 190  | Reverse Bits                 | Reverse bits of a 32-bit unsigned integer.                          | n=43261596      | 964176192     | Process bits one by one and rebuild result. |
| 126  | 191  | Number of 1 Bits             | Count the number of set bits in an integer.                         | n=11            | 3             | Use bit masking or n&(n−1).                 |
| 127  | 136  | Single Number                | Find the element appearing once when all others appear twice.       | [2,2,1]         | 1             | XOR cancels duplicates.                     |
| 128  | 137  | Single Number II             | Find the element appearing once when all others appear three times. | [2,2,3,2]       | 3             | Count bits at each position.                |
| 129  | 201  | Bitwise AND of Numbers Range | Compute bitwise AND of all numbers in range [left,right].           | left=5, right=7 | 4             | Find common binary prefix.                  |

---

### Phase 20 Patterns Learned

| Pattern             | Problems |
| ------------------- | -------- |
| XOR Operations      | 136      |
| Bit Counting        | 191, 137 |
| Bit Manipulation    | 190, 201 |
| Binary Arithmetic   | 67       |
| Common Prefix Logic | 201      |

---

### Key Learning Outcomes

| Problem | Concept               |
| ------- | --------------------- |
| 67      | Binary Addition       |
| 190     | Bit Reversal          |
| 191     | Set Bit Counting      |
| 136     | XOR Property          |
| 137     | Advanced Bit Counting |
| 201     | Range Bit Operations  |

---

### Interview Importance Ranking

| Priority      | Problems     |
| ------------- | ------------ |
| Must Do       | 136, 191, 67 |
| Good Practice | 190, 201     |
| Advanced      | 137          |

---

# Phase 21 – Math (Top Interview 150)

| S.No | LC # | Title                     | Description                                          | Sample Input               | Sample Output | Idea                              |
| ---- | ---- | ------------------------- | ---------------------------------------------------- | -------------------------- | ------------- | --------------------------------- |
| 130  | 9    | Palindrome Number         | Determine whether an integer is a palindrome.        | x=121                      | true          | Reverse half the number.          |
| 131  | 66   | Plus One                  | Add one to a large integer represented as digits.    | [1,2,3]                    | [1,2,4]       | Process carry from right to left. |
| 132  | 172  | Factorial Trailing Zeroes | Count trailing zeroes in n!.                         | n=5                        | 1             | Count factors of 5.               |
| 133  | 69   | Sqrt(x)                   | Compute integer square root.                         | x=8                        | 2             | Binary search on answer.          |
| 134  | 50   | Pow(x, n)                 | Compute x raised to power n.                         | x=2, n=10                  | 1024          | Fast exponentiation.              |
| 135  | 149  | Max Points on a Line      | Find maximum points lying on a single straight line. | points=[[1,1],[2,2],[3,3]] | 3             | Compare slopes using HashMap.     |

---

### Phase 21 Patterns Learned

| Pattern                  | Problems |
| ------------------------ | -------- |
| Number Manipulation      | 9, 66    |
| Mathematical Observation | 172      |
| Binary Search on Answer  | 69       |
| Fast Exponentiation      | 50       |
| Geometry + Hashing       | 149      |

---

### Key Learning Outcomes

| Problem | Concept                    |
| ------- | -------------------------- |
| 9       | Numeric Palindrome         |
| 66      | Carry Processing           |
| 172     | Factor Counting            |
| 69      | Square Root Search         |
| 50      | Exponentiation by Squaring |
| 149     | Geometry + Hashing         |

---

### Interview Importance Ranking

| Priority      | Problems      |
| ------------- | ------------- |
| Must Do       | 9, 66, 69, 50 |
| Good Practice | 172           |
| Advanced      | 149           |

---

# Phase 22 – 1D Dynamic Programming (Top Interview 150)

| S.No | LC # | Title                          | Description                                                      | Sample Input             | Sample Output | Idea                              |
| ---- | ---- | ------------------------------ | ---------------------------------------------------------------- | ------------------------ | ------------- | --------------------------------- |
| 136  | 70   | Climbing Stairs                | Count ways to reach the top taking 1 or 2 steps.                 | n=5                      | 8             | Fibonacci-style DP.               |
| 137  | 198  | House Robber                   | Max money without robbing adjacent houses.                       | [1,2,3,1]                | 4             | Include/exclude DP.               |
| 138  | 139  | Word Break                     | Determine whether string can be segmented into dictionary words. | s="leetcode"             | true          | DP on prefixes.                   |
| 139  | 322  | Coin Change                    | Minimum coins needed to make amount.                             | coins=[1,2,5], amount=11 | 3             | Bottom-up DP.                     |
| 140  | 300  | Longest Increasing Subsequence | Find length of LIS.                                              | [10,9,2,5,3,7,101,18]    | 4             | DP or Binary Search optimization. |

---

### Phase 22 Patterns Learned

| Pattern                  | Problems |
| ------------------------ | -------- |
| Fibonacci DP             | 70       |
| Decision DP              | 198      |
| String DP                | 139      |
| Unbounded Knapsack Style | 322      |
| Sequence DP              | 300      |

---

### Key Learning Outcomes

| Problem | Concept          |
| ------- | ---------------- |
| 70      | Basic DP         |
| 198     | State Transition |
| 139     | DP on Strings    |
| 322     | Optimization DP  |
| 300     | Subsequence DP   |

---

### Interview Importance Ranking

| Priority      | Problems                     |
| ------------- | ---------------------------- |
| Must Do       | 70, 198, 139, 322, 300       |
| Good Practice | —                            |
| Advanced      | 300 (Binary Search Solution) |

---

# Phase 23 – Multidimensional Dynamic Programming (Top Interview 150)

| S.No | LC # | Title                               | Description                                                 | Sample Input                            | Sample Output | Idea                                           |
| ---- | ---- | ----------------------------------- | ----------------------------------------------------------- | --------------------------------------- | ------------- | ---------------------------------------------- |
| 141  | 120  | Triangle                            | Find minimum path sum from top to bottom of a triangle.     | triangle=[[2],[3,4],[6,5,7],[4,1,8,3]]  | 11            | Bottom-up DP combining child costs.            |
| 142  | 64   | Minimum Path Sum                    | Find path with minimum sum from top-left to bottom-right.   | grid=[[1,3,1],[1,5,1],[4,2,1]]          | 7             | DP where each cell depends on top and left.    |
| 143  | 63   | Unique Paths II                     | Count unique paths in a grid with obstacles.                | obstacleGrid=[[0,0,0],[0,1,0],[0,0,0]]  | 2             | DP with blocked cells contributing zero paths. |
| 144  | 5    | Longest Palindromic Substring       | Find the longest palindromic substring.                     | s="babad"                               | "bab"         | DP or expand-around-center.                    |
| 145  | 97   | Interleaving String                 | Check whether s3 is formed by interleaving s1 and s2.       | s1="aabcc", s2="dbbca", s3="aadbbcbcac" | true          | 2D DP tracking positions in both strings.      |
| 146  | 72   | Edit Distance                       | Find minimum operations to convert one string into another. | word1="horse", word2="ros"              | 3             | DP on insert, delete, replace operations.      |
| 147  | 123  | Best Time to Buy and Sell Stock III | Max profit with at most two transactions.                   | prices=[3,3,5,0,0,3,1,4]                | 6             | DP tracking buy/sell states.                   |
| 148  | 188  | Best Time to Buy and Sell Stock IV  | Max profit with at most k transactions.                     | k=2, prices=[2,4,1]                     | 2             | Generalized stock DP.                          |
| 149  | 221  | Maximal Square                      | Find area of largest square containing only 1s.             | matrix=[["1","0"],["1","1"]]            | 1             | DP using top, left, and diagonal cells.        |
| 150  | 1143 | Longest Common Subsequence          | Find length of longest common subsequence.                  | text1="abcde", text2="ace"              | 3             | Classic 2D DP on two strings.                  |

---

## Phase 23 Patterns Learned

| Pattern       | Problems     |
| ------------- | ------------ |
| Grid DP       | 64, 63       |
| Triangle DP   | 120          |
| String DP     | 97, 72, 1143 |
| Palindrome DP | 5            |
| Stock DP      | 123, 188     |
| 2D State DP   | 97, 72, 1143 |
| Matrix DP     | 221          |

---

## Key Learning Outcomes

| Problem | Concept                    |
| ------- | -------------------------- |
| 120     | Bottom-Up DP               |
| 64      | Grid Path DP               |
| 63      | DP with Obstacles          |
| 5       | Palindrome Expansion/DP    |
| 97      | Two-String DP              |
| 72      | Edit Operations DP         |
| 123     | State Machine DP           |
| 188     | Advanced Stock DP          |
| 221     | Square Formation DP        |
| 1143    | Longest Common Subsequence |

---

## Interview Importance Ranking

| Priority      | Problems          |
| ------------- | ----------------- |
| Must Do       | 64, 72, 1143, 221 |
| Good Practice | 120, 63, 5, 97    |
| Advanced      | 123, 188          |

---

# Complete Top Interview 150 Summary

| Phase     | Topic                                | Problems |
| --------- | ------------------------------------ | -------: |
| 1         | Array / String                       |       24 |
| 2         | Two Pointers                         |        5 |
| 3         | Sliding Window                       |        4 |
| 4         | Matrix                               |        5 |
| 5         | HashMap                              |        9 |
| 6         | Intervals                            |        4 |
| 7         | Stack                                |        5 |
| 8         | Linked List                          |       11 |
| 9         | Binary Tree General                  |       14 |
| 10        | Binary Tree BFS                      |        4 |
| 11        | Binary Search Tree                   |        3 |
| 12        | Graph General                        |        6 |
| 13        | Graph BFS                            |        3 |
| 14        | Trie                                 |        3 |
| 15        | Backtracking                         |        6 |
| 16        | Divide & Conquer                     |        4 |
| 17        | Kadane's Algorithm                   |        2 |
| 18        | Binary Search                        |        7 |
| 19        | Heap                                 |        4 |
| 20        | Bit Manipulation                     |        6 |
| 21        | Math                                 |        6 |
| 22        | 1D Dynamic Programming               |        5 |
| 23        | Multidimensional Dynamic Programming |       10 |
| **Total** | **Top Interview 150**                |  **150** |

---

Yes. After looking at the entire **Top Interview 150**, a few things stand out from a trainer's perspective.

## 1. The Official Order Is Not the Best Learning Order

LeetCode's order is designed for interview preparation, not teaching.

For example:

```text
Array/String
↓
Two Pointers
↓
Sliding Window
↓
Matrix
↓
HashMap
```

But for beginners, I'd teach:

```text
Array/String
↓
HashMap
↓
Two Pointers
↓
Sliding Window
↓
Matrix
↓
Stack
↓
Linked List
↓
Binary Search
↓
Backtracking
↓
Trees
↓
Graphs
↓
Heap
↓
DP
```

This creates a smoother learning curve.

---

## 2. Only ~50 Problems Teach Most Patterns

Many of the 150 are variations of the same pattern.

For example:

| Pattern          | Representative Problem |
| ---------------- | ---------------------- |
| Two Pointers     | 11                     |
| Sliding Window   | 3                      |
| HashMap          | 1                      |
| Intervals        | 56                     |
| Stack            | 20                     |
| Linked List      | 141                    |
| Tree DFS         | 104                    |
| Tree BFS         | 102                    |
| BST              | 230                    |
| Graph DFS/BFS    | 200                    |
| Topological Sort | 207                    |
| Trie             | 208                    |
| Backtracking     | 46                     |
| Binary Search    | 33                     |
| Heap             | 215                    |
| DP               | 198                    |
| LCS              | 1143                   |

Once students master these, many other questions become pattern recognition.

---

## 3. Most Important Problems in the Entire List

If I had to teach only **25–30 problems**, I'd pick:

| LC # | Title                                          |
| ---- | ---------------------------------------------- |
| 1    | Two Sum                                        |
| 11   | Container With Most Water                      |
| 15   | 3Sum                                           |
| 3    | Longest Substring Without Repeating Characters |
| 56   | Merge Intervals                                |
| 20   | Valid Parentheses                              |
| 141  | Linked List Cycle                              |
| 21   | Merge Two Sorted Lists                         |
| 104  | Maximum Depth of Binary Tree                   |
| 102  | Binary Tree Level Order Traversal              |
| 98   | Validate BST                                   |
| 230  | Kth Smallest Element in BST                    |
| 200  | Number of Islands                              |
| 207  | Course Schedule                                |
| 127  | Word Ladder                                    |
| 208  | Implement Trie                                 |
| 46   | Permutations                                   |
| 79   | Word Search                                    |
| 53   | Maximum Subarray                               |
| 33   | Search in Rotated Sorted Array                 |
| 215  | Kth Largest Element in an Array                |
| 136  | Single Number                                  |
| 70   | Climbing Stairs                                |
| 198  | House Robber                                   |
| 322  | Coin Change                                    |
| 72   | Edit Distance                                  |
| 1143 | Longest Common Subsequence                     |

These cover most interview patterns.

---

## 4. Hard Problems You Can Skip Initially

For a first pass, I would not spend much time on:

| LC # | Title                              |
| ---- | ---------------------------------- |
| 68   | Text Justification                 |
| 149  | Max Points on a Line               |
| 4    | Median of Two Sorted Arrays        |
| 188  | Best Time to Buy and Sell Stock IV |
| 427  | Construct Quad Tree                |
| 52   | N-Queens II                        |
| 212  | Word Search II                     |

These are excellent problems, but they don't provide as much pattern-learning value per hour spent.

---

## 5. The Best Learning Sequence 

Since you usually learn concept → pattern → problem, I'd reorganize the 150 as:

```text
Phase 1
Arrays + Strings

Phase 2
HashMap

Phase 3
Two Pointers

Phase 4
Sliding Window

Phase 5
Matrix

Phase 6
Stack

Phase 7
Linked List

Phase 8
Binary Search

Phase 9
Backtracking

Phase 10
Trees DFS

Phase 11
Trees BFS

Phase 12
BST

Phase 13
Graphs DFS/BFS

Phase 14
Topological Sort

Phase 15
Heap

Phase 16
Greedy

Phase 17
1D DP

Phase 18
2D DP

Phase 19
Trie

Phase 20
Bit Manipulation
```

This order aligns well with your preference for structured, level-by-level learning and makes it easier for students to continue learning independently afterward.

## 6. One Small Issue in Top Interview 150

The study plan has:

* **Very strong coverage** of Trees, Graphs, DP, and Arrays.
* **Very little coverage** of:

  * Union Find (Disjoint Set)
  * Monotonic Stack
  * Segment Tree
  * Fenwick Tree
  * Advanced Graph Algorithms (Dijkstra, MST)
  * Network Flow

So completing Top Interview 150 does **not** mean someone has covered all major DSA topics. It's primarily an interview-focused roadmap rather than a complete DSA curriculum.

For interview preparation, though, it's one of the best curated lists available.
