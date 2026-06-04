# Sorting Algorithms - Notes

## Overview
Sorting is the process of arranging elements in a particular order (ascending or descending). Here are the main sorting algorithms covered in Day 5 of the curriculum.

---

## 1. Selection Sort

### What is Selection Sort?
Selection Sort repeatedly finds the minimum element from the unsorted portion and places it at the beginning.

### Algorithm:
1. Find the minimum element in the unsorted array
2. Swap it with the first element
3. Move the boundary of unsorted array by one position
4. Repeat until the entire array is sorted

### Time Complexity:
- **Best Case**: O(n²) - Even if array is sorted
- **Average Case**: O(n²)
- **Worst Case**: O(n²)

### Space Complexity: O(1) - In-place sorting

### Characteristics:
- **Stable**: No (relative order of equal elements may change)
- **In-place**: Yes
- **Adaptive**: No (performance doesn't improve for partially sorted arrays)

### Advantages:
- Simple implementation
- Performs well on small datasets
- In-place sorting (constant space)
- Makes minimum number of swaps

### Disadvantages:
- Inefficient for large datasets
- Always O(n²) time complexity

---

## 2. Bubble Sort

### What is Bubble Sort?
Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order.

### Algorithm:
1. Compare adjacent elements
2. If they're in wrong order, swap them
3. Continue until no swaps are needed
4. After each pass, largest element "bubbles" to the end

### Time Complexity:
- **Best Case**: O(n) - Already sorted array with optimization
- **Average Case**: O(n²)
- **Worst Case**: O(n²) - Reverse sorted array

### Space Complexity: O(1) - In-place sorting

### Characteristics:
- **Stable**: Yes
- **In-place**: Yes
- **Adaptive**: Yes (with optimization)

### Advantages:
- Simple implementation
- Stable sorting algorithm
- Can detect if array is already sorted
- In-place sorting

### Disadvantages:
- Inefficient for large datasets
- Many unnecessary comparisons
- O(n²) average time complexity

---

## 3. Insertion Sort

### What is Insertion Sort?
Insertion Sort builds the sorted array one element at a time by inserting each element into its correct position.

### Algorithm:
1. Start with second element (assume first is sorted)
2. Compare with elements in sorted portion
3. Insert current element at correct position
4. Repeat for all elements


### Time Complexity:
- **Best Case**: O(n) - Already sorted array
- **Average Case**: O(n²)
- **Worst Case**: O(n²) - Reverse sorted array

### Space Complexity: O(1) - In-place sorting

### Characteristics:
- **Stable**: Yes
- **In-place**: Yes
- **Adaptive**: Yes (efficient for small/nearly sorted arrays)

### Advantages:
- Simple implementation
- Efficient for small datasets
- Adaptive (performs well on nearly sorted arrays)
- Stable and in-place
- Online algorithm (can sort as it receives data)

### Disadvantages:
- Inefficient for large datasets
- O(n²) average time complexity

---

## 4. Quick Sort

### What is Quick Sort?
Quick Sort is a divide-and-conquer algorithm that picks a pivot element and partitions the array around it.

### Algorithm:
1. Choose a pivot element
2. Partition array so elements < pivot are on left, > pivot on right
3. Recursively apply quicksort to left and right subarrays
4. Combine results

### Time Complexity:
- **Best Case**: O(n log n) - Pivot divides array into equal halves
- **Average Case**: O(n log n)
- **Worst Case**: O(n²) - Pivot is always smallest/largest element

### Space Complexity: O(log n) - Due to recursion stack

### Characteristics:
- **Stable**: No (depends on partition implementation)
- **In-place**: Yes
- **Adaptive**: No

### Advantages:
- Very efficient on average O(n log n)
- In-place sorting
- Widely used in practice
- Cache-friendly

### Disadvantages:
- Worst-case O(n²) time complexity
- Not stable
- Performance depends on pivot selection

---

## 5. Merge Sort

### What is Merge Sort?
Merge Sort is a divide-and-conquer algorithm that divides the array into halves, sorts them, and then merges them back.

### Algorithm:
1. Divide array into two halves
2. Recursively sort both halves
3. Merge the sorted halves


### Time Complexity:
- **Best Case**: O(n log n)
- **Average Case**: O(n log n)
- **Worst Case**: O(n log n) - Consistent performance

### Space Complexity: O(n) - Requires additional space for temporary arrays

### Characteristics:
- **Stable**: Yes
- **In-place**: No
- **Adaptive**: No

### Advantages:
- Guaranteed O(n log n) time complexity
- Stable sorting algorithm
- Predictable performance
- Good for large datasets
- Parallelizable

### Disadvantages:
- Requires O(n) extra space
- Not in-place
- Slower than quicksort in practice for smaller arrays

---

## Comparison of Sorting Algorithms

| Algorithm | Best Case | Average Case | Worst Case | Space | Stable | In-place |
|-----------|-----------|--------------|------------|-------|--------|----------|
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | No | Yes |
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Yes | Yes |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Yes | Yes |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes | No |

## When to Use Each Algorithm

### Selection Sort:
- Small datasets
- When memory is limited
- When you need to minimize swaps

### Bubble Sort:
- Educational purposes
- Very small datasets
- When you need stable sort and simplicity

### Insertion Sort:
- Small datasets (< 50 elements)
- Nearly sorted arrays
- Online sorting (data arrives over time)

### Quick Sort:
- Large datasets
- When average-case performance is important
- When memory is limited (in-place)

### Merge Sort:
- Large datasets
- When you need guaranteed O(n log n) performance
- When stability is required
- External sorting (when data doesn't fit in memory)

## Key Points to Remember

1. **Simple sorts (Selection, Bubble, Insertion)**: O(n²) but good for small data
2. **Quick Sort**: Fast average case O(n log n), but O(n²) worst case
3. **Merge Sort**: Consistent O(n log n) but requires extra space
4. **Stability**: Merge, Bubble, Insertion are stable
5. **In-place**: Selection, Bubble, Insertion, Quick are in-place
6. **Adaptive**: Bubble and Insertion perform better on nearly sorted data

---

### 1. Bucket Sort

#### What is Bucket Sort?
Bucket Sort is a sorting algorithm that distributes elements into a number of buckets, sorts each bucket individually, and then concatenates the sorted buckets to get the final sorted array.

#### When to Use Bucket Sort:
- When input is uniformly distributed over a range
- When you know the range of input values
- Best for floating-point numbers in [0, 1) range

#### Algorithm:
1. Create n empty buckets
2. Distribute array elements into buckets based on their values
3. Sort each bucket individually (using any sorting algorithm)
4. Concatenate all sorted buckets

#### Time Complexity:
- **Best Case**: O(n + k) where k is the number of buckets
- **Average Case**: O(n + k)
- **Worst Case**: O(n²) when all elements go to one bucket

#### Space Complexity: O(n + k)

#### Characteristics:
- **Stable**: Yes (depends on sorting algorithm used for buckets)
- **In-place**: No
- **Adaptive**: No

#### Advantages:
- Very efficient when input is uniformly distributed
- Can achieve O(n) time complexity in best case
- Stable sorting algorithm
- Good for sorting floating-point numbers

#### Disadvantages:
- Requires knowledge of input range
- Performance depends on input distribution
- Uses extra space for buckets
- Not suitable for general-purpose sorting

---

### 2. Radix Sort

#### What is Radix Sort?
Radix Sort is a non-comparative sorting algorithm that sorts numbers by processing individual digits. It uses counting sort as a subroutine to sort digits.

#### Types of Radix Sort:
1. **LSD (Least Significant Digit)**: Sorts from rightmost digit to leftmost
2. **MSD (Most Significant Digit)**: Sorts from leftmost digit to rightmost

#### Algorithm (LSD):
1. Find the maximum number to determine number of digits
2. For each digit position (from least to most significant):
   - Use counting sort to sort array based on current digit
3. Repeat until all digits are processed


#### Time Complexity:
- **Best Case**: O(d × (n + k)) where d = number of digits, k = range of digits
- **Average Case**: O(d × (n + k))
- **Worst Case**: O(d × (n + k))

#### Space Complexity: O(n + k)

#### Characteristics:
- **Stable**: Yes
- **In-place**: No
- **Adaptive**: No

#### Advantages:
- Linear time complexity O(d × n) for fixed number of digits
- Stable sorting algorithm
- Good for sorting integers and strings
- No comparisons needed

#### Disadvantages:
- Only works for integers, strings, or fixed-length keys
- Uses extra space
- Performance depends on number of digits
- Not suitable for general-purpose sorting

---

## Comparison: Bucket Sort vs Radix Sort

| Aspect | Bucket Sort | Radix Sort |
|--------|-------------|------------|
| **Type** | Distribution Sort | Non-comparative Sort |
| **Best For** | Uniformly distributed data | Integers, strings |
| **Time Complexity** | O(n + k) average | O(d × (n + k)) |
| **Space Complexity** | O(n + k) | O(n + k) |
| **Stability** | Yes | Yes |
| **Input Requirements** | Known range | Fixed-length keys |
| **Use Cases** | Float numbers [0,1) | Integers, strings |


---

## Bubble Sort (No Swap Optimization)

```text
FUNCTION BubbleSort(arr, n)

    FOR i ← 0 TO n - 2

        swapped ← FALSE

        FOR j ← 0 TO n - i - 2

            IF arr[j] > arr[j + 1] THEN

                temp ← arr[j]
                arr[j] ← arr[j + 1]
                arr[j + 1] ← temp

                swapped ← TRUE

            END IF

        END FOR

        IF swapped = FALSE THEN
            BREAK
        END IF

    END FOR

END FUNCTION
```

---

## Selection Sort

```text
FUNCTION SelectionSort(arr, n)

    FOR i ← 0 TO n - 2

        minIndex ← i

        FOR j ← i + 1 TO n - 1

            IF arr[j] < arr[minIndex] THEN
                minIndex ← j
            END IF

        END FOR

        temp ← arr[i]
        arr[i] ← arr[minIndex]
        arr[minIndex] ← temp

    END FOR

END FUNCTION
```

---

## Insertion Sort

```text
FUNCTION InsertionSort(arr, n)

    FOR i ← 1 TO n - 1

        key ← arr[i]
        j ← i - 1

        WHILE j ≥ 0 AND arr[j] > key

            arr[j + 1] ← arr[j]
            j ← j - 1

        END WHILE

        arr[j + 1] ← key

    END FOR

END FUNCTION
```

---

## Quick Sort

```text
FUNCTION QuickSort(arr, low, high)

    IF low < high THEN

        pivotIndex ← Partition(arr, low, high)

        QuickSort(arr, low, pivotIndex - 1)
        QuickSort(arr, pivotIndex + 1, high)

    END IF

END FUNCTION
```

### Partition

```text
FUNCTION Partition(arr, low, high)

    pivot ← arr[high]
    i ← low - 1

    FOR j ← low TO high - 1

        IF arr[j] ≤ pivot THEN

            i ← i + 1

            temp ← arr[i]
            arr[i] ← arr[j]
            arr[j] ← temp

        END IF

    END FOR

    temp ← arr[i + 1]
    arr[i + 1] ← arr[high]
    arr[high] ← temp

    RETURN i + 1

END FUNCTION
```

---

## Merge Sort

```text
FUNCTION MergeSort(arr, left, right)

    IF left < right THEN

        mid ← (left + right) / 2

        MergeSort(arr, left, mid)
        MergeSort(arr, mid + 1, right)

        Merge(arr, left, mid, right)

    END IF

END FUNCTION
```

### Merge

```text
FUNCTION Merge(arr, left, mid, right)

    CREATE temp[]

    i ← left
    j ← mid + 1

    WHILE i ≤ mid AND j ≤ right

        IF arr[i] ≤ arr[j] THEN
            APPEND arr[i] TO temp
            i ← i + 1
        ELSE
            APPEND arr[j] TO temp
            j ← j + 1
        END IF

    END WHILE

    WHILE i ≤ mid
        APPEND arr[i] TO temp
        i ← i + 1
    END WHILE

    WHILE j ≤ right
        APPEND arr[j] TO temp
        j ← j + 1
    END WHILE

    COPY temp BACK TO arr[left...right]

END FUNCTION
```

---

## Bucket Sort

```text
FUNCTION BucketSort(arr, n)

    CREATE buckets[n]

    FOR EACH value IN arr

        index ← FLOOR(value * n)
        INSERT value INTO buckets[index]

    END FOR

    FOR EACH bucket IN buckets
        SORT(bucket)
    END FOR

    k ← 0

    FOR EACH bucket IN buckets

        FOR EACH value IN bucket

            arr[k] ← value
            k ← k + 1

        END FOR

    END FOR

END FUNCTION
```

---

## Radix Sort

```text
FUNCTION RadixSort(arr, n)

    maxValue ← FIND_MAX(arr)

    place ← 1

    WHILE maxValue / place > 0

        CountingSort(arr, n, place)

        place ← place * 10

    END WHILE

END FUNCTION
```

### Counting Sort Used by Radix Sort

```text
FUNCTION CountingSort(arr, n, place)

    CREATE output[n]
    CREATE count[10] INITIALIZED TO 0

    FOR i ← 0 TO n - 1

        digit ← (arr[i] / place) MOD 10
        count[digit] ← count[digit] + 1

    END FOR

    FOR i ← 1 TO 9

        count[i] ← count[i] + count[i - 1]

    END FOR

    FOR i ← n - 1 DOWNTO 0

        digit ← (arr[i] / place) MOD 10

        output[count[digit] - 1] ← arr[i]

        count[digit] ← count[digit] - 1

    END FOR

    FOR i ← 0 TO n - 1

        arr[i] ← output[i]

    END FOR

END FUNCTION
```

| Algorithm      | Best       | Average    | Worst      | Space    |
| -------------- | ---------- | ---------- | ---------- | -------- |
| Bubble Sort    | O(n)       | O(n²)      | O(n²)      | O(1)     |
| Selection Sort | O(n²)      | O(n²)      | O(n²)      | O(1)     |
| Insertion Sort | O(n)       | O(n²)      | O(n²)      | O(1)     |
| Quick Sort     | O(n log n) | O(n log n) | O(n²)      | O(log n) |
| Merge Sort     | O(n log n) | O(n log n) | O(n log n) | O(n)     |
| Bucket Sort    | O(n+k)     | O(n+k)     | O(n²)      | O(n+k)   |
| Radix Sort     | O(d(n+k))  | O(d(n+k))  | O(d(n+k))  | O(n+k)   |
