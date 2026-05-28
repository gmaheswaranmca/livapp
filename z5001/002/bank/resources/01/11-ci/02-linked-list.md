📘 *Coding Interview – Part 2: Linked Lists* 🔗🧠

✅ *Q1. Reverse Linked List (Meta)*  
*Problem:* Reverse a singly linked list.  
*Answer:*  
```python
def reverseList(head):
    prev = None
    while head:
        nxt = head.next
        head.next = prev
        prev = head
        head = nxt
    return prev
```

✅ *Q2. Detect Cycle in Linked List (Google)*  
*Problem:* Return True if the linked list has a cycle.  
*Answer:*  
```python
def hasCycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False
```

✅ *Q3. Merge Two Sorted Lists (Amazon)*  
*Problem:* Merge two sorted linked lists into one.  
*Answer:*  
```python
def mergeTwoLists(l1, l2):
    dummy = curr = ListNode()
    while l1 and l2:
        if l1.val < l2.val:
            curr.next, l1 = l1, l1.next
        else:
            curr.next, l2 = l2, l2.next
        curr = curr.next
    curr.next = l1 or l2
    return dummy.next
```

✅ *Q4. Remove Nth Node From End (Microsoft)*  
*Problem:* Remove the n-th node from the end of the list.  
*Answer:*  
```python
def removeNthFromEnd(head, n):
    dummy = ListNode(0, head)
    slow = fast = dummy
    for _ in range(n):
        fast = fast.next
        while fast.next:
        fast = fast.next
        slow = slow.next
    slow.next = slow.next.next
    return dummy.next
```

✅ *Q5. Palindrome Linked List (Google)*  
*Problem:* Check if a linked list is a palindrome.  
*Answer:*  
```python
def isPalindrome(head):
    vals = []
    while head:
        vals.append(head.val)
        head = head.next
    return vals == vals[::-1]
```
