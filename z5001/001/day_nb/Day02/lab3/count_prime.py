# count_prime for given sequence (via return statement in is_prime fn)
import pdb
import math 

# call by value 
def is_prime(num): 
    for mid in range(2, int(math.sqrt(num)) + 1): 
        # pdb.set_trace()
        if num % mid == 0:
            return False 
        #
    #

    return True 
#

# call by reference 
def count_prime(nums):
    pdb.set_trace()
    count = 0 
    for num in nums:        
        if is_prime(num):
            count += 1
        #
    #
    return count 
#

print(count_prime([10, 11, 31, 50]))