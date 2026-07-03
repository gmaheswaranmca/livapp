If we **normalize Python (CPython) = 1**, a reasonable approximation for general-purpose algorithms is:

| Language             | Relative Speed (Python = 1) |
| -------------------- | --------------------------: |
| Python (CPython)     |                       **1** |
| JavaScript (Node.js) |                    **5–20** |
| C#                   |                   **20–40** |
| Java                 |                   **20–50** |
| Go                   |                   **25–60** |
| Rust                 |                  **50–100** |
| C++                  |                  **50–100** |

Or using a single representative value:

| Language   | Speed Index |
| ---------- | ----------: |
| Python     |       **1** |
| JavaScript |      **10** |
| C#         |      **25** |
| Java       |      **30** |
| Go         |      **35** |
| Rust       |      **75** |
| C++        |      **80** |

Think of this as:

```text
Python      = 1
JavaScript  = 10
C#          = 25
Java        = 30
Go          = 35
Rust        = 75
C++         = 80
```

### Notes

* **Java** and **C#** can sometimes match or even beat C++ on long-running workloads after JIT optimization.
* **Go** performs very well for concurrent server applications but is not always faster than Java for CPU-bound tasks.
* **Rust** and **C++** are usually within a few percent of each other. Depending on the code and compiler optimizations, either can be slightly faster.
* **Python**'s speed changes dramatically if you use optimized libraries like NumPy, because the heavy computation is done in compiled C code rather than Python itself.

For **competitive programming**, I'd summarize them like this:

```text
Python      █
JavaScript  ██████████
C#          █████████████████████████
Java        ██████████████████████████████
Go          ███████████████████████████████████
Rust        ███████████████████████████████████████████████████████████████████
C++         ████████████████████████████████████████████████████████████████████████
```

These are **rule-of-thumb** values rather than fixed benchmark results. Actual performance depends on the algorithm, compiler, runtime, data structures, and workload.
