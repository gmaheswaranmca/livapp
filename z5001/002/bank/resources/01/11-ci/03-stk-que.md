📘 *Coding Interview – Part 3: Stacks & Queues* 📚📥

✅ *Q1. Valid Parentheses (Amazon)*  
*Problem:* Check if a string has valid brackets.  
*Answer:*  
```python
def isValid(s):
    stack = []
    map = {')': '(', ']': '[', '}': '{'}
    for c in s:
        if c in map:
            if not stack or stack.pop() != map[c]:
                return False
        else:
            stack.append(c)
    return not stack
```

✅ *Q2. Min Stack (Google)*  
*Problem:* Design a stack that supports push, pop, top, and retrieving the minimum in constant time.  
*Answer:*  
```python
class MinStack:
    def _init_(self):
        self.stack = []
        self.min_stack = []

    def push(self, val):
        self.stack.append(val)
        min_val = val if not self.min_stack else min(val, self.min_stack[-1])
        self.min_stack.append(min_val)

    def pop(self):
        self.stack.pop()
        self.min_stack.pop()

    def top(self):
        return self.stack[-1]

    def getMin(self):
        return self.min_stack[-1]
```

✅ *Q3. Implement Queue using Stacks (Meta)*  
*Problem:* Implement a queue using two stacks.  
*Answer:*  
```python
class MyQueue:
    def _init_(self):
        self.in_stack, self.out_stack = [], []
    def push(self, x):
        self.in_stack.append(x)

    def pop(self):
        self.peek()
        return self.out_stack.pop()

    def peek(self):
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())
        return self.out_stack[-1]

    def empty(self):
        return not self.in_stack and not self.out_stack
```

✅ *Q4. Daily Temperatures (Microsoft)*  
*Problem:* Return an array where each element is the number of days until a warmer temperature.  
*Answer:*  
```python
def dailyTemperatures(temps):
    res = [0] * len(temps)
    stack = []
    for i, t in enumerate(temps):
        while stack and t > temps[stack[-1]]:
            idx = stack.pop()
            res[idx] = i - idx
        stack.append(i)
    return res
```

✅ *Q5. Sliding Window Maximum (Amazon)*  
*Problem:* Find the maximum value in each sliding window of size k.  
*Answer:*  
```python
from collections import deque
def maxSlidingWindow(nums, k):
    dq, res = deque(), []
    for i, n in enumerate(nums):
        while dq and nums[dq[-1]] < n:
            dq.pop()
        dq.append(i)
        if dq[0] == i - k:
            dq.popleft()
        if i >= k - 1:
            res.append(nums[dq[0]])
    return res
```
