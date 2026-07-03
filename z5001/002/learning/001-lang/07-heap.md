# Heap (Priority Queue) Operations Comparison

> The table uses the **standard heap / priority queue** implementation commonly used in competitive programming.

| Operation                    | C++                                                  | Rust                                | Go                         | Java                                              | Python                 | JavaScript     | C#                                           |
| ---------------------------- | ---------------------------------------------------- | ----------------------------------- | -------------------------- | ------------------------------------------------- | ---------------------- | -------------- | -------------------------------------------- |
| **Data Structure**           | `priority_queue<T>`                                  | `BinaryHeap<T>`                     | `container/heap`           | `PriorityQueue<E>`                                | `heapq` (list)         | Custom Heap    | `PriorityQueue<TElement,TPriority>`          |
| **Import**                   | `#include <queue>`                                   | `use std::collections::BinaryHeap;` | `container/heap`           | `import java.util.*;`                             | `import heapq`         | None           | `using System.Collections.Generic;`          |
| **Instantiation (Min Heap)** | `priority_queue<int, vector<int>, greater<int>> pq;` | `BinaryHeap<Reverse<i32>>`          | Implement `heap.Interface` | `new PriorityQueue<>()`                           | `pq=[]`                | Custom         | `new PriorityQueue<int,int>()`               |
| **Instantiation (Max Heap)** | `priority_queue<int> pq;`                            | `BinaryHeap<i32>`                   | Negate values or custom    | `new PriorityQueue<>(Collections.reverseOrder())` | Store `-x`             | Custom         | Store negative priorities or custom comparer |
| **Push**                     | `pq.push(x)`                                         | `pq.push(x)`                        | `heap.Push(&pq,x)`         | `pq.offer(x)`                                     | `heapq.heappush(pq,x)` | `pq.push(x)`   | `pq.Enqueue(x,priority)`                     |
| **Pop**                      | `pq.pop()`                                           | `pq.pop()`                          | `heap.Pop(&pq)`            | `pq.poll()`                                       | `heapq.heappop(pq)`    | `pq.pop()`     | `pq.Dequeue()`                               |
| **Top / Peek**               | `pq.top()`                                           | `pq.peek()`                         | `pq[0]`                    | `pq.peek()`                                       | `pq[0]`                | `pq.peek()`    | `pq.Peek()`                                  |
| **Empty**                    | `pq.empty()`                                         | `pq.is_empty()`                     | `len(pq)==0`               | `pq.isEmpty()`                                    | `len(pq)==0`           | `pq.size()==0` | `pq.Count==0`                                |
| **Size**                     | `pq.size()`                                          | `pq.len()`                          | `len(pq)`                  | `pq.size()`                                       | `len(pq)`              | `pq.size()`    | `pq.Count`                                   |
| **Clear**                    | `while(!pq.empty()) pq.pop();`                       | `pq.clear()`                        | `pq=nil` or recreate       | `pq.clear()`                                      | `pq.clear()`           | `pq.clear()`   | `pq.Clear()`                                 |

---

## Notes

### C++

* Default is a **Max Heap**.
* Min Heap:

  ```cpp
  priority_queue<int, vector<int>, greater<int>> pq;
  ```
* Operations:

  * Push → **O(log n)**
  * Pop → **O(log n)**
  * Top → **O(1)**

---

### Rust

* `BinaryHeap` is a **Max Heap**.
* Min Heap:

  ```rust
  use std::cmp::Reverse;
  let mut pq = BinaryHeap::new();
  pq.push(Reverse(5));
  ```
* `peek()` returns `Option<&T>`.

---

### Go

* Uses the `container/heap` package.
* You must implement the `heap.Interface` (`Len`, `Less`, `Swap`, `Push`, `Pop`).
* Most verbose among these languages but very efficient.

---

### Java

* `PriorityQueue` is a **Min Heap** by default.
* Max Heap:

  ```java
  PriorityQueue<Integer> pq =
      new PriorityQueue<>(Collections.reverseOrder());
  ```

---

### Python

* `heapq` is a **Min Heap**.
* Max Heap:

  ```python
  heapq.heappush(pq, -x)
  x = -heapq.heappop(pq)
  ```
* `heapq` operates on a regular list.

---

### JavaScript

* No built-in priority queue.
* Competitive programmers usually implement a **Binary Heap** class.
* Some online judges allow third-party libraries, but most require your own implementation.

---

### C#

* `PriorityQueue<TElement, TPriority>` was introduced in **.NET 6**.
* It is a **Min Heap**.
* Example:

  ```csharp
  var pq = new PriorityQueue<int,int>();
  pq.Enqueue(10, 10);
  int x = pq.Dequeue();
  ```
* To simulate a Max Heap:

  ```csharp
  pq.Enqueue(value, -priority);
  ```

  or use a custom comparer (if available in your environment).

---

# Default Heap Type

| Language   | Default                            |
| ---------- | ---------------------------------- |
| C++        | Max Heap                           |
| Rust       | Max Heap                           |
| Go         | Depends on `Less()` implementation |
| Java       | Min Heap                           |
| Python     | Min Heap                           |
| JavaScript | No built-in heap                   |
| C#         | Min Heap                           |

---

# Time Complexity

| Operation  | Complexity   |
| ---------- | ------------ |
| Push       | **O(log n)** |
| Pop        | **O(log n)** |
| Peek/Top   | **O(1)**     |
| Build Heap | **O(n)**     |
| Empty      | **O(1)**     |
| Size       | **O(1)**     |

---

## Common Competitive Programming Uses

* **Top K Elements**
* **Kth Largest / Smallest Element**
* **Merge K Sorted Lists**
* **Dijkstra's Shortest Path**
* **Prim's Minimum Spanning Tree**
* **Task Scheduling**
* **Greedy Algorithms**
* **Running Median (with two heaps)**
* **Event Simulation**
* **Best-First Search (e.g., A*)**
