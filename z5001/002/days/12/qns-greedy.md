# 6. LeetCode 121 - Best Time to Buy and Sell Stock

## Description

You are given an array `prices`.

```text
prices[i]
=
stock price on day i
```

Choose:

* One day to buy
* One later day to sell

Return the maximum profit.

If no profit is possible, return `0`.

---

## Sample Input / Output

### Example 1

```text
Input:
prices = [7,1,5,3,6,4]

Output:
5
```

Explanation:

```text
Buy at 1
Sell at 6

Profit = 6 - 1 = 5
```

---

### Example 2

```text
Input:
prices = [7,6,4,3,1]

Output:
0
```

Explanation:

```text
No profitable transaction
```

---

## One-Liner

**Keep track of minimum price so far and calculate profit at every day.**

---

## Idea

For each day:

```text
Profit =
Current Price - Minimum Price Seen So Far
```

Update answer if profit is larger.

---

## Algorithm

```text
minPrice = prices[0]
maxProfit = 0

For each price

    minPrice =
        min(minPrice, price)

    profit =
        price - minPrice

    maxProfit =
        max(maxProfit, profit)

Return maxProfit
```

---

## Pseudocode

```text
FUNCTION maxProfit(prices)

    minPrice = prices[0]
    maxProfit = 0

    FOR each price in prices

        minPrice =
            MIN(minPrice, price)

        profit =
            price - minPrice

        maxProfit =
            MAX(maxProfit, profit)

    RETURN maxProfit

END FUNCTION
```

---

## Dry Run

```text
prices = [7,1,5,3,6,4]
```

| Price | Min Price | Profit | Max Profit |
| ----- | --------- | ------ | ---------- |
| 7     | 7         | 0      | 0          |
| 1     | 1         | 0      | 0          |
| 5     | 1         | 4      | 4          |
| 3     | 1         | 2      | 4          |
| 6     | 1         | 5      | 5          |
| 4     | 1         | 3      | 5          |

Answer:

```text
5
```

---

## Python

```python
class Solution:
    def maxProfit(self, prices):
        
        min_price = prices[0]
        max_profit = 0

        for price in prices:
            min_price = min(min_price, price)
            max_profit = max(max_profit,
                             price - min_price)

        return max_profit
```

---

## C++

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {

        int minPrice = prices[0];
        int maxProfit = 0;

        for(int price : prices) {

            minPrice =
                min(minPrice, price);

            maxProfit =
                max(maxProfit,
                    price - minPrice);
        }

        return maxProfit;
    }
};
```

---

## Java

```java
class Solution {
    public int maxProfit(int[] prices) {

        int minPrice = prices[0];
        int maxProfit = 0;

        for(int price : prices) {

            minPrice =
                Math.min(minPrice, price);

            maxProfit =
                Math.max(maxProfit,
                         price - minPrice);
        }

        return maxProfit;
    }
}
```

---

## Time Complexity

```text
O(n)
```

## Space Complexity

```text
O(1)
```

---

# 7. LeetCode 455 - Assign Cookies

## Description

You have:

```text
g[i]
=
greed factor of child

s[j]
=
size of cookie
```

A child is satisfied if:

```text
cookie size >= greed factor
```

Each child gets at most one cookie.

Each cookie can be used once.

Return maximum satisfied children.

---

## Sample Input / Output

### Example 1

```text
Input:

g = [1,2,3]
s = [1,1]

Output:
1
```

Explanation:

```text
Child 1 gets cookie 1

Children needing
2 and 3 cannot be satisfied
```

---

### Example 2

```text
Input:

g = [1,2]
s = [1,2,3]

Output:
2
```

---

## One-Liner

**Give the smallest possible cookie that satisfies the current smallest greedy child.**

---

## Idea

Sort both arrays.

Use two pointers:

```text
Child Pointer -> i
Cookie Pointer -> j
```

If cookie satisfies child:

```text
count++
move both
```

Otherwise:

```text
try bigger cookie
```

---

## Algorithm

```text
Sort greed array

Sort cookie array

i = 0
j = 0
count = 0

While i < children
      and j < cookies

    If s[j] >= g[i]

        count++
        i++
        j++

    Else

        j++

Return count
```

---

## Pseudocode

```text
FUNCTION findContentChildren(g,s)

    SORT g
    SORT s

    i = 0
    j = 0
    count = 0

    WHILE i < length(g)
          AND j < length(s)

        IF s[j] >= g[i]

            count++
            i++
            j++

        ELSE

            j++

    RETURN count

END FUNCTION
```

---

## Dry Run

```text
g = [1,2,3]
s = [1,1]
```

After sorting:

```text
g = [1,2,3]
s = [1,1]
```

| Child | Cookie | Action     |
| ----- | ------ | ---------- |
| 1     | 1      | Satisfied  |
| 2     | 1      | Not enough |

Answer:

```text
1
```

---

## Python

```python
class Solution:
    def findContentChildren(self,
                            g,
                            s):

        g.sort()
        s.sort()

        i = 0
        j = 0
        count = 0

        while i < len(g) and j < len(s):

            if s[j] >= g[i]:
                count += 1
                i += 1
                j += 1
            else:
                j += 1

        return count
```

---

## C++

```cpp
class Solution {
public:
    int findContentChildren(
        vector<int>& g,
        vector<int>& s) {

        sort(g.begin(), g.end());
        sort(s.begin(), s.end());

        int i = 0;
        int j = 0;
        int count = 0;

        while(i < g.size() &&
              j < s.size()) {

            if(s[j] >= g[i]) {
                count++;
                i++;
                j++;
            }
            else {
                j++;
            }
        }

        return count;
    }
};
```

---

## Java

```java
class Solution {
    public int findContentChildren(
        int[] g,
        int[] s) {

        Arrays.sort(g);
        Arrays.sort(s);

        int i = 0;
        int j = 0;
        int count = 0;

        while(i < g.length &&
              j < s.length) {

            if(s[j] >= g[i]) {
                count++;
                i++;
                j++;
            }
            else {
                j++;
            }
        }

        return count;
    }
}
```

---

# Greedy Pattern Summary

| Problem                             | Greedy Choice                         |
| ----------------------------------- | ------------------------------------- |
| 121 Best Time to Buy and Sell Stock | Buy at minimum price seen so far      |
| 455 Assign Cookies                  | Give smallest sufficient cookie first |

### Learning Takeaway

**Dynamic Programming**

```text
Solve using answers of smaller subproblems.
```

**Greedy**

```text
Take the best local choice now,
hoping it leads to global optimum.
```
