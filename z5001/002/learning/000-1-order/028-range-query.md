You're probably thinking of the major **Range Query / Update** data structures:

```text
Prefix Sum
↓
Difference Array
↓
Fenwick Tree (Binary Indexed Tree - BIT)
↓
Segment Tree
↓
Lazy Propagation Segment Tree
```

The one people usually forget after **Fenwick Tree** is **Segment Tree**.

---

# Learning Order

## Phase 1: Prefix Sum

* 303 - Range Sum Query - Immutable
* 304 - Range Sum Query 2D - Immutable
* 560 - Subarray Sum Equals K

---

## Phase 2: Difference Array

* 370 - Range Addition
* 1094 - Car Pooling
* 1109 - Corporate Flight Bookings

---

## Phase 3: Fenwick Tree (BIT)

### Concepts

```text
Point Update
+
Prefix Query
```

Operations:

```text
update(i,val)
query(i)
rangeSum(l,r)
```

Time:

```text
Update : O(log n)
Query  : O(log n)
Space  : O(n)
```

### LeetCode Practice

1. **307** - Range Sum Query - Mutable
2. **315** - Count of Smaller Numbers After Self
3. **493** - Reverse Pairs
4. **327** - Count of Range Sum

---

## Phase 4: Segment Tree

### Concepts

```text
Range Query
+
Point Update
```

Operations:

```text
Build
Query
Update
```

Time:

```text
Build  : O(n)
Query  : O(log n)
Update : O(log n)
```

### LeetCode Practice

5. **307** - Range Sum Query - Mutable
6. **308** - Range Sum Query 2D - Mutable
7. **729** - My Calendar I
8. **731** - My Calendar II
9. **732** - My Calendar III

---

## Phase 5: Lazy Propagation

### Concepts

```text
Range Update
+
Range Query
```

Without Lazy:

```text
O(n)
```

With Lazy:

```text
O(log n)
```

### LeetCode Practice

10. **699** - Falling Squares
11. **715** - Range Module
12. **732** - My Calendar III

---

# Fenwick vs Segment Tree

| Feature             | Fenwick Tree | Segment Tree |
| ------------------- | ------------ | ------------ |
| Implementation      | Easy         | Medium       |
| Space               | O(n)         | O(4n)        |
| Prefix Query        | Excellent    | Good         |
| Range Query         | Good         | Excellent    |
| Range Update        | Difficult    | Easy         |
| Lazy Propagation    | No           | Yes          |
| Interview Frequency | Medium       | Very High    |

---

# Complete Learning Path

```text
Prefix Sum
↓
Difference Array
↓
Fenwick Tree
↓
Segment Tree
↓
Lazy Propagation
```

# LeetCode Sequence

```text
303 - Range Sum Query - Immutable
304 - Range Sum Query 2D - Immutable

370 - Range Addition
1094 - Car Pooling

307 - Range Sum Query - Mutable

315 - Count of Smaller Numbers After Self
493 - Reverse Pairs

308 - Range Sum Query 2D - Mutable

729 - My Calendar I
731 - My Calendar II
732 - My Calendar III

699 - Falling Squares
715 - Range Module
```

If you're building a complete DSA roadmap, the advanced tree sequence is:

```text
BST
AVL
Red-Black Tree
Trie
Fenwick Tree (BIT)
Segment Tree
Lazy Segment Tree
B-Tree
B+ Tree
```

These are the major tree-based structures typically studied after standard Binary Trees and BSTs.
