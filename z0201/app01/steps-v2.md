


# Dir Structure
```
services/
├── .env
├── docker-compose.yml
├── shared-lib/
│   ├── package.json
│   └── src/
│       └── correlation.ts
├── gateway/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       └── index.ts
├── order-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── src/index.ts
├── inventory-service/
├── payment-service/
└── shipping-service/
```

# services/.env

```dotenv id="4"
POSTGRES_USER=appuser
POSTGRES_PASSWORD=apppassword
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

POSTGRES_DB=appdb
ORDER_DB=orderdb
INVENTORY_DB=inventorydb
PAYMENT_DB=paymentdb
SHIPPING_DB=shippingdb

REDIS_HOST=redis
REDIS_PORT=6379

KAFKA_BROKER=kafka:9092

GATEWAY_PORT=8080

ORDER_PORT=5000
INVENTORY_PORT=5001
PAYMENT_PORT=5002
SHIPPING_PORT=5003
```

# services/db-init/init.sql
```sql
CREATE SCHEMA order_schema;
CREATE SCHEMA inventory_schema;
CREATE SCHEMA payment_schema;
CREATE SCHEMA shipping_schema;
```

```js
// ORDER_DATABASE_URL=postgresql://appuser:apppassword@postgres:5432/orderdb
/*
import os

db_user = os.getenv("POSTGRES_USER")
db_pass = os.getenv("POSTGRES_PASSWORD")
db_host = os.getenv("POSTGRES_HOST")
db_port = os.getenv("POSTGRES_PORT")
db_name = os.getenv("ORDER_DB")

DATABASE_URL = f"postgresql://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}"
*/
```

# services/docker-compose.yml
```yaml id="5"
services:
  gateway:
    build: ./gateway
    container_name: gateway
    env_file: .env
    ports:
      - "8080:8080"
    depends_on:
      - order-service

  order-service:
    build: ./order-service
    container_name: order-service
    env_file: .env
    ports:
      - "5000:5000"
    depends_on:
      - postgres
      - redis
      - kafka

  inventory-service:
    build: ./inventory-service
    container_name: inventory-service
    env_file: .env
    ports:
      - "5001:5001"
    depends_on:
      - postgres

  payment-service:
    build: ./payment-service
    container_name: payment-service
    env_file: .env
    ports:
      - "5002:5002"
    depends_on:
      - postgres

  shipping-service:
    build: ./shipping-service
    container_name: shipping-service
    env_file: .env
    ports:
      - "5003:5003"
    depends_on:
      - postgres

  postgres:
    image: postgres:16
    container_name: postgres

    environment:
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: apppassword
      POSTGRES_DB: appdb

    ports:
      - "5432:5432"

    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./db-init:/docker-entrypoint-initdb.d

  redis:
    image: redis:7
    container_name: redis
    ports:
      - "6379:6379"

  kafka:
    image: bitnami/kafka:latest
    container_name: kafka
    ports:
      - "9092:9092"
    environment:
      KAFKA_CFG_NODE_ID: 1
      KAFKA_CFG_PROCESS_ROLES: controller,broker
      KAFKA_CFG_CONTROLLER_LISTENER_NAMES: CONTROLLER
      KAFKA_CFG_LISTENERS: PLAINTEXT://:9092,CONTROLLER://:9093
      KAFKA_CFG_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092
      KAFKA_CFG_CONTROLLER_QUORUM_VOTERS: 1@kafka:9093
      KAFKA_CFG_AUTO_CREATE_TOPICS_ENABLE: "true"
      ALLOW_PLAINTEXT_LISTENER: "yes"

volumes:
  postgres_data:
```

# Continuing Commands:
```bash
# Check node 
node -v
npm -v

# WSL List distributions 
wsl -l -v

# Start distribution "mern_dockr"
wsl -d mern_dockr

# Check docker 
docker -v
docker compose version

# Run Docker 
dockerd &

# Open another terminal
cd \z0201\app01\services

# Start distribution "mern_dockr"
wsl -d mern_dockr 


```