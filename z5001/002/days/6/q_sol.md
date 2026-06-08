## 1. Implement Queue using Stacks

### Input Format

```text
n
operation
operation
...
```

Operations:

```text
ENQUEUE x
DEQUEUE
FRONT
```

### Sample Input

```text
6
ENQUEUE 10
ENQUEUE 20
FRONT
DEQUEUE
FRONT
DEQUEUE
```

### Sample Output

```text
10
10
20
```

---

# C++

```cpp
#include <iostream>
#include <stack>
using namespace std;

class QueueUsingStacks {
    stack<int> s1, s2;

    void transfer() {
        while (!s1.empty()) {
            s2.push(s1.top());
            s1.pop();
        }
    }

public:
    void enqueue(int x) {
        s1.push(x);
    }

    int dequeue() {
        if (s2.empty())
            transfer();

        if (s2.empty())
            return -1;

        int val = s2.top();
        s2.pop();
        return val;
    }

    int front() {
        if (s2.empty())
            transfer();

        if (s2.empty())
            return -1;

        return s2.top();
    }
};

int main() {
    int n;
    cin >> n;

    QueueUsingStacks q;

    for (int i = 0; i < n; i++) {
        string op;
        cin >> op;

        if (op == "ENQUEUE") {
            int x;
            cin >> x;
            q.enqueue(x);
        }
        else if (op == "DEQUEUE") {
            cout << q.dequeue() << endl;
        }
        else if (op == "FRONT") {
            cout << q.front() << endl;
        }
    }

    return 0;
}
```

---

# Java

```java
import java.util.*;

class QueueUsingStacks {
    Stack<Integer> s1 = new Stack<>();
    Stack<Integer> s2 = new Stack<>();

    private void transfer() {
        while (!s1.isEmpty()) {
            s2.push(s1.pop());
        }
    }

    void enqueue(int x) {
        s1.push(x);
    }

    int dequeue() {
        if (s2.isEmpty())
            transfer();

        if (s2.isEmpty())
            return -1;

        return s2.pop();
    }

    int front() {
        if (s2.isEmpty())
            transfer();

        if (s2.isEmpty())
            return -1;

        return s2.peek();
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();

        QueueUsingStacks q = new QueueUsingStacks();

        for (int i = 0; i < n; i++) {
            String op = sc.next();

            if (op.equals("ENQUEUE")) {
                int x = sc.nextInt();
                q.enqueue(x);
            }
            else if (op.equals("DEQUEUE")) {
                System.out.println(q.dequeue());
            }
            else if (op.equals("FRONT")) {
                System.out.println(q.front());
            }
        }
    }
}
```

---

# Python

```python
class QueueUsingStacks:
    def __init__(self):
        self.s1 = []
        self.s2 = []

    def transfer(self):
        while self.s1:
            self.s2.append(self.s1.pop())

    def enqueue(self, x):
        self.s1.append(x)

    def dequeue(self):
        if not self.s2:
            self.transfer()

        if not self.s2:
            return -1

        return self.s2.pop()

    def front(self):
        if not self.s2:
            self.transfer()

        if not self.s2:
            return -1

        return self.s2[-1]


n = int(input())
q = QueueUsingStacks()

for _ in range(n):
    parts = input().split()

    if parts[0] == "ENQUEUE":
        q.enqueue(int(parts[1]))

    elif parts[0] == "DEQUEUE":
        print(q.dequeue())

    elif parts[0] == "FRONT":
        print(q.front())
```

---

# 2. Design Circular Queue

### Input Format

```text
capacity
n
operation
```

Operations:

```text
ENQUEUE x
DEQUEUE
FRONT
REAR
```

### Sample Input

```text
5
7
ENQUEUE 10
ENQUEUE 20
ENQUEUE 30
FRONT
REAR
DEQUEUE
FRONT
```

### Sample Output

```text
10
30
10
20
```

---

# C++

```cpp
#include <iostream>
#include <vector>
using namespace std;

class CircularQueue {
    vector<int> q;
    int frontIdx, rearIdx, size, capacity;

public:
    CircularQueue(int cap) {
        capacity = cap;
        q.resize(capacity);
        frontIdx = 0;
        rearIdx = -1;
        size = 0;
    }

    bool enqueue(int x) {
        if (size == capacity)
            return false;

        rearIdx = (rearIdx + 1) % capacity;
        q[rearIdx] = x;
        size++;
        return true;
    }

    int dequeue() {
        if (size == 0)
            return -1;

        int val = q[frontIdx];
        frontIdx = (frontIdx + 1) % capacity;
        size--;
        return val;
    }

    int front() {
        return size == 0 ? -1 : q[frontIdx];
    }

    int rear() {
        return size == 0 ? -1 : q[rearIdx];
    }
};

int main() {
    int cap, n;
    cin >> cap >> n;

    CircularQueue q(cap);

    for (int i = 0; i < n; i++) {
        string op;
        cin >> op;

        if (op == "ENQUEUE") {
            int x;
            cin >> x;
            q.enqueue(x);
        }
        else if (op == "DEQUEUE") {
            cout << q.dequeue() << endl;
        }
        else if (op == "FRONT") {
            cout << q.front() << endl;
        }
        else if (op == "REAR") {
            cout << q.rear() << endl;
        }
    }
    return 0;
}
```

---

# Java

```java
import java.util.*;

class CircularQueue {
    int[] q;
    int front = 0, rear = -1, size = 0, capacity;

    CircularQueue(int cap) {
        capacity = cap;
        q = new int[cap];
    }

    boolean enqueue(int x) {
        if (size == capacity)
            return false;

        rear = (rear + 1) % capacity;
        q[rear] = x;
        size++;
        return true;
    }

    int dequeue() {
        if (size == 0)
            return -1;

        int val = q[front];
        front = (front + 1) % capacity;
        size--;
        return val;
    }

    int getFront() {
        return size == 0 ? -1 : q[front];
    }

    int getRear() {
        return size == 0 ? -1 : q[rear];
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int cap = sc.nextInt();
        int n = sc.nextInt();

        CircularQueue q = new CircularQueue(cap);

        for (int i = 0; i < n; i++) {
            String op = sc.next();

            if (op.equals("ENQUEUE")) {
                int x = sc.nextInt();
                q.enqueue(x);
            }
            else if (op.equals("DEQUEUE")) {
                System.out.println(q.dequeue());
            }
            else if (op.equals("FRONT")) {
                System.out.println(q.getFront());
            }
            else if (op.equals("REAR")) {
                System.out.println(q.getRear());
            }
        }
    }
}
```

---

# Python

```python
class CircularQueue:
    def __init__(self, capacity):
        self.q = [0] * capacity
        self.capacity = capacity
        self.front = 0
        self.rear = -1
        self.size = 0

    def enqueue(self, x):
        if self.size == self.capacity:
            return False

        self.rear = (self.rear + 1) % self.capacity
        self.q[self.rear] = x
        self.size += 1
        return True

    def dequeue(self):
        if self.size == 0:
            return -1

        val = self.q[self.front]
        self.front = (self.front + 1) % self.capacity
        self.size -= 1
        return val

    def get_front(self):
        return -1 if self.size == 0 else self.q[self.front]

    def get_rear(self):
        return -1 if self.size == 0 else self.q[self.rear]


cap = int(input())
n = int(input())

q = CircularQueue(cap)

for _ in range(n):
    parts = input().split()

    if parts[0] == "ENQUEUE":
        q.enqueue(int(parts[1]))

    elif parts[0] == "DEQUEUE":
        print(q.dequeue())

    elif parts[0] == "FRONT":
        print(q.get_front())

    elif parts[0] == "REAR":
        print(q.get_rear())
```

---

# 3. LRU Cache

### Input Format

```text
capacity
n
PUT key value
GET key
```

### Sample Input

```text
2
6
PUT 1 10
PUT 2 20
GET 1
PUT 3 30
GET 2
GET 3
```

### Sample Output

```text
10
-1
30
```

---

# Python (Platform Ready)

```python
from collections import OrderedDict

capacity = int(input())
n = int(input())

cache = OrderedDict()

for _ in range(n):
    parts = input().split()

    if parts[0] == "PUT":
        key = int(parts[1])
        value = int(parts[2])

        if key in cache:
            del cache[key]

        cache[key] = value

        if len(cache) > capacity:
            cache.popitem(last=False)

    elif parts[0] == "GET":
        key = int(parts[1])

        if key not in cache:
            print(-1)
        else:
            value = cache[key]
            del cache[key]
            cache[key] = value
            print(value)
```

---

# Java (Platform Ready)

```java
import java.util.*;

class LRUCache extends LinkedHashMap<Integer, Integer> {
    int capacity;

    LRUCache(int capacity) {
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }

    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        return size() > capacity;
    }

    int getValue(int key) {
        return getOrDefault(key, -1);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int capacity = sc.nextInt();
        int n = sc.nextInt();

        LRUCache cache = new LRUCache(capacity);

        for (int i = 0; i < n; i++) {
            String op = sc.next();

            if (op.equals("PUT")) {
                int key = sc.nextInt();
                int value = sc.nextInt();
                cache.put(key, value);
            }
            else if (op.equals("GET")) {
                int key = sc.nextInt();
                System.out.println(cache.getValue(key));
            }
        }
    }
}
```

---

# C++ (Platform Ready)

```cpp
#include <iostream>
#include <unordered_map>
#include <list>
using namespace std;

class LRUCache {
    int capacity;

    list<pair<int,int>> dq;

    unordered_map<int, list<pair<int,int>>::iterator> mp;

public:
    LRUCache(int cap) {
        capacity = cap;
    }

    int get(int key) {
        if(mp.find(key) == mp.end())
            return -1;

        auto it = mp[key];

        int value = it->second;

        dq.erase(it);
        dq.push_front({key, value});

        mp[key] = dq.begin();

        return value;
    }

    void put(int key, int value) {
        if(mp.find(key) != mp.end()) {
            dq.erase(mp[key]);
        }
        else if((int)dq.size() == capacity) {
            auto last = dq.back();
            mp.erase(last.first);
            dq.pop_back();
        }

        dq.push_front({key, value});
        mp[key] = dq.begin();
    }
};

int main() {
    int capacity, n;

    cin >> capacity >> n;

    LRUCache cache(capacity);

    for(int i = 0; i < n; i++) {
        string op;
        cin >> op;

        if(op == "PUT") {
            int key, value;
            cin >> key >> value;

            cache.put(key, value);
        }
        else if(op == "GET") {
            int key;
            cin >> key;

            cout << cache.get(key) << endl;
        }
    }

    return 0;
}
```
