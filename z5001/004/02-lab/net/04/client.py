import socket

HOST = "127.0.0.1"
PORT = 5000

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect((HOST, PORT))

print("Connected")

while True:

    msg = input("You : ")

    client.send(msg.encode())

    if msg.upper() == "END":
        break

    reply = client.recv(1024).decode()

    if reply == "END":
        print("Server ended conversation.")
        break

    if reply == "SERVER_SHUTDOWN":
        print("Server shutting down.")
        break

    print("Server:", reply)

client.close()
print("Disconnected")