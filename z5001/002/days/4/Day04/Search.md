## Searching Algorithms - Notes

### 1. Linear Search

#### What is Linear Search?
Linear search is the simplest searching algorithm that checks each element in the array sequentially until the target element is found or the end of the array is reached.

#### Algorithm:
1. Start from the first element
2. Compare each element with the target
3. If found, return the index
4. If not found after checking all elements, return -1

#### Time Complexity:
- **Best Case**: O(1) - Element found at first position
- **Average Case**: O(n/2) = O(n) - Element found at middle
- **Worst Case**: O(n) - Element at last position or not found

#### Space Complexity: O(1)

#### Advantages:
- Simple to understand and implement
- Works on both sorted and unsorted arrays
- No preprocessing required

#### Disadvantages:
- Inefficient for large datasets
- Time complexity is O(n)

---

### 2. Binary Search

#### What is Binary Search?
Binary search is an efficient searching algorithm that works on sorted arrays by repeatedly dividing the search space in half.

#### Prerequisites:
- Array must be sorted
- Random access to elements (works well with arrays)

#### Algorithm:
1. Set low = 0, high = array.length - 1
2. While low <= high:
   - Calculate mid = (low + high) / 2
   - If arr[mid] == target, return mid
   - If arr[mid] < target, set low = mid + 1
   - If arr[mid] > target, set high = mid - 1
3. Return -1 if not found

#### Time Complexity:
- **Best Case**: O(1) - Element found at middle
- **Average Case**: O(log n)
- **Worst Case**: O(log n) - Element at extremes or not found

#### Space Complexity:
- **Iterative**: O(1)
- **Recursive**: O(log n) - due to function call stack

#### Advantages:
- Very efficient for large datasets
- Time complexity is O(log n)
- Divide and conquer approach

#### Disadvantages:
- Requires sorted array
- Not suitable for linked lists (no random access)

---

### 3. Ternary Search

#### What is Ternary Search?
Ternary search is a divide-and-conquer algorithm that divides the array into three parts instead of two (like binary search).

#### Prerequisites:
- Array must be sorted
- Works by eliminating 1/3 of the search space in each iteration

#### Algorithm:
1. Set low = 0, high = array.length - 1
2. While low <= high:
   - Calculate mid1 = low + (high - low) / 3
   - Calculate mid2 = high - (high - low) / 3
   - If arr[mid1] == target, return mid1
   - If arr[mid2] == target, return mid2
   - If target < arr[mid1], search in left third
   - If target > arr[mid2], search in right third
   - Otherwise, search in middle third
3. Return -1 if not found


#### Time Complexity:
- **Best Case**: O(1) - Element found at mid1 or mid2
- **Average Case**: O(log₃ n)
- **Worst Case**: O(log₃ n)

#### Space Complexity:
- **Iterative**: O(1)
- **Recursive**: O(log₃ n)

#### Advantages:
- Divides search space into three parts
- Can be faster than binary search in some cases
- Efficient for large datasets

#### Disadvantages:
- More comparisons per iteration than binary search
- Requires sorted array
- In practice, binary search is often preferred

---

### Comparison of Search Algorithms:

| Algorithm | Time Complexity | Space Complexity | Prerequisites | Best For |
|-----------|----------------|------------------|---------------|----------|
| Linear Search | O(n) | O(1) | None | Small/unsorted arrays |
| Binary Search | O(log n) | O(1) iterative | Sorted array | Large sorted arrays |
| Ternary Search | O(log₃ n) | O(1) iterative | Sorted array | Theoretical interest |

### When to Use Each Algorithm:

#### Linear Search:
- Small datasets (< 100 elements)
- Unsorted arrays
- When simplicity is more important than efficiency

#### Binary Search:
- Large sorted datasets
- When O(log n) performance is required
- Most commonly used efficient search algorithm

#### Ternary Search:
- Theoretical scenarios
- When you want to explore divide-and-conquer variants
- Research or educational purposes

### Key Points to Remember:

1. **Linear Search**: Simple but inefficient O(n)
2. **Binary Search**: Most practical and efficient O(log n)
3. **Ternary Search**: Theoretical interest O(log₃ n)
4. **Sorting requirement**: Binary and Ternary need sorted arrays
5. **Space complexity**: All can be implemented with O(1) space
6. **Practical choice**: Binary search is the gold standard for sorted arrays


---

## Linear Search - Pseudocode

```text
FUNCTION LinearSearch(arr, n, target)

    FOR i ← 0 TO n - 1

        IF arr[i] = target THEN
            RETURN i
        END IF

    END FOR

    RETURN -1

END FUNCTION
```

---

## Binary Search - Pseudocode

> Array must be sorted.

```text
FUNCTION BinarySearch(arr, n, target)

    left ← 0
    right ← n - 1

    WHILE left ≤ right

        mid ← left + (right - left) / 2

        IF arr[mid] = target THEN
            RETURN mid

        ELSE IF arr[mid] < target THEN
            left ← mid + 1

        ELSE
            right ← mid - 1

        END IF

    END WHILE

    RETURN -1

END FUNCTION
```

---

## Ternary Search - Pseudocode

> Array must be sorted.

```text
FUNCTION TernarySearch(arr, n, target)

    left ← 0
    right ← n - 1

    WHILE left ≤ right

        mid1 ← left + (right - left) / 3
        mid2 ← right - (right - left) / 3

        IF arr[mid1] = target THEN
            RETURN mid1

        ELSE IF arr[mid2] = target THEN
            RETURN mid2

        ELSE IF target < arr[mid1] THEN
            right ← mid1 - 1

        ELSE IF target > arr[mid2] THEN
            left ← mid2 + 1

        ELSE
            left ← mid1 + 1
            right ← mid2 - 1

        END IF

    END WHILE

    RETURN -1

END FUNCTION
```

| Algorithm      | Best Case | Average Case | Worst Case | Sorted Array Required |
| -------------- | --------- | ------------ | ---------- | --------------------- |
| Linear Search  | O(1)      | O(n)         | O(n)       | No                    |
| Binary Search  | O(1)      | O(log n)     | O(log n)   | Yes                   |
| Ternary Search | O(1)      | O(log₃ n)    | O(log₃ n)  | Yes                   |
