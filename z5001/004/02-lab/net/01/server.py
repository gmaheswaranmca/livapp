# server.py
import socket

HOST = "127.0.0.1"
PORT = 5000

# client request handler
def handle_client(client, address):
    print(f"{address} connected")
    while True:
        data = client.recv(1024)
        if not data:
            break
        message = data.decode()
        print(f"{address}: {message}")
        reply = input(f"Reply to {address}: ")
        client.send(reply.encode())
    client.close()
    print(f"{address} disconnected")

# client request handler
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind((HOST, PORT))

# listening for client to accept connection
server.listen(5)
print(f"Server listening on {HOST}:{PORT}")
while True:
    print("\nWaiting for a client...")
    client, address = server.accept()
    handle_client(client, address)
    