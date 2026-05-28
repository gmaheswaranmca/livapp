📘 *Coding Interview – Part 1: Arrays & Strings* 🔍💡  

✅ *Q1. Two Sum (Amazon)*  
*Problem:* Given an array `nums` and target `t`, return indices of two numbers such that `nums[i] + nums[j] = t`.  
*Answer:*  
```python
def twoSum(nums, target):
    map = {}
    for i, num in enumerate(nums):
        if target - num in map:
            return [map[target - num], i]
        map[num] = i
```
*Time:* O(n), *Space:* O(n)

✅ *Q2. Kadane’s Algorithm (Microsoft)*  
*Problem:* Find the contiguous subarray with the maximum sum.  
*Answer:*  
```python
def maxSubArray(nums):
    max_sum = curr = nums[0]
    for n in nums[1:]:
        curr = max(n, curr + n)
        max_sum = max(max_sum, curr)
    return max_sum
```

✅ *Q3. Longest Substring Without Repeating Characters (Google)*  
*Problem:* Return the length of the longest substring without repeating characters.  
*Answer:*  
```python
def lengthOfLongestSubstring(s):
    seen = {}
    left = max_len = 0
    for right in range(len(s)):
        if s[right] in seen:
            left = max(left, seen[s[right]] + 1)
        seen[s[right]] = right
        max_len = max(max_len, right - left + 1)
    return max_len
```

✅ *Q4. Rotate Image 90° (Apple)*  
*Problem:* Rotate NxN matrix 90 degrees clockwise in-place.  
*Answer:*  
```python
def rotate(matrix):
    n = len(matrix)
    for i in range(n):
        for j in range(i, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    for row in matrix:
        row.reverse()
```

✅ *Q5. Rotate Array (Facebook)*  
*Problem:* Rotate array to right by k steps.  
*Answer:*  
```python
def rotate(nums, k):
    k %= len(nums)
    nums[:] = nums[-k:] + nums[:-k]
```
