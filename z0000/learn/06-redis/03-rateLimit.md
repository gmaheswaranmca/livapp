## What is a Rate Limiter?

A **rate limiter** is a mechanism that **controls how many requests a client can make to your API within a specific time window**.

Think of it like a gatekeeper:

* “You can make **100 requests per minute**”
* If exceeded → **block / delay / reject (429 Too Many Requests)**

---

## Why you NEED it (especially in microservices)

Without rate limiting:

* 🚨 API abuse (bots / brute force attacks)
* 🚨 Server overload (CPU, DB exhaustion)
* 🚨 One user affecting all users (no fairness)

With rate limiting:

* ✅ Protect backend services
* ✅ Ensure fair usage
* ✅ Improve stability

---

## Common Rate Limiting Strategies

### 1. Fixed Window

* Example: 100 requests per minute
* Simple but can burst at window edges

### 2. Sliding Window

* Smooths traffic over time
* More accurate

### 3. Token Bucket (Most used in production)

* Tokens refill over time
* Each request consumes a token

---

## Why Redis for Rate Limiting?

Using Redis:

* ⚡ Extremely fast (in-memory)
* 🔁 Supports atomic operations (INCR, EXPIRE)
* 🌐 Works across multiple microservices instances
* 📊 Centralized throttling

---

## Basic Design (Production mindset)

**Key format (VERY IMPORTANT):**

```
rate_limit:{service}:{userId}:{endpoint}
```

**Example:**

```
rate_limit:trainer-service:user123:/createTrainer
```

---

## Middleware Flow

1. Identify user (IP / JWT userId)
2. Build Redis key
3. Increment request count
4. Set expiry (time window)
5. If limit exceeded → reject

---

## Node.js + Express + Redis Implementation

### Install dependencies

```bash
npm install redis
```

---

### Redis Client Setup

```js
// redisClient.js
import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.error('Redis Error', err));

await redisClient.connect();

export default redisClient;
```

---

### Rate Limiter Middleware

```js
// rateLimiter.js
import redisClient from './redisClient.js';

const WINDOW_SIZE_IN_SECONDS = 60;   // 1 minute
const MAX_REQUESTS = 100;

export const rateLimiter = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.ip; // JWT or fallback IP

    const key = `rate_limit:trainer-service:${userId}:${req.path}`;

    const current = await redisClient.incr(key);

    if (current === 1) {
      await redisClient.expire(key, WINDOW_SIZE_IN_SECONDS);
    }

    if (current > MAX_REQUESTS) {
      return res.status(429).json({
        message: 'Too many requests. Please try again later.'
      });
    }

    next();
  } catch (err) {
    console.error('Rate limiter error:', err);
    next(); // fail open (important for production)
  }
};
```

---

### Use in Express App

```js
import express from 'express';
import { rateLimiter } from './rateLimiter.js';

const app = express();

app.use(rateLimiter);

app.get('/api/trainers', (req, res) => {
  res.send('Trainer data');
});

app.listen(3000, () => console.log('Server running'));
```

---

## Advanced (Corporate-Level Improvements)

### 1. Different limits per API

```js
const limits = {
  '/login': 5,
  '/createTrainer': 10,
  default: 100
};
```

---

### 2. Use Sliding Window (better accuracy)

Use Redis sorted sets (`ZADD`, `ZCOUNT`, `ZREMRANGEBYSCORE`)

---

### 3. Global + User-Level Limiting

* Global → protect system
* User → fairness

---

### 4. NGINX + Redis combo (Best practice)

* NGINX → edge rate limiting
* Redis → distributed control

---

### 5. Return headers (important for frontend)

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1712345678
```

---

## Real Microservices Example

For your setup:

* **API Gateway (NGINX)** → coarse rate limit
* **Auth Service** → strict login limits
* **Trainer Service** → moderate limits

---

## Key Takeaway

Rate limiting is not optional in production.

* Start simple → `INCR + EXPIRE`
* Scale → sliding window / token bucket
* Always use Redis in distributed systems

---

If you want next step, I can give you:

👉 Sliding Window implementation (production-grade)
👉 Token Bucket with Lua script (used in big tech)
👉 Redis cluster setup for 600+ users (your use case)
