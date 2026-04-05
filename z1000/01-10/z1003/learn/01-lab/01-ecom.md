E-Commerce system Tables/Collections, Problem Statements and Solution on MySQL

# Tables / Collections
```text
users: id, name, email
products: id, name, price, stock
orders: id, user_id, total, created_at
order_items: order_id, product_id, quantity
```

# Data:
```csv
## **users.csv**
id,name,email
1,Arun Kumar,arun@example.com
2,Divya Raj,divya@example.com
3,Vikram Singh,vikram@example.com
4,Meena Lakshmi,meena@example.com
5,Karthik R,karthik@example.com

## **products.csv*
id,name,price,stock
1,Mobile Phone,15000,50
2,Laptop,60000,20
3,Headphones,2000,100
4,Smart Watch,5000,75
5,Keyboard,1500,60

## **orders.csv**
id,user_id,total,created_at
1,1,17000,2026-03-25 10:15:00
2,2,60000,2026-03-26 12:30:00
3,3,3500,2026-03-27 09:45:00
4,1,65000,2026-03-28 14:10:00
5,4,5000,2026-03-29 16:20:00

## **order_items.csv**
order_id,product_id,quantity
1,1,1
1,3,1
2,2,1
3,3,1
3,5,1
4,2,1
4,3,1
5,4,1
```

# 🧠 Practice Problems 
```text
1. Create a database named `ecommerce_db` and switch to it.
2. Create all four tables (`users`, `products`, `orders`, `order_items`) with appropriate data types.
3. Add primary keys to all tables.
4. Modify the `products` table to change `price` to `DECIMAL(10,2)`.
5. Drop and recreate the `order_items` table with proper structure.

6. Insert all given CSV data into respective tables.
7. Update stock of all products by reducing 5 units.
8. Increase price of all products by 10%.
9. Delete users who have not placed any orders.
10. Insert a new order with multiple items.

11. Fetch all users.
12. Fetch all products with price greater than 5000.
13. Retrieve all orders placed by user_id = 1.
14. Display product names and their stock.
15. Find total number of orders.

16. Get products with stock between 50 and 100.
17. Find users whose name starts with 'A'.
18. Retrieve orders placed after a specific date.
19. Find products not in stock (stock = 0).
20. Get orders with total between 3000 and 20000.

21. Calculate average product price.
22. Find maximum and minimum product price.
23. Convert all user names to uppercase.
24. Extract date from `created_at`.
25. Count number of products available.

26. Find total orders per user.
27. Calculate total revenue generated per user.
28. Find number of products sold per product_id.
29. Get users who placed more than 1 order.
30. Find products with total sales quantity > 1.

31. Retrieve orders along with user names.
32. Display order details with product names.
33. Get all products and their order quantities (include products not ordered).
34. Find users who have never placed an order.
35. Retrieve full order summary (user + product + quantity).

36. Find users who placed orders above average order value.
37. Get products whose price is greater than average price.
38. Find the most expensive product purchased in any order.

39. Add foreign key constraints between tables.
40. Add a CHECK constraint to ensure product price > 0.

41. Create an index on `products(name)` and analyze its effect.
42. Create a composite index on `order_items(order_id, product_id)`.

43. Create a view for order summary (user + total + date).
44. Create a view showing product sales summary.

45. Create a stored procedure to fetch orders by user ID.
46. Create a function to calculate total revenue.

47. Write a transaction to insert order and order_items safely.
48. Simulate rollback when stock is insufficient.


49. Rank users based on total purchase using window functions.

50. Redesign the schema to support:
    * product categories
    * multiple addresses per user
    * payment status & methods
```

# Solution 
```sql
-- 1. Create a database named `ecommerce_db` and switch to it.
mysql -u root -p
CREATE DATABASE ecommerce_db;

SHOW databases;
-- 2. Create all four tables (`users`, `products`, `orders`, `order_items`) with appropriate data types.
-- Set Default Database
USE ecommerce_db;

CREATE TABLE users (
    id INT,
    name VARCHAR(100),
    email VARCHAR(100)
);
DESC users;

CREATE TABLE products (
    id INT,
    name VARCHAR(100),
    price INT,
    stock INT
);
DESC products;

CREATE TABLE orders (
    id INT,
    user_id INT,
    total INT,
    created_at DATETIME
);
DESC orders;

CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT
);
DESC order_items;

SHOW TABLES;
SHOW TABLES FROM ecommerce_db;
-- 3. Add primary keys to all tables.
ALTER TABLE users ADD PRIMARY KEY (id);
ALTER TABLE products ADD PRIMARY KEY (id);
ALTER TABLE orders ADD PRIMARY KEY (id);
ALTER TABLE order_items 
ADD PRIMARY KEY (order_id, product_id);

-- 4. Modify the `products` table to change `price` to `DECIMAL(10,2)`.
ALTER TABLE products 
MODIFY price DECIMAL(10,2);

-- 5. Drop and recreate the `order_items` table with proper structure.
DROP TABLE order_items;
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);

-- -

-- 6. Insert all given CSV data into respective tables.
INSERT INTO users (id, name, email) VALUES
(1, 'Arun Kumar', 'arun@example.com'),
(2, 'Divya Raj', 'divya@example.com'),
(3, 'Vikram Singh', 'vikram@example.com'),
(4, 'Meena Lakshmi', 'meena@example.com'),
(5, 'Karthik R', 'karthik@example.com');

SELECT * FROM users;

INSERT INTO products (id, name, price, stock) VALUES
(1, 'Mobile Phone', 15000, 50),
(2, 'Laptop', 60000, 20),
(3, 'Headphones', 2000, 100),
(4, 'Smart Watch', 5000, 75),
(5, 'Keyboard', 1500, 60);

SELECT * FROM products;

INSERT INTO orders (id, user_id, total, created_at) VALUES
(1, 1, 17000, '2026-03-25 10:15:00'),
(2, 2, 60000, '2026-03-26 12:30:00'),
(3, 3, 3500, '2026-03-27 09:45:00'),
(4, 1, 65000, '2026-03-28 14:10:00'),
(5, 4, 5000, '2026-03-29 16:20:00');

SELECT * FROM orders;

INSERT INTO order_items (order_id, product_id, quantity) VALUES
(1, 1, 1),
(1, 3, 1),
(2, 2, 1),
(3, 3, 1),
(3, 5, 1),
(4, 2, 1),
(4, 3, 1),
(5, 4, 1);

SELECT * FROM order_items;

-- 7. Update stock of all products by reducing 5 units.
UPDATE products
SET stock = stock - 5;

-- 8. Increase price of all products by 10%.
UPDATE products
SET price = price * 1.10;

-- 9. Delete users who have not placed any orders.
DELETE FROM users
WHERE id NOT IN (
    SELECT DISTINCT user_id FROM orders
);

-- -

-- 10. Insert a new order with multiple items.
INSERT INTO orders (id, user_id, total, created_at)
VALUES (6, 2, 18000, NOW());

INSERT INTO order_items (order_id, product_id, quantity) VALUES
(6, 1, 1),
(6, 5, 2);

SELECT * FROM orders;
SELECT * FROM order_items;
-- 11. Fetch all users.
SELECT * FROM users;

-- 12. Fetch all products with price greater than 5000.
SELECT * 
FROM products
WHERE price > 5000;

-- 13. Retrieve all orders placed by user_id = 1.
SELECT *
FROM orders
WHERE user_id = 1;

-- 14. Display product names and their stock.
SELECT name, stock
FROM products;

-- 15. Find total number of orders.
SELECT COUNT(*) AS total_orders
FROM orders;

-- -

-- 16. Get products with stock between 50 and 100.
SELECT *
FROM products
WHERE stock BETWEEN 50 AND 100;
-- Equivalent:
-- WHERE stock >= 50 AND stock <= 100;

-- 17. Find users whose name starts with 'A'.
SELECT *
FROM users
WHERE name LIKE 'A%';

-- 18. Retrieve orders placed after a specific date.
SELECT *
FROM orders
WHERE created_at > '2026-03-26';

-- More precise:
-- WHERE created_at > '2026-03-26 00:00:00';

-- 19. Find products not in stock (stock = 0).
SELECT *
FROM products
WHERE stock = 0;

-- Alternative:
-- WHERE stock <= 0;

-- 20. Get orders with total between 3000 and 20000.
SELECT *
FROM orders
WHERE total BETWEEN 3000 AND 20000;

-- -

-- 21. Calculate average product price.
SELECT AVG(price) AS avg_price
FROM products;

-- Combine with filtering:
/*
SELECT AVG(price) 
FROM products 
WHERE stock > 0;
*/

-- 22. Find maximum and minimum product price.
SELECT 
    MAX(price) AS max_price,
    MIN(price) AS min_price
FROM products;
-- Insight: > Helps identify premium & budget products

-- 23. Convert all user names to uppercase.
SELECT UPPER(name) AS upper_name
FROM users;

-- Alternative:
-- SELECT LOWER(name) FROM users;

-- 24. Extract date from `created_at`.
SELECT DATE(created_at) AS order_date
FROM orders;
-- Output: Removes time → keeps only date
-- Real-world: Daily reports / dashboards

-- 25. Count number of products available.
SELECT COUNT(*) AS total_products
FROM products;

-- If only in-stock products:
/*
SELECT COUNT(*) 
FROM products
WHERE stock > 0;
*/

-- -

-- 26. Find total orders per user.
SELECT user_id, COUNT(*) AS total_orders
FROM orders
GROUP BY user_id;
-- Output: Each user → number of orders
-- Real-world: Customer activity tracking

-- 27. Calculate total revenue generated per user.
SELECT user_id, SUM(total) AS total_revenue
FROM orders
GROUP BY user_id;
-- Insight: Identifies high-value customers

-- 28. Find number of products sold per product_id.
SELECT product_id, SUM(quantity) AS total_sold
FROM order_items
GROUP BY product_id;
-- Real-world: Sales analysis per product

-- 29. Get users who placed more than 1 order.
SELECT user_id, COUNT(*) AS total_orders
FROM orders
GROUP BY user_id
HAVING COUNT(*) > 1;
-- Important: > WHERE → before grouping > HAVING → after grouping

-- 30. Find products with total sales quantity > 1.
SELECT product_id, SUM(quantity) AS total_sold
FROM order_items
GROUP BY product_id
HAVING SUM(quantity) > 1;
-- Learned: > GROUP BY for aggregation > SUM, COUNT with grouping 
-- > HAVING vs WHERE > Real analytics queries (sales, revenue, usage)

-- Classic pattern:
/* 
SELECT column, AGG_FUNC(column)
FROM table
GROUP BY column
HAVING condition;

Example mindset:
GROUP → categorize
AGG → calculate
HAVING → filter results
*/

-- -

-- 31. Retrieve orders along with user names.
SELECT o.id AS order_id, u.name, o.total, o.created_at
FROM orders o
INNER JOIN users u 
ON o.user_id = u.id;
-- Insight: > Combines orders + users > Only matching records

-- 32. Display order details with product names.
SELECT 
    o.id AS order_id,
    p.name AS product_name,
    oi.quantity
FROM order_items oi
INNER JOIN orders o ON oi.order_id = o.id
INNER JOIN products p ON oi.product_id = p.id;
-- Real-world: Order breakdown view

-- 33. Get all products and their order quantities (include products not ordered).
SELECT 
    p.id,
    p.name,
    SUM(oi.quantity) AS total_sold
FROM products p
LEFT JOIN order_items oi 
ON p.id = oi.product_id
GROUP BY p.id, p.name;
-- Important: Includes products with NULL sales

-- 34. Find users who have never placed an order.
SELECT u.id, u.name
FROM users u
LEFT JOIN orders o 
ON u.id = o.user_id
WHERE o.id IS NULL;
-- Key concept: NULL = no matching row

-- 35. Retrieve full order summary (user + product + quantity).
SELECT 
    u.name AS user_name,
    o.id AS order_id,
    p.name AS product_name,
    oi.quantity,
    o.total
FROM orders o
INNER JOIN users u ON o.user_id = u.id
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p ON oi.product_id = p.id;
-- This is real production query

-- Always visualize: users → orders → order_items → products
-- JOIN rule:table1.column = table2.column
-- Debug trick: Start with 2 tables → then add more

-- -

-- 36. Find users who placed orders above average order value.
-- Get average order value:
SELECT AVG(total) FROM orders;

-- Use subquery:
SELECT DISTINCT user_id
FROM orders
WHERE total > (
    SELECT AVG(total) FROM orders
);

-- Better (with names):
SELECT DISTINCT u.name
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.total > (
    SELECT AVG(total) FROM orders
);
-- Insight: Subquery gives dynamic threshold

-- 37. Get products whose price is greater than average price.
SELECT *
FROM products
WHERE price > (
    SELECT AVG(price) FROM products
);
-- Real-world: Premium product filtering

-- 38. Find the most expensive product purchased in any order.
-- Join + subquery
SELECT p.name, p.price
FROM products p
JOIN order_items oi ON p.id = oi.product_id
WHERE p.price = (
    SELECT MAX(price) FROM products
);
-- Alternative (strict: only purchased products):
SELECT p.name, p.price
FROM products p
WHERE p.id IN (
    SELECT product_id FROM order_items
)
AND p.price = (
    SELECT MAX(price) 
    FROM products 
    WHERE id IN (SELECT product_id FROM order_items)
);

-- -

-- 39. Add foreign key constraints between tables.
-- Goal: Enforce relationships ie users → orders → order_items → products
ALTER TABLE orders
ADD CONSTRAINT fk_orders_users
FOREIGN KEY (user_id)
REFERENCES users(id);

ALTER TABLE order_items
ADD CONSTRAINT fk_orderitems_orders
FOREIGN KEY (order_id)
REFERENCES orders(id);

ALTER TABLE order_items
ADD CONSTRAINT fk_orderitems_products
FOREIGN KEY (product_id)
REFERENCES products(id);

-- (Optional but Recommended) Add cascading
/*
ALTER TABLE orders
ADD CONSTRAINT fk_orders_users
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE CASCADE;

-- Meaning: Delete user → all their orders deleted automatically
*/

-- 40. Add a CHECK constraint to ensure product price > 0.
ALTER TABLE products
ADD CONSTRAINT chk_price_positive
CHECK (price > 0);

-- Test it:
INSERT INTO products (id, name, price, stock)
VALUES (6, 'Invalid Product', -100, 10);
-- Result: Error → Constraint violation

/*
### 1. MySQL CHECK support
    * Fully enforced in **MySQL 8+**
    * Older versions ignore CHECK ❗

### 2. FK Rules (VERY IMPORTANT)
| Action             | Behavior          |
| ------------------ | ----------------- |
| ON DELETE CASCADE  | Delete child rows |
| ON DELETE SET NULL | Set FK to NULL    |
| ON DELETE RESTRICT | Prevent deletion  |

### 3. Best Practice
Always define constraints **while creating table**:
CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT,
    total DECIMAL(10,2),
    created_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
*/

-- -

-- 41. Create an index on `products(name)` and analyze its effect.
CREATE INDEX idx_products_name
ON products(name);

-- Verify index:
SHOW INDEX FROM products;

-- Test query BEFORE index
SELECT * 
FROM products
WHERE name = 'Laptop';
-- Without index: Full table scan (slow for large data)

-- Analyze query (VERY IMPORTANT)
EXPLAIN SELECT * 
FROM products
WHERE name = 'Laptop';
-- Look for: > type: ALL → ❌ full scan > type: ref → ✅ index used
-- What changed? > Faster lookup on name > Especially useful when table has millions of rows
-- Real-World Insight:: Use index when: > Column used in WHERE > Column used in JOIN > Column used in ORDER BY
-- Avoid indexing: > Small tables > Columns with low uniqueness (e.g., gender)

-- 42. Create a composite index on `order_items(order_id, product_id)`.
CREATE INDEX idx_order_product
ON order_items(order_id, product_id);

--Why composite index? Query example:
SELECT *
FROM order_items
WHERE order_id = 1 AND product_id = 3;
-- This index helps: Faster filtering on both columns

/*
Important Rule (VERY IMPORTANT)
👉 Composite index follows left-to-right rule:
| Query                             | Uses Index? |
| --------------------------------- | ----------- |
| `order_id = 1`                    | ✅ YES       |
| `order_id = 1 AND product_id = 3` | ✅ YES       |
| `product_id = 3`                  | ❌ NO        |
*/

--Analyze query
EXPLAIN SELECT *
FROM order_items
WHERE order_id = 1 AND product_id = 3;

/*
Too many indexes = slower INSERT/UPDATE ❗
Always index:
    > Foreign keys
    > Frequently searched columns
*/

-- -

-- 43. Create a view for order summary (user + total + date).
CREATE VIEW order_summary AS
SELECT 
    o.id AS order_id,
    u.name AS user_name,
    o.total,
    o.created_at
FROM orders o
JOIN users u ON o.user_id = u.id;

-- Use the view
SELECT * FROM order_summary;

-- Why this is powerful? > Hides JOIN complexity > Reusable like a table > Cleaner queries for apps

-- 44. Create a view showing product sales summary.
-- Goal: total quantity sold per product
CREATE VIEW product_sales_summary AS
SELECT 
    p.id AS product_id,
    p.name AS product_name,
    SUM(oi.quantity) AS total_sold
FROM products p
LEFT JOIN order_items oi 
ON p.id = oi.product_id
GROUP BY p.id, p.name;

-- Use the view
SELECT * FROM product_sales_summary;

-- Find top-selling products:
SELECT *
FROM product_sales_summary
ORDER BY total_sold DESC;
/*
Views are:
Virtual tables (no data stored, only query)

👉 Update view:
CREATE OR REPLACE VIEW order_summary AS ...

👉 Drop view:
DROP VIEW order_summary;

Limitations
    Complex views may impact performance
    Not always updatable
*/

-- -

-- 45. Create a stored procedure to fetch orders by user ID.
DELIMITER //
CREATE PROCEDURE GetOrdersByUser(IN uid INT)
BEGIN
    SELECT *
    FROM orders
    WHERE user_id = uid;
END //
DELIMITER ;

-- Call procedure
CALL GetOrdersByUser(1);

/*
Real-world use
Used in backend APIs
Encapsulates logic
Improves security (no direct table access)
*/

-- Advanced version (with JOIN)
DELIMITER //

CREATE PROCEDURE GetOrdersWithUser(IN uid INT)
BEGIN
    SELECT o.id, u.name, o.total, o.created_at
    FROM orders o
    JOIN users u ON o.user_id = u.id
    WHERE o.user_id = uid;
END //

DELIMITER ;

-- 46. Create a function to calculate total revenue.
-- Goal: Return single value (total revenue)

-- -
DELIMITER //

CREATE FUNCTION GetTotalRevenue()
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    DECLARE total_rev DECIMAL(10,2);

    SELECT SUM(total)
    INTO total_rev
    FROM orders;

    RETURN total_rev;
END //

DELIMITER ;
-- Use function
SELECT GetTotalRevenue() AS total_revenue;

-- Difference (IMPORTANT)
/*
| Feature        | Procedure  | Function     |
| -------------- | ---------- | ------------ |
| Returns value  | ❌ No       | ✅ Yes        |
| Used in SELECT | ❌ No       | ✅ Yes        |
| Use case       | Operations | Calculations |
*/

-- -

-- 47. Write a transaction to insert order and order_items safely.
-- Goal: > Insert order > Insert items > Ensure all succeed or none
START TRANSACTION;

INSERT INTO orders (id, user_id, total, created_at)
VALUES (7, 3, 18000, NOW());

INSERT INTO order_items (order_id, product_id, quantity) VALUES
(7, 1, 1),
(7, 5, 2);

COMMIT;

-- What happens > If all queries succeed → data saved > If any fails → nothing saved (if rollback used)
-- Safer pattern (manual control)
/*
START TRANSACTION;

-- operations

-- if everything ok
COMMIT;

-- if error
ROLLBACK;
*/

-- 48. Simulate rollback when stock is insufficient.
-- Goal: Prevent order if stock < required quantity
START TRANSACTION;

-- Check stock
SELECT stock 
FROM products 
WHERE id = 1;

-- If stock is enough:
UPDATE products 
SET stock = stock - 1
WHERE id = 1;

-- If stock is NOT enough:
ROLLBACK;

-- Insert order (only if valid)
INSERT INTO orders (id, user_id, total, created_at)
VALUES (7, 3, 18000, NOW());

INSERT INTO order_items (order_id, product_id, quantity) VALUES
(7, 1, 1),
(7, 5, 2);

COMMIT;

--Using procedure logic:
DELIMITER //

CREATE PROCEDURE PlaceOrder(
    IN p_user INT,
    IN p_product INT,
    IN p_qty INT
)
BEGIN
    DECLARE available_stock INT;

    START TRANSACTION;

    SELECT stock INTO available_stock
    FROM products
    WHERE id = p_product;

    IF available_stock >= p_qty THEN
        
        UPDATE products
        SET stock = stock - p_qty
        WHERE id = p_product;

        INSERT INTO orders (user_id, total, created_at)
        VALUES (p_user, 1000 * p_qty, NOW());

        COMMIT;

    ELSE
        ROLLBACK;
    END IF;

END //

DELIMITER ;

-- -

-- 49. Rank users based on total purchase using window functions.
-- Goal: > Calculate total spending per user > Rank them (highest spender = rank 1)
-- Aggregate total purchase per user
SELECT user_id, SUM(total) AS total_spent
FROM orders
GROUP BY user_id;

-- Apply RANK()
SELECT 
    user_id,
    total_spent,
    RANK() OVER (ORDER BY total_spent DESC) AS user_rank
FROM (
    SELECT user_id, SUM(total) AS total_spent
    FROM orders
    GROUP BY user_id
) AS user_totals;

/*
Explanation
Inner query → calculates total spending
RANK() → assigns ranking
ORDER BY total_spent DESC → highest first
*/

-- Alternative: ROW_NUMBER()
SELECT 
    user_id,
    total_spent,
    ROW_NUMBER() OVER (ORDER BY total_spent DESC) AS row_num
FROM (
    SELECT user_id, SUM(total) AS total_spent
    FROM orders
    GROUP BY user_id
) AS user_totals;

/*
Difference (IMPORTANT)
| Function     | Behavior                    |
| ------------ | --------------------------- |
| RANK()       | Skips ranks on ties (1,1,3) |
| DENSE_RANK() | No gaps (1,1,2)             |
| ROW_NUMBER() | Always unique (1,2,3)       |

Real-World Use Cases
    Top customers
    Leaderboards
    Sales ranking
    Analytics dashboards
*/

-- -

-- 50. Redesign the schema to support:
    * product categories
    * multiple addresses per user
    * payment status & methods

/*
## ✅ **Redesign the schema to support:**
* Product categories
* Multiple addresses per user
* Payment status & methods

# 🧠 Step 1: Identify Problems in Current Design
❌ Current issues:
* No product categorization
* No address handling
* No payment tracking
* Limited scalability

# 🏗️ Step 2: Improved Schema Design
## 🔹 1. Users Table (same)
*/

users (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
)

/*
## 🔹 2. Addresses Table (NEW → One-to-Many)

👉 One user → multiple addresses
*/ 

addresses (
    id INT PRIMARY KEY,
    user_id INT,
    address_line TEXT,
    city VARCHAR(50),
    pincode VARCHAR(10),
    FOREIGN KEY (user_id) REFERENCES users(id)
)

/*
## 🔹 3. Categories Table (NEW)
*/

categories (
    id INT PRIMARY KEY,
    name VARCHAR(100)
)

/*
## 🔹 4. Products Table (Updated)
*/
products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10,2),
    stock INT,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
)

/*
## 🔹 5. Orders Table (Enhanced)
*/
orders (
    id INT PRIMARY KEY,
    user_id INT,
    address_id INT,
    total DECIMAL(10,2),
    status VARCHAR(50),
    created_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (address_id) REFERENCES addresses(id)
)
/*
## 🔹 6. Order Items (same, but strong FK)
*/
order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
)
/*
## 🔹 7. Payments Table (NEW)
*/
payments (
    id INT PRIMARY KEY,
    order_id INT,
    payment_method VARCHAR(50),
    payment_status VARCHAR(50),
    amount DECIMAL(10,2),
    paid_at DATETIME,
    FOREIGN KEY (order_id) REFERENCES orders(id)
)

/*
# 🔗 Step 3: ER Relationship (Mental Model)
👉 Visualize like this:
*/
users → addresses
users → orders → order_items → products → categories
orders → payments

/*
# 🧠 Step 4: Normalization
### ✅ 1NF (Atomic data)
* No repeating groups ✔️

### ✅ 2NF (No partial dependency)
* order_items depends on full PK ✔️

### ✅ 3NF (No transitive dependency)
* category separated ✔️

# ⚡ Step 5: Denormalization (When Needed)
👉 Example:
* Store `total` in orders (already done)

👉 Why?
* Faster reads
* Avoid heavy joins

# 🧠 Step 6: Best Practices
### ✅ Naming
* Use singular/plural consistently

### ✅ Data Types
* `DECIMAL` for money
* `DATETIME` for timestamps

### ✅ Indexing
* Index:
  * `user_id`
  * `product_id`
  * `order_id`


# 🔐 Step 7: Real-World Enhancements
👉 Add:
* `order_status` (Pending, Shipped, Delivered)
* `payment_status` (Success, Failed)
* `created_at`, `updated_at` everywhere
*/
```