# 1. Implement Queue using Stacks

## Idea

A Queue follows **FIFO** (First In First Out).

Stacks follow **LIFO** (Last In First Out).

Use **two stacks**:

* `inputStack` → for enqueue
* `outputStack` → for dequeue

Whenever dequeue/front is requested:

* If `outputStack` is empty:

  * Move all elements from `inputStack` to `outputStack`
* Then perform operation on `outputStack`

---

## Algorithm

### Push(x)

```text
Push x into inputStack
```

### Pop()

```text
If outputStack is empty
    Move all elements from inputStack to outputStack

Pop outputStack
```

### Peek()

```text
If outputStack is empty
    Move all elements from inputStack to outputStack

Return top(outputStack)
```

### Empty()

```text
Return inputStack empty AND outputStack empty
```

---

## Pseudocode

```text
CLASS MyQueue
    inputStack
    outputStack

    FUNCTION push(x)
        PUSH x into inputStack

    FUNCTION pop()

        IF outputStack empty
            WHILE inputStack not empty
                PUSH POP(inputStack) into outputStack

        RETURN POP(outputStack)

    FUNCTION peek()
        IF outputStack empty
            WHILE inputStack not empty
                PUSH POP(inputStack) into outputStack

        RETURN TOP(outputStack)

    FUNCTION empty()
        RETURN inputStack empty AND outputStack empty
```

---

## Complexity

| Operation | Time           |
| --------- | -------------- |
| Push      | O(1)           |
| Pop       | Amortized O(1) |
| Peek      | Amortized O(1) |
| Empty     | O(1)           |

Space: **O(n)**

---

## Python

```python
class MyQueue:

    def __init__(self):
        self.inStack = []
        self.outStack = []

    def push(self, x):
        self.inStack.append(x)

    def pop(self):
        self.peek()
        return self.outStack.pop()

    def peek(self):
        if not self.outStack:
            while self.inStack:
                self.outStack.append(self.inStack.pop())

        return self.outStack[-1]

    def empty(self):
        return not self.inStack and not self.outStack
```

---

## C++

```cpp
#include <stack>
using namespace std;

class MyQueue {

    stack<int> inStack;
    stack<int> outStack;

public:

    void push(int x) {
        inStack.push(x);
    }

    int pop() {

        peek();

        int val = outStack.top();
        outStack.pop();

        return val;
    }

    int peek() {

        if(outStack.empty()) {

            while(!inStack.empty()) {

                outStack.push(inStack.top());
                inStack.pop();
            }
        }

        return outStack.top();
    }

    bool empty() {
        return inStack.empty() && outStack.empty();
    }
};
```

---

## Java

```java
import java.util.*;

class MyQueue {

    Stack<Integer> inStack = new Stack<>();
    Stack<Integer> outStack = new Stack<>();

    public void push(int x) {
        inStack.push(x);
    }

    public int pop() {

        peek();

        return outStack.pop();
    }

    public int peek() {

        if(outStack.isEmpty()) {

            while(!inStack.isEmpty())
                outStack.push(inStack.pop());
        }

        return outStack.peek();
    }

    public boolean empty() {
        return inStack.isEmpty() && outStack.isEmpty();
    }
}
```

---

# 2. Design Circular Queue

## Idea

Use an array of fixed size `k`.

Maintain:

* front
* rear
* size

When rear reaches end:

* Wrap around using modulo.

```text
rear = (rear + 1) % capacity
front = (front + 1) % capacity
```

---

## Algorithm

### EnQueue(value)

```text
If queue full
    return False

rear = (rear + 1) mod capacity

Insert value

size++

return True
```

### DeQueue()

```text
If queue empty
    return False

front = (front + 1) mod capacity

size--

return True
```

---

## Pseudocode

```text
CLASS MyCircularQueue

    queue[k]
    front = 0
    rear = -1
    size = 0

    FUNCTION enQueue(value)

        IF size == k
            RETURN False

        rear = (rear + 1) mod k

        queue[rear] = value

        size++

        RETURN True

    FUNCTION deQueue()

        IF size == 0
            RETURN False

        front = (front + 1) mod k

        size--

        RETURN True

    FUNCTION Front()

        IF size == 0
            RETURN -1

        RETURN queue[front]

    FUNCTION Rear()

        IF size == 0
            RETURN -1

        RETURN queue[rear]
```

---

## Complexity

| Operation | Time |
| --------- | ---- |
| EnQueue   | O(1) |
| DeQueue   | O(1) |
| Front     | O(1) |
| Rear      | O(1) |

Space: **O(k)**

---

## Python

```python
class MyCircularQueue:

    def __init__(self, k):
        self.q = [0] * k
        self.k = k
        self.front = 0
        self.rear = -1
        self.size = 0

    def enQueue(self, value):

        if self.isFull():
            return False

        self.rear = (self.rear + 1) % self.k
        self.q[self.rear] = value
        self.size += 1

        return True

    def deQueue(self):

        if self.isEmpty():
            return False

        self.front = (self.front + 1) % self.k
        self.size -= 1

        return True

    def Front(self):
        return -1 if self.isEmpty() else self.q[self.front]

    def Rear(self):
        return -1 if self.isEmpty() else self.q[self.rear]

    def isEmpty(self):
        return self.size == 0

    def isFull(self):
        return self.size == self.k
```

---

## C++

```cpp
class MyCircularQueue {

    vector<int> q;
    int front;
    int rear;
    int size;
    int capacity;

public:

    MyCircularQueue(int k) {

        q.resize(k);

        front = 0;
        rear = -1;
        size = 0;
        capacity = k;
    }

    bool enQueue(int value) {

        if(isFull())
            return false;

        rear = (rear + 1) % capacity;

        q[rear] = value;

        size++;

        return true;
    }

    bool deQueue() {

        if(isEmpty())
            return false;

        front = (front + 1) % capacity;

        size--;

        return true;
    }

    int Front() {
        return isEmpty() ? -1 : q[front];
    }

    int Rear() {
        return isEmpty() ? -1 : q[rear];
    }

    bool isEmpty() {
        return size == 0;
    }

    bool isFull() {
        return size == capacity;
    }
};
```

---

## Java

```java
class MyCircularQueue {

    int[] q;
    int front;
    int rear;
    int size;
    int capacity;

    public MyCircularQueue(int k) {

        q = new int[k];

        capacity = k;
        front = 0;
        rear = -1;
        size = 0;
    }

    public boolean enQueue(int value) {

        if(isFull())
            return false;

        rear = (rear + 1) % capacity;

        q[rear] = value;

        size++;

        return true;
    }

    public boolean deQueue() {

        if(isEmpty())
            return false;

        front = (front + 1) % capacity;

        size--;

        return true;
    }

    public int Front() {
        return isEmpty() ? -1 : q[front];
    }

    public int Rear() {
        return isEmpty() ? -1 : q[rear];
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public boolean isFull() {
        return size == capacity;
    }
}
```

---

# 3. LRU Cache

## Idea

Need O(1):

* Access key quickly → HashMap
* Move recently used item quickly → Doubly Linked List

Store:

```text
HashMap<Key, Node>

Head <-> Most Recent

Tail <-> Least Recent
```

---

## Algorithm

### Get(key)

```text
If key absent
    return -1

Move node to front

Return value
```

### Put(key,value)

```text
If key exists

    Update value

    Move to front

Else

    Create new node

    Insert at front

    If size > capacity

        Remove tail node

        Delete from hashmap
```

---

## Pseudocode

```text
CLASS LRUCache

    hashmap
    doubly linked list

    FUNCTION get(key)

        IF key not found
            RETURN -1

        move node to front

        RETURN node.value

    FUNCTION put(key,value)

        IF key exists

            update value

            move to front

        ELSE

            insert new node at front

            IF size > capacity

                remove tail

                delete from hashmap
```

---

## Complexity

| Operation | Time |
| --------- | ---- |
| Get       | O(1) |
| Put       | O(1) |

Space: **O(capacity)**

---

## Python

```python
from collections import OrderedDict

class LRUCache:

    def __init__(self, capacity):
        self.cache = OrderedDict()
        self.capacity = capacity

    def get(self, key):

        if key not in self.cache:
            return -1

        self.cache.move_to_end(key)

        return self.cache[key]

    def put(self, key, value):

        if key in self.cache:
            self.cache.move_to_end(key)

        self.cache[key] = value

        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)
```

---

## C++

```cpp
#include <unordered_map>
#include <list>
using namespace std;

class LRUCache {

    int capacity;

    list<pair<int,int>> dll;

    unordered_map<int,
        list<pair<int,int>>::iterator> mp;

public:

    LRUCache(int capacity) {
        this->capacity = capacity;
    }

    int get(int key) {

        if(mp.find(key)==mp.end())
            return -1;

        auto it = mp[key];

        int value = it->second;

        dll.erase(it);

        dll.push_front({key,value});

        mp[key] = dll.begin();

        return value;
    }

    void put(int key,int value) {

        if(mp.find(key)!=mp.end())
            dll.erase(mp[key]);

        dll.push_front({key,value});

        mp[key] = dll.begin();

        if(dll.size() > capacity) {

            auto last = dll.back();

            mp.erase(last.first);

            dll.pop_back();
        }
    }
};
```

---

## Java

```java
import java.util.*;

class LRUCache extends LinkedHashMap<Integer,Integer> {

    int capacity;

    public LRUCache(int capacity) {

        super(capacity,0.75f,true);

        this.capacity = capacity;
    }

    public int get(int key) {
        return super.getOrDefault(key,-1);
    }

    public void put(int key,int value) {
        super.put(key,value);
    }

    protected boolean removeEldestEntry(
        Map.Entry<Integer,Integer> eldest) {

        return size() > capacity;
    }
}
```

---

# 4. Rotting Oranges

## Idea

This is a **Multi-Source BFS**.

Initially:

* Put all rotten oranges into queue.
* Count fresh oranges.

Every minute:

* Rotten oranges infect adjacent fresh oranges.

BFS level = minutes.

---

## Algorithm

1. Add all rotten oranges to queue.
2. Count fresh oranges.
3. BFS:

   * Process one level.
   * Convert neighboring fresh oranges.
   * Decrease fresh count.
4. If fresh remains → return -1.
5. Else return minutes.

---

## Pseudocode

```text
FUNCTION orangesRotting(grid)

    queue = all rotten oranges

    fresh = count fresh oranges

    minutes = 0

    WHILE queue not empty AND fresh > 0

        size = queue size

        REPEAT size times

            cell = dequeue

            FOR 4 directions

                IF fresh orange

                    make rotten

                    fresh--

                    enqueue

        minutes++

    IF fresh > 0
        RETURN -1

    RETURN minutes
```

---

## Complexity

| Complexity | Value    |
| ---------- | -------- |
| Time       | O(m × n) |
| Space      | O(m × n) |

---

## Python

```python
from collections import deque

def orangesRotting(grid):

    rows = len(grid)
    cols = len(grid[0])

    q = deque()
    fresh = 0

    for r in range(rows):
        for c in range(cols):

            if grid[r][c] == 2:
                q.append((r,c))

            elif grid[r][c] == 1:
                fresh += 1

    minutes = 0

    directions = [(1,0),(-1,0),(0,1),(0,-1)]

    while q and fresh:

        for _ in range(len(q)):

            r,c = q.popleft()

            for dr,dc in directions:

                nr = r + dr
                nc = c + dc

                if (0 <= nr < rows and
                    0 <= nc < cols and
                    grid[nr][nc] == 1):

                    grid[nr][nc] = 2

                    fresh -= 1

                    q.append((nr,nc))

        minutes += 1

    return minutes if fresh == 0 else -1
```

---

## C++

```cpp
#include <vector>
#include <queue>
using namespace std;

int orangesRotting(vector<vector<int>>& grid) {

    int rows = grid.size();
    int cols = grid[0].size();

    queue<pair<int,int>> q;

    int fresh = 0;

    for(int r=0;r<rows;r++) {
        for(int c=0;c<cols;c++) {

            if(grid[r][c]==2)
                q.push({r,c});

            else if(grid[r][c]==1)
                fresh++;
        }
    }

    int minutes = 0;

    int dirs[4][2]={{1,0},{-1,0},{0,1},{0,-1}};

    while(!q.empty() && fresh) {

        int size=q.size();

        while(size--) {

            auto [r,c]=q.front();
            q.pop();

            for(auto &d:dirs) {

                int nr=r+d[0];
                int nc=c+d[1];

                if(nr>=0 && nr<rows &&
                   nc>=0 && nc<cols &&
                   grid[nr][nc]==1) {

                    grid[nr][nc]=2;

                    fresh--;

                    q.push({nr,nc});
                }
            }
        }

        minutes++;
    }

    return fresh ? -1 : minutes;
}
```

---

## Java

```java
import java.util.*;

class Solution {

    public int orangesRotting(int[][] grid) {

        int rows = grid.length;
        int cols = grid[0].length;

        Queue<int[]> q = new LinkedList<>();

        int fresh = 0;

        for(int r=0;r<rows;r++) {
            for(int c=0;c<cols;c++) {

                if(grid[r][c]==2)
                    q.offer(new int[]{r,c});

                else if(grid[r][c]==1)
                    fresh++;
            }
        }

        int minutes = 0;

        int[][] dirs = {
            {1,0},{-1,0},{0,1},{0,-1}
        };

        while(!q.isEmpty() && fresh > 0) {

            int size = q.size();

            while(size-- > 0) {

                int[] cell = q.poll();

                int r = cell[0];
                int c = cell[1];

                for(int[] d : dirs) {

                    int nr = r + d[0];
                    int nc = c + d[1];

                    if(nr>=0 && nr<rows &&
                       nc>=0 && nc<cols &&
                       grid[nr][nc]==1) {

                        grid[nr][nc]=2;

                        fresh--;

                        q.offer(new int[]{nr,nc});
                    }
                }
            }

            minutes++;
        }

        return fresh == 0 ? minutes : -1;
    }
}
```

## Queue Pattern Summary

| Problem                      | Pattern                              |
| ---------------------------- | ------------------------------------ |
| Implement Queue using Stacks | Queue Design using Two Stacks        |
| Design Circular Queue        | Circular Array Queue                 |
| LRU Cache                    | Queue + HashMap + Doubly Linked List |
| Rotting Oranges              | Multi-Source BFS                     |
| Next Level                   | Walls and Gates                      |
| Next Level                   | Number of Islands                    |
| Next Level                   | Open the Lock                        |
| Next Level                   | Sliding Window Maximum               |
| Next Level                   | Shortest Path in Binary Matrix       |
