## Binary Search Tree (BST) Complete Implementation – Language-Neutral Pseudocode

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


FUNCTION insert(root, value)

    IF root IS NULL
        RETURN NEW Node(value)
    END IF

    IF value < root.data
        root.left = insert(root.left, value)

    ELSE IF value > root.data
        root.right = insert(root.right, value)

    ELSE
        // Duplicate value
        RETURN root
    END IF

    RETURN root

END FUNCTION


FUNCTION search(root, value)

    IF root IS NULL
        RETURN FALSE
    END IF

    IF root.data = value
        RETURN TRUE
    END IF

    IF value < root.data
        RETURN search(root.left, value)
    ELSE
        RETURN search(root.right, value)
    END IF

END FUNCTION


FUNCTION findMin(root)

    current = root

    WHILE current.left IS NOT NULL
        current = current.left
    END WHILE

    RETURN current

END FUNCTION


FUNCTION delete(root, value)

    IF root IS NULL
        RETURN NULL
    END IF

    IF value < root.data

        root.left = delete(root.left, value)

    ELSE IF value > root.data

        root.right = delete(root.right, value)

    ELSE

        // Case 1: Leaf Node
        IF root.left IS NULL AND root.right IS NULL
            DELETE root
            RETURN NULL
        END IF

        // Case 2: One Child

        IF root.left IS NULL
            temp = root.right
            DELETE root
            RETURN temp
        END IF

        IF root.right IS NULL
            temp = root.left
            DELETE root
            RETURN temp
        END IF

        // Case 3: Two Children

        successor = findMin(root.right)

        root.data = successor.data

        root.right = delete(root.right, successor.data)

    END IF

    RETURN root

END FUNCTION


FUNCTION inorder(root)

    IF root IS NULL
        RETURN
    END IF

    inorder(root.left)

    PRINT root.data

    inorder(root.right)

END FUNCTION


FUNCTION solve()

    root = NULL

    values = [50, 30, 70, 20, 40, 60, 80]

    FOR EACH value IN values
        root = insert(root, value)
    END FOR

    PRINT "Inorder Traversal:"
    inorder(root)

    PRINT NEWLINE

    PRINT "Search 40:"
    PRINT search(root, 40)

    PRINT "Search 100:"
    PRINT search(root, 100)

    root = delete(root, 20)    // Leaf Node

    root = delete(root, 30)    // One Child

    root = delete(root, 50)    // Two Children

    PRINT "Inorder After Deletions:"
    inorder(root)

END FUNCTION
```

```py
class Node:
    def __init__(self, value):
        self.data = value
        self.left = None
        self.right = None


def insert(root, value):
    if root is None:
        return Node(value)

    if value < root.data:
        root.left = insert(root.left, value)

    elif value > root.data:
        root.right = insert(root.right, value)

    return root


def search(root, value):
    if root is None:
        return False

    if root.data == value:
        return True

    if value < root.data:
        return search(root.left, value)

    return search(root.right, value)


def find_min(root):
    current = root

    while current.left:
        current = current.left

    return current


def delete_node(root, value):
    if root is None:
        return None

    if value < root.data:
        root.left = delete_node(root.left, value)

    elif value > root.data:
        root.right = delete_node(root.right, value)

    else:
        if root.left is None and root.right is None:
            return None

        if root.left is None:
            return root.right

        if root.right is None:
            return root.left

        successor = find_min(root.right)

        root.data = successor.data

        root.right = delete_node(root.right, successor.data)

    return root


def inorder(root):
    if root is None:
        return

    inorder(root.left)
    print(root.data, end=" ")
    inorder(root.right)


root = None

values = [50, 30, 70, 20, 40, 60, 80]

for value in values:
    root = insert(root, value)

print("Inorder Traversal:")
inorder(root)

print("\nSearch 40:", search(root, 40))
print("Search 100:", search(root, 100))

root = delete_node(root, 20)
root = delete_node(root, 30)
root = delete_node(root, 50)

print("Inorder After Deletions:")
inorder(root)
```

```java
class Node
{
    int data;
    Node left;
    Node right;

    Node(int value)
    {
        data = value;
        left = null;
        right = null;
    }
}

public class Main
{
    public static Node insert(Node root, int value)
    {
        if (root == null)
        {
            return new Node(value);
        }

        if (value < root.data)
        {
            root.left = insert(root.left, value);
        }
        else if (value > root.data)
        {
            root.right = insert(root.right, value);
        }

        return root;
    }

    public static boolean search(Node root, int value)
    {
        if (root == null)
        {
            return false;
        }

        if (root.data == value)
        {
            return true;
        }

        if (value < root.data)
        {
            return search(root.left, value);
        }

        return search(root.right, value);
    }

    public static Node findMin(Node root)
    {
        Node current = root;

        while (current.left != null)
        {
            current = current.left;
        }

        return current;
    }

    public static Node deleteNode(Node root, int value)
    {
        if (root == null)
        {
            return null;
        }

        if (value < root.data)
        {
            root.left = deleteNode(root.left, value);
        }
        else if (value > root.data)
        {
            root.right = deleteNode(root.right, value);
        }
        else
        {
            if (root.left == null && root.right == null)
            {
                return null;
            }

            if (root.left == null)
            {
                return root.right;
            }

            if (root.right == null)
            {
                return root.left;
            }

            Node successor = findMin(root.right);

            root.data = successor.data;

            root.right = deleteNode(root.right, successor.data);
        }

        return root;
    }

    public static void inorder(Node root)
    {
        if (root == null)
        {
            return;
        }

        inorder(root.left);
        System.out.print(root.data + " ");
        inorder(root.right);
    }

    public static void main(String[] args)
    {
        Node root = null;

        int[] values = {50, 30, 70, 20, 40, 60, 80};

        for (int value : values)
        {
            root = insert(root, value);
        }

        System.out.print("Inorder Traversal: ");
        inorder(root);
        System.out.println();

        System.out.println("Search 40: " + search(root, 40));
        System.out.println("Search 100: " + search(root, 100));

        root = deleteNode(root, 20);
        root = deleteNode(root, 30);
        root = deleteNode(root, 50);

        System.out.print("Inorder After Deletions: ");
        inorder(root);
        System.out.println();
    }
}
```

```c++
#include <iostream>
#include <vector>
using namespace std;

class Node
{
public:
    int data;
    Node* left;
    Node* right;

    Node(int value)
    {
        data = value;
        left = nullptr;
        right = nullptr;
    }
};

Node* insert(Node* root, int value)
{
    if (root == nullptr)
    {
        return new Node(value);
    }

    if (value < root->data)
    {
        root->left = insert(root->left, value);
    }
    else if (value > root->data)
    {
        root->right = insert(root->right, value);
    }

    return root;
}

bool search(Node* root, int value)
{
    if (root == nullptr)
    {
        return false;
    }

    if (root->data == value)
    {
        return true;
    }

    if (value < root->data)
    {
        return search(root->left, value);
    }

    return search(root->right, value);
}

Node* findMin(Node* root)
{
    Node* current = root;

    while (current->left != nullptr)
    {
        current = current->left;
    }

    return current;
}

Node* deleteNode(Node* root, int value)
{
    if (root == nullptr)
    {
        return nullptr;
    }

    if (value < root->data)
    {
        root->left = deleteNode(root->left, value);
    }
    else if (value > root->data)
    {
        root->right = deleteNode(root->right, value);
    }
    else
    {
        if (root->left == nullptr && root->right == nullptr)
        {
            delete root;
            return nullptr;
        }

        if (root->left == nullptr)
        {
            Node* temp = root->right;
            delete root;
            return temp;
        }

        if (root->right == nullptr)
        {
            Node* temp = root->left;
            delete root;
            return temp;
        }

        Node* successor = findMin(root->right);

        root->data = successor->data;

        root->right = deleteNode(root->right, successor->data);
    }

    return root;
}

void inorder(Node* root)
{
    if (root == nullptr)
    {
        return;
    }
    inorder(root->left);
    cout << root->data << " ";
    inorder(root->right);
}
int main()
{
    Node* root = nullptr;
    vector<int> values = {50, 30, 70, 20, 40, 60, 80};
    for (int value : values)
    {
        root = insert(root, value);
    }
    cout << "Inorder Traversal: ";
    inorder(root);
    cout << endl;

    cout << "Search 40: " << search(root, 40) << endl;
    cout << "Search 100: " << search(root, 100) << endl;

    root = deleteNode(root, 20);
    root = deleteNode(root, 30);
    root = deleteNode(root, 50);

    cout << "Inorder After Deletions: ";
    inorder(root);
    cout << endl;

    return 0;
}
```
---

## Operations Complexity

| Operation         | Time Complexity | Space Complexity |
| ----------------- | --------------- | ---------------- |
| Insert            | O(h)            | O(h) Recursive   |
| Search            | O(h)            | O(h) Recursive   |
| Delete            | O(h)            | O(h) Recursive   |
| Inorder Traversal | O(n)            | O(h)             |
| Find Minimum      | O(h)            | O(1)             |

Where:
* **n** = number of nodes
* **h** = height of BST
  * Balanced BST → O(log n)
  * Skewed BST → O(n)
---

## Deletion Visualization
### Initial BST
```text
          50
        /    \
      30      70
     /  \    /  \
   20   40 60   80
```

### Delete 20 (Leaf Node)
```text
          50
        /    \
      30      70
        \    /  \
        40 60   80
```

### Delete 30 (One Child)
```text
          50
        /    \
      40      70
             /  \
           60   80
```

### Delete 50 (Two Children)
Successor = Minimum in right subtree = 60
Replace 50 with 60
```text
          60
        /    \
      40      70
                \
                80
```

### Inorder Output
```text
40 60 70 80
```
This pseudocode directly maps to **C++, Java, and Python** with almost no structural changes.
