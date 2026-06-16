2	27	Remove Element	Remove all occurrences of val in-place.	nums=[3,2,2,3], val=3	2, [2,2]	Two pointers overwrite unwanted values.

* `read` -> scans every element.
* `write` -> points where the next valid element should be placed.
```
val  = 3     
        0 1 2 3
nums = [3,2,2,3]

            ^
        read

        0 1 2 3              
nums = [3,2,2,3]

          ^
        write
```

read    nums[read]  write   nums[write]     nums[write]=nums[read] write++
0       3           0       3               -
1       2           0       3               [0]2                   1
2       2           1       2               -
3       3           1       2               [1]3                   2

write is num of elements after removal
