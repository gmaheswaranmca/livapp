# 1. LeetCode 509 - Fibonacci Number

## Description

Given `n`, return the `n`th Fibonacci number.

Fibonacci sequence:

```text
F(0) = 0
F(1) = 1
F(n) = F(n-1) + F(n-2)
```

---

## Sample Input / Output

### Example 1

```text
Input: n = 2
Output: 1
```

### Example 2

```text
Input: n = 4
Output: 3
```

---

## One-Liner

**Current answer depends only on previous two answers.**

---

## Idea

Store previous two Fibonacci values and build the sequence iteratively.

---

## Algorithm

```text
If n <= 1
    return n

prev2 = 0
prev1 = 1

For i = 2 to n
    curr = prev1 + prev2
    prev2 = prev1
    prev1 = curr

Return prev1
```

---

## Pseudocode

```text
FUNCTION fib(n)

    IF n <= 1
        RETURN n

    prev2 = 0
    prev1 = 1

    FOR i = 2 TO n
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr

    RETURN prev1

END FUNCTION
```

---

## Python

```python
class Solution:
    def fib(self, n: int) -> int:
        if n <= 1:
            return n

        prev2 = 0
        prev1 = 1

        for _ in range(2, n + 1):
            curr = prev1 + prev2
            prev2 = prev1
            prev1 = curr

        return prev1
```

---

## C++

```cpp
class Solution {
public:
    int fib(int n) {
        if(n <= 1)
            return n;

        int prev2 = 0;
        int prev1 = 1;

        for(int i=2;i<=n;i++) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }

        return prev1;
    }
};
```

---

## Java

```java
class Solution {
    public int fib(int n) {

        if(n <= 1)
            return n;

        int prev2 = 0;
        int prev1 = 1;

        for(int i=2;i<=n;i++) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }

        return prev1;
    }
}
```

---

# 2. LeetCode 70 - Climbing Stairs

## Description

You can climb either:

```text
1 step
or
2 steps
```

Find total distinct ways to reach the top.

---

## Sample Input / Output

```text
Input: n = 2
Output: 2

Ways:
1+1
2
```

```text
Input: n = 3
Output: 3

Ways:
1+1+1
1+2
2+1
```

---

## One-Liner

**Ways(n) = Ways(n-1) + Ways(n-2).**

---

## Idea

Last jump can be:

```text
1 step from n-1
2 steps from n-2
```

Add both possibilities.

---

## Algorithm

```text
If n <= 2
    return n

a = 1
b = 2

For i = 3 to n
    c = a + b
    a = b
    b = c

Return b
```

---

## Pseudocode

```text
FUNCTION climbStairs(n)

    IF n <= 2
        RETURN n

    a = 1
    b = 2

    FOR i = 3 TO n
        c = a + b
        a = b
        b = c

    RETURN b

END FUNCTION
```

---

## Python

```python
class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n

        a, b = 1, 2

        for _ in range(3, n + 1):
            c = a + b
            a = b
            b = c

        return b
```

---

## C++

```cpp
class Solution {
public:
    int climbStairs(int n) {

        if(n <= 2)
            return n;

        int a = 1;
        int b = 2;

        for(int i=3;i<=n;i++) {
            int c = a + b;
            a = b;
            b = c;
        }

        return b;
    }
};
```

---

## Java

```java
class Solution {
    public int climbStairs(int n) {

        if(n <= 2)
            return n;

        int a = 1;
        int b = 2;

        for(int i=3;i<=n;i++) {
            int c = a + b;
            a = b;
            b = c;
        }

        return b;
    }
}
```

---

# 3. LeetCode 746 - Min Cost Climbing Stairs

## Description

Each stair has a cost.

Pay cost when stepping on it.

Find minimum cost to reach top.

---

## Sample Input / Output

```text
Input:
cost = [10,15,20]

Output:
15
```

Explanation:

```text
Start at index 1
Pay 15
Jump to top
```

---

## One-Liner

**Minimum cost = current cost + minimum of previous two costs.**

---

## Idea

For every stair:

```text
dp[i] =
cost[i] +
min(dp[i-1], dp[i-2])
```

---

## Algorithm

```text
dp[0] = cost[0]
dp[1] = cost[1]

For i = 2 to n-1
    dp[i] =
        cost[i] +
        min(dp[i-1], dp[i-2])

Return min(dp[n-1], dp[n-2])
```

---

## Pseudocode

```text
FUNCTION minCost(cost)

    n = length(cost)

    dp[0] = cost[0]
    dp[1] = cost[1]

    FOR i = 2 TO n-1
        dp[i] =
            cost[i] +
            MIN(dp[i-1], dp[i-2])

    RETURN MIN(dp[n-1], dp[n-2])

END FUNCTION
```

---

## Python

```python
class Solution:
    def minCostClimbingStairs(self, cost):
        n = len(cost)

        dp = [0] * n
        dp[0] = cost[0]
        dp[1] = cost[1]

        for i in range(2, n):
            dp[i] = cost[i] + min(dp[i-1], dp[i-2])

        return min(dp[n-1], dp[n-2])
```

---

## C++

```cpp
class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {

        int n = cost.size();

        vector<int> dp(n);

        dp[0] = cost[0];
        dp[1] = cost[1];

        for(int i=2;i<n;i++) {
            dp[i] =
                cost[i] +
                min(dp[i-1], dp[i-2]);
        }

        return min(dp[n-1], dp[n-2]);
    }
};
```

---

## Java

```java
class Solution {
    public int minCostClimbingStairs(int[] cost) {

        int n = cost.length;

        int[] dp = new int[n];

        dp[0] = cost[0];
        dp[1] = cost[1];

        for(int i=2;i<n;i++) {
            dp[i] =
                cost[i] +
                Math.min(dp[i-1], dp[i-2]);
        }

        return Math.min(dp[n-1], dp[n-2]);
    }
}
```

---

# 4. LeetCode 300 - Longest Increasing Subsequence (LIS)

## Description

Find length of the longest strictly increasing subsequence.

---

## Sample Input / Output

```text
Input:
[10,9,2,5,3,7,101,18]

Output:
4
```

Subsequence:

```text
2 3 7 101
```

---

## One-Liner

**For every element, extend previous smaller elements.**

---

## Idea

```text
dp[i]
=
length of LIS ending at i
```

Check all previous elements.

---

## Algorithm

```text
Initialize dp with 1

For i = 1 to n-1
    For j = 0 to i-1

        If nums[j] < nums[i]
            dp[i] =
                max(dp[i],
                    dp[j] + 1)

Return maximum dp value
```

---

## Pseudocode

```text
FUNCTION LIS(nums)

    n = length(nums)

    dp = array of n filled with 1

    FOR i = 1 TO n-1
        FOR j = 0 TO i-1

            IF nums[j] < nums[i]
                dp[i] =
                    MAX(dp[i],
                        dp[j] + 1)

    RETURN maximum(dp)

END FUNCTION
```

---

## Python

```python
class Solution:
    def lengthOfLIS(self, nums):

        n = len(nums)

        dp = [1] * n

        for i in range(n):
            for j in range(i):
                if nums[j] < nums[i]:
                    dp[i] = max(dp[i], dp[j] + 1)

        return max(dp)
```

---

## C++

```cpp
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {

        int n = nums.size();

        vector<int> dp(n, 1);

        for(int i=0;i<n;i++) {
            for(int j=0;j<i;j++) {

                if(nums[j] < nums[i])
                    dp[i] =
                        max(dp[i],
                            dp[j] + 1);
            }
        }

        return *max_element(dp.begin(),
                            dp.end());
    }
};
```

---

## Java

```java
class Solution {
    public int lengthOfLIS(int[] nums) {

        int n = nums.length;

        int[] dp = new int[n];

        Arrays.fill(dp, 1);

        int ans = 1;

        for(int i=0;i<n;i++) {

            for(int j=0;j<i;j++) {

                if(nums[j] < nums[i])
                    dp[i] =
                        Math.max(dp[i],
                                 dp[j] + 1);
            }

            ans = Math.max(ans, dp[i]);
        }

        return ans;
    }
}
```

---

# 5. LeetCode 1143 - Longest Common Subsequence

## Description

Given two strings.

Find length of longest subsequence present in both strings.

---

## Sample Input / Output

```text
Input:
text1 = "abcde"
text2 = "ace"

Output:
3
```

Common subsequence:

```text
ace
```

---

## One-Liner

**If characters match, take diagonal + 1, otherwise take max of left and top.**

---

## Idea

```text
dp[i][j]
=
LCS length
using first i chars of text1
and first j chars of text2
```

---

## Algorithm

```text
For i = 1 to m
    For j = 1 to n

        If characters match
            dp[i][j] =
                dp[i-1][j-1] + 1

        Else
            dp[i][j] =
                max(
                    dp[i-1][j],
                    dp[i][j-1]
                )

Return dp[m][n]
```

---

## Pseudocode

```text
FUNCTION LCS(text1,text2)

    m = length(text1)
    n = length(text2)

    Create dp[m+1][n+1]

    FOR i = 1 TO m
        FOR j = 1 TO n

            IF text1[i-1] == text2[j-1]
                dp[i][j] =
                    dp[i-1][j-1] + 1

            ELSE
                dp[i][j] =
                    MAX(
                        dp[i-1][j],
                        dp[i][j-1]
                    )

    RETURN dp[m][n]

END FUNCTION
```

---

## Python

```python
class Solution:
    def longestCommonSubsequence(self,
                                 text1: str,
                                 text2: str) -> int:

        m = len(text1)
        n = len(text2)

        dp = [[0]*(n+1)
              for _ in range(m+1)]

        for i in range(1, m+1):
            for j in range(1, n+1):

                if text1[i-1] == text2[j-1]:
                    dp[i][j] = dp[i-1][j-1] + 1
                else:
                    dp[i][j] = max(dp[i-1][j],
                                   dp[i][j-1])

        return dp[m][n]
```

---

## C++

```cpp
class Solution {
public:
    int longestCommonSubsequence(
        string text1,
        string text2) {

        int m = text1.size();
        int n = text2.size();

        vector<vector<int>> dp(
            m+1,
            vector<int>(n+1,0));

        for(int i=1;i<=m;i++) {
            for(int j=1;j<=n;j++) {

                if(text1[i-1] ==
                   text2[j-1])
                    dp[i][j] =
                        dp[i-1][j-1] + 1;
                else
                    dp[i][j] =
                        max(dp[i-1][j],
                            dp[i][j-1]);
            }
        }

        return dp[m][n];
    }
};
```

---

## Java

```java
class Solution {
    public int longestCommonSubsequence(
        String text1,
        String text2) {

        int m = text1.length();
        int n = text2.length();

        int[][] dp =
            new int[m+1][n+1];

        for(int i=1;i<=m;i++) {
            for(int j=1;j<=n;j++) {

                if(text1.charAt(i-1) ==
                   text2.charAt(j-1))
                    dp[i][j] =
                        dp[i-1][j-1] + 1;
                else
                    dp[i][j] =
                        Math.max(dp[i-1][j],
                                 dp[i][j-1]);
            }
        }

        return dp[m][n];
    }
}
```

---

### DP Pattern Summary

| Problem                      | DP State                           |
| ---------------------------- | ---------------------------------- |
| 509 Fibonacci                | Previous 2 values                  |
| 70 Climbing Stairs           | Ways to reach step i               |
| 746 Min Cost Climbing Stairs | Min cost to reach step i           |
| 300 LIS                      | LIS ending at i                    |
| 1143 LCS                     | LCS using first i and j characters |
