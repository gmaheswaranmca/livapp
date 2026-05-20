"""
calc.py

A simple calculator utility module.

This module provides basic arithmetic operations such as:
- addition
- subtraction

Functions:
    find_sum(num1, num2)
        Returns the sum of two numbers.

    find_diff(num1, num2)
        Returns the difference between two numbers.
"""



def find_sum(num1, num2):
    """
    Returns the sum of two numbers.

    Parameters:
        num1 : int or float
            The first number.
        num2 : int or float
            The second number.

    Returns:
        int or float
            The sum of num1 and num2.

    Example:
        >>> find_sum(10, 20)
        30
        >>> find_sum(10, 2)
        14
    """

    result = num1 + num2
    return result



def find_diff(num1, num2):
    """
    Returns the difference between two numbers.

    Parameters:
        num1 : int or float
            The first number.
        num2 : int or float
            The second number.

    Returns:
        int or float
            The difference obtained by subtracting
            num2 from num1.

    Example:
        >>> find_diff(20, 5)
        15
    """

    result = num1 - num2
    return result

'''
# run below code # we will get 1 example failed
if __name__ == "__main__":
    import doctest
    doctest.testmod()
'''


'''
otherwise in command prompt: # we will get 1 example failed

python -m doctest calc_v2.py
'''