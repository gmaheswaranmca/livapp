Below is a comparison of **Queue operations** in the most commonly used programming languages. This uses the **recommended queue implementation** for each language.

| Operation          | C++                          | Rust                              | Go                         | Java                                  | Python                          | JavaScript      | C#                                  |
| ------------------ | ---------------------------- | --------------------------------- | -------------------------- | ------------------------------------- | ------------------------------- | --------------- | ----------------------------------- |
| **Data Structure** | `queue<int>`                 | `VecDeque<i32>`                   | `[]int`                    | `Queue<Integer>`                      | `collections.deque`             | `Array`         | `Queue<int>`                        |
| **Import**         | `#include <queue>`           | `use std::collections::VecDeque;` | None                       | `import java.util.*;`                 | `from collections import deque` | None            | `using System.Collections.Generic;` |
| **Instantiation**  | `queue<int> q;`              | `let mut q = VecDeque::new();`    | `q := []int{}`             | `Queue<Integer> q = new Queue<>();`   | `q = deque()`                   | `let q = [];`   | `Queue<int> q = new Queue<int>();`  |
| **Push (Enqueue)** | `q.push(x);`                 | `q.push_back(x);`                 | `q = append(q, x)`         | `q.offer(x);`                         | `q.append(x)`                   | `q.push(x)`     | `q.Enqueue(x);`                     |
| **Pop (Dequeue)**  | `q.pop();`                   | `q.pop_front();`                  | `q = q[1:]`                | `q.poll();`                           | `q.popleft()`                   | `q.shift()`     | `q.Dequeue();`                      |
| **Front (Peek)**   | `q.front()`                  | `q.front()`                       | `q[0]`                     | `q.peek()`                            | `q[0]`                          | `q[0]`          | `q.Peek()`                          |
| **Rear (Last)**    | `q.back()`                   | `q.back()`                        | `q[len(q)-1]`              | `((LinkedList<Integer>)q).getLast()`* | `q[-1]`                         | `q[q.length-1]` | `q.Last()`**                        |
| **Empty**          | `q.empty()`                  | `q.is_empty()`                    | `len(q)==0`                | `q.isEmpty()`                         | `len(q)==0`                     | `q.length===0`  | `q.Count==0`                        |
| **Full**           | Not Applicable               | Not Applicable                    | Not Applicable             | Not Applicable                        | Not Applicable                  | Not Applicable  | Not Applicable                      |
| **Size**           | `q.size()`                   | `q.len()`                         | `len(q)`                   | `q.size()`                            | `len(q)`                        | `q.length`      | `q.Count`                           |
| **Join (Print)**   | Copy & iterate               | `q.iter().map(...).collect()`     | `fmt.Sprint(q)`            | `q.toString()`                        | `' '.join(map(str,q))`          | `q.join(' ')`   | `string.Join(" ", q)`               |
| **Clear**          | `while(!q.empty()) q.pop();` | `q.clear();`                      | `q = nil` or `q = []int{}` | `q.clear();`                          | `q.clear()`                     | `q.length = 0`  | `q.Clear();`                        |

### Notes

* **C++**

  * `std::queue` is an adapter (default underlying container is `deque`).
  * No built-in `clear()` method.

* **Rust**

  * `VecDeque` is the standard double-ended queue.

* **Go**

  * The standard library has no dedicated queue.
  * A slice (`[]int`) is commonly used.
  * For heavy dequeue operations, consider `container/list`.

* **Java**

  * `Queue` is an interface.
  * `LinkedList` or `ArrayDeque` are common implementations.
  * `ArrayDeque` is generally preferred for performance.
  * `Queue` has no direct `getLast()`. The example works only if the implementation is `LinkedList`.

* **Python**

  * `collections.deque` provides **O(1)** enqueue/dequeue from both ends.
  * Avoid using `list.pop(0)` for queues because it is **O(n)**.

* **JavaScript**

  * Arrays support queue operations.
  * `shift()` is **O(n)**.
  * For performance-critical code, implement a queue with head/tail indices instead of repeatedly calling `shift()`.

* **C#**

  * `Queue<T>` is the standard FIFO collection.
  * `Queue<T>` has no direct "rear" property. `q.Last()` requires `using System.Linq;` and is **O(n)**. If you frequently need the rear element, maintain it separately.
