# Steps:
0. Move fast for every element / iteration
1. Is `nums[fast]` different from `nums[slow]`?
2. If yes, move `slow`.
3. Copy `nums[fast]` to `nums[slow]`.

That is the whole algorithm.

---

# Data

```text
nums = [0,0,1,1,1,2,2,3,3,4]

Index: 0 1 2 3 4 5 6 7 8 9
Value: 0 0 1 1 1 2 2 3 3 4

slow = 0
fast = 1
```

---

# Visualization

| slow | nums[slow] | fast | nums[fast] | Different? | Action            | Array (important part) |
| ---: | ---------: | ---: | ---------: | ---------- | ----------------- | ---------------------- |
|    0 |          0 |    1 |          0 | No         | Skip              | [0,...]                |
|    0 |          0 |    2 |          1 | Yes        | slow=1, nums[1]=1 | [0,1,...]              |
|    1 |          1 |    3 |          1 | No         | Skip              | [0,1,...]              |
|    1 |          1 |    4 |          1 | No         | Skip              | [0,1,...]              |
|    1 |          1 |    5 |          2 | Yes        | slow=2, nums[2]=2 | [0,1,2,...]            |
|    2 |          2 |    6 |          2 | No         | Skip              | [0,1,2,...]            |
|    2 |          2 |    7 |          3 | Yes        | slow=3, nums[3]=3 | [0,1,2,3,...]          |
|    3 |          3 |    8 |          3 | No         | Skip              | [0,1,2,3,...]          |
|    3 |          3 |    9 |          4 | Yes        | slow=4, nums[4]=4 | [0,1,2,3,4,...]        |


---

# One-Line Memory Trick

Tell students:

```text
fast reads every element.
slow writes only unique elements.
```

or

```text
fast = Reader
slow = Writer
```

---

# Even Simpler Mental Model

```text
slow points to the LAST UNIQUE NUMBER.

If nums[fast] is NEW:
    move slow
    copy fast to slow
Else:
    ignore it
```

```text
slow -> Last unique

0 1 2 3 4 5 6 7 8 9
0 0 1 1 1 2 2 3 3 4
^
slow

  ^
  fast

```

---

# Interview Pattern Summary

```text
Sorted Array
      ↓
Duplicates are adjacent
      ↓
One pointer READS everything  (fast)
One pointer WRITES answers    (slow)
      ↓
Read-Write Pointer Pattern
```

This **Reader-Writer analogy (`fast = Reader`, `slow = Writer`)** is usually the easiest way for students to remember and reproduce the solution during interviews.
