# Demo
```
# Server
python server.py

# Server Output 
Calculator Server Started
('127.0.0.1', 50526) connected
('127.0.0.1', 50526) disconnected
('127.0.0.1', 50528) connected
('127.0.0.1', 50528) disconnected
('127.0.0.1', 50530) connected
('127.0.0.1', 50530) disconnected
^C
Calculator Server Stopped

# Client
python client.py 10 20
Result = 30.0
python client.py 20 10 --op -
Result = 10.0
python client.py 8 --op sqr
Result = 64.0
```