# 1. Valid Parentheses

**Problem:** Check whether brackets `()`, `{}`, `[]` are balanced.

## Idea

Whenever an opening bracket appears, push it into a stack.

Whenever a closing bracket appears:

* Stack should not be empty.
* Top element must be the matching opening bracket.
* Otherwise return False.

Finally:

* If stack is empty → Valid.
* Else → Invalid.

---

## Algorithm

1. Create empty stack.
2. Traverse each character.
3. If opening bracket → push.
4. If closing bracket:

   * If stack empty → invalid.
   * Pop top.
   * Check matching pair.
5. After traversal:

   * If stack empty → valid.
   * Else → invalid.

---

## Pseudocode

```text
FUNCTION isValid(s)

    stack ← empty

    FOR each ch in s

        IF ch is '(' OR '{' OR '['
            PUSH ch into stack

        ELSE

            IF stack is empty
                RETURN False

            top ← POP stack

            IF ch = ')' AND top ≠ '('
                RETURN False

            IF ch = '}' AND top ≠ '{'
                RETURN False

            IF ch = ']' AND top ≠ '['
                RETURN False

    RETURN stack is empty

END FUNCTION
```

---

## Complexity

| Complexity | Value |
| ---------- | ----- |
| Time       | O(n)  |
| Space      | O(n)  |

---

## Python

```python
def isValid(s):
    stack = []

    for ch in s:
        if ch in "([{":
            stack.append(ch)
        else:
            if not stack:
                return False

            top = stack.pop()

            if ch == ')' and top != '(':
                return False
            if ch == '}' and top != '{':
                return False
            if ch == ']' and top != '[':
                return False

    return len(stack) == 0
```

---

## C++

```cpp
#include <stack>
using namespace std;

bool isValid(string s)
{
    stack<char> st;

    for(char ch : s)
    {
        if(ch=='(' || ch=='{' || ch=='[')
            st.push(ch);
        else
        {
            if(st.empty())
                return false;

            char top = st.top();
            st.pop();

            if(ch==')' && top!='(') return false;
            if(ch=='}' && top!='{') return false;
            if(ch==']' && top!='[') return false;
        }
    }

    return st.empty();
}
```

---

## Java

```java
import java.util.*;

class Solution {
    public boolean isValid(String s) {

        Stack<Character> stack = new Stack<>();

        for(char ch : s.toCharArray()) {

            if(ch=='(' || ch=='{' || ch=='[')
                stack.push(ch);
            else {

                if(stack.isEmpty())
                    return false;

                char top = stack.pop();

                if(ch==')' && top!='(') return false;
                if(ch=='}' && top!='{') return false;
                if(ch==']' && top!='[') return false;
            }
        }

        return stack.isEmpty();
    }
}
```

---

# 2. Min Stack

**Problem:** Support:

* push()
* pop()
* top()
* getMin()

all in O(1).

---

## Idea

Maintain two stacks:

### Main Stack

Stores all elements.

### Min Stack

Stores minimum value till that point.

Example:

```text
Push 5
Stack    : [5]
MinStack : [5]

Push 3
Stack    : [5,3]
MinStack : [5,3]

Push 7
Stack    : [5,3,7]
MinStack : [5,3]
```

---

## Algorithm

### Push(x)

```text
Push x into stack

If minStack empty OR x <= minStack.top
    push x into minStack
```

### Pop()

```text
If stack.top == minStack.top
    pop minStack

pop stack
```

### getMin()

```text
return minStack.top
```

---

## Pseudocode

```text
CLASS MinStack

    stack
    minStack

    FUNCTION push(x)

        PUSH x into stack

        IF minStack empty OR
           x <= TOP(minStack)

            PUSH x into minStack

    FUNCTION pop()

        IF TOP(stack) = TOP(minStack)
            POP minStack

        POP stack

    FUNCTION top()
        RETURN TOP(stack)

    FUNCTION getMin()
        RETURN TOP(minStack)
```

---

## Complexity

| Operation | Time |
| --------- | ---- |
| Push      | O(1) |
| Pop       | O(1) |
| Top       | O(1) |
| GetMin    | O(1) |

Space: **O(n)**

---

## Python

```python
class MinStack:

    def __init__(self):
        self.stack = []
        self.minStack = []

    def push(self, val):
        self.stack.append(val)

        if not self.minStack or val <= self.minStack[-1]:
            self.minStack.append(val)

    def pop(self):
        if self.stack[-1] == self.minStack[-1]:
            self.minStack.pop()

        self.stack.pop()

    def top(self):
        return self.stack[-1]

    def getMin(self):
        return self.minStack[-1]
```

---

## C++

```cpp
#include <stack>
using namespace std;

class MinStack {

    stack<int> st;
    stack<int> minSt;

public:

    void push(int val)
    {
        st.push(val);

        if(minSt.empty() || val <= minSt.top())
            minSt.push(val);
    }

    void pop()
    {
        if(st.top() == minSt.top())
            minSt.pop();

        st.pop();
    }

    int top()
    {
        return st.top();
    }

    int getMin()
    {
        return minSt.top();
    }
};
```

---

## Java

```java
import java.util.*;

class MinStack {

    Stack<Integer> stack = new Stack<>();
    Stack<Integer> minStack = new Stack<>();

    public void push(int val) {

        stack.push(val);

        if(minStack.isEmpty() || val <= minStack.peek())
            minStack.push(val);
    }

    public void pop() {

        if(stack.peek().equals(minStack.peek()))
            minStack.pop();

        stack.pop();
    }

    public int top() {
        return stack.peek();
    }

    public int getMin() {
        return minStack.peek();
    }
}
```

---

# 3. Evaluate Reverse Polish Notation

**Problem:** Evaluate postfix expression.

Example:

```text
["2","1","+","3","*"]

(2 + 1) * 3
= 9
```

---

## Idea

Use stack.

* Number → push.
* Operator → pop two numbers.
* Apply operation.
* Push result.

---

## Algorithm

1. Traverse tokens.
2. If number → push.
3. Else:

   * b = pop
   * a = pop
   * calculate a op b
   * push result
4. Final stack top = answer.

---

## Pseudocode

```text
FUNCTION evalRPN(tokens)
    stack ← empty

    FOR each token
        IF token is number
            PUSH token
        ELSE
            b ← POP
            a ← POP

            result ← a token b

            PUSH result
    RETURN TOP(stack)
```

```
```
---

## Complexity

| Complexity | Value |
| ---------- | ----- |
| Time       | O(n)  |
| Space      | O(n)  |

---

## Python

```python
def evalRPN(tokens):

    stack = []

    for token in tokens:

        if token not in "+-*/":
            stack.append(int(token))

        else:
            b = stack.pop()
            a = stack.pop()

            if token == '+':
                stack.append(a + b)

            elif token == '-':
                stack.append(a - b)

            elif token == '*':
                stack.append(a * b)

            else:
                stack.append(int(a / b))

    return stack[-1]
```

---

## C++

```cpp
#include <stack>
#include <vector>
using namespace std;

int evalRPN(vector<string>& tokens)
{
    stack<int> st;

    for(string token : tokens)
    {
        if(token!="+" &&
           token!="-" &&
           token!="*" &&
           token!="/")
        {
            st.push(stoi(token));
        }
        else
        {
            int b = st.top(); st.pop();
            int a = st.top(); st.pop();

            if(token=="+") st.push(a+b);
            else if(token=="-") st.push(a-b);
            else if(token=="*") st.push(a*b);
            else st.push(a/b);
        }
    }

    return st.top();
}
```

---

## Java

```java
import java.util.*;

class Solution {

    public int evalRPN(String[] tokens) {

        Stack<Integer> stack = new Stack<>();

        for(String token : tokens) {

            if(!"+-*/".contains(token) || token.length() > 1) {
                stack.push(Integer.parseInt(token));
            }
            else {

                int b = stack.pop();
                int a = stack.pop();

                switch(token) {

                    case "+":
                        stack.push(a+b);
                        break;

                    case "-":
                        stack.push(a-b);
                        break;

                    case "*":
                        stack.push(a*b);
                        break;

                    case "/":
                        stack.push(a/b);
                        break;
                }
            }
        }

        return stack.peek();
    }
}
```

---

# 4. Daily Temperatures

**Problem:** Find number of days until a warmer temperature.

```text
Input:
[73,74,75,71,69,72,76,73]

Output:
[1,1,4,2,1,1,0,0]
```

---

## Idea

Use a **Monotonic Decreasing Stack**.

Store indices.

If current temperature is greater than temperature at stack top:

* Found warmer day.
* Calculate difference.

---

## Algorithm

1. Create result array with zeros.
2. Create empty stack.
3. Traverse temperatures.
4. While stack not empty and current temp > temp at stack top:

   * index = pop
   * result[index] = currentIndex - index
5. Push current index.
6. Return result.

---

## Pseudocode

```text
FUNCTION dailyTemperatures(T)
    result ← array of zeros
    stack ← empty

    FOR i = 0 to n-1
        WHILE stack not empty AND
              T[i] > T[TOP(stack)]
            idx ← POP(stack)
            result[idx] ← i - idx
        PUSH i into stack
    RETURN result
```

---

## Complexity

| Complexity | Value |
| ---------- | ----- |
| Time       | O(n)  |
| Space      | O(n)  |

---

## Python

```python
def dailyTemperatures(T):

    n = len(T)
    result = [0] * n
    stack = []

    for i in range(n):

        while stack and T[i] > T[stack[-1]]:
            idx = stack.pop()
            result[idx] = i - idx

        stack.append(i)

    return result
```

---

## C++

```cpp
#include <vector>
#include <stack>
using namespace std;

vector<int> dailyTemperatures(vector<int>& T)
{
    int n = T.size();

    vector<int> result(n,0);

    stack<int> st;

    for(int i=0;i<n;i++)
    {
        while(!st.empty() &&
              T[i] > T[st.top()])
        {
            int idx = st.top();
            st.pop();

            result[idx] = i - idx;
        }

        st.push(i);
    }

    return result;
}
```

---

## Java

```java
import java.util.*;

class Solution {

    public int[] dailyTemperatures(int[] T) {

        int n = T.length;

        int[] result = new int[n];

        Stack<Integer> stack = new Stack<>();

        for(int i=0;i<n;i++) {

            while(!stack.isEmpty() &&
                  T[i] > T[stack.peek()]) {

                int idx = stack.pop();

                result[idx] = i - idx;
            }

            stack.push(i);
        }

        return result;
    }
}
```

## Pattern Summary

| Problem                          | Pattern                    |
| -------------------------------- | -------------------------- |
| Valid Parentheses                | Stack                      |
| Min Stack                        | Two Stacks                 |
| Evaluate Reverse Polish Notation | Stack Simulation           |
| Daily Temperatures               | Monotonic Decreasing Stack |

These four problems form the most common stack interview progression:
**Basic Stack → Design Stack → Expression Evaluation → Monotonic Stack**.
