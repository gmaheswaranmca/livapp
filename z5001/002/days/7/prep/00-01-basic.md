# Linked List - Complete Notes (Phase-wise Learning)

A Linked List is a **linear data structure** where elements are stored in **nodes**. Each node contains:

1. **Data**
2. **Address (Reference/Pointer) of next node**

Unlike arrays, linked list elements are **not stored in contiguous memory locations**.

---

# Phase 1: Why Linked List?

## Problem with Arrays

| Array                      | Linked List             |
| -------------------------- | ----------------------- |
| Fixed size                 | Dynamic size            |
| Contiguous memory required | Memory can be scattered |
| Insertion costly           | Insertion efficient     |
| Deletion costly            | Deletion efficient      |
| Random access O(1)         | Sequential access O(n)  |

### Example

Array:

```
Index: 0   1   2   3
Data : 10  20  30  40
```

Linked List:

```
10 -> 20 -> 30 -> 40 -> NULL
```

---

# Phase 2: Structure of a Node

## Diagram

```
+------+------+
| Data | Next |
+------+------+
```

Example:

```
+----+------+      +----+------+      +----+------+
| 10 |  *---|----->| 20 |  *---|----->| 30 | NULL |
+----+------+      +----+------+      +----+------+
```

---

## Node Definition (Pseudocode)

```text
CLASS Node

    data
    next

END CLASS
```

---

# Phase 3: Types of Linked Lists

There are mainly 4 types.

```
Linked List
│
├── Singly Linked List
├── Doubly Linked List
├── Circular Singly Linked List
└── Circular Doubly Linked List
```

---

# 1. Singly Linked List (SLL)

Each node points only to next node.

## Structure

```
10 -> 20 -> 30 -> NULL
```

## Node

```text
CLASS Node

    data
    next

END CLASS
```

### Advantages

* Less memory
* Easy implementation

### Disadvantages

* Cannot move backward

---

# 2. Doubly Linked List (DLL)

Each node contains:

* Previous pointer
* Next pointer

## Structure

```
NULL <- 10 <-> 20 <-> 30 -> NULL
```

## Node

```text
CLASS Node

    data
    prev
    next

END CLASS
```

### Advantages

* Forward traversal
* Backward traversal

### Disadvantages

* Extra memory

---

# 3. Circular Singly Linked List (CSLL)

Last node points to first node.

## Structure

```
10 -> 20 -> 30
^           |
|___________|
```

### Last Node

```text
last.next = head
```

### No NULL exists

---

# 4. Circular Doubly Linked List (CDLL)

## Structure

```
      +----------------+
      |                |
      v                |
10 <-> 20 <-> 30 <-----+
```

### Connections

```text
head.prev = last
last.next = head
```

---

# Phase 4: Basic Terminologies

## Head

First node.

```text
head
 |
 v
10 -> 20 -> 30
```

---

## Tail

Last node.

```text
10 -> 20 -> 30
            ^
            |
          Tail
```

---

## NULL

Indicates end of list.

```text
10 -> 20 -> NULL
```

---

# Phase 5: Traversal

Visit every node once.

---

## Idea

```
Start from head

Move until NULL
```

---

## Algorithm

```text
IF head = NULL

    PRINT "Empty"

ELSE

    current ← head

    WHILE current ≠ NULL

        PRINT current.data

        current ← current.next

    END WHILE

END IF
```

---

## Pseudocode

```text
FUNCTION Display(head)

    current ← head

    WHILE current ≠ NULL

        PRINT current.data

        current ← current.next

    END WHILE

END FUNCTION
```

---

## Complexity

| Operation | Complexity |
| --------- | ---------- |
| Traversal | O(n)       |

---

# Phase 6: Insertion Operations

Three major insertion operations.

```
Insertion
│
├── Beginning
├── End
└── Middle (Position)
```

---

# Insert at Beginning

## Before

```
10 -> 20 -> 30
```

Insert 5

## After

```
5 -> 10 -> 20 -> 30
```

---

## Idea

```
new.next = head
head = new
```

---

## Pseudocode

```text
FUNCTION InsertBeginning(head, value)

    newNode ← Create Node

    newNode.data ← value

    newNode.next ← head

    head ← newNode

    RETURN head

END FUNCTION
```

---

## Complexity

```
O(1)
```

---

# Insert at End

## Before

```
10 -> 20 -> 30
```

Insert 40

## After

```
10 -> 20 -> 30 -> 40
```

---

## Idea

Reach last node.

Connect new node.

---

## Pseudocode

```text
FUNCTION InsertEnd(head, value)

    newNode ← Create Node

    newNode.data ← value

    newNode.next ← NULL

    IF head = NULL

        RETURN newNode

    END IF

    current ← head

    WHILE current.next ≠ NULL

        current ← current.next

    END WHILE

    current.next ← newNode

    RETURN head

END FUNCTION
```

---

## Complexity

```
O(n)
```

With Tail Pointer:

```
O(1)
```

---

# Insert at Position

## Example

Position = 3

Before

```
10 -> 20 -> 40 -> 50
```

Insert 30

After

```
10 -> 20 -> 30 -> 40 -> 50
```

---

## Idea

Reach node before desired position.

Adjust links.

---

## Pseudocode

```text
FUNCTION InsertPosition(head, pos, value)

    IF pos = 1

        RETURN InsertBeginning(head, value)

    END IF

    current ← head

    FOR i ← 1 TO pos-2

        current ← current.next

    END FOR

    newNode ← Create Node

    newNode.data ← value

    newNode.next ← current.next

    current.next ← newNode

    RETURN head

END FUNCTION
```

---

# Phase 7: Deletion Operations

```
Deletion
│
├── Beginning
├── End
└── Position
```

---

# Delete Beginning

Before

```
10 -> 20 -> 30
```

After

```
20 -> 30
```

---

## Idea

Move head.

---

## Pseudocode

```text
FUNCTION DeleteBeginning(head)

    IF head = NULL

        RETURN NULL

    END IF

    temp ← head

    head ← head.next

    DELETE temp

    RETURN head

END FUNCTION
```

---

## Complexity

```
O(1)
```

---

# Delete End

Before

```
10 -> 20 -> 30
```

After

```
10 -> 20
```

---

## Pseudocode

```text
FUNCTION DeleteEnd(head)

    IF head = NULL

        RETURN NULL

    END IF

    IF head.next = NULL

        DELETE head

        RETURN NULL

    END IF

    current ← head

    WHILE current.next.next ≠ NULL

        current ← current.next

    END WHILE

    DELETE current.next

    current.next ← NULL

    RETURN head

END FUNCTION
```

---

## Complexity

```
O(n)
```

---

# Delete at Position

## Pseudocode

```text
FUNCTION DeletePosition(head, pos)

    IF pos = 1

        RETURN DeleteBeginning(head)

    END IF

    current ← head

    FOR i ← 1 TO pos-2

        current ← current.next

    END FOR

    temp ← current.next

    current.next ← temp.next

    DELETE temp

    RETURN head

END FUNCTION
```

---

# Phase 8: Searching

---

## Idea

Compare every node.

---

## Pseudocode

```text
FUNCTION Search(head, key)

    current ← head

    WHILE current ≠ NULL

        IF current.data = key

            RETURN TRUE

        END IF

        current ← current.next

    END WHILE

    RETURN FALSE

END FUNCTION
```

---

## Complexity

```
O(n)
```

---

# Phase 9: Reversing a Linked List

Most Important Interview Question

---

## Before

```
10 -> 20 -> 30 -> 40 -> NULL
```

## After

```
40 -> 30 -> 20 -> 10 -> NULL
```

---

## Three Pointer Technique

```text
prev
curr
next
```

---

### Visualization

```
prev   curr   next
NULL    10     20
```

Step:

```
10 -> NULL
```

Move forward.

---

## Pseudocode

```text
FUNCTION Reverse(head)

    prev ← NULL

    current ← head

    WHILE current ≠ NULL

        next ← current.next

        current.next ← prev

        prev ← current

        current ← next

    END WHILE

    head ← prev

    RETURN head

END FUNCTION
```

---

## Complexity

| Time | Space |
| ---- | ----- |
| O(n) | O(1)  |

---

# Phase 10: Common Interview Questions

### Easy

* Traversal
* Count Nodes
* Search Element
* Insert Beginning
* Insert End
* Delete Beginning
* Delete End

### Medium

* Reverse Linked List
* Find Middle Node
* Nth Node From End
* Detect Loop
* Remove Loop
* Merge Two Sorted Lists

### Hard

* LRU Cache
* Flatten Linked List
* Clone Linked List
* Reverse K Nodes
* Intersection of Lists

---

# Points to Remember

### 1. Head is Important

Never lose head reference.

```text
current = head
```

not

```text
head = head.next
```

unless intentionally changing head.

---

### 2. Always Handle Empty List

```text
IF head = NULL
```

---

### 3. Single Node Case

```text
head.next = NULL
```

requires separate handling in many operations.

---

### 4. Insertion Formula

```text
new.next = current.next
current.next = new
```

---

### 5. Deletion Formula

```text
temp = current.next
current.next = temp.next
DELETE temp
```

---

### 6. Reverse Formula

```text
next = current.next
current.next = prev
prev = current
current = next
```

Memorizing these four lines is enough to reverse any linked list.

---

# Complexity Summary

| Operation        | Singly LL |
| ---------------- | --------- |
| Access kth node  | O(n)      |
| Search           | O(n)      |
| Insert Beginning | O(1)      |
| Insert End       | O(n)      |
| Delete Beginning | O(1)      |
| Delete End       | O(n)      |
| Reverse          | O(n)      |
| Traverse         | O(n)      |

After mastering these phases, the next natural topics are:

1. Fast & Slow Pointer Technique
2. Cycle Detection (Floyd's Algorithm)
3. Merge Two Sorted Linked Lists
4. Middle Node Problems
5. Linked List Interview Patterns (Top 25 problems).
