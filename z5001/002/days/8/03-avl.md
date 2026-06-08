# AVL Tree – Complete Explanation

## What is an AVL Tree?

An **AVL Tree** is a **self-balancing Binary Search Tree (BST)**.

It was invented by:

* Georgy Adelson-Velsky
* Evgenii Landis

Hence the name **AVL**.

---

## Why AVL Tree?

A normal BST can become skewed.

Example:

Insert:

```text
10 20 30 40 50
```

BST becomes:

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

Height:

```text
4
```

Search:

```text
O(n)
```

AVL Tree automatically balances itself.

Result:

```text
       30
      /  \
    20    40
   /        \
 10          50
```

Height:

```text
O(log n)
```

---

# Balance Factor

The key concept in AVL Trees.

For every node:

BF = Height(Left) - Height(Right)

---

## Allowed Balance Factors

```text
-1
 0
+1
```

Tree is balanced.

---

## Not Allowed

```text
+2
-2
```

Tree becomes unbalanced.

Rotation required.

---

# Example

```text
      30
     / \
   20  40
```

Heights:

```text
20 = 0
40 = 0
```

Balance Factor of 30:

```text
0 - 0 = 0
```

Balanced.

---

# Example 2

```text
      30
     /
   20
  /
10
```

For node 30:

```text
Left Height = 1
Right Height = -1
```

BF:

```text
1 - (-1) = 2
```

Unbalanced.

Need rotation.

---

# AVL Node Structure

Additional field:

```text
height
```

```text
Node
 ├─ data
 ├─ left
 ├─ right
 └─ height
```

---

# Rotations

AVL balancing is done using rotations.

There are 4 cases.

```text
LL
RR
LR
RL
```

---

# 1. LL Rotation (Right Rotation)

## Situation

Inserted into left subtree of left child.

Example:

Insert:

```text
30
20
10
```

Tree:

```text
      30
     /
   20
  /
10
```

BF(30)=2

Unbalanced.

---

## Right Rotation

Before:

```text
      30
     /
   20
  /
10
```

After:

```text
      20
     /  \
   10    30
```

Balanced.

---

## Algorithm

```text
RightRotate(y)

x = y.left

T2 = x.right

x.right = y

y.left = T2

Update heights

Return x
```

---

# 2. RR Rotation (Left Rotation)

## Situation

Inserted into right subtree of right child.

Insert:

```text
10
20
30
```

Tree:

```text
10
  \
   20
     \
      30
```

BF=-2

Unbalanced.

---

## Left Rotation

Before:

```text
10
  \
   20
     \
      30
```

After:

```text
      20
     /  \
   10    30
```

Balanced.

---

## Algorithm

```text
LeftRotate(x)

y = x.right

T2 = y.left

y.left = x

x.right = T2

Update heights

Return y
```

---

# 3. LR Rotation

## Situation

Inserted into right subtree of left child.

Insert:

```text
30
10
20
```

Tree:

```text
      30
     /
   10
     \
      20
```

Unbalanced.

---

## Step 1

Left Rotate at 10

```text
      30
     /
   20
  /
10
```

---

## Step 2

Right Rotate at 30

```text
      20
     /  \
   10    30
```

Balanced.

---

## Rule

```text
LR
=
Left Rotation
+
Right Rotation
```

---

# 4. RL Rotation

## Situation

Inserted into left subtree of right child.

Insert:

```text
10
30
20
```

Tree:

```text
10
  \
   30
  /
20
```

---

## Step 1

Right Rotate at 30

```text
10
  \
   20
     \
      30
```

---

## Step 2

Left Rotate at 10

```text
      20
     /  \
   10    30
```

Balanced.

---

## Rule

```text
RL
=
Right Rotation
+
Left Rotation
```

---

# Rotation Summary

| Case | Pattern     | Fix            |
| ---- | ----------- | -------------- |
| LL   | Left-Left   | Right Rotation |
| RR   | Right-Right | Left Rotation  |
| LR   | Left-Right  | Left + Right   |
| RL   | Right-Left  | Right + Left   |

---

# AVL Insertion

Same as BST insertion.

After insertion:

1. Update height
2. Compute balance factor
3. Apply rotation if needed

---

## AVL Insert Algorithm

```text
Insert(node,key)

1. Normal BST Insert

2. Update Height

3. Compute BF

4. Check

LL
RR
LR
RL

5. Rotate

6. Return Root
```

---

# Dry Run

Insert:

```text
10
20
30
```

---

### Insert 10

```text
10
```

Balanced.

---

### Insert 20

```text
10
  \
   20
```

Balanced.

---

### Insert 30

```text
10
  \
   20
     \
      30
```

BF(10)=-2

RR case.

Left Rotation.

Result:

```text
      20
     /  \
   10    30
```

---

# AVL Deletion

Deletion is:

1. BST deletion
2. Update heights
3. Compute BF
4. Rotate if necessary

Deletion may require multiple rotations while moving upward.

---

# Time Complexities

Since AVL remains balanced:

| Operation | Complexity |
| --------- | ---------- |
| Search    | O(log n)   |
| Insert    | O(log n)   |
| Delete    | O(log n)   |
| Min       | O(log n)   |
| Max       | O(log n)   |

---

# AVL vs BST

| Feature            | BST  | AVL      |
| ------------------ | ---- | -------- |
| Search             | O(h) | O(log n) |
| Insert             | O(h) | O(log n) |
| Delete             | O(h) | O(log n) |
| Balancing          | No   | Yes      |
| Rotations          | No   | Yes      |
| Extra Height Field | No   | Yes      |

---

# AVL Example

Insert:

```text
50 30 70 20 40 60 80
```

AVL:

```text
         50
       /    \
     30      70
    /  \    /  \
  20   40  60   80
```

Already balanced.

Balance Factors:

```text
20 = 0
40 = 0
60 = 0
80 = 0
30 = 0
70 = 0
50 = 0
```

Perfectly balanced.

---

# Interview Points

### 1. AVL is a BST

```text
Left < Root < Right
```

still holds.

---

### 2. AVL keeps tree balanced

```text
BF ∈ {-1,0,1}
```

---

### 3. Four rotations

```text
LL
RR
LR
RL
```

---

### 4. Rotations are O(1)

Only a few pointers are changed.

---

### 5. AVL guarantees

Height = O(\log n)

Therefore:

```text
Search  O(log n)
Insert  O(log n)
Delete  O(log n)
```

---

# Learning Order

```text
Binary Tree
    ↓
BST
    ↓
Height of Tree
    ↓
Balance Factor
    ↓
Rotations (LL,RR,LR,RL)
    ↓
AVL Insertion
    ↓
AVL Deletion
```

Once AVL is clear, the next advanced self-balancing trees are:

* Red-Black Tree
* B Tree
* B+ Tree

These are heavily used in operating systems, databases, and search engines.
