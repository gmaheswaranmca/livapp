Below is a **standard competitive programming problem format** you can use for Backtracking problems on coding platforms.

---

# 1. Subsets

## Title

Generate All Subsets

## Category

Backtracking

## Time Complexity

O(2ⁿ × n)

## Space Complexity

O(n)

## Description

Given an array of distinct integers, generate all possible subsets (the power set).

The solution set must not contain duplicate subsets.

## Input Format

* First line contains integer N.
* Second line contains N space-separated integers.

## Output Format

Print all subsets, one subset per line.

## Sample Input

```
3
1 2 3
```

## Sample Output

```
[]
[1]
[2]
[3]
[1,2]
[1,3]
[2,3]
[1,2,3]
```

## Explanation

For 3 elements, there are 2³ = 8 possible subsets.

## Constraints

```
0 ≤ N ≤ 15
-100 ≤ arr[i] ≤ 100
```

## Hint

For every element:

* Include it.
* Exclude it.

## Test Cases

### Test Case 1

Input

```
0
```

Output

```
[]
```

---

### Test Case 2

Input

```
1
5
```

Output

```
[]
[5]
```

---

### Test Case 3

Input

```
2
1 2
```

Output

```
[]
[1]
[2]
[1,2]
```

---

### Test Case 4

Input

```
3
1 2 3
```

Output

```
8 subsets
```

---

### Test Case 5

Input

```
4
10 20 30 40
```

Output

```
16 subsets
```

---

# 2. Permutations

## Title

Generate All Permutations

## Category

Backtracking

## Time Complexity

O(n!)

## Space Complexity

O(n)

## Description

Given N distinct integers, generate all possible permutations.

## Input Format

* First line contains N.
* Second line contains N integers.

## Output Format

Print every permutation.

## Sample Input

```
3
1 2 3
```

## Sample Output

```
1 2 3
1 3 2
2 1 3
2 3 1
3 1 2
3 2 1
```

## Explanation

3! = 6 permutations exist.

## Constraints

```
1 ≤ N ≤ 8
```

## Hint

Track used elements using a visited array.

## Test Cases

### Test Case 1

Input

```
1
7
```

Output

```
7
```

---

### Test Case 2

Input

```
2
1 2
```

Output

```
1 2
2 1
```

---

### Test Case 3

Input

```
3
1 2 3
```

Output

```
6 permutations
```

---

### Test Case 4

Input

```
4
1 2 3 4
```

Output

```
24 permutations
```

---

### Test Case 5

Input

```
5
1 2 3 4 5
```

Output

```
120 permutations
```

---

# 3. Combinations

## Title

Generate K-Combinations

## Category

Backtracking

## Time Complexity

O(C(n,k) × k)

## Space Complexity

O(k)

## Description

Given integers N and K, generate all combinations of K numbers chosen from 1 to N.

## Input Format

```
N K
```

## Output Format

Print all valid combinations.

## Sample Input

```
4 2
```

## Sample Output

```
1 2
1 3
1 4
2 3
2 4
3 4
```

## Explanation

Choose 2 numbers from 4.

## Constraints

```
1 ≤ K ≤ N ≤ 20
```

## Hint

Start from current index and move forward.

## Test Cases

### Test Case 1

Input

```
1 1
```

Output

```
1
```

---

### Test Case 2

Input

```
2 1
```

Output

```
1
2
```

---

### Test Case 3

Input

```
4 2
```

Output

```
6 combinations
```

---

### Test Case 4

Input

```
5 3
```

Output

```
10 combinations
```

---

### Test Case 5

Input

```
6 6
```

Output

```
1 2 3 4 5 6
```

---

# 4. N-Queens

## Title

N Queens Problem

## Category

Backtracking

## Time Complexity

O(N!)

## Space Complexity

O(N)

## Description

Place N queens on an N×N chessboard such that no two queens attack each other.

Print all valid board configurations.

## Input Format

```
N
```

## Output Format

Print all valid boards.

## Sample Input

```
4
```

## Sample Output

```
.Q..
...Q
Q...
..Q.

..Q.
Q...
...Q
.Q..
```

## Explanation

There are 2 valid solutions for N=4.

## Constraints

```
1 ≤ N ≤ 10
```

## Hint

Track occupied columns and diagonals.

## Test Cases

### Test Case 1

Input

```
1
```

Output

```
Q
```

---

### Test Case 2

Input

```
2
```

Output

```
No Solution
```

---

### Test Case 3

Input

```
3
```

Output

```
No Solution
```

---

### Test Case 4

Input

```
4
```

Output

```
2 solutions
```

---

### Test Case 5

Input

```
8
```

Output

```
92 solutions
```

---

# 5. Sudoku Solver

## Title

Solve Sudoku

## Category

Backtracking

## Time Complexity

O(9^(empty cells))

## Space Complexity

O(81)

## Description

Given a partially filled 9×9 Sudoku board, fill the board so that every row, column, and 3×3 box contains digits 1 to 9 exactly once.

## Input Format

9 lines containing 9 integers each.

0 represents an empty cell.

## Output Format

Print solved Sudoku board.

## Sample Input

```
5 3 0 0 7 0 0 0 0
6 0 0 1 9 5 0 0 0
...
```

## Sample Output

```
5 3 4 6 7 8 9 1 2
6 7 2 1 9 5 3 4 8
...
```

## Explanation

Fill every empty cell while maintaining Sudoku rules.

## Constraints

```
Board size fixed at 9×9
```

## Hint

Try digits 1-9 and backtrack when invalid.

## Test Cases

### Test Case 1

Already solved board

### Test Case 2

One empty cell

### Test Case 3

Few empty cells

### Test Case 4

Medium difficulty puzzle

### Test Case 5

Hard difficulty puzzle

(All follow same 9×9 input/output format.)

---

# 6. Word Search

## Title

Word Search

## Category

Backtracking

## Time Complexity

O(M × N × 4^L)

## Space Complexity

O(L)

## Description

Given a 2D board and a word, determine whether the word exists in the board.

Characters can be constructed from adjacent cells (up, down, left, right).

A cell may not be reused.

## Input Format

```
M N
Board characters
Word
```

## Output Format

```
True
```

or

```
False
```

## Sample Input

```
3 4
A B C E
S F C S
A D E E
ABCCED
```

## Sample Output

```
True
```

## Explanation

ABCCED can be formed by adjacent cells.

## Constraints

```
1 ≤ M,N ≤ 6
1 ≤ Word Length ≤ 15
```

## Hint

DFS from every matching starting character.

## Test Cases

### Test Case 1

Input

```
1 1
A
A
```

Output

```
True
```

---

### Test Case 2

Input

```
1 1
A
B
```

Output

```
False
```

---

### Test Case 3

Input

```
3 4
A B C E
S F C S
A D E E
SEE
```

Output

```
True
```

---

### Test Case 4

Input

```
3 4
A B C E
S F C S
A D E E
ABCB
```

Output

```
False
```

---

### Test Case 5

Input

```
2 2
A B
C D
ABCD
```

Output

```
False
```

These six problems cover the most important backtracking patterns:

1. Decision Tree (Subsets)
2. Arrangement (Permutations)
3. Selection (Combinations)
4. Constraint Satisfaction (N-Queens)
5. State Space Search (Sudoku Solver)
6. Grid DFS + Backtracking (Word Search)
