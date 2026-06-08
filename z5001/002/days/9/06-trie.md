# Trie (Prefix Tree)

A **Trie** is a tree-like data structure used to store and search strings efficiently.

It is also called:

* Trie
* Prefix Tree
* Digital Tree

---

# Why Trie?

Suppose we store:

```text
cat
car
care
card
dog
```

Using arrays or linked lists:

```text
Search = O(n)
```

Using hashing:

```text
Search = O(1)
```

but finding prefixes like:

```text
ca
car
do
```

is difficult.

Trie is designed specifically for:

```text
Prefix Search
Autocomplete
Dictionary
Spell Checker
```

---

# Basic Idea

Each node stores:

```text
One Character
```

Example:

Store:

```text
cat
car
dog
```

Trie:

```text
(root)
  / \
 c   d
 |   |
 a   o
 |   |
 t   g
 |
 r
```

More accurately:

```text
(root)
   |
   c
   |
   a
  / \
 t   r

(root)
   |
   d
   |
   o
   |
   g
```

---

# Shared Prefix Advantage

Store:

```text
car
card
care
careful
```

Trie:

```text
(root)
   |
   c
   |
   a
   |
   r
  / \
 d   e
      \
       f
```

Prefix:

```text
car
```

stored only once.

This saves space for common prefixes.

---

# Trie Node Structure

Each node contains:

```text
children[]
isEnd
```

---

## For lowercase letters

```text
26 children
```

```text
CLASS TrieNode

    children[26]

    isEnd

END CLASS
```

---

# Create Node

```text
FUNCTION CreateNode()

    node ← new TrieNode

    FOR i = 0 TO 25

        node.children[i] ← NULL

    node.isEnd ← FALSE

    RETURN node

END FUNCTION
```

---

# Example

Insert:

```text
cat
```

Tree:

```text
root
 |
 c
 |
 a
 |
 t*
```

`*` means:

```text
isEnd = TRUE
```

---

# Insert Operation

Store:

```text
cat
```

---

## Idea

Start from root.

For each character:

```text
c
a
t
```

Create node if missing.

Move forward.

Mark last node as word end.

---

# Insert Pseudocode

```text
FUNCTION Insert(root, word)

    current ← root

    FOR each character ch in word

        index ← ch - 'a'

        IF current.children[index]
           = NULL

            current.children[index]
            ← CreateNode()

        current ←
            current.children[index]

    current.isEnd ← TRUE

END FUNCTION
```

---

# Dry Run

Insert:

```text
cat
```

---

Character:

```text
c
```

Create node.

```text
root
 |
 c
```

---

Character:

```text
a
```

```text
root
 |
 c
 |
 a
```

---

Character:

```text
t
```

```text
root
 |
 c
 |
 a
 |
 t*
```

Done.

---

# Search Operation

Search:

```text
cat
```

---

## Idea

Follow characters.

If any character missing:

```text
FALSE
```

If final node exists and:

```text
isEnd = TRUE
```

then:

```text
TRUE
```

---

# Search Pseudocode

```text
FUNCTION Search(root, word)

    current ← root

    FOR each character ch in word

        index ← ch - 'a'

        IF current.children[index]
           = NULL

            RETURN FALSE

        current ←
            current.children[index]

    RETURN current.isEnd

END FUNCTION
```

---

# Example

Stored:

```text
cat
```

Search:

```text
cat
```

Found:

```text
TRUE
```

---

Search:

```text
ca
```

Node exists.

But:

```text
isEnd = FALSE
```

Return:

```text
FALSE
```

because "ca" is only a prefix.

---

# Prefix Search

Most important Trie operation.

---

Example

Stored:

```text
cat
car
card
care
```

Check:

```text
ca
```

---

Follow:

```text
c
a
```

Exists.

Return:

```text
TRUE
```

---

# StartsWith Pseudocode

```text
FUNCTION StartsWith(root,prefix)

    current ← root

    FOR each character ch

        index ← ch - 'a'

        IF current.children[index]
           = NULL

            RETURN FALSE

        current ←
            current.children[index]

    RETURN TRUE

END FUNCTION
```

---

# Delete Operation

Hardest Trie operation.

---

Suppose:

```text
cat
car
```

Stored.

Trie:

```text
root
 |
 c
 |
 a
 / \
t* r*
```

Delete:

```text
cat
```

Only:

```text
t
```

should disappear.

```text
car
```

must remain.

---

# Cases

## Case 1

Word absent.

```text
Return
```

---

## Case 2

Word present but prefix of another word.

Example:

```text
car
card
```

Delete:

```text
car
```

Only:

```text
isEnd = FALSE
```

---

## Case 3

Entire branch removable.

Delete:

```text
dog
```

Remove nodes.

---

# Delete Pseudocode

```text
FUNCTION Delete(node, word, depth)

    IF node = NULL

        RETURN NULL

    IF depth = length(word)

        node.isEnd ← FALSE

        IF node has no children

            DELETE node

            RETURN NULL

        RETURN node

    index ← word[depth] - 'a'

    node.children[index]
        ← Delete(
            node.children[index],
            word,
            depth + 1
          )

    IF node has no children
       AND node.isEnd = FALSE

        DELETE node

        RETURN NULL

    RETURN node

END FUNCTION
```

---

# Count Words

Add:

```text
wordCount
```

to node.

Useful for:

```text
Dictionary
Autocomplete
Ranking
```

---

# Count Prefixes

Store:

```text
prefixCount
```

at each node.

Whenever insertion passes through:

```text
prefixCount++
```

---

Example

Words:

```text
cat
car
care
```

Prefix:

```text
ca
```

Count:

```text
3
```

---

# Autocomplete

Store:

```text
car
card
care
careful
cargo
```

User types:

```text
car
```

Traverse to:

```text
r
```

Then DFS from there.

Output:

```text
car
card
care
careful
cargo
```

---

# Complexity

Let:

```text
L = word length
```

---

## Insert

```text
O(L)
```

---

## Search

```text
O(L)
```

---

## Prefix Search

```text
O(L)
```

---

## Delete

```text
O(L)
```

---

# Comparison

| Structure   | Search Word | Prefix Search |
| ----------- | ----------- | ------------- |
| Array       | O(n)        | O(n)          |
| Linked List | O(n)        | O(n)          |
| BST         | O(log n)    | Difficult     |
| HashMap     | O(1)        | Difficult     |
| Trie        | O(L)        | O(L)          |

---

# Applications

### Dictionary

```text
English Dictionary
```

---

### Spell Checker

Used in:

* Microsoft Word
* Google Docs

---

### Search Engines

Autocomplete:

```text
goo
```

suggests:

```text
google
google maps
google news
```

---

### Mobile Keyboard

Suggestions while typing.

---

### IP Routing

Routers use specialized tries.

---

### DNA Matching

Genome sequence processing.

---

# Example Complete Trie

Insert:

```text
cat
car
dog
```

Trie:

```text
(root)
         / \
        c   d
        |   |
        a   o
       / \   \
     t*  r*   g*
```

Search:

```text
cat → TRUE
car → TRUE
ca  → FALSE
cab → FALSE
```

Prefix Search:

```text
ca → TRUE
do → TRUE
de → FALSE
```

---

# Interview Points

### 1

Trie stores:

```text
Characters
```

not complete keys.

---

### 2

Each path from root forms a word.

---

### 3

`isEnd` marks complete word.

---

### 4

Prefix searching is the main strength.

---

### 5

Complexities:

```text
Insert      O(L)
Search      O(L)
Delete      O(L)
StartsWith  O(L)
```

where:

```text
L = length of string
```

---

# Learning Order

```text
Binary Tree
    ↓
BST
    ↓
AVL
    ↓
Red Black Tree
    ↓
B-Tree
    ↓
Trie
    ↓
Segment Tree
    ↓
Fenwick Tree (BIT)
```

Among string data structures, **Trie** is the most frequently asked in interviews for:

* Autocomplete
* Prefix matching
* Word Dictionary
* Search Suggestions System
* Longest Common Prefix
* Word Search problems.
