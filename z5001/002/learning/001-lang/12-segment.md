# Segment Tree Operations Comparison

> A **Segment Tree** is a binary tree that efficiently supports **range queries** and **updates**. Unlike a Fenwick Tree, it can answer queries for many associative operations such as **sum**, **minimum**, **maximum**, **GCD**, **XOR**, etc.

---

| Operation          | C++                | Rust       | Go         | Java       | Python     | JavaScript | C#         |
| ------------------ | ------------------ | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- |
| **Data Structure** | `vector<int>`      | `Vec<i32>` | `[]int`    | `int[]`    | `list`     | `Array`    | `int[]`    |
| **Tree Array**     | `tree`             | `tree`     | `tree`     | `tree`     | `tree`     | `tree`     | `tree`     |
| **Size**           | `4*n`              | `4*n`      | `4*n`      | `4*n`      | `4*n`      | `4*n`      | `4*n`      |
| **Build**          | `build(node,l,r)`  | `build()`  | `Build()`  | `build()`  | `build()`  | `build()`  | `Build()`  |
| **Point Update**   | `update(node,l,r)` | `update()` | `Update()` | `update()` | `update()` | `update()` | `Update()` |
| **Range Query**    | `query(node,l,r)`  | `query()`  | `Query()`  | `query()`  | `query()`  | `query()`  | `Query()`  |
| **Lazy Update**    | `lazy[]`           | `lazy`     | `lazy`     | `lazy`     | `lazy`     | `lazy`     | `lazy`     |

---

# Internal Structure

Suppose

```text
Array

2 5 1 4 9 3 7 6
```

The Segment Tree stores interval information.

```text
                 [1..8]

           /                \

      [1..4]              [5..8]

      /    \              /     \

   [1..2] [3..4]      [5..6] [7..8]

   /  \     /  \        /  \    /  \

 [1] [2] [3] [4]     [5] [6] [7] [8]
```

Each node stores information for its interval.

For example

```text
tree[node]

=

sum

or

minimum

or

maximum
```

---

# Build

Pseudo

```text
build(node,l,r)

if l==r

    tree[node]=arr[l]

else

    mid=(l+r)/2

    build(left)

    build(right)

    tree[node]=merge(left,right)
```

---

# Point Update

Example

```text
arr[4]=100
```

Only the nodes on the path from the leaf to the root are updated.

Pseudo

```text
update(node,l,r,index,value)

go to leaf

update value

recompute parents
```

---

# Range Query

Need

```text
sum(3...7)
```

The tree visits only the relevant segments.

Pseudo

```text
query(node,l,r)

No overlap

↓

return identity

Complete overlap

↓

return tree[node]

Partial overlap

↓

query(left)+query(right)
```

---

# Lazy Propagation

Suppose

```text
add 5

to

100000 elements
```

Without Lazy Propagation

```text
O(n)
```

With Lazy Propagation

```text
O(log n)
```

Updates are postponed until required.

Additional array

```text
lazy[]
```

stores pending updates.

---

# Typical Functions

Every language implements the same functions.

## C++

```cpp
build()

update()

query()
```

---

## Rust

```rust
build()

update()

query()
```

---

## Go

```go
Build()

Update()

Query()
```

---

## Java

```java
build()

update()

query()
```

---

## Python

```python
build()

update()

query()
```

---

## JavaScript

```javascript
build()

update()

query()
```

---

## C#

```csharp
Build()

Update()

Query()
```

---

# Time Complexity

| Operation           | Complexity   |
| ------------------- | ------------ |
| Build               | **O(n)**     |
| Point Update        | **O(log n)** |
| Range Query         | **O(log n)** |
| Range Update (Lazy) | **O(log n)** |
| Memory              | **O(4n)**    |

---

# Fenwick Tree vs Segment Tree

| Feature          | Fenwick Tree | Segment Tree |
| ---------------- | ------------ | ------------ |
| Build            | O(n)*        | **O(n)**     |
| Point Update     | O(log n)     | O(log n)     |
| Prefix Sum       | ✅            | ✅            |
| Range Sum        | ✅            | ✅            |
| Range Min        | ❌            | ✅            |
| Range Max        | ❌            | ✅            |
| GCD              | ❌            | ✅            |
| XOR              | ❌            | ✅            |
| Lazy Propagation | ❌            | ✅            |
| Memory           | O(n)         | O(4n)        |
| Code Size        | Small        | Larger       |

* A Fenwick Tree also has an `O(n)` build algorithm, though many competitive programming templates use repeated updates (`O(n log n)`).

---

# Segment Tree vs Prefix Sum

| Operation    | Prefix Sum | Segment Tree    |
| ------------ | ---------- | --------------- |
| Build        | O(n)       | O(n)            |
| Query        | O(1)       | O(log n)        |
| Update       | O(n)       | O(log n)        |
| Range Update | O(n)       | O(log n) (Lazy) |

---

# Common Competitive Programming Uses

* Range Sum Query
* Range Minimum Query (RMQ)
* Range Maximum Query
* Range GCD
* Range XOR
* Dynamic Interval Queries
* Lazy Range Updates
* Interval Scheduling
* Counting Problems
* Coordinate Compression + Queries
* Heavy-Light Decomposition (HLD)
* Persistent Segment Tree Problems

---

# Typical Segment Tree Template

Every implementation has the same structure:

```text
tree[]

(optional)

lazy[]

build(node, left, right)

update(node, left, right, ...)

query(node, left, right, ...)
```

Unlike stacks, queues, or maps, a **Segment Tree is not a built-in data structure**. In competitive programming, you'll implement this reusable template yourself. It is more flexible than a Fenwick Tree and is the standard choice whenever you need **general range queries**, **custom merge operations**, or **lazy propagation for efficient range updates**.
