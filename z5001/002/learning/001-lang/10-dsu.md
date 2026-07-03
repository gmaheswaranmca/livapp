# Disjoint Set Union (DSU / Union-Find) Operations Comparison

> A **Disjoint Set Union (DSU)**, also called **Union-Find**, efficiently maintains a collection of disjoint sets. It supports two primary operations:
>
> * **Find(x)** → Find the representative (root) of the set containing `x`.
> * **Union(x, y)** → Merge the sets containing `x` and `y`.

DSU is typically implemented using two arrays:

* `parent[]`
* `rank[]` or `size[]`

With **Path Compression** and **Union by Rank/Size**, operations are nearly **O(1)** (technically **O(α(n))**, where α is the inverse Ackermann function).

---

| Operation             | C++                | Rust            | Go              | Java            | Python          | JavaScript      | C#              |
| --------------------- | ------------------ | --------------- | --------------- | --------------- | --------------- | --------------- | --------------- |
| **Data Structure**    | `vector<int>`      | `Vec<usize>`    | `[]int`         | `int[]`         | `list`          | `Array`         | `int[]`         |
| **Parent Array**      | `parent`           | `parent`        | `parent`        | `parent`        | `parent`        | `parent`        | `parent`        |
| **Rank / Size Array** | `rank` / `size`    | `rank` / `size` | `rank` / `size` | `rank` / `size` | `rank` / `size` | `rank` / `size` | `rank` / `size` |
| **Initialize**        | `parent[i]=i`      | `parent[i]=i`   | `parent[i]=i`   | `parent[i]=i`   | `parent[i]=i`   | `parent[i]=i`   | `parent[i]=i`   |
| **Find(x)**           | Recursive          | Recursive       | Recursive       | Recursive       | Recursive       | Recursive       | Recursive       |
| **Union(x,y)**        | By Rank/Size       | By Rank/Size    | By Rank/Size    | By Rank/Size    | By Rank/Size    | By Rank/Size    | By Rank/Size    |
| **Connected(x,y)**    | `find(x)==find(y)` | Same            | Same            | Same            | Same            | Same            | Same            |
| **Components Count**  | Maintain variable  | Same            | Same            | Same            | Same            | Same            | Same            |

---

# Initialization

Initialize every node as its own parent.

```text
0 1 2 3 4

parent

0 1 2 3 4
```

Every node is a separate component.

---

# Find

Find returns the root of a node.

Example

```text
parent

0
↑
1
↑
2
↑
3
```

```text
find(3)

↓

0
```

---

# Path Compression

Before

```text
3

↓

2

↓

1

↓

0
```

After

```text
3

↓

0

2

↓

0

1

↓

0
```

Future finds become almost constant time.

---

# Union

Suppose

```text
1

2
```

Union

```text
union(1,2)
```

Result

```text
1

↓

2
```

(or vice versa)

---

# Union by Rank

Always attach the **smaller tree** under the **larger tree**.

Bad

```text
1

↓

2

↓

3

↓

4
```

Good

```text
    1
   / \
  2   3
      |
      4
```

This keeps the tree shallow.

---

# Connected

Simply compare roots.

```text
connected(a,b)

↓

find(a)==find(b)
```

---

# Standard Functions

Every language implements exactly these three functions.

## C++

```cpp
find(x)

union_sets(a,b)

connected(a,b)
```

---

## Rust

```rust
find(x)

union(x,y)

connected(x,y)
```

---

## Go

```go
Find(x)

Union(x,y)

Connected(x,y)
```

---

## Java

```java
find(x)

union(x,y)

connected(x,y)
```

---

## Python

```python
find(x)

union(x,y)

connected(x,y)
```

---

## JavaScript

```javascript
find(x)

union(x,y)

connected(x,y)
```

---

## C#

```csharp
Find(x)

Union(x,y)

Connected(x,y)
```

---

# Time Complexity

| Operation  | Complexity  |
| ---------- | ----------- |
| Initialize | **O(n)**    |
| Find       | **O(α(n))** |
| Union      | **O(α(n))** |
| Connected  | **O(α(n))** |

> **α(n)** (inverse Ackermann function) grows so slowly that for all practical input sizes (even billions of elements), it is less than 5. In competitive programming, we effectively treat `Find` and `Union` as **constant time**.

---

# Common Competitive Programming Uses

* Connected Components
* Dynamic Connectivity Queries
* Network Connectivity
* Friend Circles
* Number of Provinces
* Redundant Connection
* Cycle Detection in Undirected Graphs
* Kruskal's Minimum Spanning Tree
* Accounts Merge
* Similar String Groups
* Offline Graph Queries

---

# Typical DSU Template

Every implementation, regardless of language, has the same structure:

```text
parent[]
rank[] or size[]

initialize(n)

find(x)

union(x, y)

connected(x, y)
```

Unlike stacks, queues, or maps, **DSU is not a built-in data structure in most languages**. In competitive programming, you'll almost always write this small template yourself and reuse it across problems.
