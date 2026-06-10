# Binary Tree – Complete Explanation

## 1. What is a Binary Tree?

A **Binary Tree** is a hierarchical data structure where each node can have **at most two children**:

* Left Child
* Right Child

Example:

```text
        10
       /  \
      5    20
     / \   /
    3   7 15
```

Here:

* 10 is the root
* 5 is left child of 10
* 20 is right child of 10
* 3, 7, 15 are leaf nodes

---

## 2. Terminology

### Root

Topmost node.

```text
    10
```

Root = 10

---

### Parent and Child

```text
    10
   /  \
  5   20
```

* 10 → Parent
* 5,20 → Children

---

### Leaf Node

Node having no children.

```text
    10
   /  \
  5   20
     /  \
   15   30
```

Leaf Nodes = 5, 15, 30

---

### Internal Node

Node having at least one child.

Internal Nodes = 10, 20

---

### Degree

Number of children of a node.

```text
    10
   / \
  5  20
```

Degree(10)=2

Degree(5)=0

---

### Depth

Number of edges from root to node.

```text
        10
       /
      5
     /
    3
```

Depth(10)=0

Depth(5)=1

Depth(3)=2

---

### Height

Number of edges in longest path from node to leaf.

```text
      10
     /
    5
   /
  3
```

Height(3)=0

Height(5)=1

Height(10)=2

---

### Level

```text
Level 0 : 10
Level 1 : 5 20
Level 2 : 3 7 15
```

Level = Depth

---

## 3. Binary Tree Node Structure

### Pseudocode

```text
CLASS Node
    data
    left
    right
END CLASS
```

### C++

```cpp
class Node {
public:
    int data;
    Node* left;
    Node* right;

    Node(int d) {
        data = d;
        left = NULL;
        right = NULL;
    }
};
```

### Java

```java
class Node {
    int data;
    Node left;
    Node right;

    Node(int data) {
        this.data = data;
        left = null;
        right = null;
    }
}
```

### Python

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None
```

---

# 4. Types of Binary Trees

## A. Full Binary Tree

Every node has either:

* 0 children
* 2 children

```text
        1
      /   \
     2     3
    / \   / \
   4  5  6  7
```

Valid Full Tree

---

## B. Perfect Binary Tree

All internal nodes have 2 children AND all leaves are at same level.

```text
        1
      /   \
     2     3
    / \   / \
   4  5  6  7
```

Perfect

Nodes:

```text
2^(h+1)-1
```

---

## C. Complete Binary Tree

All levels completely filled except possibly last level.

Last level filled from left to right.

```text
        1
      /   \
     2     3
    / \   /
   4  5  6
```

Complete Tree

---

## D. Skewed Tree

Every node has one child.

### Left Skewed

```text
    10
   /
  8
 /
6
```

### Right Skewed

```text
10
  \
   20
     \
      30
```

Looks like linked list.

---

## E. Balanced Binary Tree

Height difference between left and right subtree is small.

Example:

```text
        10
       /  \
      5   20
     /     \
    3      30
```

Balanced

Search operations become efficient.

---

# 5. Traversals

Very Important

---

## 1. Preorder

Root → Left → Right

```text
        1
      /   \
     2     3
    / \
   4   5
```

Visit:

```text
1 2 4 5 3
```

### Pseudocode

```text
Preorder(node)

IF node == NULL
    RETURN

PRINT node.data

Preorder(node.left)

Preorder(node.right)
```

---

## 2. Inorder

Left → Root → Right

```text
4 2 5 1 3
```

### Pseudocode

```text
Inorder(node)

IF node == NULL
    RETURN

Inorder(node.left)

PRINT node.data

Inorder(node.right)
```

---

## 3. Postorder

Left → Right → Root

```text
4 5 2 3 1
```

### Pseudocode

```text
Postorder(node)

IF node == NULL
    RETURN

Postorder(node.left)

Postorder(node.right)

PRINT node.data
```

---

## 4. Level Order Traversal

Uses Queue

Level by Level

```text
1 2 3 4 5
```

### Idea

```text
Push root

While queue not empty

    Pop front

    Print node

    Push left child

    Push right child
```

---

# 6. Number of Nodes Formula

Maximum nodes at level L:

```text
2^L
```

Example

```text
Level 0 = 1
Level 1 = 2
Level 2 = 4
Level 3 = 8
```

---

Maximum nodes in tree of height H:

```text
2^(H+1)-1
```

Example:

```text
Height = 3

2^(3+1)-1

16-1

15
```

---

# 7. Why Trees?

Arrays:

```text
Search = O(n)
```

Linked Lists:

```text
Search = O(n)
```

Balanced Trees:

```text
Search = O(log n)
Insert = O(log n)
Delete = O(log n)
```

Therefore trees are used in:

* Databases
* File Systems
* Compilers
* Search Engines
* Routing Tables

---

# 8. Common Binary Tree Problems

### Easy

* Maximum Depth of Binary Tree
* Same Tree
* Invert Binary Tree
* Symmetric Tree
* Balanced Binary Tree

### Medium

* Binary Tree Level Order Traversal
* Binary Tree Right Side View
* Path Sum II
* Lowest Common Ancestor
* Construct Tree from Traversals

### Hard

* Binary Tree Maximum Path Sum
* Serialize and Deserialize Binary Tree
* Vertical Order Traversal

---

# Interview Summary

A Binary Tree node contains:

```text
data
left child
right child
```

Important traversals:

```text
Preorder  = Root Left Right
Inorder   = Left Root Right
Postorder = Left Right Root
LevelOrder= BFS using Queue
```

Important types:

```text
Full
Perfect
Complete
Balanced
Skewed
```

Time complexity of traversals:

```text
O(n)
```

because every node is visited exactly once.
