# What is Backtracking?

**Backtracking** is a problem-solving technique where we:

1. Make a choice.
2. Explore the consequences of that choice.
3. If the choice leads to a dead end, undo it.
4. Try another choice.

Think of it as:

```text
Choose
↓
Explore
↓
Success?
├─ Yes → Save answer
└─ No  → Undo (Backtrack)
          ↓
       Try next choice
```

---

# Real-Life Example: Maze

Suppose you're in a maze.

```text
S . .
X X .
. . E
```

* S = Start
* E = Exit
* X = Blocked

You try:

```text
Right
↓
Right
↓
Down
↓
Down
```

If a path gets blocked:

```text
Right
↓
Down
↓
Blocked
```

You go back to the previous position and try another direction.

This "go back and try again" is **backtracking**.

---

# Core Idea

At every step:

```text
1. Choose
2. Recurse
3. Undo
```

Template:

```text
choose

backtrack(next state)

undo choice
```

---

# Example: Subsets

Input:

```text
[1,2]
```

Decision Tree:

```text
                    []
                 /      \
              Take 1   Skip 1
              /   \     /   \
           Take2 Skip2 Take2 Skip2

```

Generated subsets:

```text
[1,2]
[1]
[2]
[]
```

We explore all possibilities.

---

# Why "Back" Tracking?

Suppose current subset is:

```text
[1,2]
```

After saving:

```text
Undo 2
```

Now subset becomes:

```text
[1]
```

Then try other possibilities.

```text
[1,2]
   ↑
remove 2
   ↑
[1]
```

The act of undoing is called **backtracking**.

---

# Generic Backtracking Algorithm

```text
FUNCTION backtrack(state)

    IF solution found
        save answer
        RETURN

    FOR every possible choice

        choose

        backtrack(next state)

        undo choice

END FUNCTION
```

---

# Example: Permutations

Input:

```text
[1,2,3]
```

Build permutation:

```text
[]
```

Choose:

```text
[1]
```

Choose:

```text
[1,2]
```

Choose:

```text
[1,2,3]
```

Save answer.

Now backtrack:

```text
remove 3
```

Try:

```text
[1,3]
```

Continue.

Tree:

```text
            []
        /    |    \
       1     2     3
      / \   / \   / \
     2  3  1  3 1   2
```

---

# How Recursion and Backtracking Work Together

Recursion goes deeper:

```text
Choose
↓
Choose
↓
Choose
↓
Solution
```

Backtracking comes back:

```text
Undo
↑
Undo
↑
Undo
```

Visualization:

```text
Forward  → Recursion

Backward → Backtracking
```

---

# Common Backtracking Problems

* Subsets
* Permutations
* Combinations
* Combination Sum
* N-Queens
* Sudoku Solver
* Word Search
* Rat in a Maze
* Knight's Tour
* Palindrome Partitioning
* Generate Parentheses

---

# When Should You Think of Backtracking?

Look for phrases like:

```text
Find all possible...
Generate all...
List all...
Return every...
Count all valid...
```

Examples:

```text
Generate all subsets
Generate all permutations
Find all paths
Place N queens
Solve Sudoku
```

These usually suggest backtracking.

---

# The Universal Backtracking Template

```text
FUNCTION backtrack(state)

    IF state is complete
        save answer
        RETURN

    FOR each valid choice

        choose

        backtrack(next state)

        unchoose

END FUNCTION
```

Remember:

```text
Backtracking
=
Recursion
+
Try a choice
+
Undo the choice
```

The **undo (unchoose)** step is what distinguishes backtracking from ordinary recursion.
