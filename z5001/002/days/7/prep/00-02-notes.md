# Linked List
    - linear data structure
    - elements are stored in nodes, so node contains
      - data
      - next node pointer
    - not stored in contiguous memory locations
    - why? dynamic size, insertion/deletion efficient, sequential access O(n)

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

## Node Definition (Pseudocode)
```text
CLASS Node
    data
    next
END CLASS
```

# Types of Linked Lists
There are mainly 4 types.
```
Linked List
│
├── Singly Linked List [node{data,next}], last.next = NULL
├── Doubly Linked List [node{prev, data,next}]
├── Circular Singly Linked List, last.next = first(head)
└── Circular Doubly Linked List, first.prev = last (tail), last.next = first
```

# Singly Linked List (SLL)
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

# 2. Doubly Linked List (DLL)
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

# Operations
# Traversal O(n)
```
routine traversal(head)
    node = head
    while node != null  
        if node != head 
            print(" ")    
        print(node.data)
        node = node.next
```

# Insert at Beginning O(1)
```
routine insert(head, x)
    new_node = new Node(x)
    new_node.next = head
    head = new_node
    return head
```

# Insert at End O(n)
```  
routine insert(head, val)
    new_node = new Node(val)

    if head == NULL
        head = new_node
        return head

    # find tail
    node = head
    while node.next != NULL
        node = node.next
    
    node.next = new_node
    
    return head
```

Do Dry Run for below data: 
```
val=60

x
h

10->x   
h

10-> 20-> 30-> 40-> 50-> x
h
```

# Insert at Pos O(n)
```
routine insert(head, val, pos)   # 0-based index
    new_node = new Node(val)

    # Insert at beginning
    if pos == 0
        new_node.next = head
        head = new_node
        return head

    # Move to node at position pos-1
    node = head
    i = 0
    while node != NULL and i < pos - 1
        node = node.next
        i = i + 1

    # Invalid position
    if node == NULL
        return head

    new_node.next = node.next
    node.next = new_node

    return head
```
Do Dry Run for below data: 
```
val=60

x
h

10->x   
h

10-> 20-> 30-> 40-> 50-> x
h
```

# Delete Beginning O(1)
```
routine remove(head)
    if head == NULL
        return NULL
    node = head
    head = head.next

    node.next = NULL #
    DELETE node #
    
    return head

# call
head = remove(head)
```
Do Dry Run for below data: 
```
x
h

10->x   
h

10-> 20-> 30-> 40-> 50-> x
h
```

# Delete End O(N)
```
routine remove(head)
    if head == NULL
        return NULL
    if head.next == NULL
        DELETE head
        return NULL
    
    node = head
    while node.next.next != NULL
        node = node.next

    tail = node.next # node idx = -2 

    node.next = NULL
    DELETE tail 

    return head
```
Do Dry Run for below data: 
```
x
h

10->x   
h

10-> 20-> 30-> 40-> 50-> x
h
```

# Delete at Position O(N)
```
routine remove(head, pos)

    if head == NULL
        return NULL

    # Delete first node
    if pos == 0
        temp = head
        head = head.next
        DELETE temp
        return head

    node = head
    i = 0

    # Reach node at position pos-1
    while node != NULL and i < pos - 1
        node = node.next
        i = i + 1

    # Invalid position
    if node == NULL or node.next == NULL
        return head

    temp = node.next

    node.next = temp.next
    DELETE temp

    return head
```

Do Dry Run for below data: 
```
x
h

10->x   
h

10-> 20-> 30-> 40-> 50-> x
h
```

# Search O(n)
```
routine search(head, key)
    node = head
    I = 0
    while node != null  
        if node.data == key
            return I
        node = node.next
        I += 1
    return -1
```

# Reversing a Linked List O(N)
idea:  For every node, reverse its link so that it points to the previous node instead of the next node. 
```
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
```
10-> 20-> 30-> 40-> 50-> x
h
```

```
| Iteration | prev | current | next | head|
| --------- | ---- | ------- | ---- |---- |
  
```

# Common Interview Questions
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
```
1 → 2 → 3 → 4 → 5


1 → 2 → 3 → 4 → 5 -> 3
```

```
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
* Remove Loop
* Merge Two Sorted Lists

### Hard

* LRU Cache
* Flatten Linked List
* Clone Linked List
* Reverse K Nodes
* Intersection of Lists

# Split Circular Linked List into Two Halves
```
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

```
1→ 2→ 3-> 4→ 5→ (back to 1)

1 → 2 → 3 -> (back to 1)           4 → 5 → (back to 4)
h

h s f h1 h2
1 1 1 1  4
1 2 3
1 3 5
```