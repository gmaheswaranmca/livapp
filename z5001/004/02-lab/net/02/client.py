# client.py
import socket

HOST = "127.0.0.1"
PORT = 5000

# client instantiation
client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# connect to the client
client.connect((HOST, PORT))

print("Connected to server")

# request the server
while True:
    msg = input("You: ")
    if msg.lower() == "exit":
        break
    client.send(msg.encode())
    reply = client.recv(1024)
    print("Server:", reply.decode())
client.close()