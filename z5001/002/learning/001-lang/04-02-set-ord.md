# Ordered Set Operations Comparison

> An **Ordered Set** stores **unique elements in sorted order**. It is typically implemented using a balanced BST (Red-Black Tree or B-Tree). Unlike a Hash Set, it supports order-based operations such as `lower_bound` and `upper_bound`.

| Operation             | C++                          | Rust                                       | Go           | Java                                     | Python      | JavaScript | C#                                   |
| --------------------- | ---------------------------- | ------------------------------------------ | ------------ | ---------------------------------------- | ----------- | ---------- | ------------------------------------ |
| **Data Structure**    | `set<T>`                     | `BTreeSet<T>`                              | —            | `TreeSet<T>`                             | —*          | —          | `SortedSet<T>`                       |
| **Import**            | `#include <set>`             | `use std::collections::BTreeSet;`          | None         | `import java.util.*;`                    | None        | None       | `using System.Collections.Generic;`  |
| **Instantiation**     | `set<int> st;`               | `let mut st = BTreeSet::new();`            | Not built-in | `TreeSet<Integer> st = new TreeSet<>();` | Third-party | Custom     | `SortedSet<int> st = new();`         |
| **Insert**            | `st.insert(x);`              | `st.insert(x);`                            | —            | `st.add(x);`                             | —           | —          | `st.Add(x);`                         |
| **Remove**            | `st.erase(x);`               | `st.remove(&x);`                           | —            | `st.remove(x);`                          | —           | —          | `st.Remove(x);`                      |
| **Contains**          | `st.count(x)`                | `st.contains(&x)`                          | —            | `st.contains(x)`                         | —           | —          | `st.Contains(x)`                     |
| **First**             | `*st.begin()`                | `st.first()`                               | —            | `st.first()`                             | —           | —          | `st.Min`                             |
| **Last**              | `*st.rbegin()`               | `st.last()`                                | —            | `st.last()`                              | —           | —          | `st.Max`                             |
| **Lower Bound (≥ x)** | `st.lower_bound(x)`          | `st.range(x..).next()`                     | —            | `st.ceiling(x)`                          | —           | —          | `st.GetViewBetween(x, st.Max).Min`** |
| **Upper Bound (> x)** | `st.upper_bound(x)`          | `st.range((Excluded(x),Unbounded)).next()` | —            | `st.higher(x)`                           | —           | —          | Manual                               |
| **Floor (≤ x)**       | `prev(st.upper_bound(x))`*** | `st.range(..=x).next_back()`               | —            | `st.floor(x)`                            | —           | —          | Manual                               |
| **Ceiling (≥ x)**     | `st.lower_bound(x)`          | `st.range(x..).next()`                     | —            | `st.ceiling(x)`                          | —           | —          | Manual                               |
| **Size**              | `st.size()`                  | `st.len()`                                 | —            | `st.size()`                              | —           | —          | `st.Count`                           |
| **Empty**             | `st.empty()`                 | `st.is_empty()`                            | —            | `st.isEmpty()`                           | —           | —          | `st.Count==0`                        |
| **Clear**             | `st.clear()`                 | `st.clear()`                               | —            | `st.clear()`                             | —           | —          | `st.Clear()`                         |
| **Iterate**           | `for(auto x:st)`             | `for x in &st`                             | —            | `for(int x:st)`                          | —           | —          | `foreach(var x in st)`               |

* Python has no built-in ordered set. Popular third-party option: `sortedcontainers.SortedSet`.

** Works when the set is not empty and `x <= st.Max`.

*** Ensure the iterator is not `begin()` before using `prev()`.

---

# Notes

### C++

* `std::set` is implemented as a **Red-Black Tree**.
* All operations are **O(log n)**.
* Supports:

  ```cpp
  lower_bound()
  upper_bound()
  ```

---

### Rust

* `BTreeSet` is implemented as a **B-Tree**.
* Supports efficient range iteration:

  ```rust
  st.range(10..20)
  ```

---

### Go

* No built-in ordered set.
* Common approaches:

  * Keep a sorted slice.
  * Use a third-party balanced tree (usually not allowed in competitive programming).

---

### Java

* `TreeSet` is implemented as a **Red-Black Tree**.
* Very rich API:

  ```java
  first()
  last()
  floor()
  ceiling()
  lower()
  higher()
  ```

---

### Python

* `set` is a **Hash Set**, not an ordered set.
* `dict` preserves insertion order, **not sorted order**.
* For ordered-set behavior:

  * `sortedcontainers.SortedSet` (third-party), or
  * Maintain a sorted list and use the `bisect` module.

---

### JavaScript

* `Set` preserves insertion order only.
* No built-in balanced BST or ordered set.

---

### C#

* `SortedSet<T>` stores unique values in sorted order.
* Provides:

  ```csharp
  Min
  Max
  GetViewBetween()
  ```
* Does **not** directly expose methods like `LowerBound` or `Ceiling`; they must be implemented using views or iteration.

---

# Hash Set vs Ordered Set

| Feature                   | Hash Set | Ordered Set |
| ------------------------- | -------- | ----------- |
| Stores Unique Values      | ✅        | ✅           |
| Sorted Order              | ❌        | ✅           |
| Insert                    | O(1) avg | O(log n)    |
| Search                    | O(1) avg | O(log n)    |
| Delete                    | O(1) avg | O(log n)    |
| Iterate in Sorted Order   | ❌        | ✅           |
| `lower_bound` / `ceiling` | ❌        | ✅           |
| Range Queries             | ❌        | ✅           |

---

# Common Competitive Programming Uses

* **Find the smallest value ≥ x** (`lower_bound` / `ceiling`)
* **Find the largest value ≤ x** (`floor`)
* **Successor / predecessor queries**
* **Range queries**
* **Coordinate compression**
* **Maintaining sorted unique values**
* **Greedy algorithms requiring the next available value**
* **Interval and scheduling problems**

---

# Hash Set vs Ordered Set vs Heap

| Feature                  | Hash Set   | Ordered Set | Heap           |
| ------------------------ | ---------- | ----------- | -------------- |
| Unique Elements          | ✅          | ✅           | ❌              |
| Sorted Iteration         | ❌          | ✅           | ❌              |
| Get Minimum              | ❌          | ✅ O(1)      | ✅ O(1)         |
| Get Maximum              | ❌          | ✅ O(1)      | Max Heap: O(1) |
| Arbitrary Search         | ✅ O(1) avg | ✅ O(log n)  | ❌ O(n)         |
| Next Greater (`≥ x`)     | ❌          | ✅ O(log n)  | ❌              |
| Remove Arbitrary Element | ✅ O(1) avg | ✅ O(log n)  | ❌ O(n)         |

### Rule of thumb

* **Hash Set** → Fast membership testing (`exists?`).
* **Ordered Set** → Membership testing **plus** sorted-order queries (`next`, `previous`, ranges).
* **Heap** → Repeatedly extract the smallest or largest element; it is **not** designed for arbitrary searches or range queries.
