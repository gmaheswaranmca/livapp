# Linked List Cycle Detection (Floyd's Cycle Detection Algorithm)

**Problem:**
Given the head of a singly linked list, determine whether the linked list contains a cycle.

A cycle exists if some node can be reached again by continuously following the `next` pointers.

---

# Idea

Use **two pointers**:

* **Slow Pointer** → moves one step at a time.
* **Fast Pointer** → moves two steps at a time.

### Observation

#### No Cycle

If there is no cycle:

```
1 → 2 → 3 → 4 → 5 → NULL
```

Fast pointer reaches `NULL`.

#### Cycle Exists

```
1 → 2 → 3 → 4 → 5
          ↑     ↓
          ← ← ←
```

Fast pointer moves faster than slow pointer.

Eventually, both pointers meet inside the cycle.

---

# Why Does It Work?

Suppose:

* Slow moves 1 node per iteration.
* Fast moves 2 nodes per iteration.

Once both enter the cycle:

* Fast gains 1 node over slow every iteration.
* Therefore, the distance between them decreases.
* Eventually they land on the same node.

Hence:

```
slow == fast
```

means a cycle exists.

---

# Algorithm

1. Initialize:

   * `slow = head`
   * `fast = head`

2. While:

   * `fast != NULL`
   * `fast.next != NULL`

   Do:

   * Move slow by 1 step.
   * Move fast by 2 steps.

3. If `slow == fast`

   * Cycle found.
   * Return `true`.

4. If loop ends

   * No cycle.
   * Return `false`.

---

# Pseudocode

```text
FUNCTION HasCycle(head)

    slow ← head
    fast ← head

    WHILE fast ≠ NULL AND fast.next ≠ NULL

        slow ← slow.next
        fast ← fast.next.next

        IF slow = fast
            RETURN TRUE

    END WHILE

    RETURN FALSE

END FUNCTION
```

---

# Dry Run

## Example 1

```text
1 → 2 → 3 → 4 → 5
      ↑       ↓
      ← ← ← ←
```

### Iteration 1

```text
slow = 2
fast = 3
```

### Iteration 2

```text
slow = 3
fast = 5
```

### Iteration 3

```text
slow = 4
fast = 3
```

### Iteration 4

```text
slow = 5
fast = 5
```

Both meet.

Return:

```text
TRUE
```

---

## Example 2

```text
1 → 2 → 3 → 4 → NULL
```

### Iteration 1

```text
slow = 2
fast = 3
```

### Iteration 2

```text
slow = 3
fast = NULL
```

Loop ends.

Return:

```text
FALSE
```

---

# C++ Code

```cpp
class ListNode {
public:
    int val;
    ListNode* next;

    ListNode(int x) {
        val = x;
        next = nullptr;
    }
};

bool hasCycle(ListNode* head) {

    ListNode* slow = head;
    ListNode* fast = head;

    while (fast != nullptr && fast->next != nullptr) {

        slow = slow->next;
        fast = fast->next->next;

        if (slow == fast)
            return true;
    }

    return false;
}
```

---

# Java Code

```java
class ListNode {
    int val;
    ListNode next;

    ListNode(int val) {
        this.val = val;
        this.next = null;
    }
}

public class Main {

    public static boolean hasCycle(ListNode head) {

        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {

            slow = slow.next;
            fast = fast.next.next;

            if (slow == fast)
                return true;
        }

        return false;
    }
}
```

---

# Python Code

```python
class ListNode:
    def __init__(self, val):
        self.val = val
        self.next = None


def has_cycle(head):

    slow = head
    fast = head

    while fast is not None and fast.next is not None:

        slow = slow.next
        fast = fast.next.next

        if slow == fast:
            return True

    return False
```

---

# Complexity Analysis

| Operation | Complexity |
| --------- | ---------- |
| Time      | O(n)       |
| Space     | O(1)       |

### Explanation

* Each pointer traverses at most `n` nodes.
* No extra data structures are used.
* Therefore:

```text
Time  = O(n)
Space = O(1)
```

---

# Interview Points

### Method 1: HashSet

Store visited nodes.

```text
If node already exists in set
    Cycle found
```

* Time: `O(n)`
* Space: `O(n)`

### Method 2: Floyd's Cycle Detection (Preferred)

* Time: `O(n)`
* Space: `O(1)`
* Most commonly asked by Amazon, Google, Meta, Microsoft, Bloomberg.

**Key Interview Line:**

> If fast and slow pointers ever meet, a cycle exists; if fast reaches NULL, no cycle exists. This is Floyd's Tortoise and Hare Algorithm.
