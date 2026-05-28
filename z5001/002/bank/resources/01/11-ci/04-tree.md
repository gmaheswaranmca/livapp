📗 *Coding Interview – Part 4: Trees & Binary Trees* 🌳📊

✅ *Q1. Binary Tree Inorder Traversal (Amazon)*  
*Problem:* Return the inorder traversal of a binary tree.  
*Answer:*  
```python
def inorderTraversal(root):
    res, stack = [], []
    while root or stack:
        while root:
            stack.append(root)
            root = root.left
        root = stack.pop()
        res.append(root.val)
        root = root.right
    return res
```

✅ *Q2. Maximum Depth of Binary Tree (Google)*  
*Problem:* Find the max depth of a binary tree.  
*Answer:*  
```python
def maxDepth(root):
    if not root:
        return 0
    return 1 + max(maxDepth(root.left), maxDepth(root.right))
```

✅ *Q3. Diameter of Binary Tree (Meta)*  
*Problem:* Return the length of the longest path between any two nodes.  
*Answer:*  
```python
def diameterOfBinaryTree(root):
    self.res = 0
    def dfs(node):
        if not node:
            return 0
        L, R = dfs(node.left), dfs(node.right)
        self.res = max(self.res, L + R)
        return 1 + max(L, R)
    dfs(root)
    return self.res
```

✅ *Q4. Symmetric Tree (Microsoft)*  
*Problem:* Check if a tree is a mirror of itself.  
*Answer:*  
```python
def isSymmetric(root):
    def isMirror(t1, t2):
        if not t1 and not t2:
            return True
        if not t1 or not t2 or t1.val != t2.val:
            return False
        return isMirror(t1.left, t2.right) and isMirror(t1.right, t2.left)
    return isMirror(root, root)
```

✅ *Q5. Level Order Traversal (Amazon)*  
*Problem:* Return the level order traversal of a binary tree.  
*Answer:*  
```python
from collections import deque
def levelOrder(root):
    if not root:
        return []
    res, q = [], deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
        res.append(level)
    return res
```
