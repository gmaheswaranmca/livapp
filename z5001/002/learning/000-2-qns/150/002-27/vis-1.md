# Example
```
val = 3

        0 1 2 3
nums = [3,2,2,3]

read  -> scans every element
write -> next place to keep a valid element
```

# Visual 
```
        0 1 2 3
nums = [3,2,2,3]
        ^
      read

        ^
      write
```

# Dry Run: "Inspect → Keep → Advance write"
| read | nums[read] | Action            | Array after action | write |
| ---: | ---------: | ----------------- | ------------------ | ----: |
|    0 |          3 | Skip              | [3,2,2,3]          |     0 |
|    1 |          2 | Keep -> nums[0]=2 | [2,2,2,3]          |     1 |
|    2 |          2 | Keep -> nums[1]=2 | [2,2,2,3]          |     2 |
|    3 |          3 | Skip              | [2,2,2,3]          |     2 |

# One Line Memory Trick for Students
- read looks at every number.
- write marks where the next good number should go.

# Or Even Shorter
- read = inspect
- write = keep

# Same template used in:
- Remove Element
- Move Zeroes
- Remove Duplicates from Sorted Array
- Filter Array In-place 

# So students learn one pattern:
```
for read in range(n):
    if keep(nums[read]):
        nums[write] = nums[read]
        write += 1
return write
```

This "Inspect → Keep → Advance write" flow is usually the easiest version for beginners to memorize and reproduce in interviews.


