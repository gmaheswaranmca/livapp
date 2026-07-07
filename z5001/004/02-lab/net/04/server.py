# server.py
import socket
import threading
import queue

HOST = "127.0.0.1"
PORT = 5000
running = True

clients = {}          # client_id -> socket
addresses = {}        # client_id -> address
next_client_id = 1

message_queue = queue.Queue()
# -----------------------------
# Client Thread
# -----------------------------
def handle_client(client_id, client):
    global running
    addr = addresses[client_id]
    print(f"[{client_id}] Connected {addr}")
    while running:
        try:
            data = client.recv(1024)
            if not data:
                break
            msg = data.decode()
            message_queue.put((client_id, msg))
            if msg.upper() == "END":
                break
        except:
            break
    clients.pop(client_id, None)
    addresses.pop(client_id, None)
    client.close()
    print(f"[{client_id}] Disconnected")

# -----------------------------
# Printer Thread
# -----------------------------
def printer():
    while running:
        try:
            client_id, msg = message_queue.get(timeout=1)
            print(f"\nClient {client_id} : {msg}")
        except queue.Empty:
            pass

# -----------------------------
# Admin Thread
# -----------------------------
def admin():
    global running
    help_text = """
Commands
--------
clients
reply <id> <message>
end <id>
shutdown
help
"""
    print(help_text)
    while running:
        try:
            cmd = input("Admin> ").strip()
        except EOFError:
            break
        if cmd == "":
            continue
        if cmd == "help":
            print(help_text)
        elif cmd == "clients":
            if not clients:
                print("No clients connected.")
            else:
                for cid in clients:
                    print(cid, addresses[cid])
        elif cmd.startswith("reply"):
            parts = cmd.split(maxsplit=2)
            if len(parts) < 3:
                print("Usage: reply <id> <message>")
                continue
            cid = int(parts[1])
            if cid not in clients:
                print("Invalid client")
                continue
            clients[cid].send(parts[2].encode())
        elif cmd.startswith("end"):
            parts = cmd.split()
            if len(parts) != 2:
                print("Usage: end <id>")
                continue
            cid = int(parts[1])
            if cid in clients:
                clients[cid].send(b"END")
                clients[cid].close()
        elif cmd == "shutdown":
            running = False
            print("Shutting down server...")
            for c in list(clients.values()):
                try:
                    c.send(b"SERVER_SHUTDOWN")
                    c.close()
                except:
                    pass
            server.close()
            break
        else:
            print("Unknown command")

# -----------------------------
# Main
# -----------------------------
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind((HOST, PORT))
server.listen()
print(f"Server listening on {HOST}:{PORT}")
threading.Thread(target=printer, daemon=True).start()
threading.Thread(target=admin, daemon=True).start()
while running:
    try:
        client, addr = server.accept()
        cid = next_client_id
        next_client_id += 1
        clients[cid] = client
        addresses[cid] = addr
        threading.Thread(target=handle_client, args=(cid, client), daemon=True).start()
    except:
        break
print("Server stopped.")