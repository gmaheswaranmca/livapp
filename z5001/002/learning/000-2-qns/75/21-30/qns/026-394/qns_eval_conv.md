
Here is a **Stack Expression Conversion + Evaluation Cheat Sheet** containing:

1. Prefix ↔ Infix ↔ Postfix conversions
2. Expression Evaluation problems
3. Important Stack-based LeetCode problems related to expressions

---

## A. Expression Conversion Algorithms

| S.No | Conversion         | Scan Direction          | Stack Used    | Idea                               |
| ---: | ------------------ | ----------------------- | ------------- | ---------------------------------- |
|    1 | Prefix → Infix     | Right → Left            | Stack<String> | Pop 2 operands, combine `(a op b)` |
|    2 | Prefix → Postfix   | Right → Left            | Stack<String> | Pop 2 operands, form `abop`        |
|    3 | Postfix → Infix    | Left → Right            | Stack<String> | Pop 2 operands, form `(a op b)`    |
|    4 | Postfix → Prefix   | Left → Right            | Stack<String> | Pop 2 operands, form `opab`        |
|    5 | Infix → Postfix    | Left → Right            | Stack<char>   | Operator precedence + stack        |
|    6 | Infix → Prefix     | Reverse + postfix logic | Stack<char>   | Reverse expression, swap brackets  |
|    7 | Prefix Evaluation  | Right → Left            | Stack<int>    | Pop 2 values, evaluate             |
|    8 | Postfix Evaluation | Left → Right            | Stack<int>    | Pop 2 values, evaluate             |

---

## B. Conversion Examples

| Conversion       | Input         | Output          |
| ---------------- | ------------- | --------------- |
| Prefix → Infix   | `*+AB-CD`     | `((A+B)*(C-D))` |
| Prefix → Postfix | `*+AB-CD`     | `AB+CD-*`       |
| Postfix → Infix  | `AB+CD-*`     | `((A+B)*(C-D))` |
| Postfix → Prefix | `AB+CD-*`     | `*+AB-CD`       |
| Infix → Postfix  | `(A+B)*(C-D)` | `AB+CD-*`       |
| Infix → Prefix   | `(A+B)*(C-D)` | `*+AB-CD`       |

---

# C. Expression Evaluation LeetCode Problems

| S.No |  LC# | Title                                           | Description                 | Sample Input            |    Sample Output | Idea                      |
| ---: | ---: | ----------------------------------------------- | --------------------------- | ----------------------- | ---------------: | ------------------------- |
|    1 |   20 | Valid Parentheses                               | Check matching brackets     | `"()[]{}"`              |             true | Stack of opening brackets |
|    2 |   32 | Longest Valid Parentheses                       | Longest balanced substring  | `"(()"`                 |                2 | Stack storing indices     |
|    3 |   71 | Simplify Path                                   | Unix path simplification    | `"/a/./b/../../c/"`     |           `"/c"` | Stack of directories      |
|    4 |  150 | Evaluate Reverse Polish Notation                | Evaluate postfix expression | `["2","1","+","3","*"]` |                9 | Stack evaluation          |
|    5 |  224 | Basic Calculator                                | Evaluate +,- and ()         | `"1+(2-3)+4"`           |                4 | Stack + sign handling     |
|    6 |  227 | Basic Calculator II                             | Evaluate +,-,*,/            | `"3+2*2"`               |                7 | Stack with precedence     |
|    7 |  772 | Basic Calculator III                            | Evaluate +,-,*,/,()         | `"2*(5+5*2)/3"`         |               10 | Recursive stack parser    |
|    8 |  856 | Score of Parentheses                            | Compute score               | `"(()(()))"`            |                6 | Stack depth calculation   |
|    9 |  921 | Minimum Add to Make Parentheses Valid           | Add minimum brackets        | `"()))(("`              |                4 | Stack/counter             |
|   10 | 1021 | Remove Outermost Parentheses                    | Remove outermost layer      | `"(()())(())"`          |       `"()()()"` | Depth counter             |
|   11 | 1190 | Reverse Substrings Between Parentheses          | Reverse inside brackets     | `"(abcd)"`              |         `"dcba"` | Stack/string builder      |
|   12 | 1249 | Minimum Remove to Make Valid Parentheses        | Remove invalid brackets     | `"lee(t(c)o)de)"`       | `"lee(t(c)o)de"` | Stack indices             |
|   13 | 1541 | Minimum Insertions to Balance Parentheses       | Balance with `))`           | `"(()))"`               |                1 | Greedy + stack idea       |
|   14 | 1614 | Maximum Nesting Depth of Parentheses            | Find maximum depth          | `"(1+(2*3)+((8)/4))+1"` |                3 | Counter                   |
|   15 | 1963 | Minimum Number of Swaps to Make String Balanced | Balance brackets            | `"][]["`                |                1 | Count imbalance           |
|   16 | 2116 | Check if Parentheses String Can Be Valid        | Locked parentheses          | `"))()))"`              |             true | Greedy + stack idea       |

---

# D. Decode / Nested Expression Problems

| S.No |  LC# | Title                        | Description                 | Sample Input      | Sample Output | Idea             |
| ---: | ---: | ---------------------------- | --------------------------- | ----------------- | ------------- | ---------------- |
|    1 |  394 | Decode String                | Decode nested pattern       | `"3[a2[c]]"`      | `"accaccacc"` | Two stacks       |
|    2 |  726 | Number of Atoms              | Parse chemical formula      | `"K4(ON(SO3)2)2"` | `"K4N2O14S4"` | Stack + hashmap  |
|    3 | 1106 | Parsing A Boolean Expression | Evaluate boolean expression | `"!(f)"`          | true          | Stack parsing    |
|    4 |  439 | Ternary Expression Parser    | Parse ternary expression    | `"T?2:3"`         | `"2"`         | Stack from right |

---

# E. Stack Expression Evaluation Problems

| S.No |  LC# | Title                            | Description              | Sample Input             | Sample Output | Idea              |       |
| ---: | ---: | -------------------------------- | ------------------------ | ------------------------ | ------------: | ----------------- | ----- |
|    1 |  150 | Evaluate Reverse Polish Notation | Evaluate postfix         | `["4","13","5","/","+"]` |             6 | Stack<int>        |       |
|    2 |  224 | Basic Calculator                 | +,-,()                   | `"1-(2-3)"`              |             2 | Sign stack        |       |
|    3 |  227 | Basic Calculator II              | +,-,*,/                  | `"3+5/2"`                |             5 | Immediate */      |       |
|    4 |  772 | Basic Calculator III             | +,-,*,/,()               | `"2*(3+4)"`              |            14 | Recursion + stack |       |
|    5 | 1106 | Parsing Boolean Expression       | Evaluate boolean formula | `"                       |       (f,t)"` | true              | Stack |

---

# F. Complete Conversion Matrix

| From \ To | Prefix | Infix | Postfix |
| --------- | ------ | ----- | ------- |
| Prefix    | —      | ✓     | ✓       |
| Infix     | ✓      | —     | ✓       |
| Postfix   | ✓      | ✓     | —       |

There are **6 major conversions**:

1. Prefix → Infix
2. Prefix → Postfix
3. Infix → Prefix
4. Infix → Postfix
5. Postfix → Prefix
6. Postfix → Infix

And **2 evaluation algorithms**:

7. Prefix Evaluation
8. Postfix Evaluation

These **8 algorithms** form the standard **Stack Expression Conversion & Evaluation** set commonly asked in interviews and coding platforms.
