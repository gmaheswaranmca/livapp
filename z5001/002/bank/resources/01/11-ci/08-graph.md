📗 *Coding Interview – Part 8: Graphs* 🌐🔍  

✅ *Q1. Number of Islands (LeetCode)*  
*Problem:* Count islands in a 2D grid (DFS/BFS).  
```python
def numIslands(grid):
    if not grid: return 0
    rows, cols = len(grid), len(grid)
    def dfs(r,c):
        if r<0 or c<0 or r>=rows or c>=cols or grid[r][c]=='0': return
        grid[r][c]='0'
        dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1)
    count=0
    for i in range(rows):
        for j in range(cols):
            if grid[i][j]=='1':
                dfs(i,j)
                count+=1
    return count
```

✅ *Q2. Clone Graph (Amazon)*  
*Problem:* Deep copy of an undirected graph.  
```python
def cloneGraph(node):
    if not node: return None
    oldToNew = {}
    def dfs(n):
        if n in oldToNew:
            return oldToNew[n]
        copy = Node(n.val)
        oldToNew[n] = copy
        for nei in n.neighbors:
            copy.neighbors.append(dfs(nei))
        return copy
    return dfs(node)
```

✅ *Q3. Course Schedule (Microsoft)*  
*Problem:* Detect cycle in a directed graph (Can we finish all courses?)  
```python
def canFinish(numCourses, prerequisites):
    graph = {i: [] for i in range(numCourses)}
    for course, pre in prerequisites:
        graph[course].append(pre)
    visited = set()
    def dfs(course):
        if course in visiting: return False
        if course in visited: return True
        visiting.add(course)
        for pre in graph[course]:
            if not dfs(pre):
                return False
        visiting.remove(course)
        visited.add(course)
        return True
    visiting = set()
    for c in range(numCourses):
        if not dfs(c):
            return False
    return True
```

✅ *Q4. Bipartite Graph (Google)*  
*Problem:* Check if graph is bipartite using BFS.  
```python
from collections import deque
def isBipartite(graph):
    color = {}
    for node in range(len(graph)):
        if node not in color:
            color[node] = 0
            queue = deque([node])
            while queue:
                current = queue.popleft()
                for nei in graph[current]:
                    if nei not in color:
                        color[nei] = 1 - color[current]
                        queue.append(nei)
                    elif color[nei] == color[current]:
                        return False
    return True
```

✅ *Q5. Dijkstra’s Algorithm (Hard)*  
*Problem:* Find shortest path from source to all vertices in weighted graph.  
```python
import heapq
def dijkstra(graph, start):
    heap, dist = [(0,start)], {v: float('inf') for v in graph}
    dist[start] = 0
    while heap:
        cost, u = heapq.heappop(heap)
        if cost > dist[u]: continue
        for v, w in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(heap, (dist[v], v))
    return dist
```
