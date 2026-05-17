# Ch : 19 Decorators and AOP Features in Python

---

## 1. Introduction to Decorators

A **decorator** is a function (or class) that modifies the behavior of another function, method, or class **without changing its original code**.

Decorators are heavily used in:

* Logging
* Authentication
* Authorization
* Validation
* Performance monitoring
* Caching
* Dependency Injection
* Aspect-Oriented Programming (AOP)

---

## 2. What is AOP (Aspect-Oriented Programming)?

AOP separates:

* **Core Business Logic**
  from
* **Cross-Cutting Concerns**

Examples of Cross-Cutting Concerns:

| Concern      | Example                         |
| ------------ | ------------------------------- |
| Logging      | Print execution details         |
| Security     | Authentication checks           |
| Timing       | Measure execution time          |
| Validation   | Input validation                |
| Transactions | Database transaction management |

Decorator is Python’s main AOP-like feature.

---

## 3. Basic Function Decorator

### Normal Function

```python
def greet():
    print("Hello")
```

---

### Decorator Function

```python
def decorator_function(original_function):

    def wrapper():
        print("Before function call")

        original_function()

        print("After function call")

    return wrapper
```

---

### Applying Decorator

```python
def greet():
    print("Hello")

greet = decorator_function(greet)

greet()
```

#### Output

```text
Before function call
Hello
After function call
```

---

## 4. Using @ Syntax

Python provides cleaner syntax using `@`.

```python
def decorator_function(original_function):

    def wrapper():
        print("Before")

        original_function()

        print("After")

    return wrapper

@decorator_function
def greet():
    print("Hello")

greet()
```

---

## 5. Decorator Execution Flow

When Python sees:

```python
@decorator
def test():
    pass
```

Python internally converts it into:

```python
test = decorator(test)
```

---

## 6. Decorators with Arguments

Without `*args` and `**kwargs`, decorators work only for functions with fixed parameters.

---

### Generic Decorator

```python
def my_decorator(func):

    def wrapper(*args, **kwargs):

        print("Before execution")

        result = func(*args, **kwargs)

        print("After execution")

        return result

    return wrapper
```

---

### Example

```python
@my_decorator
def add(a, b):
    return a + b

print(add(10, 20))
```

#### Output

```text
Before execution
After execution
30
```

---

## 7. Why Use *args and **kwargs?

| Feature    | Purpose                     |
| ---------- | --------------------------- |
| `*args`    | Accept positional arguments |
| `**kwargs` | Accept keyword arguments    |

This makes decorators reusable for all functions.

---

## 8. Preserving Original Function Metadata

Decorators replace original function information.

Example:

```python
print(add.__name__)
```

May print:

```text
wrapper
```

instead of:

```text
add
```

---

### Solution: functools.wraps

```python
from functools import wraps

def my_decorator(func):

    @wraps(func)
    def wrapper(*args, **kwargs):

        print("Before")

        return func(*args, **kwargs)

    return wrapper
```

---

## 9. Parameterized Decorators (Decorators with Arguments)

Decorator itself receives arguments.

---

### Syntax Structure

```python
def outer(argument):

    def actual_decorator(func):

        def wrapper(*args, **kwargs):

            ## logic

            return func(*args, **kwargs)

        return wrapper

    return actual_decorator
```

---

## 10. Example: Repeat Function Multiple Times

```python
def repeat(times):

    def decorator(func):

        def wrapper(*args, **kwargs):

            for i in range(times):
                func(*args, **kwargs)

        return wrapper

    return decorator
```

---

### Using Parameterized Decorator

```python
@repeat(3)
def hello():
    print("Hello")

hello()
```

#### Output

```text
Hello
Hello
Hello
```

---

## 11. Logging Decorator Example

```python
from functools import wraps

def log_function(func):

    @wraps(func)
    def wrapper(*args, **kwargs):

        print(f"Calling function: {func.__name__}")

        result = func(*args, **kwargs)

        print(f"Function completed")

        return result

    return wrapper
```

---

## 12. Timing Decorator Example

```python
import time
from functools import wraps

def timer(func):

    @wraps(func)
    def wrapper(*args, **kwargs):

        start = time.time()

        result = func(*args, **kwargs)

        end = time.time()

        print("Execution Time:", end - start)

        return result

    return wrapper
```

---

## 13. Validation Decorator Example

```python
def validate_positive(func):

    def wrapper(num):

        if num < 0:
            print("Negative number not allowed")
            return

        return func(num)

    return wrapper
```

---

### Usage

```python
@validate_positive
def square(n):
    print(n * n)

square(5)
square(-2)
```

---

## 14. Chaining Decorators

Multiple decorators can be applied.

---

### Example

```python
def star(func):

    def wrapper():
        print("*****")
        func()
        print("*****")

    return wrapper


def hash_symbol(func):

    def wrapper():
        print("#####")
        func()
        print("#####")

    return wrapper
```

---

### Applying Multiple Decorators

```python
@star
@hash_symbol
def display():
    print("WELCOME")

display()
```

---

### Execution Order

Equivalent to:

```python
display = star(hash_symbol(display))
```

---

### Output

```text
*****
#####
WELCOME
#####
*****
```

---

## 15. Order of Chained Decorators

Decorator order matters.

Top decorator executes last during wrapping but first during execution.

---

## 16. AOP Concepts in Python Decorators

### AOP Terminology

| AOP Term   | Meaning                    |
| ---------- | -------------------------- |
| Aspect     | Cross-cutting feature      |
| Join Point | Function execution point   |
| Advice     | Code executed before/after |
| Pointcut   | Which functions to apply   |
| Weaving    | Applying aspect            |

---

## 17. Before Filter

Runs before actual function.

```python
def before_filter(func):

    def wrapper(*args, **kwargs):

        print("Authentication check")

        return func(*args, **kwargs)

    return wrapper
```

---

## 18. After Filter

Runs after actual function.

```python
def after_filter(func):

    def wrapper(*args, **kwargs):

        result = func(*args, **kwargs)

        print("Logging completed")

        return result

    return wrapper
```

---

## 19. Around Filter

Controls entire execution.

```python
def around_filter(func):

    def wrapper(*args, **kwargs):

        print("Before")

        result = func(*args, **kwargs)

        print("After")

        return result

    return wrapper
```

---

## 20. Dependency Injection Using Decorators

Decorators can inject objects/resources automatically.

---

### Example

```python
class Database:

    def connect(self):
        print("Database connected")


def inject_database(func):

    def wrapper(*args, **kwargs):

        db = Database()

        return func(db, *args, **kwargs)

    return wrapper
```

---

### Usage

```python
@inject_database
def process_data(db):

    db.connect()

    print("Processing data")

process_data()
```

---

## 21. Class-Based Decorators

Decorators can also be implemented using classes.

---

### Basic Structure

```python
class DecoratorClass:

    def __init__(self, func):
        self.func = func

    def __call__(self, *args, **kwargs):

        print("Before execution")

        result = self.func(*args, **kwargs)

        print("After execution")

        return result
```

---

### Usage

```python
@DecoratorClass
def greet():
    print("Hello")

greet()
```

---

## 22. Advantages of Class-Based Decorators

| Advantage      | Description              |
| -------------- | ------------------------ |
| Stateful       | Can store data           |
| Reusable       | Better organization      |
| OOP Support    | Fits class design        |
| Advanced Logic | Easier for complex cases |

---

## 23. Stateful Decorator Example

Count number of function calls.

```python
class CountCalls:

    def __init__(self, func):

        self.func = func
        self.count = 0

    def __call__(self, *args, **kwargs):

        self.count += 1

        print("Called", self.count, "times")

        return self.func(*args, **kwargs)
```

---

### Usage

```python
@CountCalls
def hello():
    print("Hello")

hello()
hello()
```

---

## 24. Decorating Methods in Classes

Decorators also work on methods.

---

### Example

```python
def logger(func):

    def wrapper(*args, **kwargs):

        print("Method called")

        return func(*args, **kwargs)

    return wrapper


class Employee:

    @logger
    def work(self):
        print("Working")
```

---

## 25. Decorating Entire Classes

Decorator can modify classes.

---

### Example

```python
def add_method(cls):

    def display(self):
        print("New method added")

    cls.display = display

    return cls
```

---

### Usage

```python
@add_method
class Student:
    pass

s = Student()

s.display()
```

---

## 26. Class Decorator Use Cases

| Use Case             | Example          |
| -------------------- | ---------------- |
| Auto-registration    | Plugin systems   |
| Validation           | Model validation |
| ORM mapping          | Django models    |
| Dependency Injection | Frameworks       |
| Singleton creation   | Only one object  |

---

## 27. Decorating Static Methods and Class Methods

```python
class Test:

    @staticmethod
    def method1():
        print("Static Method")

    @classmethod
    def method2(cls):
        print("Class Method")
```

---

## 28. Property Decorators

Python has built-in decorators.

---

### @property

```python
class Person:

    def __init__(self):
        self._age = 0

    @property
    def age(self):
        return self._age
```

---

### Setter Decorator

```python
    @age.setter
    def age(self, value):

        if value < 0:
            raise ValueError("Invalid age")

        self._age = value
```

---

## 29. Decorating Modules

Python modules themselves can be modified dynamically.

Though rare, module-level decoration techniques include:

* Monkey patching
* Import hooks
* Wrapping module functions

---

### Example

```python
import math

original_sqrt = math.sqrt

def custom_sqrt(x):

    print("Square root called")

    return original_sqrt(x)

math.sqrt = custom_sqrt

print(math.sqrt(16))
```

---

## 30. Real-World Use Cases of Decorators

| Use Case       | Example                |
| -------------- | ---------------------- |
| Authentication | Login verification     |
| Authorization  | Access control         |
| Logging        | API request logs       |
| Monitoring     | Execution timing       |
| Retry Logic    | Retry failed requests  |
| Caching        | Store previous results |
| Transactions   | Database rollback      |
| Validation     | Input checking         |
| Rate Limiting  | API throttling         |

---

## 31. Example: Caching Decorator

```python
def cache(func):

    stored = {}

    def wrapper(n):

        if n in stored:
            return stored[n]

        result = func(n)

        stored[n] = result

        return result

    return wrapper
```

---

### Usage

```python
@cache
def square(n):

    print("Computing")

    return n * n

print(square(5))
print(square(5))
```

---

## 32. Built-in Python Decorators

| Decorator         | Purpose                     |
| ----------------- | --------------------------- |
| `@staticmethod`   | Static methods              |
| `@classmethod`    | Class methods               |
| `@property`       | Getter method               |
| `@abstractmethod` | Abstract methods            |
| `@dataclass`      | Auto-generate class methods |
| `@lru_cache`      | Caching                     |

---

## 33. functools.lru_cache Example

```python
from functools import lru_cache

@lru_cache(maxsize=100)
def fibonacci(n):

    if n < 2:
        return n

    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(40))
```

---

## 34. Best Practices for Decorators

| Best Practice                  | Explanation              |
| ------------------------------ | ------------------------ |
| Use `wraps`                    | Preserve metadata        |
| Keep decorators simple         | Easier debugging         |
| Use meaningful names           | Improve readability      |
| Avoid excessive chaining       | Reduces complexity       |
| Document behavior              | Important for teams      |
| Reuse decorators               | Avoid duplicate code     |
| Use class decorators carefully | Can complicate debugging |

---

## 35. Common Mistakes

| Mistake                        | Problem                  |
| ------------------------------ | ------------------------ |
| Forgetting return              | Function returns None    |
| Missing `*args, **kwargs`      | Limited decorator        |
| Losing metadata                | Wrong function name/docs |
| Too many decorators            | Hard debugging           |
| Changing arguments incorrectly | Unexpected bugs          |

---

## 36. Decorator vs Higher-Order Function

| Feature     | Decorator       | Higher-Order Function   |
| ----------- | --------------- | ----------------------- |
| Purpose     | Modify behavior | Accept/return functions |
| Syntax      | `@decorator`    | Normal function call    |
| AOP Support | Yes             | Partial                 |
| Readability | Cleaner         | Less concise            |

---

## 37. Summary

Decorators are one of Python’s most powerful features.

They help:

* Reuse code
* Separate concerns
* Implement AOP concepts
* Add functionality dynamically
* Improve maintainability

Key concepts learned:

* Function decorators
* Parameterized decorators
* Chaining decorators
* Before/After/Around filters
* Class decorators
* Method decorators
* Dependency injection
* Real-world use cases
* Best practices

---

## 38. Quick Revision Table

| Topic                   | Key Idea                            |
| ----------------------- | ----------------------------------- |
| Decorator               | Function modifying another function |
| `@` Syntax              | Cleaner decorator syntax            |
| `*args, **kwargs`       | Generic decorator support           |
| `wraps`                 | Preserve metadata                   |
| Parameterized Decorator | Decorator with arguments            |
| Chaining                | Multiple decorators together        |
| Before Filter           | Runs before function                |
| After Filter            | Runs after function                 |
| Around Filter           | Controls full execution             |
| Class Decorator         | Decorates class                     |
| Method Decorator        | Decorates class methods             |
| AOP                     | Cross-cutting concerns separation   |
| DI                      | Inject dependencies automatically   |

```
```

# Ch : 20 Creating Generators, Iterators and Co-routines in Python

---

## 1. Introduction

Modern applications often need to:

* Process large amounts of data
* Perform background tasks
* Handle multiple operations simultaneously
* Build efficient pipelines
* Avoid memory wastage

Python provides several powerful concepts for this:

* **Iterators**
* **Generators**
* **Coroutines**
* **Async/Await**
* **AsyncIO**

These features help in:

* Lazy evaluation
* Streaming data
* Concurrency
* Efficient execution

---

## 2. Understanding the Concurrency Problem

### Traditional Procedural Programming

In normal procedural programming:

```python
task1()
task2()
task3()
```

Execution is:

* Sequential
* Blocking
* One task waits for another

---

### Problem Example

```python
import time

def download():
    print("Downloading...")
    time.sleep(5)
    print("Download complete")

def process():
    print("Processing...")
    time.sleep(3)
    print("Processing complete")

download()
process()
```

### Issue

While `download()` waits:

* CPU stays idle
* Other tasks cannot run

This is inefficient.

---

## 3. What is an Iterator?

An iterator is an object that:

* Stores state
* Produces values one at a time

It follows:

* `__iter__()`
* `__next__()`

---

## 4. Creating Custom Iterators

### Example: Simple Counter Iterator

```python
class Counter:
    def __init__(self, limit):
        self.limit = limit
        self.current = 1

    def __iter__(self):
        return self

    def __next__(self):
        if self.current <= self.limit:
            value = self.current
            self.current += 1
            return value
        else:
            raise StopIteration

c = Counter(5)

for i in c:
    print(i)
```

### Output

```python
1
2
3
4
5
```

---

## 5. Iterator Workflow

Python internally does:

```python
obj = iter(c)
next(obj)
next(obj)
```

---

## 6. Limitations of Iterators

Writing iterators manually:

* Requires more code
* State management becomes difficult
* Complex for large workflows

Solution:
→ **Generators**

---

## 7. What is a Generator?

A generator:

* Automatically creates an iterator
* Uses `yield`
* Produces values lazily

---

## 8. Creating Generators Using yield

### Basic Generator

```python
def numbers():
    yield 1
    yield 2
    yield 3

g = numbers()

print(next(g))
print(next(g))
print(next(g))
```

### Output

```python
1
2
3
```

---

## 9. How yield Works

`yield`:

* Pauses function execution
* Saves function state
* Resumes later

Unlike `return`:

* `return` terminates function
* `yield` suspends function

---

## 10. Generator Example with Loop

```python
def even_numbers(limit):
    for i in range(2, limit + 1, 2):
        yield i

for num in even_numbers(10):
    print(num)
```

---

## 11. Advantages of Generators

### Memory Efficient

Generators:

* Produce one item at a time
* Do not store entire sequence

Useful for:

* Big files
* Infinite streams
* Real-time data

---

## 12. Generator vs List

### List

```python
nums = [x*x for x in range(1000000)]
```

Consumes large memory.

---

### Generator

```python
nums = (x*x for x in range(1000000))
```

Consumes very little memory.

---

## 13. Generator Expressions

Similar to list comprehensions.

### Syntax

```python
gen = (x*x for x in range(5))
```

---

## 14. Infinite Generators

```python
def infinite():
    n = 1

    while True:
        yield n
        n += 1

g = infinite()

print(next(g))
print(next(g))
print(next(g))
```

---

## 15. Interesting Generator Patterns in itertools Module

Python provides powerful iterator utilities through:

```python
import itertools
```

---

## 16. count()

Creates infinite counting iterator.

```python
import itertools

counter = itertools.count(10)

print(next(counter))
print(next(counter))
print(next(counter))
```

### Output

```python
10
11
12
```

---

## 17. cycle()

Repeats values forever.

```python
import itertools

c = itertools.cycle(['A', 'B', 'C'])

for i in range(7):
    print(next(c))
```

### Output

```python
A
B
C
A
B
C
A
```

---

## 18. repeat()

Repeats same value.

```python
import itertools

r = itertools.repeat("Python", 3)

for i in r:
    print(i)
```

---

## 19. chain()

Combines iterables.

```python
import itertools

a = [1, 2]
b = [3, 4]

result = itertools.chain(a, b)

for i in result:
    print(i)
```

---

## 20. islice()

Slices iterators.

```python
import itertools

nums = itertools.count(1)

result = itertools.islice(nums, 5)

for i in result:
    print(i)
```

---

## 21. accumulate()

Cumulative operations.

```python
import itertools

nums = [1, 2, 3, 4]

result = itertools.accumulate(nums)

print(list(result))
```

### Output

```python
[1, 3, 6, 10]
```

---

## 22. zip_longest()

Zips uneven iterables.

```python
import itertools

a = [1, 2]
b = ['A', 'B', 'C']

result = itertools.zip_longest(a, b, fillvalue='X')

print(list(result))
```

---

## 23. What are Coroutines?

Coroutines are functions that:

* Can pause and resume
* Receive data dynamically
* Cooperatively multitask

Generators become coroutines using:

* `yield expression`

---

## 24. Creating Coroutines Using yield Expressions

### Simple Coroutine

```python
def coroutine():
    while True:
        value = yield
        print("Received:", value)

c = coroutine()

next(c)

c.send(10)
c.send(20)
```

### Output

```python
Received: 10
Received: 20
```

---

## 25. Understanding send()

`send()`:

* Sends value into coroutine
* Resumes execution

---

## 26. Coroutine Workflow

```python
value = yield
```

Steps:

1. Pause at yield
2. Wait for input
3. Receive input using `send()`

---

## 27. Coroutine Example: Running Average

```python
def average():
    total = 0
    count = 0

    while True:
        value = yield total / count if count else 0

        total += value
        count += 1

avg = average()

print(next(avg))
print(avg.send(10))
print(avg.send(20))
print(avg.send(30))
```

---

## 28. Execution Pipelines Using Generators

Generators can form processing pipelines.

---

## 29. Pipeline Example

### Step 1: Generate Numbers

```python
def numbers():
    for i in range(1, 11):
        yield i
```

---

### Step 2: Filter Even Numbers

```python
def even_filter(nums):
    for n in nums:
        if n % 2 == 0:
            yield n
```

---

### Step 3: Square Numbers

```python
def square(nums):
    for n in nums:
        yield n * n
```

---

### Step 4: Execute Pipeline

```python
pipeline = square(even_filter(numbers()))

for i in pipeline:
    print(i)
```

### Output

```python
4
16
36
64
100
```

---

## 30. Benefits of Generator Pipelines

* Memory efficient
* Lazy processing
* Reusable stages
* Stream processing
* Fast execution

Used in:

* ETL systems
* Big data processing
* Log analyzers
* Streaming systems

---

## 31. Async and Await

Python introduced:

* `async`
* `await`

to simplify asynchronous programming.

---

## 32. Async Function

```python
async def greet():
    print("Hello")
```

This creates a coroutine object.

---

## 33. Using await

`await` pauses execution until task completes.

---

## 34. Async Example

```python
import asyncio

async def task():
    print("Start")
    await asyncio.sleep(2)
    print("End")

asyncio.run(task())
```

---

## 35. Why Async/Await?

Advantages:

* Cleaner syntax
* Easier than callback systems
* Better readability
* Efficient concurrency

---

## 36. Concurrent Async Tasks

```python
import asyncio

async def worker(name, delay):
    print(f"{name} started")

    await asyncio.sleep(delay)

    print(f"{name} completed")

async def main():
    await asyncio.gather(
        worker("Task1", 2),
        worker("Task2", 1)
    )

asyncio.run(main())
```

### Output

```python
Task1 started
Task2 started
Task2 completed
Task1 completed
```

---

## 37. Understanding Cooperative Concurrency

Tasks:

* Voluntarily yield control
* Other tasks execute meanwhile

This is called:

### Cooperative Multitasking

---

## 38. AsyncIO Library Overview

`asyncio` is Python’s built-in asynchronous framework.

---

## 39. Features of asyncio

* Event loop
* Coroutines
* Async tasks
* Futures
* Queues
* Networking support

---

## 40. Event Loop

The event loop:

* Manages tasks
* Schedules execution
* Handles waiting operations

---

## 41. Creating Tasks

```python
import asyncio

async def job():
    await asyncio.sleep(1)
    print("Done")

async def main():
    task = asyncio.create_task(job())

    await task

asyncio.run(main())
```

---

## 42. AsyncIO Queue Example

```python
import asyncio

async def producer(queue):
    for i in range(5):
        await queue.put(i)

async def consumer(queue):
    while True:
        item = await queue.get()

        print(item)

        queue.task_done()

async def main():
    queue = asyncio.Queue()

    asyncio.create_task(consumer(queue))

    await producer(queue)

    await queue.join()

asyncio.run(main())
```

---

## 43. Real-world Uses of AsyncIO

Used in:

* Web servers
* APIs
* Chat applications
* Streaming systems
* Web scraping
* Real-time dashboards

Frameworks:

* FastAPI
* aiohttp
* Sanic

---

## 44. Iterators vs Generators vs Coroutines

| Feature             | Iterator | Generator  | Coroutine  |
| ------------------- | -------- | ---------- | ---------- |
| Uses `__next__()`   | Yes      | Internally | Internally |
| Uses `yield`        | No       | Yes        | Yes        |
| Receives values     | No       | Limited    | Yes        |
| Lazy evaluation     | Yes      | Yes        | Yes        |
| Concurrency support | No       | Partial    | Strong     |

---

## 45. Best Practices

### Use Iterators When

* Building custom collections
* Fine control required

---

### Use Generators When

* Working with large datasets
* Streaming data
* Lazy processing

---

### Use Coroutines When

* Concurrent workflows needed
* Non-blocking execution required

---

### Use AsyncIO When

* I/O-bound applications
* Networking systems
* High concurrency needed

---

## 46. Common Mistakes

### Forgetting next()

```python
c = coroutine()
c.send(10)
```

Error occurs.

Need:

```python
next(c)
```

---

### Blocking Inside Async

Bad:

```python
time.sleep(5)
```

Good:

```python
await asyncio.sleep(5)
```

---

## 47. Summary

### Iterators

* Produce values one by one
* Implement `__iter__()` and `__next__()`

### Generators

* Simplified iterators
* Use `yield`

### Coroutines

* Receive and process values dynamically
* Support cooperative multitasking

### Async/Await

* Modern asynchronous syntax
* Cleaner concurrency handling

### AsyncIO

* Event-driven concurrency framework

---

## 48. Interview Questions

### Q1. Difference between iterator and generator?

* Iterator uses `__next__()`
* Generator uses `yield`

---

### Q2. What does yield do?

* Pauses function execution
* Saves state
* Resumes later

---

### Q3. Why generators are memory efficient?

* Produce values lazily
* Do not store entire collection

---

### Q4. Difference between async and threading?

* Async uses cooperative multitasking
* Threading uses OS threads

---

### Q5. What is asyncio?

* Python asynchronous framework using event loop and coroutines

```
```

# Ch : 21 Common Pythonic Design Patterns – Detailed Notes with Use-Case Examples

---

## 1. Introduction to Design Patterns

Design patterns are reusable solutions to commonly occurring software design problems.

In Python, patterns are usually:

* Simpler than in Java/C++
* More flexible because Python is dynamic
* Often implemented using functions, decorators, generators, and duck typing

Pythonic design focuses on:

* Readability
* Simplicity
* Reusability
* Maintainability

---

## 2. Singleton Pattern

### Definition

Singleton ensures:

* Only one object of a class exists
* A global access point is provided to that object

Used when one shared resource is needed.

---

## Real-Time Use Cases

| Use Case                 | Why Singleton                      |
| ------------------------ | ---------------------------------- |
| Database connection pool | Only one shared connection manager |
| Configuration manager    | Same config everywhere             |
| Logger                   | Single logging system              |
| Cache manager            | Shared cache across app            |

---

## Basic Singleton Implementation

```python
class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            print("Creating object")
            cls._instance = super().__new__(cls)
        return cls._instance


obj1 = Singleton()
obj2 = Singleton()

print(obj1 is obj2)
```

### Output

```python
Creating object
True
```

---

## Explanation

* `__new__()` controls object creation
* First time:

  * object is created
* Next times:

  * same object returned

---

## Singleton Logger Example

```python
class Logger:
    _instance = None

    def __new__(cls):
        if not cls._instance:
            cls._instance = super().__new__(cls)
        return cls._instance

    def log(self, message):
        print("LOG:", message)


logger1 = Logger()
logger2 = Logger()

logger1.log("Application Started")

print(logger1 is logger2)
```

---

## Advantages

* Saves memory
* Centralized access
* Good for shared services

---

## Disadvantages

* Harder to unit test
* Global state issues possible

---

## 3. Enforced Encapsulation Pattern

### Definition

Encapsulation means:

* Hiding internal data
* Allowing controlled access

Python does not enforce strict private access like Java.

Instead Python uses conventions.

---

## Types of Attributes

| Syntax   | Meaning                     |
| -------- | --------------------------- |
| `name`   | Public                      |
| `_name`  | Protected (convention)      |
| `__name` | Private using name mangling |

---

## Example

```python
class Employee:

    def __init__(self):
        self.name = "John"
        self._salary = 50000
        self.__ssn = "ABC123"

emp = Employee()

print(emp.name)
print(emp._salary)

## print(emp.__ssn)  ## Error
```

---

## Name Mangling

```python
print(emp._Employee__ssn)
```

Python internally changes:

```python
__ssn
```

to:

```python
_Employee__ssn
```

---

## Enforced Encapsulation Example

```python
class BankAccount:

    def __init__(self, balance):
        self.__balance = balance

    def deposit(self, amount):
        self.__balance += amount

    def withdraw(self, amount):
        if amount <= self.__balance:
            self.__balance -= amount

    def get_balance(self):
        return self.__balance


acc = BankAccount(1000)

acc.deposit(500)

print(acc.get_balance())
```

---

## Why Encapsulation?

* Prevents accidental modification
* Improves security
* Makes code maintainable

---

## 4. Accessor Pattern (Getter and Setter)

### Definition

Accessors control reading/writing object data.

Includes:

* Getter methods
* Setter methods
* Property decorators

---

## Traditional Getter/Setter

```python
class Student:

    def __init__(self):
        self.__marks = 0

    def set_marks(self, m):
        if m >= 0:
            self.__marks = m

    def get_marks(self):
        return self.__marks


s = Student()

s.set_marks(85)

print(s.get_marks())
```

---

## Pythonic Property Pattern

```python
class Student:

    def __init__(self):
        self.__marks = 0

    @property
    def marks(self):
        return self.__marks

    @marks.setter
    def marks(self, value):
        if value >= 0:
            self.__marks = value


s = Student()

s.marks = 90

print(s.marks)
```

---

## Advantages

* Validation possible
* Clean syntax
* Better encapsulation

---

## Real-Time Use Cases

| Domain          | Example              |
| --------------- | -------------------- |
| Banking         | Validate balance     |
| Student systems | Validate marks       |
| Ecommerce       | Validate price       |
| Healthcare      | Validate patient age |

---

## 5. Generator / Iterator Protocol

---

## Iterator Protocol

### Definition

An iterator is an object that:

* remembers state
* produces next value one at a time

Uses:

```python
__iter__()
__next__()
```

---

## Custom Iterator Example

```python
class Counter:

    def __init__(self, limit):
        self.limit = limit
        self.current = 1

    def __iter__(self):
        return self

    def __next__(self):

        if self.current > self.limit:
            raise StopIteration

        value = self.current
        self.current += 1

        return value


c = Counter(5)

for i in c:
    print(i)
```

---

## Flow

1. `iter()` calls `__iter__()`
2. loop repeatedly calls `__next__()`
3. StopIteration ends loop

---

## Generator Pattern

### Definition

Generators simplify iterator creation using:

```python
yield
```

---

## Generator Example

```python
def counter(limit):

    n = 1

    while n <= limit:
        yield n
        n += 1


for i in counter(5):
    print(i)
```

---

## Why Generators?

* Memory efficient
* Lazy evaluation
* Better for large data

---

## Real-Time Use Cases

| Use Case           | Benefit               |
| ------------------ | --------------------- |
| Reading huge files | No full memory load   |
| Streaming data     | Continuous processing |
| API pagination     | Fetch on demand       |
| Sensor processing  | Real-time iteration   |

---

## Fibonacci Generator

```python
def fibonacci(n):

    a, b = 0, 1

    for _ in range(n):
        yield a
        a, b = b, a + b


for value in fibonacci(10):
    print(value)
```

---

## Iterator vs Generator

| Feature    | Iterator  | Generator |
| ---------- | --------- | --------- |
| Complexity | More code | Less code |
| Memory     | Efficient | Efficient |
| Uses class | Yes       | No        |
| Uses yield | No        | Yes       |

---

## 6. Command-Dispatch Pattern

### Definition

Command-dispatch maps commands to functions dynamically.

Alternative to large:

```python
if-elif-else
```

blocks.

---

## Traditional Approach

```python
command = "add"

if command == "add":
    print("Add")
elif command == "delete":
    print("Delete")
```

Problem:

* Hard to maintain
* Large branching

---

## Pythonic Dispatch Dictionary

```python
def add():
    print("Add Operation")

def delete():
    print("Delete Operation")

def update():
    print("Update Operation")


commands = {
    "add": add,
    "delete": delete,
    "update": update
}

cmd = "delete"

commands[cmd]()
```

---

## Output

```python
Delete Operation
```

---

## Calculator Example

```python
def add(a, b):
    return a + b

def sub(a, b):
    return a - b

def mul(a, b):
    return a * b


operations = {
    "+": add,
    "-": sub,
    "*": mul
}

print(operations["+"](10, 5))
```

---

## Advantages

* Cleaner code
* Easily extensible
* Better readability

---

## Real-Time Use Cases

| Domain    | Example           |
| --------- | ----------------- |
| CLI tools | Git commands      |
| REST APIs | Route dispatching |
| Chatbots  | Intent handling   |
| Menus     | Option execution  |

---

## 7. Publish–Subscribe Pattern (Pub-Sub)

### Definition

Publisher sends messages/events.

Subscribers receive updates automatically.

Publisher does not know subscriber details.

---

## Architecture

```text
Publisher  --->  Subscribers
```

---

## Real-Time Examples

| System              | Publisher    | Subscriber  |
| ------------------- | ------------ | ----------- |
| YouTube             | Channel      | Subscribers |
| Stock Market        | Stock server | Traders     |
| WhatsApp            | User         | Contacts    |
| Notification System | App          | Users       |

---

## Simple Pub-Sub Example

```python
class Publisher:

    def __init__(self):
        self.subscribers = []

    def subscribe(self, fn):
        self.subscribers.append(fn)

    def notify(self, message):
        for sub in self.subscribers:
            sub(message)


def user1(msg):
    print("User1 received:", msg)

def user2(msg):
    print("User2 received:", msg)


pub = Publisher()

pub.subscribe(user1)
pub.subscribe(user2)

pub.notify("New Video Uploaded")
```

---

## Output

```python
User1 received: New Video Uploaded
User2 received: New Video Uploaded
```

---

## Event-Based Example

```python
class EventBus:

    def __init__(self):
        self.events = {}

    def subscribe(self, event, fn):

        if event not in self.events:
            self.events[event] = []

        self.events[event].append(fn)

    def publish(self, event, data):

        if event in self.events:
            for fn in self.events[event]:
                fn(data)


def email_service(data):
    print("Email:", data)

def sms_service(data):
    print("SMS:", data)


bus = EventBus()

bus.subscribe("order_created", email_service)
bus.subscribe("order_created", sms_service)

bus.publish("order_created", "Order #101 Created")
```

---

## Advantages

* Loose coupling
* Scalable
* Event-driven architecture

---

## Disadvantages

* Hard debugging
* Event ordering complexity

---

## 8. Factory Method Pattern

### Definition

Factory method creates objects without exposing creation logic.

Object creation delegated to factory.

---

## Problem Without Factory

```python
car = BMW()
```

Application tightly coupled to BMW.

---

## Factory Pattern Example

```python
class BMW:
    def drive(self):
        print("Driving BMW")

class Audi:
    def drive(self):
        print("Driving Audi")


class CarFactory:

    @staticmethod
    def get_car(car_type):

        if car_type == "bmw":
            return BMW()

        elif car_type == "audi":
            return Audi()

        else:
            return None


car = CarFactory.get_car("bmw")

car.drive()
```

---

## Output

```python
Driving BMW
```

---

## Advantages

* Loose coupling
* Easier maintenance
* Centralized creation logic

---

## Real-Time Use Cases

| Domain           | Example          |
| ---------------- | ---------------- |
| Database drivers | MySQL/PostgreSQL |
| Payment gateways | Razorpay/Stripe  |
| UI components    | Button factories |
| File parsers     | CSV/XML/JSON     |

---

## 9. Abstract Factory Pattern

### Definition

Abstract factory creates families of related objects.

Factory of factories.

---

## Example Scenario

Need:

* Windows UI
* Mac UI

Each should create:

* Button
* Checkbox

---

## Step-by-Step Example

### Product Classes

```python
class WindowsButton:
    def paint(self):
        print("Windows Button")

class MacButton:
    def paint(self):
        print("Mac Button")


class WindowsCheckbox:
    def paint(self):
        print("Windows Checkbox")

class MacCheckbox:
    def paint(self):
        print("Mac Checkbox")
```

---

## Abstract Factory

```python
class GUIFactory:

    def create_button(self):
        pass

    def create_checkbox(self):
        pass
```

---

## Concrete Factories

```python
class WindowsFactory(GUIFactory):

    def create_button(self):
        return WindowsButton()

    def create_checkbox(self):
        return WindowsCheckbox()


class MacFactory(GUIFactory):

    def create_button(self):
        return MacButton()

    def create_checkbox(self):
        return MacCheckbox()
```

---

## Client Code

```python
def build_ui(factory):

    btn = factory.create_button()
    chk = factory.create_checkbox()

    btn.paint()
    chk.paint()


factory = WindowsFactory()

build_ui(factory)
```

---

## Output

```python
Windows Button
Windows Checkbox
```

---

## Real-Time Use Cases

| Domain           | Example                   |
| ---------------- | ------------------------- |
| GUI frameworks   | Windows/Mac/Linux widgets |
| Database systems | Oracle/MySQL connectors   |
| Theme engines    | Dark/Light components     |
| Game development | Character families        |

---

## Factory Method vs Abstract Factory

| Feature    | Factory Method | Abstract Factory       |
| ---------- | -------------- | ---------------------- |
| Creates    | One object     | Family of objects      |
| Complexity | Simple         | More complex           |
| Purpose    | Single product | Related products       |
| Example    | One car        | Full vehicle ecosystem |

---

## 10. Summary Table

| Pattern           | Purpose                     | Python Feature Used     |
| ----------------- | --------------------------- | ----------------------- |
| Singleton         | Single shared object        | `__new__()`             |
| Encapsulation     | Hide data                   | `__private`             |
| Accessor          | Controlled access           | `@property`             |
| Iterator          | Sequential access           | `__iter__`, `__next__`  |
| Generator         | Lazy iteration              | `yield`                 |
| Command Dispatch  | Dynamic command execution   | Dictionary of functions |
| Publish-Subscribe | Event communication         | Callback lists          |
| Factory Method    | Object creation abstraction | Factory functions       |
| Abstract Factory  | Related object families     | Factory classes         |

---

## 11. Best Practices

---

### Prefer Pythonic Simplicity

Avoid overengineering.

---

### Use Generators for Large Data

Efficient memory usage.

---

### Prefer Dictionary Dispatch

Instead of huge conditional blocks.

---

### Use @property Instead of Explicit Getters

Cleaner syntax.

---

### Keep Factories Lightweight

Avoid unnecessary abstraction.

---

## 12. Interview Questions

---

### Q1. Difference between iterator and generator?

| Iterator          | Generator     |
| ----------------- | ------------- |
| Uses class        | Uses function |
| Uses `__next__()` | Uses `yield`  |
| More boilerplate  | Simpler       |

---

### Q2. Why use Singleton?

To ensure only one shared instance exists.

---

### Q3. Why use Factory Pattern?

To decouple object creation from usage.

---

### Q4. Advantage of Pub-Sub?

Loose coupling between components.

---

### Q5. What is lazy evaluation?

Values generated only when needed.

---

## 13. Mini Real-Time Architecture Example

### Ecommerce Application

| Component           | Pattern Used     |
| ------------------- | ---------------- |
| Database connection | Singleton        |
| Product validation  | Accessor         |
| Order streaming     | Generator        |
| API routing         | Command Dispatch |
| Notifications       | Pub-Sub          |
| Payment gateway     | Factory          |
| Theme/UI generation | Abstract Factory |

---

## 14. Conclusion

Python design patterns are:

* More concise
* Dynamic
* Easier to implement
* Highly reusable

Important production-ready patterns include:

* Singleton
* Generator
* Pub-Sub
* Factory
* Command Dispatch

These patterns help build:

* scalable systems
* maintainable code
* modular applications
* reusable architectures

```
```