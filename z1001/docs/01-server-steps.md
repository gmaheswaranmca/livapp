# Server (Express Typescript)

## Container using Node image 
```
mkdir z1001
cd z1001
mkdir server
cd server
alias node-docker='docker run --rm -it -v ${PWD}:/app -w /app node:20'
node-docker npm init -y
node-docker npm install express mongoose cors dotenv
node-docker npm install -D ts-node-dev typescript
node-docker npm install -D @types/cors
node-docker npm install -D @types/express @types/node 

# ! Node project creation by temp container, and install packages by temp container
# ! After execution of the command, container is removed automatically
```

## Using Node
```
docker compose exec z1001_server_box node
```