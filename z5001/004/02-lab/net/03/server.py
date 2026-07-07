import socket
import threading

HOST = "127.0.0.1"
PORT = 5000

clients = []
running = True

def handle_client(client, address):
    print(f"{address} connected")
    clients.append(client)
    try:
        while running:
            data = client.recv(1024)
            if not data:
                break
            message = data.decode()
            print(f"{address}: {message}")
            # Client ends conversation
            if message.upper() == "END":
                client.send("END".encode())
                break
            reply = input(f"Reply to {address}: ")
            client.send(reply.encode())
            # Server ends conversation
            if reply.upper() == "END":
                break
    except:
        pass
    if client in clients:
        clients.remove(client)
    client.close()
    print(f"{address} disconnected")

def admin_console():
    global running
    while running:
        cmd = input("Admin> ")
        if cmd.upper() == "SHUTDOWN":
            running = False
            print("Stopping server...")
            for c in clients:
                try:
                    c.send("SERVER_SHUTDOWN".encode())
                    c.close()
                except:
                    pass
            server.close()
            break


server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

server.bind((HOST, PORT))
server.listen(5)

threading.Thread(target=admin_console, daemon=True).start()

print("Server started...")
while running:
    try:
        client, address = server.accept()
        threading.Thread(
            target=handle_client,
            args=(client, address),
            daemon=True
        ).start()
    except:
        break
print("Server stopped.")