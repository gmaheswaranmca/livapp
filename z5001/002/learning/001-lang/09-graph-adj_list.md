# Graph (Adjacency List) Operations Comparison

> In competitive programming, a graph is almost always represented as an **Adjacency List** because it uses **O(V + E)** space and is efficient for traversal algorithms like DFS and BFS.

---

| Operation               | C++                                     | Rust                        | Go                    | Java                                                 | Python                     | JavaScript                             | C#                                  |
| ----------------------- | --------------------------------------- | --------------------------- | --------------------- | ---------------------------------------------------- | -------------------------- | -------------------------------------- | ----------------------------------- |
| **Data Structure**      | `vector<vector<int>>`                   | `Vec<Vec<usize>>`           | `[][]int`             | `ArrayList<ArrayList<Integer>>`                      | `list[list[int]]`          | `Array<Array<number>>`                 | `List<List<int>>`                   |
| **Import**              | `#include <vector>`                     | None                        | None                  | `import java.util.*;`                                | None                       | None                                   | `using System.Collections.Generic;` |
| **Instantiation**       | `vector<vector<int>> g(n);`             | `let mut g=vec![vec![];n];` | `g:=make([][]int,n)`  | `ArrayList<ArrayList<Integer>> g=new ArrayList<>();` | `g=[[] for _ in range(n)]` | `let g=Array.from({length:n},()=>[]);` | `var g=new List<List<int>>();`      |
| **Add Edge (u→v)**      | `g[u].push_back(v);`                    | `g[u].push(v);`             | `g[u]=append(g[u],v)` | `g.get(u).add(v);`                                   | `g[u].append(v)`           | `g[u].push(v)`                         | `g[u].Add(v);`                      |
| **Add Undirected Edge** | `g[u].push_back(v); g[v].push_back(u);` | Same                        | Same                  | Same                                                 | Same                       | Same                                   | Same                                |
| **Neighbors**           | `g[u]`                                  | `&g[u]`                     | `g[u]`                | `g.get(u)`                                           | `g[u]`                     | `g[u]`                                 | `g[u]`                              |
| **Degree**              | `g[u].size()`                           | `g[u].len()`                | `len(g[u])`           | `g.get(u).size()`                                    | `len(g[u])`                | `g[u].length`                          | `g[u].Count`                        |
| **Iterate Neighbors**   | `for(int v:g[u])`                       | `for &v in &g[u]`           | `for _,v:=range g[u]` | `for(int v:g.get(u))`                                | `for v in g[u]`            | `for(const v of g[u])`                 | `foreach(var v in g[u])`            |
| **Vertices**            | `g.size()`                              | `g.len()`                   | `len(g)`              | `g.size()`                                           | `len(g)`                   | `g.length`                             | `g.Count`                           |
| **Clear Graph**         | `g.clear()`                             | `g.clear()`                 | `g=nil`               | `g.clear()`                                          | `g.clear()`                | `g=[]`                                 | `g.Clear()`                         |

---

# Weighted Graph

Instead of storing only neighbors, store **(neighbor, weight)**.

| Language   | Representation                  |
| ---------- | ------------------------------- |
| C++        | `vector<vector<pair<int,int>>>` |
| Rust       | `Vec<Vec<(usize,i32)>>`         |
| Go         | `[][]Edge`                      |
| Java       | `ArrayList<ArrayList<Pair>>`    |
| Python     | `list[list[tuple]]`             |
| JavaScript | `[[[v,w],...]]`                 |
| C#         | `List<List<(int,int)>>`         |

Example:

```text
0 --5--> 1
0 --2--> 2
```

Adjacency List

```text
0 : (1,5) (2,2)
1 :
2 :
```

---

# Notes

### C++

```cpp
vector<vector<int>> graph(n);
```

Most common graph representation.

---

### Rust

```rust
let mut graph = vec![vec![]; n];
```

Each vertex owns a vector of neighbors.

---

### Go

```go
graph := make([][]int, n)
```

Very concise.

---

### Java

```java
ArrayList<ArrayList<Integer>> graph = new ArrayList<>();

for(int i=0;i<n;i++)
    graph.add(new ArrayList<>());
```

---

### Python

```python
graph = [[] for _ in range(n)]
```

Probably the most common graph representation in Python CP.

---

### JavaScript

```javascript
let graph =
    Array.from({length:n},()=>[]);
```

---

### C#

```csharp
var graph = new List<List<int>>();

for(int i=0;i<n;i++)
    graph.Add(new List<int>());
```

---

# Adjacency List vs Adjacency Matrix

| Feature           | Adjacency List | Adjacency Matrix |
| ----------------- | -------------- | ---------------- |
| Space             | **O(V+E)**     | **O(V²)**        |
| Add Edge          | O(1)           | O(1)             |
| Check Edge (u,v)  | O(degree)      | O(1)             |
| Iterate Neighbors | O(degree)      | O(V)             |
| Sparse Graphs     | ✅ Excellent    | ❌ Wasteful       |
| Dense Graphs      | Good           | ✅ Better         |

Example

Graph

```text
0 -- 1
|    |
2 -- 3
```

Adjacency List

```text
0 : 1 2
1 : 0 3
2 : 0 3
3 : 1 2
```

Adjacency Matrix

```text
    0 1 2 3

0 : 0 1 1 0
1 : 1 0 0 1
2 : 1 0 0 1
3 : 0 1 1 0
```

---

# Common Competitive Programming Uses

* DFS
* BFS
* Topological Sort
* Cycle Detection
* Connected Components
* Bipartite Graph
* Dijkstra
* Bellman-Ford
* Floyd-Warshall
* Prim's MST
* Kruskal's MST (graph + DSU)
* Tarjan's Algorithm
* Kosaraju's Algorithm
* Bridges & Articulation Points
* Lowest Common Ancestor (Tree)

---

# Time Complexity

| Operation         | Complexity    |
| ----------------- | ------------- |
| Add Edge          | **O(1)**      |
| Iterate Neighbors | **O(degree)** |
| DFS               | **O(V + E)**  |
| BFS               | **O(V + E)**  |
| Memory            | **O(V + E)**  |

### Why use an adjacency list?

Almost every graph algorithm repeatedly asks, **"Who are the neighbors of this vertex?"** An adjacency list answers that efficiently by storing only the existing edges, making it the standard representation for competitive programming.
