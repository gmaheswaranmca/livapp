# 91: Pythonic Design Patterns — Builder, Prototype, Prototype, Bridge, Composite, Decorator

Python supports both **classical GoF (Gang of Four) design patterns** and **Pythonic approaches** that use dynamic typing, first-class functions, decorators, duck typing, and composition.

---

## 1. Builder Pattern

### Purpose

The **Builder Pattern** is used to construct **complex objects step-by-step**.

Instead of creating an object with a huge constructor:

```python
Pizza(size, cheese, olives, mushrooms, onion, paneer, corn)
```

we build it gradually.

---

## When to Use

Use Builder when:

* Object creation has many optional fields
* Constructor becomes too large
* You want readable object creation
* You need multiple representations of the same object

---

## Real-Life Examples

* Building HTML pages
* Creating SQL queries
* Creating API request payloads
* Building configuration objects
* Constructing meals/pizzas/computers

---

## Classical Structure

* Product
* Builder
* Concrete Builder
* Director (optional)

---

## Pythonic Builder Example

```python
class Computer:
    def __init__(self):
        self.cpu = None
        self.ram = None
        self.storage = None

    def specifications(self):
        print("CPU:", self.cpu)
        print("RAM:", self.ram)
        print("Storage:", self.storage)


class ComputerBuilder:
    def __init__(self):
        self.computer = Computer()

    def set_cpu(self, cpu):
        self.computer.cpu = cpu
        return self

    def set_ram(self, ram):
        self.computer.ram = ram
        return self

    def set_storage(self, storage):
        self.computer.storage = storage
        return self

    def build(self):
        return self.computer


computer = (
    ComputerBuilder()
    .set_cpu("Intel i7")
    .set_ram("16GB")
    .set_storage("1TB SSD")
    .build()
)

computer.specifications()
```

---

## Output

```python
CPU: Intel i7
RAM: 16GB
Storage: 1TB SSD
```

---

## Why Pythonic?

Python supports:

* Method chaining
* Optional arguments
* Named parameters

making Builder elegant.

---

## Advantages

* Readable object construction
* Avoids telescoping constructors
* Flexible configuration
* Better maintainability

---

## Disadvantages

* More classes
* Overkill for simple objects

---

## 2. Prototype Pattern

### Purpose

The **Prototype Pattern** creates new objects by **copying existing objects**.

Instead of creating from scratch:

```python
new_object = copy(existing_object)
```

---

## When to Use

Use Prototype when:

* Object creation is expensive
* Objects contain many configurations
* You need cloning
* Database/object loading is costly

---

## Real-Life Examples

* Copying document templates
* Game character cloning
* Deep-learning model duplication
* Configuration duplication

---

## Shallow Copy vs Deep Copy

| Type         | Meaning                   |
| ------------ | ------------------------- |
| Shallow Copy | Copies references         |
| Deep Copy    | Copies nested objects too |

---

## Pythonic Prototype Example

```python
import copy


class Student:
    def __init__(self, name, subjects):
        self.name = name
        self.subjects = subjects

    def show(self):
        print(self.name, self.subjects)


student1 = Student("Mahesh", ["Python", "SQL"])

student2 = copy.deepcopy(student1)

student2.name = "Ravi"
student2.subjects.append("React")

student1.show()
student2.show()
```

---

## Output

```python
Mahesh ['Python', 'SQL']
Ravi ['Python', 'SQL', 'React']
```

---

## Why Deep Copy?

Without deep copy:

```python
student1.subjects
```

would also change.

---

## Advantages

* Faster object creation
* Reduces repetitive initialization
* Easy duplication

---

## Disadvantages

* Deep copy can be expensive
* Complex nested objects harder to clone

---

## 3. Adapter Pattern

### Purpose

The **Adapter Pattern** converts one interface into another interface expected by the client.

It acts like a **translator**.

---

## Real-Life Examples

* Mobile charger adapters
* Payment gateway integration
* Legacy system integration
* Third-party API wrapping

---

## When to Use

Use Adapter when:

* Existing class has incompatible interface
* Reusing legacy code
* Integrating external libraries

---

## Structure

* Target Interface
* Adaptee
* Adapter

---

## Pythonic Adapter Example

```python
class OldPrinter:
    def old_print(self, text):
        print("Old Printer:", text)


class PrinterAdapter:
    def __init__(self, old_printer):
        self.old_printer = old_printer

    def print(self, text):
        self.old_printer.old_print(text)


printer = OldPrinter()

adapter = PrinterAdapter(printer)

adapter.print("Hello")
```

---

## Output

```python
Old Printer: Hello
```

---

## Why Important in Python?

Python often integrates:

* Old modules
* Third-party packages
* Different APIs

Adapter helps standardize them.

---

## Duck Typing Advantage

Python can create adapters dynamically.

---

## Advantages

* Reuse old code
* Loose coupling
* Better integration

---

## Disadvantages

* Extra abstraction layer

---

## 4. Bridge Pattern

### Purpose

The **Bridge Pattern** separates:

* Abstraction
  from
* Implementation

so both can change independently.

---

## Problem Without Bridge

Suppose:

```text
Shape -> Circle, Square
Color -> Red, Blue
```

Without Bridge:

```text
RedCircle
BlueCircle
RedSquare
BlueSquare
```

Classes explode combinatorially.

---

## Solution

Separate Shape and Color.

---

## Real-Life Examples

* GUI frameworks
* Remote-control devices
* Database drivers
* Notification systems

---

## Pythonic Bridge Example

```python
class Color:
    def apply_color(self):
        pass


class Red(Color):
    def apply_color(self):
        return "Red"


class Blue(Color):
    def apply_color(self):
        return "Blue"


class Shape:
    def __init__(self, color):
        self.color = color


class Circle(Shape):
    def draw(self):
        print(f"Drawing {self.color.apply_color()} Circle")


class Square(Shape):
    def draw(self):
        print(f"Drawing {self.color.apply_color()} Square")


circle = Circle(Red())
square = Square(Blue())

circle.draw()
square.draw()
```

---

## Output

```python
Drawing Red Circle
Drawing Blue Square
```

---

## Advantages

* Reduces class explosion
* Independent extensibility
* Better composition

---

## Disadvantages

* More abstraction

---

## 5. Composite Pattern

### Purpose

The **Composite Pattern** lets you treat:

* Individual objects
  and
* Groups of objects

uniformly.

---

## Real-Life Examples

* File system
* GUI components
* Organization hierarchy
* HTML DOM tree

---

## Tree Structure

```text
Folder
 ├── File
 ├── File
 └── Folder
      └── File
```

---

## Components

* Leaf
* Composite
* Common Interface

---

## Pythonic Composite Example

```python
class Employee:
    def show_details(self):
        pass


class Developer(Employee):
    def __init__(self, name):
        self.name = name

    def show_details(self):
        print("Developer:", self.name)


class Manager(Employee):
    def __init__(self, name):
        self.name = name
        self.employees = []

    def add(self, employee):
        self.employees.append(employee)

    def show_details(self):
        print("Manager:", self.name)

        for emp in self.employees:
            emp.show_details()


dev1 = Developer("Mahesh")
dev2 = Developer("Ravi")

manager = Manager("Suresh")

manager.add(dev1)
manager.add(dev2)

manager.show_details()
```

---

## Output

```python
Manager: Suresh
Developer: Mahesh
Developer: Ravi
```

---

## Advantages

* Recursive tree structures
* Uniform object handling
* Easy hierarchy representation

---

## Disadvantages

* Can make design overly generic

---

## 6. Decorator Pattern

### Purpose

The **Decorator Pattern** dynamically adds behavior to objects.

Python decorators are heavily inspired by this pattern.

---

## Real-Life Examples

* Logging
* Authentication
* Timing functions
* Caching
* Validation

---

## Classical Decorator

Wrap an object with another object.

---

## Pythonic Decorator Example

```python
def logger(func):
    def wrapper():
        print("Function started")
        func()
        print("Function ended")

    return wrapper


@logger
def display():
    print("Welcome")


display()
```

---

## Output

```python
Function started
Welcome
Function ended
```

---

## What Happens Internally?

```python
display = logger(display)
```

---

## Decorator with Arguments

```python
def repeat(times):
    def decorator(func):
        def wrapper():
            for _ in range(times):
                func()
        return wrapper
    return decorator


@repeat(3)
def hello():
    print("Hello")


hello()
```

---

## Output

```python
Hello
Hello
Hello
```

---

## Class-Based Decorator

```python
class CallCounter:
    def __init__(self, func):
        self.func = func
        self.count = 0

    def __call__(self):
        self.count += 1
        print("Called", self.count, "times")
        self.func()


@CallCounter
def greet():
    print("Hi")


greet()
greet()
```

---

## Output

```python
Called 1 times
Hi
Called 2 times
Hi
```

---

## Advantages

* Dynamic behavior addition
* Reusable functionality
* Cleaner code
* Aspect-Oriented Programming support

---

## Disadvantages

* Debugging can become harder
* Too many decorators reduce readability

---

## Comparison Summary

| Pattern   | Main Purpose                             |
| --------- | ---------------------------------------- |
| Builder   | Step-by-step object creation             |
| Prototype | Clone existing objects                   |
| Adapter   | Convert incompatible interfaces          |
| Bridge    | Separate abstraction from implementation |
| Composite | Tree-like object hierarchy               |
| Decorator | Add behavior dynamically                 |

---

## Pythonic Philosophy Behind These Patterns

Python often simplifies traditional patterns using:

* Duck typing
* First-class functions
* Closures
* Dynamic attributes
* Mixins
* Composition
* Decorators
* Dataclasses

---

## Important Interview Questions

### Builder

* Difference between Builder and Factory?
* Why method chaining?

---

### Prototype

* Shallow vs deep copy?
* When cloning is useful?

---

### Adapter

* Adapter vs Facade?
* Real-world API integration examples?

---

### Bridge

* Why avoid class explosion?
* Composition vs inheritance?

---

### Composite

* Tree structures?
* Recursive processing?

---

### Decorator

* Difference between Python decorators and GoF decorators?
* Why use functools.wraps?

---

## Best Practices

* Prefer composition over inheritance
* Use dataclasses where possible
* Avoid overengineering
* Use patterns only when necessary
* Keep code Pythonic and readable


```
```

## Prototype Pattern (GoF) Implementation in Python

The Design Patterns GoF Prototype Pattern says:

> “Create new objects by copying an existing object (prototype) instead of creating them from scratch.”

---

## Why Prototype Pattern?

Sometimes object creation is:

* Expensive
* Time-consuming
* Complex
* Requires database/network loading

Instead of rebuilding:

```python
obj = ComplexObject()
```

we clone:

```python
new_obj = prototype.clone()
```

---

## GoF Structure

```text
Client
   ↓
Prototype (interface)
   ↓
ConcretePrototype
```

---

## Python Implementation — GoF Style

---

## Step 1: Prototype Interface

```python
from abc import ABC, abstractmethod
import copy


class Prototype(ABC):

    @abstractmethod
    def clone(self):
        pass
```

---

## Step 2: Concrete Prototype

```python
class Employee(Prototype):

    def __init__(self, emp_id, name, skills):
        self.emp_id = emp_id
        self.name = name
        self.skills = skills

    def clone(self):
        return copy.deepcopy(self)

    def show(self):
        print(
            self.emp_id,
            self.name,
            self.skills
        )
```

---

## Step 3: Client Code

```python
employee1 = Employee(
    101,
    "Mahesh",
    ["Python", "SQL"]
)

employee2 = employee1.clone()

employee2.emp_id = 102
employee2.name = "Ravi"

employee2.skills.append("React")

employee1.show()
employee2.show()
```

---

## Output

```python
101 Mahesh ['Python', 'SQL']
102 Ravi ['Python', 'SQL', 'React']
```

---

## How It Works

```text
employee1
   ↓ clone()
deepcopy()
   ↓
employee2
```

Both become independent objects.

---

## Why deepcopy?

If shallow copy is used:

```python
copy.copy(self)
```

then nested mutable objects are shared.

Example:

```python
skills = []
```

would be shared between copies.

---

## Prototype Registry Example (Advanced GoF)

Sometimes prototypes are stored in a registry.

---

### Prototype Manager

```python
class PrototypeManager:

    def __init__(self):
        self._prototypes = {}

    def add(self, key, prototype):
        self._prototypes[key] = prototype

    def get(self, key):
        prototype = self._prototypes.get(key)

        if prototype:
            return prototype.clone()

        return None
```

---

### Using Registry

```python
manager = PrototypeManager()

emp = Employee(
    1,
    "Admin",
    ["Management"]
)

manager.add("admin_employee", emp)

new_emp = manager.get("admin_employee")

new_emp.show()
```

---

## Real-World Uses

| Use Case         | Example                 |
| ---------------- | ----------------------- |
| Game Development | Clone enemies           |
| GUI Applications | Duplicate UI components |
| Document Editors | Copy templates          |
| ML Systems       | Clone configurations    |
| ORM Models       | Copy object states      |

---

## Advantages

* Faster creation
* Reduces repeated initialization
* Avoids subclass explosion
* Runtime cloning possible

---

## Disadvantages

* Deep copying complex objects is difficult
* Circular references can be tricky

---

## Prototype vs Factory

| Prototype                    | Factory                        |
| ---------------------------- | ------------------------------ |
| Clones existing object       | Creates new object             |
| Runtime duplication          | Constructor-based              |
| Useful for expensive objects | Useful for controlled creation |

---

---

## Composite Pattern (GoF) Implementation in Python

The GoF Composite Pattern says:

> “Compose objects into tree structures to represent part-whole hierarchies.”

It lets clients treat:

* Single objects
* Groups of objects

uniformly.

---

## Real-Life Examples

* File systems
* HTML DOM
* Company hierarchy
* Menu systems
* GUI components

---

## Structure

```text
Component
   ↑
 ┌───────┐
Leaf   Composite
```

---

## Goal

Treat both:

```text
File
Folder
```

the same way.

---

## GoF Components

| Component | Responsibility    |
| --------- | ----------------- |
| Component | Common interface  |
| Leaf      | Individual object |
| Composite | Container object  |
| Client    | Uses hierarchy    |

---

## Python GoF Implementation

---

## Step 1: Component Interface

```python
from abc import ABC, abstractmethod


class Employee(ABC):

    @abstractmethod
    def show_details(self):
        pass
```

---

## Step 2: Leaf Class

```python
class Developer(Employee):

    def __init__(self, name, role):
        self.name = name
        self.role = role

    def show_details(self):
        print(
            "Developer:",
            self.name,
            "-",
            self.role
        )
```

---

## Step 3: Composite Class

```python
class Manager(Employee):

    def __init__(self, name):
        self.name = name
        self.subordinates = []

    def add(self, employee):
        self.subordinates.append(employee)

    def remove(self, employee):
        self.subordinates.remove(employee)

    def show_details(self):

        print("\nManager:", self.name)

        for emp in self.subordinates:
            emp.show_details()
```

---

## Step 4: Client Code

```python
dev1 = Developer(
    "Mahesh",
    "Backend Developer"
)

dev2 = Developer(
    "Ravi",
    "Frontend Developer"
)

manager1 = Manager("Suresh")

manager1.add(dev1)
manager1.add(dev2)

manager1.show_details()
```

---

## Output

```python
Manager: Suresh
Developer: Mahesh - Backend Developer
Developer: Ravi - Frontend Developer
```

---

## Tree Structure

```text
Manager
 ├── Developer
 └── Developer
```

---

## Nested Composite Example

Composite can contain another composite.

---

### Example

```python
general_manager = Manager("CEO")

team_manager = Manager("Team Lead")

team_manager.add(
    Developer("A", "Python")
)

team_manager.add(
    Developer("B", "React")
)

general_manager.add(team_manager)

general_manager.show_details()
```

---

## Output

```python
Manager: CEO

Manager: Team Lead
Developer: A - Python
Developer: B - React
```

---

## Recursive Nature

Composite works recursively:

```text
Composite
    contains
        Composite
            contains
                Leaf
```

---

## Real-World File System Example

```text
Folder
 ├── File
 ├── File
 └── Folder
      ├── File
      └── File
```

Both File and Folder expose same interface:

```python
show()
```

---

## Advantages

* Simplifies tree structures
* Uniform object handling
* Recursive processing easy
* Extensible hierarchy

---

## Disadvantages

* Can become overly generic
* Hard to restrict child types

---

## Composite vs Decorator

| Composite               | Decorator            |
| ----------------------- | -------------------- |
| Tree hierarchy          | Adds behavior        |
| Part-whole relationship | Wrapper relationship |
| Recursive containers    | Dynamic extension    |

---

## Important Pythonic Notes

Python makes Composite easier because of:

* Duck typing
* Dynamic lists
* Iteration protocol
* Recursive structures

Sometimes explicit abstract base classes are unnecessary.

---

## Pythonic Composite (Duck Typing Version)

```python
class File:
    def show(self):
        print("File")


class Folder:
    def __init__(self):
        self.items = []

    def add(self, item):
        self.items.append(item)

    def show(self):

        print("Folder")

        for item in self.items:
            item.show()
```

No inheritance needed.

This is very Pythonic.

```
```

## Decorator Pattern (GoF) Implementation in Python

The Design Patterns GoF Decorator Pattern says:

> “Attach additional responsibilities to an object dynamically.”

Decorator provides a flexible alternative to subclassing for extending functionality.

---

## Main Idea

Instead of modifying an object directly:

```text id="jlwm1n"
Object → Add Features Dynamically
```

we wrap it inside another object.

---

## Real-Life Examples

| Example     | Decorator              |
| ----------- | ---------------------- |
| Coffee shop | Add milk, sugar, cream |
| GUI         | Add border, scrollbars |
| Logging     | Add logging behavior   |
| Compression | Add compression layer  |
| Encryption  | Add encryption layer   |

---

## Why Not Inheritance?

Suppose:

```text id="0cpx2z"
Coffee
CoffeeWithMilk
CoffeeWithSugar
CoffeeWithMilkAndSugar
CoffeeWithCream
```

Classes explode combinatorially.

Decorator solves this dynamically.

---

## GoF Structure

```text id="9tghgs"
Component
   ↑
ConcreteComponent
   ↑
Decorator
   ↑
ConcreteDecorator
```

---

## Key Concept

Decorator:

* Implements same interface as wrapped object
* Contains wrapped object
* Adds new behavior before/after delegation

---

## GoF Decorator Example in Python

---

## Step 1: Component Interface

```python id="61ll0h"
from abc import ABC, abstractmethod


class Coffee(ABC):

    @abstractmethod
    def cost(self):
        pass

    @abstractmethod
    def description(self):
        pass
```

---

## Step 2: Concrete Component

```python id="rn5xw6"
class SimpleCoffee(Coffee):

    def cost(self):
        return 50

    def description(self):
        return "Simple Coffee"
```

---

## Step 3: Base Decorator

This is the core GoF idea.

Decorator wraps another component.

```python id="1pww45"
class CoffeeDecorator(Coffee):

    def __init__(self, coffee):
        self._coffee = coffee

    def cost(self):
        return self._coffee.cost()

    def description(self):
        return self._coffee.description()
```

---

## Step 4: Concrete Decorators

---

### Milk Decorator

```python id="ml2c2y"
class MilkDecorator(CoffeeDecorator):

    def cost(self):
        return self._coffee.cost() + 20

    def description(self):
        return self._coffee.description() + ", Milk"
```

---

### Sugar Decorator

```python id="2cfe7v"
class SugarDecorator(CoffeeDecorator):

    def cost(self):
        return self._coffee.cost() + 10

    def description(self):
        return self._coffee.description() + ", Sugar"
```

---

## Step 5: Client Code

```python id="84n53t"
coffee = SimpleCoffee()

print(
    coffee.description(),
    coffee.cost()
)

coffee = MilkDecorator(coffee)

print(
    coffee.description(),
    coffee.cost()
)

coffee = SugarDecorator(coffee)

print(
    coffee.description(),
    coffee.cost()
)
```

---

## Output

```python id="4q20ql"
Simple Coffee 50
Simple Coffee, Milk 70
Simple Coffee, Milk, Sugar 80
```

---

## Object Wrapping Visualization

```text id="8mzyq7"
SugarDecorator
      ↓
MilkDecorator
      ↓
SimpleCoffee
```

Each layer adds behavior.

---

## Important GoF Characteristics

| Feature               | Description                      |
| --------------------- | -------------------------------- |
| Same Interface        | Decorator behaves like component |
| Composition           | Wrapper contains object          |
| Dynamic               | Features added at runtime        |
| Open/Closed Principle | Extend without modifying         |

---

## Real GoF Workflow

```text id="s8wq4h"
Client
  ↓
Decorator
  ↓
Wrapped Object
```

Decorator forwards calls after adding behavior.

---

## Another Example — Text Formatting

---

## Base Component

```python id="wp6vhh"
class Text:

    def render(self):
        return "Hello"
```

---

## Decorator Base

```python id="3mknx8"
class TextDecorator(Text):

    def __init__(self, text):
        self.text = text

    def render(self):
        return self.text.render()
```

---

## Bold Decorator

```python id="1o67fk"
class BoldDecorator(TextDecorator):

    def render(self):
        return "<b>" + self.text.render() + "</b>"
```

---

## Italic Decorator

```python id="af29i5"
class ItalicDecorator(TextDecorator):

    def render(self):
        return "<i>" + self.text.render() + "</i>"
```

---

## Client

```python id="ww3zja"
text = Text()

text = BoldDecorator(text)
text = ItalicDecorator(text)

print(text.render())
```

---

## Output

```html id="p3n6yl"
<i><b>Hello</b></i>
```

---

## Decorator vs Inheritance

| Inheritance            | Decorator            |
| ---------------------- | -------------------- |
| Static behavior        | Dynamic behavior     |
| Compile-time extension | Runtime extension    |
| Class explosion        | Flexible composition |
| Tight coupling         | Loose coupling       |

---

## Decorator vs Python @decorator Syntax

Python function decorators are inspired by GoF decorator pattern.

---

## GoF Decorator

```python id="53s6rc"
object = Decorator(object)
```

---

## Python Function Decorator

```python id="e4qbyz"
@logger
def hello():
    pass
```

Internally:

```python id="9r2pcl"
hello = logger(hello)
```

Same wrapping concept.

---

## GoF Decorator with Logging Example

```python id="bkrghl"
class DataSource:

    def write(self, data):
        print("Writing:", data)


class LoggingDecorator:

    def __init__(self, source):
        self.source = source

    def write(self, data):

        print("LOG: operation started")

        self.source.write(data)

        print("LOG: operation finished")
```

---

## Usage

```python id="kt8c9o"
source = DataSource()

source = LoggingDecorator(source)

source.write("Hello")
```

---

## Output

```python id="sy07y9"
LOG: operation started
Writing: Hello
LOG: operation finished
```

---

## Advantages

| Advantage                 | Explanation                 |
| ------------------------- | --------------------------- |
| Flexible                  | Runtime feature addition    |
| Reusable                  | Independent decorators      |
| Open/Closed               | Extend without modification |
| Avoids subclass explosion | Dynamic combinations        |

---

## Disadvantages

| Disadvantage       | Explanation              |
| ------------------ | ------------------------ |
| Many small objects | More wrapper classes     |
| Debugging harder   | Multiple wrapping layers |
| Complex nesting    | Deep decorator chains    |

---

## Common Real-World Uses

| Domain          | Use                              |
| --------------- | -------------------------------- |
| Web frameworks  | Authentication decorators        |
| APIs            | Rate limiting                    |
| Databases       | Transaction wrappers             |
| Logging systems | Logging decorators               |
| Compression     | Compression/encryption pipelines |

---

## Decorator Pattern in Frameworks

Examples:

* Flask route decorators
* Django middleware
* Python logging wrappers
* Caching systems

Example:

```python id="1e98bx"
@app.route("/")
```

is essentially decorator behavior.

---

## Pythonic Simplification

Python often simplifies GoF decorators using:

* Functions
* Closures
* First-class functions
* @ syntax

But internally the concept remains:

```text id="ptzqpr"
Wrap object/function
Add behavior
Delegate original work
```

---

## Interview Questions

### Why use Decorator instead of inheritance?

Because inheritance causes:

* Rigid hierarchy
* Class explosion
* Tight coupling

Decorator provides runtime flexibility.

---

### Is Python @decorator same as GoF decorator?

Conceptually yes.

Implementation differs:

* GoF → object wrapping
* Python → function/class wrapping

---

### Core Principle?

```text id="yv8lq6"
Composition over inheritance
```

---

## Summary

| Concept            | Meaning               |
| ------------------ | --------------------- |
| Component          | Common interface      |
| Concrete Component | Original object       |
| Decorator          | Wrapper base          |
| Concrete Decorator | Adds behavior         |
| Key Benefit        | Runtime extensibility |

```
```

# 92: Pythonic Design Patterns — Facade, Flyweight, Proxy, Chain of Responsibility, Command, Iterator - Both GoF way and Pythonic Way

## Pythonic Design Patterns — GoF Way and Pythonic Way

This covers both:

* Classical Design Patterns GoF implementations
* Pythonic implementations using:

  * Duck typing
  * Closures
  * Iterators
  * Generators
  * First-class functions
  * Context managers
  * Dynamic dispatch

---

## 1. Facade Pattern

---

## Purpose

Facade provides a:

```text
Simple unified interface
```

to a complex subsystem.

Instead of interacting with many classes:

```text
Client → Facade → Subsystems
```

---

## Real-Life Examples

| Example             | Facade                             |
| ------------------- | ---------------------------------- |
| Home theater remote | Controls many devices              |
| Banking app         | Hides backend complexity           |
| ORM                 | Simplifies SQL/database operations |
| Compiler            | Single compile() method            |

---

## GoF Way

---

## Complex Subsystems

```python
class CPU:

    def start(self):
        print("CPU started")


class Memory:

    def load(self):
        print("Memory loaded")


class HardDrive:

    def read(self):
        print("Hard drive read")
```

---

## Facade

```python
class ComputerFacade:

    def __init__(self):
        self.cpu = CPU()
        self.memory = Memory()
        self.hard_drive = HardDrive()

    def start_computer(self):

        self.cpu.start()
        self.memory.load()
        self.hard_drive.read()

        print("Computer started")
```

---

## Client

```python
computer = ComputerFacade()

computer.start_computer()
```

---

## Output

```python
CPU started
Memory loaded
Hard drive read
Computer started
```

---

## Pythonic Way

Python often uses:

* Modules
* Wrapper functions
* Utility APIs

instead of explicit facade classes.

---

## Pythonic Example

```python
def start_computer():

    print("CPU started")
    print("Memory loaded")
    print("Hard drive read")
    print("Computer started")


start_computer()
```

---

## Where Python Uses Facade

| Library  | Facade                     |
| -------- | -------------------------- |
| pathlib  | Simplifies filesystem      |
| requests | Simplifies HTTP            |
| pandas   | Simplifies data processing |

Example:

```python
import requests

response = requests.get("https://example.com")
```

`requests` is a facade over complex HTTP handling.

---

## Advantages

* Simplifies API
* Reduces coupling
* Easier subsystem usage

---

## Disadvantages

* Facade can become god-object

---

---

## 2. Flyweight Pattern

---

## Purpose

Flyweight minimizes memory usage by sharing common state.

---

## Idea

Instead of:

```text
1000 identical objects
```

reuse shared objects.

---

## Real-Life Examples

| Example                 | Shared State    |
| ----------------------- | --------------- |
| Text editor characters  | Font objects    |
| Game trees              | Shared textures |
| Python string interning | Shared strings  |

---

## GoF Way

---

## Flyweight Class

```python
class Character:

    def __init__(self, symbol):
        self.symbol = symbol

    def display(self, position):
        print(
            self.symbol,
            "at",
            position
        )
```

---

## Flyweight Factory

```python
class CharacterFactory:

    _characters = {}

    @classmethod
    def get_character(cls, symbol):

        if symbol not in cls._characters:
            cls._characters[symbol] = Character(symbol)

        return cls._characters[symbol]
```

---

## Client

```python
a1 = CharacterFactory.get_character("A")
a2 = CharacterFactory.get_character("A")

print(a1 is a2)
```

---

## Output

```python
True
```

Same object reused.

---

## Pythonic Way

Python already supports flyweight behavior internally.

Examples:

* Small integer caching
* String interning
* Tuple reuse

---

## Pythonic Example Using functools.cache

```python
from functools import cache


@cache
def get_config(name):

    print("Creating object")

    return {"name": name}


a = get_config("db")
b = get_config("db")

print(a is b)
```

---

## Output

```python
Creating object
True
```

---

## Advantages

* Memory optimization
* Faster object reuse

---

## Disadvantages

* More complexity
* Shared mutable state risk

---

---

## 3. Proxy Pattern

---

## Purpose

Proxy controls access to another object.

---

## Types

| Proxy Type       | Purpose        |
| ---------------- | -------------- |
| Virtual Proxy    | Lazy loading   |
| Protection Proxy | Access control |
| Remote Proxy     | Remote access  |
| Smart Proxy      | Extra behavior |

---

## Real-Life Examples

| Example            | Proxy          |
| ------------------ | -------------- |
| ATM                | Proxy to bank  |
| API gateway        | Access control |
| Lazy image loading | Virtual proxy  |

---

## GoF Way

---

## Real Subject

```python
class Database:

    def connect(self):
        print("Connected to database")
```

---

## Proxy

```python
class DatabaseProxy:

    def __init__(self):
        self.database = None

    def connect(self):

        if self.database is None:
            self.database = Database()

        print("Checking access")

        self.database.connect()
```

---

## Client

```python
proxy = DatabaseProxy()

proxy.connect()
```

---

## Output

```python
Checking access
Connected to database
```

---

## Pythonic Way

Python often uses:

* Properties
* Descriptors
* Decorators
* Lazy loading

---

## Pythonic Lazy Proxy

```python
class LazyData:

    def __init__(self):
        self._data = None

    @property
    def data(self):

        if self._data is None:
            print("Loading data")
            self._data = [1, 2, 3]

        return self._data
```

---

## Usage

```python
obj = LazyData()

print(obj.data)
```

---

## Output

```python
Loading data
[1, 2, 3]
```

---

## Advantages

* Lazy loading
* Security
* Logging
* Access control

---

## Disadvantages

* Extra indirection

---

---

## 4. Chain of Responsibility Pattern

---

## Purpose

Pass request along a chain until someone handles it.

---

## Structure

```text
Handler1 → Handler2 → Handler3
```

---

## Real-Life Examples

| Example                     | Chain             |
| --------------------------- | ----------------- |
| Customer support escalation | Level 1 → Level 2 |
| Middleware                  | Request pipelines |
| Event bubbling              | GUI systems       |

---

## GoF Way

---

## Handler Base

```python
from abc import ABC, abstractmethod


class Handler(ABC):

    def __init__(self):
        self.next_handler = None

    def set_next(self, handler):
        self.next_handler = handler
        return handler

    @abstractmethod
    def handle(self, request):
        pass
```

---

## Concrete Handlers

```python
class LowLevelHandler(Handler):

    def handle(self, request):

        if request <= 10:
            print("Low level handled")

        elif self.next_handler:
            self.next_handler.handle(request)


class HighLevelHandler(Handler):

    def handle(self, request):

        if request > 10:
            print("High level handled")
```

---

## Client

```python
low = LowLevelHandler()
high = HighLevelHandler()

low.set_next(high)

low.handle(5)
low.handle(50)
```

---

## Output

```python
Low level handled
High level handled
```

---

## Pythonic Way

Python often uses:

* Middleware pipelines
* Generators
* Function chains

---

## Pythonic Example

```python
def auth(data):

    print("Authentication")
    return data


def logging(data):

    print("Logging")
    return data


def process(data):

    data = auth(data)
    data = logging(data)

    print("Processing")
```

---

## Advantages

* Loose coupling
* Flexible chains

---

## Disadvantages

* Hard debugging
* Unhandled requests possible

---

---

## 5. Command Pattern

---

## Purpose

Encapsulate requests as objects.

---

## Enables

* Undo/redo
* Queues
* Scheduling
* Transactions

---

## Real-Life Examples

| Example        | Command              |
| -------------- | -------------------- |
| Remote buttons | Command objects      |
| Menu actions   | Encapsulated actions |
| Task queues    | Delayed execution    |

---

## GoF Way

---

## Receiver

```python
class Light:

    def on(self):
        print("Light ON")

    def off(self):
        print("Light OFF")
```

---

## Command Interface

```python
from abc import ABC, abstractmethod


class Command(ABC):

    @abstractmethod
    def execute(self):
        pass
```

---

## Concrete Commands

```python
class LightOnCommand(Command):

    def __init__(self, light):
        self.light = light

    def execute(self):
        self.light.on()


class LightOffCommand(Command):

    def __init__(self, light):
        self.light = light

    def execute(self):
        self.light.off()
```

---

## Invoker

```python
class Remote:

    def submit(self, command):
        command.execute()
```

---

## Client

```python
light = Light()

on_command = LightOnCommand(light)

remote = Remote()

remote.submit(on_command)
```

---

## Output

```python
Light ON
```

---

## Pythonic Way

Python functions are first-class objects.

Commands become:

```python
function references
```

---

## Pythonic Example

```python
class Light:

    def on(self):
        print("ON")


light = Light()

command = light.on

command()
```

---

## Advantages

* Undo support
* Queue support
* Decoupling

---

## Disadvantages

* Many command classes

---

---

## 6. Iterator Pattern

---

## Purpose

Access collection elements sequentially without exposing structure.

---

## Python Already Uses Iterator Pattern Everywhere

Examples:

```python
for item in data:
```

---

## GoF Iterator Structure

| Component | Responsibility |
| --------- | -------------- |
| Iterator  | Traversal      |
| Aggregate | Collection     |

---

## GoF Way

---

## Iterator

```python
class NumberIterator:

    def __init__(self, numbers):
        self.numbers = numbers
        self.index = 0

    def __next__(self):

        if self.index >= len(self.numbers):
            raise StopIteration

        value = self.numbers[self.index]

        self.index += 1

        return value
```

---

## Iterable Collection

```python
class Numbers:

    def __init__(self):
        self.data = [10, 20, 30]

    def __iter__(self):
        return NumberIterator(self.data)
```

---

## Client

```python
nums = Numbers()

iterator = iter(nums)

print(next(iterator))
print(next(iterator))
```

---

## Output

```python
10
20
```

---

## Pythonic Way — Generator

Generators replace explicit iterator classes.

---

## Pythonic Generator Example

```python
class Numbers:

    def __iter__(self):

        yield 10
        yield 20
        yield 30
```

---

## Usage

```python
nums = Numbers()

for num in nums:
    print(num)
```

---

## Output

```python
10
20
30
```

---

## Why Generators Are Pythonic

Generators automatically handle:

* State
* StopIteration
* Lazy evaluation

without explicit iterator objects.

---

## Advantages

* Lazy evaluation
* Memory efficient
* Clean traversal

---

## Disadvantages

* One-time iteration for generators

---

## Summary Table

| Pattern                 | Purpose              | Pythonic Simplification   |
| ----------------------- | -------------------- | ------------------------- |
| Facade                  | Simplify subsystem   | Wrapper functions/modules |
| Flyweight               | Share objects        | Caching/memoization       |
| Proxy                   | Control access       | Properties/descriptors    |
| Chain of Responsibility | Request pipeline     | Middleware/functions      |
| Command                 | Encapsulate action   | Function references       |
| Iterator                | Sequential traversal | Generators/yield          |

---

## Important Pythonic Philosophy

Traditional GoF patterns were designed for languages lacking:

* Dynamic typing
* First-class functions
* Closures
* Iterators
* Duck typing

Python already supports many patterns natively.

Thus Pythonic code often:

* Uses fewer classes
* Uses functions instead
* Uses generators
* Uses decorators
* Prefers composition

---

## Important Interview Questions

### Facade

* Facade vs Adapter?
* Why simplify APIs?

---

### Flyweight

* Intrinsic vs extrinsic state?
* Memory optimization examples?

---

### Proxy

* Proxy vs Decorator?
* Lazy loading example?

---

### Chain of Responsibility

* Middleware examples?
* Event propagation?

---

### Command

* Why useful for undo/redo?
* Function references vs command classes?

---

### Iterator

* Difference between iterable and iterator?
* Why generators are memory efficient?

