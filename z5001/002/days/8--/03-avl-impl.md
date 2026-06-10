# AVL Tree Implementation (Complete Pseudocode)

---

# Node Structure

```text
CLASS Node

    data
    left
    right
    height

END CLASS
```

---

# Create Node

```text
FUNCTION CreateNode(value)

    node ← new Node

    node.data ← value

    node.left ← NULL

    node.right ← NULL

    node.height ← 1

    RETURN node

END FUNCTION
```

---

# Height Function

```text
FUNCTION Height(node)

    IF node = NULL
        RETURN 0

    RETURN node.height

END FUNCTION
```

---

# Maximum Function

```text
FUNCTION Max(a, b)

    IF a > b
        RETURN a

    RETURN b

END FUNCTION
```

---

# Balance Factor

```text
FUNCTION GetBalance(node)

    IF node = NULL
        RETURN 0

    RETURN Height(node.left) - Height(node.right)

END FUNCTION
```

---

# Right Rotation (LL Case)

Before

```text
        y
       /
      x
     /
    T1
```

After

```text
        x
       / \
      T1  y
```

```text
FUNCTION RightRotate(y)

    x ← y.left

    T2 ← x.right

    x.right ← y

    y.left ← T2

    y.height ←
        1 + Max(
                Height(y.left),
                Height(y.right)
              )

    x.height ←
        1 + Max(
                Height(x.left),
                Height(x.right)
              )

    RETURN x

END FUNCTION
```

---

# Left Rotation (RR Case)

Before

```text
    x
      \
       y
```

After

```text
       y
      / \
     x
```

```text
FUNCTION LeftRotate(x)

    y ← x.right

    T2 ← y.left

    y.left ← x

    x.right ← T2

    x.height ←
        1 + Max(
                Height(x.left),
                Height(x.right)
              )

    y.height ←
        1 + Max(
                Height(y.left),
                Height(y.right)
              )

    RETURN y

END FUNCTION
```

---

# Insert Operation

```text
FUNCTION Insert(node, key)

    ------------------------------------------------
    # STEP 1 : Normal BST Insert
    ------------------------------------------------

    IF node = NULL
        RETURN CreateNode(key)

    IF key < node.data

        node.left ←
            Insert(node.left, key)

    ELSE IF key > node.data

        node.right ←
            Insert(node.right, key)

    ELSE

        RETURN node

    ------------------------------------------------
    # STEP 2 : Update Height
    ------------------------------------------------

    node.height ←
        1 + Max(
                Height(node.left),
                Height(node.right)
              )

    ------------------------------------------------
    # STEP 3 : Compute Balance
    ------------------------------------------------

    balance ← GetBalance(node)

    ------------------------------------------------
    # STEP 4 : LL Case
    ------------------------------------------------

    IF balance > 1
       AND key < node.left.data

        RETURN RightRotate(node)

    ------------------------------------------------
    # STEP 5 : RR Case
    ------------------------------------------------

    IF balance < -1
       AND key > node.right.data

        RETURN LeftRotate(node)

    ------------------------------------------------
    # STEP 6 : LR Case
    ------------------------------------------------

    IF balance > 1
       AND key > node.left.data

        node.left ←
            LeftRotate(node.left)

        RETURN RightRotate(node)

    ------------------------------------------------
    # STEP 7 : RL Case
    ------------------------------------------------

    IF balance < -1
       AND key < node.right.data

        node.right ←
            RightRotate(node.right)

        RETURN LeftRotate(node)

    RETURN node

END FUNCTION
```

---

# Find Minimum Node

Used during deletion.

```text
FUNCTION FindMin(node)

    current ← node

    WHILE current.left ≠ NULL

        current ← current.left

    RETURN current

END FUNCTION
```

---

# Delete Operation

```text
FUNCTION Delete(node, key)

    ------------------------------------------------
    # STEP 1 : BST Delete
    ------------------------------------------------

    IF node = NULL

        RETURN NULL

    IF key < node.data

        node.left ←
            Delete(node.left, key)

    ELSE IF key > node.data

        node.right ←
            Delete(node.right, key)

    ELSE

        --------------------------------------------
        # No Child
        --------------------------------------------

        IF node.left = NULL
           AND node.right = NULL

            DELETE node

            RETURN NULL

        --------------------------------------------
        # One Child (Right)
        --------------------------------------------

        ELSE IF node.left = NULL

            temp ← node.right

            DELETE node

            RETURN temp

        --------------------------------------------
        # One Child (Left)
        --------------------------------------------

        ELSE IF node.right = NULL

            temp ← node.left

            DELETE node

            RETURN temp

        --------------------------------------------
        # Two Children
        --------------------------------------------

        temp ← FindMin(node.right)

        node.data ← temp.data

        node.right ←
            Delete(node.right,
                   temp.data)

    ------------------------------------------------
    # STEP 2 : Update Height
    ------------------------------------------------

    node.height ←
        1 + Max(
                Height(node.left),
                Height(node.right)
              )

    ------------------------------------------------
    # STEP 3 : Balance
    ------------------------------------------------

    balance ← GetBalance(node)

    ------------------------------------------------
    # LL
    ------------------------------------------------

    IF balance > 1
       AND GetBalance(node.left) ≥ 0

        RETURN RightRotate(node)

    ------------------------------------------------
    # LR
    ------------------------------------------------

    IF balance > 1
       AND GetBalance(node.left) < 0

        node.left ←
            LeftRotate(node.left)

        RETURN RightRotate(node)

    ------------------------------------------------
    # RR
    ------------------------------------------------

    IF balance < -1
       AND GetBalance(node.right) ≤ 0

        RETURN LeftRotate(node)

    ------------------------------------------------
    # RL
    ------------------------------------------------

    IF balance < -1
       AND GetBalance(node.right) > 0

        node.right ←
            RightRotate(node.right)

        RETURN LeftRotate(node)

    RETURN node

END FUNCTION
```

---

# Search Operation

```text
FUNCTION Search(node, key)

    IF node = NULL

        RETURN FALSE

    IF node.data = key

        RETURN TRUE

    IF key < node.data

        RETURN Search(
                node.left,
                key
               )

    RETURN Search(
            node.right,
            key
           )

END FUNCTION
```

---

# Find Minimum

```text
FUNCTION Minimum(node)

    WHILE node.left ≠ NULL

        node ← node.left

    RETURN node.data

END FUNCTION
```

---

# Find Maximum

```text
FUNCTION Maximum(node)

    WHILE node.right ≠ NULL

        node ← node.right

    RETURN node.data

END FUNCTION
```

---

# Inorder Traversal

```text
FUNCTION Inorder(node)

    IF node = NULL

        RETURN

    Inorder(node.left)

    PRINT node.data

    Inorder(node.right)

END FUNCTION
```

Output:

```text
Sorted Order
```

---

# Preorder Traversal

```text
FUNCTION Preorder(node)

    IF node = NULL

        RETURN

    PRINT node.data

    Preorder(node.left)

    Preorder(node.right)

END FUNCTION
```

---

# Postorder Traversal

```text
FUNCTION Postorder(node)

    IF node = NULL

        RETURN

    Postorder(node.left)

    Postorder(node.right)

    PRINT node.data

END FUNCTION
```

---

# Level Order Traversal

```text
FUNCTION LevelOrder(root)

    IF root = NULL

        RETURN

    CREATE Queue q

    ENQUEUE(q, root)

    WHILE q NOT EMPTY

        current ← DEQUEUE(q)

        PRINT current.data

        IF current.left ≠ NULL

            ENQUEUE(q,
                    current.left)

        IF current.right ≠ NULL

            ENQUEUE(q,
                    current.right)

END FUNCTION
```

---

# Complexity Table

| Operation  | Complexity |
| ---------- | ---------- |
| Search     | O(log n)   |
| Insert     | O(log n)   |
| Delete     | O(log n)   |
| Find Min   | O(log n)   |
| Find Max   | O(log n)   |
| Traversals | O(n)       |
| Rotation   | O(1)       |

---

# Complete AVL Operation Flow

```text
Insert
   ↓
BST Insert
   ↓
Update Height
   ↓
Compute Balance Factor
   ↓
LL / RR / LR / RL
   ↓
Rotation
   ↓
Balanced AVL


Delete
   ↓
BST Delete
   ↓
Update Height
   ↓
Compute Balance Factor
   ↓
LL / RR / LR / RL
   ↓
Rotation
   ↓
Balanced AVL
```

This pseudocode is essentially the full AVL implementation used in C++, Java, Python, and most interview/platform solutions.
