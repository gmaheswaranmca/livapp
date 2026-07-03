## Hash Map (Dictionary) Operations Comparison

> The table uses the **standard hash map implementation** commonly used in competitive programming.

| Operation           | C++                          | Rust                             | Go                    | Java                                             | Python                | JavaScript            | C#                                  |        |                                    |
| ------------------- | ---------------------------- | -------------------------------- | --------------------- | ------------------------------------------------ | --------------------- | --------------------- | ----------------------------------- | ------ | ---------------------------------- |
| **Data Structure**  | `unordered_map<K,V>`         | `HashMap<K,V>`                   | `map[K]V`             | `HashMap<K,V>`                                   | `dict`                | `Map`                 | `Dictionary<K,V>`                   |        |                                    |
| **Import**          | `#include <unordered_map>`   | `use std::collections::HashMap;` | None                  | `import java.util.*;`                            | None                  | None                  | `using System.Collections.Generic;` |        |                                    |
| **Instantiation**   | `unordered_map<int,int> mp;` | `let mut mp = HashMap::new();`   | `mp := map[int]int{}` | `HashMap<Integer,Integer> mp = new HashMap<>();` | `mp = {}`             | `let mp = new Map();` | `Dictionary<int,int> mp = new();`   |        |                                    |
| **Insert / Update** | `mp[k]=v;`                   | `mp.insert(k,v);`                | `mp[k]=v`             | `mp.put(k,v);`                                   | `mp[k]=v`             | `mp.set(k,v)`         | `mp[k]=v;`                          |        |                                    |
| **Get Value**       | `mp[k]`*                     | `mp.get(&k)`                     | `mp[k]`**             | `mp.get(k)`                                      | `mp[k]`               | `mp.get(k)`           | `mp[k]`                             |        |                                    |
| **Contains Key**    | `mp.count(k)`                | `mp.contains_key(&k)`            | `_,ok:=mp[k]`         | `mp.containsKey(k)`                              | `k in mp`             | `mp.has(k)`           | `mp.ContainsKey(k)`                 |        |                                    |
| **Contains Value**  | Loop                         | `mp.values().any(...)`           | Loop                  | `mp.containsValue(v)`                            | `v in mp.values()`    | Loop                  | `mp.ContainsValue(v)`               |        |                                    |
| **Remove Key**      | `mp.erase(k)`                | `mp.remove(&k)`                  | `delete(mp,k)`        | `mp.remove(k)`                                   | `del mp[k]`           | `mp.delete(k)`        | `mp.Remove(k)`                      |        |                                    |
| **Size**            | `mp.size()`                  | `mp.len()`                       | `len(mp)`             | `mp.size()`                                      | `len(mp)`             | `mp.size`             | `mp.Count`                          |        |                                    |
| **Empty**           | `mp.empty()`                 | `mp.is_empty()`                  | `len(mp)==0`          | `mp.isEmpty()`                                   | `len(mp)==0`          | `mp.size===0`         | `mp.Count==0`                       |        |                                    |
| **Clear**           | `mp.clear()`                 | `mp.clear()`                     | `clear(mp)`***        | `mp.clear()`                                     | `mp.clear()`          | `mp.clear()`          | `mp.Clear()`                        |        |                                    |
| **Keys**            | Iterate                      | `mp.keys()`                      | `range mp`            | `mp.keySet()`                                    | `mp.keys()`           | `mp.keys()`           | `mp.Keys`                           |        |                                    |
| **Values**          | Iterate                      | `mp.values()`                    | Iterate               | `mp.values()`                                    | `mp.values()`         | `mp.values()`         | `mp.Values`                         |        |                                    |
| **Items / Entries** | Iterate                      | `mp.iter()`                      | `range mp`            | `mp.entrySet()`                                  | `mp.items()`          | `mp.entries()`        | `foreach(var kv in mp)`             |        |                                    |
| **Frequency Count** | `mp[x]++`                    | `*mp.entry(x).or_insert(0)+=1;`  | `mp[x]++`             | `mp.put(x,mp.getOrDefault(x,0)+1)`               | `mp[x]=mp.get(x,0)+1` | `mp.set(x,(mp.get(x)  |                                     | 0)+1)` | `mp[x]=mp.GetValueOrDefault(x)+1;` |

### Notes

* **C++**

  * `unordered_map` provides average **O(1)** insert, find, and erase.
  * `mp[k]` inserts the key with a default value if it doesn't exist.
  * Use `mp.find(k)` or `mp.count(k)` when you don't want insertion.

* **Rust**

  * `get()` returns `Option<&V>`.
  * The `entry()` API is the idiomatic way to update frequencies efficiently.

* **Go**

  * Accessing a missing key returns the zero value of the value type.
  * To distinguish a missing key from a stored zero value, use:

    ```go
    value, ok := mp[key]
    ```
  * `clear(mp)` is available in Go 1.21+. Before that, recreate the map with `mp = map[K]V{}`.

* **Java**

  * `HashMap` operations are average **O(1)**.
  * `getOrDefault()` is widely used in competitive programming for frequency counting.

* **Python**

  * `dict` is the standard hash map.
  * `dict.get(key, default)` avoids `KeyError`.
  * For heavy frequency counting, `collections.Counter` and `collections.defaultdict` are also popular.

* **JavaScript**

  * Prefer `Map` over plain objects for competitive programming.
  * `Map` supports keys of any type and preserves insertion order.

* **C#**

  * `Dictionary<TKey, TValue>` provides average **O(1)** operations.
  * `GetValueOrDefault()` (available in modern .NET versions) simplifies frequency counting.
