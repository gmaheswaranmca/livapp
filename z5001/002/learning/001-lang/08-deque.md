# Deque (Double-Ended Queue) Operations Comparison

> The table uses the **standard deque implementation** commonly used in competitive programming.

| Operation          | C++                 | Rust                              | Go                             | Java                                           | Python                          | JavaScript           | C#                                  |
| ------------------ | ------------------- | --------------------------------- | ------------------------------ | ---------------------------------------------- | ------------------------------- | -------------------- | ----------------------------------- |
| **Data Structure** | `deque<T>`          | `VecDeque<T>`                     | `[]T`                          | `ArrayDeque<T>`                                | `collections.deque`             | Custom / Array       | `LinkedList<T>`*                    |
| **Import**         | `#include <deque>`  | `use std::collections::VecDeque;` | None                           | `import java.util.*;`                          | `from collections import deque` | None                 | `using System.Collections.Generic;` |
| **Instantiation**  | `deque<int> dq;`    | `let mut dq = VecDeque::new();`   | `dq := []int{}`                | `ArrayDeque<Integer> dq = new ArrayDeque<>();` | `dq = deque()`                  | `let dq = [];`       | `LinkedList<int> dq = new();`       |
| **Push Front**     | `dq.push_front(x);` | `dq.push_front(x);`               | `dq = append([]int{x}, dq...)` | `dq.offerFirst(x);`                            | `dq.appendleft(x)`              | `dq.unshift(x)`      | `dq.AddFirst(x);`                   |
| **Push Back**      | `dq.push_back(x);`  | `dq.push_back(x);`                | `dq = append(dq, x)`           | `dq.offerLast(x);`                             | `dq.append(x)`                  | `dq.push(x)`         | `dq.AddLast(x);`                    |
| **Pop Front**      | `dq.pop_front();`   | `dq.pop_front();`                 | `dq = dq[1:]`                  | `dq.pollFirst();`                              | `dq.popleft()`                  | `dq.shift()`         | `dq.RemoveFirst();`                 |
| **Pop Back**       | `dq.pop_back();`    | `dq.pop_back();`                  | `dq = dq[:len(dq)-1]`          | `dq.pollLast();`                               | `dq.pop()`                      | `dq.pop()`           | `dq.RemoveLast();`                  |
| **Front**          | `dq.front()`        | `dq.front()`                      | `dq[0]`                        | `dq.peekFirst()`                               | `dq[0]`                         | `dq[0]`              | `dq.First.Value`                    |
| **Back**           | `dq.back()`         | `dq.back()`                       | `dq[len(dq)-1]`                | `dq.peekLast()`                                | `dq[-1]`                        | `dq[dq.length-1]`    | `dq.Last.Value`                     |
| **Empty**          | `dq.empty()`        | `dq.is_empty()`                   | `len(dq)==0`                   | `dq.isEmpty()`                                 | `len(dq)==0`                    | `dq.length===0`      | `dq.Count==0`                       |
| **Size**           | `dq.size()`         | `dq.len()`                        | `len(dq)`                      | `dq.size()`                                    | `len(dq)`                       | `dq.length`          | `dq.Count`                          |
| **Clear**          | `dq.clear()`        | `dq.clear()`                      | `dq=nil` or `dq=[]int{}`       | `dq.clear()`                                   | `dq.clear()`                    | `dq.length=0`        | `dq.Clear();`                       |
| **Iterate**        | `for(auto x:dq)`    | `for x in &dq`                    | `for _,x:=range dq`            | `for(int x:dq)`                                | `for x in dq`                   | `for(const x of dq)` | `foreach(var x in dq)`              |
| **Join (Print)**   | Loop                | `dq.iter().map(...).collect()`    | `fmt.Sprint(dq)`               | `dq.toString()`                                | `' '.join(map(str,dq))`         | `dq.join(' ')`       | `string.Join(" ", dq)`              |

* C# does not have a built-in `Deque<T>`. `LinkedList<T>` is the closest standard-library alternative for competitive programming.

---

## Notes

### C++

* `std::deque` provides **O(1)** insertion and deletion at both ends.
* Supports random access (`dq[i]`), unlike `std::queue`.

### Rust

* `VecDeque<T>` is a circular buffer.
* All front/back operations are **O(1)**.
* `front()` and `back()` return `Option<&T>`.

### Go

* No built-in deque.
* For competitive programming:

  * Use a slice (`[]T`) for small/moderate inputs.
  * For heavy front insertions/removals, implement a circular buffer or use `container/list` (though it's less cache-friendly).

### Java

* `ArrayDeque<E>` is the preferred deque implementation.
* Faster than `LinkedList` for most competitive programming tasks.
* Supports both queue and stack operations.

### Python

* `collections.deque` is the standard deque.
* `appendleft()` and `popleft()` are **O(1)**.
* Prefer it over `list` when removing from the front frequently.

### JavaScript

* Arrays support deque-like methods (`push`, `pop`, `shift`, `unshift`).
* However:

  * `push()` and `pop()` are efficient.
  * `shift()` and `unshift()` are **O(n)**.
* For performance-critical problems, implement a deque using head/tail indices.

### C#

* `LinkedList<T>` supports **O(1)** insertion and deletion at both ends.
* Accessing `First.Value` and `Last.Value` is **O(1)**.

---

# Time Complexity

| Operation  | Complexity |
| ---------- | ---------- |
| Push Front | **O(1)**   |
| Push Back  | **O(1)**   |
| Pop Front  | **O(1)**   |
| Pop Back   | **O(1)**   |
| Front      | **O(1)**   |
| Back       | **O(1)**   |
| Empty      | **O(1)**   |
| Size       | **O(1)**   |

---

## Common Competitive Programming Uses

* **Sliding Window Maximum / Minimum** (Monotonic Queue)
* **0-1 BFS**
* **Palindrome Checking**
* **Circular Buffer**
* **Maintaining a Window of Elements**
* **Implementing Both Stack and Queue in One Structure**
* **Simulation Problems**
