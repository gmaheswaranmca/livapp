## 1. Subsequence Check — Two Pointers

```python
s = input().strip()
t = input().strip()

i = 0
j = 0

while i < len(s) and j < len(t):
    if s[i] == t[j]:
        j += 1
    i += 1

if j == len(t):
    print("YES")
else:
    print("NO")
```

---

## 2. Find All Unique Pairs with Sum K — Hash Set

```python
nums = list(map(int, input().split(',')))
k = int(input())

seen = set()
pairs = set()

for num in nums:
    complement = k - num

    if complement in seen:
        a = min(num, complement)
        b = max(num, complement)
        pairs.add((a, b))

    seen.add(num)

for pair in sorted(pairs):
    print(pair)
```

### Sample Input

```text
5,3,7,9,5
12
```

### Output

```text
(3, 9)
(5, 7)
```

---

## 3. Word Reversal Transform — String Traversal + Builder

```python
sentence = input().strip()

words = sentence.split()

result = []

for word in words:
    reversed_word = ""

    for i in range(len(word) - 1, -1, -1):
        reversed_word += word[i]

    result.append(reversed_word)

print(" ".join(result))
```

### Sample Input

```text
hello world python
```

### Output

```text
olleh dlrow nohtyp
```

---

## 4. Snowmelt Collection Between Mountain Peaks — Prefix/Suffix Arrays

```python
heights = list(map(int, input().split()))

n = len(heights)

left_max = [0] * n
right_max = [0] * n

left_max[0] = heights[0]

for i in range(1, n):
    left_max[i] = max(left_max[i - 1], heights[i])

right_max[n - 1] = heights[n - 1]

for i in range(n - 2, -1, -1):
    right_max[i] = max(right_max[i + 1], heights[i])

water = 0

for i in range(n):
    water += min(left_max[i], right_max[i]) - heights[i]

print(water)
```

### Sample Input

```text
4 2 0 3 2 5
```

### Output

```text
9
```

---

## 5. Conveyor Belt Order Reversal — Two Pointers + Swap

```python
arr = list(map(int, input().split()))

left = 0
right = len(arr) - 1

while left < right:
    arr[left], arr[right] = arr[right], arr[left]

    left += 1
    right -= 1

print(*arr)
```

### Sample Input

```text
1 2 3 4 5
```

### Output

```text
5 4 3 2 1
```

---

## Pattern Summary

| Problem                                    | Pattern                    |
| ------------------------------------------ | -------------------------- |
| Subsequence Check                          | Two Pointers               |
| Find All Unique Pairs with Sum K           | Hash Set                   |
| Word Reversal Transform                    | String Traversal + Builder |
| Snowmelt Collection Between Mountain Peaks | Prefix/Suffix Arrays       |
| Conveyor Belt Order Reversal               | Two Pointers + Swap        |

These are standard interview patterns and are the optimized solutions for the respective problems.
