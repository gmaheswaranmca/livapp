# threaded_server.py
import socket
import threading

HOST = "127.0.0.1"
PORT = 5000

# client request handler
def handle_client(client, address):
    print(f"{address} connected")
    while True:
        try:
            data = client.recv(1024)
            if not data:
                break
            message = data.decode()
            print(f"{address}: {message}")
            reply = input(f"Reply to {address}: ")
            client.send(reply.encode())
        except:
            break
    client.close()
    print(f"{address} disconnected")


# server instantiation
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind((HOST, PORT))

# listening for client to accept connection
server.listen(5)
print("Server started...")
while True:
    client, address = server.accept()
    thread = threading.Thread(
        target=handle_client,
        args=(client, address)
    )
    thread.start()