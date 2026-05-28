📘 *Coding Interview – Part 7: Recursion & Backtracking* 🔁🧠

✅ *Q1. Generate Parentheses (Google)*  
*Problem:* Generate all combinations of well-formed parentheses for n pairs.  
*Answer:*  
```python
def generateParenthesis(n):
    res = []
    def backtrack(s, left, right):
        if len(s) == 2 * n:
            res.append(s)
            return
        if left < n:
            backtrack(s + '(', left + 1, right)
        if right < left:
            backtrack(s + ')', left, right + 1)
    backtrack('', 0, 0)
    return res
```

✅ *Q2. Subsets (Amazon)*  
*Problem:* Return all possible subsets of a given array.  
*Answer:*  
```python
def subsets(nums):
    res = []
    def backtrack(start, path):
        res.append(path[:])
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()
    backtrack(0, [])
    return res
```

✅ *Q3. Permutations (Microsoft)*  
*Problem:* Return all permutations of a given array.  
*Answer:*  
```python
def permute(nums):
    res = []
    def backtrack(path, remaining):
        if not remaining:
            res.append(path)
            return
        for i in range(len(remaining)):
            backtrack(path + [remaining[i]], remaining[:i] + remaining[i+1:])
            backtrack([], nums)
    return res
```

✅ *Q4. Word Search (Apple)*  
*Problem:* Check if a word exists in a 2D grid using DFS/backtracking.  
*Answer:*  
```python
def exist(board, word):
    rows, cols = len(board), len(board[0])
    def dfs(i, j, k):
        if k == len(word): return True
        if i<0 or j<0 or i>=rows or j>=cols or board[i][j] != word[k]:
            return False
        temp, board[i][j] = board[i][j], '#'
        found = (dfs(i+1,j,k+1) or dfs(i-1,j,k+1) or dfs(i,j+1,k+1) or dfs(i,j-1,k+1))
        board[i][j] = temp
        return found
    for i in range(rows):
        for j in range(cols):
            if dfs(i, j, 0): return True
    return False
```

✅ *Q5. N-Queens (Hard)*  
*Problem:* Place N queens on an N×N board so that no two queens threaten each other.  
*Answer:*  
```python
def solveNQueens(n):
    res = []
    board = [["."]*n for _ in range(n)]
    def is_valid(row, col):
        for i in range(row):
            if board[i][col] == 'Q': return False
            if col-(row-i) >=0 and board[i][col-(row-i)] == 'Q': return False
            if col+(row-i) < n and board[i][col+(row-i)] == 'Q': return False
        return True
    def backtrack(row):
        if row == n:
            res.append(["".join(r) for r in board])
            return
    for col in range(n):
            if is_valid(row, col):
                board[row][col] = 'Q'
                backtrack(row+1)
                board[row][col] = '.'
    backtrack(0)
    return res
```
