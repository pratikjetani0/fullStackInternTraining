# PostgreSQL Complete Course — Lecture Notes

> A comprehensive guide to PostgreSQL covering installation, core SQL commands, filtering, aggregation, and best practices. Based on the full video course transcript featuring instructor Alex.

---

## Table of Contents

1. [Course Overview](#1-course-overview)
2. [What is PostgreSQL & pgAdmin?](#2-what-is-postgresql--pgadmin)
3. [Installation & Setup](#3-installation--setup)
4. [The SELECT Statement](#4-the-select-statement)
5. [SELECT DISTINCT](#5-select-distinct)
6. [The COUNT Function](#6-the-count-function)
7. [The WHERE Clause](#7-the-where-clause)
8. [ORDER BY](#8-order-by)
9. [LIMIT](#9-limit)
10. [BETWEEN](#10-between)
11. [IN](#11-in)
12. [LIKE and ILIKE](#12-like-and-ilike)
13. [Aggregate Functions](#13-aggregate-functions)
14. [GROUP BY](#14-group-by)
15. [HAVING](#15-having)
16. [AS (Aliases)](#16-as-aliases)
17. [Challenges & Solutions](#17-challenges--solutions)

---

## 1. Course Overview

This course covers PostgreSQL from beginner to advanced level, including:

- Setting up your first database
- Writing and optimizing queries
- Using advanced SQL features
- Solving real-world data challenges

By the end of this course you will be proficient in:

- Designing databases
- Leveraging PostgreSQL's advanced features
- Solving real-world data challenges
- Building high-performance, data-driven applications

---

## 2. What is PostgreSQL & pgAdmin?

### PostgreSQL (Postgres)
PostgreSQL is an open-source **Relational Database Management System (RDBMS)** known for its robustness, reliability, and advanced features. Key characteristics:

- Supports a wide range of data types, indexing options, and query optimization techniques
- Fully **ACID compliant** (Atomicity, Consistency, Isolation, Durability)
- Supports transactions to ensure data integrity
- Extensible and supports various programming languages
- Widely used in enterprise environments for high-performance, data-driven applications

### pgAdmin
pgAdmin is a free, open-source **administration and development platform** for managing PostgreSQL databases. It provides:

- A graphical user interface (GUI) to interact with the database
- Database object management (tables, views, indexes)
- Querying and editing data
- Monitoring of database activity
- Managing server settings

> **Simple analogy:** PostgreSQL is the **engine** that stores data and processes queries; pgAdmin is the **graphical interface** for connecting to and working with PostgreSQL.

---

## 3. Installation & Setup

### Important Notes Before You Start
- Follow each step **in order**
- Do **not** open the DVD rental `.tar` file directly
- Do **not** forget your PostgreSQL password

---

### Step 1 — Download & Install PostgreSQL

1. Go to [https://www.postgresql.org](https://www.postgresql.org)
2. Click **Download** and select your operating system (Windows / Mac / Linux)
3. Choose the installer for your system (e.g., Windows x64)
4. Run the installer:
   - Accept the default installation location
   - Keep the default components selected
   - Keep the default data directory
   - **Set a password** — do not forget this!
   - Keep the default port: `5432`
   - Keep the default locale
5. Uncheck **Stack Builder** at the end and click **Finish**

---

### Step 2 — Download & Install pgAdmin

1. Go to [https://www.pgadmin.org](https://www.pgadmin.org)
2. Click **Download** → select your OS → select **pgAdmin 4**
3. Download the executable and run it
4. Select **Install for me only** (recommended)
5. Accept the license and proceed with default settings
6. Click **Finish**

> **Troubleshooting:** If pgAdmin loads indefinitely, it is because PostgreSQL already installed a copy of pgAdmin. Go to **Control Panel → Uninstall Programs**, find the PostgreSQL installation, run the uninstaller, select **Individual Components**, and uncheck **pgAdmin 4** only. Then re-launch pgAdmin.

---

### Step 3 — Download the DVD Rental Database

- Go to the course resources and download the `dvdrental.tar` file
- Save it to your **Downloads** folder
- Do **not** open it directly

---

### Step 4 — Restart Your Computer

Restart your computer before proceeding to the restore step.

---

### Step 5 — Restore the Database in pgAdmin

1. Open pgAdmin and run as Administrator
2. Create a Master Password (this is for pgAdmin, not PostgreSQL)
3. In the left panel, expand **Servers** → enter your PostgreSQL password
4. Right-click on **Databases** → **Create** → **Database**
   - Name it: `dvdrental`
   - Click **Save**
5. Right-click on the `dvdrental` database → **Restore**
6. Change the format to **All Files**
7. Navigate to your Downloads folder and select the `dvdrental.tar` file
8. Click **Restore**

> **Note:** Ignore any "fail" code that appears — it simply means PostgreSQL thought you were restoring twice.

9. Right-click the database → **Refresh**
10. Right-click the database → **Query Tool** to test:

```sql
SELECT * FROM film;
```

If data appears in the output, everything is working correctly.

---

## 4. The SELECT Statement

The `SELECT` statement is used to retrieve data from one or more database tables.

### Syntax

```sql
SELECT column_name FROM table_name;
```

### Examples

**Retrieve all columns from a table:**
```sql
SELECT * FROM actor;
```

**Retrieve specific columns:**
```sql
SELECT first_name, last_name FROM actor;
```

**Retrieve columns in a different order:**
```sql
SELECT last_name, first_name FROM actor;
```

### Best Practices

- Avoid using `SELECT *` when you don't need all columns — it fetches excessive data and slows communication between the database and the application
- **Capitalize SQL keywords** (`SELECT`, `FROM`, `WHERE`) to distinguish them from column and table names — this is a widely accepted convention

---

## 5. SELECT DISTINCT

The `DISTINCT` keyword filters the result set to return only **unique rows**, eliminating duplicates.

### Syntax

```sql
SELECT DISTINCT column_name FROM table_name;
```

You can also use parentheses for clarity:

```sql
SELECT DISTINCT (column_name) FROM table_name;
```

### How It Works

1. The query fetches all data from the specified table
2. The query engine removes duplicate rows based on the specified column(s)
3. Only the first occurrence of each unique combination is returned

### Examples

**Get unique release years from the film table:**
```sql
SELECT DISTINCT release_year FROM film;
```

**Get unique rental rates:**
```sql
SELECT DISTINCT rental_rate FROM film;
```

---

## 6. The COUNT Function

The `COUNT` function is an **aggregate function** that returns the number of rows matching a specified condition.

### Why Use COUNT?

- Count the total number of records in a table
- Calculate the occurrence of specific values in a column
- Find the number of rows meeting certain conditions
- Count the number of unique values (when combined with `DISTINCT`)

### COUNT with Asterisk vs. Column Name

| Form | Behavior |
|---|---|
| `COUNT(*)` | Counts **all rows**, including those with NULL values |
| `COUNT(column_name)` | Counts only **non-NULL values** in that column |

### Syntax

```sql
-- Count all rows
SELECT COUNT(*) FROM table_name;

-- Count non-null values in a column
SELECT COUNT(column_name) FROM table_name;

-- Count unique values
SELECT COUNT(DISTINCT column_name) FROM table_name;
```

### Examples

**Count total payment rows:**
```sql
SELECT COUNT(*) FROM payment;
```

**Count unique payment amounts:**
```sql
SELECT COUNT(DISTINCT amount) FROM payment;
```

---

## 7. The WHERE Clause

The `WHERE` clause filters rows from a table based on specified conditions. Only rows where the condition evaluates to `TRUE` are included in the result.

### Syntax

```sql
SELECT column_name(s) FROM table_name WHERE condition;
```

### Comparison Operators

| Operator | Description | Example |
|---|---|---|
| `=` | Equal to | `WHERE department = 'Sales'` |
| `<>` or `!=` | Not equal to | `WHERE department <> 'Finance'` |
| `>` | Greater than | `WHERE age > 30` |
| `<` | Less than | `WHERE salary < 50000` |
| `>=` | Greater than or equal to | `WHERE experience >= 5` |
| `<=` | Less than or equal to | `WHERE rating <= 4.5` |
| `BETWEEN` | Within a range (inclusive) | `WHERE age BETWEEN 20 AND 40` |
| `LIKE` | Pattern matching | `WHERE first_name LIKE 'J%'` |
| `IN` | Matches any value in a list | `WHERE department IN ('HR', 'Finance')` |
| `IS NULL` | Value is null | `WHERE phone_number IS NULL` |

### Logical Operators

**AND** — all conditions must be true:
```sql
SELECT * FROM employees
WHERE department = 'HR' AND age > 30;
```

**OR** — at least one condition must be true:
```sql
SELECT * FROM employees
WHERE department = 'Finance' OR department = 'Marketing';
```

### Examples

**Filter by exact match:**
```sql
SELECT * FROM customer WHERE first_name = 'Mary';
```

**Filter with multiple conditions (AND):**
```sql
SELECT * FROM film
WHERE rental_rate > 4
AND replacement_cost >= 19.99
AND rating = 'R';
```

**Filter with OR and COUNT:**
```sql
SELECT COUNT(*) FROM film
WHERE rating = 'R' OR rating = 'PG-13';
```

---

## 8. ORDER BY

The `ORDER BY` clause sorts the result set of a query in a specified order — ascending or descending — based on one or more column values.

### Why Use ORDER BY?

- **Data presentation** — display results in a logical, readable order
- **Analysis** — identify trends, outliers, or patterns more easily
- **Pagination** — ensure data consistency between pages

### Syntax

```sql
SELECT column(s)
FROM table_name
WHERE condition       -- optional
ORDER BY column [ASC | DESC];
```

- `ASC` — ascending order (default, A→Z, 0→9)
- `DESC` — descending order (Z→A, 9→0)

### Examples

**Sort customers alphabetically by first name:**
```sql
SELECT * FROM customer ORDER BY first_name ASC;
```

**Sort in descending order:**
```sql
SELECT * FROM customer ORDER BY first_name DESC;
```

**Sort by multiple columns (Store ID first, then first name):**
```sql
SELECT store_id, first_name, last_name
FROM customer
ORDER BY store_id ASC, first_name ASC;
```

> **Note:** You can sort by a column that is not included in the `SELECT` clause and it will still work.

---

## 9. LIMIT

The `LIMIT` command restricts the number of rows returned by a query. It is particularly useful when working with large datasets.

### Why Use LIMIT?

- **Performance optimization** — fetch only the necessary amount of data
- **Pagination** — display data in chunks (pages), often combined with `OFFSET`
- **Resource management** — reduce memory and network resources required

### Syntax

```sql
SELECT column(s) FROM table_name LIMIT number_of_rows;
```

### What is Pagination?

Pagination is a technique to display and navigate large datasets in smaller, manageable chunks (pages). Instead of fetching all data at once, only a limited number of rows are fetched at a time — for example, loading more content as a user scrolls down a page.

### Examples

**Get the 10 most recent payments:**
```sql
SELECT * FROM payment
ORDER BY payment_date DESC
LIMIT 10;
```

**Get recent payments excluding zero-amount transactions:**
```sql
SELECT * FROM payment
WHERE amount != 0
ORDER BY payment_date DESC
LIMIT 10;
```

---

## 10. BETWEEN

The `BETWEEN` operator filters data within a **specified range of values**. It is used in conjunction with `WHERE`.

> **Important:** `BETWEEN` is **inclusive** — it includes both the start and end values.

### Syntax

```sql
SELECT column(s) FROM table_name
WHERE column_name BETWEEN value1 AND value2;
```

### NOT BETWEEN

```sql
SELECT column(s) FROM table_name
WHERE column_name NOT BETWEEN value1 AND value2;
```

### Examples

**Filter payments by amount range:**
```sql
SELECT * FROM payment WHERE amount BETWEEN 8 AND 9;
```

**Filter payments NOT in a range:**
```sql
SELECT * FROM payment WHERE amount NOT BETWEEN 8 AND 9;
```

**Filter payments by date range:**
```sql
SELECT * FROM payment
WHERE payment_date BETWEEN '2007-02-01' AND '2007-02-15';
```

**Count transactions within a range:**
```sql
SELECT COUNT(*) FROM payment WHERE amount BETWEEN 8 AND 9;
```

---

## 11. IN

The `IN` operator filters data based on a **specified list of values**. It simplifies queries that would otherwise require multiple `OR` conditions.

### Syntax

```sql
SELECT column(s) FROM table_name
WHERE column_name IN (value1, value2, value3, ...);
```

### NOT IN

```sql
SELECT column(s) FROM table_name
WHERE column_name NOT IN (value1, value2, value3, ...);
```

### Why Use IN?

- **Reduced query complexity** — replaces multiple `OR` conditions
- **Improved readability** — more concise and easier to read
- **Efficiency** — PostgreSQL's query optimizer can often optimize `IN` queries more effectively than complex `OR` chains

### Examples

**Get payments with specific amounts:**
```sql
SELECT * FROM payment
WHERE amount IN (0.99, 1.98, 1.99);
```

**Get payments NOT in a list:**
```sql
SELECT * FROM payment
WHERE amount NOT IN (0.99, 1.98, 1.99);
```

**Filter customers by first name:**
```sql
SELECT * FROM customer
WHERE first_name IN ('John', 'Jake', 'Julie');
```

---

## 12. LIKE and ILIKE

`LIKE` and `ILIKE` are used for **pattern matching** within text columns.

| Command | Case Sensitivity |
|---|---|
| `LIKE` | Case **sensitive** |
| `ILIKE` | Case **insensitive** |

### Wildcard Characters

| Wildcard | Represents |
|---|---|
| `%` | Any sequence of characters (including zero characters) |
| `_` | Exactly one single character |
| `[abc]` | Any single character from the set (`a`, `b`, or `c`) |

### Syntax

```sql
-- LIKE (case-sensitive)
SELECT column(s) FROM table_name WHERE column_name LIKE 'pattern';

-- ILIKE (case-insensitive)
SELECT column(s) FROM table_name WHERE column_name ILIKE 'pattern';
```

### Examples

**Names starting with 'J' (case-sensitive):**
```sql
SELECT * FROM customer WHERE first_name LIKE 'J%';
```

**Names starting with 'j' regardless of case:**
```sql
SELECT * FROM customer WHERE first_name ILIKE 'j%';
```

**Names starting with 'J' and last name starting with 'S':**
```sql
SELECT * FROM customer
WHERE first_name LIKE 'J%' AND last_name LIKE 'S%';
```

**Names containing 'er':**
```sql
SELECT * FROM customer WHERE first_name LIKE '%er%';
```

**Names with exactly one character before and after 'er':**
```sql
SELECT * FROM customer WHERE first_name LIKE '_er_';
```

**Names NOT matching a pattern:**
```sql
SELECT * FROM customer WHERE first_name NOT LIKE '%er%';
```

**Searching for email domains with variations (combining wildcards):**
```sql
SELECT email_address FROM users
WHERE email_address LIKE '%example[cno]m';
```

### Use Cases Summary

- Search for values **starting with** a specific string: `LIKE 'J%'`
- Search for values **ending with** a specific string: `LIKE '%s'`
- Search for values **containing** a substring: `LIKE '%er%'`
- Search for values with a **specific character at a position**: `LIKE '_er%'`
- **Case-insensitive** version of all the above: replace `LIKE` with `ILIKE`

---

## 13. Aggregate Functions

Aggregate functions perform **calculations on a set of values** and return a single result. They work on groups of rows rather than individual rows.

### Common Aggregate Functions

| Function | Description |
|---|---|
| `SUM(column)` | Calculates the total sum of a numeric column |
| `AVG(column)` | Computes the average value of a numeric column |
| `COUNT(*)` | Counts the total number of rows |
| `MIN(column)` | Returns the minimum value in a column |
| `MAX(column)` | Returns the maximum value in a column |

### Syntax

```sql
SELECT AGGREGATE_FUNCTION(column_name) FROM table_name;
```

### Examples

**Minimum replacement cost of films:**
```sql
SELECT MIN(replacement_cost) FROM film;
```

**Maximum replacement cost:**
```sql
SELECT MAX(replacement_cost) FROM film;
```

**Both min and max together:**
```sql
SELECT MIN(replacement_cost), MAX(replacement_cost) FROM film;
```

**Average replacement cost (rounded to 2 decimal places):**
```sql
SELECT ROUND(AVG(replacement_cost), 2) FROM film;
```

**Total cost to replace all films:**
```sql
SELECT SUM(replacement_cost) FROM film;
```

> **Important:** You cannot mix an aggregate function with a regular column in a `SELECT` clause without using `GROUP BY`. For example, `SELECT rating, MIN(replacement_cost) FROM film` will fail without a `GROUP BY rating`.

---

## 14. GROUP BY

The `GROUP BY` clause groups rows from a table into summary rows based on one or more columns, then applies aggregate functions to each group.

### Why Use GROUP BY?

- Summarize data — compute totals, averages, or counts per category
- Segmentation — analyze data by discrete attributes
- Reporting — generate summarized reports and dashboards

### The Split–Apply–Combine Process

1. **Split** — the dataset is divided into groups based on unique values in the specified column(s)
2. **Apply** — aggregate functions are applied to each group
3. **Combine** — the aggregated results are combined into a summary result set

### Syntax

```sql
SELECT column_name, AGGREGATE_FUNCTION(column_name)
FROM table_name
WHERE condition           -- optional, filters rows BEFORE grouping
GROUP BY column_name
ORDER BY column_name;     -- optional
```

### Best Practices

- **Column selection** — only include columns in `SELECT` that are either part of `GROUP BY` or wrapped in an aggregate function
- **Null values** — be mindful; nulls can affect grouping and aggregation results
- **Sorting** — use `ORDER BY` to present grouped results meaningfully
- **Filtering after grouping** — use `HAVING` (covered next) not `WHERE`

### Examples

**Total amount spent per customer:**
```sql
SELECT customer_id, SUM(amount)
FROM payment
GROUP BY customer_id
ORDER BY SUM(amount) DESC;
```

**Total amount per staff member per customer:**
```sql
SELECT customer_id, staff_id, SUM(amount)
FROM payment
GROUP BY customer_id, staff_id
ORDER BY SUM(amount);
```

**Total transactions per day:**
```sql
SELECT DATE(payment_date), SUM(amount)
FROM payment
GROUP BY DATE(payment_date)
ORDER BY SUM(amount);
```

**Number of transactions per customer:**
```sql
SELECT customer_id, COUNT(amount) AS total_transactions
FROM payment
GROUP BY customer_id
ORDER BY COUNT(amount) DESC;
```

---

## 15. HAVING

The `HAVING` clause filters the **results of a GROUP BY query** based on aggregate values. While `WHERE` filters individual rows before grouping, `HAVING` filters groups after aggregation.

### Syntax

```sql
SELECT column_name, AGGREGATE_FUNCTION(column_name)
FROM table_name
GROUP BY column_name
HAVING condition;
```

### WHERE vs. HAVING

| Clause | When It Filters | What It Filters |
|---|---|---|
| `WHERE` | **Before** grouping | Individual rows |
| `HAVING` | **After** grouping | Groups / aggregate results |

### Examples

**Find departments with more than 10 employees:**
```sql
SELECT department, COUNT(*)
FROM employees
GROUP BY department
HAVING COUNT(*) > 10;
```

**Find departments with average salary above 50,000:**
```sql
SELECT department, AVG(salary)
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000;
```

**Customers who have spent more than 100 in total:**
```sql
SELECT customer_id, SUM(amount)
FROM payment
GROUP BY customer_id
HAVING SUM(amount) > 100;
```

**Stores with more than 300 customers:**
```sql
SELECT store_id, COUNT(customer_id)
FROM customer
GROUP BY store_id
HAVING COUNT(customer_id) > 300;
```

> **Performance tip:** Improper use of `HAVING` with large datasets can slow down query execution. Use it judiciously and ensure columns used for grouping are indexed where possible.

---

## 16. AS (Aliases)

The `AS` statement lets you give **temporary nicknames (aliases)** to columns or calculations within your queries, making results more readable.

### When to Use AS

- Give friendly, descriptive names to columns in query results
- Simplify complex expressions or calculations
- Distinguish between copies of the same table in joins

### Syntax

```sql
SELECT original_name AS new_name FROM table_name;
```

> Use **double quotes** if your alias contains spaces or special characters:
> ```sql
> SELECT SUM(amount) AS "Total Amount Spent"
> ```

### Important Rule

The `AS` alias is **executed at the end of the query**. This means you **cannot use an alias** inside `WHERE` or `HAVING` clauses — you must use the original expression there.

```sql
-- This will FAIL:
SELECT SUM(amount) AS total_spent
FROM payment
GROUP BY customer_id
HAVING total_spent > 100;  -- ❌ alias not yet available here

-- This is CORRECT:
SELECT SUM(amount) AS total_spent
FROM payment
GROUP BY customer_id
HAVING SUM(amount) > 100;  -- ✅ use the original expression
```

### Examples

**Rename a count column:**
```sql
SELECT COUNT(amount) AS number_of_transactions
FROM payment;
```

**Rename a sum column with a descriptive alias:**
```sql
SELECT customer_id, SUM(amount) AS total_spent
FROM payment
GROUP BY customer_id
HAVING SUM(amount) > 100;
```

### Best Practices

- Choose aliases that are **meaningful and easy to understand**
- Avoid overly short or cryptic names
- Be **consistent** with naming conventions
- Don't overuse aliases in very complex queries

---

## 17. Challenges & Solutions

### Challenge 1 — Basic SELECT

**Situation:** Retrieve the first name, last name, and email of all customers.

```sql
SELECT first_name, last_name, email FROM customer;
```

---

### Challenge 2 — Payment Date & Amount

**Situation:** Retrieve the customer ID, payment date, and amount from every payment.

```sql
SELECT customer_id, payment_date, amount FROM payment;
```

---

### Challenge 3 — Unique Customer First Names

**Situation:** Identify unique first names across all customers.

```sql
SELECT DISTINCT first_name FROM customer;
```

---

### Challenge 4 — Films with PG-13 Rating Released After 2000

**Situation:** Find the titles and replacement costs of films rated PG-13, released in or after the year 2000.

```sql
SELECT title, replacement_cost
FROM film
WHERE release_year >= 2000
AND rating = 'PG-13';
```

---

### Challenge 5 — Films with PG Rating and Specific Replacement Cost

**Situation:** Find titles of films rated PG with a replacement cost of $10.99.

```sql
SELECT title FROM film
WHERE rating = 'PG'
AND replacement_cost = 10.99;
```

---

### Challenge 6 — Films Released Before 2000 OR Low Replacement Cost

**Situation:** Find films released before 2000 or with a replacement cost less than $10.

```sql
SELECT title FROM film
WHERE release_year < 2000
OR replacement_cost < 10;
```

---

### Challenge 7 — Conditional Payment Retrieval

**Situation:** Retrieve payment ID, customer ID, and amount for payments with an amount greater than 100.

```sql
SELECT payment_id, customer_id, amount
FROM payment
WHERE amount > 100;
```

---

### Challenge 8 — Sorting and Limiting

**Situation:** Retrieve first name, last name, and email of customers sorted by last name ascending, limited to 5 results.

```sql
SELECT first_name, last_name, email
FROM customer
ORDER BY last_name ASC
LIMIT 5;
```

---

### Challenge 9 — Payments in a Specific Year

**Situation:** Retrieve the payment ID, customer ID, and payment date from payments made in the year 2022.

```sql
SELECT payment_id, customer_id, payment_date
FROM payment
WHERE EXTRACT(YEAR FROM payment_date) = 2022;
```

---

### Challenge 10 — Gmail Customers

**Situation:** Find customers whose email contains "gmail".

```sql
SELECT first_name, last_name, email
FROM customer
WHERE email LIKE '%gmail%';
```

---

### Challenge 11 — Payment Amount Range

**Situation:** Retrieve payments with an amount between 50 and 100 (inclusive).

```sql
SELECT payment_id, customer_id, amount
FROM payment
WHERE amount BETWEEN 50 AND 100;
```

---

### Challenge 12 — Total Amount per Staff Member

**Situation:** Find the total amount collected by each staff member.

```sql
SELECT staff_id, SUM(amount)
FROM payment
GROUP BY staff_id;
```

---

### Challenge 13 — Payments on a Specific Date

**Situation:** List all payments made on a specific date.

```sql
SELECT payment_id, amount, payment_date
FROM payment
WHERE DATE(payment_date) = '2007-02-15';
```

---

## Quick Reference Cheat Sheet

```sql
-- Basic retrieval
SELECT column1, column2 FROM table_name;
SELECT * FROM table_name;

-- Unique values
SELECT DISTINCT column FROM table_name;

-- Filtering rows
SELECT * FROM table_name WHERE condition;

-- Pattern matching
SELECT * FROM table_name WHERE column LIKE 'J%';      -- case-sensitive
SELECT * FROM table_name WHERE column ILIKE 'j%';     -- case-insensitive

-- Range filtering
SELECT * FROM table_name WHERE column BETWEEN 10 AND 20;

-- List filtering
SELECT * FROM table_name WHERE column IN ('a', 'b', 'c');

-- Sorting
SELECT * FROM table_name ORDER BY column ASC;
SELECT * FROM table_name ORDER BY column DESC;

-- Limiting results
SELECT * FROM table_name LIMIT 10;

-- Counting
SELECT COUNT(*) FROM table_name;
SELECT COUNT(DISTINCT column) FROM table_name;

-- Aggregation
SELECT SUM(column) FROM table_name;
SELECT AVG(column) FROM table_name;
SELECT MIN(column), MAX(column) FROM table_name;

-- Grouping
SELECT column, SUM(amount) FROM table_name GROUP BY column;

-- Filtering groups
SELECT column, COUNT(*) FROM table_name
GROUP BY column
HAVING COUNT(*) > 10;

-- Aliases
SELECT column AS friendly_name FROM table_name;
```

---

## Notes

- SQL keywords are **case-insensitive** (`SELECT` = `select`), but it is best practice to **capitalize them** to distinguish them from column and table names.
- A **semicolon** at the end of a query is optional in pgAdmin but considered best practice.
- The **default port** for PostgreSQL is `5432`.
- The `AS` alias is resolved at the **end** of query execution and cannot be used inside `WHERE` or `HAVING`.
- `WHERE` filters rows **before** grouping; `HAVING` filters groups **after** aggregation.