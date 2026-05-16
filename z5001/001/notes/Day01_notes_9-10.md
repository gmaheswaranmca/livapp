# Ch: 9 Python Data Structures — Detailed Notes

---

## 1. Data Structures in Python

A **Data Structure** is a way of storing and organizing data so that it can be used efficiently.

Python provides built-in data structures:

| Data Structure | Ordered | Mutable | Allows Duplicate | Syntax        |
| -------------- | ------- | ------- | ---------------- | ------------- |
| List           | Yes     | Yes     | Yes              | `[]`          |
| Tuple          | Yes     | No      | Yes              | `()`          |
| Dictionary     | Yes     | Yes     | Keys No          | `{key:value}` |
| Set            | No      | Yes     | No               | `{}`          |
| String         | Yes     | No      | Yes              | `" "`         |

---

## 2. Lists

### What is a List?

A **List** is a collection of items stored in order.

* Mutable (can change)
* Allows duplicates
* Stores different data types

---

### Syntax

```python
list_name = [item1, item2, item3]
```

Example:

```python
numbers = [10, 20, 30]
```

---

## Quick Introduction to Objects and Classes

### Object

Everything in Python is an **Object**.

Examples:

* Integer
* Float
* String
* List
* Tuple

Example:

```python
x = 10
```

Here:

* `10` → object
* `x` → reference variable

---

### Class

A **Class** is a blueprint for creating objects.

Example:

```python
class Student:
    pass
```

Creating object:

```python
s1 = Student()
```

---

## Using Lists

### Creating Lists

```python
a = [1, 2, 3]
b = ["red", "green", "blue"]
c = [10, "python", 5.5]
```

---

### Accessing Elements

Index starts from `0`.

```python
a = [10, 20, 30]

print(a[0])
print(a[1])
```

Output:

```python
10
20
```

---

### Negative Indexing

```python
a = [10, 20, 30]

print(a[-1])
```

Output:

```python
30
```

---

### Changing Elements

```python
a = [1, 2, 3]

a[1] = 100

print(a)
```

Output:

```python
[1, 100, 3]
```

---

### List Functions

#### append()

Adds element at end.

```python
a = [1, 2]

a.append(3)

print(a)
```

Output:

```python
[1, 2, 3]
```

---

#### insert()

```python
a = [1, 3]

a.insert(1, 2)

print(a)
```

Output:

```python
[1, 2, 3]
```

---

#### remove()

```python
a = [10, 20, 30]

a.remove(20)

print(a)
```

Output:

```python
[10, 30]
```

---

#### pop()

```python
a = [1, 2, 3]

a.pop()

print(a)
```

Output:

```python
[1, 2]
```

---

#### len()

```python
a = [1, 2, 3]

print(len(a))
```

Output:

```python
3
```

---

### Looping Through List

```python
a = [10, 20, 30]

for i in a:
    print(i)
```

---

### Nested List

```python
a = [[1,2], [3,4]]

print(a[0])
print(a[1][1])
```

Output:

```python
[1, 2]
4
```

---

### List Slicing

```python
a = [10,20,30,40,50]

print(a[1:4])
```

Output:

```python
[20, 30, 40]
```

---

## 3. Tuple

### What is Tuple?

A **Tuple** is an ordered collection of elements.

* Immutable (cannot change)
* Faster than list
* Allows duplicates

---

### Syntax

```python
t = (10, 20, 30)
```

---

## Using Tuples

### Creating Tuple

```python
t = (1, 2, 3)
```

---

### Accessing Elements

```python
t = (10, 20, 30)

print(t[0])
```

Output:

```python
10
```

---

### Tuple Cannot Be Modified

```python
t = (1,2,3)

t[0] = 100
```

Output:

```python
TypeError
```

---

### Single Element Tuple

```python
t = (5,)
```

Without comma:

```python
t = (5)
```

This becomes integer.

---

### Tuple Packing

```python
t = 10, 20, 30
```

---

### Tuple Unpacking

```python
a, b, c = (10, 20, 30)

print(a)
print(b)
print(c)
```

---

## Tuples and the print Statement

```python
t = (10, 20, 30)

print(t)
```

Output:

```python
(10, 20, 30)
```

---

### Printing Tuple Elements

```python
t = ("red", "green", "blue")

for i in t:
    print(i)
```

---

## 4. Dictionary

### What is Dictionary?

A **Dictionary** stores data as:

```python
key : value
```

* Mutable
* Ordered
* Keys must be unique

---

### Syntax

```python
d = {
    key1:value1,
    key2:value2
}
```

Example:

```python
student = {
    "id":101,
    "name":"Arun",
    "mark":95
}
```

---

## Using Dictionaries

### Accessing Values

```python
student = {
    "name":"John",
    "age":20
}

print(student["name"])
```

Output:

```python
John
```

---

### Adding New Item

```python
student["city"] = "Chennai"
```

---

### Updating Value

```python
student["age"] = 25
```

---

### Removing Item

#### pop()

```python
student.pop("age")
```

---

### Dictionary Methods

#### keys()

```python
print(student.keys())
```

---

#### values()

```python
print(student.values())
```

---

#### items()

```python
print(student.items())
```

---

### Looping Through Dictionary

```python
student = {
    "name":"Sam",
    "age":21
}

for k,v in student.items():
    print(k,v)
```

---

### Nested Dictionary

```python
emp = {
    "e1":{
        "name":"John",
        "salary":5000
    }
}

print(emp["e1"]["name"])
```

---

## 5. String

### What is String?

A **String** is a sequence of characters.

Strings are immutable.

---

### Syntax

```python
s = "Python"
```

---

### Accessing Characters

```python
s = "Python"

print(s[0])
```

Output:

```python
P
```

---

### String Slicing

```python
s = "Python"

print(s[1:4])
```

Output:

```python
yth
```

---

### String Functions

#### upper()

```python
s = "python"

print(s.upper())
```

Output:

```python
PYTHON
```

---

#### lower()

```python
print("PYTHON".lower())
```

---

#### replace()

```python
s = "I like Java"

print(s.replace("Java","Python"))
```

Output:

```python
I like Python
```

---

#### split()

```python
s = "red,green,blue"

print(s.split(","))
```

Output:

```python
['red', 'green', 'blue']
```

---

#### find()

```python
s = "python"

print(s.find("th"))
```

Output:

```python
2
```

---

### String Loop

```python
s = "Python"

for ch in s:
    print(ch)
```

---

### String Concatenation

```python
a = "Hello"
b = "World"

print(a + b)
```

Output:

```python
HelloWorld
```

---

## 6. Sets

### What is Set?

A **Set** is an unordered collection of unique elements.

* No duplicates
* Mutable
* Unordered

---

### Syntax

```python
s = {1,2,3}
```

---

## Using Sets

### Creating Set

```python
s = {10,20,30}
```

---

### Duplicate Removal

```python
s = {1,2,2,3,3}

print(s)
```

Output:

```python
{1,2,3}
```

---

### Adding Element

#### add()

```python
s.add(40)
```

---

### Removing Element

#### remove()

```python
s.remove(20)
```

---

### Set Operations

### Union

```python
a = {1,2,3}
b = {3,4,5}

print(a | b)
```

Output:

```python
{1,2,3,4,5}
```

---

### Intersection

```python
print(a & b)
```

Output:

```python
{3}
```

---

### Difference

```python
print(a - b)
```

Output:

```python
{1,2}
```

---

### Looping Through Set

```python
s = {1,2,3}

for i in s:
    print(i)
```

---

## Comparison of Data Structures

| Feature    | List | Tuple | Dictionary | Set | String |
| ---------- | ---- | ----- | ---------- | --- | ------ |
| Ordered    | Yes  | Yes   | Yes        | No  | Yes    |
| Mutable    | Yes  | No    | Yes        | Yes | No     |
| Duplicates | Yes  | Yes   | Keys No    | No  | Yes    |
| Indexing   | Yes  | Yes   | No         | No  | Yes    |

---

## Important Interview Points

### List vs Tuple

| List      | Tuple     |
| --------- | --------- |
| Mutable   | Immutable |
| Uses `[]` | Uses `()` |
| Slower    | Faster    |

---

### Dictionary vs Set

| Dictionary         | Set            |
| ------------------ | -------------- |
| key:value pair     | Only values    |
| Uses `{key:value}` | Uses `{value}` |

---

## Simple Practice Programs

### 1. Find Sum of List Elements

```python
a = [10,20,30]

total = 0

for i in a:
    total += i

print(total)
```

---

### 2. Count Characters in String

```python
s = "python"

print(len(s))
```

---

### 3. Find Common Elements Using Set

```python
a = {1,2,3}
b = {2,3,4}

print(a & b)
```

---

## Summary

* **List** → Ordered, mutable collection
* **Tuple** → Ordered, immutable collection
* **Dictionary** → key:value pair collection
* **String** → sequence of characters
* **Set** → unordered unique collection

```
```

# Ch 10: Python I/O Handling — Files

---

## 1. Introduction to I/O Handling

### What is I/O?

I/O means:

* **Input** → Taking data from user/file
* **Output** → Displaying or storing data

Python supports:

* Keyboard input
* Screen output
* File handling

---

## 2. What is a File?

A **File** is a storage location on disk used to store data permanently.

Examples:

* `.txt`
* `.csv`
* `.json`
* `.py`

---

## Why Files are Needed?

Without files:

* Data is lost after program ends.

With files:

* Data is permanently stored.

Example:

* Student records
* Employee data
* Reports
* Logs

---

## 3. Types of Files

| Type        | Description            |
| ----------- | ---------------------- |
| Text File   | Stores characters/text |
| Binary File | Stores binary data     |

---

## Text File Examples

```text
notes.txt
data.csv
```

---

## Binary File Examples

```text
image.jpg
video.mp4
```

---

## 4. File Handling Operations

Main operations:

| Operation | Purpose       |
| --------- | ------------- |
| Open      | Open file     |
| Read      | Read contents |
| Write     | Store data    |
| Append    | Add data      |
| Close     | Close file    |

---

## 5. Opening a File

### Syntax

```python id="z78p9u"
file_object = open("filename", "mode")
```

---

## Example

```python id="5y2r3t"
f = open("sample.txt", "r")
```

---

## File Modes

| Mode | Meaning      |
| ---- | ------------ |
| `r`  | Read         |
| `w`  | Write        |
| `a`  | Append       |
| `x`  | Create       |
| `rb` | Read binary  |
| `wb` | Write binary |

---

## Important Note

If file does not exist:

| Mode | Result       |
| ---- | ------------ |
| `r`  | Error        |
| `w`  | Creates file |
| `a`  | Creates file |

---

## 6. Closing a File

### Syntax

```python id="j4dl0h"
file.close()
```

---

## Example

```python id="l43z0u"
f = open("sample.txt", "r")

f.close()
```

---

## Why Close File?

* Frees memory
* Saves data properly
* Prevents corruption

---

## 7. Reading from File

---

## read()

Reads entire file.

### Example

```python id="c3vbjlwm"
f = open("sample.txt", "r")

data = f.read()

print(data)

f.close()
```

---

## Example File Content

```text
Hello
Welcome to Python
```

Output:

```text
Hello
Welcome to Python
```

---

## read(n)

Reads specific number of characters.

```python id="nhsijz"
f = open("sample.txt", "r")

print(f.read(5))

f.close()
```

Output:

```text
Hello
```

---

## readline()

Reads one line.

```python id="r94jlwm"
f = open("sample.txt", "r")

print(f.readline())

f.close()
```

---

## readlines()

Reads all lines as list.

```python id="u6eqel"
f = open("sample.txt", "r")

print(f.readlines())

f.close()
```

Output:

```python id="q2jlwm"
['Hello\n', 'Welcome to Python']
```

---

## 8. Writing into File

---

## write()

Writes data into file.

### Syntax

```python id="0p0wh9"
file.write(data)
```

---

## Example

```python id="4vjlwm"
f = open("sample.txt", "w")

f.write("Hello Python")

f.close()
```

---

## Important

`w` mode:

* Deletes old content
* Writes new content

---

## Example

Before:

```text
ABC
```

After using `w`:

```text
Hello Python
```

---

## 9. Appending into File

---

## append mode (`a`)

Adds data at end without deleting old content.

### Example

```python id="a5qjlwm"
f = open("sample.txt", "a")

f.write("\nWelcome")

f.close()
```

---

## Output File

```text
Hello Python
Welcome
```

---

## 10. Using File

### Complete Example

```python id="h4gjlwm"
f = open("student.txt", "w")

f.write("101 Arun 95\n")
f.write("102 Ravi 90\n")

f.close()

f = open("student.txt", "r")

print(f.read())

f.close()
```

---

## Output

```text
101 Arun 95
102 Ravi 90
```

---

## 11. File Pointer

A file pointer indicates current position inside file.

---

## tell()

Returns current position.

```python id="n2jlwm"
f = open("sample.txt", "r")

print(f.tell())

f.read(5)

print(f.tell())

f.close()
```

---

## seek()

Moves pointer to specified location.

```python id="b8jlwm"
f = open("sample.txt", "r")

f.seek(0)

print(f.read())

f.close()
```

---

## 12. with Statement

Best method for file handling.

Automatically closes file.

---

## Syntax

```python id="r6jlwm"
with open("file.txt", "r") as f:
    data = f.read()
```

---

## Example

```python id="m3jlwm"
with open("sample.txt", "w") as f:
    f.write("Python")
```

File automatically closes.

---

## Advantage of with

| Advantage       | Description         |
| --------------- | ------------------- |
| Safe            | Prevents file leaks |
| Cleaner code    | No need close()     |
| Better practice | Recommended         |

---

## 13. Binary Files

Used for:

* Images
* Audio
* Videos

---

## Writing Binary File

```python id="w8jlwm"
f = open("data.bin", "wb")

f.write(b"Hello")

f.close()
```

---

## Reading Binary File

```python id="t1jlwm"
f = open("data.bin", "rb")

print(f.read())

f.close()
```

Output:

```python id="g4jlwm"
b'Hello'
```

---

## 14. File Exists or Not

Using `os` module.

```python id="j8jlwm"
import os

if os.path.exists("sample.txt"):
    print("File exists")
else:
    print("File not found")
```

---

## 15. Deleting a File

```python id="s5jlwm"
import os

os.remove("sample.txt")
```

---

## 16. Exception Handling in Files

Avoids program crash.

---

## Example

```python id="d2jlwm"
try:
    f = open("abc.txt", "r")
    print(f.read())
    f.close()

except FileNotFoundError:
    print("File not found")
```

---

## Output

```text
File not found
```

---

## 17. Practical Programs

---

## Program 1 — Write User Input to File

```python id="x7jlwm"
name = input("Enter name:")

f = open("user.txt", "w")

f.write(name)

f.close()
```

---

## Program 2 — Count Number of Lines

```python id="f3jlwm"
f = open("sample.txt", "r")

count = len(f.readlines())

print(count)

f.close()
```

---

## Program 3 — Copy File Content

```python id="v6jlwm"
f1 = open("a.txt", "r")
f2 = open("b.txt", "w")

data = f1.read()

f2.write(data)

f1.close()
f2.close()
```

---

## Program 4 — Read File Line by Line

```python id="q5jlwm"
f = open("sample.txt", "r")

for line in f:
    print(line)

f.close()
```

---

## 18. Difference Between Modes

| Mode | Existing File | New File |
| ---- | ------------- | -------- |
| `r`  | Read only     | Error    |
| `w`  | Overwrite     | Create   |
| `a`  | Append        | Create   |
| `x`  | Error         | Create   |

---

## 19. Important Interview Questions

---

## Difference Between write() and append()

| write()               | append()       |
| --------------------- | -------------- |
| Deletes old data      | Keeps old data |
| Starts from beginning | Adds at end    |

---

## Difference Between read(), readline(), readlines()

| Method      | Result        |
| ----------- | ------------- |
| read()      | Entire file   |
| readline()  | One line      |
| readlines() | List of lines |

---

## Why use with statement?

* Automatically closes file
* Cleaner and safer

---

## 20. Real-Time Applications

| Application | File Usage       |
| ----------- | ---------------- |
| Banking     | Transaction logs |
| Hospital    | Patient records  |
| College     | Student database |
| E-commerce  | Orders           |

---

## Summary

| Topic    | Key Point        |
| -------- | ---------------- |
| open()   | Opens file       |
| read()   | Reads file       |
| write()  | Writes file      |
| append() | Adds data        |
| close()  | Closes file      |
| with     | Automatic close  |
| tell()   | Current position |
| seek()   | Move pointer     |

---

## Final Quick Example

```python id="k9jlwm"
with open("demo.txt", "w") as f:
    f.write("Hello Python")

with open("demo.txt", "r") as f:
    print(f.read())
```

Output:

```text
Hello Python
```

```
```

