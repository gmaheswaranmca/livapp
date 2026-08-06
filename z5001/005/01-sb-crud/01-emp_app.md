# Spring Boot + MongoDB Employee CRUD API
## Setup
### 1. Prerequisites

Install the following:

| Software                 | Version |
| ------------------------ | ------- |
| Java                     | 21      |
| Maven                    | 3.9+    |
| MongoDB Community Server | Latest  |
| VS Code / IntelliJ IDEA  | Latest  |
| Postman                  | Latest  |

### 2. Verify Installation
```bash
# 1. Java
java --version

# Example
openjdk 21

# 2. Maven
mvn -version

# Example
Apache Maven 3.9.x
Java version: 21

# 3. MongoDB
# Start MongoDB.
## Windows
net start MongoDB
## or Bash
mongod

# Check
mongosh

# Create database
use employeedb
```

### 3. Create Spring Boot Project

Go to **[https://start.spring.io](https://start.spring.io)**

Choose:
```
Project
    Maven

Language
    Java

Spring Boot
    3.5.x

Java
    21

Group
    com.example

Artifact
    employee-api

Packaging
    Jar
```

Add Dependencies

Select

```
Spring Web

Spring Data MongoDB

Spring Boot DevTools
```

Click
```
Generate
```

Extract the ZIP.

### 4. Open Project

VS Code

```bash
code employee-api
```

### 5. Project Structure

```
employee-api
│
├── src
│   ├── main
│   │    ├── java
│   │    │      └── com.example.employeeapi
│   │    │
│   │    ├── controller
│   │    ├── model
│   │    ├── repository
│   │    └── EmployeeApiApplication.java
│   │
│   └── resources
│         application.properties
│
└── pom.xml
```

### 6. Configure MongoDB

`src/main/resources/application.properties`

```properties
spring.application.name=employee-api

spring.data.mongodb.uri=mongodb://localhost:27017/employeedb
```

### 7. Create Packages

Create

```
controller

model

repository
```

### 8. Add Classes

Create

```
Employee.java

EmployeeRepository.java

EmployeeController.java
```

### 9. Run Project

Using Maven

```bash
mvn spring-boot:run
```

or

```bash
./mvnw spring-boot:run
```

Windows

```bash
mvnw.cmd spring-boot:run
```

### 10. Verify

Open

```
http://localhost:8080/employees
```

Initially

```json
[]
```

This means the API is running.

### 11. Test APIs

```
1. Create Employee
POST http://localhost:8080/employees
Body
{
    "name":"Mahesh",
    "jobTitle":"Developer",
    "salary":60000
}


2. Get All

GET http://localhost:8080/employees


3. Get One

GET http://localhost:8080/employees/{id}

4. Update

PUT http://localhost:8080/employees/{id}

5. Delete

DELETE http://localhost:8080/employees/{id}
```