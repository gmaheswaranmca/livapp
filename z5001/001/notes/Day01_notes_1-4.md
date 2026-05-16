# **(Ch:1) 4 Stages of Application Development — Summary**

> “Application development includes planning requirements, designing the system, developing the application, and testing/deploying it.”

1. **Requirement Analysis**

Understand:
* What problem the application solves
* Who will use it
* What features are needed

> Understand client needs, features, and project goals.

2. **Design**

Plan how the application will look and work internally.

> Plan UI, database, architecture, and application flow.

3. **Development**

Actual coding happens here.

> Write code for frontend, backend, APIs, and database operations.

4. **Testing & Deployment**

Check correctness and release the application.

> Test the application, fix bugs, and deploy it for users.

### Analogy
| Application Development | House Construction |
| ------------------ | ----------------------- |
| Requirement        | Decide house needs      |
| Design             | Create blueprint        |
| Development        | Build house             |
| Testing/Deployment | Inspect and hand over   |

---
```
```

# **(Ch:2) 4 Generations of Programming Languages**

Programming languages evolved generation by generation to make computers easier to program, faster to develop software with, and closer to human language.

---

## 1st Generation Language (1GL) — Machine Language

### Definition

Machine language is the lowest-level programming language understood directly by the computer CPU.

It consists only of:

* `0`
* `1`

Example:

```text
10110000 01100001
```

Every instruction is written in binary.

---

### Characteristics

* Written in binary digits
* Directly understood by CPU
* No translator required
* Hardware dependent
* Very difficult for humans

---

### Advantages

* Very fast execution
* Direct hardware control
* No translation overhead

---

### Disadvantages

* Extremely difficult to write
* Hard to debug
* Hard to remember binary codes
* Machine dependent
* Development takes more time

---

### Example Operations

Addition in machine code:

```text
1010 1100 1111
```

Different CPUs have different binary instruction formats.

---

### Uses

* Embedded systems
* Firmware
* Microcontroller programming (very low level)

---

## 2nd Generation Language (2GL) — Assembly Language

### Definition

Assembly language uses mnemonic codes instead of binary numbers.

Example:

```asm
ADD A, B
MOV AX, BX
SUB X, Y
```

These mnemonics are easier for humans to understand.

---

### Translator Used

Assembler converts assembly language into machine language.

---

### Characteristics

* Uses symbolic instructions
* Hardware dependent
* Easier than machine language
* One instruction usually maps to one machine instruction

---

### Advantages

* Easier to understand than binary
* Faster execution
* Efficient memory usage
* Better hardware control

---

### Disadvantages

* Machine dependent
* Complex for large applications
* Requires hardware knowledge

---

### Example Program

```asm
MOV AX, 5
MOV BX, 10
ADD AX, BX
```

Meaning:

* Store 5 in AX
* Store 10 in BX
* Add BX to AX

---

### Uses

* Operating systems
* Device drivers
* Embedded programming
* Performance-critical applications

---

## 3rd Generation Language (3GL) — High-Level Language

### Definition

High-level languages are human-readable languages closer to English.

Examples:

* C
* C++
* Java
* Python
* C#
* Pascal

---

### Example

#### C Program

```c
#include<stdio.h>

int main() {
    int a = 10;
    int b = 20;
    printf("%d", a + b);
    return 0;
}
```

#### Python Program

```python
a = 10
b = 20
print(a + b)
```

---

### Translator Used

* Compiler
* Interpreter

Examples:

* C → Compiler
* Python → Interpreter

---

### Characteristics

* English-like syntax
* Portable
* Easier debugging
* Faster development
* Structured programming support

---

### Advantages

* Easy to learn
* Faster coding
* Reusable code
* Easier maintenance
* Platform independent (many languages)

---

### Disadvantages

* Slower than machine language
* Requires translators
* Less hardware control

---

### Types of 3GL

#### Procedural Languages

Focus on procedures/functions.

Examples:

* C
* Pascal

---

#### Object-Oriented Languages

Focus on objects and classes.

Examples:

* Java
* C++
* C#

---

#### Scripting Languages

Used for automation.

Examples:

* Python
* JavaScript
* PHP

---

## 4th Generation Language (4GL)

### Definition

4GLs are very high-level languages designed to reduce coding effort and improve productivity.

Goal:

> "Tell WHAT to do instead of HOW to do it."

---

### Main Idea

In 3GL:

```python
for i in data:
    if i.salary > 50000:
        print(i.name)
```

In 4GL:

```sql
SELECT name
FROM employee
WHERE salary > 50000;
```

The programmer specifies the requirement, not the internal steps.

---

## Characteristics of 4GL

* Very close to human language
* Less coding required
* Faster application development
* Mostly database-oriented
* High productivity
* Easier report generation

---

## Examples of 4GL

### Database Languages

* SQL

### Report Generators

* Oracle Reports

### Statistical Tools

* MATLAB
* SAS

### RAD (Rapid Application Development) Tools

* Informix-4GL

---

## SQL Example

```sql
SELECT *
FROM Student
WHERE Marks > 80;
```

Very small code performs large operations.

---

## Advantages of 4GL

* Rapid development
* Reduced development time
* Easy maintenance
* Minimal coding
* Suitable for business applications

---

# Disadvantages of 4GL

* Less flexibility
* Slower execution sometimes
* Limited customization
* Not suitable for system programming

---

## Comparison Table

| Feature             | 1GL         | 2GL       | 3GL                  | 4GL                        |
| ------------------- | ----------- | --------- | -------------------- | -------------------------- |
| Language Type       | Machine     | Assembly  | High-Level           | Very High-Level            |
| Human Readability   | Very Low    | Low       | High                 | Very High                  |
| Translator          | Not needed  | Assembler | Compiler/Interpreter | Special tools/interpreters |
| Speed               | Very Fast   | Fast      | Moderate             | Slower                     |
| Ease of Coding      | Very Hard   | Hard      | Easy                 | Very Easy                  |
| Hardware Dependency | Yes         | Yes       | Mostly No            | No                         |
| Development Time    | Very High   | High      | Moderate             | Low                        |
| Examples            | Binary code | ASM       | C, Java, Python      | SQL, MATLAB                |

---

## Simple Evolution Understanding

### 1GL

Human writes in binary:

```text
10101010
```

---

### 2GL

Human writes symbolic instructions:

```asm
ADD A, B
```

---

### 3GL

Human writes English-like code:

```python
print(a + b)
```

---

### 4GL

Human specifies requirement directly:

```sql
SELECT * FROM Employee;
```

---

## Final Quick Revision

| Generation | Main Concept                     |
| ---------- | -------------------------------- |
| 1GL        | Binary instructions              |
| 2GL        | Mnemonic assembly instructions   |
| 3GL        | Human-readable programming       |
| 4GL        | Requirement-oriented programming |
---

```
```

# (Ch:3) **Cross Platform Development — Short Notes**

## Cross Platform Development

Developing software that can run on multiple operating systems like:

* Windows
* Linux
* macOS

using the same codebase.

### Advantages

* Reduced cost
* Easier maintenance
* Faster development

### Challenges

* Different OS behaviors
* Different file systems
* Different execution methods

---

# Associating an Extension with an Application — Windows Way

## Concept

Windows uses:

* file extensions

to decide:

* which application should open a file.

### Examples

```text id="w2n1yo"
.txt  → Notepad
.pdf  → Adobe Reader
.docx → MS Word
```

### Working

* Associations stored in Windows Registry
* Double-click opens associated application

### Important Point

Windows execution is:

* extension-based
* GUI-oriented

---

# Executing a Program on UNIX/Linux

## Concept

Linux/UNIX executes programs using:

* terminal commands
* execute permissions

### Steps

## 1. Compile Program

```bash id="7g8ht8"
gcc hello.c -o hello
```

## 2. Give Execute Permission

```bash id="rlfwy8"
chmod +x hello
```

## 3. Run Program

```bash id="ewvvpm"
./hello
```

---

# Important Linux Concepts

| Concept     | Meaning                            |
| ----------- | ---------------------------------- |
| `chmod +x`  | Gives execute permission           |
| `./program` | Run program from current directory |
| Shell       | Command interpreter                |

---

# Windows vs Linux

| Feature          | Windows        | Linux                       |
| ---------------- | -------------- | --------------------------- |
| Execution        | Double-click   | Terminal                    |
| Extension        | Important      | Usually not needed          |
| Permission       | Less strict    | Execute permission required |
| File Association | Registry based | Permission based            |

---

# Final Quick Points

## Windows

* Extension-oriented
* Registry-based file association
* GUI execution

## Linux/UNIX

* Permission-oriented
* Terminal execution
* Uses `chmod` and `./program`

---

```
```

# **(Ch:4) Introduction to Python — Short Notes**

## Python

Python is a:

* high-level
* interpreted
* easy-to-learn
* general-purpose programming language.

Created by:
Guido van Rossum

---

# Purely Object Oriented

Python supports:

* classes
* objects
* inheritance
* polymorphism

Almost everything in Python is treated as an object.

Example:

```python id="wqk4rj"
x = 10
print(type(x))
```

Output:

```text id="mjlwm1"
<class 'int'>
```

Here, even integer is an object.

---

# No Limits Programming Language

Python is called a “no limits” language because it can be used in many areas:

* Web Development
* Data Science
* Artificial Intelligence
* Machine Learning
* Automation
* Game Development
* Cyber Security
* Desktop Applications

---

# Features of Python

* Simple syntax
* Easy readability
* Platform independent
* Large library support
* Faster development
* Open source

---

# Example Python Program

```python id="0r0e76"
print("Hello World")
```

---

# Advantages

* Beginner friendly
* Less coding
* Easy debugging
* Huge community support

---

# Final Summary

## Python is:

* Easy
* Powerful
* Object-oriented
* Cross-platform
* Versatile (“No limits”)

```
```

