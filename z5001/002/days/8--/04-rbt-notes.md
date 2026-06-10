# Red-Black Tree (RBT)

A **Red-Black Tree** is a **self-balancing Binary Search Tree (BST)**.

Like AVL:

```text
Left Subtree < Root < Right Subtree
```

But instead of storing **height**, it stores a **color**:

```text
RED
BLACK
```

and maintains balance using coloring rules and rotations.

---

# Why Red-Black Tree?

Normal BST:

```text
Search  O(n)
Insert  O(n)
Delete  O(n)
```

in worst case.

AVL:

```text
Search  O(log n)
Insert  O(log n)
Delete  O(log n)
```

but requires frequent rebalancing.

Red-Black Tree:

```text
Search  O(log n)
Insert  O(log n)
Delete  O(log n)
```

with fewer rotations than AVL.

Hence RBT is preferred in many libraries.

Examples:

* C++ STL `map`
* C++ STL `set`
* Linux Scheduler
* Java TreeMap
* Java TreeSet

---

# RBT Properties

Every node is either:

```text
RED
BLACK
```

---

## Rule 1

Every node is either red or black.

---

## Rule 2

Root is always black.

```text
      50(B)
```

---

## Rule 3

All NULL leaves are black.

```text
        50(B)
       /     \
    NULL(B) NULL(B)
```

---

## Rule 4

Red node cannot have red child.

Invalid:

```text
      30(R)
      /
   20(R)
```

Called:

```text
Red-Red Violation
```

---

## Rule 5

Every path from a node to NULL leaves must contain same number of black nodes.

This is called:

```text
Black Height
```

---

# Node Structure

```text
CLASS Node

    data

    color

    left

    right

    parent

END CLASS
```

---

# Colors

```text
RED   = 1
BLACK = 0
```

---

# Create Node

New node is always inserted as RED.

```text
FUNCTION CreateNode(key)

    node ← new Node

    node.data ← key

    node.color ← RED

    node.left ← NULL

    node.right ← NULL

    node.parent ← NULL

    RETURN node

END FUNCTION
```

---

# Rotations

Same rotations as AVL.

---

# Left Rotation

Before

```text
        x
         \
          y
```

After

```text
          y
         /
        x
```

---

## Pseudocode

```text
FUNCTION LeftRotate(root, x)

    y ← x.right

    x.right ← y.left

    IF y.left ≠ NULL

        y.left.parent ← x

    y.parent ← x.parent

    IF x.parent = NULL

        root ← y

    ELSE IF x = x.parent.left

        x.parent.left ← y

    ELSE

        x.parent.right ← y

    y.left ← x

    x.parent ← y

END FUNCTION
```

---

# Right Rotation

Before

```text
          y
         /
        x
```

After

```text
        x
         \
          y
```

---

## Pseudocode

```text
FUNCTION RightRotate(root, y)

    x ← y.left

    y.left ← x.right

    IF x.right ≠ NULL

        x.right.parent ← y

    x.parent ← y.parent

    IF y.parent = NULL

        root ← x

    ELSE IF y = y.parent.left

        y.parent.left ← x

    ELSE

        y.parent.right ← x

    x.right ← y

    y.parent ← x

END FUNCTION
```

---

# Insertion

Step 1:

Normal BST Insert.

Step 2:

Color inserted node RED.

Step 3:

Fix violations.

---

# BST Insert

```text
FUNCTION BSTInsert(root,node)

    IF root = NULL

        RETURN node

    IF node.data < root.data

        root.left ←
            BSTInsert(root.left,node)

        root.left.parent ← root

    ELSE

        root.right ←
            BSTInsert(root.right,node)

        root.right.parent ← root

    RETURN root

END FUNCTION
```

---

# Insert

```text
FUNCTION Insert(root,key)

    node ← CreateNode(key)

    root ← BSTInsert(root,node)

    FixInsert(root,node)

    RETURN root

END FUNCTION
```

---

# Fix Insert

Violations occur when:

```text
Parent = RED
Child  = RED
```

---

# Cases

Assume:

```text
P = Parent
G = Grandparent
U = Uncle
```

---

## Case 1

Uncle is RED.

Before

```text
         G(B)
        /    \
      P(R)   U(R)
      /
    X(R)
```

Fix:

```text
P → BLACK

U → BLACK

G → RED
```

Move upward.

---

## Case 2

LL

```text
         G
        /
       P
      /
     X
```

Right Rotate G.

---

## Case 3

RR

```text
      G
       \
        P
         \
          X
```

Left Rotate G.

---

## Case 4

LR

```text
        G
       /
      P
       \
        X
```

Left Rotate P.

Right Rotate G.

---

## Case 5

RL

```text
        G
         \
          P
         /
        X
```

Right Rotate P.

Left Rotate G.

---

# Fix Insert Pseudocode

```text
FUNCTION FixInsert(root,node)

    WHILE node ≠ root
          AND node.parent.color = RED

        parent ← node.parent

        grand ← parent.parent

        --------------------------------
        Parent Left Child
        --------------------------------

        IF parent = grand.left

            uncle ← grand.right

            ----------------------------
            Uncle Red
            ----------------------------

            IF uncle ≠ NULL
               AND uncle.color = RED

                parent.color ← BLACK

                uncle.color ← BLACK

                grand.color ← RED

                node ← grand

            ELSE

                ------------------------
                LR
                ------------------------

                IF node = parent.right

                    node ← parent

                    LeftRotate(root,node)

                ------------------------
                LL
                ------------------------

                parent.color ← BLACK

                grand.color ← RED

                RightRotate(root,grand)

        --------------------------------
        Parent Right Child
        --------------------------------

        ELSE

            uncle ← grand.left

            IF uncle ≠ NULL
               AND uncle.color = RED

                parent.color ← BLACK

                uncle.color ← BLACK

                grand.color ← RED

                node ← grand

            ELSE

                ------------------------
                RL
                ------------------------

                IF node = parent.left

                    node ← parent

                    RightRotate(root,node)

                ------------------------
                RR
                ------------------------

                parent.color ← BLACK

                grand.color ← RED

                LeftRotate(root,grand)

    root.color ← BLACK

END FUNCTION
```

---

# Deletion

Deletion is much harder than insertion.

---

## Step 1

Perform normal BST deletion.

---

## Step 2

If deleted node is RED:

```text
Done
```

No violation.

---

## Step 3

If deleted node is BLACK:

```text
Double Black Problem
```

must be fixed.

---

# Delete Pseudocode (High Level)

```text
FUNCTION Delete(root,key)

    node ← Search(root,key)

    BSTDelete(node)

    IF deleted color = BLACK

        FixDelete(root,replacement)

END FUNCTION
```

---

# Fix Delete Cases

Let:

```text
X = Double Black Node

S = Sibling
```

---

## Case 1

Sibling RED

```text
Rotate

Recolor
```

---

## Case 2

Sibling BLACK

Both children BLACK

```text
Push black upward
```

---

## Case 3

Sibling BLACK

Near child RED

```text
Rotate sibling
```

---

## Case 4

Sibling BLACK

Far child RED

```text
Rotate parent

Recolor
```

---

# Search

Exactly same as BST.

```text
FUNCTION Search(root,key)

    IF root = NULL

        RETURN FALSE

    IF root.data = key

        RETURN TRUE

    IF key < root.data

        RETURN Search(root.left,key)

    RETURN Search(root.right,key)

END FUNCTION
```

---

# Find Minimum

```text
FUNCTION Minimum(node)

    WHILE node.left ≠ NULL

        node ← node.left

    RETURN node

END FUNCTION
```

---

# Find Maximum

```text
FUNCTION Maximum(node)

    WHILE node.right ≠ NULL

        node ← node.right

    RETURN node

END FUNCTION
```

---

# Traversals

Exactly same as BST.

### Inorder

```text
Left Root Right
```

Produces sorted order.

---

### Preorder

```text
Root Left Right
```

---

### Postorder

```text
Left Right Root
```

---

### Level Order

```text
BFS using Queue
```

---

# Example Insertion

Insert:

```text
10
20
30
```

After BST:

```text
10(B)
   \
   20(R)
      \
      30(R)
```

Red-Red violation.

RR case.

Left rotate.

Result:

```text
       20(B)
      /    \
   10(R)  30(R)
```

Balanced.

---

# Complexity

| Operation | Complexity |
| --------- | ---------- |
| Search    | O(log n)   |
| Insert    | O(log n)   |
| Delete    | O(log n)   |
| Min       | O(log n)   |
| Max       | O(log n)   |
| Traversal | O(n)       |
| Rotation  | O(1)       |

---

# AVL vs Red-Black Tree

| Feature        | AVL            | Red-Black       |
| -------------- | -------------- | --------------- |
| Balance        | Strict         | Relaxed         |
| Search         | Faster         | Slightly slower |
| Insert         | More rotations | Fewer rotations |
| Delete         | More rotations | Fewer rotations |
| Implementation | Easier         | Harder          |
| Used in STL    | No             | Yes             |

---

# Important Interview Points

### AVL

Maintains:

```text
Balance Factor
```

and allows only:

```text
-1
0
1
```

---

### Red-Black Tree

Maintains:

```text
Color Rules
```

instead of balance factor.

---

### AVL Height

Smaller height.

Better searching.

---

### RBT Height

Slightly larger height.

Better insertion/deletion.

---

### Why industry prefers RBT?

Because real systems perform many inserts and deletes.

Red-Black Trees require fewer rotations and are therefore used in:

* TreeMap
* TreeSet
* std::map
* std::set

So, conceptually:

```text
BST
 ↓
AVL (height-balanced BST)
 ↓
Red-Black Tree (color-balanced BST)
```

AVL is usually preferred in interviews for learning rotations, while Red-Black Trees are more common in production libraries and operating systems.
