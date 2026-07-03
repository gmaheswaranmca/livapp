## Array (Dynamic Array) Operations Comparison

The table below shows the **idiomatic dynamic array** for each language (used in competitive programming).

| Operation              | C++                          | Rust                                | Go                              | Java                                        | Python                 | JavaScript           | C#                                  |
| ---------------------- | ---------------------------- | ----------------------------------- | ------------------------------- | ------------------------------------------- | ---------------------- | -------------------- | ----------------------------------- |
| **Data Structure**     | `vector<int>`                | `Vec<i32>`                          | `[]int`                         | `ArrayList<Integer>`                        | `list`                 | `Array`              | `List<int>`                         |
| **Import**             | `#include <vector>`          | None                                | None                            | `import java.util.*;`                       | None                   | None                 | `using System.Collections.Generic;` |
| **Instantiation**      | `vector<int> a;`             | `let mut a: Vec<i32> = Vec::new();` | `a := []int{}`                  | `ArrayList<Integer> a = new ArrayList<>();` | `a = []`               | `let a = [];`        | `List<int> a = new List<int>();`    |
| **Append (Push Back)** | `a.push_back(x);`            | `a.push(x);`                        | `a = append(a, x)`              | `a.add(x);`                                 | `a.append(x)`          | `a.push(x)`          | `a.Add(x);`                         |
| **Insert at Index**    | `a.insert(a.begin()+i, x);`  | `a.insert(i, x);`                   | `a = slices.Insert(a, i, x)`*   | `a.add(i, x);`                              | `a.insert(i, x)`       | `a.splice(i, 0, x)`  | `a.Insert(i, x);`                   |
| **Remove Last**        | `a.pop_back();`              | `a.pop();`                          | `a = a[:len(a)-1]`              | `a.remove(a.size()-1);`                     | `a.pop()`              | `a.pop()`            | `a.RemoveAt(a.Count-1);`            |
| **Remove at Index**    | `a.erase(a.begin()+i);`      | `a.remove(i);`                      | `a = append(a[:i], a[i+1:]...)` | `a.remove(i);`                              | `a.pop(i)`             | `a.splice(i,1)`      | `a.RemoveAt(i);`                    |
| **Access**             | `a[i]`                       | `a[i]`                              | `a[i]`                          | `a.get(i)`                                  | `a[i]`                 | `a[i]`               | `a[i]`                              |
| **Update**             | `a[i]=x`                     | `a[i]=x`                            | `a[i]=x`                        | `a.set(i,x)`                                | `a[i]=x`               | `a[i]=x`             | `a[i]=x`                            |
| **First**              | `a.front()`                  | `a.first()`                         | `a[0]`                          | `a.get(0)`                                  | `a[0]`                 | `a[0]`               | `a[0]`                              |
| **Last**               | `a.back()`                   | `a.last()`                          | `a[len(a)-1]`                   | `a.get(a.size()-1)`                         | `a[-1]`                | `a[a.length-1]`      | `a[a.Count-1]`                      |
| **Contains**           | `find(...)!=a.end()`         | `a.contains(&x)`                    | `slices.Contains(a,x)`*         | `a.contains(x)`                             | `x in a`               | `a.includes(x)`      | `a.Contains(x)`                     |
| **Sort Asc**           | `sort(a.begin(),a.end())`    | `a.sort()`                          | `slices.Sort(a)`*               | `Collections.sort(a)`                       | `a.sort()`             | `a.sort((a,b)=>a-b)` | `a.Sort()`                          |
| **Reverse**            | `reverse(a.begin(),a.end())` | `a.reverse()`                       | `slices.Reverse(a)`*            | `Collections.reverse(a)`                    | `a.reverse()`          | `a.reverse()`        | `a.Reverse()`                       |
| **Empty**              | `a.empty()`                  | `a.is_empty()`                      | `len(a)==0`                     | `a.isEmpty()`                               | `len(a)==0`            | `a.length===0`       | `a.Count==0`                        |
| **Size**               | `a.size()`                   | `a.len()`                           | `len(a)`                        | `a.size()`                                  | `len(a)`               | `a.length`           | `a.Count`                           |
| **Join (Print)**       | Loop                         | `a.iter().map(...).collect()`       | `fmt.Sprint(a)`                 | `a.toString()`                              | `' '.join(map(str,a))` | `a.join(' ')`        | `string.Join(" ",a)`                |
| **Clear**              | `a.clear()`                  | `a.clear()`                         | `a=nil` or `a=[]int{}`          | `a.clear()`                                 | `a.clear()`            | `a.length=0`         | `a.Clear()`                         |

* Requires Go's `slices` package (`import "slices"`) available in modern Go versions.

---

## Notes

### C++

* `vector` is the standard dynamic array in competitive programming.
* Random access is **O(1)**.
* Appending at the end is amortized **O(1)**.

### Rust

* `Vec<T>` is the idiomatic dynamic array.
* `first()`, `last()`, and `pop()` return `Option`.

### Go

* Slices (`[]T`) are the standard dynamic array.
* `append()` automatically grows capacity.
* `slices.Sort`, `slices.Reverse`, `slices.Contains`, and `slices.Insert` are available in recent Go versions.

### Java

* `ArrayList<E>` is preferred over arrays when the size changes.
* `Collections.sort()` and `Collections.reverse()` operate on lists.

### Python

* `list` is a dynamic array.
* Negative indexing (`a[-1]`) is commonly used.
* `append()` is amortized **O(1)**.

### JavaScript

* `Array` is dynamic.
* Always provide a comparator when sorting numbers:

  ```javascript
  a.sort((x, y) => x - y);
  ```

  Otherwise, values are sorted lexicographically.

### C#

* `List<T>` is the standard dynamic array.
* Supports efficient indexing and amortized **O(1)** append via `Add()`.
