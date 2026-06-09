# 1. Create a Linked List (Singly Linked List)

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Node {
public:
    int data;
    Node* next;

    Node(int val) {
        data = val;
        next = nullptr;
    }
};

int main() {
    int N;
    cin >> N;

    vector<int> arr(N);
    for (int i = 0; i < N; i++)
        cin >> arr[i];

    Node* head = nullptr;
    Node* tail = nullptr;

    for (int x : arr) {
        Node* newNode = new Node(x);

        if (head == nullptr) {
            head = newNode;
            tail = newNode;
        } else {
            tail->next = newNode;
            tail = newNode;
        }
    }

    Node* temp = head;
    while (temp != nullptr) {
        if (temp != head)
            cout << " ";
        cout << temp->data;
        temp = temp->next;
    }

    return 0;
}
```

---

# 2. Insert at End (Singly Linked List)

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Node {
public:
    int data;
    Node* next;

    Node(int val) {
        data = val;
        next = nullptr;
    }
};

void printList(Node* head) {
    Node* temp = head;

    while (temp) {
        cout << temp->data;

        if (temp->next)
            cout << " ";

        temp = temp->next;
    }
}

int main() {
    int N;
    cin >> N;

    vector<int> arr(N);
    for (int i = 0; i < N; i++)
        cin >> arr[i];

    int X;
    cin >> X;

    Node* head = nullptr;
    Node* tail = nullptr;

    for (int x : arr) {
        Node* newNode = new Node(x);

        if (!head) {
            head = tail = newNode;
        } else {
            tail->next = newNode;
            tail = newNode;
        }
    }

    Node* newNode = new Node(X);

    if (!head) {
        head = tail = newNode;
    } else {
        tail->next = newNode;
        tail = newNode;
    }

    printList(head);

    return 0;
}
```

---

# 3. Insert at Given Position (Singly Linked List)

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Node {
public:
    int data;
    Node* next;

    Node(int val) {
        data = val;
        next = nullptr;
    }
};

void printList(Node* head) {
    Node* temp = head;

    while (temp) {
        cout << temp->data;

        if (temp->next)
            cout << " ";

        temp = temp->next;
    }
}

int main() {
    int N;
    cin >> N;

    vector<int> arr(N);
    for (int i = 0; i < N; i++)
        cin >> arr[i];

    int X, position;
    cin >> X;
    cin >> position;

    Node* head = nullptr;
    Node* tail = nullptr;

    for (int x : arr) {
        Node* newNode = new Node(x);

        if (!head) {
            head = tail = newNode;
        } else {
            tail->next = newNode;
            tail = newNode;
        }
    }

    if (position == 1) {
        Node* newNode = new Node(X);
        newNode->next = head;
        head = newNode;
    } else {
        Node* temp = head;
        int i = 1;

        while (temp && i < position - 1) {
            temp = temp->next;
            i++;
        }

        if (temp) {
            Node* newNode = new Node(X);
            newNode->next = temp->next;
            temp->next = newNode;
        }
    }

    printList(head);

    return 0;
}
```

---

# 4. Delete First Node (Singly Linked List)

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Node {
public:
    int data;
    Node* next;

    Node(int val) {
        data = val;
        next = nullptr;
    }
};

int main() {
    int N;
    cin >> N;

    vector<int> arr(N);
    for (int i = 0; i < N; i++)
        cin >> arr[i];

    Node* head = nullptr;
    Node* tail = nullptr;

    for (int x : arr) {
        Node* newNode = new Node(x);

        if (!head) {
            head = tail = newNode;
        } else {
            tail->next = newNode;
            tail = newNode;
        }
    }

    if (head) {
        Node* temp = head;
        head = head->next;
        delete temp;
    }

    Node* curr = head;

    while (curr) {
        if (curr != head)
            cout << " ";

        cout << curr->data;
        curr = curr->next;
    }

    return 0;
}
```

---

# 5. Search an Element (Singly Linked List)

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Node {
public:
    int data;
    Node* next;

    Node(int val) {
        data = val;
        next = nullptr;
    }
};

int main() {
    int N;
    cin >> N;

    vector<int> arr(N);
    for (int i = 0; i < N; i++)
        cin >> arr[i];

    int X;
    cin >> X;

    Node* head = nullptr;
    Node* tail = nullptr;

    for (int x : arr) {
        Node* newNode = new Node(x);

        if (!head) {
            head = tail = newNode;
        } else {
            tail->next = newNode;
            tail = newNode;
        }
    }

    bool found = false;

    Node* temp = head;

    while (temp) {
        if (temp->data == X) {
            found = true;
            break;
        }
        temp = temp->next;
    }

    cout << (found ? "true" : "false");

    return 0;
}
```

---

# 6. Create a Doubly Linked List

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Node {
public:
    int data;
    Node* prev;
    Node* next;

    Node(int val) {
        data = val;
        prev = nullptr;
        next = nullptr;
    }
};

int main() {
    int N;
    cin >> N;

    vector<int> values(N);

    for (int i = 0; i < N; i++)
        cin >> values[i];

    Node* head = nullptr;
    Node* tail = nullptr;

    for (int val : values) {
        Node* newNode = new Node(val);

        if (!head) {
            head = tail = newNode;
        } else {
            tail->next = newNode;
            newNode->prev = tail;
            tail = newNode;
        }
    }

    Node* temp = head;

    while (temp) {
        if (temp != head)
            cout << " ";

        cout << temp->data;
        temp = temp->next;
    }

    return 0;
}
```

---

# 7. Reverse a Linked List

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Node {
public:
    int data;
    Node* next;

    Node(int val) {
        data = val;
        next = nullptr;
    }
};

int main() {
    int N;
    cin >> N;

    vector<int> values(N);

    for (int i = 0; i < N; i++)
        cin >> values[i];

    Node* head = nullptr;
    Node* tail = nullptr;

    for (int val : values) {
        Node* newNode = new Node(val);

        if (!head) {
            head = tail = newNode;
        } else {
            tail->next = newNode;
            tail = newNode;
        }
    }

    Node* prev = nullptr;
    Node* curr = head;

    while (curr) {
        Node* nextNode = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextNode;
    }

    head = prev;

    Node* temp = head;

    while (temp) {
        if (temp != head)
            cout << " ";

        cout << temp->data;
        temp = temp->next;
    }

    return 0;
}
```

---

# 8. Split Circular Linked List into Two Halves

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Node {
public:
    int data;
    Node* next;

    Node(int val) {
        data = val;
        next = nullptr;
    }
};

pair<Node*, Node*> splitList(Node* head) {
    Node* slow = head;
    Node* fast = head;

    while (fast->next != head &&
           fast->next->next != head) {
        slow = slow->next;
        fast = fast->next->next;
    }

    if (fast->next->next == head)
        fast = fast->next;

    Node* head1 = head;
    Node* head2 = slow->next;

    slow->next = head1;
    fast->next = head2;

    return {head1, head2};
}

void printCircular(Node* head) {
    if (!head) return;

    Node* temp = head;

    do {
        cout << temp->data;
        temp = temp->next;

        if (temp != head)
            cout << " ";

    } while (temp != head);

    cout << endl;
}

int main() {
    int n;
    cin >> n;

    vector<int> arr(n);

    for (int i = 0; i < n; i++)
        cin >> arr[i];

    Node* head = nullptr;

    if (n > 0) {
        head = new Node(arr[0]);
        Node* temp = head;

        for (int i = 1; i < n; i++) {
            temp->next = new Node(arr[i]);
            temp = temp->next;
        }

        temp->next = head;
    }

    auto result = splitList(head);

    printCircular(result.first);
    printCircular(result.second);

    return 0;
}
```

---

# 9. Detect Cycle in Linked List (Floyd's Algorithm)

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Node {
public:
    int data;
    Node* next;

    Node(int val) {
        data = val;
        next = nullptr;
    }
};

int main() {
    int N;
    cin >> N;

    vector<int> arr(N);

    for (int i = 0; i < N; i++)
        cin >> arr[i];

    int pos;
    cin >> pos;

    Node* head = nullptr;
    Node* tail = nullptr;
    vector<Node*> nodes;

    for (int x : arr) {
        Node* newNode = new Node(x);
        nodes.push_back(newNode);

        if (!head) {
            head = tail = newNode;
        } else {
            tail->next = newNode;
            tail = newNode;
        }
    }

    if (pos != -1)
        tail->next = nodes[pos];

    Node* slow = head;
    Node* fast = head;

    bool found = false;

    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;

        if (slow == fast) {
            found = true;
            break;
        }
    }

    cout << (found ? "true" : "false");

    return 0;
}
```
