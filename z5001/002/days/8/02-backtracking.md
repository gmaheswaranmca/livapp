These are the most important beginner-to-intermediate backtracking problems on LeetCode.

| Problem       | LeetCode Link                                                                                      |
| ------------- | -------------------------------------------------------------------------------------------------- |
| Subsets       | [Subsets (LeetCode 78)](https://leetcode.com/problems/subsets/?utm_source=chatgpt.com)             |
| Permutations  | [Permutations (LeetCode 46)](https://leetcode.com/problems/permutations/?utm_source=chatgpt.com)   |
| Combinations  | [Combinations (LeetCode 77)](https://leetcode.com/problems/combinations/?utm_source=chatgpt.com)   |
| N-Queens      | [N-Queens (LeetCode 51)](https://leetcode.com/problems/n-queens/?utm_source=chatgpt.com)           |
| Sudoku Solver | [Sudoku Solver (LeetCode 37)](https://leetcode.com/problems/sudoku-solver/?utm_source=chatgpt.com) |
| Word Search   | [Word Search (LeetCode 79)](https://leetcode.com/problems/word-search/?utm_source=chatgpt.com)     |

---

# 1. Subsets

## Idea

For every element:

* Include it
* Exclude it

Decision tree:

```text
Recursion Tree
[1,2]

          []
       /      \
      1        -
    /   \    /   \
   2    -   2    -
```

Output: 

```text
State Space Tree
[]
├── [1]
│   ├── [1,2]
│   └── [1]
└── []
    ├── [2]
    └── []

[]
[1]
[2]
[1,2]
```

---

## Algorithm

```text
backtrack(index)

If index == n
    add current subset
    return

Take element
backtrack(index+1)

Remove element

Don't take element
backtrack(index+1)
```

---

## Pseudocode

```text
FUNCTION backtrack(index)

    IF index == n
        answer.add(current)
        RETURN

    current.add(nums[index])
    backtrack(index+1)

    current.removeLast()
    backtrack(index+1)

END FUNCTION
```

---

## Python

```python
class Solution:
    def subsets(self, nums):
        res = []

        def backtrack(index, path):
            if index == len(nums):
                res.append(path[:])
                return

            path.append(nums[index])
            backtrack(index + 1, path)

            path.pop()
            backtrack(index + 1, path)

        backtrack(0, [])
        return res
```

---

## C++

```cpp
class Solution {
public:
    vector<vector<int>> res;

    void backtrack(int index, vector<int>& nums,
                   vector<int>& path) {

        if(index == nums.size()) {
            res.push_back(path);
            return;
        }

        path.push_back(nums[index]);
        backtrack(index+1, nums, path);

        path.pop_back();
        backtrack(index+1, nums, path);
    }

    vector<vector<int>> subsets(vector<int>& nums) {
        vector<int> path;
        backtrack(0, nums, path);
        return res;
    }
};
```

---

## Java

```java
class Solution {

    List<List<Integer>> res = new ArrayList<>();

    void backtrack(int index,
                   int[] nums,
                   List<Integer> path) {

        if(index == nums.length) {
            res.add(new ArrayList<>(path));
            return;
        }

        path.add(nums[index]);
        backtrack(index+1, nums, path);

        path.remove(path.size()-1);
        backtrack(index+1, nums, path);
    }

    public List<List<Integer>> subsets(int[] nums) {
        backtrack(0, nums, new ArrayList<>());
        return res;
    }
}
```

---

# 2. Permutations

## Idea

Every position can choose any unused element.

Example:

```text
[1,2,3]

1 _ _
2 _ _
3 _ _


[]
├── [1]
│   ├── [1,2]
│   │   └── [1,2,3] ✓
│   │
│   └── [1,3]
│       └── [1,3,2] ✓
│
├── [2]
│   ├── [2,1]
│   │   └── [2,1,3] ✓
│   │
│   └── [2,3]
│       └── [2,3,1] ✓
│
└── [3]
    ├── [3,1]
    │   └── [3,1,2] ✓
    │
    └── [3,2]
        └── [3,2,1] ✓


Level 0

                        []

Level 1

             /-----------|-----------\
           [1]         [2]         [3]

Level 2

        /------\    /------\    /------\
     [1,2] [1,3] [2,1] [2,3] [3,1] [3,2]

Level 3

      |      |      |      |      |      |
  [1,2,3] [1,3,2] [2,1,3] [2,3,1] [3,1,2] [3,2,1]
```

---

## Algorithm

```text
For each unused element

    choose

    recurse

    unchoose
```

---

## Pseudocode

```text
FUNCTION backtrack()
    IF path size == n
        add path
        RETURN

    FOR each element
        IF used
            continue
        choose
        recurse
        unchoose
```

---

## Python

```python
class Solution:
    def permute(self, nums):
        res = []
        used = [False] * len(nums)

        def backtrack(path):
            if len(path) == len(nums):
                res.append(path[:])
                return

            for i in range(len(nums)):
                if used[i]:
                    continue

                used[i] = True
                path.append(nums[i])

                backtrack(path)

                path.pop()
                used[i] = False

        backtrack([])
        return res
```

---

## C++

```cpp
class Solution {
public:
    vector<vector<int>> res;

    void backtrack(vector<int>& nums,
                   vector<int>& path,
                   vector<bool>& used) {

        if(path.size() == nums.size()) {
            res.push_back(path);
            return;
        }

        for(int i=0;i<nums.size();i++) {

            if(used[i]) continue;

            used[i]=true;
            path.push_back(nums[i]);

            backtrack(nums,path,used);

            path.pop_back();
            used[i]=false;
        }
    }

    vector<vector<int>> permute(vector<int>& nums) {

        vector<int> path;
        vector<bool> used(nums.size(),false);

        backtrack(nums,path,used);

        return res;
    }
};
```

---

## Java

```java
class Solution {

    List<List<Integer>> res = new ArrayList<>();

    void backtrack(int[] nums,
                   List<Integer> path,
                   boolean[] used) {

        if(path.size() == nums.length) {
            res.add(new ArrayList<>(path));
            return;
        }

        for(int i=0;i<nums.length;i++) {

            if(used[i]) continue;

            used[i] = true;
            path.add(nums[i]);

            backtrack(nums,path,used);

            path.remove(path.size()-1);
            used[i] = false;
        }
    }

    public List<List<Integer>> permute(int[] nums) {

        backtrack(nums,
                  new ArrayList<>(),
                  new boolean[nums.length]);

        return res;
    }
}
```

---

# 3. Combinations

## Idea

Choose k elements from n elements.

```text
n = 4
k = 2

[1,2]
[1,3]
[1,4]
[2,3]
[2,4]
[3,4]


                           []
                 /----------|----------|----------\
               [1]        [2]        [3]        [4]
            /   |   \       |  \        \         
        [1,2] [1,3] [1,4] [2,3] [2,4] [3,4]


backtrack(1, [])

[]
│
├── 1
│   │
│   ├── 2
│   │   └── [1,2]  ✓
│   │
│   ├── 3
│   │   └── [1,3]  ✓
│   │
│   └── 4
│       └── [1,4]  ✓
│
├── 2
│   │
│   ├── 3
│   │   └── [2,3]  ✓
│   │
│   └── 4
│       └── [2,4]  ✓
│
├── 3
│   │
│   └── 4
│       └── [3,4]  ✓
│
└── 4
```

---

## Algorithm

```text
Start from current number

Pick next candidate

Recurse

Backtrack
```

---

## Pseudocode

```text
FUNCTION backtrack(start)

    IF size == k
        add answer
        RETURN

    FOR i = start TO n

        choose i

        recurse(i+1)

        unchoose
```

---

## Python

```python
class Solution:
    def combine(self, n, k):

        res = []

        def backtrack(start, path):

            if len(path) == k:
                res.append(path[:])
                return

            for i in range(start, n + 1):

                path.append(i)
                backtrack(i + 1, path)
                path.pop()

        backtrack(1, [])
        return res
```

---

## C++

```cpp
class Solution {
public:

    vector<vector<int>> res;

    void backtrack(int start,
                   int n,
                   int k,
                   vector<int>& path) {

        if(path.size() == k) {
            res.push_back(path);
            return;
        }

        for(int i=start;i<=n;i++) {

            path.push_back(i);

            backtrack(i+1,n,k,path);

            path.pop_back();
        }
    }

    vector<vector<int>> combine(int n, int k) {

        vector<int> path;

        backtrack(1,n,k,path);

        return res;
    }
};
```

---

## Java

```java
class Solution {

    List<List<Integer>> res = new ArrayList<>();

    void backtrack(int start,
                   int n,
                   int k,
                   List<Integer> path) {

        if(path.size() == k) {
            res.add(new ArrayList<>(path));
            return;
        }

        for(int i=start;i<=n;i++) {

            path.add(i);

            backtrack(i+1,n,k,path);

            path.remove(path.size()-1);
        }
    }

    public List<List<Integer>> combine(int n, int k) {

        backtrack(1,n,k,new ArrayList<>());

        return res;
    }
}
```

---

# 4. N-Queens

## Idea

Place one queen per row.

Check:

```text
Column
Left diagonal
Right diagonal


[]
├── [0]
│   ├── [0,2] ✗
│   └── [0,3]
│       └── [0,3,1] ✗
│
├── [1]
│   └── [1,3]
│       └── [1,3,0]
│           └── [1,3,0,2] ✓
│
├── [2]
│   └── [2,0]
│       └── [2,0,3]
│           └── [2,0,3,1] ✓
│
└── [3]
    ├── [3,0]
    │   └── ✗
    └── [3,1]
        └── ✗
```

before placing.

---

## Complexity

```text
Time: O(N!)
Space: O(N)
```

---

## Python

```python
class Solution:

    def solveNQueens(self, n):

        res = []

        cols = set()
        diag1 = set()
        diag2 = set()

        board = [["."] * n for _ in range(n)]

        def backtrack(row):

            if row == n:
                res.append(["".join(r) for r in board])
                return

            for col in range(n):

                if (col in cols or
                    row-col in diag1 or
                    row+col in diag2):
                    continue

                cols.add(col)
                diag1.add(row-col)
                diag2.add(row+col)

                board[row][col] = 'Q'

                backtrack(row+1)

                board[row][col] = '.'

                cols.remove(col)
                diag1.remove(row-col)
                diag2.remove(row+col)

        backtrack(0)

        return res
```

---

# 5. Sudoku Solver

## Idea

Find empty cell.

Try:

```text
1 to 9
```

If valid:

```text
place
recurse
undo
```

---

## Complexity

```text
Worst: O(9^(81))
```

(pruning makes it much faster)

---

## Python

```python
class Solution:

    def solveSudoku(self, board):

        def valid(r,c,val):

            for i in range(9):

                if board[r][i] == val:
                    return False

                if board[i][c] == val:
                    return False

            sr=(r//3)*3
            sc=(c//3)*3

            for i in range(sr,sr+3):
                for j in range(sc,sc+3):
                    if board[i][j]==val:
                        return False

            return True

        def backtrack():

            for r in range(9):
                for c in range(9):

                    if board[r][c]=='.':

                        for val in "123456789":

                            if valid(r,c,val):

                                board[r][c]=val

                                if backtrack():
                                    return True

                                board[r][c]='.'

                        return False

            return True

        backtrack()
```

---

# 6. Word Search

## Idea

DFS + Backtracking.

From each cell:

```text
Up
Down
Left
Right
```

Try matching next character.

---

## Algorithm

```text
Match current char

Mark visited

Explore 4 directions

Unmark visited
```

---

## Python

```python
class Solution:

    def exist(self, board, word):

        rows = len(board)
        cols = len(board[0])

        def dfs(r,c,index):

            if index == len(word):
                return True

            if (r < 0 or
                c < 0 or
                r >= rows or
                c >= cols or
                board[r][c] != word[index]):
                return False

            temp = board[r][c]
            board[r][c] = '#'

            found = (
                dfs(r+1,c,index+1) or
                dfs(r-1,c,index+1) or
                dfs(r,c+1,index+1) or
                dfs(r,c-1,index+1)
            )

            board[r][c] = temp

            return found

        for r in range(rows):
            for c in range(cols):

                if dfs(r,c,0):
                    return True

        return False
```

---

# Backtracking Pattern To Remember

Almost every backtracking problem follows:

```text
FUNCTION backtrack(state)

    IF solution found
        save answer
        RETURN

    FOR each choice

        choose

        backtrack(next state)

        unchoose
```

This is the universal template behind:

* Subsets
* Permutations
* Combinations
* Combination Sum
* N-Queens
* Sudoku Solver
* Word Search
* Palindrome Partitioning
* Generate Parentheses
* Letter Combinations of Phone Number

Master these six problems first, then move to:

1. Generate Parentheses
2. Combination Sum
3. Letter Combinations of Phone Number
4. Palindrome Partitioning
5. Restore IP Addresses
6. Rat in a Maze
7. Knight's Tour
8. M-Coloring Problem

These cover nearly all classical backtracking patterns asked in interviews.
