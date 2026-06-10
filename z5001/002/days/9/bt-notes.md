# Subsets
```text
n = 2
nums=[1, 2]

State Space Tree
[]
├── [1]
│   ├── [1,2]
│   └── [1]
└── []
    ├── [2]
    └── []

Result:
[]
[1]
[2]
[1,2]
```

```pseudo
CLASS Solution    
    METHOD backtrack(index, nums, path, res)
        IF index = length(nums) THEN
            ADD copy(path) TO res
            RETURN
        END IF
        ADD nums[index] TO path
        CALL backtrack(index + 1, nums, path, res)
        REMOVE last element FROM path
        CALL backtrack(index + 1, nums, path, res)
    END METHOD
    METHOD subsets(nums)
        VARIABLE res ← empty list
        path ← empty list
        CALL backtrack(0, nums, path, res)
        RETURN res
    END METHOD
END CLASS
```

```py
class Solution:        
    def backtrack(self, index, nums, path, res):
        if index == len(nums):
            self.res.append(path[:])
            return
        path.append(nums[index])
        self.backtrack(index + 1, nums, path, res)
        path.pop()
        self.backtrack(index + 1, nums, path, res)
    def subsets(self, nums):
        res = []
        path = []
        self.backtrack(0, nums, path, res)
        return self.res
```

```java 
class Solution {    
    void backtrack(int index, int[] nums, List<Integer> path, 
            List<List<Integer>> res) {
        if (index == nums.length) {
            res.add(new ArrayList<>(path));
            return;
        }
        path.add(nums[index]);
        backtrack(index + 1, nums, path, res);
        path.remove(path.size() - 1);
        backtrack(index + 1, nums, path, res);
    }
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        List<Integer> path = new ArrayList<>();
        backtrack(0, nums, path, res);
        return res;
    }
}
```

```c++
class Solution {
public:    
    void backtrack(int index, vector<int>& nums,
                   vector<int>& path, 
                   vector<vector<int>> res) {
        if(index == nums.size()) {
            res.push_back(path);
            return;
        }
        path.push_back(nums[index]);
        backtrack(index+1, nums, path, res);
        path.pop_back();
        backtrack(index+1, nums, path, res);
    }
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> path;
        backtrack(0, nums, path, res);
        return res;
    }
};
```

# Permutations
```text
[1,2,3]

1 _ _
2 _ _
3 _ _


[]
├── [1]
│   ├── [1,2]
│   │   └── [1,2,3]
│   └── [1,3]
│       └── [1,3,2]
├── [2]
│   ├── [2,1]
│   │   └── [2,1,3]
│   └── [2,3]
│       └── [2,3,1]
└── [3]
    ├── [3,1]
    │   └── [3,1,2]
    └── [3,2]
        └── [3,2,1]

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

```pseudo
CLASS Solution
    FUNCTION backtrack(nums, path, used, res)
        IF size(path) = size(nums)
            ADD copy(path) TO res
            RETURN
        END IF
        FOR i ← 0 TO size(nums) - 1
            IF used[i] = true
                CONTINUE
            END IF

            used[i] ← true
            ADD nums[i] TO path
            CALL backtrack(nums, path, used, res)
            REMOVE last element FROM path
            used[i] ← false
        END FOR
    END FUNCTION
    FUNCTION permute(nums)
        res ← empty list
        path ← empty list
        used ← array of false of size(nums)
        CALL backtrack(nums, path, used, res)
        RETURN res
    END FUNCTION
END CLASS
```

```py
class Solution:
    def backtrack(self, nums, path, used, res):
        if len(path) == len(nums):
            res.append(path[:])
            return
        for i in range(len(nums)):
            if used[i]:
                continue
            used[i] = True
            path.append(nums[i])
            self.backtrack(nums, path, used, res)
            path.pop()
            used[i] = False
    def permute(self, nums):
        res = []
        path = []
        used = [False] * len(nums)
        self.backtrack(nums, path, used, res)
        return res
```

```c++
class Solution {
public:
    void backtrack(vector<int>& nums,
                   vector<int>& path,
                   vector<bool>& used,
                   vector<vector<int>>& res) {
        if(path.size() == nums.size()) {
            res.push_back(path);
            return;
        }
        for(int i=0;i<nums.size();i++) {
            if(used[i]) continue;
            used[i]=true;
            path.push_back(nums[i]);
            backtrack(nums,path,used, res);
            path.pop_back();
            used[i]=false;
        }
    }
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> path;
        vector<bool> used(nums.size(),false);
        backtrack(nums,path,used, res);
        return res;
    }
};
```

```java
class Solution {
    void backtrack(int[] nums,
                   List<Integer> path,
                   boolean[] used,
                   List<List<Integer>> res) {
        if (path.size() == nums.length) {
            res.add(new ArrayList<>(path));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (used[i])
                continue;
            used[i] = true;
            path.add(nums[i]);
            backtrack(nums, path, used, res);
            path.remove(path.size() - 1);
            used[i] = false;
        }
    }
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        List<Integer> path = new ArrayList<>();
        boolean[] used = new boolean[nums.length];
        backtrack(nums, path, used, res);
        return res;
    }
}
```

# Combinations
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

```pseudo
CLASS Solution
    FUNCTION backtrack(start, n, k, path, res)
        IF size(path) = k
            ADD copy(path) TO res
            RETURN
        END IF
        FOR i ← start TO n
            ADD i TO path
            CALL backtrack(i + 1, n, k, path, res)
            REMOVE last element FROM path
        END FOR
    END FUNCTION
    FUNCTION combine(n, k)
        res ← empty list
        path ← empty list
        CALL backtrack(1, n, k, path, res)
        RETURN res
    END FUNCTION
END CLASS
```

```py
class Solution:
    def backtrack(self, start, n, k, path, res):
        if len(path) == k:
            res.append(path[:])
            return
        for i in range(start, n + 1):
            path.append(i)
            self.backtrack(i + 1, n, k, path, res)
            path.pop()
    def combine(self, n, k):
        res = []
        path = []
        self.backtrack(1, n, k, path, res)
        return res
```

```c++
class Solution {
public:    
    void backtrack(int start,
                   int n,
                   int k,
                   vector<int>& path,
                   vector<vector<int>>& res) {
        if(path.size() == k) {
            res.push_back(path);
            return;
        }
        for(int i=start;i<=n;i++) {
            path.push_back(i);
            backtrack(i+1,n,k,path, res);
            path.pop_back();
        }
    }
    vector<vector<int>> combine(int n, int k) {
        vector<vector<int>> res;
        vector<int> path;
        backtrack(1,n,k,path, res);
        return res;
    }
};
```

```java
class Solution {
    void backtrack(int start,
                   int n,
                   int k,
                   List<Integer> path,
                   List<List<Integer>> res) {
        if (path.size() == k) {
            res.add(new ArrayList<>(path));
            return;
        }
        for (int i = start; i <= n; i++) {
            path.add(i);
            backtrack(i + 1, n, k, path, res);
            path.remove(path.size() - 1);
        }
    }
    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> res = new ArrayList<>();
        List<Integer> path = new ArrayList<>();
        backtrack(1, n, k, path, res);
        return res;
    }
}
```

# N-Queens
## Final Solutions for N = 4
### Solution 1
```text
. Q . .
. . . Q
Q . . .
. . Q .
```
### Solution 2
```text
. . Q .
Q . . .
. . . Q
. Q . .
```

```text
Row0
├── Col0
│   ├── Col2
│   │   └── Dead End
│   └── Col3
│       └── Dead End
├── Col1
│   └── Col3
│       └── Col0
│           └── Col2
│               └── Solution 1
├── Col2
│   └── Col0
│       └── Col3
│           └── Col1
│               └── Solution 2
└── Col3
    ├── ...
    └── Dead Ends
```

```pseudo
FUNCTION hasConflict(row, col, cols, diag1, diag2)
    IF (col IN cols) OR
       (row - col) IN diag1 OR
       (row + col) IN diag2
        RETURN TRUE
    END IF
    RETURN FALSE
END FUNCTION
FUNCTION updateRowCol(row, col, cols, diag1, diag2)
    ADD col TO cols
    ADD (row - col) TO diag1
    ADD (row + col) TO diag2
END FUNCTION
FUNCTION removeRowCol(row, col, cols, diag1, diag2)
    REMOVE col FROM cols
    REMOVE (row - col) FROM diag1
    REMOVE (row + col) FROM diag2
END FUNCTION
FUNCTION backtrack(row, n, board, cols, diag1, diag2, result)
    IF row = n THEN
        ADD current board configuration TO result
        RETURN
    END IF
    FOR col ← 0 TO n-1
        IF hasConflict(row, col, cols, diag1, diag2) THEN
            CONTINUE
        END IF
        updateRowCol(row, col, cols, diag1, diag2)
        board[row][col] ← 'Q'
        backtrack(row + 1, n, board, cols, diag1, diag2, result)
        board[row][col] ← '.'
        removeRowCol(row, col, cols, diag1, diag2)
    END FOR
END FUNCTION
FUNCTION solveNQueens(n)
    result ← empty list
    board ← n × n board filled with '.'
    cols ← empty set
    diag1 ← empty set
    diag2 ← empty set
    backtrack(0, n, board, cols, diag1, diag2, result)
    RETURN result
END FUNCTION
```

```py
class Solution:
    def hasConflict(self, row, col, cols, diag1, diag2):
        return (col in cols or
            row - col in diag1 or
            row + col in diag2)
    def updateRowCol(self, row, col, cols, diag1, diag2):
        cols.add(col)
        diag1.add(row - col)
        diag2.add(row + col)
    def removeRowCol(self, row, col, cols, diag1, diag2):
        cols.remove(col)
        diag1.remove(row - col)
        diag2.remove(row + col)
    def backtrack(self, row, n, board, cols, diag1, diag2, res):
        if row == n:
            res.append(["".join(r) for r in board])
            return
        for col in range(n):
            if self.hasConflict(row, col, cols, diag1, diag2):
                continue
            self.updateRowCol(row, col, cols, diag1, diag2)
            board[row][col] = 'Q'
            self.backtrack(row + 1, n, board, cols, diag1, diag2, res)
            board[row][col] = '.'
            self.removeRowCol(row, col, cols, diag1, diag2)
    def solveNQueens(self, n):
        res = []
        board = [["."] * n for _ in range(n)]
        cols = set()
        diag1 = set()
        diag2 = set()
        self.backtrack(0, n, board, cols, diag1, diag2, res)
        return res
```

```c++
class Solution {
public:
    bool hasConflict(int row, int col,
        unordered_set<int>& cols,
        unordered_set<int>& diag1,
        unordered_set<int>& diag2) {
        return cols.count(col) ||
               diag1.count(row - col) ||
               diag2.count(row + col);
    }
    void updateRowCol(int row, int col,
        unordered_set<int>& cols,
        unordered_set<int>& diag1,
        unordered_set<int>& diag2) {
        cols.insert(col);
        diag1.insert(row - col);
        diag2.insert(row + col);
    }
    void removeRowCol(int row, int col,
        unordered_set<int>& cols,
        unordered_set<int>& diag1,
        unordered_set<int>& diag2) {
        cols.erase(col);
        diag1.erase(row - col);
        diag2.erase(row + col);
    }
    void backtrack(int row,
        int n,
        vector<string>& board,
        unordered_set<int>& cols,
        unordered_set<int>& diag1,
        unordered_set<int>& diag2,
        vector<vector<string>>& res) {
        if (row == n) {
            res.push_back(board);
            return;
        }
        for (int col = 0; col < n; col++) {
            if (hasConflict(row, col, cols, diag1, diag2))
                continue;
            updateRowCol(row, col, cols, diag1, diag2);
            board[row][col] = 'Q';
            backtrack(row + 1, n, board,
                      cols, diag1, diag2, res);
            board[row][col] = '.';
            removeRowCol(row, col, cols, diag1, diag2);
        }
    }
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> res;
        vector<string> board(n, string(n, '.'));
        unordered_set<int> cols;
        unordered_set<int> diag1;
        unordered_set<int> diag2;
        backtrack(0, n, board,
                  cols, diag1, diag2, res);
        return res;
    }
};
```

```java
import java.util.*;
class Solution {
    private boolean hasConflict(int row, int col,
                                Set<Integer> cols,
                                Set<Integer> diag1,
                                Set<Integer> diag2) {
        return cols.contains(col) ||
            diag1.contains(row - col) ||
            diag2.contains(row + col);
    }
    private void updateRowCol(int row, int col,
                              Set<Integer> cols,
                              Set<Integer> diag1,
                              Set<Integer> diag2) {
        cols.add(col);
        diag1.add(row - col);
        diag2.add(row + col);
    }
    private void removeRowCol(int row, int col,
                              Set<Integer> cols,
                              Set<Integer> diag1,
                              Set<Integer> diag2) {
        cols.remove(col);
        diag1.remove(row - col);
        diag2.remove(row + col);
    }
    private void backtrack(int row,
                           int n,
                           char[][] board,
                           Set<Integer> cols,
                           Set<Integer> diag1,
                           Set<Integer> diag2,
                           List<List<String>> res) {
        if (row == n) {
            List<String> solution = new ArrayList<>();
            for (char[] r : board) {
                solution.add(new String(r));
            }
            res.add(solution);
            return;
        }
        for (int col = 0; col < n; col++) {
            if (hasConflict(row, col, cols, diag1, diag2))
                continue;
            updateRowCol(row, col, cols, diag1, diag2);
            board[row][col] = 'Q';
            backtrack(row + 1, n, board,
                      cols, diag1, diag2, res);
            board[row][col] = '.';
            removeRowCol(row, col, cols, diag1, diag2);
        }
    }
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> res = new ArrayList<>();
        char[][] board = new char[n][n];
        for (int i = 0; i < n; i++) {
            Arrays.fill(board[i], '.');
        }
        Set<Integer> cols = new HashSet<>();
        Set<Integer> diag1 = new HashSet<>();
        Set<Integer> diag2 = new HashSet<>();
        backtrack(0, n, board,
                  cols, diag1, diag2, res);
        return res;
    }
}
```

# Sudoku Solver
```text
5 3 . | . 7 . | . . .
6 . . | 1 9 5 | . . .
. 9 8 | . . . | . 6 .
------+-------+------
8 . . | . 6 . | . . 3
4 . . | 8 . 3 | . . 1
7 . . | . 2 . | . . 6
------+-------+------
. 6 . | . . . | 2 8 .
. . . | 4 1 9 | . . 5
. . . | . 8 . | . 7 9


Cell(0,2)
├── 1
│
└── Cell(0,3)
    ├── 2
    │
    └── Cell(0,5)
        ├── 4
        │
        └── Cell(0,6)
            ├── 8
            │
            └── Dead End
            │
            └── Backtrack
            │
            └── Try 9
        │
        └── Continue
        │
        └── Solution
```

```pseudo
FUNCTION isValid(board, row, col, num)
    FOR i ← 0 TO 8
        IF board[row][i] = num
            RETURN FALSE
        END IF
    END FOR
    FOR i ← 0 TO 8
        IF board[i][col] = num
            RETURN FALSE
        END IF
    END FOR
    sr ← (row DIV 3) * 3
    sc ← (col DIV 3) * 3
    FOR i ← sr TO sr + 2
        FOR j ← sc TO sc + 2
            IF board[i][j] = num
                RETURN FALSE
            END IF
        END FOR
    END FOR
    RETURN TRUE
END FUNCTION
FUNCTION getNextCell(row, col)
    col ← col + 1
    IF col = 9
        row ← row + 1
        col ← 0
    END IF
    RETURN (row, col)
END FUNCTION
FUNCTION backtrack(board, row, col)
    IF row = 9
        RETURN TRUE
    END IF
    (nextRow, nextCol) ← getNextCell(row, col)
    IF board[row][col] ≠ '.'
        RETURN backtrack(board, nextRow, nextCol)
    END IF
    FOR num ← '1' TO '9'
        IF isValid(board, row, col, num)
            board[row][col] ← num
            IF backtrack(board, nextRow, nextCol)
                RETURN TRUE
            END IF
            board[row][col] ← '.'
        END IF
    END FOR
    RETURN FALSE
END FUNCTION
FUNCTION solveSudoku(board)
    backtrack(board, 0, 0)
END FUNCTION
```

```py
class Solution:
    def is_valid(self, board, row, col, num):
        for i in range(9):
            if board[row][i] == num:
                return False
        for i in range(9):
            if board[i][col] == num:
                return False
        start_row = (row // 3) * 3
        start_col = (col // 3) * 3
        for i in range(start_row, start_row + 3):
            for j in range(start_col, start_col + 3):
                if board[i][j] == num:
                    return False
        return True
    def solve(self, board, row, col):
        if row == 9:
            return True
        next_row = row
        next_col = col + 1
        if next_col == 9:
            next_row = row + 1
            next_col = 0
        if board[row][col] != '.':
            return self.solve(board, next_row, next_col)
        for num in "123456789":
            if self.is_valid(board, row, col, num):
                board[row][col] = num
                if self.solve(board, next_row, next_col):
                    return True
                board[row][col] = '.'
        return False
    def solveSudoku(self, board):
        self.solve(board, 0, 0)
```

```c++
class Solution {
public:
    bool isValid(vector<vector<char>>& board,
                 int row,
                 int col,
                 char num) {
        for (int i = 0; i < 9; i++) {
            if (board[row][i] == num)
                return false;
        }
        for (int i = 0; i < 9; i++) {
            if (board[i][col] == num)
                return false;
        }
        int sr = (row / 3) * 3;
        int sc = (col / 3) * 3;
        for (int i = sr; i < sr + 3; i++) {
            for (int j = sc; j < sc + 3; j++) {
                if (board[i][j] == num)
                    return false;
            }
        }
        return true;
    }
    pair<int, int> getNextCell(int row, int col) {
        col++;
        if (col == 9) {
            row++;
            col = 0;
        }
        return {row, col};
    }
    bool backtrack(vector<vector<char>>& board,
                   int row,
                   int col) {
        if (row == 9)
            return true;
        auto [nextRow, nextCol] = getNextCell(row, col);
        if (board[row][col] != '.')
            return backtrack(board, nextRow, nextCol);
        for (char num = '1'; num <= '9'; num++) {
            if (isValid(board, row, col, num)) {
                board[row][col] = num;
                if (backtrack(board, nextRow, nextCol))
                    return true;
                board[row][col] = '.';
            }
        }
        return false;
    }
    void solveSudoku(vector<vector<char>>& board) {
        backtrack(board, 0, 0);
    }
};
```

```java
class Solution {
    private boolean isValid(char[][] board,
                            int row,
                            int col,
                            char num) {
        for (int i = 0; i < 9; i++) {
            if (board[row][i] == num)
                return false;
        }
        for (int i = 0; i < 9; i++) {
            if (board[i][col] == num)
                return false;
        }
        int sr = (row / 3) * 3;
        int sc = (col / 3) * 3;
        for (int i = sr; i < sr + 3; i++) {
            for (int j = sc; j < sc + 3; j++) {
                if (board[i][j] == num)
                    return false;
            }
        }
        return true;
    }

    private int[] getNextCell(int row, int col) {
        col++;
        if (col == 9) {
            row++;
            col = 0;
        }
        return new int[]{row, col};
    }

    private boolean backtrack(char[][] board,
                              int row,
                              int col) {
        if (row == 9)
            return true;
        int[] next = getNextCell(row, col);
        int nextRow = next[0];
        int nextCol = next[1];
        if (board[row][col] != '.')
            return backtrack(board, nextRow, nextCol);
        for (char num = '1'; num <= '9'; num++) {
            if (isValid(board, row, col, num)) {
                board[row][col] = num;
                if (backtrack(board, nextRow, nextCol))
                    return true;
                board[row][col] = '.';
            }
        }
        return false;
    }
    public void solveSudoku(char[][] board) {
        backtrack(board, 0, 0);
    }
}
```

# Word Search
```text
Board:
A B C E
S F C S
A D E E

Word = "ABCCED"

Movement:
A -> B -> C
          |
          C
          |
      D <- E

Path: 
    A → B → C → C → E → D

exist()
│
├── for each cell
│
└── dfs(row, col, index)
      │
      ├── Base Case
      │     index == word.length()
      │
      ├── Invalid Cell Check
      │
      ├── Choose
      │     mark current cell as visited
      │
      ├── Explore
      │     up
      │     down
      │     left
      │     right
      │
      └── Unchoose
            restore original value


Standard: "Choose → Explore → Unchoose backtracking template"

exist()

├── Start (0,0) = A ✓
│
│   dfs(0,0,"A")
│   │
│   ├── Up    -> Invalid
│   ├── Left  -> Invalid
│   ├── Down  -> S ✗
│   │
│   └── Right -> B ✓
│
│       dfs(0,1,"AB")
│       │
│       ├── Up    -> Invalid
│       ├── Left  -> Visited
│       ├── Down  -> F ✗
│       │
│       └── Right -> C ✓
│
│           dfs(0,2,"ABC")
│           │
│           ├── Up    -> Invalid
│           ├── Left  -> Visited
│           ├── Right -> E ✗
│           │
│           └── Down  -> C ✓
│
│               dfs(1,2,"ABCC")
│               │
│               ├── Up    -> Visited
│               ├── Left  -> F ✗
│               ├── Right -> S ✗
│               │
│               └── Down  -> E ✓
│
│                   dfs(2,2,"ABCCE")
│                   │
│                   ├── Up    -> Visited
│                   ├── Right -> E ✗
│                   ├── Down  -> Invalid
│                   │
│                   └── Left  -> D ✓
│
│                       dfs(2,1,"ABCCED")
│
│                       index == word.length()
│
│                       RETURN TRUE
│
└── Search Stops
```

```pseudo
CLASS Solution
    FUNCTION dfs(board, word, row, col, index)
        IF index == length(word)
            RETURN true
        rows = number of rows in board
        cols = number of columns in board
        IF row < 0 OR row >= rows OR
           col < 0 OR col >= cols
            RETURN false
        IF board[row][col] != word[index]
            RETURN false
        temp = board[row][col]
        board[row][col] = '#'
        found =
            dfs(board, word, row - 1, col, index + 1) OR
            dfs(board, word, row + 1, col, index + 1) OR
            dfs(board, word, row, col - 1, index + 1) OR
            dfs(board, word, row, col + 1, index + 1)
        board[row][col] = temp
        RETURN found
    END FUNCTION
    FUNCTION exist(board, word)
        rows = number of rows
        cols = number of columns
        FOR row = 0 TO rows - 1
            FOR col = 0 TO cols - 1
                IF dfs(board, word, row, col, 0)
                    RETURN true
            END FOR
        END FOR
        RETURN false
    END FUNCTION
END CLASS
```

```py
class Solution:
    def dfs(self, board, word, row, col, index):
        if index == len(word):
            return True
        rows = len(board)
        cols = len(board[0])
        if row < 0 or row >= rows or col < 0 or col >= cols:
            return False
        if board[row][col] != word[index]:
            return False
        temp = board[row][col]
        board[row][col] = '#'
        found = (
            self.dfs(board, word, row - 1, col, index + 1) or
            self.dfs(board, word, row + 1, col, index + 1) or
            self.dfs(board, word, row, col - 1, index + 1) or
            self.dfs(board, word, row, col + 1, index + 1)
        )
        board[row][col] = temp
        return found
    def exist(self, board, word):
        rows = len(board)
        cols = len(board[0])
        for row in range(rows):
            for col in range(cols):
                if self.dfs(board, word, row, col, 0):
                    return True
        return False
```

```c++
class Solution {
public:
    bool dfs(vector<vector<char>>& board,
             string& word,
             int row,
             int col,
             int index) {
        if (index == word.length())
            return true;
        int rows = board.size();
        int cols = board[0].size();
        if (row < 0 || row >= rows ||
            col < 0 || col >= cols)
            return false;
        if (board[row][col] != word[index])
            return false;
        char temp = board[row][col];
        board[row][col] = '#';
        bool found =
            dfs(board, word, row - 1, col, index + 1) ||
            dfs(board, word, row + 1, col, index + 1) ||
            dfs(board, word, row, col - 1, index + 1) ||
            dfs(board, word, row, col + 1, index + 1);
        board[row][col] = temp;
        return found;
    }
    bool exist(vector<vector<char>>& board, string word) {
        int rows = board.size();
        int cols = board[0].size();
        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {

                if (dfs(board, word, row, col, 0))
                    return true;
            }
        }
        return false;
    }
};
```

```java
class Solution {
    public boolean dfs(char[][] board,
                       String word,
                       int row,
                       int col,
                       int index) {
        if (index == word.length())
            return true;
        int rows = board.length;
        int cols = board[0].length;
        if (row < 0 || row >= rows ||
            col < 0 || col >= cols)
            return false;
        if (board[row][col] != word.charAt(index))
            return false;
        char temp = board[row][col];
        board[row][col] = '#';
        boolean found =
            dfs(board, word, row - 1, col, index + 1) ||
            dfs(board, word, row + 1, col, index + 1) ||
            dfs(board, word, row, col - 1, index + 1) ||
            dfs(board, word, row, col + 1, index + 1);
        board[row][col] = temp;
        return found;
    }
    public boolean exist(char[][] board, String word) {
        int rows = board.length;
        int cols = board[0].length;
        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                if (dfs(board, word, row, col, 0))
                    return true;
            }
        }
        return false;
    }
}
```

