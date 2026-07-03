# Trie (Prefix Tree) Operations Comparison

> A **Trie (Prefix Tree)** is a tree specialized for storing **strings** (or sometimes binary representations of numbers). Each node represents a prefix, making prefix-based operations very efficient.

Typical node:

```text
Node
├── children
└── isEndOfWord
```

---

| Operation          | C++                                               | Rust                                | Go                                     | Java                                           | Python              | JavaScript          | C#                                           |
| ------------------ | ------------------------------------------------- | ----------------------------------- | -------------------------------------- | ---------------------------------------------- | ------------------- | ------------------- | -------------------------------------------- |
| **Data Structure** | `TrieNode`                                        | `struct TrieNode`                   | `struct TrieNode`                      | `class TrieNode`                               | `class TrieNode`    | `class TrieNode`    | `class TrieNode`                             |
| **Children**       | `unordered_map<char,TrieNode*>` / `TrieNode*[26]` | `HashMap<char,...>` / `[Option;26]` | `map[rune]*TrieNode` / `[26]*TrieNode` | `HashMap<Character,TrieNode>` / `TrieNode[26]` | `dict` / `list[26]` | `Map` / `Array(26)` | `Dictionary<char,TrieNode>` / `TrieNode[26]` |
| **End Marker**     | `bool isEnd`                                      | `bool is_end`                       | `bool isEnd`                           | `boolean isEnd`                                | `is_end`            | `isEnd`             | `bool IsEnd`                                 |
| **Insert**         | `insert(word)`                                    | `insert()`                          | `Insert()`                             | `insert()`                                     | `insert()`          | `insert()`          | `Insert()`                                   |
| **Search**         | `search(word)`                                    | `search()`                          | `Search()`                             | `search()`                                     | `search()`          | `search()`          | `Search()`                                   |
| **Starts With**    | `startsWith()`                                    | `starts_with()`                     | `StartsWith()`                         | `startsWith()`                                 | `starts_with()`     | `startsWith()`      | `StartsWith()`                               |
| **Delete**         | `erase()`                                         | `remove()`                          | `Delete()`                             | `delete()`                                     | `delete()`          | `delete()`          | `Delete()`                                   |

---

# Internal Structure

Insert

```text
app

apple

ape

bat
```

Trie becomes

```text
(root)

├── a
│   │
│   p
│   │
│   ├── p (end)
│   │     │
│   │     l
│   │     │
│   │     e (end)
│   │
│   └── e (end)
│
└── b
    │
    a
    │
    t (end)
```

Each path from the root forms a word.

---

# Insert

Pseudo

```text
node = root

for each character

    if child not exists

        create child

    move child

mark end=true
```

---

# Search

Pseudo

```text
node = root

for each character

    if child missing

        return false

    move child

return node.isEnd
```

---

# Starts With

Need

```text
ap
```

Pseudo

```text
node = root

follow characters

if all found

    return true

else

    false
```

No need to reach the end of a word.

---

# Delete

Pseudo

```text
remove end marker

delete unused nodes

while returning
```

Deletion is optional in many competitive programming problems and is implemented less frequently than insert/search.

---

# Typical Functions

Every language implements essentially the same API.

## C++

```cpp
insert(word)

search(word)

startsWith(prefix)

erase(word)
```

---

## Rust

```rust
insert()

search()

starts_with()

remove()
```

---

## Go

```go
Insert()

Search()

StartsWith()

Delete()
```

---

## Java

```java
insert()

search()

startsWith()

delete()
```

---

## Python

```python
insert()

search()

starts_with()

delete()
```

---

## JavaScript

```javascript
insert()

search()

startsWith()

delete()
```

---

## C#

```csharp
Insert()

Search()

StartsWith()

Delete()
```

---

# Time Complexity

Let **L = length of the word**.

| Operation   | Complexity              |
| ----------- | ----------------------- |
| Insert      | **O(L)**                |
| Search      | **O(L)**                |
| Starts With | **O(L)**                |
| Delete      | **O(L)**                |
| Memory      | **O(total characters)** |

---

# Trie vs Hash Set

| Feature                   | Trie         | Hash Set                          |
| ------------------------- | ------------ | --------------------------------- |
| Exact Search              | O(L)         | O(L) average (hashing the string) |
| Prefix Search             | ✅ O(L)       | ❌ O(n)                            |
| Autocomplete              | ✅            | ❌                                 |
| Lexicographical Traversal | ✅            | ❌                                 |
| Memory Usage              | Higher       | Lower                             |
| Implementation            | More Complex | Simpler                           |

---

# Trie vs Hash Map

Suppose you have:

```text
apple
app
ape
application
```

### Hash Map

Stores each word independently:

```text
apple
app
ape
application
```

Common prefixes (`app`) are repeated.

### Trie

Stores the shared prefix only once:

```text
app
├── le
├── lication
└── e
```

This sharing is what makes tries efficient for prefix operations.

---

# Character Array vs Hash Map Children

Two common implementations exist for each node.

### Fixed Alphabet (e.g., lowercase English letters)

```text
children[26]
```

Advantages:

* Fast access: **O(1)**
* Simple
* Most common in LeetCode/Codeforces

Disadvantage:

* Wastes memory if many child slots are unused.

---

### Dynamic Alphabet

```text
HashMap<char, Node>
```

Advantages:

* Memory efficient
* Supports Unicode or arbitrary characters

Disadvantage:

* Slightly slower due to hashing.

---

# Common Competitive Programming Uses

* Prefix Search
* Autocomplete
* Dictionary / Spell Checker
* Word Search
* Replace Words
* Longest Common Prefix
* Counting Prefixes
* Word Break
* Phone Directory
* Maximum XOR Pair (Binary Trie)
* Bitwise XOR Queries

---

# Typical Trie Template

Every implementation has the same logical structure:

```text
TrieNode
    children
    isEnd

Trie
    root

insert(word)

search(word)

startsWith(prefix)

(optional) delete(word)
```

Unlike arrays, maps, or queues, **a Trie is not built into any of these languages**. In competitive programming, you'll implement the node structure and the four core operations yourself. For lowercase English words, the `children[26]` implementation is the most common because it is simple and very fast.
