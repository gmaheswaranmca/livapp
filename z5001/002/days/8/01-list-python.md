# Create a Linked List (Singly Linked List)
```python
#===== Declare Imports here if required =====


#===== Declare Global Variables / Functions here if required =====


class Node:
    def __init__(self, val):
        self.data = val
        self.next = None

def solve():
    N = int(input())
    arr = list(map(int, input().split()))

    #===== Declare Local Variables / Functions here if required =====


    head = None
    tail = None

    for x in arr:

        #===== Write Your Logic Here =====
        new_node = Node(x)
        if head == None:
            head = new_node
            tail = new_node
        else:
            tail.next = new_node 
            tail = new_node 
    e = head 
    while e != None:
        if e != head:
            print(" ", end='')
        print(f'{e.data}', end='') 
        e = e.next 

        pass
if __name__ == "__main__":
    solve()
```
# Insert at End (Singly Linked List)
```python
#===== Declare Imports here if required =====


#===== Declare Global Variables / Functions here if required =====


class Node:
    def __init__(self, val):
        self.data = val
        self.next = None

def print_list(head):
    temp = head
    result = []
    while temp:
        result.append(str(temp.data))
        temp = temp.next
    print(" ".join(result))

def solve():
    N = int(input())    
    arr = list(map(int, input().split())) if N > 0 else []    
    X = int(input())

    #===== Declare Local Variables / Functions here if required =====


    head = None
    tail = None

    for x in arr:
        new_node = Node(x)
        if head is None:
            head = new_node
            tail = new_node
        else:
            tail.next = new_node
            tail = new_node

    #===== Write Your Logic Here =====
    new_node = Node(X)
    if head is None:
        head = new_node
        tail = new_node
    else:
        tail.next = new_node
        tail = new_node
    print_list(head)
    pass
if __name__ == "__main__":
    solve()
```
# Insert at Given Position (Singly Linked List)
```python
#===== Declare Imports here if required =====


#===== Declare Global Variables / Functions here if required =====


class Node:
    def __init__(self, val):
        self.data = val
        self.next = None

def print_list(head):
    temp = head
    result = []
    while temp:
        result.append(str(temp.data))
        temp = temp.next
    print(" ".join(result))

def solve():

    N = int(input())
    arr = list(map(int, input().split())) if N > 0 else []
    X = int(input())
    position = int(input())

    #===== Declare Local Variables / Functions here if required =====


    head = None
    tail = None

    for x in arr:
        new_node = Node(x)
        if head is None:
            head = new_node
            tail = new_node
        else:
            tail.next = new_node
            tail = new_node

    #===== Write Your Logic Here =====
    if position == 1:
        new_node = Node(X)
        new_node.next = head 
        head = new_node
        tail = new_node 
    else:
        e = head 
        I = 1
        while e != None and I < position-1:            
            e = e.next 
            I += 1
        if e != None:
            new_node = Node(X)
            new_node.next = e.next 
            e.next = new_node

    print_list(head)

    pass
if __name__ == "__main__":
    solve()
```
# Delete First Node (Singly Linked List)
```python
#===== Declare Imports here if required =====


#===== Declare Global Variables / Functions here if required =====


import sys

class Node:
    def __init__(self, val):
        self.data = val
        self.next = None

def main():
    N = int(sys.stdin.readline())
    data = list(map(int, sys.stdin.readline().split()))

    #===== Declare Local Variables / Functions here if required =====


    head = None
    tail = None

    for i in range(N):
        val = data[i]
        new_node = Node(val)

        if head is None:
            head = new_node
            tail = new_node
        else:
            tail.next = new_node
            tail = new_node

    #===== Write Your Logic Here =====
    if head != None:
        node = head
        head = head.next
    
    e = head
    while e != None:
        if e != head:
            print(' ', end='')
        print(f'{e.data}', end='') 
        e = e.next 

    pass
if __name__ == "__main__":
    main()
```
# Search an Element (Singly Linked List)
```cpp
#===== Declare Imports here if required =====


#===== Declare Global Variables / Functions here if required =====


import sys

class Node:
    def __init__(self, val):
        self.data = val
        self.next = None

def solve(head, X):

    #===== Declare Local Variables / Functions here if required =====


    #===== Write Your Logic Here =====


    pass
def main():
    N = int(sys.stdin.readline())
    arr = list(map(int, sys.stdin.readline().split()))
    X = int(sys.stdin.readline())

    #===== Declare Local Variables / Functions here if required =====


    head = None
    tail = None

    for val in arr:
        new_node = Node(val)
        if not head:
            head = new_node
            tail = new_node
        else:
            tail.next = new_node
            tail = new_node

    #===== Write Your Logic Here =====
    e = head 
    found = False 
    while e != None:
        if e.data == X: 
            found = True 
            break  
        e = e.next 
    
    print(found)
    pass
if __name__ == "__main__":
    main()
```
# Create a Doubly Linked List (Doubly Linked List)
```python
#===== Declare Imports here if required =====


#===== Declare Global Variables / Functions here if required =====


import sys

class Node:
    def __init__(self, val):
        self.data = val
        self.prev = None
        self.next = None

def solve(N, values):

    #===== Declare Local Variables / Functions here if required =====


    head = None
    tail = None

    for val in values:

        #===== Write Your Logic Here =====
        new_node = Node(val)
        if head == None:
            head = new_node 
            tail = new_node 
        else:
            tail.next = new_node 
            new_node.prev = tail 
            tail = new_node 
    e = head 
    while e != None:
        if e != head:
            print(' ', end='')
        print(f'{e.data}', end='')
        e = e.next 
        pass
def main():
    N = int(sys.stdin.readline())
    values = list(map(int, sys.stdin.readline().split()))
    solve(N, values)

if __name__ == "__main__":
    main()
```
# Reverse a Linked List
```python
#===== Declare Imports here if required =====


#===== Declare Global Variables / Functions here if required =====


import sys

class Node:
    def __init__(self, val):
        self.data = val
        self.prev = None
        self.next = None

def solve(N, values):

    #===== Declare Local Variables / Functions here if required =====


    head = None
    tail = None

    for val in values:

        #===== Write Your Logic Here =====
        new_node = Node(val)
        if head == None:
            head = new_node 
            tail = new_node 
        else:
            tail.next = new_node 
            new_node.prev = tail 
            tail = new_node 

    prev = None 
    curr = head 
    while curr != None: 
        next = curr.next 
        curr.next = prev 
        prev = curr 
        curr = next 
    head = prev 
    
    e = head 
    while e != None:
        if e != head:
            print(' ', end='')
        print(f'{e.data}', end='')
        e = e.next 
        pass
def main():
    N = int(sys.stdin.readline())
    values = list(map(int, sys.stdin.readline().split()))
    solve(N, values)

if __name__ == "__main__":
    main()
```
# Split Circular Linked List into Two Halves
```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

def split_list(head):
    # Write your logic here
    slow = head 
    fast = head 
    while fast.next != head and fast.next.next != head: 
        fast = fast.next.next 
        slow = slow.next 
    if fast.next.next == head:
        fast = fast.next 
    head1 = head 
    head2 = slow.next
    slow.next = head1
    fast.next = head2 
    return head1, head2

def print_circular(head):
    if not head:
        return
    temp = head
    result = []
    while True:
        result.append(str(temp.data))
        temp = temp.next
        if temp == head:
            break
    print(" ".join(result))

n = int(input())
arr = list(map(int, input().split()))

head = None
if n > 0:
    head = Node(arr[0])
    temp = head
    for i in range(1, n):
        temp.next = Node(arr[i])
        temp = temp.next
    temp.next = head

head1, head2 = split_list(head)
print_circular(head1)
print_circular(head2)
```

# Detect Cycle in Linked List
```python
#===== Declare Imports here if required =====


#===== Declare Global Variables / Functions here if required =====


class Node:
    def __init__(self, val):
        self.data = val
        self.next = None


def solve():
    N = int(input())    
    arr = list(map(int, input().split())) if N > 0 else []    
    pos = int(input())

    #===== Declare Local Variables / Functions here if required =====


    head = None
    tail = None

    for x in arr:
        new_node = Node(x)
        if head is None:
            head = new_node
            tail = new_node
        else:
            tail.next = new_node
            tail = new_node

    #===== Write Your Logic Here =====
    if pos == -1:
        found = False
    else:
        slow = head 
        fast = head 
        found = False 
        while fast != None and fast.next != None:
            slow = slow.next 
            fast = fast.next.next 
            if slow == fast:
                found = True
                break 
    print(str(found).lower())
    pass
if __name__ == "__main__":
    solve()
```