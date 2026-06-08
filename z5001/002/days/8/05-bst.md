# B-Tree (Balanced Multiway Search Tree)

After BST, AVL, and Red-Black Tree, the next important tree is the **B-Tree**.

B-Trees are designed for:

* Databases
* File Systems
* Disk Storage
* Large Data Indexing

Examples:

* MySQL
* PostgreSQL
* SQLite
* NTFS

---

# Why Not BST/AVL/RBT?

Suppose we have:

```text
1,000,000 records
```

Even AVL or Red-Black Trees require many node accesses.

Disk access is expensive.

A B-Tree stores:

```text
Multiple Keys
Multiple Children
```

inside one node.

Thus height becomes very small.

---

# Binary Tree vs B-Tree

### Binary Tree

```text
       50
      /  \
    30    70
```

Each node:

```text
1 key
2 children
```

---

### B-Tree

```text
      [30 | 60]
      /   |    \
     /    |     \
 [10 20][40 50][70 80]
```

Each node:

```text
Multiple Keys
Multiple Children
```

---

# Order of B-Tree

Let:

```text
m = order of B-tree
```

Then:

### Maximum children

```text
m
```

### Maximum keys

```text
m - 1
```

### Minimum children

```text
ceil(m/2)
```

(except root)

### Minimum keys

```text
ceil(m/2) - 1
```

---

# Example: Order 4 B-Tree

```text
m = 4
```

Maximum:

```text
Children = 4
Keys = 3
```

Node:

```text
[10 | 20 | 30]
```

may have:

```text
4 children
```

---

# B-Tree Properties

## Property 1

Keys inside node are sorted.

Example:

```text
[10 | 20 | 30]
```

---

## Property 2

All leaves are at same level.

Tree remains balanced.

---

## Property 3

Maximum keys:

```text
m - 1
```

---

## Property 4

Maximum children:

```text
m
```

---

## Property 5

Root may have fewer keys.

---

# Node Structure

For order m:

```text
CLASS BTreeNode

    keys[]

    children[]

    keyCount

    leaf

END CLASS
```

---

# Search Operation

Suppose:

```text
             [30 | 60]
            /    |    \
           /     |     \
      [10 20] [40 50] [70 80]
```

Search:

```text
50
```

---

Step 1

```text
50 > 30

50 < 60
```

Move middle child.

---

Step 2

```text
[40 50]
```

Found.

---

# Search Algorithm

```text
FUNCTION Search(node,key)

    i ← 0

    WHILE i < node.keyCount
          AND key > node.keys[i]

        i ← i + 1

    IF i < node.keyCount
       AND key = node.keys[i]

        RETURN TRUE

    IF node.leaf = TRUE

        RETURN FALSE

    RETURN Search(
            node.children[i],
            key
           )

END FUNCTION
```

---

# Insertion

Most important operation.

---

## Rule

Insert always into leaf.

---

# Example

Order 4

Maximum keys:

```text
3
```

Insert:

```text
10
20
30
```

Result:

```text
[10 20 30]
```

Node full.

---

Insert:

```text
40
```

Now:

```text
[10 20 30 40]
```

Overflow.

---

# Splitting

Middle element moves upward.

Before:

```text
[10 20 30 40]
```

Middle:

```text
20
```

Move up.

Result:

```text
        [20]
       /    \
    [10]  [30 40]
```

---

# Another Example

Insert:

```text
50
```

```text
        [20]
       /    \
    [10] [30 40 50]
```

---

Insert:

```text
60
```

Overflow:

```text
[30 40 50 60]
```

Split.

Middle:

```text
40
```

Move up.

Result:

```text
          [20 40]
         /   |   \
      [10] [30] [50 60]
```

---

# Insert Algorithm

High-Level

```text
FUNCTION Insert(key)

    IF root full

        create new root

        split root

    InsertNonFull(root,key)

END FUNCTION
```

---

# Split Child

Most important function.

```text
FUNCTION SplitChild(parent,index)

    child ← parent.children[index]

    create newNode

    move half keys
    to newNode

    move middle key
    to parent

    adjust children

END FUNCTION
```

---

# Insert Non Full

```text
FUNCTION InsertNonFull(node,key)

    IF node is leaf

        insert key
        in sorted position

    ELSE

        locate child

        IF child full

            SplitChild()

        recurse

END FUNCTION
```

---

# Deletion

Deletion is more complicated than insertion.

---

# Case 1

Key in leaf.

Simply remove.

Example:

```text
[10 20 30]
```

Delete:

```text
20
```

Result:

```text
[10 30]
```

---

# Case 2

Key in internal node.

Replace with:

```text
Predecessor
or
Successor
```

similar to BST.

---

# Case 3

Node underflows.

Need:

```text
Borrow
or
Merge
```

---

# Borrowing

Sibling has extra key.

Example:

```text
Parent: [30]

Left : [10 20]
Right: [40 50 60]
```

Delete causes shortage.

Borrow from sibling.

---

# Merging

If borrowing impossible.

Merge nodes.

Before:

```text
Parent : [30]

Left  : [10]

Right : [40]
```

Merge:

```text
[10 30 40]
```

Parent loses key.

---

# Deletion High-Level

```text
FUNCTION Delete(node,key)

    locate key

    IF leaf

        remove

    ELSE

        use predecessor
        or successor

    IF underflow

        borrow

        or merge

END FUNCTION
```

---

# Traversal

Inorder traversal generalized for multiple keys.

Example:

```text
          [20 40]
         /   |   \
      [10] [30] [50 60]
```

Output:

```text
10 20 30 40 50 60
```

Sorted.

---

# Complexity

Let:

```text
m = order
n = keys
```

Height:

h = O(\log_m n)

Because one node stores many keys.

---

Operations:

| Operation | Complexity |
| --------- | ---------- |
| Search    | O(log n)   |
| Insert    | O(log n)   |
| Delete    | O(log n)   |
| Split     | O(1)       |
| Merge     | O(1)       |

---

# Example Height Comparison

Suppose:

```text
1,000,000 records
```

Binary Search Tree:

```text
Height ≈ 20
```

B-Tree (order 100):

```text
Height ≈ 3
```

Huge reduction in disk accesses.

---

# B-Tree vs AVL vs RBT

| Feature           | AVL      | RBT      | B-Tree      |
| ----------------- | -------- | -------- | ----------- |
| Children per node | 2        | 2        | Many        |
| Balance Method    | Height   | Color    | Split/Merge |
| Search            | O(log n) | O(log n) | O(log n)    |
| Disk Friendly     | No       | No       | Yes         |
| Database Usage    | Rare     | Rare     | Very Common |

---

# Interview Points

### AVL

```text
Balance Factor
```

---

### Red-Black Tree

```text
Color Rules
```

---

### B-Tree

```text
Multiple Keys
Multiple Children
```

---

### B-Tree Balancing

Uses:

```text
Split
Borrow
Merge
```

instead of rotations.

---

### Why Databases Prefer B-Trees?

Because:

```text
Height is very small
```

and fewer disk reads are required.

---

# Learning Order

```text
Binary Tree
    ↓
BST
    ↓
AVL
    ↓
Red Black Tree
    ↓
B-Tree
    ↓
B+ Tree
```

The next topic after B-Tree should be **B+ Tree**, which is even more important for database indexing because most modern databases use B+ Trees rather than plain B-Trees.
