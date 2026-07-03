## Hash Set Operations Comparison

> The table uses the **standard hash set implementation** commonly used in competitive programming.

| Operation                 | C++                                | Rust                                     | Go                         | Java                                     | Python          | JavaScript            | C#                                  |
| ------------------------- | ---------------------------------- | ---------------------------------------- | -------------------------- | ---------------------------------------- | --------------- | --------------------- | ----------------------------------- |
| **Data Structure**        | `unordered_set<T>`                 | `HashSet<T>`                             | `map[T]struct{}`           | `HashSet<T>`                             | `set`           | `Set`                 | `HashSet<T>`                        |
| **Import**                | `#include <unordered_set>`         | `use std::collections::HashSet;`         | None                       | `import java.util.*;`                    | None            | None                  | `using System.Collections.Generic;` |
| **Instantiation**         | `unordered_set<int> st;`           | `let mut st = HashSet::new();`           | `st := map[int]struct{}{}` | `HashSet<Integer> st = new HashSet<>();` | `st = set()`    | `let st = new Set();` | `HashSet<int> st = new();`          |
| **Insert**                | `st.insert(x);`                    | `st.insert(x);`                          | `st[x]=struct{}{}`         | `st.add(x);`                             | `st.add(x)`     | `st.add(x)`           | `st.Add(x);`                        |
| **Remove**                | `st.erase(x);`                     | `st.remove(&x);`                         | `delete(st,x)`             | `st.remove(x);`                          | `st.remove(x)`* | `st.delete(x)`        | `st.Remove(x);`                     |
| **Contains**              | `st.count(x)`                      | `st.contains(&x)`                        | `_,ok:=st[x]`              | `st.contains(x)`                         | `x in st`       | `st.has(x)`           | `st.Contains(x)`                    |
| **Size**                  | `st.size()`                        | `st.len()`                               | `len(st)`                  | `st.size()`                              | `len(st)`       | `st.size`             | `st.Count`                          |
| **Empty**                 | `st.empty()`                       | `st.is_empty()`                          | `len(st)==0`               | `st.isEmpty()`                           | `len(st)==0`    | `st.size===0`         | `st.Count==0`                       |
| **Clear**                 | `st.clear()`                       | `st.clear()`                             | `clear(st)`**              | `st.clear()`                             | `st.clear()`    | `st.clear()`          | `st.Clear()`                        |
| **Iterate**               | `for(auto x:st)`                   | `for x in &st`                           | `for x := range st`        | `for(int x:st)`                          | `for x in st`   | `for(const x of st)`  | `foreach(var x in st)`              |
| **Convert to List/Array** | `vector<int>(st.begin(),st.end())` | `st.iter().cloned().collect::<Vec<_>>()` | Loop                       | `new ArrayList<>(st)`                    | `list(st)`      | `[...st]`             | `st.ToList()`***                    |

### Notes

* **C++**

  * `unordered_set` provides average **O(1)** insert, erase, and lookup.
  * `count(x)` returns `0` or `1` since duplicates are not allowed.

* **Rust**

  * `HashSet<T>` is in `std::collections`.
  * `insert()` returns `true` if the value was newly inserted.

* **Go**

  * There is no built-in set type.
  * The idiomatic implementation is:

    ```go
    set := map[int]struct{}{}
    ```
  * Some code uses `map[T]bool`, but `struct{}` uses less memory.
  * `clear(set)` is available in Go 1.21+. Earlier versions recreate the map.

* **Java**

  * `HashSet` provides average **O(1)** operations.
  * `add()` returns `false` if the element already exists.

* **Python**

  * `set` is the standard hash set.
  * `remove(x)` raises a `KeyError` if `x` is absent.
  * Use `discard(x)` if you want to remove without raising an error.

* **JavaScript**

  * `Set` stores unique values.
  * Convert to an array with:

    ```javascript
    [...st]
    ```

* **C#**

  * `HashSet<T>` provides average **O(1)** insert, remove, and lookup.
  * `ToList()` requires:

    ```csharp
    using System.Linq;
    ```

### Competitive Programming Tips

* **Visited nodes (Graph BFS/DFS)** → Hash Set
* **Duplicate detection** → Hash Set
* **Membership testing** → Hash Set
* **Unique elements** → Hash Set
* **Removing duplicates from an array** → Hash Set
* **Complement lookups (e.g., Two Sum variants)** → Hash Set

Average time complexity for **Insert**, **Remove**, and **Contains** is **O(1)** in all these implementations.
