## Searching Data Sets

### Linear Search

```text
Array  : [45, 12, 78, 23, 90, 34, 67]
Target : 23
Output : Found at index 3
```

```text
Array  : [45, 12, 78, 23, 90, 34, 67]
Target : 100
Output : Not Found (-1)
```

---

### Binary Search

> Sorted array required

```text
Array  : [10, 20, 30, 40, 50, 60, 70]
Target : 50
Output : Found at index 4
```

```text
Array  : [10, 20, 30, 40, 50, 60, 70]
Target : 35
Output : Not Found (-1)
```

---

### Ternary Search

> Sorted array required

```text
Array  : [5, 10, 15, 20, 25, 30, 35, 40, 45]
Target : 30
Output : Found at index 5
```

```text
Array  : [5, 10, 15, 20, 25, 30, 35, 40, 45]
Target : 18
Output : Not Found (-1)
```

---

# Sorting Data Sets

### Small Dataset

```text
Input  : [64, 34, 25, 12, 22, 11, 90]
Output : [11, 12, 22, 25, 34, 64, 90]
```

Suitable for:

* Bubble Sort
* Selection Sort
* Insertion Sort

---

### Medium Dataset

```text
Input  : [38, 27, 43, 3, 9, 82, 10]
Output : [3, 9, 10, 27, 38, 43, 82]
```

Suitable for:

* Merge Sort
* Quick Sort

---

### Large Dataset

```text
Input  : [170, 45, 75, 90, 802, 24, 2, 66]
Output : [2, 24, 45, 66, 75, 90, 170, 802]
```

Suitable for:

* Quick Sort
* Merge Sort
* Radix Sort

---

### Bucket Sort Dataset

> Values between 0 and 1

```text
Input  : [0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12, 0.23, 0.68]
Output : [0.12, 0.17, 0.21, 0.23, 0.26, 0.39, 0.68, 0.72, 0.78, 0.94]
```

---

# One Common Dataset for Comparing All Sorting Algorithms

```text
Input : [50, 20, 40, 10, 30]

Sorted Output : [10, 20, 30, 40, 50]
```

| Pass    | Bubble         | Selection      | Insertion      |
| ------- | -------------- | -------------- | -------------- |
| Initial | 50 20 40 10 30 | 50 20 40 10 30 | 50 20 40 10 30 |
| Pass 1  | 20 40 10 30 50 | 10 20 40 50 30 | 20 50 40 10 30 |
| Pass 2  | 20 10 30 40 50 | 10 20 40 50 30 | 20 40 50 10 30 |
| Pass 3  | 10 20 30 40 50 | 10 20 30 50 40 | 10 20 40 50 30 |
| Pass 4  | Sorted         | 10 20 30 40 50 | 10 20 30 40 50 |

This dataset is small enough to manually trace **Linear Search, Binary Search (after sorting), Bubble Sort, Selection Sort, Insertion Sort, Quick Sort, and Merge Sort** during interviews.
