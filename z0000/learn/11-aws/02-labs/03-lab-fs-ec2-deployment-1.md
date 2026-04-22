# architecture
```
1. Rent server and os
2. Install runtime, deploy apps
    > MERN App (arch1)
        client -> server -> db
        server-1 -> server-1 -> cloud-mongo
        > Client (Frontend) App - server-1         server oriented
        > Server (Backend) App  - server-1         server oriented
        > Database              - cloud-mongo      serverless
    > MERN App (arch2)
        client -> server -> db
        server-1 -> server-2 -> cloud-mongo
        > Client (Frontend) App - server-2         server oriented
        > Server (Backend) App  - server-1         server oriented        
        > Database              - cloud-mongo      serverless
    > MERN App (arch3)
        client -> server -> db
        s3 -> server-2 -> cloud-mongo        
        > Client (Frontend) App - s3               serverless
        > Server (Backend) App  - server-1         server oriented
        > Database              - cloud-mongo      serverless
```

# Deployment 1 (arch1)
```
> MERN App (arch1)
    client -> server -> db
    server-1 -> server-1 -> cloud-mongo
    > Client (Frontend) App - server-1         server oriented
    > Server (Backend) App  - server-1         server oriented
    > Database              - cloud-mongo      serverless
```
## Steps
```
1. Setup Server
```