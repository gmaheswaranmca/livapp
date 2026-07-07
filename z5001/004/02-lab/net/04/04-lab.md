# Demo
```
# Terminal 1
python server.py

# Server Output @ Terminal 1
Server listening on 127.0.0.1:5000

Commands
--------
clients
reply <id> <message>
end <id>
shutdown
help

Admin> [1] Connected ('127.0.0.1', 50522)
[2] Connected ('127.0.0.1', 50524)
Client 1 : 101
Client 2 : 201
Admin> reply 1 102
Admin> reply 2 202
Admin>
Client 1 : 103
Client 2 : 203
Admin> shutdown
Shutting down server...
[2] Disconnected
[1] Disconnected
Ctrl+C

# Terminal 2
python client.py

# Client Output @ Terminal 2
Connected
You : 101
Server: 102
You : 103
Server shutting down.
Disconnected

# Terminal 3
python client.py

# Client Output @ Terminal 3
Connected
You : 201
Server: 202
You : 203
Server shutting down.
Disconnected
```