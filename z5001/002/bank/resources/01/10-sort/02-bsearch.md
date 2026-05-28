✅ *Binary Search* 🔍

*What is Binary Search?*  
Binary Search is an efficient way to find an element in a *sorted array* by repeatedly dividing the search range in half.

*How It Works:*  
1. Start with two pointers: `low = 0`, `high = n - 1`  
2. Find middle: `mid = (low + high) // 2`  
3. If `arr[mid] == target`: found!  
4. If `arr[mid] < target`: search in the right half  
5. If `arr[mid] > target`: search in the left half  
6. Repeat until `low > high`

*Time Complexity:*  
- Best: O(1)  
- Avg/Worst: O(log n)  
*(Works only on sorted arrays)*

*Python Code:*  
```python
def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1
```

*Common Use Cases:*  
- Searching in a sorted list  
- Finding square roots  
- Solving range-based problems (binary search on answer)  
- First/last occurrence of an element  
- Peak element in a mountain array  
