# Ch:5 Python — Friends in the New Land (Getting Help)

Python provides built-in helper functions to explore and learn easily.

Main helper functions:

* `dir()`
* `type()`
* `help()`

These are called:

> Python introspection tools.

They help programmers understand objects, functions, and modules.

---

## `dir()`

### Purpose

Displays:

* available methods
* attributes
* functions

inside an object/module.

---

### Syntax

```python id="i4owhr"
dir(object)
```

---

### Example

```python id="qd3n9e"
x = "python"
print(dir(x))
```

Shows all string methods like:

```text id="8c2r5t"
upper
lower
split
replace
```

---

### Use

Used to explore:

* unknown objects
* modules
* functions

---

## `type()`

### Purpose

Returns:

* datatype/class of an object.

---

### Syntax

```python id="pbk1lk"
type(object)
```

---

### Example

```python id="gtulfs"
x = 10
print(type(x))
```

Output:

```text id="5jq0v7"
<class 'int'>
```

---

### More Examples

```python id="v3rz9z"
type("hello")
type([1,2,3])
type(10.5)
```

Outputs:

```text id="zsx8rn"
str
list
float
```

---

## `help()`

### Purpose

Displays:

* documentation
* description
* usage information

about functions, modules, or objects.

---

### Syntax

```python id="w6i6b7"
help(object)
```

---

### Example

```python id="j2vt2t"
help(str)
```

Shows:

* string class details
* methods
* explanations

---

## `help()`

If used without arguments:

```python id="9ofqma"
help()
```

Python opens:

* interactive help system.

You can search topics directly.

---

## Example

```python id="h5uknc"
help(len)
```

Displays:

* purpose of `len()`
* syntax
* usage details

---

## Quick Comparison

| Function | Purpose                 |
| -------- | ----------------------- |
| `dir()`  | Shows available members |
| `type()` | Shows datatype          |
| `help()` | Shows documentation     |

---

## Final Summary

### `dir()`

Explore available methods.

### `type()`

Know object datatype.

### `help()`

Learn usage and documentation.

These are very useful for:

* beginners
* debugging
* self-learning Python.


```
```

# Ch:6 Running Python Statements 
> Writing Python Scripts

### Python Statement

A Python statement is:

> an instruction given to Python interpreter for execution.

Example:

```python id="jlwmx2"
print("Hello")
```

---

## Ways to Run Python Statements

### 1. Interactive Mode

Python statements are executed:

* one by one
* immediately after typing.

#### Example

```python id="s0y49v"
>>> 10 + 20
30
```

#### Features

* Quick testing
* Immediate output
* Useful for beginners

---

## 2. Script Mode

Python code is written in:

* a file with `.py` extension

Example:

```text id="jlwmx3"
program.py
```

Run using:

```bash id="jlwmx4"
python program.py
```

---

## Example Program

```python id="jlwmx5"
a = 10
b = 20
print(a + b)
```

Output:

```text id="jlwmx6"
30
```

---

## Running Python in Different Environments

| Environment      | Usage                    |
| ---------------- | ------------------------ |
| Python IDLE      | Beginner practice        |
| Command Prompt   | Run `.py` files          |
| Jupyter Notebook | Interactive coding       |
| VS Code          | Professional development |
| PyCharm          | Full IDE support         |

---

## Steps to Run a Python Program

### 1. Write Code

```python id="jlwmx7"
print("Welcome")
```

### 2. Save File

```text id="jlwmx8"
test.py
```

### 3. Execute

```bash id="jlwmx9"
python test.py
```

---

## Important Points

* Python executes statements line by line.
* Indentation is important.
* Errors stop execution unless handled.

---

## Advantages of Python Execution

* Simple syntax
* Fast testing
* Easy debugging
* No compilation step required explicitly

---

## Final Summary

### Interactive Mode

* One-by-one execution
* Immediate result

### Script Mode

* Entire program execution
* Saved in `.py` file

Python statements are executed by:

> Python Interpreter.

```
```

## Writing Python Scripts — Short Notes

### Python Script

A Python script is:

> a file containing Python code saved with `.py` extension.

Example:

```text id="jlwmx10"
sample.py
```

---

## Steps to Write a Python Script

### 1. Open Editor/IDE

Examples:

* IDLE
* VS Code
* PyCharm
* Jupyter Notebook

---

### 2. Write Python Code

Example:

```python id="jlwmx11"
print("Hello Python")
```

---

### 3. Save File

Save using:

```text id="jlwmx12"
filename.py
```

Example:

```text id="jlwmx13"
hello.py
```

---

### 4. Run the Script

Using terminal/command prompt:

```bash id="jlwmx14"
python hello.py
```

Output:

```text id="jlwmx15"
Hello Python
```

---

## Features of Python Scripts

* Stored permanently in files
* Reusable
* Easy to edit and maintain
* Supports large programs

---

## Example Script

```python id="jlwmx16"
a = 10
b = 20

sum = a + b

print(sum)
```

Output:

```text id="jlwmx17"
30
```

---

## Advantages

* Better for large programs
* Easy debugging
* Reusability
* Organized coding

---

## Script Mode vs Interactive Mode

| Interactive Mode   | Script Mode             |
| ------------------ | ----------------------- |
| One line at a time | Full program execution  |
| Temporary          | Saved permanently       |
| Testing purpose    | Application development |

---

## Important Points

* Python files use `.py` extension
* Python executes code line by line
* Indentation is important

---

## Final Summary

Writing Python scripts involves:

1. Writing code
2. Saving as `.py`
3. Running using Python interpreter

Example:

```bash id="jlwmx18"
python program.py
```

```
```

# Ch: 7 Built-in Functions in Python

### Definition

Built-in functions are:

> predefined functions already available in Python.

We can use them directly without importing any module.

They help perform common tasks like:

* input/output
* type conversion
* calculations
* length checking
* sorting

---

## Features of Built-in Functions

* Ready to use
* Reduce coding effort
* Faster development
* Improve readability

---

## Syntax

```python id="jlwmx19"
function_name(arguments)
```

Example:

```python id="jlwmx20"
print("Hello")
```

---

## Important Basic Built-in Functions

---

## 1. `print()`

### Purpose

Displays output on screen.

---

### Syntax

```python id="jlwmx21"
print(value)
```

---

### Example

```python id="jlwmx22"
print("Welcome")
```

Output:

```text id="jlwmx23"
Welcome
```

---

### Multiple Values

```python id="jlwmx24"
name = "John"
age = 25

print(name, age)
```

Output:

```text id="jlwmx25"
John 25
```

---

## 2. `input()`

### Purpose

Reads input from user.

---

### Syntax

```python id="jlwmx26"
input("message")
```

---

### Example

```python id="jlwmx27"
name = input("Enter name: ")
print(name)
```

---

### Important Point

`input()` always returns:

```text id="jlwmx28"
string
```

---

## 3. `type()`

### Purpose

Returns datatype of an object.

---

### Example

```python id="jlwmx29"
x = 10
print(type(x))
```

Output:

```text id="jlwmx30"
<class 'int'>
```

---

## 4. `len()`

### Purpose

Returns number of items.

---

### Example with String

```python id="jlwmx31"
name = "Python"
print(len(name))
```

Output:

```text id="jlwmx32"
6
```

---

### Example with List

```python id="jlwmx33"
nums = [10,20,30]
print(len(nums))
```

Output:

```text id="jlwmx34"
3
```

---

## 5. `int()`

### Purpose

Converts value into integer.

---

### Example

```python id="jlwmx35"
x = int("25")
print(x)
```

Output:

```text id="jlwmx36"
25
```

---

## 6. `float()`

### Purpose

Converts value into float.

---

### Example

```python id="jlwmx37"
x = float("10.5")
print(x)
```

Output:

```text id="jlwmx38"
10.5
```

---

## 7. `str()`

### Purpose

Converts value into string.

---

### Example

```python id="jlwmx39"
x = str(100)
print(type(x))
```

Output:

```text id="jlwmx40"
<class 'str'>
```

---

## 8. `abs()`

### Purpose

Returns absolute (positive) value.

---

### Example

```python id="jlwmx41"
print(abs(-20))
```

Output:

```text id="jlwmx42"
20
```

---

## 9. `max()`

### Purpose

Returns largest value.

---

### Example

```python id="jlwmx43"
print(max(10, 50, 30))
```

Output:

```text id="jlwmx44"
50
```

---

## 10. `min()`

### Purpose

Returns smallest value.

---

### Example

```python id="jlwmx45"
print(min(10, 50, 30))
```

Output:

```text id="jlwmx46"
10
```

---

## 11. `sum()`

### Purpose

Returns total sum of elements.

---

### Example

```python id="jlwmx47"
nums = [10,20,30]
print(sum(nums))
```

Output:

```text id="jlwmx48"
60
```

---

## 12. `round()`

### Purpose

Rounds decimal value.

---

### Example

```python id="jlwmx49"
print(round(5.67))
```

Output:

```text id="jlwmx50"
6
```

---

## 13. `sorted()`

### Purpose

Returns sorted list.

---

### Example

```python id="jlwmx51"
nums = [5,2,8,1]
print(sorted(nums))
```

Output:

```text id="jlwmx52"
[1, 2, 5, 8]
```

---

## 14. `range()`

### Purpose

Generates sequence of numbers.

---

### Example

```python id="jlwmx53"
for i in range(5):
    print(i)
```

Output:

```text id="jlwmx54"
0
1
2
3
4
```

---

## 15. `help()`

### Purpose

Displays documentation/help.

---

### Example

```python id="jlwmx55"
help(len)
```

Shows details about `len()` function.

---

## Python Built-in Functions — Quick Summary Table

| Function   | Purpose                 | Syntax             | Example                        |
| ---------- | ----------------------- | ------------------ | ------------------------------ |
| `print()`  | Display output          | `print(value)`     | `print("Hello")`               |
| `input()`  | Read user input         | `input("message")` | `name = input("Enter Name: ")` |
| `type()`   | Get datatype            | `type(object)`     | `type(10)`                     |
| `len()`    | Find length             | `len(object)`      | `len("Python")`                |
| `int()`    | Convert to integer      | `int(value)`       | `int("25")`                    |
| `float()`  | Convert to float        | `float(value)`     | `float("10.5")`                |
| `str()`    | Convert to string       | `str(value)`       | `str(100)`                     |
| `abs()`    | Get absolute value      | `abs(number)`      | `abs(-20)`                     |
| `max()`    | Find largest value      | `max(values)`      | `max(10,20,30)`                |
| `min()`    | Find smallest value     | `min(values)`      | `min(10,20,30)`                |
| `sum()`    | Find total sum          | `sum(iterable)`    | `sum([1,2,3])`                 |
| `round()`  | Round decimal value     | `round(number)`    | `round(5.67)`                  |
| `sorted()` | Sort elements           | `sorted(iterable)` | `sorted([5,1,3])`              |
| `range()`  | Generate sequence       | `range(stop)`      | `range(5)`                     |
| `help()`   | Show documentation      | `help(object)`     | `help(len)`                    |
| `dir()`    | Show attributes/methods | `dir(object)`      | `dir(str)`                     |


---

## Advantages of Built-in Functions

* Easy to use
* Saves time
* Reduces coding complexity
* Improves readability
* Optimized for performance

---

## Final Summary

Built-in functions are:

> predefined utility functions provided by Python.

They help programmers perform common operations quickly and efficiently without writing extra code.

```
```


### Assignment Operators

Used for:

* assigning/updating variable values

Examples:

```python id="ao17"
=
+=
-=
*=
```

```
```

# Ch: 8 Control Flow Statements in Python

Control flow statements determine:

> the order in which program statements are executed.

They help in:

* decision making
* repetition
* controlling execution flow

---

## General Syntax — Indentation

### What is Indentation?

Indentation means:

> spaces given at the beginning of a line.

Python uses indentation to define:

* blocks of code

Unlike other languages:

* Python does NOT use `{ }`.

---

## Example

```python id="cf1"
if True:
    print("Hello")
    print("Python")
```

---

## Important Points

* Usually 4 spaces are used.
* Incorrect indentation causes:

```text id="cf2"
IndentationError
```

---

## Example of Wrong Indentation

```python id="cf3"
if True:
print("Hello")
```

Error occurs because indentation is missing.

---

## Expressions

An expression is:

> combination of values, variables, and operators that produces a result.

---

## Unary Arithmetic Operators

Unary operators work with:

* one operand

---

### Unary Plus (`+`)

```python id="cf4"
x = 10
print(+x)
```

Output:

```text id="cf5"
10
```

---

### Unary Minus (`-`)

```python id="cf6"
x = 10
print(-x)
```

Output:

```text id="cf7"
-10
```

---

## Binary Arithmetic Operators

Binary operators work with:

* two operands

---

## Arithmetic Operators Table

| Operator | Meaning        | Example   |
| -------- | -------------- | --------- |
| `+`      | Addition       | `10 + 5`  |
| `-`      | Subtraction    | `10 - 5`  |
| `*`      | Multiplication | `10 * 5`  |
| `/`      | Division       | `10 / 5`  |
| `%`      | Modulus        | `10 % 3`  |
| `//`     | Floor Division | `10 // 3` |
| `**`     | Power          | `2 ** 3`  |

## Arithmetic Operators Table

| Operator | Purpose             | Example   | Output |
| -------- | ------------------- | --------- | ------ |
| `+`      | Addition            | `10 + 5`  | `15`   |
| `-`      | Subtraction         | `10 - 5`  | `5`    |
| `*`      | Multiplication      | `10 * 5`  | `50`   |
| `/`      | Division            | `10 / 5`  | `2.0`  |
| `%`      | Modulus (Remainder) | `10 % 3`  | `1`    |
| `//`     | Floor Division      | `10 // 3` | `3`    |
| `**`     | Exponent (Power)    | `2 ** 3`  | `8`    |

## Assignment Operators Table

| Operator | Purpose                 | Example   | Equivalent To |
| -------- | ----------------------- | --------- | ------------- |
| `=`      | Assign value            | `x = 5`   | `x = 5`       |
| `+=`     | Add and assign          | `x += 3`  | `x = x + 3`   |
| `-=`     | Subtract and assign     | `x -= 3`  | `x = x - 3`   |
| `*=`     | Multiply and assign     | `x *= 3`  | `x = x * 3`   |
| `/=`     | Divide and assign       | `x /= 3`  | `x = x / 3`   |
| `%=`     | Modulus and assign      | `x %= 3`  | `x = x % 3`   |
| `//=`    | Floor divide and assign | `x //= 3` | `x = x // 3`  |
| `**=`    | Power and assign        | `x **= 3` | `x = x ** 3`  |

---

## Example

```python id="cf8"
a = 10
b = 3

print(a + b)
print(a % b)
print(a ** b)
```

Output:

```text id="cf9"
13
1
1000
```

---

## Conditionals

Conditionals are used for:

> decision making.

## Relational Operators Table

| Operator | Purpose                  | Example    | Output  |
| -------- | ------------------------ | ---------- | ------- |
| `==`     | Equal to                 | `10 == 10` | `True`  |
| `!=`     | Not equal to             | `10 != 5`  | `True`  |
| `>`      | Greater than             | `10 > 5`   | `True`  |
| `<`      | Less than                | `10 < 5`   | `False` |
| `>=`     | Greater than or equal to | `10 >= 10` | `True`  |
| `<=`     | Less than or equal to    | `5 <= 10`  | `True`  |


## Logical Operators Table

| Operator | Purpose                                | Example            | Output  |
| -------- | -------------------------------------- | ------------------ | ------- |
| `and`    | True if both conditions are true       | `5 > 2 and 10 > 5` | `True`  |
| `or`     | True if at least one condition is true | `5 > 10 or 10 > 5` | `True`  |
| `not`    | Reverses result                        | `not(5 > 2)`       | `False` |
---

## `if` Statement

Executes block only if condition is true.

---

### Syntax

```python id="cf10"
if condition:
    statements
```

---

### Example

```python id="cf11"
age = 20

if age >= 18:
    print("Eligible")
```

---

## `if..else`

Used when there are two possible outcomes.

---

### Syntax

```python id="cf12"
if condition:
    statements
else:
    statements
```

---

### Example

```python id="cf13"
num = 5

if num % 2 == 0:
    print("Even")
else:
    print("Odd")
```

---

## `if..elif..else`

Used for multiple conditions.

---

### Syntax

```python id="cf14"
if condition1:
    statements
elif condition2:
    statements
else:
    statements
```

---

### Example

```python id="cf15"
mark = 75

if mark >= 90:
    print("A")
elif mark >= 70:
    print("B")
else:
    print("C")
```

---

## Loops

Loops are used to:

> repeat statements multiple times.

---

## `while` Loop

Repeats block while condition is true.

---

### Syntax

```python id="cf16"
while condition:
    statements
```

---

### Example

```python id="cf17"
i = 1

while i <= 5:
    print(i)
    i += 1
```

Output:

```text id="cf18"
1
2
3
4
5
```

---

## Infinite Loop

Occurs when condition never becomes false.

Example:

```python id="cf19"
while True:
    print("Hello")
```

---

## Loop Control Statements

Used to alter loop execution.

---

## `break`

Terminates loop immediately.

---

### Example

```python id="cf20"
for i in range(10):
    if i == 5:
        break
    print(i)
```

Output:

```text id="cf21"
0
1
2
3
4
```

---

## `continue`

Skips current iteration and continues next iteration.

---

### Example

```python id="cf22"
for i in range(5):
    if i == 2:
        continue
    print(i)
```

Output:

```text id="cf23"
0
1
3
4
```

---

## `for` Loop

Used to iterate through:

* sequences
* collections

such as:

* list
* tuple
* dictionary
* string

---

## Syntax

```python id="cf24"
for variable in sequence:
    statements
```

---

## Example with List

```python id="cf25"
nums = [10,20,30]

for n in nums:
    print(n)
```

Output:

```text id="cf26"
10
20
30
```

---

## Example with Tuple

```python id="cf27"
colors = ("red", "green", "blue")

for c in colors:
    print(c)
```

Output:

```text id="cf28"
red
green
blue
```

---

## Example with Dictionary

Dictionary contains:

* key-value pairs

---

### Iterating Keys

```python id="cf29"
student = {
    "name": "John",
    "age": 21
}

for k in student:
    print(k)
```

Output:

```text id="cf30"
name
age
```

---

### Iterating Values

```python id="cf31"
for v in student.values():
    print(v)
```

Output:

```text id="cf32"
John
21
```

---

### Iterating Key-Value Pairs

```python id="cf33"
for k, v in student.items():
    print(k, v)
```

Output:

```text id="cf34"
name John
age 21
```

---

## Nested Loops

Loop inside another loop.

---

### Example

```python id="cf35"
for i in range(3):
    for j in range(2):
        print(i, j)
```

---

## Quick Summary Table

| Statement  | Purpose                     |
| ---------- | --------------------------- |
| `if`       | Decision making             |
| `elif`     | Multiple conditions         |
| `else`     | Default block               |
| `while`    | Repeat while condition true |
| `for`      | Iterate sequence            |
| `break`    | Exit loop                   |
| `continue` | Skip iteration              |

---

## Important Points

* Python uses indentation for blocks.
* Loops reduce repeated code.
* `break` stops loop completely.
* `continue` skips current iteration.

---

## Final Summary

Control flow statements help control:

* decision making
* repetition
* execution sequence

Main concepts:

* Conditionals → `if`, `elif`, `else`
* Loops → `while`, `for`
* Loop controls → `break`, `continue`
