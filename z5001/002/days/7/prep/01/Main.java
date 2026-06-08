import java.util.*;

//===== Declare Imports here if required =====


public class Main {

    static class Node {
        int data;
        Node next;

        Node(int val) {
            data = val;
            next = null;
        }
    }

    //===== Declare Global Variables / Functions here if required =====


    static void solve(int N, Scanner sc) {
        Node head = null;
        Node tail = null;

        for (int i = 0; i < N; i++) {
            int x = sc.nextInt();

            //===== Declare Local Variables / Functions here if required =====


            //===== Write Your Logic Here =====
            Node node = new Node(x);
            if(head == null) {
                head = node;
                tail = node;
            }
            else {
                tail.next = node;
                tail = node;
            }
        }
        //===== Write Your Logic Here =====
        Node node = head;
        while( node != null) {
            if(node != head) {
                System.out.print(" ");
            }
            System.out.print(node.data);
            node = node.next;
        }

    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        solve(N, sc);
    }
}