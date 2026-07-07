### Demo 1
```
# Terminal 1
python server.py

# Server Output @ Terminal 1
Server listening...
Waiting for a client...

# Terminal 2
python client.py

# Client Output @ Terminal 2
Connected to server

# Server Output @ Terminal 1
Connected ('127.0.0.1', 53110)
```

# Demo 2
```
# Terminal 3
python client.py

# Problem
## Students expect 
Connected

## Instead...
    - It hangs.
Nothing happens.

## Why?
The server is **busy serving Client A** @ Terminal 2
Because the server is serving by infinity loop
It never returns to "   accept()"
```



# Socket APIs Covered
Server
```
socket.socket()
bind()
listen()
accept()
recv()
send()
close()
```

Client
```
socket.socket()
connect()
send()
recv()
close()
```

This progression (single-threaded server → blocked clients → threaded server) is an excellent exercise because we first experience the problem before learning the solution.