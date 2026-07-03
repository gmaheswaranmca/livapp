# Fenwick Tree (Binary Indexed Tree - BIT) Operations Comparison

> A **Fenwick Tree (BIT)** is a specialized data structure for **prefix sum** and **point update** operations.
>
> It supports:
>
> * **Update(index, delta)** → Add a value at an index.
> * **Prefix Sum(index)** → Sum from `1` to `index`.
> * **Range Sum(l, r)** → `prefix(r) - prefix(l-1)`.

Internally, it uses **one array** (`bit[]`) and bit manipulation (`i & -i`).

---

| Operation          | C++                   | Rust            | Go                | Java            | Python          | JavaScript               | C#              |
| ------------------ | --------------------- | --------------- | ----------------- | --------------- | --------------- | ------------------------ | --------------- |
| **Data Structure** | `vector<int>`         | `Vec<i32>`      | `[]int`           | `int[]`         | `list`          | `Array`                  | `int[]`         |
| **BIT Array**      | `bit`                 | `bit`           | `bit`             | `bit`           | `bit`           | `bit`                    | `bit`           |
| **Initialize**     | `bit.assign(n+1,0)`   | `vec![0;n+1]`   | `make([]int,n+1)` | `new int[n+1]`  | `[0]*(n+1)`     | `new Array(n+1).fill(0)` | `new int[n+1]`  |
| **Point Update**   | `update(i,val)`       | `update(i,val)` | `Update(i,val)`   | `update(i,val)` | `update(i,val)` | `update(i,val)`          | `Update(i,val)` |
| **Prefix Sum**     | `query(i)`            | `query(i)`      | `Query(i)`        | `query(i)`      | `query(i)`      | `query(i)`               | `Query(i)`      |
| **Range Sum**      | `query(r)-query(l-1)` | Same            | Same              | Same            | Same            | Same                     | Same            |
| **Build**          | Repeated updates      | Same            | Same              | Same            | Same            | Same                     | Same            |

---

# Internal Structure

Suppose

```text
Index

1 2 3 4 5 6 7 8
```

Fenwick Tree stores

```text
bit[]

1
2
3
4
5
6
7
8
```

Each position stores a **partial prefix sum**, not the original array.

---

# Lowest Set Bit

Fenwick Tree works because of

```text
i & -i
```

Example

| i | Binary | i & -i |
| - | ------ | ------ |
| 1 | 0001   | 1      |
| 2 | 0010   | 2      |
| 3 | 0011   | 1      |
| 4 | 0100   | 4      |
| 5 | 0101   | 1      |
| 6 | 0110   | 2      |
| 7 | 0111   | 1      |
| 8 | 1000   | 8      |

---

# Point Update

Suppose

```text
add 5 at index 3
```

Fenwick updates

```text
3

↓

4

↓

8

↓

16 ...
```

Pseudo

```text
while i <= n
    bit[i] += val
    i += i & -i
```

---

# Prefix Sum

Need

```text
sum(1...7)
```

Traverse

```text
7

↓

6

↓

4

↓

0
```

Pseudo

```text
ans = 0

while i > 0
    ans += bit[i]
    i -= i & -i
```

---

# Range Sum

Need

```text
sum(4...8)
```

Formula

```text
query(8)

-

query(3)
```

---

# Typical Functions

Every language implements the same functions.

## C++

```cpp
update(i,val)

query(i)

rangeQuery(l,r)
```

---

## Rust

```rust
update(i,val)

query(i)

range_query(l,r)
```

---

## Go

```go
Update(i,val)

Query(i)

RangeQuery(l,r)
```

---

## Java

```java
update(i,val)

query(i)

rangeQuery(l,r)
```

---

## Python

```python
update(i,val)

query(i)

range_query(l,r)
```

---

## JavaScript

```javascript
update(i,val)

query(i)

rangeQuery(l,r)
```

---

## C#

```csharp
Update(i,val)

Query(i)

RangeQuery(l,r)
```

---

# Time Complexity

| Operation                | Complexity     |
| ------------------------ | -------------- |
| Build (repeated updates) | **O(n log n)** |
| Point Update             | **O(log n)**   |
| Prefix Sum               | **O(log n)**   |
| Range Sum                | **O(log n)**   |
| Memory                   | **O(n)**       |

---

# Fenwick Tree vs Prefix Sum

| Operation  | Prefix Sum | Fenwick Tree |
| ---------- | ---------- | ------------ |
| Build      | O(n)       | O(n log n)*  |
| Update     | O(n)       | **O(log n)** |
| Prefix Sum | O(1)       | **O(log n)** |
| Range Sum  | O(1)       | **O(log n)** |

* A linear `O(n)` build exists but is less commonly used in competitive programming. Most templates build the tree using repeated updates.

---

# Fenwick Tree vs Segment Tree

| Feature          | Fenwick Tree | Segment Tree |
| ---------------- | ------------ | ------------ |
| Code Size        | ⭐ Very Small | Large        |
| Memory           | O(n)         | O(4n)        |
| Prefix Sum       | ✅            | ✅            |
| Range Sum        | ✅            | ✅            |
| Min / Max        | ❌            | ✅            |
| GCD              | ❌            | ✅            |
| XOR              | ❌            | ✅            |
| Lazy Propagation | ❌            | ✅            |
| Simplicity       | ⭐⭐⭐⭐⭐        | ⭐⭐⭐          |

---

# Common Competitive Programming Uses

* Prefix Sum Queries
* Range Sum Queries
* Dynamic Frequency Counting
* Inversion Count
* Order Statistics (with coordinate compression)
* Counting Smaller Elements
* Offline Query Processing
* Coordinate Compression Problems

---

# Typical Fenwick Tree Template

Every implementation has the same structure:

```text
bit[]

initialize(n)

update(index, delta)

query(index)

rangeQuery(left, right)
```

Unlike arrays, stacks, or maps, a **Fenwick Tree is not built into any of these languages**. In competitive programming, you'll implement this reusable template yourself. It is much shorter than a Segment Tree (typically 15–25 lines) and is the preferred choice when your problem only requires **point updates** and **prefix/range sum queries**.
