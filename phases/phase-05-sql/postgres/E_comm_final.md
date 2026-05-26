# PostgreSQL Project Plan

# Smart E-Commerce Order & Inventory Management System

**Database:** PostgreSQL 18  
**Tool:** DBeaver  
**Project Type:** Real-world database system  
**Goal:** Cover most PostgreSQL concepts from the README while building a realistic project.

---

# 1. Project Overview

Build a Smart E-Commerce Order & Inventory Management System similar to backend systems used by Amazon, Flipkart, Meesho, etc.

The system will manage:

- Customers
- Products
- Categories
- Orders
- Order Items
- Payments
- Shipping Addresses
- Audit Logs

This project is designed to cover:

- CRUD operations
- Primary keys
- Foreign keys
- Constraints
- Joins
- Aggregation
- Subqueries
- Transactions
- Triggers
- Functions
- Views
- Indexes
- PostgreSQL features

---

# 2. PostgreSQL + DBeaver Instructions

Use PostgreSQL syntax only.

Use:

```sql
GENERATED ALWAYS AS IDENTITY
```

instead of:

```sql
AUTO_INCREMENT
```

Do not use:

```sql
DELIMITER
```

because PostgreSQL does not support it.

Use:

```sql
LANGUAGE plpgsql
```

for functions and triggers.

Recommended DBeaver file structure:

```text
01_create_database.sql

02_create_tables.sql

03_insert_data.sql

04_select_queries.sql

05_update_delete.sql

06_transactions.sql

07_triggers.sql

08_functions.sql

09_views.sql

10_indexes.sql
```

---

# 3. Project Tables

We will use 8 tables.

## customers

Purpose:

Stores customer information.

Columns:

- customer_id
- full_name
- email
- phone
- created_at

---

## categories

Purpose:

Stores product categories.

Columns:

- category_id
- category_name

Examples:

- Electronics
- Fashion
- Books
- Grocery

---

## products

Purpose:

Stores products available for sale.

Columns:

- product_id
- category_id
- product_name
- price
- stock_quantity
- updated_at

---

## orders

Purpose:

Stores order details.

Columns:

- order_id
- customer_id
- order_date
- total_amount
- order_status

Order status:

- Pending
- Completed
- Cancelled

---

## order_items

Purpose:

Stores products inside orders.

Columns:

- order_item_id
- order_id
- product_id
- quantity
- price

---

## payments

Purpose:

Stores payment details.

Columns:

- payment_id
- order_id
- amount
- payment_method
- payment_status
- paid_at

Payment status:

- Pending
- Success
- Failed

---

## shipping_addresses

Purpose:

Stores customer addresses.

Columns:

- address_id
- customer_id
- city
- state
- pincode

---

## audit_logs

Purpose:

Stores activity logs.

Columns:

- log_id
- action_type
- message
- created_at

Examples:


| log_id | action_type | message                 |
| ------ | ----------- | ----------------------- |
| 1      | INSERT      | New order created       |
| 2      | UPDATE      | Product stock reduced   |
| 3      | UPDATE      | Payment successful      |
| 4      | DELETE      | Cancelled order removed |


---

# 4. Relationship Understanding

Relationship flow:

```text
Customers
    ↓
Orders
    ↓
Order_Items
    ↓
Products
    ↓
Categories


Orders
    ↓
Payments


Customers
    ↓
Shipping_Addresses


All activities
      ↓
Audit_Logs
```

Relationship types:

### Customer → Orders

```text
1 : N
```

One customer can place many orders.

---

### Orders → Order Items

```text
1 : N
```

One order can contain multiple products.

---

### Products → Order Items

```text
1 : N
```

One product can exist in many orders.

---

### Customer → Shipping Address

```text
1 : N
```

Customer can save multiple addresses.

---

### Orders → Payments

```text
1 : 1
```

One order has one payment.

---

# 5. Constraints

## Customers

```sql
email UNIQUE

full_name NOT NULL
```

---

## Products

```sql
price > 0

stock_quantity >=0
```

---

## Orders

```sql
CHECK
(
order_status IN
(
'Pending',
'Completed',
'Cancelled'
)
)
```

---

## Payments

```sql
CHECK
(
payment_status IN
(
'Pending',
'Success',
'Failed'
)
)
```

---

# 6. Sample Data Requirement

Minimum:

50+ records

Suggested:

Customers:

15

Categories:

5

Products:

20

Orders:

10

Order_Items:

15

Payments:

10

Shipping_Addresses:

10

Audit_Logs:

15

Total:

100+ records

---

# 7. Mandatory Queries

Create queries for:

### Filtering

Examples:

```sql
SELECT *
FROM products
WHERE price>5000;
```

---

### Aggregation

Examples:

```sql
SELECT category_id,
AVG(price)
FROM products
GROUP BY category_id;
```

---

### Joins

Examples:

```sql
SELECT
c.full_name,
o.order_id,
p.product_name

FROM customers c

JOIN orders o
ON c.customer_id=o.customer_id

JOIN order_items oi
ON o.order_id=oi.order_id

JOIN products p
ON p.product_id=oi.product_id;
```

---

### Subqueries

Example:

```sql
SELECT full_name

FROM customers

WHERE customer_id IN

(
SELECT customer_id

FROM orders

WHERE total_amount>50000
);
```

---

### Update with conditions

```sql
UPDATE products

SET price=price*.90

WHERE category_id=1;
```

---

### Delete with conditions

```sql
DELETE FROM orders

WHERE order_status='Cancelled';
```

---

# 8. Transaction Exercise

Scenario:

Customer purchases product.

Steps:

1.Insert order

2.Insert order item

3.Reduce stock quantity

4.Insert payment

5.Commit if success

6.Rollback if failure

Example:

```sql
BEGIN;

INSERT INTO orders(...);

UPDATE products
SET stock_quantity=stock_quantity-1
WHERE product_id=2;

INSERT INTO payments(...);

COMMIT;
```

Rollback:

```sql
ROLLBACK;
```

---

# 9. Trigger Exercise

Requirement:

Automatically update updated_at column.

Function:

```sql
CREATE OR REPLACE FUNCTION update_timestamp()

RETURNS TRIGGER

AS
$$

BEGIN

NEW.updated_at=CURRENT_TIMESTAMP;

RETURN NEW;

END;

$$

LANGUAGE plpgsql;
```

Trigger:

```sql
CREATE TRIGGER product_timestamp

BEFORE UPDATE

ON products

FOR EACH ROW

EXECUTE FUNCTION update_timestamp();
```

---

# 10. Audit Log Trigger

Requirement:

Whenever:

- Order inserted
- Payment updated
- Product stock changes

Automatically insert messages into audit_logs.

Example:

```sql
INSERT INTO audit_logs
(
action_type,
message
)

VALUES
(
'UPDATE',
'Stock changed'
);
```

---

# 11. Function Exercise

Requirement:

Calculate order total.

Function:

```sql
CREATE OR REPLACE FUNCTION calculate_order_total
(
input_order_id INT
)

RETURNS DECIMAL

AS
$$

DECLARE

total DECIMAL;

BEGIN

SELECT

SUM(quantity*price)

INTO total

FROM order_items

WHERE order_id=input_order_id;

RETURN total;

END;

$$

LANGUAGE plpgsql;
```

Usage:

```sql
SELECT calculate_order_total(1);
```

---

# 12. Views

Create:

### Sales Summary View

```sql
CREATE VIEW sales_summary AS

SELECT

p.product_name,

SUM(oi.quantity)

FROM products p

JOIN order_items oi
ON p.product_id=oi.product_id

GROUP BY p.product_name;
```

---

# 13. Indexes

Create indexes:

```sql
CREATE INDEX idx_customer_email
ON customers(email);


CREATE INDEX idx_order_customer
ON orders(customer_id);


CREATE INDEX idx_product_name
ON products(product_name);
```

---

# 14. Build Order

Phase 1:

- Create database

Phase 2:

- Create tables

Phase 3:

- Add relationships

Phase 4:

- Add constraints

Phase 5:

- Insert sample data

Phase 6:

- CRUD operations

Phase 7:

- Query exercises

Phase 8:

- Transactions

Phase 9:

- Triggers

Phase 10:

- Functions

Phase 11:

- Views

Phase 12:

- Indexes

Phase 13:

- Testing

---

# Final Deliverables

You should finally have:

✓ ER Diagram

✓ Table scripts

✓ Sample data

✓ Queries

✓ Transactions

✓ Trigger

✓ Function

✓ View

✓ Indexes

✓ Audit log system

✓ Testing scripts