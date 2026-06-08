#include<iostream>
using namespace std;

//===== Declare Imports here if required =====


//===== Declare Global Variables / Functions here if required =====


class Node{
public:
    int data;
    Node* next;
    Node(int val){
        data = val;
        next = NULL;
    }
};

//===== Declare Local Variables / Functions here if required =====


void solve(int N){

    Node* head = NULL;
    Node* tail = NULL;

    for(int i=0;i<N;i++){
        int x;
        cin >> x;

        //===== Write Your Logic Here =====
        Node* node = new Node(x);
        if(head == NULL) {
            head = node;
            tail = node;
        } else {
            tail->next = node;
            tail = node;
        }
    }

    //===== Write Your Logic Here =====
    Node* e = head;
    while(e != NULL) {
        if(e != head) {
            cout << " ";
        }
        cout << e->data;
        e = e->next;
    }

}

int main(){

    int N;
    cin >> N;

    solve(N);

    return 0;
}