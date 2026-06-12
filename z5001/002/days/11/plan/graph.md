# Graphs – Notes (Interview + LeetCode)

---

# 1. What is a Graph?

A Graph is a collection of:

* **Vertices (Nodes)** → points
* **Edges** → connections between points

Example:

```text
A ----- B
|       |
|       |
C ----- D
```

Nodes = A, B, C, D

Edges = (A,B), (A,C), (B,D), (C,D)

---

# 2. Real World Examples

### Social Network

```text
Alice ---- Bob
  |
  |
Charlie
```

People = Nodes

Friendships = Edges

---

### Google Maps

Cities = Nodes

Roads = Edges

---

### Internet

Computers = Nodes

Connections = Edges

---

# 3. Types of Graphs

---

## A. Undirected Graph

Road works both ways.

```text
A ----- B
```

Meaning:

```text
A -> B
B -> A
```

Example:

Friendship

---

## B. Directed Graph (Digraph)

Direction exists.

```text
A ----> B
```

Meaning:

A can reach B

B may not reach A

Example:

Instagram Follow

---

## C. Weighted Graph

Edge has cost.

```text
A --5-- B
```

Weight = 5

Example:

Distance between cities

---

## D. Unweighted Graph

No cost.

```text
A ----- B
```

All edges assumed equal.

---

## E. Cyclic Graph

Contains cycle.

```text
A -> B
^    |
|    v
D <- C
```

Cycle exists.

---

## F. Acyclic Graph

No cycle.

```text
A
|
v
B
|
v
C
```

No cycle.

---

# 4. Graph Terminology

---

## Vertex

Node

```text
A
```

---

## Edge

Connection

```text
A ---- B
```

---

## Degree

Number of edges connected.

```text
A -- B
|
C
```

Degree(A)=2

---

## In-degree

Incoming edges.

```text
A -> B <- C
```

InDegree(B)=2

---

## Out-degree

Outgoing edges.

```text
A -> B
|
v
C
```

OutDegree(A)=2

---

## Path

Route from one node to another.

```text
A -> B -> C
```

Path = A→B→C

Length = 2 edges

---

## Cycle

Start and end same node.

```text
A -> B -> C -> A
```

---

## Connected Graph

Every node reachable.

```text
A -- B -- C
```

Connected

---

## Disconnected Graph

```text
A -- B

C -- D
```

Disconnected

---

# 5. Graph Representation

Most important interview topic.

---

## Method 1: Edge List

Store edges only.

```text
0 -- 1
0 -- 2
1 -- 3
```

```python
edges = [
 [0,1],
 [0,2],
 [1,3]
]
```

Space:

```text
O(E)
```

---

## Method 2: Adjacency Matrix

```text
     0 1 2 3
0 -> 0 1 1 0
1 -> 1 0 0 1
2 -> 1 0 0 0
3 -> 0 1 0 0
```

Meaning:

Matrix[i][j]=1

If edge exists.

Space:

```text
O(V²)
```

Good for dense graph.

---

## Method 3: Adjacency List ⭐ Most Important

Graph:

```text
0 -- 1
|
2
|
3
```

Store:

```python
0 : [1,2]
1 : [0]
2 : [0,3]
3 : [2]
```

Space:

```text
O(V+E)
```

Most used in interviews.

---

# 6. Graph Traversal

Two kings of Graphs:

1. BFS
2. DFS

---

# 7. BFS (Breadth First Search)

Level by level traversal.

Uses:

```text
Queue
```

---

Example

```text
      0
    /   \
   1     2
  / \
 3   4
```

Start = 0

Visit order:

```text
0
1 2
3 4
```

Result:

```text
0 1 2 3 4
```

---

## BFS Algorithm

```text
Put source in queue

While queue not empty

    Remove front

    Visit node

    Add unvisited neighbors
```

---

## Complexity

```text
Time  = O(V+E)

Space = O(V)
```

---

# 8. DFS (Depth First Search)

Go deep first.

Uses:

```text
Stack
```

or

```text
Recursion
```

---

Example

```text
      0
    /   \
   1     2
  / \
 3   4
```

Possible DFS:

```text
0 1 3 4 2
```

---

## DFS Algorithm

```text
Visit node

For every neighbor

    DFS(neighbor)
```

---

## Complexity

```text
Time = O(V+E)

Space = O(V)
```

---

# 9. BFS vs DFS

| BFS                      | DFS             |
| ------------------------ | --------------- |
| Queue                    | Stack           |
| Level order              | Depth order     |
| Shortest path            | Not guaranteed  |
| More memory              | Less memory     |
| Unweighted shortest path | Cycle detection |

---

# 10. Detect Cycle

---

## Undirected Graph

Track:

```text
visited
parent
```

If visited neighbor is not parent

Cycle found.

---

## Directed Graph

Track:

```text
visited
recursion stack
```

If node appears again in recursion stack

Cycle found.

---

# 11. Topological Sort

Used for:

```text
Course Schedule
Task Ordering
Build Systems
```

Only for:

```text
DAG
(Directed Acyclic Graph)
```

---

Example

```text
A -> B
A -> C
B -> D
C -> D
```

Possible answer:

```text
A B C D
```

or

```text
A C B D
```

---

# 12. Shortest Path

---

## Unweighted Graph

Use:

```text
BFS
```

Complexity:

```text
O(V+E)
```

---

## Weighted Graph

Use:

### Dijkstra

Positive weights only.

---

## Negative Weights

Use:

### Bellman Ford

---

# 13. Minimum Spanning Tree (MST)

Connect all nodes with:

```text
Minimum cost
No cycle
```

---

Algorithms:

### Prim's

Uses Priority Queue.

---

### Kruskal's

Uses:

```text
Sorting
+
Union Find
```

---

# 14. Union Find (Disjoint Set)

Supports:

```text
Find(x)
Union(x,y)
```

Used in:

* Kruskal
* Cycle Detection
* Connected Components

---

Optimizations:

```text
Path Compression

Union by Rank
```

---

# 15. Important Graph Patterns

---

## Pattern 1

Traversal

Questions:

* DFS
* BFS

Examples:

* 200 Number of Islands
* 695 Max Area of Island

---

## Pattern 2

Connected Components

Count groups.

Example:

* 547 Friend Circles
* 323 Connected Components

---

## Pattern 3

Cycle Detection

Example:

* 207 Course Schedule

---

## Pattern 4

Shortest Path

Example:

* 127 Word Ladder
* 752 Open Lock

---

## Pattern 5

Topological Sort

Example:

* 210 Course Schedule II

---

## Pattern 6

Union Find

Example:

* 684 Redundant Connection

---

# 16. Learning Order for Graphs

### Stage 1 (Basics)

1. 1971 Find if Path Exists in Graph
2. 841 Keys and Rooms
3. 997 Find the Town Judge

---

### Stage 2 (BFS/DFS)

4. 200 Number of Islands
5. 695 Max Area of Island
6. 733 Flood Fill

---

### Stage 3 (Connected Components)

7. 547 Number of Provinces
8. 323 Connected Components

---

### Stage 4 (Topological Sort)

9. 207 Course Schedule
10. 210 Course Schedule II

---

### Stage 5 (Shortest Path)

11. 127 Word Ladder
12. 752 Open Lock

---

### Stage 6 (Union Find)

13. 684 Redundant Connection
14. 1319 Number of Operations to Make Network Connected

---

# 17. Graph Interview Cheat Sheet

```text
Need traversal?
    BFS / DFS

Need shortest path?
    BFS (unweighted)
    Dijkstra (weighted)

Need cycle?
    DFS
    Union Find

Need connected components?
    DFS / BFS / Union Find

Need task ordering?
    Topological Sort

Need minimum cost connection?
    MST

Need grouping?
    Union Find
```
