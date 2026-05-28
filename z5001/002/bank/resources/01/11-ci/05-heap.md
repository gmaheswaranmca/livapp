📘 *Coding Interview – Part 6: Hashing & Hash Maps* 🧠🔍

✅ *Q1. Two Sum (Amazon)*  
*Problem:* Find two indices such that nums[i] + nums[j] = target.  
*Answer:*  
```python
def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        if target - num in seen:
            return [seen[target - num], i]
        seen[num] = i
```

✅ *Q2. Group Anagrams (Google)*  
*Problem:* Group strings that are anagrams of each other.  
*Answer:*  
```python
from collections import defaultdict
def groupAnagrams(strs):
    res = defaultdict(list)
    for word in strs:
        key = ''.join(sorted(word))
        res[key].append(word)
    return list(res.values())
```

✅ *Q3. Longest Consecutive Sequence (Meta)*  
*Problem:* Find the length of the longest sequence of consecutive integers.  
*Answer:*  
```python
def longestConsecutive(nums):
    num_set = set(nums)
    longest = 0
    for num in nums:
        if num - 1 not in num_set:
            length = 1
            while num + length in num_set:
                length += 1
            longest = max(longest, length)
    return longest
```

✅ *Q4. Subarray Sum Equals K (Amazon)*  
*Problem:* Find the number of subarrays that sum to k.  
*Answer:*  
```python
from collections import defaultdict
def subarraySum(nums, k):
     count = 0
    prefix_sum = 0
    freq = defaultdict(int)
    freq[0] = 1
    for num in nums:
        prefix_sum += num
        count += freq[prefix_sum - k]
        freq[prefix_sum] += 1
    return count
```

✅ *Q5. Isomorphic Strings (Microsoft)*  
*Problem:* Check if two strings are isomorphic.  
*Answer:*  
```python
def isIsomorphic(s, t):
    return len(set(zip(s, t))) == len(set(s)) == len(set(t))
```
