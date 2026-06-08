# 1. Minimize Maximum Year Difference {Easy}

## Idea

We need to find a year from the given list that minimizes the maximum distance to all other years.

For any chosen year:

[
\text{maxDiff} = \max(|year-y|)
]

The optimal year is the one closest to the middle of the sorted years.

Since the answer is guaranteed to be one of the given years and unique, we can simply check every year and pick the one with the smallest maximum difference.

---

## Algorithm

1. Initialize:

   * `bestYear = arr[0]`
   * `bestMaxDiff = INF`
2. For each year `arr[i]`

   * Find maximum difference with all other years.
3. If current maximum difference is smaller than `bestMaxDiff`

   * Update answer.
4. Return `bestYear`.

---

## Pseudocode

```text
function findYear(arr):

    bestYear = arr[0]
    bestMaxDiff = INFINITY

    for each year in arr:

        currentMax = 0

        for each otherYear in arr:
            currentMax = max(currentMax,
                             abs(year - otherYear))

        if currentMax < bestMaxDiff:
            bestMaxDiff = currentMax
            bestYear = year

    return bestYear
```

---

## Complexity

| Complexity | Value |
| ---------- | ----- |
| Time       | O(n²) |
| Space      | O(1)  |

---

## Python

```python
def find_year(arr):
    best_year = arr[0]
    best_max = float('inf')

    for year in arr:
        current_max = 0

        for other in arr:
            current_max = max(current_max, abs(year - other))

        if current_max < best_max:
            best_max = current_max
            best_year = year

    return best_year


arr = [2008, 2010, 2012]
print(find_year(arr))
```

---

## C++

```cpp
#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

int findYear(vector<int>& arr)
{
    int bestYear = arr[0];
    int bestMax = INT_MAX;

    for(int year : arr)
    {
        int currentMax = 0;

        for(int other : arr)
        {
            currentMax = max(currentMax,
                             abs(year - other));
        }

        if(currentMax < bestMax)
        {
            bestMax = currentMax;
            bestYear = year;
        }
    }

    return bestYear;
}

int main()
{
    vector<int> arr = {2008, 2010, 2012};

    cout << findYear(arr);

    return 0;
}
```

---

## Java

```java
public class Main {

    static int findYear(int[] arr) {

        int bestYear = arr[0];
        int bestMax = Integer.MAX_VALUE;

        for(int year : arr) {

            int currentMax = 0;

            for(int other : arr) {
                currentMax = Math.max(
                    currentMax,
                    Math.abs(year - other)
                );
            }

            if(currentMax < bestMax) {
                bestMax = currentMax;
                bestYear = year;
            }
        }

        return bestYear;
    }

    public static void main(String[] args) {

        int[] arr = {2008, 2010, 2012};

        System.out.println(findYear(arr));
    }
}
```

---

# 2. Scrambled Prescription Validator (Anagram Checker) {Easy}

## Idea

Two strings are anagrams if:

1. Lengths are equal.
2. Every character appears the same number of times.

Use a frequency map.

---

## Algorithm

1. If lengths differ → False.
2. Count frequencies of characters in first string.
3. Decrease frequencies using second string.
4. If all counts become zero → True.

---

## Pseudocode

```text
function isAnagram(s1, s2):

    if length(s1) != length(s2):
        return false

    freq = empty map

    for ch in s1:
        freq[ch]++

    for ch in s2:
        freq[ch]--

    for value in freq:
        if value != 0:
            return false

    return true
```

---

## Complexity

| Complexity | Value |
| ---------- | ----- |
| Time       | O(n)  |
| Space      | O(k)  |

k = distinct characters

---

## Python

```python
def is_anagram(original, received):

    if len(original) != len(received):
        return False

    freq = {}

    for ch in original:
        freq[ch] = freq.get(ch, 0) + 1

    for ch in received:
        freq[ch] = freq.get(ch, 0) - 1

    for value in freq.values():
        if value != 0:
            return False

    return True


print(is_anagram("heart", "earth"))
```

---

## C++

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

bool isAnagram(string s1, string s2)
{
    if(s1.size() != s2.size())
        return false;

    unordered_map<char,int> freq;

    for(char ch : s1)
        freq[ch]++;

    for(char ch : s2)
        freq[ch]--;

    for(auto item : freq)
    {
        if(item.second != 0)
            return false;
    }

    return true;
}

int main()
{
    cout << isAnagram("heart","earth");
}
```

---

## Java

```java
import java.util.*;

public class Main {

    static boolean isAnagram(String s1, String s2) {

        if(s1.length() != s2.length())
            return false;

        HashMap<Character,Integer> map = new HashMap<>();

        for(char ch : s1.toCharArray()) {
            map.put(ch,
                    map.getOrDefault(ch,0)+1);
        }

        for(char ch : s2.toCharArray()) {
            map.put(ch,
                    map.getOrDefault(ch,0)-1);
        }

        for(int value : map.values()) {
            if(value != 0)
                return false;
        }

        return true;
    }

    public static void main(String[] args) {
        System.out.println(
            isAnagram("heart","earth")
        );
    }
}
```

---

# 3. Broken Keyboard Decoder {Easy}

## Idea

Use two pointers.

* Pointer `i` → intended string.
* Pointer `j` → typed string.

Rules:

1. Matching characters move both pointers.
2. If typed character equals previous typed character, it is a long press → move `j`.
3. Otherwise invalid.

---

## Algorithm

1. Start `i = 0`, `j = 0`.
2. While `j < typed.length`

   * If characters match → advance both.
   * Else if typed[j] equals previous typed character → advance j.
   * Else return false.
3. Return true if intended string completely matched.

---

## Pseudocode

```text
function isLongPressed(name, typed):

    i = 0
    j = 0

    while j < length(typed):

        if i < length(name)
           and name[i] == typed[j]:

            i++
            j++

        else if j > 0
                and typed[j] == typed[j-1]:

            j++

        else:
            return false

    return i == length(name)
```

---

## Complexity

| Complexity | Value |
| ---------- | ----- |
| Time       | O(n)  |
| Space      | O(1)  |

---

## Python

```python
def is_long_pressed(name, typed):

    i = 0
    j = 0

    while j < len(typed):

        if i < len(name) and name[i] == typed[j]:
            i += 1
            j += 1

        elif j > 0 and typed[j] == typed[j - 1]:
            j += 1

        else:
            return False

    return i == len(name)


print(is_long_pressed("alex", "aaleex"))
```

---

## C++

```cpp
#include <iostream>
using namespace std;

bool isLongPressed(string name, string typed)
{
    int i = 0;
    int j = 0;

    while(j < typed.size())
    {
        if(i < name.size() &&
           name[i] == typed[j])
        {
            i++;
            j++;
        }
        else if(j > 0 &&
                typed[j] == typed[j-1])
        {
            j++;
        }
        else
        {
            return false;
        }
    }

    return i == name.size();
}

int main()
{
    cout << isLongPressed("alex",
                          "aaleex");
}
```

---

## Java

```java
public class Main {

    static boolean isLongPressed(
        String name,
        String typed)
    {
        int i = 0;
        int j = 0;

        while(j < typed.length())
        {
            if(i < name.length() &&
               name.charAt(i) ==
               typed.charAt(j))
            {
                i++;
                j++;
            }
            else if(j > 0 &&
                    typed.charAt(j) ==
                    typed.charAt(j-1))
            {
                j++;
            }
            else
            {
                return false;
            }
        }

        return i == name.length();
    }

    public static void main(String[] args)
    {
        System.out.println(
            isLongPressed(
                "alex",
                "aaleex"
            )
        );
    }
}
```

## Pattern Recognition

| Problem                          | Pattern                            |
| -------------------------------- | ---------------------------------- |
| Minimize Maximum Year Difference | Brute Force Optimization / Min-Max |
| Scrambled Prescription Validator | Hash Map Frequency Counting        |
| Broken Keyboard Decoder          | Two Pointers                       |
