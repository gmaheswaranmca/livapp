## Stack Operations Comparison

| Operation          | C++                            | Rust                                 | Go                           | Java                                 | Python                   | JavaScript        | C#                                  |
| ------------------ | ------------------------------ | ------------------------------------ | ---------------------------- | ------------------------------------ | ------------------------ | ----------------- | ----------------------------------- |
| **Data Structure** | `stack<int>`                   | `Vec<i32>`                           | `[]int`                      | `Stack<Integer>`                     | `list`                   | `Array`           | `Stack<int>`                        |
| **Import**         | `#include <stack>`             | None                                 | None                         | `import java.util.*;`                | None                     | None              | `using System.Collections.Generic;` |
| **Instantiation**  | `stack<int> st;`               | `let mut st: Vec<i32> = Vec::new();` | `st := []int{}`              | `Stack<Integer> st = new Stack<>();` | `st = []`                | `let st = [];`    | `Stack<int> st = new Stack<int>();` |
| **Push**           | `st.push(x);`                  | `st.push(x);`                        | `st = append(st, x)`         | `st.push(x);`                        | `st.append(x)`           | `st.push(x)`      | `st.Push(x);`                       |
| **Pop**            | `st.pop();`                    | `st.pop();`                          | `st = st[:len(st)-1]`        | `st.pop();`                          | `st.pop()`               | `st.pop()`        | `st.Pop();`                         |
| **Top (Peek)**     | `st.top()`                     | `st.last()`                          | `st[len(st)-1]`              | `st.peek()`                          | `st[-1]`                 | `st[st.length-1]` | `st.Peek();`                        |
| **Bottom (First)** | Not Supported                  | `st.first()`                         | `st[0]`                      | `st.firstElement()`                  | `st[0]`                  | `st[0]`           | `st.Last()`*                        |
| **Empty**          | `st.empty()`                   | `st.is_empty()`                      | `len(st)==0`                 | `st.empty()`                         | `len(st)==0`             | `st.length===0`   | `st.Count==0`                       |
| **Full**           | Not Applicable                 | Not Applicable                       | Not Applicable               | Not Applicable                       | Not Applicable           | Not Applicable    | Not Applicable                      |
| **Size**           | `st.size()`                    | `st.len()`                           | `len(st)`                    | `st.size()`                          | `len(st)`                | `st.length`       | `st.Count`                          |
| **Join (Print)**   | Copy & iterate                 | `st.iter().map(...).collect()`       | `fmt.Sprint(st)`             | `st.toString()`                      | `' '.join(map(str, st))` | `st.join(' ')`    | `string.Join(" ", st)`              |
| **Clear**          | `while(!st.empty()) st.pop();` | `st.clear();`                        | `st = nil` or `st = []int{}` | `st.clear();`                        | `st.clear()`             | `st.length = 0`   | `st.Clear();`                       |

### Notes

* **C++**

  * `std::stack` is a container adapter (default underlying container is `deque`).
  * No iterator support and no `clear()`.

* **Rust**

  * `Vec<T>` is the idiomatic stack implementation.
  * `pop()` returns `Option<T>`.
  * `last()` and `first()` return `Option<&T>`.

* **Go**

  * The standard library has no stack type.
  * Slices (`[]T`) are the idiomatic choice.
  * Before `pop`, ensure `len(st) > 0`.

* **Java**

  * `Stack<E>` extends `Vector`.
  * For new code, `Deque<E>` (e.g., `ArrayDeque`) is generally recommended as a stack:

    * Push: `push()`
    * Pop: `pop()`
    * Peek: `peek()`

* **Python**

  * `list` is the standard stack implementation.
  * `append()` and `pop()` from the end are both **O(1)** amortized.

* **JavaScript**

  * Arrays naturally support stack operations efficiently.
  * `push()` and `pop()` are **O(1)** amortized.

* **C#**

  * `Stack<T>` is the standard LIFO collection.
  * There is no direct way to access the bottom element. `st.Last()` requires `using System.Linq;` and is **O(n)**.
