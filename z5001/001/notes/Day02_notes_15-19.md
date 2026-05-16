# Ch : 15 Working with Data in Python

Python provides powerful support for handling different types of data formats and databases.

Common data handling formats:

1. JSON
2. CSV
3. SQLite Database

These are widely used in:

* Web applications
* APIs
* Data analysis
* Automation
* Data storage systems

---

## 1. JSON in Python

## What is JSON?

JSON stands for:

```text id="tq4tmf"
JavaScript Object Notation
```

It is:

* A lightweight data-interchange format
* Human-readable
* Easy for machines to parse

---

## Features of JSON

* Text-based format
* Language independent
* Used in APIs and web services
* Stores data in key-value pairs

---

## JSON Example

```json id="rf93y2"
{
    "name": "John",
    "age": 25,
    "city": "Chennai"
}
```

---

## Python Module for JSON

Python provides built-in module:

```python id="ukthlo"
import json
```

---

## JSON Data Types Mapping

| JSON Type  | Python Type |
| ---------- | ----------- |
| Object     | dict        |
| Array      | list        |
| String     | str         |
| Number     | int / float |
| true/false | True/False  |
| null       | None        |

---

## Converting Python Object to JSON

### `json.dumps()`

Converts Python object into JSON string.

---

### Example

```python id="2xg6k4"
import json

student = {
    "name": "Arun",
    "age": 21,
    "marks": 95
}

json_data = json.dumps(student)

print(json_data)
print(type(json_data))
```

---

### Output

```text id="2m0t9d"
{"name": "Arun", "age": 21, "marks": 95}
<class 'str'>
```

---

## Pretty Printing JSON

### Example

```python id="kks5qs"
import json

data = {
    "name": "John",
    "age": 25,
    "city": "Delhi"
}

print(json.dumps(data, indent=4))
```

---

### Output

```json id="36nfxp"
{
    "name": "John",
    "age": 25,
    "city": "Delhi"
}
```

---

## Converting JSON String to Python Object

### `json.loads()`

Loads JSON string into Python object.

---

### Example

```python id="2d27s4"
import json

json_string = '{"name":"Ravi","age":30}'

python_obj = json.loads(json_string)

print(python_obj)
print(type(python_obj))
```

---

### Output

```text id="l0l5d9"
{'name': 'Ravi', 'age': 30}
<class 'dict'>
```

---

## Writing JSON to File

### `json.dump()`

Writes Python object to JSON file.

---

### Example

```python id="rwe04m"
import json

employee = {
    "id": 101,
    "name": "Kumar",
    "salary": 50000
}

with open("employee.json", "w") as file:
    json.dump(employee, file, indent=4)
```

---

## Reading JSON from File

### `json.load()`

Reads JSON data from file.

---

### Example

```python id="dj7kt0"
import json

with open("employee.json", "r") as file:
    data = json.load(file)

print(data)
```

---

## Common Uses of JSON

* Web APIs
* Configuration files
* Data exchange
* Storing structured data

---

## Advantages of JSON

* Easy to read
* Lightweight
* Language independent
* Widely supported

---

## Limitations of JSON

* No comments supported
* Not suitable for very large relational data

---

## 2. CSV in Python

## What is CSV?

CSV stands for:

```text id="e0s8bm"
Comma Separated Values
```

It is used to store:

* Tabular data
* Spreadsheet data
* Database exports

---

## Example CSV File

```text id="n2m7qm"
id,name,age
1,John,25
2,Ravi,30
3,Arun,28
```

---

## CSV Module

Python provides built-in module:

```python id="jqjnlu"
import csv
```

---

## Reading CSV File

### Example

```python id="t7x9dw"
import csv

with open("students.csv", "r") as file:
    reader = csv.reader(file)

    for row in reader:
        print(row)
```

---

### Output

```text id="4x1s1x"
['id', 'name', 'age']
['1', 'John', '25']
['2', 'Ravi', '30']
```

---

## Writing CSV File

### Example

```python id="d0r84z"
import csv

data = [
    ["id", "name", "salary"],
    [1, "Arun", 50000],
    [2, "John", 60000]
]

with open("employees.csv", "w", newline="") as file:
    writer = csv.writer(file)

    writer.writerows(data)
```

---

## Writing Single Row

### Example

```python id="jkg3t8"
writer.writerow([3, "Ravi", 70000])
```

---

## Reading CSV as Dictionary

### `csv.DictReader`

---

### Example

```python id="3bmt0c"
import csv

with open("students.csv", "r") as file:
    reader = csv.DictReader(file)

    for row in reader:
        print(row)
```

---

### Output

```text id="8x43gb"
{'id': '1', 'name': 'John', 'age': '25'}
```

---

## Writing CSV using Dictionary

### `csv.DictWriter`

---

### Example

```python id="mzy8eb"
import csv

fields = ["id", "name", "salary"]

rows = [
    {"id": 1, "name": "A", "salary": 40000},
    {"id": 2, "name": "B", "salary": 50000}
]

with open("staff.csv", "w", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=fields)

    writer.writeheader()
    writer.writerows(rows)
```

---

## Common Uses of CSV

* Excel data transfer
* Reports
* Data analysis
* Import/export operations

---

## Advantages of CSV

* Simple format
* Easy to create
* Supported by Excel
* Lightweight

---

## Limitations of CSV

* No data types
* No relationships
* No security
* No hierarchical structure

---

## 3. SQLite in Python

## What is SQLite?

SQLite is:

* A lightweight relational database
* Serverless database
* File-based database

Python supports SQLite using built-in module:

```python id="3k7tup"
sqlite3
```

---

## Importing SQLite Module

```python id="j1h2l4"
import sqlite3
```

---

## Creating Database Connection

### Example

```python id="zbrv3r"
import sqlite3

conn = sqlite3.connect("company.db")

print("Database Connected")
```

---

## What Happens Here?

If database does not exist:

* SQLite automatically creates it.

---

## Creating Cursor Object

Cursor is used to:

* Execute SQL queries

---

### Example

```python id="fw3on0"
cursor = conn.cursor()
```

---

## Creating Table

### Example

```python id="lb2nlw"
import sqlite3

conn = sqlite3.connect("company.db")

cursor = conn.cursor()

cursor.execute("""
CREATE TABLE employee(
    id INTEGER PRIMARY KEY,
    name TEXT,
    salary REAL
)
""")

conn.commit()

print("Table Created")

conn.close()
```

---

## Inserting Data

### Example

```python id="mecy0r"
cursor.execute(
    "INSERT INTO employee VALUES(1, 'John', 50000)"
)

conn.commit()
```

---

## Inserting Multiple Records

### Example

```python id="lkth74"
employees = [
    (2, "Ravi", 45000),
    (3, "Arun", 60000)
]

cursor.executemany(
    "INSERT INTO employee VALUES(?, ?, ?)",
    employees
)

conn.commit()
```

---

## Why Use `?`

It prevents:

* SQL Injection
* Query errors

---

## Reading Data from Database

### Example

```python id="wqpb44"
cursor.execute("SELECT * FROM employee")

rows = cursor.fetchall()

for row in rows:
    print(row)
```

---

### Output

```text id="z79x44"
(1, 'John', 50000.0)
(2, 'Ravi', 45000.0)
```

---

## Fetch Methods

| Method       | Description         |
| ------------ | ------------------- |
| fetchone()   | Fetch one row       |
| fetchmany(n) | Fetch multiple rows |
| fetchall()   | Fetch all rows      |

---

## Updating Records

### Example

```python id="q65a83"
cursor.execute(
    "UPDATE employee SET salary = 70000 WHERE id = 1"
)

conn.commit()
```

---

## Deleting Records

### Example

```python id="1k7l7q"
cursor.execute(
    "DELETE FROM employee WHERE id = 2"
)

conn.commit()
```

---

## Closing Database Connection

### Example

```python id="6u2md8"
conn.close()
```

---

## Complete SQLite Example

```python id="2mns74"
import sqlite3

conn = sqlite3.connect("school.db")

cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS student(
    id INTEGER PRIMARY KEY,
    name TEXT,
    marks INTEGER
)
""")

cursor.execute(
    "INSERT INTO student(name, marks) VALUES(?, ?)",
    ("Arun", 95)
)

conn.commit()

cursor.execute("SELECT * FROM student")

rows = cursor.fetchall()

for row in rows:
    print(row)

conn.close()
```

---

## SQLite Data Types

| SQLite Type | Meaning        |
| ----------- | -------------- |
| INTEGER     | Integer values |
| REAL        | Decimal values |
| TEXT        | String values  |
| BLOB        | Binary data    |
| NULL        | Null value     |

---

## Advantages of SQLite

* No server needed
* Lightweight
* Fast for small applications
* Easy setup
* Built into Python

---

## Limitations of SQLite

* Not ideal for very large applications
* Limited concurrency
* Less scalable than enterprise DBMS

---

## Applications of SQLite

* Mobile applications
* Desktop software
* Small web applications
* Testing environments

---

## Comparison: JSON vs CSV vs SQLite

| Feature            | JSON         | CSV     | SQLite       |
| ------------------ | ------------ | ------- | ------------ |
| Structure          | Hierarchical | Tabular | Relational   |
| Storage Type       | Text         | Text    | Database     |
| Supports Relations | No           | No      | Yes          |
| Human Readable     | Yes          | Yes     | Partially    |
| Best Use           | APIs         | Reports | Applications |
| Data Complexity    | Medium       | Simple  | Complex      |

---

## Important Modules Summary

| Purpose           | Module    |
| ----------------- | --------- |
| JSON handling     | `json`    |
| CSV handling      | `csv`     |
| Database handling | `sqlite3` |

---

## Real-World Usage Examples

| Technology Area            | Data Format |
| -------------------------- | ----------- |
| REST APIs                  | JSON        |
| Excel Reports              | CSV         |
| Local Application Database | SQLite      |
| Configuration Files        | JSON        |
| Data Export/Import         | CSV         |
| Offline Mobile Apps        | SQLite      |

---

## Conclusion

Python provides excellent built-in support for:

* Structured data handling
* File-based data storage
* Relational databases

Using:

* `json`
* `csv`
* `sqlite3`

developers can efficiently:

* Store data
* Exchange data
* Process data
* Build applications


```
```

# Ch : 16 Testing Modules in Python

## Introduction to Testing

Testing is the process of:

* Checking whether code works correctly
* Finding bugs/errors
* Ensuring expected output is produced

Testing helps developers:

* Improve software quality
* Reduce bugs
* Make code reliable
* Simplify maintenance

---

## Types of Testing in Python

Python supports several testing frameworks/modules.

Important testing modules:

1. `doctest`
2. `pytest`
3. `unittest`

---

## Why Testing is Important?

Testing helps to:

* Verify program correctness
* Detect errors early
* Improve confidence in code
* Support code refactoring
* Automate validation

---

## Example Without Testing

```python id="wzqg31"
def add(a, b):
    return a + b
```

If wrong values are passed:

* Program may fail
* Wrong output may occur

Testing ensures:

* Function behaves properly

---

## 1. `doctest` Module

## What is `doctest`?

`doctest`:

* Tests code examples written inside docstrings
* Automatically executes examples
* Verifies output

It is useful for:

* Small functions
* Documentation testing
* Learning examples

---

## Importing `doctest`

```python id="s4lt1s"
import doctest
```

---

## Basic Structure of `doctest`

Examples are written inside triple-quoted strings.

---

## Example

```python id="9i4l8u"
def add(a, b):
    """
    Returns sum of two numbers

    >>> add(2, 3)
    5

    >>> add(10, 20)
    30
    """
    
    return a + b
```

---

## Running `doctest`

```python id="mjlwm4"
import doctest

doctest.testmod()
```

---

## Complete Example

```python id="vt5f8o"
import doctest

def multiply(a, b):
    """
    Multiply two numbers

    >>> multiply(2, 3)
    6

    >>> multiply(5, 4)
    20
    """

    return a * b

doctest.testmod()
```

---

## Successful Output

If all tests pass:

```text id="1h2rwb"
No output displayed
```

---

## Failed Test Example

```python id="d0g3fi"
def subtract(a, b):
    """
    >>> subtract(10, 5)
    20
    """

    return a - b
```

---

### Output

```text id="t14yax"
Failed example:
    subtract(10, 5)
Expected:
    20
Got:
    5
```

---

## Important Rules in `doctest`

* Output must match exactly
* Spaces matter
* Formatting matters
* Prompt symbol must be:

```text id="p7o8r5"
>>>
```

---

## Advantages of `doctest`

* Simple to use
* Good for beginners
* Documentation + testing together
* Minimal setup required

---

## Limitations of `doctest`

* Not suitable for large projects
* Difficult for complex testing
* Output formatting issues

---

## Applications of `doctest`

* Educational examples
* Utility functions
* Small modules
* API documentation

---

## 2. `pytest`

## What is `pytest`?

`pytest` is:

* A powerful third-party testing framework
* Simple and scalable
* Widely used in industry

Features:

* Simple syntax
* Automatic test discovery
* Better reporting
* Supports fixtures and plugins

---

## Installing `pytest`

If `pip` is allowed:

```bash id="bw4u3k"
pip install pytest
```

If corporate restriction exists, user can try:

* Conda installation

```bash id="e1r9pw"
conda install pytest
```

---

## Importing `pytest`

Usually no explicit import required for simple tests.

---

## Basic `pytest` Example

Create file:

```text id="04mbff"
test_math.py
```

---

### Example

```python id="xjz1fc"
def add(a, b):
    return a + b

def test_add():
    assert add(2, 3) == 5
```

---

## Running `pytest`

Command:

```bash id="4gd1fq"
pytest
```

---

## Output

```text id="m4u7zl"
1 passed
```

---

## Multiple Tests

```python id="z1g0y9"
def square(n):
    return n * n

def test_square1():
    assert square(2) == 4

def test_square2():
    assert square(5) == 25
```

---

## Using Assertions

`pytest` mainly uses:

```python id="53w13g"
assert
```

---

## Example

```python id="k7m7l1"
assert 10 > 5
```

---

## Failed Assertion Example

```python id="m7u1yx"
assert add(2, 3) == 10
```

---

### Output

```text id="0m8n0h"
E assert 5 == 10
```

---

## Test Naming Rules

* Test file should start with:

```text id="tvjz6w"
test_
```

* Test function should start with:

```text id="wh0jlwm"
test_
```

---

## Example

```text id="j4xkh2"
test_sample.py
```

---

## Fixtures in `pytest`

Fixtures provide:

* Reusable setup code

---

### Example

```python id="4n7v0r"
import pytest

@pytest.fixture
def sample_data():
    return [1, 2, 3]

def test_length(sample_data):
    assert len(sample_data) == 3
```

---

## Parametrized Testing

Allows running same test with multiple inputs.

---

### Example

```python id="q8e6na"
import pytest

@pytest.mark.parametrize(
    "a,b,result",
    [
        (2, 3, 5),
        (10, 20, 30),
        (1, 1, 2)
    ]
)
def test_add(a, b, result):
    assert a + b == result
```

---

## Skipping Tests

```python id="dq5v3s"
import pytest

@pytest.mark.skip
def test_demo():
    assert True
```

---

## Expected Exceptions

```python id="mslz9q"
import pytest

def divide(a, b):
    return a / b

def test_exception():
    with pytest.raises(ZeroDivisionError):
        divide(10, 0)
```

---

## Advantages of `pytest`

* Simple syntax
* Powerful features
* Detailed reports
* Supports large projects
* Plugin support

---

## Limitations of `pytest`

* External installation required
* Slight learning curve for advanced features

---

## Applications of `pytest`

* Enterprise applications
* Web applications
* APIs
* Automation testing

---

## 3. `unittest`

## What is `unittest`?

`unittest` is:

* Python’s built-in testing framework
* Inspired by Java JUnit

It supports:

* Test cases
* Test suites
* Assertions
* Setup/teardown methods

---

## Importing `unittest`

```python id="gg7mdr"
import unittest
```

---

## Basic Structure

Testing is done using:

* Classes
* Methods

---

## Example

```python id="j7cqk4"
import unittest

def add(a, b):
    return a + b

class TestMath(unittest.TestCase):

    def test_add(self):
        self.assertEqual(add(2, 3), 5)

if __name__ == "__main__":
    unittest.main()
```

---

## Output

```text id="0n43pb"
.
----------------------------------------------------------------------
Ran 1 test

OK
```

---

## Important Assertion Methods

| Method               | Purpose          |
| -------------------- | ---------------- |
| assertEqual(a, b)    | Check equality   |
| assertNotEqual(a, b) | Check inequality |
| assertTrue(x)        | Check True       |
| assertFalse(x)       | Check False      |
| assertIsNone(x)      | Check None       |
| assertIn(a, b)       | Check membership |
| assertRaises()       | Check exception  |

---

## Example Assertions

```python id="rjz2hy"
self.assertEqual(10, 10)

self.assertTrue(5 > 2)

self.assertIn(2, [1, 2, 3])
```

---

## Testing Exceptions

```python id="a7rw4j"
import unittest

def divide(a, b):
    return a / b

class TestDivision(unittest.TestCase):

    def test_zero_division(self):
        with self.assertRaises(ZeroDivisionError):
            divide(10, 0)

if __name__ == "__main__":
    unittest.main()
```

---

## Setup and Teardown

Used for:

* Preparing test environment
* Cleaning resources

---

## Example

```python id="mkfxm5"
import unittest

class TestDemo(unittest.TestCase):

    def setUp(self):
        print("Setup called")

    def tearDown(self):
        print("Teardown called")

    def test_sample(self):
        print("Testing")

if __name__ == "__main__":
    unittest.main()
```

---

## Output

```text id="bg6l22"
Setup called
Testing
Teardown called
```

---

## Running Multiple Tests

```python id="kznlzi"
class TestMath(unittest.TestCase):

    def test_add(self):
        self.assertEqual(2 + 3, 5)

    def test_subtract(self):
        self.assertEqual(10 - 5, 5)
```

---

## Test Suite

A collection of tests.

---

## Example

```python id="lqlkhu"
suite = unittest.TestSuite()
```

---

## Advantages of `unittest`

* Built into Python
* Object-oriented structure
* Powerful assertion methods
* Suitable for large applications

---

## Limitations of `unittest`

* More boilerplate code
* Verbose syntax
* Less concise than `pytest`

---

## Applications of `unittest`

* Enterprise systems
* Large Python projects
* Continuous integration systems

---

## Comparison: doctest vs pytest vs unittest

| Feature          | doctest       | pytest         | unittest               |
| ---------------- | ------------- | -------------- | ---------------------- |
| Built-in         | Yes           | No             | Yes                    |
| Complexity       | Simple        | Medium         | Medium                 |
| Syntax           | Very simple   | Simple         | Verbose                |
| Best for         | Documentation | Modern testing | Structured testing     |
| Assertions       | Limited       | assert         | Many assertion methods |
| Large Projects   | No            | Yes            | Yes                    |
| External Install | No            | Yes            | No                     |

---

## Real-World Usage

| Scenario                  | Preferred Module  |
| ------------------------- | ----------------- |
| Learning examples         | doctest           |
| Modern industry testing   | pytest            |
| Standard library projects | unittest          |
| Enterprise automation     | pytest / unittest |
| API testing               | pytest            |
| Documentation validation  | doctest           |

---

## Example Project Structure

```text id="0dwq9r"
project/
│
├── app.py
├── test_app.py
├── requirements.txt
└── tests/
```

---

## Best Practices for Testing

* Write small test cases
* Use meaningful test names
* Test edge cases
* Automate testing
* Keep tests independent
* Run tests regularly

---

## Common Testing Terms

| Term       | Meaning                   |
| ---------- | ------------------------- |
| Test Case  | Single test               |
| Test Suite | Collection of tests       |
| Assertion  | Condition checking        |
| Fixture    | Setup data                |
| Mocking    | Simulating objects        |
| Coverage   | Percentage of tested code |

---

## IDE Support for Testing

Popular IDEs supporting Python testing:

* PyCharm
* Visual Studio Code
* Spyder

Features:

* Run tests graphically
* Debug failed tests
* View reports
* Test coverage analysis

---

## Conclusion

Python provides multiple testing frameworks for different needs:

* `doctest`

  * Simple documentation-based testing

* `pytest`

  * Modern powerful testing framework

* `unittest`

  * Built-in structured testing framework

Testing improves:

* Reliability
* Maintainability
* Software quality

```
```

# Ch : 17 Object-Oriented Programming (OOP) in Python

## 1. Introduction to Object-Oriented Programming

Object-Oriented Programming (OOP) is a programming methodology based on:

* Objects
* Classes
* Data encapsulation
* Reusability

In OOP:

* Data and functions are grouped together into objects.

Python fully supports OOP concepts.

---

## Real-World Analogy

| Real World    | OOP Concept |
| ------------- | ----------- |
| Car blueprint | Class       |
| Actual car    | Object      |
| Car color     | Attribute   |
| Driving car   | Method      |

---

## Advantages of OOP

* Code reusability
* Easy maintenance
* Better organization
* Data security
* Modular programming

---

## Main OOP Concepts

1. Class
2. Object
3. Encapsulation
4. Inheritance
5. Polymorphism
6. Abstraction

---

## 2. The `self`

## What is `self`?

`self` refers to:

* The current object
* Instance of the class

It is used to:

* Access object variables
* Access object methods

---

## Important Point

`self` is:

* Automatically passed by Python
* First parameter in instance methods

---

## Example

```python id="s9a2xt"
class Student:

    def display(self):
        print("Hello")

s1 = Student()

s1.display()
```

---

## Internally Python Does

```python id="jfc6ja"
Student.display(s1)
```

---

## Example with Variables

```python id="pmb70c"
class Employee:

    def set_data(self, name, salary):
        self.name = name
        self.salary = salary

    def display(self):
        print(self.name)
        print(self.salary)

e1 = Employee()

e1.set_data("John", 50000)

e1.display()
```

---

## Output

```text id="yxjlwm"
John
50000
```

---

## Why `self` is Needed?

Without `self`:

* Object variables cannot be differentiated
* Python cannot identify current object

---

## 3. Classes

## What is a Class?

A class is:

* Blueprint/template for creating objects
* Collection of variables and methods

---

## Syntax of Class

```python id="s8s2vx"
class ClassName:
    ## variables
    ## methods
```

---

## Example

```python id="2u5rrl"
class Student:
    pass
```

`pass` means:

* Empty block

---

## Creating a Class

### Example

```python id="7bzn5v"
class Car:

    def start(self):
        print("Car Started")
```

---

## Creating Objects

```python id="3zjlwm"
c1 = Car()
```

---

## Calling Method

```python id="3ocjbh"
c1.start()
```

---

## Complete Example

```python id="2q5jgn"
class Student:

    def greet(self):
        print("Welcome Student")

s1 = Student()

s1.greet()
```

---

## Output

```text id="l0l4dz"
Welcome Student
```

---

## Multiple Objects

```python id="5ivg56"
s1 = Student()
s2 = Student()
s3 = Student()
```

Each object:

* Has separate memory

---

## Memory Representation

```text id="3pjql5"
Class → Blueprint

Object 1 → Separate Data
Object 2 → Separate Data
Object 3 → Separate Data
```

---

## 4. Object Methods

## What are Object Methods?

Methods are:

* Functions inside class
* Used to define object behavior

---

## Syntax

```python id="x8v6r1"
class Demo:

    def method_name(self):
        pass
```

---

## Using Object Methods

### Example

```python id="epn9wi"
class Calculator:

    def add(self, a, b):
        print(a + b)

c1 = Calculator()

c1.add(10, 20)
```

---

## Output

```text id="34d1kj"
30
```

---

## Example with Multiple Methods

```python id="t4b2zn"
class Math:

    def add(self, a, b):
        print(a + b)

    def subtract(self, a, b):
        print(a - b)

m = Math()

m.add(10, 5)
m.subtract(10, 5)
```

---

## Output

```text id="8kfh14"
15
5
```

---

## 5. The `__init__()` Method

## What is `__init__()`?

`__init__()` is:

* Constructor method in Python
* Automatically called when object is created

---

## Purpose

Used to:

* Initialize object variables
* Assign default values

---

## Syntax

```python id="w0x6np"
def __init__(self):
    pass
```

---

## Example

```python id="wpr6ci"
class Student:

    def __init__(self):
        print("Constructor Called")

s1 = Student()
```

---

## Output

```text id="z4f4sn"
Constructor Called
```

---

## Using the `__init__()` Method

### Example

```python id="ct3mny"
class Employee:

    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def display(self):
        print(self.name)
        print(self.salary)

e1 = Employee("John", 50000)

e1.display()
```

---

## Output

```text id="9u0r7u"
John
50000
```

---

## Constructor with Default Values

```python id="jl7o0t"
class Student:

    def __init__(self, name="Unknown"):
        self.name = name

s1 = Student()

print(s1.name)
```

---

## Output

```text id="kv64ao"
Unknown
```

---

## Important Characteristics of `__init__()`

| Feature                 | Description |
| ----------------------- | ----------- |
| Automatically called    | Yes         |
| Return value            | None        |
| Used for initialization | Yes         |
| Special method          | Yes         |

---

## 6. Class and Object Variables

## Object Variables (Instance Variables)

Object variables:

* Belong to each object separately
* Created using `self`

---

## Example

```python id="v4ddf9"
class Student:

    def __init__(self, name):
        self.name = name

s1 = Student("John")
s2 = Student("Ravi")

print(s1.name)
print(s2.name)
```

---

## Output

```text id="9rjlwm"
John
Ravi
```

---

## Class Variables

Class variables:

* Shared by all objects
* Defined inside class but outside methods

---

## Example

```python id="zuxyjm"
class Student:

    school = "ABC School"

    def __init__(self, name):
        self.name = name

s1 = Student("John")
s2 = Student("Ravi")

print(s1.school)
print(s2.school)
```

---

## Output

```text id="g2g5e0"
ABC School
ABC School
```

---

## Difference Between Class and Object Variables

| Feature       | Class Variable | Object Variable |
| ------------- | -------------- | --------------- |
| Shared        | Yes            | No              |
| Created Using | Class body     | self            |
| Memory        | One copy       | Separate copies |

---

## Using Class and Object Variables

### Example

```python id="tah8i6"
class Employee:

    company = "TCS"

    def __init__(self, name):
        self.name = name

e1 = Employee("John")
e2 = Employee("Arun")

print(e1.company)
print(e2.company)

print(e1.name)
print(e2.name)
```

---

## Output

```text id="3yjlwm"
TCS
TCS
John
Arun
```

---

## Modifying Class Variable

```python id="2s5l33"
Employee.company = "Infosys"
```

Changes for:

* All objects

---

## 7. Inheritance

## What is Inheritance?

Inheritance allows:

* One class to acquire properties of another class

---

## Purpose

* Code reusability
* Reduces duplication
* Extends functionality

---

## Terminology

| Term                    | Meaning        |
| ----------------------- | -------------- |
| Parent/Base/Super class | Existing class |
| Child/Derived/Sub class | New class      |

---

## Syntax

```python id="owndsi"
class Child(Parent):
    pass
```

---

## Example

```python id="smqkng"
class Animal:

    def eat(self):
        print("Animal Eats")

class Dog(Animal):
    pass

d = Dog()

d.eat()
```

---

## Output

```text id="7h3n6p"
Animal Eats
```

---

## Using Inheritance

### Example

```python id="gvjlwm"
class Person:

    def show(self):
        print("Person Class")

class Student(Person):

    def display(self):
        print("Student Class")

s = Student()

s.show()
s.display()
```

---

## Output

```text id="s5n09g"
Person Class
Student Class
```

---

## Types of Inheritance in Python

| Type         | Description            |
| ------------ | ---------------------- |
| Single       | One parent, one child  |
| Multiple     | Multiple parents       |
| Multilevel   | Chain inheritance      |
| Hierarchical | Multiple child classes |
| Hybrid       | Combination            |

---

## Single Inheritance

```python id="b8lzlx"
class A:
    pass

class B(A):
    pass
```

---

## Multiple Inheritance

```python id="36ufrx"
class A:
    pass

class B:
    pass

class C(A, B):
    pass
```

---

## Multilevel Inheritance

```python id="mrjlwm"
class A:
    pass

class B(A):
    pass

class C(B):
    pass
```

---

## Using `super()`

`super()` is used to:

* Access parent class methods

---

## Example

```python id="svuynx"
class Parent:

    def display(self):
        print("Parent")

class Child(Parent):

    def display_child(self):
        super().display()
        print("Child")

c = Child()

c.display_child()
```

---

## Output

```text id="szrjlwm"
Parent
Child
```

---

## Method Overriding

Child class redefining parent method.

---

## Example

```python id="b9w54q"
class Animal:

    def sound(self):
        print("Animal Sound")

class Dog(Animal):

    def sound(self):
        print("Dog Barks")

d = Dog()

d.sound()
```

---

## Output

```text id="i2ly0k"
Dog Barks
```

---

## 8. Polymorphism

## What is Polymorphism?

Polymorphism means:

```text id="hyjlwm"
One interface, many forms
```

Same method:

* Behaves differently for different objects

---

## Types of Polymorphism

1. Method Overriding
2. Method Overloading (limited support in Python)
3. Operator Overloading

---

## Method Overriding Example

```python id="2vh4ri"
class Bird:

    def fly(self):
        print("Bird flies")

class Sparrow(Bird):

    def fly(self):
        print("Sparrow flies")

class Ostrich(Bird):

    def fly(self):
        print("Ostrich cannot fly")

b1 = Sparrow()
b2 = Ostrich()

b1.fly()
b2.fly()
```

---

## Output

```text id="wjlwm4"
Sparrow flies
Ostrich cannot fly
```

---

## Operator Overloading

Python operators work differently based on data type.

---

## Example

```python id="3mjlwm"
print(10 + 20)

print("Hello " + "World")
```

---

## Output

```text id="54jlwm"
30
Hello World
```

---

## Duck Typing

Python uses:

* Duck Typing

Meaning:

* Object behavior matters more than object type

---

## Example

```python id="2mqgla"
class Dog:
    def sound(self):
        print("Bark")

class Cat:
    def sound(self):
        print("Meow")

def make_sound(animal):
    animal.sound()

d = Dog()
c = Cat()

make_sound(d)
make_sound(c)
```

---

## Output

```text id="4jlwm1"
Bark
Meow
```

---

## Advantages of Polymorphism

* Flexibility
* Code extensibility
* Reusability
* Cleaner design

---

## Complete OOP Example

```python id="x8y7qz"
class Employee:

    company = "ABC Ltd"

    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def display(self):
        print(self.name)
        print(self.salary)

class Manager(Employee):

    def __init__(self, name, salary, department):
        super().__init__(name, salary)
        self.department = department

    def display_manager(self):
        self.display()
        print(self.department)

m1 = Manager("John", 80000, "HR")

m1.display_manager()
```

---

## Output

```text id="8jlwm7"
John
80000
HR
```

---

## Summary of Important Terms

| Concept      | Meaning                          |
| ------------ | -------------------------------- |
| Class        | Blueprint                        |
| Object       | Instance of class                |
| self         | Current object                   |
| Method       | Function inside class            |
| `__init__()` | Constructor                      |
| Inheritance  | Reusing parent features          |
| Polymorphism | Same behavior in different forms |

---

## Real-World Applications of OOP

| Area             | Usage               |
| ---------------- | ------------------- |
| Banking Software | Customer accounts   |
| Hospital Systems | Patients, doctors   |
| Games            | Characters, weapons |
| E-commerce       | Products, orders    |
| GUI Applications | Windows, buttons    |

---

## Python IDEs for OOP Development

Popular Python IDEs:

* PyCharm
* Visual Studio Code
* Spyder

These support:

* Class navigation
* Debugging
* Code completion
* UML-like visualization

```
```

# Ch : 18 Classes and Objects in Python – Detailed Notes

## 1. Introduction to Object-Oriented Programming (OOP)

Object-Oriented Programming (OOP) is a programming style where programs are organized using:

* **Classes** → Blueprints/templates
* **Objects** → Real instances created from classes

Python is a **fully object-oriented language**.

Example:

```python
x = 10
print(type(x))
```

Output:

```python
<class 'int'>
```

Even integer `10` is treated as an object in Python.

---

## 2. Python 3 Type and Object Hierarchy

In Python:

* Everything is an object
* Every object has:

  * Identity
  * Type
  * Value

Hierarchy:

```text
object
   ↑
type
   ↑
All classes
   ↑
Objects/Instances
```

Example:

```python
x = 100

print(type(x))
print(type(str))
print(type(type))
```

Output:

```python
<class 'int'>
<class 'type'>
<class 'type'>
```

Explanation:

* `int` is a class
* `str` is a class
* `type` itself is also a class

---

## 3. Defining Classes and Instantiating Objects

### Defining a Class

Syntax:

```python
class ClassName:
    pass
```

Example:

```python
class Student:
    pass
```

---

### Creating Objects (Instantiation)

Syntax:

```python
object_name = ClassName()
```

Example:

```python
s1 = Student()

print(s1)
```

Output:

```python
<__main__.Student object at 0x...>
```

Here:

* `Student` → class
* `s1` → object/instance

---

## 4. Variables vs Attributes

### Variables

Variables are names used to store values.

Example:

```python
x = 10
```

---

### Attributes

Attributes belong to objects/classes.

Example:

```python
class Student:
    pass

s1 = Student()
s1.name = "John"

print(s1.name)
```

Here:

* `name` is an attribute of object `s1`

---

### Difference Table

| Variables           | Attributes                  |
| ------------------- | --------------------------- |
| Independent storage | Belongs to object/class     |
| Created normally    | Accessed using dot operator |
| Example: `x = 5`    | Example: `obj.name`         |

---

## 5. Classes as First-Class Instantiatable Objects

In Python, classes are also objects.

Meaning:

* Classes can be assigned to variables
* Passed as arguments
* Returned from functions

Example:

```python
class Employee:
    pass

x = Employee

e1 = x()

print(type(e1))
```

Output:

```python
<class '__main__.Employee'>
```

---

## 6. Classes and Class Attributes

### Class Attributes

Shared by all objects.

Example:

```python
class Student:
    college = "ABC College"

s1 = Student()
s2 = Student()

print(s1.college)
print(s2.college)
```

Output:

```python
ABC College
ABC College
```

---

## 7. Important Special Class Attributes

### 1. `__name__`

Returns class name.

Example:

```python
class Student:
    pass

print(Student.__name__)
```

Output:

```python
Student
```

---

### 2. `__bases__`

Returns parent classes.

Example:

```python
class A:
    pass

class B(A):
    pass

print(B.__bases__)
```

Output:

```python
(<class '__main__.A'>,)
```

---

### 3. `__doc__`

Returns documentation string.

Example:

```python
class Student:
    """Student information"""

print(Student.__doc__)
```

Output:

```python
Student information
```

---

### 4. `__dict__`

Returns namespace dictionary.

Example:

```python
class Student:
    x = 10

print(Student.__dict__)
```

Output:

```python
Dictionary containing class members
```

---

### 5. `__class__`

Returns class of object.

Example:

```python
x = 100

print(x.__class__)
```

Output:

```python
<class 'int'>
```

---

## 8. Instances and Instance Attributes

### Instance Attributes

Belong to individual objects.

Example:

```python
class Student:
    def __init__(self, name):
        self.name = name

s1 = Student("John")
s2 = Student("David")

print(s1.name)
print(s2.name)
```

Output:

```python
John
David
```

Each object stores separate values.

---

## 9. Class-Instance Relationship: Rules and Bindings

Python searches attributes in this order:

1. Instance namespace
2. Class namespace
3. Parent classes

Example:

```python
class Test:
    x = 100

t1 = Test()

print(t1.x)
```

Python checks:

* Is `x` inside `t1`?
* Otherwise check class `Test`

---

### Instance Overrides Class Attribute

Example:

```python
class Test:
    x = 100

t1 = Test()
t1.x = 500

print(t1.x)
print(Test.x)
```

Output:

```python
500
100
```

---

## 10. Instance Methods

Operate on object data.

Example:

```python
class Student:
    def show(self):
        print("Instance Method")

s1 = Student()
s1.show()
```

---

## 11. Class Methods

Use `@classmethod`.

Access class data.

Example:

```python
class Student:
    college = "ABC"

    @classmethod
    def display(cls):
        print(cls.college)

Student.display()
```

---

## 12. Static Methods

Use `@staticmethod`.

No access to instance/class automatically.

Example:

```python
class Math:
    
    @staticmethod
    def add(a, b):
        return a + b

print(Math.add(10, 20))
```

---

## 13. Singleton Instance Methods

A singleton means:

* Only one object is created

Example:

```python
class Database:
    _instance = None

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = Database()
        return cls._instance

d1 = Database.get_instance()
d2 = Database.get_instance()

print(d1 is d2)
```

Output:

```python
True
```

---

## 14. Inheritance

Inheritance allows one class to acquire features from another.

Syntax:

```python
class Child(Parent):
    pass
```

Example:

```python
class Animal:
    def sound(self):
        print("Animal sound")

class Dog(Animal):
    pass

d = Dog()
d.sound()
```

Output:

```python
Animal sound
```

---

## 15. Duck Typing

Python focuses on behavior, not type.

Rule:

```text
"If it walks like a duck and talks like a duck, it is a duck."
```

Example:

```python
class Dog:
    def speak(self):
        print("Bark")

class Cat:
    def speak(self):
        print("Meow")

def call_animal(obj):
    obj.speak()

call_animal(Dog())
call_animal(Cat())
```

---

## 16. Introspection of Objects

Introspection means:

* Examining objects at runtime

---

## 17. `id()`

Returns memory identity.

Example:

```python
x = 10
print(id(x))
```

---

## 18. `type()`

Returns object type.

Example:

```python
print(type("Hello"))
```

Output:

```python
<class 'str'>
```

---

## 19. `dir()`

Lists attributes/methods.

Example:

```python
print(dir(str))
```

---

## 20. `hasattr()`

Checks attribute existence.

Example:

```python
class Test:
    x = 10

t = Test()

print(hasattr(t, 'x'))
```

Output:

```python
True
```

---

## 21. `getattr()`

Gets attribute value.

Example:

```python
print(getattr(t, 'x'))
```

---

## 22. `setattr()`

Sets attribute dynamically.

Example:

```python
setattr(t, 'y', 500)

print(t.y)
```

---

## 23. `isinstance()`

Checks object type.

Example:

```python
print(isinstance(10, int))
```

Output:

```python
True
```

---

## 24. `vars()`

Returns attribute dictionary.

Example:

```python
print(vars(t))
```

---

## 25. `str()`

Human-readable representation.

Example:

```python
print(str(100))
```

---

## 26. `repr()`

Developer-oriented representation.

Example:

```python
print(repr("Python"))
```

---

## 27. `bool()`

Returns boolean value.

Example:

```python
print(bool(0))
print(bool(10))
```

Output:

```python
False
True
```

---

## 28. `callable()`

Checks whether object can be called.

Example:

```python
def test():
    pass

print(callable(test))
```

Output:

```python
True
```

---

## 29. `iter()`

Creates iterator.

Example:

```python
x = [1, 2, 3]

it = iter(x)

print(next(it))
```

---

## 30. `reversed()`

Returns reverse iterator.

Example:

```python
x = [1, 2, 3]

for i in reversed(x):
    print(i)
```

---

## 31. `len()`

Returns length.

Example:

```python
print(len("Python"))
```

Output:

```python
6
```

---

## 32. OO Design – Pythonisms and Best Practices

### 1. Prefer Simplicity

Python philosophy:

```text
Simple is better than complex.
```

---

### 2. Use Meaningful Names

Good:

```python
student_name
```

Bad:

```python
x
```

---

### 3. Use Constructor Properly

Example:

```python
class Student:
    def __init__(self, name):
        self.name = name
```

---

### 4. Encapsulation

Use `_` for internal members.

Example:

```python
class Test:
    def __init__(self):
        self._value = 10
```

---

### 5. Prefer Composition over Deep Inheritance

Better:

```python
class Engine:
    pass

class Car:
    def __init__(self):
        self.engine = Engine()
```

---

## 33. Summary Table

| Concept            | Purpose               |
| ------------------ | --------------------- |
| Class              | Blueprint             |
| Object             | Instance of class     |
| Instance Attribute | Object-specific data  |
| Class Attribute    | Shared data           |
| Instance Method    | Works on object       |
| Class Method       | Works on class        |
| Static Method      | Utility method        |
| Inheritance        | Reuse code            |
| Duck Typing        | Behavior-based typing |
| Introspection      | Runtime inspection    |

---

## 34. Mini Practice Programs

### Program 1

```python
class Employee:
    company = "TCS"

    def __init__(self, name):
        self.name = name

e1 = Employee("John")

print(e1.name)
print(e1.company)
```

---

### Program 2

```python
class Calculator:

    @staticmethod
    def square(x):
        return x * x

print(Calculator.square(5))
```

---

### Program 3

```python
class Animal:
    def speak(self):
        print("Animal sound")

class Dog(Animal):
    pass

d = Dog()
d.speak()
```

```
```

# Ch : 19 Comprehensions in Python – Detailed Notes

## 1. Introduction to Comprehensions

Comprehensions provide a **short and elegant way** to create collections in Python.

Instead of writing:

```python id="v13f4f"
result = []

for i in range(5):
    result.append(i)
```

We can write:

```python id="8e0g7j"
result = [i for i in range(5)]
```

Output:

```python id="2z7l0r"
[0, 1, 2, 3, 4]
```

---

## 2. Why Use Comprehensions?

Advantages:

* Shorter code
* More readable
* Faster execution
* Functional programming style
* Easier transformation/filtering

---

## 3. General Syntax of Comprehensions

Basic syntax:

```python id="yj6if0"
[expression for item in iterable]
```

With condition:

```python id="w53j7o"
[expression for item in iterable if condition]
```

---

## 4. List Comprehension

Creates a list in compact syntax.

---

## 5. Basic Example

Traditional way:

```python id="vbwjlwm"
squares = []

for i in range(1, 6):
    squares.append(i * i)

print(squares)
```

Using comprehension:

```python id="gmg2hx"
squares = [i * i for i in range(1, 6)]

print(squares)
```

Output:

```python id="ejbd7d"
[1, 4, 9, 16, 25]
```

---

## 6. List Comprehension with Condition

Example:

```python id="51q4de"
even_numbers = [i for i in range(1, 11) if i % 2 == 0]

print(even_numbers)
```

Output:

```python id="clvchm"
[2, 4, 6, 8, 10]
```

---

## 7. Multiple Conditions

Example:

```python id="1g2rd9"
numbers = [i for i in range(1, 31)
           if i % 2 == 0 and i % 3 == 0]

print(numbers)
```

Output:

```python id="r6vjjq"
[6, 12, 18, 24, 30]
```

---

## 8. Conditional Expression in Comprehension

Syntax:

```python id="vq0s4t"
[value_if_true if condition else value_if_false for item in iterable]
```

Example:

```python id="jll42v"
result = ["Even" if i % 2 == 0 else "Odd"
          for i in range(1, 6)]

print(result)
```

Output:

```python id="g3gwde"
['Odd', 'Even', 'Odd', 'Even', 'Odd']
```

---

## 9. Nested List Comprehension

Example:

```python id="h3bwmf"
matrix = [[i * j for j in range(1, 4)]
          for i in range(1, 4)]

print(matrix)
```

Output:

```python id="ru1eqe"
[[1, 2, 3], [2, 4, 6], [3, 6, 9]]
```

---

## 10. Flattening Nested Lists

Example:

```python id="z6e8cc"
matrix = [[1, 2], [3, 4], [5, 6]]

flat = [item for row in matrix for item in row]

print(flat)
```

Output:

```python id="6zazx0"
[1, 2, 3, 4, 5, 6]
```

---

## 11. Map-Comprehensions

Map means:

* Transforming data

Equivalent to `map()` function.

---

## 12. Using `map()`

Example:

```python id="24qg0m"
numbers = [1, 2, 3, 4]

result = list(map(lambda x: x * x, numbers))

print(result)
```

---

## 13. Equivalent Map-Comprehension

Example:

```python id="0gzjlwm"
numbers = [1, 2, 3, 4]

result = [x * x for x in numbers]

print(result)
```

Output:

```python id="tzx2cr"
[1, 4, 9, 16]
```

---

## 14. Real-Life Map Example

Convert names to uppercase:

```python id="t9kl3m"
names = ["john", "david", "sam"]

upper_names = [name.upper() for name in names]

print(upper_names)
```

Output:

```python id="y7ruv7"
['JOHN', 'DAVID', 'SAM']
```

---

## 15. Filter-Comprehensions

Filter means:

* Selecting elements based on condition

Equivalent to `filter()`.

---

## 16. Using `filter()`

Example:

```python id="w2i2eu"
numbers = [1, 2, 3, 4, 5]

result = list(filter(lambda x: x % 2 == 0, numbers))

print(result)
```

---

## 17. Equivalent Filter-Comprehension

Example:

```python id="h5n5m9"
numbers = [1, 2, 3, 4, 5]

result = [x for x in numbers if x % 2 == 0]

print(result)
```

Output:

```python id="8xwl6k"
[2, 4]
```

---

## 18. Combining Map and Filter

Example:

```python id="9v1c1s"
numbers = [1, 2, 3, 4, 5, 6]

result = [x * x for x in numbers if x % 2 == 0]

print(result)
```

Output:

```python id="rl6ptz"
[4, 16, 36]
```

---

## 19. Tuple Comprehension

Python does NOT create tuple comprehension directly.

It creates a generator object.

Example:

```python id="7b6sq0"
t = (x * x for x in range(5))

print(t)
```

Output:

```python id="zj8h8q"
<generator object ...>
```

Convert explicitly:

```python id="wgh0dm"
t = tuple(x * x for x in range(5))

print(t)
```

Output:

```python id="1zcg5m"
(0, 1, 4, 9, 16)
```

---

## 20. Set Comprehension

Creates a set.

Syntax:

```python id="c4c8yc"
{expression for item in iterable}
```

Example:

```python id="e9e4ks"
numbers = {x * x for x in range(1, 6)}

print(numbers)
```

Output:

```python id="4uwtgi"
{1, 4, 9, 16, 25}
```

---

## 21. Removing Duplicates using Set Comprehension

Example:

```python id="x7d4qf"
data = [1, 2, 2, 3, 4, 4]

unique = {x for x in data}

print(unique)
```

Output:

```python id="o4kwba"
{1, 2, 3, 4}
```

---

## 22. Dictionary Comprehension

Creates dictionaries dynamically.

Syntax:

```python id="k8k6n7"
{key:value for item in iterable}
```

---

## 23. Basic Dictionary Comprehension

Example:

```python id="6clnyv"
squares = {x: x * x for x in range(1, 6)}

print(squares)
```

Output:

```python id="w3hbvk"
{1: 1, 2: 4, 3: 9, 4: 16, 5: 25}
```

---

## 24. Dictionary with Condition

Example:

```python id="wzz5ol"
result = {x: x * x for x in range(1, 11)
          if x % 2 == 0}

print(result)
```

Output:

```python id="z6hlmx"
{2: 4, 4: 16, 6: 36, 8: 64, 10: 100}
```

---

## 25. Swapping Dictionary Keys and Values

Example:

```python id="rx0eja"
data = {"a": 1, "b": 2}

swapped = {v: k for k, v in data.items()}

print(swapped)
```

Output:

```python id="axcax2"
{1: 'a', 2: 'b'}
```

---

## 26. Generator Comprehensions

Generator comprehensions generate values lazily.

Syntax:

```python id="ktt2pc"
(expression for item in iterable)
```

---

## 27. Example of Generator Comprehension

Example:

```python id="6u5m4d"
g = (x * x for x in range(5))

print(g)
```

Output:

```python id="yzsq4e"
<generator object ...>
```

---

## 28. Accessing Generator Values

Example:

```python id="f95p3m"
g = (x * x for x in range(5))

for value in g:
    print(value)
```

Output:

```python id="vpm1al"
0
1
4
9
16
```

---

## 29. Difference Between List and Generator Comprehension

| List Comprehension  | Generator Comprehension |
| ------------------- | ----------------------- |
| Uses `[]`           | Uses `()`               |
| Stores all values   | Generates one by one    |
| More memory         | Less memory             |
| Faster access       | Slower access           |
| Good for small data | Good for large data     |

---

## 30. Memory Efficiency Example

List:

```python id="8wm1pw"
x = [i for i in range(1000000)]
```

Generator:

```python id="8snn3k"
x = (i for i in range(1000000))
```

Generator uses significantly less memory.

---

## 31. Complex Iteration-Based Problems

---

## Problem 1 – Find Squares of Even Numbers

Traditional:

```python id="1e33u0"
result = []

for i in range(1, 11):
    if i % 2 == 0:
        result.append(i * i)

print(result)
```

Comprehension:

```python id="2z7ldh"
result = [i * i for i in range(1, 11)
          if i % 2 == 0]

print(result)
```

---

## Problem 2 – Extract Vowels from String

Example:

```python id="7ywgj9"
text = "python programming"

vowels = [ch for ch in text
          if ch.lower() in 'aeiou']

print(vowels)
```

Output:

```python id="thg9g9"
['o', 'o', 'a', 'i']
```

---

## Problem 3 – Remove Negative Numbers

Example:

```python id="sh1vn4"
numbers = [-2, 5, -7, 8, 10]

positive = [x for x in numbers if x >= 0]

print(positive)
```

Output:

```python id="4gqnlw"
[5, 8, 10]
```

---

## Problem 4 – Create Multiplication Table

Example:

```python id="cgrkqo"
table = [[i * j for j in range(1, 6)]
         for i in range(1, 6)]

print(table)
```

---

## Problem 5 – Word Length Mapping

Example:

```python id="1i7w0e"
words = ["apple", "banana", "kiwi"]

lengths = {word: len(word) for word in words}

print(lengths)
```

Output:

```python id="ptx8gr"
{'apple': 5, 'banana': 6, 'kiwi': 4}
```

---

## Problem 6 – Flatten Nested List

Example:

```python id="8tjlwm"
nested = [[1, 2], [3, 4], [5, 6]]

flat = [x for row in nested for x in row]

print(flat)
```

---

## Problem 7 – Matrix Transpose

Example:

```python id="vtb9q4"
matrix = [
    [1, 2, 3],
    [4, 5, 6]
]

transpose = [[row[i] for row in matrix]
             for i in range(3)]

print(transpose)
```

Output:

```python id="ppsh7l"
[[1, 4], [2, 5], [3, 6]]
```

---

## 32. Nested Comprehension Structure

General form:

```python id="j5n3sh"
[expression
 for item1 in iterable1
 for item2 in iterable2
 if condition]
```

---

## 33. Performance Notes

Comprehensions are:

* Faster than loops in many cases
* Optimized internally in Python
* Easier to read for transformations

But:

* Very complex comprehensions reduce readability

---

## 34. Best Practices

### 1. Keep It Readable

Good:

```python id="36z5pp"
[x * x for x in numbers]
```

Bad:

```python id="jvpgzu"
[x*y+z for x in a for y in b for z in c if x%2==0 if y>5]
```

---

### 2. Avoid Deep Nesting

Too much nesting reduces clarity.

---

### 3. Use Generator for Large Data

Preferred:

```python id="1ghvwv"
(x for x in large_data)
```

---

### 4. Use Dictionary Comprehension Carefully

Keys must be unique.

---

## 35. Summary Table

| Comprehension Type | Syntax                  |
| ------------------ | ----------------------- |
| List               | `[x for x in data]`     |
| Set                | `{x for x in data}`     |
| Dictionary         | `{k:v for k,v in data}` |
| Generator          | `(x for x in data)`     |

---

## 36. Important Interview Questions

### Q1. Difference between list and generator comprehension?

| List            | Generator        |
| --------------- | ---------------- |
| Stores all data | Lazy evaluation  |
| More memory     | Less memory      |
| Faster access   | Iterative access |

---

### Q2. Can tuple comprehension exist?

No directly.
`()` creates a generator expression.

---

### Q3. Why use comprehensions?

* Cleaner code
* Better readability
* Faster execution
* Functional style programming

---

## 37. Final Mini Practice Programs

### Program 1

```python id="mz1e38"
numbers = [1, 2, 3, 4, 5]

result = [x * 2 for x in numbers]

print(result)
```

---

### Program 2

```python id="mp0n9y"
words = ["python", "java", "go"]

upper = [word.upper() for word in words]

print(upper)
```

---

### Program 3

```python id="jlwmk9"
numbers = [1, 2, 3, 4, 5, 6]

even = [x for x in numbers if x % 2 == 0]

print(even)
```

---

### Program 4

```python id="w4pb2d"
data = ["apple", "banana", "kiwi"]

result = {word: len(word) for word in data}

print(result)
```

---

### Program 5

```python id="rzt4y9"
gen = (x * x for x in range(5))

for i in gen:
    print(i)
```

```
```