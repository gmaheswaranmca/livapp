# Byte-Compiled .pyc Files

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

```
```

