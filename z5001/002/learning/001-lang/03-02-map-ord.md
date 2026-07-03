# Ordered Map Operations Comparison

> An **Ordered Map** stores **key-value pairs in sorted order of keys** (typically implemented using a balanced BST such as a Red-Black Tree or B-Tree). Unlike a Hash Map, it supports efficient order-based queries like `lower_bound` and `upper_bound`.

| Operation               | C++                     | Rust                                       | Go           | Java                                             | Python      | JavaScript | C#                                      |
| ----------------------- | ----------------------- | ------------------------------------------ | ------------ | ------------------------------------------------ | ----------- | ---------- | --------------------------------------- |
| **Data Structure**      | `map<K,V>`              | `BTreeMap<K,V>`                            | —            | `TreeMap<K,V>`                                   | —*          | —          | `SortedDictionary<K,V>`                 |
| **Import**              | `#include <map>`        | `use std::collections::BTreeMap;`          | None         | `import java.util.*;`                            | None        | None       | `using System.Collections.Generic;`     |
| **Instantiation**       | `map<int,int> mp;`      | `let mut mp = BTreeMap::new();`            | Not built-in | `TreeMap<Integer,Integer> mp = new TreeMap<>();` | Third-party | Custom     | `SortedDictionary<int,int> mp = new();` |
| **Insert / Update**     | `mp[k]=v;`              | `mp.insert(k,v);`                          | —            | `mp.put(k,v);`                                   | —           | —          | `mp[k]=v;`                              |
| **Get Value**           | `mp[k]`**               | `mp.get(&k)`                               | —            | `mp.get(k)`                                      | —           | —          | `mp[k]`                                 |
| **Contains Key**        | `mp.count(k)`           | `mp.contains_key(&k)`                      | —            | `mp.containsKey(k)`                              | —           | —          | `mp.ContainsKey(k)`                     |
| **Remove**              | `mp.erase(k)`           | `mp.remove(&k)`                            | —            | `mp.remove(k)`                                   | —           | —          | `mp.Remove(k)`                          |
| **First Key**           | `mp.begin()->first`     | `mp.first_key_value()`                     | —            | `mp.firstKey()`                                  | —           | —          | `mp.First().Key`***                     |
| **Last Key**            | `prev(mp.end())->first` | `mp.last_key_value()`                      | —            | `mp.lastKey()`                                   | —           | —          | `mp.Last().Key`***                      |
| **Lower Bound (≥ key)** | `mp.lower_bound(k)`     | `mp.range(k..).next()`                     | —            | `mp.ceilingKey(k)`                               | —           | —          | Manual                                  |
| **Upper Bound (> key)** | `mp.upper_bound(k)`     | `mp.range((Excluded(k),Unbounded)).next()` | —            | `mp.higherKey(k)`                                | —           | —          | Manual                                  |
| **Size**                | `mp.size()`             | `mp.len()`                                 | —            | `mp.size()`                                      | —           | —          | `mp.Count`                              |
| **Empty**               | `mp.empty()`            | `mp.is_empty()`                            | —            | `mp.isEmpty()`                                   | —           | —          | `mp.Count==0`                           |
| **Clear**               | `mp.clear()`            | `mp.clear()`                               | —            | `mp.clear()`                                     | —           | —          | `mp.Clear()`                            |
| **Iterate**             | `for(auto &[k,v]:mp)`   | `for (k,v) in &mp`                         | —            | `for(var e:mp.entrySet())`                       | —           | —          | `foreach(var kv in mp)`                 |

* Python has no built-in ordered map based on a balanced BST. Common third-party choice: `sortedcontainers.SortedDict`.

** Like `unordered_map`, `mp[k]` inserts a default value if the key doesn't exist.

*** Requires `using System.Linq;`.

---

# Notes

### C++

* `std::map` is implemented as a **Red-Black Tree**.
* All operations are **O(log n)**.
* Supports:

  ```cpp
  lower_bound()
  upper_bound()
  ```

---

### Rust

* `BTreeMap` is implemented as a **B-Tree**.
* All operations are **O(log n)**.
* Supports efficient range queries:

  ```rust
  mp.range(start..end)
  ```

---

### Go

* The standard library does **not** provide an ordered map.
* Competitive programmers usually:

  * Sort the keys separately, or
  * Use third-party libraries (not allowed on most online judges).

---

### Java

* `TreeMap` is implemented as a **Red-Black Tree**.
* Extra methods unavailable in `HashMap`:

  ```java
  firstKey()
  lastKey()
  ceilingKey()
  floorKey()
  higherKey()
  lowerKey()
  ```

---

### Python

* `dict` preserves **insertion order**, **not sorted order**.
* For ordered-map functionality:

  * `sortedcontainers.SortedDict` (third-party), or
  * Maintain a sorted list of keys with `bisect` (common in CP when needed).

---

### JavaScript

* `Map` preserves insertion order, **not key order**.
* No built-in balanced BST.

---

### C#

* `SortedDictionary<TKey,TValue>` maintains keys in sorted order.
* Based on a balanced tree.
* Supports **O(log n)** insert, remove, and lookup.

---

# Hash Map vs Ordered Map

| Feature                      | Hash Map | Ordered Map     |
| ---------------------------- | -------- | --------------- |
| Order Maintained             | ❌ No     | ✅ Sorted by key |
| Insert                       | O(1) avg | O(log n)        |
| Search                       | O(1) avg | O(log n)        |
| Delete                       | O(1) avg | O(log n)        |
| Iterate in Sorted Order      | ❌        | ✅               |
| `lower_bound` / `ceilingKey` | ❌        | ✅               |
| Range Queries                | ❌        | ✅               |

---

# Common Competitive Programming Uses

* **Find the smallest key ≥ x** (`lower_bound`)
* **Find the largest key ≤ x** (`floor`)
* **Range queries on keys**
* **Sweep line algorithms**
* **Interval scheduling**
* **Coordinate compression (ordered traversal)**
* **Maintaining sorted frequencies**
* **Event processing in chronological/key order**

> **Rule of thumb:**
>
> * Use a **Hash Map** when you only need fast key-value lookup.
> * Use an **Ordered Map** when you need keys **in sorted order** or need operations like **next greater/smaller key** or **range queries**.
