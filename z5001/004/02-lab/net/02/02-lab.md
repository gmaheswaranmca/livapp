# Demo
```
# Terminal 1
python server.py

# Server Output @ Terminal 1
Server started...
('127.0.0.1', 50506) connected
('127.0.0.1', 50506): Hi
Reply to ('127.0.0.1', 50506): Hello
('127.0.0.1', 50508) connected
('127.0.0.1', 50508): GoodEve
Reply to ('127.0.0.1', 50508): Yes Good Eve
('127.0.0.1', 50508) disconnected
('127.0.0.1', 50506) disconnected

# Terminal 2
python client.py

# Client Output @ Terminal 2
Connected to server
You: Hi
Server: Hello
You:
Ctrl + C

# Terminal 3
python client.py

# Client Output @ Terminal 3
Connected to server
You: GoodEve
Server: Yes Good Eve
You:
Ctrl + C
```