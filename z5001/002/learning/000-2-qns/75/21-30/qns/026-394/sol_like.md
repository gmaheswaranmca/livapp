## 1. LC#20 Valid Parentheses
- Verify if brackets are balanced.
- s="()[]{}", answer=true
- Idea
  - Stack: Push `(`. pop and compare on `)`.
### Pseudocode
```text
function isValid(s)
    stack=emptyStack()
    for each ch in s
        if ch=='(' or ch=='{' or ch=='['
            push ch into stack
        else
            if stack is empty
                return false
            topChar=pop stack
            if ch==')' and topChar!='('
                return false
            if ch=='}' and topChar!='{'
                return false
            if ch==']' and topChar!='['
                return false
    return stack is empty
```

### Dry Run
```text
stack=[]
s="()[]{}"
---------------------------------------------
ch   action
---------------------------------------------
(    push -> stack=['(']
)    pop '(' matches ')' -> stack=[]
[    push -> stack=['[']
]    pop '[' matches ']' -> stack=[]
{    push -> stack=['{']
}    pop '{' matches '}' -> stack=[]
Return true
```

---

## 2. LC#224 Basic Calculator
- Eval expression `+`, `-`, `(`, `)`.
- s="1+(4+5)", answer=10
- Idea:
  - Stack: Store signs and results before `(`.
### Pseudocode
```text
function calculate(s)
    stack = emptyStack()

    result = 0
    number = 0
    sign = 1
    for each ch in s
        if digit
            number = number * 10 + (ch - '0')
        else if ch == '+'
            result = result + sign * number
            number = 0
            sign=1
        else if ch == '-'
            result = result + sign * number
            number = 0
            sign = -1
        else if ch == '('
            push result into stack
            push sign into stack
            result = 0
            sign = 1
        else if ch == ')'
            result = result + sign * number
            number = 0
            prevSign = pop stack
            prevResult = pop stack
            result = prevResult + prevSign * result
    result = result + sign * number
    return result
```

### Dry Run
```text
stack=[]
result=0
number=0
sign=1

s="1+(4+5)"
-------------------------------------------------
ch   action
-------------------------------------------------
1    number=1
+    result=1 , number=0 , sign=1
(    push 1,push 1 -> stack=[1,1]
     result=0 sign=1
4    number=4
+    result=4
5    number=5
)    result=4+5=9
     prevSign=1 prevResult=1
     result=1+1*9=10
Return 10
```

---

## 3. LC#227 Basic Calculator II
- Eval `+`, `-`, `*`, `/` without `()`.
- s="3+2*2", sum=7
- Idea:
  - Stack: Push nums, process `*` and `/` immediately.
### Pseudocode
```text
function calculate(s)
    stack=emptyStack()
    number = 0
    operation = '+'
    for each ch in s
        if digit
            number = number * 10 + (ch - '0')
        if ch is operator or end of string
            if operation == '+'
                push number into stack
            else if operation == '-'
                push -number into stack
            else if operation == '*'
                push pop(stack) * number into stack
            else if operation == '/'
                push pop(stack) / number into stack
            operation = ch
            number = 0
    result=0
    while stack not empty
        result = result + pop(stack)
    return result
```

### Dry Run
```text
stack=[]
s="3+2*2"
-----------------------------------------
ch   action
-----------------------------------------
3    number=3
+    '+' -> push 3
     stack=[3]
2    number=2
*    '+' -> push 2
     stack=[3,2]
2    number=2
end  '*' -> pop 2
     push 2*2=4
     stack=[3,4]
sum stack=7
Return 7
```

---

## 4. LC#316 Remove Duplicate Letters
- Smallest lexicographical order.
- s="cbacdcbc", answer="acdb"
- Idea: 
  - Stack: Keep track of char counts + visited.
### Pseudocode
```text
function removeDuplicateLetters(s)
    freq=countCharacters(s)
    visited=emptySet()
    stack=emptyStack()
    for each ch in s
        freq[ch]=freq[ch]-1
        if ch in visited
            continue
        while stack not empty and top(stack) > ch and freq[top(stack)] > 0
            remove pop(stack) from visited
        push ch into stack
        add ch into visited
    return join(stack)
```

### Dry Run
```text
stack=[]
visited={}
s="cbacdcbc"
------------------------------------------------
ch   action
------------------------------------------------
c    push c
     stack=[c]
b    c>b and c appears later
     pop c
     push b
     stack=[b]
a    b>a and b appears later
     pop b
     push a
     stack=[a]
c    push c
     stack=[a,c]
d    push d
     stack=[a,c,d]
c    already visited -> skip
b    d > b but d not repeated
     push b
     stack=[a,c,d,b]
c    already visited -> skip
Return "acdb"
```

---

## 5. LC#394 Decode String
- Nested string repetition.
- s="2[a]c", answer="aac"
- Idea:
  - Stack: Store prev string/count before `[`.
### Pseudocode
```text
function decodeString(s)
    countStack=emptyStack()
    stringStack=emptyStack()
    currentString=""
    currentNumber=0
    for each ch in s
        if isDigit(ch)
            currentNumber=currentNumber*10+(ch-'0')
        else if ch=='['
            push currentNumber into countStack
            push currentString into stringStack
            currentNumber=0
            currentString=""
        else if ch==']'
            repeatCount=pop countStack
            previousString=pop stringStack
            currentString=previousString+repeat(currentString,repeatCount)
        else
            currentString=currentString+ch
    return currentString
```

### Dry Run (LC#2390 Style)
```text
::Dry Run::
countStack:[]
stringStack:[]
currentString=""
currentNumber=0
s="2[a]c"
------------------------------------------------
ch   action
------------------------------------------------
2    digit?T->currentNumber=2
[    [?T->countStack:[2]
     stringStack:[""]
     currentString=""
     currentNumber=0
a    else?T->currentString="a"
]    ]?T->repeatCount=2
     previousString=""
     currentString="aa"
c    else?T->currentString="aac"
Return "aac"
```

---

## 6. LC#402 Remove K Digits
- Minimum parenthesis insertions.
- num="1432219", k=3, answer="1219"
- Idea:
  - Stack: Direct simulation of ops.
### Pseudocode
```text
function removeKdigits(num,k)
    stack=emptyStack()
    for each ch in num
        while k>0 and stack not empty and top(stack)>ch
            pop stack
            k=k-1
        push ch into stack
    while k>0
        pop stack
        k=k-1
    result=""
    for each digit in stack
        if result=="" and digit=='0'
            continue
        result=result+digit
    if result==""
        return "0"
    return result
```

### Dry Run
| ch      | Action                                           |
| ------- | ------------------------------------------------ |
| Input   | num="1432219", k=3                               |
| Initial | stack=[]                                         |
| `1`     | push → stack=[1]                                 |
| `4`     | push → stack=[1,4]                               |
| `3`     | 4>3 and k>0 → pop 4, k=2; push 3 → stack=[1,3]   |
| `2`     | 3>2 and k>0 → pop 3, k=1; push 2 → stack=[1,2]   |
| `2`     | push → stack=[1,2,2]                             |
| `1`     | 2>1 and k>0 → pop 2, k=0; push 1 → stack=[1,2,1] |
| `9`     | push → stack=[1,2,1,9]                           |
| Return  | `"1219"`                                         |

---

## 7. LC#678 Valid Parenthesis String
- Possible pop sequences.
- s="(*)", answer: true
- Idea:
  - Stack: Direct simulation of ops.
### Pseudocode
```text
function checkValidString(s)
    leftStack=emptyStack()
    starStack=emptyStack()
    for i=0 to length(s)-1
        ch=s[i]
        if ch=='('
            push i into leftStack
        else if ch=='*'
            push i into starStack
        else
            if leftStack not empty
                pop leftStack
            else if starStack not empty
                pop starStack
            else
                return false
    while leftStack not empty and starStack not empty
        if top(leftStack)>top(starStack)
            return false
        pop leftStack
        pop starStack
    return leftStack is empty
```

### Dry Run
| ch      | Action                       |
| ------- | ---------------------------- |
| Input   | s="(*)"                      |
| Initial | leftStack=[] , starStack=[]  |
| `(`     | push index 0 → leftStack=[0] |
| `*`     | push index 1 → starStack=[1] |
| `)`     | pop leftStack → leftStack=[] |
| End     | leftStack empty              |
| Return  | `true`                       |

---

## 8. LC#726 Number of Atoms
- Chemical formula atom counting.
- formula="K4(ON)2", answer: "K4N2O2"
- Idea:
  - Stack: Store atom map for each `(`.
### Pseudocode
```text
function countOfAtoms(formula)
    stack=emptyStack()
    currentMap=emptyMap()
    i=0
    while i<length(formula)
        if formula[i]=='('
            push currentMap into stack
            currentMap=emptyMap()
            i=i+1
        else if formula[i]==')'
            i=i+1
            multiplier=readNumber(formula,i)
            if multiplier==0
                multiplier=1
            temp=currentMap
            currentMap=pop stack
            for each atom in temp
                currentMap[atom] = currentMap[atom] + temp[atom] * multiplier
        else
            atom=readAtom(formula,i)
            count=readNumber(formula,i)
            if count==0
                count=1
            currentMap[atom]=currentMap[atom]+count
    return sortedAtoms(currentMap)
```

### Dry Run
| ch      | Action                    |
| ------- | ------------------------- |
| Input   | formula="K4(ON)2"         |
| Initial | stack=[] , currentMap={}  |
| `K4`    | currentMap={K:4}          |
| `(`     | push {K:4}; currentMap={} |
| `O`     | currentMap={O:1}          |
| `N`     | currentMap={O:1,N:1}      |
| `)`     | multiplier=2              |
| merge   | currentMap={K:4,O:2,N:2}  |
| Return  | `"K4N2O2"`                |

---

## 9. LC#735 Asteroid Collision
- Simulate asteroid collisions in a line.
- asteroids=[5,10,-5], answer: [5,10]
- Idea: 
  - Stack: Compare current with stack top.
### Pseudocode
```text
function asteroidCollision(asteroids)
    stack=emptyStack()
    for each asteroid in asteroids
        alive=true
        while alive and asteroid<0 and stack not empty and top(stack)>0
            if top(stack)<abs(asteroid)
                pop stack
            else if top(stack)==abs(asteroid)
                pop stack
                alive=false
            else
                alive=false
        if alive
            push asteroid into stack
    return stack
```

### Dry Run
| ch      | Action              |
| ------- | ------------------- |
| Input   | asteroids=[5,10,-5] |
| Initial | stack=[]            |
| `5`     | push → stack=[5]    |
| `10`    | push → stack=[5,10] |
| `-5`    | collision with 10   |
|         | 10>5 → -5 destroyed |
| Return  | `[5,10]`            |

---

## 10. LC#856 Score of Parentheses
- Nested score calculation. 
- s="(()())", score = 4
- Idea: 
  - Stack: Accumulate values at each depth.
### Pseudocode

```text
function scoreOfParentheses(s)
    stack=emptyStack()
    currentScore=0
    for each ch in s
        if ch=='('
            push currentScore into stack
            currentScore=0
        else
            previousScore=pop stack
            currentScore=previousScore + max(2 * currentScore, 1)
    return currentScore
```

### Dry Run
| ch      | Action                               |
| ------- | ------------------------------------ |
| Input   | s="(()())"                           |
| Initial | stack=[] , currentScore=0            |
| `(`     | push 0 → stack=[0], currentScore=0   |
| `(`     | push 0 → stack=[0,0], currentScore=0 |
| `)`     | pop 0 → currentScore=1               |
| `(`     | push 1 → stack=[0,1], currentScore=0 |
| `)`     | pop 1 → currentScore=2               |
| `)`     | pop 0 → currentScore=4               |
| Return  | `4`                                  |

---

## 11. LC#921 Min Add to Make Valid
* Description: Find minimum parentheses to add to make the string valid.
* Sample input / output: `s="())"` → `1`
* Idea: Count unmatched `(` and `)` using a counter.

### Pseudocode
```text
function minAddToMakeValid(s)
    open = 0
    additions = 0
    for each ch in s
        if ch == '('
            open = open + 1
        else
            if open > 0
                open = open - 1
            else
                additions = additions + 1
    return additions + open
```

### Dry Run Table
| ch      | Action               |
| ------- | -------------------- |
| Input   | s="())"              |
| Initial | open=0, additions=0  |
| `(`     | open=1               |
| `)`     | open>0 → open=0      |
| `)`     | open=0 → additions=1 |
| Return  | 1                    |

---

## 12. LC#946 Validate Stack Sequences
* Description: Check whether the given push and pop sequences are valid.
* Sample input / output: `pushed=[1,2], popped=[2,1]` → `true`
* Idea: Simulate push and pop operations using a stack.

### Pseudocode
```text
function validateStackSequences(pushed,popped)
    stack = emptyStack()
    j = 0
    for each x in pushed
        push x into stack
        while stack not empty and top(stack) == popped[j]
            pop stack
            j = j + 1
    return stack is empty
```

### Dry Run Table
| ch      | Action                      |
| ------- | --------------------------- |
| Input   | pushed=[1,2], popped=[2,1]  |
| Initial | stack=[], j=0               |
| `1`     | push → stack=[1]            |
| `2`     | push → stack=[1,2]          |
|         | top=2==popped[0] → pop -> stack=[1], j=1 |
|         | top=1==popped[1] → pop -> stack=[], j=2 |
| Return  | true                        |

---

## 13. LC#1021 Remove Outermost Parentheses
* Description: Remove outermost parentheses from every primitive substring.
* Sample input / output: `s="(()())"` → `"()()"`
* Idea: Use counter to skip first `(` and last `)` of each primitive.

### Pseudocode
```text
function removeOuterParentheses(s)
    result = ""
    balance = 0

    for each ch in s
        if ch == '('
            if balance > 0
                result = result + ch
            balance = balance + 1
        else
            balance = balance - 1
            if balance > 0
                result = result + ch
    return result
```

### Dry Run Table
| ch      | Action                                            |
| ------- | ------------------------------------------------- |
| Input   | s="(()())"                                        |
| Initial | result="", balance=0                              |
| `(`     | balance=0 → skip, balance=1                       |
| `(`     | add `(` → result="(", balance=2                   |
| `)`     | balance=1 after decrement → add `)` → result="()" |
| `(`     | add `(` → result="()(", balance=2                 |
| `)`     | balance=1 → add `)` → result="()()"               |
| `)`     | balance=0 → skip                                  |
| Return  | `"()()"`                                          |

---

## 14. LC#1047 Remove All Adjacent Duplicates
* Description: Remove adjacent equal characters repeatedly.
* Sample input / output: `s="abbaca"` → `"ca"`
* Idea: Use stack and remove top when duplicate appears.

### Pseudocode
```text
function removeDuplicates(s)
    stack=emptyStack()

    for each ch in s
        if stack not empty and top(stack)==ch
            pop stack
        else
            push ch into stack
    return join(stack)
```

### Dry Run Table
| ch      | Action                |
| ------- | --------------------- |
| Input   | s="abbaca"            |
| Initial | stack=[]              |
| `a`     | push → [a]            |
| `b`     | push → [a,b]          |
| `b`     | duplicate → pop → [a] |
| `a`     | duplicate → pop → []  |
| `c`     | push → [c]            |
| `a`     | push → [c,a]          |
| Return  | `"ca"`                |

---

## 15. LC#1190 Reverse Substrings Between Each Pair of Parentheses
* Description: Reverse characters inside each pair of parentheses.
* Sample input / output: `s="(u(love)i)"` → `"iloveu"`
* Idea: Store previous string in stack and reverse current string when `)` appears.

### Pseudocode
```text
function reverseParentheses(s)
    stack = emptyStack()
    currentString = ""
    for each ch in s
        if ch == '('
            push currentString into stack
            currentString = ""
        else if ch == ')'
            previousString = pop stack
            currentString = previousString + reverse(currentString)
        else
            currentString = currentString + ch
    return currentString
```

### Dry Run Table
| ch      | Action                                                   |
| ------- | -------------------------------------------------------- |
| Input   | s="(u(love)i)"                                           |
| Initial | stack=[], currentString=""                               |
| `(`     | push "" → stack=[""]                                     |
| `u`     | currentString="u"                                        |
| `(`     | push "u" → stack=["","u"], currentString=""              |
| `l`     | currentString="l"                                        |
| `o`     | currentString="lo"                                       |
| `v`     | currentString="lov"                                      |
| `e`     | currentString="love"                                     |
| `)`     | reverse("love")="evol"; currentString="u"+"evol"="uevol" |
| `i`     | currentString="uevoli"                                   |
| `)`     | reverse("uevoli")="iloveu"; currentString="iloveu"       |
| Return  | `"iloveu"`                                               |


## 16. LC#1249 Minimum Remove to Make Valid Parentheses
* Description: Remove minimum invalid parentheses and return a valid string.
* Sample input / output: `s="lee(t(c)o)de)"` → `"lee(t(c)o)de"`
* Idea: Use stack to store indices of `(` and mark invalid brackets.

### Pseudocode
```text
function minRemoveToMakeValid(s)
    stack=emptyStack()
    remove=emptySet()
    for i=0 to length(s)-1
        if s[i]=='('
            push i into stack
        else if s[i]==')'
            if stack not empty
                pop stack
            else
                add i into remove
    while stack not empty
        add pop(stack) into remove
    result=""
    for i=0 to length(s)-1
        if i not in remove
            result=result+s[i]
    return result
```

### Dry Run Table
| ch        | Action                    |
| --------- | ------------------------- |
| Input     | s="lee(t(c)o)de)"         |
| Initial   | stack=[] , remove={}      |
| `(` at 3  | push 3 → stack=[3]        |
| `(` at 5  | push 5 → stack=[3,5]      |
| `)` at 7  | pop 5 → stack=[3]         |
| `)` at 9  | pop 3 → stack=[]          |
| `)` at 12 | stack empty → remove={12} |
| Build     | skip index 12             |
| Return    | `"lee(t(c)o)de"`          |

---

## 17. LC#1541 Minimum Insertions to Balance a Parentheses String
* Description: Every `(` must be matched with `))`.
* Sample input / output: `s="(()))"` → `1`
* Idea: Track unmatched `(` and required insertions.

### Pseudocode
```text
function minInsertions(s)
    open=0
    insertions=0
    i=0
    while i<length(s)
        if s[i]=='('
            open=open+1
            i=i+1
        else
            if i+1<length(s) and s[i+1]==')'
                i=i+2
            else
                insertions=insertions+1
                i=i+1
            if open>0
                open=open-1
            else
                insertions=insertions+1
    return insertions + open * 2
```

### Dry Run Table
| ch      | Action                         |
| ------- | ------------------------------ |
| Input   | s="(()))"                      |
| Initial | open=0 , insertions=0          |
| `(`     | open=1                         |
| `(`     | open=2                         |
| `))`    | match one `(` → open=1         |
| `)`     | missing one `)` → insertions=1 |
|         | match remaining `(` → open=0   |
| Return  | `1`                            |

---

## 18. LC#1614 Maximum Nesting Depth of the Parentheses
* Description: Find the maximum nesting depth of parentheses.
* Sample input / output: `s="(1+(2*3))"` → `2`
* Idea: Increase depth for `(` and decrease for `)`.

### Pseudocode
```text
function maxDepth(s)
    depth = 0
    maxDepth = 0
    for each ch in s
        if ch == '('
            depth = depth + 1
            maxDepth = max(maxDepth, depth)
        else if ch == ')'
            depth = depth - 1
    return maxDepth
```

### Dry Run Table
| ch      | Action               |
| ------- | -------------------- |
| Input   | s="(1+(2*3))"        |
| Initial | depth=0 , maxDepth=0 |
| `(`     | depth=1 , maxDepth=1 |
| `(`     | depth=2 , maxDepth=2 |
| `)`     | depth=1              |
| `)`     | depth=0              |
| Return  | `2`                  |

---

## 19. LC#2027 Minimum Moves to Convert String
* Description: Convert all `X` to `O` by changing 3 consecutive characters in one move.
* Sample input / output: `s="XXX"` → `1`
* Idea: When `X` is found, perform one move and skip next two positions.

### Pseudocode
```text
function minimumMoves(s)
    moves = 0
    i = 0
    while i < length(s)
        if s[i] == 'X'
            moves = moves + 1
            i = i + 3
        else
            i = i + 1
    return moves
```

### Dry Run Table
| ch      | Action          |
| ------- | --------------- |
| Input   | s="XXX"         |
| Initial | moves=0 , i=0   |
| `X`     | moves=1 , i=i+3 |
| End     | i=3             |
| Return  | `1`             |

---

## 20. LC#32 Longest Valid Parentheses
* Description: Find the length of the longest valid parentheses substring.
* Sample input / output: `s=")()())"` → `4`
* Idea: Store indices in stack and use last unmatched index as boundary.

### Pseudocode
```text
function longestValidParentheses(s)
    stack = emptyStack()
    push -1 into stack
    maxLength=0
    for i=0 to length(s) - 1
        if s[i] == '('
            push i into stack
        else
            pop stack
            if stack is empty
                push i into stack
            else
                maxLength=max(maxLength, i - top(stack))
    return maxLength
```

### Dry Run Table
| ch      | Action                       |
| ------- | ---------------------------- |
| Input   | s=")()())"                   |
| Initial | stack=[-1], maxLength=0      |
| `)` i=0 | pop -1, stack empty → push 0 |
| `(` i=1 | push 1 → stack=[0,1]         |
| `)` i=2 | pop 1 → length=2-0=2         |
| `(` i=3 | push 3 → stack=[0,3]         |
| `)` i=4 | pop 3 → length=4-0=4         |
| `)` i=5 | pop 0, stack empty → push 5  |
| Return  | `4`                          |
