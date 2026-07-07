# Demo
```
# Help
python tool.py -h
usage: tool.py [-h] [--version] {backup,ping,cleanup,info,upload} ...

# Version
python tool.py --version
Tool Version 1.0

# Backup
python tool.py backup report.pdf backup/
## Verbose
python tool.py backup report.pdf backup/ -v

# Ping
python tool.py ping google.com
## Specify packet count
python tool.py ping google.com -c 10

# Cleanup
## Default extension (.tmp)
python tool.py cleanup logs
## Specific extension using choices
python tool.py cleanup logs -e .log
## Dry run
python tool.py cleanup logs --dry-run

# Info
python tool.py info
# Detailed
python tool.py info -v

# Upload (required options)
python tool.py upload report.pdf \
    --server http://localhost:8080 \
    --user admin

# Secure upload
python tool.py upload report.pdf \
    --server https://example.com \
    --user admin \
    --secure
```


# Help
python3 tool.py -h
usage: tool.py [-h] [--version] {backup,ping,cleanup,info,upload} ...

# Version
python3 tool.py --version
Tool Version 1.0

# Backup
python3 tool.py backup report.pdf backup/
## Verbose
python3 tool.py backup report.pdf backup/ -v

# Ping
python3 tool.py ping google.com
## Specify packet count
python3 tool.py ping google.com -c 10

# Cleanup
## Default extension (.tmp)
python3 tool.py cleanup logs
## Specific extension using choices
python3 tool.py cleanup logs -e .log
## Dry run
python3 tool.py cleanup logs --dry-run

# Info
python3 tool.py info
# Detailed
python3 tool.py info -v

# Upload (required options)
python3 tool.py upload report.pdf \
    --server http://localhost:8080 \
    --user admin

# Secure upload
python3 tool.py upload report.pdf \
    --server https://example.com \
    --user admin \
    --secure