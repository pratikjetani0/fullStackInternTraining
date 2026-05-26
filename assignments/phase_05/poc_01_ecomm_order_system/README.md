# 🛒 E-Commerce Order Management System

This project was built to practice and implement core SQL and PostgreSQL concepts including CRUD operations, joins, aggregation, transactions, triggers, functions, procedures, views, and indexes.

---

# 📌 Project Objective

The main goal of this project is to build a practical database system that demonstrates:

- Database design using ER diagrams
- Relationships between entities
- PostgreSQL schema creation
- Real-world business logic
- Advanced PostgreSQL concepts

---

# 🛠 Tech Stack

- **Database:** PostgreSQL 18
- **Database Tool:** DBeaver
- **Language:** SQL / PLpgSQL

---

# 📂 Project Structure

```text
Ecommerce-Order-Management-System/

│
├── 01_create_tables.sql
├── 02_insert_data.sql
├── 03_select_queries.sql
├── 04_update_delete.sql
├── 05_transactions.sql
├── 06_triggers.sql
├── 07_functions.sql
├── 08_views.sql
├── 09_indexes.sql
├── 10_procedures.sql
│
├── README.md
│
└── ER_Diagram.png
```

---

# 📖 Features

### Customer Management

- Store customer information
- Multiple shipping addresses

### Product Management

- Product categories
- Product stock management
- Inventory tracking

### Order Management

- Create orders
- Store multiple products in one order
- Order status tracking

### Payment Management

- Payment tracking
- Payment retry support
- Payment status updates

### Audit Logging

- Store activity logs
- Track inserts
- Track updates
- Track stock changes
- Track order creation

---

# 🗃 Database Tables

This project contains 8 tables.

| Table Name         | Purpose                       |
| ------------------ | ----------------------------- |
| customers          | Stores customer information   |
| categories         | Stores product categories     |
| products           | Stores product details        |
| orders             | Stores customer orders        |
| order_items        | Stores products inside orders |
| payments           | Stores payment details        |
| shipping_addresses | Stores delivery addresses     |
| audit_logs         | Stores system activity logs   |

---

# 🔗 Entity Relationship Flow

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


All Activities
      ↓
Audit_Logs
```

---

# 📊 Relationship Types

### Customer → Orders

```text
1 : N
```

One customer can place multiple orders.

---

### Orders → Order_Items

```text
1 : N
```

One order can contain multiple products.

---

### Products → Order_Items

```text
1 : N
```

One product can appear in multiple orders.

---

### Categories → Products

```text
1 : N
```

One category contains multiple products.

---

### Customers → Shipping Addresses

```text
1 : N
```

One customer can save multiple addresses.

---

### Orders → Payments

```text
1 : N
```

One order can contain multiple payment attempts.

Example:

```text
Attempt 1 → Failed
Attempt 2 → Success
```

---

# 🚀 Implemented PostgreSQL Concepts

## Database Design

Implemented:

- ER Diagram
- Primary Keys
- Foreign Keys
- Relationships

---

## Constraints

Implemented:

- PRIMARY KEY
- FOREIGN KEY
- NOT NULL
- UNIQUE
- DEFAULT
- CHECK

---

## CRUD Operations

Implemented:

- INSERT
- SELECT
- UPDATE
- DELETE

---

## Query Concepts

Implemented:

- WHERE
- ORDER BY
- LIMIT
- DISTINCT
- GROUP BY
- HAVING
- LIKE
- JOIN
- Subqueries

---

## PostgreSQL Features

### Transactions

Examples:

```sql
BEGIN;
COMMIT;
ROLLBACK;
```

Used for:

- Order creation
- Payment processing
- Stock updates

---

### Triggers

Implemented:

- Product timestamp trigger
- New order log trigger
- Product stock change trigger

---

### Functions

Implemented:

```sql
calculate_order_total()

customer_total_spending()

check_stock_status()
```

Purpose:

- Calculations
- Reusable business logic

---

### Procedures

Implemented:

```sql
update_product_stock()

update_order_status()

place_order()
```

Purpose:

- Workflow automation
- Business actions
- Multi-step processes

---

### Views

Implemented:

```sql
sales_summary

customer_order_report

inventory_report

payment_report
```

---

### Indexes

Implemented:

```sql
idx_customer_email

idx_order_customer

idx_product_name

idx_product_category

idx_category_price

idx_payment_status
```

---

# ▶ How To Run

## Step 1

Open DBeaver

---

## Step 2

Connect PostgreSQL 18

---

## Step 3

Create database

```sql
CREATE DATABASE ecommerce_db;
```

---

## Step 4

Run SQL files in order:

```text
01_create_tables.sql

02_insert_data.sql

03_select_queries.sql

04_update_delete.sql

05_transactions.sql

06_triggers.sql

07_functions.sql

08_views.sql

09_indexes.sql

10_procedures.sql
```

---

# 🎯 Learning Outcomes

After completing this project you will understand:

- Real-world database design
- PostgreSQL schema creation
- CRUD operations
- SQL query writing
- Joins and aggregation
- Transaction management
- Trigger creation
- Function creation
- Procedure creation
- View creation
- Performance optimization using indexes
- Audit logging systems

---

# 👨‍💻 Author

Pratik Jetani
