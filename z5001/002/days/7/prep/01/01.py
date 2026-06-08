#===== Declare Imports here if required =====


#===== Declare Global Variables / Functions here if required =====


class Node:
    def __init__(self, val):
        self.data = val
        self.next = None

def solve():
    N = int(input())
    arr = list(map(int, input().split()))

    #===== Declare Local Variables / Functions here if required =====


    head = None
    tail = None

    for x in arr:

        #===== Write Your Logic Here =====
        node = Node(x)
        if head == None:
            head = node
            tail = node
        else:
            tail.next = node
            tail = node

    e = head 
    while e != None:
        if e == head:
            print(f'{e.data}', end='')
        else:
            print(f' {e.data}', end='')
        e = e.next
        pass
if __name__ == "__main__":
    solve()