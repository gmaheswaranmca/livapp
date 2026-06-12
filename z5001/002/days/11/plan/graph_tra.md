# BFS Algorithm
```text
Put source in queue
While queue not empty
    Remove front
    Visit node
    Add unvisited neighbors
```

# Recursive vs Stack DFS
## Recursive DFS

```text
DFS(node)
Visit node
FOR each neighbor
    DFS(neighbor)
```


## Iterative DFS

```text
Push start

WHILE stack not empty
    node = Pop()
    Visit node
    Push neighbors
```
