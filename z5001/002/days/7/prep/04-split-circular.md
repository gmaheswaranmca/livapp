# Split Circular Linked List into Two Halves

## Problem

Given a **circular linked list**, split it into **two circular linked lists**.

If the number of nodes is:

* **Even** → both halves contain equal nodes.
* **Odd** → first half contains one extra node.

Example:

### Input

```
1 → 2 → 3 → 4 → 5 → (back to 1)
```

### Output

```
First Half:
1 → 2 → 3 → (back to 1)

Second Half:
4 → 5 → (back to 4)
```

---

# Idea

Use the **Slow-Fast Pointer Technique**.

Similar to finding the middle of a linked list.

* Slow moves 1 step.
* Fast moves 2 steps.

When fast reaches the end of the circular list:

* Slow will be at the middle.
* Split the circle into two circles.

---

# Algorithm

### Step 1

Initialize

```
slow = head
fast = head
```

---

### Step 2

Move pointers

Continue while:

```
fast.next != head
AND
fast.next.next != head
```

Inside loop:

```
slow = slow.next
fast = fast.next.next
```

---

### Step 3

Handle even number of nodes

If

```
fast.next.next == head
```

move fast one more step

```
fast = fast.next
```

Now fast becomes last node.

---

### Step 4

Create second half head

```
head1 = head
head2 = slow.next
```

---

### Step 5

Make first circular list

```
slow.next = head1
```

---

### Step 6

Make second circular list

```
fast.next = head2
```

---

### Step 7

Return both heads

---

# Dry Run

## Circular List

```
1 → 2 → 3 → 4 → 5 → 6
↑                 ↓
└─────────────────┘
```

---

### Initial

| Slow | Fast |
| ---- | ---- |
| 1    | 1    |

---

### Iteration 1

```
slow = 2
fast = 3
```

| Slow | Fast |
| ---- | ---- |
| 2    | 3    |

---

### Iteration 2

```
slow = 3
fast = 5
```

| Slow | Fast |
| ---- | ---- |
| 3    | 5    |

Loop stops because

```
fast.next.next == head
```

(5→6→1)

---

### Move Fast

```
fast = 6
```

---

### Split

```
head1 = 1
head2 = 4
```

Current:

```
1 → 2 → 3 → 4 → 5 → 6
```

---

### First Half

```
slow.next = head1
```

```
1 → 2 → 3
↑       ↓
└───────┘
```

---

### Second Half

```
fast.next = head2
```

```
4 → 5 → 6
↑       ↓
└───────┘
```

---

# Pseudocode

```text
FUNCTION splitCircular(head)

    IF head == NULL
        RETURN NULL, NULL

    slow = head
    fast = head

    WHILE fast.next != head
          AND fast.next.next != head

        slow = slow.next
        fast = fast.next.next

    END WHILE

    IF fast.next.next == head
        fast = fast.next

    head1 = head
    head2 = slow.next

    slow.next = head1

    fast.next = head2

    RETURN head1, head2

END FUNCTION
```

---

# Python

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


def splitCircular(head):
    if head is None:
        return None, None

    slow = head
    fast = head

    while (fast.next != head and
           fast.next.next != head):
        slow = slow.next
        fast = fast.next.next

    if fast.next.next == head:
        fast = fast.next

    head1 = head
    head2 = slow.next

    slow.next = head1
    fast.next = head2

    return head1, head2
```

---

# C++

```cpp
struct Node
{
    int data;
    Node* next;

    Node(int d)
    {
        data = d;
        next = nullptr;
    }
};

pair<Node*, Node*> splitCircular(Node* head)
{
    if(head == nullptr)
        return {nullptr, nullptr};

    Node* slow = head;
    Node* fast = head;

    while(fast->next != head &&
          fast->next->next != head)
    {
        slow = slow->next;
        fast = fast->next->next;
    }

    if(fast->next->next == head)
        fast = fast->next;

    Node* head1 = head;
    Node* head2 = slow->next;

    slow->next = head1;
    fast->next = head2;

    return {head1, head2};
}
```

---

# Java

```java
class Node
{
    int data;
    Node next;

    Node(int data)
    {
        this.data = data;
        this.next = null;
    }
}

class Solution
{
    static Node[] splitCircular(Node head)
    {
        if(head == null)
            return new Node[]{null, null};

        Node slow = head;
        Node fast = head;

        while(fast.next != head &&
              fast.next.next != head)
        {
            slow = slow.next;
            fast = fast.next.next;
        }

        if(fast.next.next == head)
            fast = fast.next;

        Node head1 = head;
        Node head2 = slow.next;

        slow.next = head1;
        fast.next = head2;

        return new Node[]{head1, head2};
    }
}
```

---

# Complexity

| Operation   | Complexity |
| ----------- | ---------- |
| Traversal   | O(n)       |
| Extra Space | O(1)       |

### Final Result

* **Time:** `O(n)`
* **Space:** `O(1)`
* Uses **Fast & Slow Pointer** technique.
* Works for both **odd** and **even** sized circular linked lists.
