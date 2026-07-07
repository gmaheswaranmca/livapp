import socket

HOST = "127.0.0.1"
PORT = 5000

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect((HOST, PORT))

print("Connected")
while True:
    msg = input("You: ")
    client.send(msg.encode())
    # Client requested end
    if msg.upper() == "END":
        print("Conversation ended.")
        break
    reply = client.recv(1024)
    if not reply:
        break
    reply = reply.decode()
    # Server ended conversation
    if reply == "END":
        print("Server ended the conversation.")
        break
    # Entire server shutting down
    if reply == "SERVER_SHUTDOWN":
        print("Server is shutting down.")
        break
    print("Server:", reply)
client.close()
print("Disconnected")