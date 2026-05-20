import pdb

def square(x):
    return x * x

def calculate(n):
    result = square(n)
    return result

pdb.set_trace()

print(calculate(5))