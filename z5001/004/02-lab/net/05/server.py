import socket
import threading
import json
import math

HOST = "0.0.0.0"
PORT = 5000

def calculate(req):
    op = req["op"]
    if op in ["+", "-", "*", "/", "%"]:
        a = req["a"]
        b = req["b"]
        if op == "+":
            return a + b
        elif op == "-":
            return a - b
        elif op == "*":
            return a * b
        elif op == "/":
            if b == 0:
                raise Exception("Division by zero")
            return a / b
        elif op == "%":
            if b == 0:
                raise Exception("Division by zero")
            return a % b
    elif op == "sqr":
        return req["a"] ** 2
    elif op == "cube":
        return req["a"] ** 3
    elif op == "sqrt":
        if req["a"] < 0:
            raise Exception("Negative number")
        return math.sqrt(req["a"])
    else:
        raise Exception("Unknown operation")

def client_handler(conn, addr):
    print(f"{addr} connected")
    while True:
        try:
            data = conn.recv(4096)
            if not data:
                break
            req = json.loads(data.decode())
            try:
                result = calculate(req)
                response = {"status": "ok",  "result": result}
            except Exception as e:
                response = {"status": "error", "message": str(e)}
            conn.send(json.dumps(response).encode())
        except Exception:
            break
    conn.close()
    print(f"{addr} disconnected")

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind((HOST, PORT))
server.listen()

print("Calculator Server Started")
try:
    while True:
        conn, addr = server.accept()
        t = threading.Thread(target=client_handler, args=(conn, addr), daemon=True)
        t.start()
except KeyboardInterrupt:
    print("Calculator Server Stopped")