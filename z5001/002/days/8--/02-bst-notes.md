# Binary Search Tree (BST) – Complete Detailed Notes

A **Binary Search Tree (BST)** is a special type of Binary Tree that follows a specific ordering rule.

## BST Property

For every node:

```text
Left Subtree  < Root
Right Subtree > Root
```

Example:

```text
         50
       /    \
     30      70
    /  \    /  \
  20   40  60   80
```

Check:

```text
20 < 30 < 40
30 < 50 < 70
60 < 70 < 80
```

Hence it is a BST.

---

# Why BST?

In a normal Binary Tree:

```text
Search = O(n)
```

because nodes can be anywhere.

In BST:

```text
Search = O(log n)   (Balanced BST)
```

because we eliminate half the tree at every step, similar to Binary Search.

---

# Node Structure

## Pseudocode

```text
CLASS Node
    data
    left
    right
END CLASS
```

## C++

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

## Java

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

## Python

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None
```

---

# BST Operations

1. Insert
2. Search
3. Delete
4. Traversals
5. Minimum
6. Maximum
7. Successor
8. Predecessor

---

# 1. Insertion

## Example

Insert:

```text
50 30 70 20 40 60 80
```

---

### Insert 50

```text
50
```

---

### Insert 30

```text
 50
 /
30
```

30 < 50

Move left.

---

### Insert 70

```text
   50
  /  \
30    70
```

70 > 50

Move right.

---

### Insert 20

```text
      50
     /  \
   30    70
  /
20
```

20 < 50

20 < 30

Insert left.

---

### Final Tree

```text
         50
       /    \
     30      70
    /  \    /  \
  20   40  60   80
```

---

## Algorithm

```text
Insert(root,key)

IF root == NULL
    Create Node(key)

IF key < root.data
    root.left = Insert(root.left,key)

ELSE IF key > root.data
    root.right = Insert(root.right,key)

RETURN root
```

---

## Complexity

Balanced:

```text
O(log n)
```

Worst Case:

```text
O(n)
```

---

# 2. Search

Search 60

```text
         50
       /    \
     30      70
    /  \    /  \
  20   40  60   80
```

### Step 1

```text
60 > 50
```

Move right.

---

### Step 2

```text
60 < 70
```

Move left.

---

### Step 3

```text
60 == 60
```

Found.

---

## Algorithm

```text
Search(root,key)

IF root == NULL
    RETURN false

IF root.data == key
    RETURN true

IF key < root.data
    RETURN Search(root.left,key)

ELSE
    RETURN Search(root.right,key)
```

---

## Complexity

Balanced BST

```text
O(log n)
```

Worst BST

```text
O(n)
```

---

# 3. Find Minimum

Minimum is always the leftmost node.

Example:

```text
         50
       /    \
     30      70
    /  \    /  \
  20   40  60   80
```

Move left continuously:

```text
50
↓
30
↓
20
```

Minimum:

```text
20
```

---

## Algorithm

```text
FindMin(root)

WHILE root.left != NULL
    root = root.left

RETURN root
```

---

## Complexity

```text
O(h)
```

h = height

---

# 4. Find Maximum

Always rightmost node.

```text
50
  \
   70
     \
      80
```

Maximum = 80

---

## Algorithm

```text
FindMax(root)

WHILE root.right != NULL
    root = root.right

RETURN root
```

---

# 5. Traversals

Consider:

```text
         50
       /    \
     30      70
    /  \    /  \
  20   40  60   80
```

---

## Inorder

Left Root Right

```text
20 30 40 50 60 70 80
```

Observation:

### Inorder of BST gives Sorted Order

This is a very important interview point.

---

## Preorder

Root Left Right

```text
50 30 20 40 70 60 80
```

---

## Postorder

Left Right Root

```text
20 40 30 60 80 70 50
```

---

## Level Order

```text
50 30 70 20 40 60 80
```

---

# 6. Deletion (Most Important)

Deletion has 3 cases.

---

# Case 1: Leaf Node

Delete 20

```text
       50
      /
    30
   /
 20
```

20 has no children.

Simply remove.

```text
      50
     /
   30
```

---

# Case 2: One Child

Delete 30

```text
      50
     /
   30
   /
 20
```

30 has one child.

Connect parent directly to child.

```text
     50
    /
  20
```

---

# Case 3: Two Children

Delete 50

```text
         50
       /    \
     30      70
    /  \    /  \
  20   40  60   80
```

Cannot remove directly.

Need:

```text
Inorder Successor
```

or

```text
Inorder Predecessor
```

---

## Inorder Successor

Smallest node in right subtree.

Right subtree:

```text
      70
     /  \
   60    80
```

Smallest = 60

Replace:

```text
         60
       /    \
     30      70
    /  \       \
  20   40      80
```

Then delete old 60.

---

## Deletion Algorithm

```text
Delete(root,key)

IF root == NULL
    RETURN NULL

IF key < root.data
    root.left = Delete(root.left,key)

ELSE IF key > root.data
    root.right = Delete(root.right,key)

ELSE

    CASE 1: No child
        delete node

    CASE 2: One child
        return child

    CASE 3: Two children
        successor = Min(root.right)

        root.data = successor.data

        root.right =
            Delete(root.right,
                   successor.data)

RETURN root
```

---

# Dry Run Delete 50

Initial

```text
         50
       /    \
     30      70
    /  \    /  \
  20   40  60   80
```

Successor:

```text
60
```

Replace:

```text
         60
       /    \
     30      70
    /  \    /  \
  20   40  60   80
```

Delete duplicate 60:

```text
         60
       /    \
     30      70
    /  \       \
  20   40       80
```

Done.

---

# 7. Inorder Successor

Definition:

Next larger element.

Example:

```text
20 30 40 50 60 70 80
```

Successor of:

```text
20 → 30
30 → 40
40 → 50
60 → 70
80 → NULL
```

---

# 8. Inorder Predecessor

Definition:

Previous smaller element.

```text
20 30 40 50 60 70 80
```

Examples:

```text
50 → 40
70 → 60
20 → NULL
```

---

# Why BST Can Become Slow?

Insert:

```text
10 20 30 40 50
```

Produces:

```text
10
  \
   20
     \
      30
        \
         40
           \
            50
```

Looks like Linked List.

Operations become:

```text
Search O(n)
Insert O(n)
Delete O(n)
```

This is called an **Unbalanced BST**.

---

# Balanced BSTs

To overcome skewed trees:

* AVL Tree
* Red-Black Tree
* B Tree
* B+ Tree

keep height near:

```text
log n
```

---

# Complexity Summary

| Operation | Average  | Worst |
| --------- | -------- | ----- |
| Search    | O(log n) | O(n)  |
| Insert    | O(log n) | O(n)  |
| Delete    | O(log n) | O(n)  |
| Find Min  | O(log n) | O(n)  |
| Find Max  | O(log n) | O(n)  |
| Traversal | O(n)     | O(n)  |

---

# Interview Points

1. BST is a Binary Tree with ordering property.

```text
Left < Root < Right
```

2. Inorder traversal of BST gives sorted order.

3. Minimum = leftmost node.

4. Maximum = rightmost node.

5. Deletion has 3 cases:

```text
Leaf Node
One Child
Two Children
```

6. For two-child deletion use:

```text
Inorder Successor
or
Inorder Predecessor
```

7. BST operations depend on height:

```text
O(h)
```

8. Balanced BST:

```text
h ≈ log n
```

9. Skewed BST:

```text
h ≈ n
```

10. BST is one of the most frequently asked topics in coding interviews and is the foundation for AVL Trees, Red-Black Trees, and many database indexing structures.
