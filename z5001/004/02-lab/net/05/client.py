import socket
import argparse
import json

HOST = "127.0.0.1"
PORT = 5000

parser = argparse.ArgumentParser()

parser.add_argument("a", type=float)
parser.add_argument("b", nargs="?", type=float)

parser.add_argument(
    "--op",
    default="+",
    help="+ - * / %% sqr cube sqrt"
)

args = parser.parse_args()

req = { "op": args.op, "a": args.a }
if args.b is not None:
    req["b"] = args.b
    
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((HOST, PORT))
sock.send(json.dumps(req).encode())

resp = json.loads(sock.recv(4096).decode())

if resp["status"] == "ok":
    print("Result =", resp["result"])
else:
    print("Error :", resp["message"])

sock.close()