# Binary Tree Preorder, Inorder, and Postorder Traversals
## Idea
1. Insert nodes into the binary tree using **Level Order Insertion**.
2. Perform:

   * **Preorder Traversal** → Root → Left → Right
   * **Inorder Traversal** → Left → Root → Right
   * **Postorder Traversal** → Left → Right → Root

---

# Pseudocode
```text
CLASS Node
    data
    left
    right

    CONSTRUCTOR Node(value)
        data = value
        left = NULL
        right = NULL
END CLASS
## Level Order Insertion
FUNCTION insert(root, value)

    newNode = new Node(value)

    IF root IS NULL
        RETURN newNode
    END IF
    CREATE queue
    ENQUEUE root INTO queue
    WHILE queue IS NOT EMPTY
        current = DEQUEUE queue
        IF current.left IS NULL
            current.left = newNode
            RETURN root
        ELSE
            ENQUEUE current.left
        END IF
        IF current.right IS NULL
            current.right = newNode
            RETURN root
        ELSE
            ENQUEUE current.right
        END IF
    END WHILE
    RETURN root
END FUNCTION
## Preorder Traversal (Root → Left → Right)
FUNCTION preorder(node)
    IF node IS NULL
        RETURN
    END IF
    VISIT node.data
    preorder(node.left)
    preorder(node.right)
END FUNCTION
## Inorder Traversal (Left → Root → Right)
FUNCTION inorder(node)
    IF node IS NULL
        RETURN
    END IF
    inorder(node.left)
    VISIT node.data
    inorder(node.right)
END FUNCTION
## Postorder Traversal (Left → Right → Root)
FUNCTION postorder(node)
    IF node IS NULL
        RETURN
    END IF
    postorder(node.left)
    postorder(node.right)
    VISIT node.data
END FUNCTION
FUNCTION main()
    root = NULL
    root = insert(root, 1)
    root = insert(root, 2)
    root = insert(root, 3)
    root = insert(root, 4)
    root = insert(root, 5)
    root = insert(root, 6)
    root = insert(root, 7)
    PRINT "Preorder:"
    preorder(root)
    PRINT "Inorder:"
    inorder(root)
    PRINT "Postorder:"
    postorder(root)
END FUNCTION
```


```py
from collections import deque

class Node:
    def __init__(self, value):
        self.data = value
        self.left = None
        self.right = None
def insert(root, value):
    newNode = Node(value)

    if root is None:
        return newNode
    queue = deque([root])
    while queue:
        current = queue.popleft()
        if current.left is None:
            current.left = newNode
            return root
        else:
            queue.append(current.left)
        if current.right is None:
            current.right = newNode
            return root
        else:
            queue.append(current.right)
    return root
def preorder(node):
    if node is None:
        return
    print(node.data, end=" ")
    preorder(node.left)
    preorder(node.right)
def inorder(node):
    if node is None:
        return
    inorder(node.left)
    print(node.data, end=" ")
    inorder(node.right)
def postorder(node):
    if node is None:
        return
    postorder(node.left)
    postorder(node.right)
    print(node.data, end=" ")
root = None
for value in [1, 2, 3, 4, 5, 6, 7]:
    root = insert(root, value)
print("Preorder:")
preorder(root)
print("\nInorder:")
inorder(root)
print("\nPostorder:")
postorder(root)
```

```java
import java.util.*;

class Node {
    int data;
    Node left;
    Node right;
    Node(int value) {
        data = value;
        left = null;
        right = null;
    }
}

public class Main {
    static Node insert(Node root, int value) {
        Node newNode = new Node(value);
        if (root == null)
            return newNode;
        Queue<Node> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            Node current = queue.poll();
            if (current.left == null) {
                current.left = newNode;
                return root;
            } else {
                queue.offer(current.left);
            }
            if (current.right == null) {
                current.right = newNode;
                return root;
            } else {
                queue.offer(current.right);
            }
        }
        return root;
    }
    static void preorder(Node node) {
        if (node == null)
            return;
        System.out.print(node.data + " ");
        preorder(node.left);
        preorder(node.right);
    }
    static void inorder(Node node) {
        if (node == null)
            return;
        inorder(node.left);
        System.out.print(node.data + " ");
        inorder(node.right);
    }
    static void postorder(Node node) {
        if (node == null)
            return;
        postorder(node.left);
        postorder(node.right);
        System.out.print(node.data + " ");
    }
    public static void main(String[] args) {
        Node root = null;
        int[] arr = {1, 2, 3, 4, 5, 6, 7};
        for (int value : arr)
            root = insert(root, value);
        System.out.println("Preorder:");
        preorder(root);
        System.out.println("\nInorder:");
        inorder(root);
        System.out.println("\nPostorder:");
        postorder(root);
    }
}
```

```c++
#include <iostream>
#include <queue>
using namespace std;

class Node {
public:
    int data;
    Node* left;
    Node* right;
    Node(int value) {
        data = value;
        left = nullptr;
        right = nullptr;
    }
};
Node* insert(Node* root, int value) {
    Node* newNode = new Node(value);
    if (root == nullptr)
        return newNode;
    queue<Node*> q;
    q.push(root);
    while (!q.empty()) {
        Node* current = q.front();
        q.pop();
        if (current->left == nullptr) {
            current->left = newNode;
            return root;
        } else {
            q.push(current->left);
        }
        if (current->right == nullptr) {
            current->right = newNode;
            return root;
        } else {
            q.push(current->right);
        }
    }
    return root;
}
void preorder(Node* node) {
    if (node == nullptr)
        return;
    cout << node->data << " ";
    preorder(node->left);
    preorder(node->right);
}

void inorder(Node* node) {
    if (node == nullptr)
        return;
    inorder(node->left);
    cout << node->data << " ";
    inorder(node->right);
}
void postorder(Node* node) {
    if (node == nullptr)
        return;
    postorder(node->left);
    postorder(node->right);
    cout << node->data << " ";
}
int main() {
    Node* root = nullptr;
    int arr[] = {1,2,3,4,5,6,7};
    for (int value : arr)
        root = insert(root, value);
    cout << "Preorder:\n";
    preorder(root);
    cout << "\nInorder:\n";
    inorder(root);
    cout << "\nPostorder:\n";
    postorder(root);
    return 0;
}
```
# Visualization

After inserting:

```text
        1
      /   \
     2     3
    / \   / \
   4   5 6   7
```

### Preorder (Root → Left → Right)

```text
Visit 1
    Visit 2
        Visit 4
        Visit 5
    Visit 3
        Visit 6
        Visit 7

Output:
1 2 4 5 3 6 7
```

---

### Inorder (Left → Root → Right)

```text
        4
    2
        5
1
        6
    3
        7

Output:
4 2 5 1 6 3 7
```

---

### Postorder (Left → Right → Root)

```text
        4
        5
    2

        6
        7
    3

1

Output:
4 5 2 6 7 3 1
```

---

# Complexity

| Operation            | Time | Space |
| -------------------- | ---- | ----- |
| Insert (Level Order) | O(n) | O(n)  |
| Preorder             | O(n) | O(h)  |
| Inorder              | O(n) | O(h)  |
| Postorder            | O(n) | O(h)  |

Where:

* **n** = number of nodes
* **h** = height of tree
* Worst case: O(n)
* Balanced tree: O(log n)
