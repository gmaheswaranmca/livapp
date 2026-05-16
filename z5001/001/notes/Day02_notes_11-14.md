# Ch : 11 Python — Writing Functions

---

## 1. Introduction to Functions

### What is a Function?

A **Function** is a reusable block of code that performs a specific task.

Functions help to:

* Reduce code repetition
* Improve readability
* Make debugging easier
* Reuse logic multiple times

---

## Advantages of Functions

| Advantage        | Description                        |
| ---------------- | ---------------------------------- |
| Reusability      | Write once, use many times         |
| Easy Maintenance | Easy to modify                     |
| Modularity       | Program divided into smaller parts |
| Debugging        | Easier to identify errors          |

---

## 2. Defining Function

---

## Syntax

```python id="l9f3a1"
def function_name(parameters):
    statements
```

---

## Example 1

```python id="x3b1f2"
def greet():
    print("Hello Python")
```

Calling function:

```python id="n7k5p1"
greet()
```

Output:

```text
Hello Python
```

---

## Example 2

```python id="a8d2q3"
def display():
    print("Welcome")
    print("Python Functions")
```

```python id="u5w7e8"
display()
```

---

## Important Notes

| Keyword     | Purpose                 |
| ----------- | ----------------------- |
| `def`       | Defines function        |
| `()`        | Parameters              |
| `:`         | Start of function block |
| Indentation | Function body           |

---

## 3. Processing Parameters

### What are Parameters?

Parameters are variables used to receive values.

---

## Example

```python id="v2m8q4"
def add(a, b):
    print(a + b)

add(10, 20)
```

Output:

```text
30
```

---

## How it Works

| Parameter | Argument   |
| --------- | ---------- |
| `a`, `b`  | `10`, `20` |

---

## Example — Student Marks

```python id="t4j9z6"
def student(name, mark):
    print("Name:", name)
    print("Mark:", mark)

student("Arun", 95)
```

---

## Multiple Parameters

```python id="f8y1n5"
def details(id, name, dept):
    print(id)
    print(name)
    print(dept)

details(101, "John", "CSE")
```

---

## 4. Local Variables

### What is Local Variable?

A variable declared inside function is called local variable.

* Accessible only inside function
* Destroyed after function execution

---

## Example

```python id="r6g4h2"
def show():
    x = 100
    print(x)

show()
```

Output:

```text
100
```

---

## Invalid Access

```python id="c7k2v1"
def show():
    x = 10

show()

print(x)
```

Output:

```text
NameError
```

---

## Example — Area Calculation

```python id="d9s4q7"
def area():
    length = 10
    breadth = 5

    result = length * breadth

    print(result)

area()
```

---

## 5. Default Argument Values

### What is Default Argument?

A parameter can have a default value.

If user does not pass value, default is used.

---

## Syntax

```python id="h2m7r9"
def function(parameter = value):
```

---

## Example

```python id="q8u3k6"
def greet(name="Guest"):
    print("Hello", name)

greet()
greet("Arun")
```

Output:

```text
Hello Guest
Hello Arun
```

---

## Example — Simple Interest

```python id="y5n1c4"
def interest(p, r=5, t=2):
    si = (p * r * t) / 100
    print(si)

interest(1000)
interest(1000, 10, 3)
```

---

## Rules

Default arguments should be placed after normal arguments.

Correct:

```python id="m3p9d2"
def test(a, b=10):
    pass
```

Wrong:

```python id="k6r8t1"
def test(a=10, b):
    pass
```

---

## 6. Keyword Arguments

### What is Keyword Argument?

Passing arguments using parameter names.

---

## Example

```python id="v9x2e4"
def student(id, name, mark):
    print(id, name, mark)

student(name="Arun", mark=95, id=101)
```

Output:

```text
101 Arun 95
```

---

## Advantage

* Order does not matter
* More readable

---

## Example — Employee

```python id="j7n3m5"
def employee(name, salary, dept):
    print(name)
    print(salary)
    print(dept)

employee(dept="HR", salary=50000, name="John")
```

---

## Positional vs Keyword Arguments

| Positional      | Keyword             |
| --------------- | ------------------- |
| Order important | Order not important |
| `fun(1,2)`      | `fun(a=1,b=2)`      |

---

## 7. The return Statement

### What is return?

`return` sends value back from function.

---

## Example

```python id="p4t7k2"
def add(a, b):
    return a + b

result = add(10, 20)

print(result)
```

Output:

```text
30
```

---

## Multiple Returns

```python id="n5v8r3"
def calculation(a, b):
    return a+b, a-b

x, y = calculation(10, 5)

print(x)
print(y)
```

Output:

```text
15
5
```

---

## Example — Find Maximum

```python id="u2m6p9"
def maximum(a, b):
    if a > b:
        return a
    else:
        return b

print(maximum(10, 20))
```

---

## Function Without Return

```python id="w4s1e7"
def show():
    print("Python")

x = show()

print(x)
```

Output:

```text
Python
None
```

---

## 8. DocString

### What is DocString?

A DocString is documentation written inside function.

Used to describe:

* Purpose
* Parameters
* Return value

---

## Syntax

```python id="e6h2f5"
def function():
    """DocString"""
```

---

## Example

```python id="z3x8c1"
def add(a, b):
    """
    This function adds two numbers
    """

    return a + b
```

---

## Accessing DocString

```python id="a4m7n9"
print(add.__doc__)
```

Output:

```text
This function adds two numbers
```

---

## Example — Student Function

```python id="r8t1y4"
def student(name):
    """
    Displays student name
    """

    print(name)

student("Arun")
```

---

## 9. Lambda Functions

### What is Lambda?

A lambda function is an anonymous small function.

---

## Syntax

```python id="u7i3o5"
lambda arguments : expression
```

---

## Example

```python id="f2g8h6"
x = lambda a : a * 2

print(x(5))
```

Output:

```text
10
```

---

## Example — Addition

```python id="q5w2e8"
add = lambda a,b : a+b

print(add(10,20))
```

---

## Lambda with map()

```python id="m9n4b7"
a = [1,2,3,4]

result = list(map(lambda x:x*2, a))

print(result)
```

Output:

```python id="l1k5j3"
[2, 4, 6, 8]
```

---

## Lambda with filter()

```python id="v3c7x1"
a = [1,2,3,4,5,6]

result = list(filter(lambda x:x%2==0, a))

print(result)
```

Output:

```python id="b8n2m6"
[2, 4, 6]
```

---

## Lambda vs Normal Function

| Normal Function     | Lambda            |
| ------------------- | ----------------- |
| Uses `def`          | Uses `lambda`     |
| Multiple statements | Single expression |
| Named               | Anonymous         |

---

## 10. Recursive Functions

### What is Recursion?

A function calling itself is called recursion.

---

## Example — Factorial

```python id="y6u3i8"
def factorial(n):

    if n == 1:
        return 1

    return n * factorial(n-1)

print(factorial(5))
```

Output:

```text
120
```

---

## Working

```text
5 * factorial(4)
4 * factorial(3)
3 * factorial(2)
2 * factorial(1)
```

---

## Base Condition

Important condition to stop recursion.

Without it:

* Infinite recursion occurs

---

## Example — Sum of Numbers

```python id="o9p4a2"
def total(n):

    if n == 0:
        return 0

    return n + total(n-1)

print(total(5))
```

Output:

```text
15
```

---

## Example — Fibonacci

```python id="t5y8u1"
def fib(n):

    if n <= 1:
        return n

    return fib(n-1) + fib(n-2)

print(fib(6))
```

Output:

```text
8
```

---

## Advantages of Recursion

* Cleaner code
* Good for tree/graph problems

---

## Disadvantages

* More memory
* Slower sometimes

---

## 11. Changing the Recursive Depth

Python limits recursion depth.

---

## Default Recursion Limit

Usually around:

```text
1000
```

---

## Checking Limit

```python id="r2e7w5"
import sys

print(sys.getrecursionlimit())
```

---

## Changing Limit

```python id="p8o4i1"
import sys

sys.setrecursionlimit(2000)
```

---

## Example

```python id="d5f9g3"
import sys

sys.setrecursionlimit(3000)

print(sys.getrecursionlimit())
```

---

## Warning

Very large recursion depth may crash program.

---

## 12. Call by Value

### Meaning

In call by value:

* Copy of value passed
* Original value unchanged

Python behaves similarly for immutable types.

---

## Example

```python id="k1l7m4"
def change(x):
    x = x + 10
    print(x)

a = 5

change(a)

print(a)
```

Output:

```text
15
5
```

---

## Explanation

`x` changes locally.
Original `a` not affected.

---

## Immutable Types

* int
* float
* string
* tuple

Behave like call by value.

---

## 13. Call by Reference

### Meaning

Reference of object passed.

Changes affect original object.

Python behaves similarly for mutable objects.

---

## Example with List

```python id="s9d4f2"
def modify(data):
    data.append(100)

a = [1,2,3]

modify(a)

print(a)
```

Output:

```python id="w3e8r1"
[1, 2, 3, 100]
```

---

## Explanation

List object modified directly.

---

## Mutable Types

* list
* dictionary
* set

Behave like call by reference.

---

## Example — Dictionary

```python id="c6v2b9"
def update(emp):
    emp["salary"] = 50000

e = {"name":"John", "salary":30000}

update(e)

print(e)
```

Output:

```python id="q1w7e5"
{'name': 'John', 'salary': 50000}
```

---

## 14. Important Differences

## Local vs Global Variable

| Local           | Global           |
| --------------- | ---------------- |
| Inside function | Outside function |
| Limited scope   | Entire program   |

---

## Lambda vs Normal Function

| Lambda            | Normal              |
| ----------------- | ------------------- |
| Anonymous         | Named               |
| Single expression | Multiple statements |

---

## Call by Value vs Reference

| Call by Value      | Call by Reference   |
| ------------------ | ------------------- |
| Copy passed        | Reference passed    |
| Original unchanged | Original may change |

---

## 15. Real-Time Examples

| Application | Function Usage       |
| ----------- | -------------------- |
| Banking     | Interest calculation |
| Hospital    | Patient processing   |
| E-commerce  | Order processing     |
| Payroll     | Salary calculation   |

---

## 16. Practice Programs

---

## Program 1 — Even or Odd

```python id="m5n8b2"
def even_odd(n):

    if n % 2 == 0:
        return "Even"
    else:
        return "Odd"

print(even_odd(10))
```

---

## Program 2 — Largest of 3 Numbers

```python id="p3o7i9"
def largest(a,b,c):

    if a>b and a>c:
        return a

    elif b>c:
        return b

    else:
        return c

print(largest(10,50,20))
```

---

## Program 3 — Recursive Reverse Number

```python id="x8c2v6"
def reverse(n, rev=0):

    if n == 0:
        return rev

    return reverse(n//10, rev*10 + n%10)

print(reverse(1234))
```

Output:

```text
4321
```

---

## Summary

| Topic             | Key Point              |
| ----------------- | ---------------------- |
| Function          | Reusable code block    |
| Parameters        | Receive values         |
| Local Variable    | Exists inside function |
| Default Argument  | Predefined value       |
| Keyword Argument  | Name-based arguments   |
| return            | Sends result           |
| DocString         | Documentation          |
| Lambda            | Anonymous function     |
| Recursion         | Function calls itself  |
| Call by Value     | Copy passed            |
| Call by Reference | Reference passed       |

```
```

# Ch : 12 Python Modules — Detailed Notes

---

## 1. Introduction to Modules

### What is a Module?

A **Module** is a file containing:

* Python code
* Functions
* Variables
* Classes

A module helps organize code into separate files.

---

## Why Modules are Used?

| Advantage           | Description             |
| ------------------- | ----------------------- |
| Reusability         | Use code multiple times |
| Modularity          | Divide large programs   |
| Easy Maintenance    | Easier debugging        |
| Better Organization | Structured coding       |

---

## Example

Suppose we have:

```text
mathoperations.py
```

It contains:

```python id="m1n4b7"
def add(a,b):
    return a+b
```

We can use it in another file.

---

## Importing Module

### Syntax

```python id="q5w8e2"
import module_name
```

---

## Example

```python id="v2c6x1"
import math

print(math.sqrt(25))
```

Output:

```text id="b9n3m5"
5.0
```

---

## Common Built-in Modules

| Module   | Purpose                |
| -------- | ---------------------- |
| math     | Mathematical functions |
| random   | Random numbers         |
| os       | Operating system       |
| sys      | System functions       |
| datetime | Date and time          |

---

## 2. Using the sys Module

### What is sys Module?

The `sys` module provides:

* System-specific information
* Python interpreter interaction

---

## Importing sys

```python id="z7x4c1"
import sys
```

---

## Useful sys Functions

| Function                | Purpose                 |
| ----------------------- | ----------------------- |
| sys.version             | Python version          |
| sys.path                | Module search path      |
| sys.argv                | Command line arguments  |
| sys.exit()              | Exit program            |
| sys.getrecursionlimit() | Current recursion limit |

---

## Example — Python Version

```python id="p3o7i1"
import sys

print(sys.version)
```

---

## Example — Module Search Path

```python id="a8s5d2"
import sys

print(sys.path)
```

---

## Example — Command Line Arguments

```python id="k4l9m3"
import sys

print(sys.argv)
```

---

## Example — Exit Program

```python id="t2y6u4"
import sys

print("Start")

sys.exit()

print("End")
```

Output:

```text id="u8v2w5"
Start
```

---

## Example — Recursion Limit

```python id="j1h7g6"
import sys

print(sys.getrecursionlimit())
```

---

## Changing Recursion Limit

```python id="r5t9y7"
import sys

sys.setrecursionlimit(2000)
```

---

## 3. Byte-Compiled .pyc Files

### What is .pyc File?

Python converts source code into:

* Byte code
* Stored as `.pyc` file

---

## Purpose

* Faster execution
* Avoid recompilation

---

## Process

```text id="o4p8q1"
.py file → bytecode → .pyc file
```

---

## Location

Usually stored inside:

```text id="f7g2h3"
__pycache__
```

---

## Example

If file is:

```text id="w3e6r8"
test.py
```

Python may create:

```text id="x9c4v2"
__pycache__/test.cpython-312.pyc
```

---

## Advantages of .pyc

| Advantage            | Description            |
| -------------------- | ---------------------- |
| Faster loading       | Reuses bytecode        |
| Improved performance | Saves compilation time |

---

## Important Note

* `.pyc` is platform independent
* Automatically generated

---

## 4. The from..import Statement

### What is from..import?

Imports specific functions or variables from module.

---

## Syntax

```python id="c6v1b9"
from module import function
```

---

## Example

```python id="m8n3b5"
from math import sqrt

print(sqrt(16))
```

Output:

```text id="q2w7e4"
4.0
```

---

## Multiple Imports

```python id="z4x8c2"
from math import sqrt, factorial

print(sqrt(25))
print(factorial(5))
```

---

## Import All

```python id="k5j9h3"
from math import *
```

Now functions can be used directly.

```python id="t7u1i4"
print(sqrt(49))
```

---

## Difference Between import and from..import

| import           | from..import           |
| ---------------- | ---------------------- |
| Uses module name | Direct function access |
| `math.sqrt()`    | `sqrt()`               |

---

## Example

Using import:

```python id="b3n7m1"
import math

print(math.pow(2,3))
```

Using from..import:

```python id="v9c2x6"
from math import pow

print(pow(2,3))
```

---

## 5. A Module's **name**

### What is **name**?

Every module has a special variable:

```python id="l8k4j7"
__name__
```

It tells:

* Whether file is running directly
* Or imported as module

---

## Values of **name**

| Situation        | Value        |
| ---------------- | ------------ |
| Direct execution | `"__main__"` |
| Imported module  | Module name  |

---

## Example

File:

```text id="m2n6b8"
test.py
```

Code:

```python id="p5o9i2"
print(__name__)
```

Output when run directly:

```text id="d4f7g1"
__main__
```

---

## Using a Module's **name**

### Example

```python id="r8t3y5"
def add(a,b):
    return a+b

if __name__ == "__main__":
    print(add(10,20))
```

---

## Purpose

Code inside:

```python id="n1m5b7"
if __name__ == "__main__":
```

runs only when file executed directly.

---

## Example Scenario

### File: operations.py

```python id="u6i2o8"
def add(a,b):
    return a+b

print("Operations Module")
```

---

### File: main.py

```python id="q9w4e1"
import operations
```

Output:

```text id="f3g8h2"
Operations Module
```

---

## Better Version

```python id="z2x7c5"
def add(a,b):
    return a+b

if __name__ == "__main__":
    print("Operations Module")
```

Now message appears only during direct execution.

---

## 6. Making Your Own Modules

### Creating your own Modules

A Python file itself can become module.

---

## Example — Create Module

File:

```text id="b5n1m4"
calculator.py
```

Code:

```python id="c8v3x6"
def add(a,b):
    return a+b

def sub(a,b):
    return a-b
```

---

## Using Custom Module

Another file:

```python id="k1j7h9"
import calculator

print(calculator.add(10,20))
print(calculator.sub(50,10))
```

Output:

```text id="l4p8o2"
30
40
```

---

## Module with Variable

### File: data.py

```python id="m7n2b5"
company = "ABC"

def display():
    print(company)
```

---

## Main File

```python id="x3c6v9"
import data

print(data.company)

data.display()
```

---

## 7. from..import in Custom Modules

### Example

File:

```text id="a6s9d1"
sample.py
```

```python id="q4w7e2"
def square(x):
    return x*x
```

---

## Main Program

```python id="v8b2n5"
from sample import square

print(square(5))
```

Output:

```text id="m1k4j8"
25
```

---

## Import Multiple Functions

```python id="y7u3i6"
from sample import square, cube
```

---

## Import All

```python id="t9r5e1"
from sample import *
```

---

## Aliasing Modules

### Using as Keyword

```python id="f6g2h4"
import math as m

print(m.sqrt(16))
```

---

## Function Alias

```python id="k3l8p1"
from math import factorial as fact

print(fact(5))
```

---

## 8. The dir() Function

### What is dir()?

`dir()` returns:

* List of names
* Functions
* Variables
* Attributes inside module/object

---

## Syntax

```python id="n2m7b4"
dir(object)
```

---

## Example with math module

```python id="w5e9r3"
import math

print(dir(math))
```

---

## Output

```text id="c1v6x8"
['acos', 'asin', 'atan', 'ceil', 'cos', ...]
```

---

## Using the dir Function

### Example

```python id="u4i8o2"
import sys

print(dir(sys))
```

---

## dir() Without Argument

```python id="p7o3i5"
x = 10

print(dir())
```

Shows current namespace.

---

## Example — Custom Module

### File: employee.py

```python id="d5f9g2"
name = "John"

def display():
    print(name)
```

---

### Main Program

```python id="h8j2k6"
import employee

print(dir(employee))
```

Output contains:

```text id="q6w1e7"
['display', 'name']
```

---

## 9. Module Search Path

Python searches modules in:

1. Current folder
2. Standard library
3. Installed packages

---

## Checking Search Path

```python id="r4t8y1"
import sys

print(sys.path)
```

---

## 10. Packages

### What is Package?

A package is collection of modules.

---

## Example Structure

```text id="y1u5i9"
mypackage/
    __init__.py
    math1.py
    math2.py
```

---

## Import Package Module

```python id="o8p2a6"
from mypackage import math1
```

---

## 11. Important Differences

## Module vs Package

| Module             | Package               |
| ------------------ | --------------------- |
| Single Python file | Collection of modules |
| `.py` file         | Folder                |

---

## import vs from..import

| import             | from..import             |
| ------------------ | ------------------------ |
| Full module access | Specific function access |
| `math.sqrt()`      | `sqrt()`                 |

---

## 12. Real-Time Applications

| Application | Module Usage       |
| ----------- | ------------------ |
| Banking     | Transaction module |
| Hospital    | Patient module     |
| E-commerce  | Payment module     |
| Games       | Graphics module    |

---

## 13. Practice Programs

---

## Program 1 — Create Custom Module

### File: area.py

```python id="v2c7x4"
def square(side):
    return side * side
```

---

### Main File

```python id="m9n5b1"
import area

print(area.square(5))
```

---

## Program 2 — Using sys Module

```python id="k6j1h8"
import sys

print("Python Version:")
print(sys.version)
```

---

## Program 3 — Using dir()

```python id="t3y7u9"
import math

print(dir(math))
```

---

## Program 4 — Module Alias

```python id="x5c9v2"
import math as m

print(m.factorial(5))
```

---

## 14. Summary

| Topic        | Key Point               |
| ------------ | ----------------------- |
| Module       | Reusable Python file    |
| import       | Imports module          |
| from..import | Imports specific items  |
| sys module   | System functions        |
| **name**     | Module execution status |
| dir()        | Lists module contents   |
| .pyc         | Byte-compiled file      |
| Package      | Collection of modules   |

---

## Final Quick Example

### File: operations.py

```python id="q8w4e6"
def add(a,b):
    return a+b
```

---

### Main File

```python id="n1m6b3"
from operations import add

print(add(10,20))
```

Output:

```text id="l5k9j2"
30
```

```
```

# Ch 13: Python Errors and Exceptions — Detailed Notes

---

## 1. Introduction to Errors and Exceptions

### What is an Error?

An **Error** is a problem in a program that causes abnormal execution.

Errors may:

* Stop the program
* Produce incorrect output

---

## Types of Errors

| Error Type    | Description            |
| ------------- | ---------------------- |
| Syntax Error  | Wrong Python syntax    |
| Runtime Error | Error during execution |
| Logical Error | Wrong logic/output     |

---

## Example of Error

```python id="m1n4b7"
print("Hello"
```

Output:

```text id="x7c2v5"
SyntaxError
```

---

## 2. Errors

---

## Syntax Errors

Occurs when Python grammar rules are violated.

---

## Example

```python id="p5o9i2"
if 10 > 5
    print("Hello")
```

Output:

```text id="l3k8j1"
SyntaxError
```

---

## Correct Version

```python id="r6t2y4"
if 10 > 5:
    print("Hello")
```

---

## Runtime Errors

Occurs during execution.

---

## Example — Division by Zero

```python id="v9b3n6"
a = 10
b = 0

print(a / b)
```

Output:

```text id="m2n7b5"
ZeroDivisionError
```

---

## Example — Invalid Index

```python id="x4c8v1"
a = [1,2,3]

print(a[10])
```

Output:

```text id="t5y9u3"
IndexError
```

---

## Logical Errors

Program runs but output is wrong.

---

## Example

```python id="q7w1e6"
a = 10
b = 20

print(a - b)
```

Suppose user expected addition.

Output:

```text id="f8g2h4"
-10
```

---

## 3. Exceptions

### What is Exception?

An **Exception** is a runtime error that interrupts program execution.

Python provides exception handling to prevent program crash.

---

## Common Exceptions

| Exception         | Description        |
| ----------------- | ------------------ |
| ZeroDivisionError | Division by zero   |
| ValueError        | Invalid value      |
| IndexError        | Invalid index      |
| NameError         | Variable not found |
| TypeError         | Wrong datatype     |
| FileNotFoundError | File missing       |

---

## Example

```python id="u3i7o2"
num = int("abc")
```

Output:

```text id="p6o1i5"
ValueError
```

---

## 4. Try..Except

### What is try..except?

Used to handle exceptions safely.

---

## Syntax

```python id="d4f8g1"
try:
    risky code

except:
    handling code
```

---

## Example

```python id="k7j2h9"
try:
    a = 10
    b = 0

    print(a / b)

except:
    print("Error occurred")
```

Output:

```text id="m5n9b2"
Error occurred
```

---

## Working

| Block  | Purpose                   |
| ------ | ------------------------- |
| try    | Code that may cause error |
| except | Handles error             |

---

## Handling Exceptions

---

## Example — Specific Exception

```python id="x8c3v6"
try:
    a = 10
    b = 0

    print(a / b)

except ZeroDivisionError:
    print("Cannot divide by zero")
```

---

## Example — Index Error

```python id="r1t5y8"
try:
    a = [1,2,3]

    print(a[5])

except IndexError:
    print("Invalid index")
```

---

## Multiple Exceptions

```python id="q2w6e9"
try:
    a = int(input("Enter number:"))
    b = 10 / a

    print(b)

except ZeroDivisionError:
    print("Division by zero")

except ValueError:
    print("Invalid input")
```

---

## Using Exception Object

```python id="v4b9n1"
try:
    print(10 / 0)

except Exception as e:
    print("Error:", e)
```

Output:

```text id="y7u2i4"
Error: division by zero
```

---

## Generic Exception Handling

```python id="o5p1a7"
try:
    x = int("abc")

except Exception:
    print("Some error occurred")
```

---

## else Block

Runs if no exception occurs.

---

## Syntax

```python id="f3g7h2"
try:
    statements

except:
    statements

else:
    statements
```

---

## Example

```python id="j6k1l8"
try:
    a = 10
    b = 2

    print(a / b)

except ZeroDivisionError:
    print("Error")

else:
    print("Division successful")
```

Output:

```text id="t9y4u6"
5.0
Division successful
```

---

## 5. Raising Exceptions

### What is Raising Exception?

Python allows programmers to manually generate exceptions.

---

## Why Raise Exceptions?

* Validate input
* Enforce rules
* Stop invalid operations

---

## Syntax

```python id="w2e8r4"
raise ExceptionName("message")
```

---

## How To Raise Exceptions

---

## Example — Raise ValueError

```python id="m7n3b5"
age = -5

if age < 0:
    raise ValueError("Age cannot be negative")
```

Output:

```text id="c1v6x9"
ValueError: Age cannot be negative
```

---

## Example — Raise Exception

```python id="u4i9o1"
marks = 120

if marks > 100:
    raise Exception("Invalid marks")
```

---

## Example — Banking

```python id="p8o3i6"
balance = 500
withdraw = 1000

if withdraw > balance:
    raise Exception("Insufficient balance")
```

---

## Handling Raised Exceptions

```python id="d5f1g7"
try:

    age = -2

    if age < 0:
        raise ValueError("Negative age not allowed")

except ValueError as e:
    print(e)
```

Output:

```text id="k8j4h2"
Negative age not allowed
```

---

## 6. User-Defined Exceptions

### Creating Custom Exception

---

## Syntax

```python id="r2t7y5"
class MyError(Exception):
    pass
```

---

## Example

```python id="x9c5v1"
class InvalidSalary(Exception):
    pass

salary = -1000

if salary < 0:
    raise InvalidSalary("Salary cannot be negative")
```

---

## Handling Custom Exception

```python id="q4w8e3"
class InvalidAge(Exception):
    pass

try:

    age = -1

    if age < 0:
        raise InvalidAge("Invalid age")

except InvalidAge as e:
    print(e)
```

---

## 7. Try..Finally

### What is finally?

`finally` block always executes:

* Whether exception occurs or not

Used for:

* Closing files
* Releasing resources
* Database cleanup

---

## Syntax

```python id="m1n6b8"
try:
    statements

except:
    statements

finally:
    statements
```

---

## Example

```python id="v3c7x2"
try:
    print(10 / 0)

except ZeroDivisionError:
    print("Division error")

finally:
    print("Program completed")
```

Output:

```text id="b6n2m4"
Division error
Program completed
```

---

## Using Finally

---

## Example Without Exception

```python id="t5y1u7"
try:
    print("Hello")

finally:
    print("Finally block")
```

Output:

```text id="o8p4a2"
Hello
Finally block
```

---

## File Handling with finally

```python id="f7g3h1"
f = None

try:
    f = open("sample.txt", "r")
    print(f.read())

except FileNotFoundError:
    print("File not found")

finally:

    if f:
        f.close()

    print("File closed")
```

---

## Why finally is Important?

Even if error occurs:

* Resources are cleaned properly

---

## 8. Nested try..except

### Example

```python id="j2k8l5"
try:

    a = int(input("Enter number:"))

    try:
        print(10 / a)

    except ZeroDivisionError:
        print("Division by zero")

except ValueError:
    print("Invalid input")
```

---

## 9. Complete Exception Flow

```python id="r5t1y9"
try:
    statements

except:
    handling

else:
    no error block

finally:
    always executed
```

---

## Flow Explanation

| Block   | Executes When       |
| ------- | ------------------- |
| try     | Always              |
| except  | If exception occurs |
| else    | If no exception     |
| finally | Always              |

---

## 10. Important Built-in Exceptions

| Exception         | Example                |
| ----------------- | ---------------------- |
| ZeroDivisionError | `10/0`                 |
| ValueError        | `int("abc")`           |
| IndexError        | `a[10]`                |
| NameError         | Undefined variable     |
| TypeError         | Wrong datatype         |
| KeyError          | Missing dictionary key |
| FileNotFoundError | Missing file           |

---

## 11. Real-Time Applications

| Application     | Exception Usage      |
| --------------- | -------------------- |
| Banking         | Insufficient balance |
| Hospital        | Invalid patient ID   |
| Login System    | Wrong password       |
| File Processing | Missing files        |

---

## 12. Practice Programs

---

## Program 1 — Safe Division

```python id="u6i2o9"
try:

    a = int(input("Enter first number:"))
    b = int(input("Enter second number:"))

    print(a / b)

except ZeroDivisionError:
    print("Cannot divide by zero")

except ValueError:
    print("Enter valid number")
```

---

## Program 2 — Validate Marks

```python id="q9w5e1"
marks = int(input("Enter marks:"))

try:

    if marks < 0 or marks > 100:
        raise ValueError("Marks should be between 0 and 100")

    print("Valid marks")

except ValueError as e:
    print(e)
```

---

## Program 3 — Handle List Index

```python id="k3j7h4"
try:

    a = [10,20,30]

    print(a[5])

except IndexError:
    print("Index out of range")
```

---

## Program 4 — Finally Example

```python id="p7o2i8"
try:
    print("Program running")

finally:
    print("Always executed")
```

---

## 13. Important Differences

## Error vs Exception

| Error                 | Exception      |
| --------------------- | -------------- |
| Serious issue         | Runtime issue  |
| Often not recoverable | Can be handled |

---

## try..except vs try..finally

| try..except       | try..finally        |
| ----------------- | ------------------- |
| Handles errors    | Cleanup operations  |
| Exception-focused | Resource management |

---

## raise vs except

| raise             | except            |
| ----------------- | ----------------- |
| Creates exception | Handles exception |

---

## 14. Summary

| Topic            | Key Point                   |
| ---------------- | --------------------------- |
| Error            | Problem in program          |
| Exception        | Runtime error               |
| try              | Risky code                  |
| except           | Handles errors              |
| else             | Runs if no error            |
| finally          | Always executes             |
| raise            | Manually generate exception |
| Custom Exception | User-defined error          |

---

## Final Quick Example

```python id="x4c9v2"
try:

    num = int(input("Enter number:"))

    if num < 0:
        raise ValueError("Negative number not allowed")

    print(num)

except ValueError as e:
    print(e)

finally:
    print("Program ended")
```

```
```

# Ch : 14 Debugging in Python using `pdb`

### 1. Introduction to Debugging

Debugging is the process of:

* Finding errors (bugs)
* Understanding program execution
* Checking variable values
* Fixing incorrect logic

Python provides a built-in debugger called:

```python
pdb
```

`pdb` stands for:

```text
Python Debugger
```

It allows programmers to:

* Pause program execution
* Execute line by line
* Inspect variables
* Set breakpoints
* Trace function calls

---

## 2. Importing `pdb`

```python
import pdb
```

---

## 3. Starting the Debugger

### Method 1 — Using `pdb.set_trace()`

```python
import pdb

a = 10
b = 20

pdb.set_trace()

c = a + b
print(c)
```

When execution reaches:

```python
pdb.set_trace()
```

the debugger stops and shows:

```text
(Pdb)
```

Now we can type debugger commands.

---

## 4. Setting Break Points

### What is a Breakpoint?

A breakpoint is:

* A stopping point in the program
* Used to pause execution and inspect the program state

---

### Example

```python
import pdb

x = 5
y = 10

pdb.set_trace()

z = x + y
print(z)
```

Execution pauses before calculating `z`.

---

### Running from Command Line

```bash
python -m pdb sample.py
```

---

## 5. Printing Values of Variables

Inside debugger:

```text
(Pdb) p x
```

Output:

```text
5
```

---

### Printing Multiple Variables

```text
(Pdb) p y
(Pdb) p z
```

---

### Using `pp` (Pretty Print)

```text
(Pdb) pp mylist
```

Useful for:

* Dictionaries
* Lists
* Nested structures

---

### Example

```python
data = {
    "name": "John",
    "age": 25
}
```

Debugger:

```text
(Pdb) pp data
```

---

## 6. Getting Help

Use:

```text
(Pdb) help
```

or

```text
(Pdb) h
```

---

### Help for Specific Command

```text
(Pdb) help break
```

or

```text
(Pdb) h break
```

---

## 7. Listing the Code

### Command

```text
(Pdb) list
```

or

```text
(Pdb) l
```

Displays nearby lines of source code.

---

### Example Output

```text
10 x = 5
11 y = 10
12 pdb.set_trace()
13 z = x + y
14 print(z)
```

---

### List More Lines

```text
(Pdb) l
```

again shows the next set of lines.

---

## 8. Stepping Into the Function

### Command

```text
(Pdb) step
```

or

```text
(Pdb) s
```

Moves execution:

* Into the called function
* Line by line

---

### Example

```python
def add(a, b):
    c = a + b
    return c

x = 10
y = 20

pdb.set_trace()

z = add(x, y)
print(z)
```

Using:

```text
(Pdb) s
```

enters the `add()` function.

---

## 9. Stepping Over a Function

### Command

```text
(Pdb) next
```

or

```text
(Pdb) n
```

Executes:

* Current line
* Without entering called functions

---

### Difference Between `step` and `next`

| Command | Meaning                            |
| ------- | ---------------------------------- |
| `step`  | Goes inside function               |
| `next`  | Executes function without entering |

---

### Example

```text
(Pdb) n
```

Moves to next line.

---

## 10. Continue Till the Next Break Point

### Command

```text
(Pdb) continue
```

or

```text
(Pdb) c
```

Program runs normally until:

* Another breakpoint occurs
* Program ends

---

## 11. Setting Temporary Break Points

Temporary breakpoint:

* Stops only once
* Automatically removed afterward

---

### Command

```text
(Pdb) tbreak 15
```

Stops at line 15 only once.

---

### Example

```text
(Pdb) tbreak sample.py:20
```

---

## 12. Listing Break Points

### Command

```text
(Pdb) break
```

or

```text
(Pdb) b
```

Shows all breakpoints.

---

### Example Output

```text
Num Type         Disp Enb Where
1   breakpoint   keep yes at sample.py:10
2   breakpoint   del  yes at sample.py:20
```

---

## 13. Associating Conditions to the Break Point

Conditional breakpoints stop execution only when a condition becomes true.

---

### Syntax

```text
(Pdb) break line_number, condition
```

---

### Example

```text
(Pdb) break 15, x > 100
```

Debugger stops only if:

```python
x > 100
```

---

### Example Program

```python
for i in range(200):
    print(i)
```

Debugger:

```text
(Pdb) break 2, i == 150
```

Execution stops only when:

```python
i == 150
```

---

## 14. Enable / Disable Break Points

### Disable Breakpoint

```text
(Pdb) disable 1
```

Disables breakpoint number 1.

---

### Enable Breakpoint

```text
(Pdb) enable 1
```

Enables breakpoint again.

---

### Delete Breakpoint

```text
(Pdb) clear 1
```

---

### Delete All Breakpoints

```text
(Pdb) clear
```

---

## 15. Trace Back

Traceback shows:

* Function call history
* Execution path
* Error origin

---

### Command

```text
(Pdb) where
```

or

```text
(Pdb) w
```

---

### Example Output

```text
> sample.py(15)add()
-> return a + b
```

Displays:

* Current function
* Line number
* Call stack

---

## 16. Move Between Frames

Frames represent function execution contexts.

Debugger allows moving:

* Up to caller function
* Down to called function

---

## 17. Moving Up the Stack

### Command

```text
(Pdb) up
```

Moves to:

* Previous frame
* Caller function

---

## 18. Moving Down the Stack

### Command

```text
(Pdb) down
```

Moves to:

* Next frame
* Called function

---

## 19. Example for Frames

```python
import pdb

def square(x):
    return x * x

def calculate(n):
    result = square(n)
    return result

pdb.set_trace()

print(calculate(5))
```

Using:

* `step`
* `up`
* `down`

you can move between function calls.

---

## 20. Important `pdb` Commands Summary

| Command  | Short Form | Purpose              |
| -------- | ---------- | -------------------- |
| help     | h          | Show help            |
| list     | l          | List source code     |
| break    | b          | Set/list breakpoints |
| tbreak   | —          | Temporary breakpoint |
| continue | c          | Continue execution   |
| step     | s          | Step into function   |
| next     | n          | Step over function   |
| print    | p          | Print variable       |
| pp       | —          | Pretty print         |
| where    | w          | Show traceback       |
| up       | —          | Move up frame        |
| down     | —          | Move down frame      |
| disable  | —          | Disable breakpoint   |
| enable   | —          | Enable breakpoint    |
| clear    | —          | Remove breakpoint    |
| quit     | q          | Exit debugger        |

---

## 21. Complete Example Program

```python
import pdb

def multiply(a, b):
    result = a * b
    return result

def main():
    x = 5
    y = 10

    pdb.set_trace()

    z = multiply(x, y)

    print("Result =", z)

main()
```

---

## 22. Sample Debugging Session

```text
> sample.py(11)main()
-> z = multiply(x, y)

(Pdb) p x
5

(Pdb) p y
10

(Pdb) s
--Call--
> sample.py(3)multiply()

(Pdb) n
> sample.py(4)multiply()
-> return result

(Pdb) p result
50

(Pdb) c
Result = 50
```

---

## 23. Advantages of `pdb`

* Built into Python
* No external installation needed
* Helps identify logic errors
* Useful for large applications
* Allows runtime inspection

---

## 24. Limitations

* Command-line based
* Slower than graphical debuggers
* Requires understanding of commands

---

## 25. IDE Debuggers

Many IDEs internally use debugger concepts similar to `pdb`.

Examples:

* PyCharm
* Visual Studio Code
* Spyder

These provide:

* Graphical breakpoints
* Variable watch windows
* Step execution buttons
* Call stack visualization

```
```