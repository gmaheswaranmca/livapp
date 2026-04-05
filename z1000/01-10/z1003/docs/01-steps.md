# Mysql

## Prerequisite
```
# Run docker daemon
dockerd &
```

## Using Mysql compose
```
# Up mysql docker
docker compose up --build -d

# Connect to mysql shell
docker compose exec z1003_mysql_box mysql -u root -p

# (enter password when prompted → root123)

# Clean up mysql docker
docker compose down
```

## Using Docker Command 
```
# Run MySQL Container
docker run -d \
  --name z1003_mysql_box \
  --restart always \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=root123 \
  -e MYSQL_DATABASE=mydb \
  -e MYSQL_USER=user1 \
  -e MYSQL_PASSWORD=user123 \
  -v mysql_z1003_data:/var/lib/mysql \
  mysql:8

# Test connectivity 
# Connect to mysql shell 
docker exec -it z1003_mysql_box mysql -u root -p

# (enter password when prompted → root123)

# Cleanup
docker stop z1003_mysql_box
docker rm z1003_mysql_box

docker volume rm mysql_z1003_data
```

## Load mysql image from local file
```
# Progress Viewer (only once per ubuntu)
# sudo apt install pv

# pull image from docker
docker pull mysql:8

# save image locally as .tar
docker save -o mysql_8.tar mysql:8 
or
docker save mysql:8 | pv > mysql_8.tar

# zip the tar
gzip mysql_8.tar

# unzip the .tar.gz
gunzip mysql_8.tar.gz

# load image to docker
docker load -i mysql_8.tar
or 
pv mysql_8.tar | docker load

# To see the version of mysql
docker run --rm mysql:8 mysql --version
```
# Versions
```bash
docker run --rm mongo:7.0 mongod --version

docker run --rm cassandra:4.1 cassandra -v
#
docker run --rm mysql:8 mysql --version

docker run --rm postgres:16.2 postgres --version

docker run --rm mcr.microsoft.com/mssql/server:2022-latest mssql --version

docker run gvenzl/oracle-xe:21-slim oracle --version
#
docker run --rm node:20.11 node -v
docker run --rm node:20.11 npm -v

docker run --rm python:3.12 python --version
docker run --rm python:3.12 pip --version

docker run --rm eclipse-temurin:21-jdk java --version

docker run --rm mcr.microsoft.com/dotnet/sdk:8.0 dotnet --version
```

# Try [imgName, imgFileName.tar]

docker pull mcr.microsoft.com/dotnet/sdk:8.0

docker save -o dotnet_8_0.tar mcr.microsoft.com/dotnet/sdk:8.0
or
docker save mcr.microsoft.com/dotnet/sdk:8.0 | pv > dotnet_8_0.tar

docker run --rm mcr.microsoft.com/dotnet/sdk:8.0 dotnet --version

docker load -i dotnet_8_0.tar
or
pv dotnet_8_0.tar | docker load

# Pull cmds
```
docker pull mysql:8.0.36

docker pull postgres:16.2

docker pull mongo:7.0

docker pull cassandra:4.1

docker login container-registry.oracle.com
docker pull container-registry.oracle.com/database/express:21.3.0-xe

docker pull mcr.microsoft.com/mssql/server:2022-latest
OR
docker pull mcr.microsoft.com/mssql/server:2022-CU14-ubuntu-22.04

docker pull node:20.11

docker pull openjdk:21-jdk
OR
docker pull eclipse-temurin:21-jdk

docker pull eclipse-temurin:21-jdk

.NET / C#
docker pull mcr.microsoft.com/dotnet/sdk:8.0
Runtime:
docker pull mcr.microsoft.com/dotnet/aspnet:8.0
```

Classroom setup:
```
# Databases
docker pull mysql:8.0.36
docker pull postgres:16.2
docker pull mongo:7.0
docker pull cassandra:4.1

# Enterprise DBs
docker pull mcr.microsoft.com/mssql/server:2022-latest

docker pull container-registry.oracle.com/database/express:21.3.0-xe
OR
docker pull gvenzl/oracle-xe:21-slim

container-registry.oracle.com/...xe     ~6 GB
gvenzl/oracle-xe:full                   ~3 GB
gvenzl/oracle-xe:latest                 ~1.4 GB
gvenzl/oracle-xe:21-slim                ~720 MB


# Runtimes
docker pull node:20.11
docker pull python:3.12
docker pull eclipse-temurin:21-jdk  #open jdk 21
docker pull mcr.microsoft.com/dotnet/sdk:8.0
```