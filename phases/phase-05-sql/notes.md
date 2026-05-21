# SQL — Structured Query Language

### What is a Database?

A **database** is any collection of related information. This is the most general definition — a database does not have to be digital.

**Everyday examples of databases:**

- A phonebook (stores names and phone numbers)
- A shopping list (stores items to buy)
- A to-do list (stores tasks)

### Store a Database

Computers can:

- Store **trillions** of pieces of information efficiently
- Manage **security** (usernames, passwords, encryption)
- **Backup and duplicate** data across servers
- Allow **software applications** to interact with stored data automatically

| Feature        | Shopping List    | Amazon.com            |
| -------------- | ---------------- | --------------------- |
| Data Volume    | 10–20 items      | Trillions of records  |
| Security Need  | None             | Critical              |
| Storage Medium | Paper / Memory   | Computers / Servers   |
| Importance     | Convenience only | Essential to business |

### Database Management Systems (DBMS)

A **Database Management System** is special software that helps users create and maintain a database on a computer. It handles:

- **Security** — access control via usernames and passwords
- **Backup and restore** — protect data from loss
- **Import and export** — move data between systems
- **Software integration** — applications interact with the DBMS to read/write data

### C.R.U.D. Operations

| Operation           | Description                          |
| ------------------- | ------------------------------------ |
| **C**reate          | Insert new records into the database |
| **R**ead (Retrieve) | Fetch/query existing data            |
| **U**pdate          | Modify existing records              |
| **D**elete          | Remove records from the database     |

### Types of Databases

#### Relational Databases (SQL Databases)

Organize data into one or more **tables** with columns and rows. A unique key identifies each row.

**Popular Relational DBMS:** MySQL, Oracle, PostgreSQL, MariaDB, Microsoft SQL Server

#### Non-Relational Databases (NoSQL Databases)

Organize data in anything other than traditional tables:

| Type              | Example Systems  | Storage Format     |
| ----------------- | ---------------- | ------------------ |
| Key-Value Store   | Redis, DynamoDB  | Key → Value pairs  |
| Document Database | MongoDB, CouchDB | JSON / XML objects |
| Graph Database    | Neo4j            | Nodes and edges    |
| Wide Column       | Apache Cassandra | Flexible tables    |

### What is a Query?

A **database query** is a request made to the DBMS for specific information. Think of it like a Google search — you describe what you want and the system finds it for you. Queries are written in SQL.

### Core Concepts in Relational Databases

All data in a relational database is stored in **tables**.

- **Column** — defines a single attribute (e.g., Name, Major, Salary)
- **Row** — a single entry or record (e.g., one student's full information)

**Example Student Table:**

| Student ID | Name   | Major     |
| ---------- | ------ | --------- |
| 1          | Jack   | Biology   |
| 2          | Kate   | Sociology |
| 3          | Claire | English   |

### Primary Keys

A **primary key** is an attribute that **uniquely identifies** each row. No two rows can share the same primary key value.

| Key Type          | Description                              | Example                |
| ----------------- | ---------------------------------------- | ---------------------- |
| **Surrogate Key** | Randomly assigned; no real-world meaning | Employee ID = 100      |
| **Natural Key**   | A real-world identifier                  | Social Security Number |

### Foreign Keys

A **foreign key** is a column in one table that stores the **primary key of a row in another table**. Foreign keys define relationships between tables.

> **Example:** The `Employee` table has a `branch_id` column (foreign key) pointing to the `Branch` table's `branch_id` (primary key).

### Composite Keys

A **composite key** (compound key) is a primary key made up of **two or more columns**. Neither column alone can uniquely identify a row — only together can they.

> **Example — Branch Supplier table:** The primary key is a combination of `branch_id` AND `supplier_name`.

**Example Company Database**:

| Table           | Primary Key               | Key Foreign Keys             |
| --------------- | ------------------------- | ---------------------------- |
| Employee        | emp_id                    | super_id, branch_id          |
| Branch          | branch_id                 | mgr_id → Employee            |
| Client          | client_id                 | branch_id → Branch           |
| Works_With      | emp_id + client_id        | Both FK to Employee & Client |
| Branch_Supplier | branch_id + supplier_name | branch_id → Branch           |

### What is SQL?

**SQL** (Structured Query Language) is a **standardized language** for interacting with Relational Database Management Systems (RDBMS). It is used to create, read, update, and delete data, as well as manage database structure and security.

> SQL is similar to a programming language, but it is specifically designed for interacting with databases.

### SQL as a Hybrid Language

SQL is actually **four types of languages in one**:

| Type                       | Abbreviation | Purpose                                  |
| -------------------------- | ------------ | ---------------------------------------- |
| Data Query Language        | DQL          | Retrieve specific data from the database |
| Data Definition Language   | DDL          | Define tables and database schema        |
| Data Control Language      | DCL          | Manage user access and permissions       |
| Data Manipulation Language | DML          | Insert, update, delete data              |

## Data Types in SQL

When creating tables, every column must have a defined **data type**.

| Data Type      | Description                                     | Example                      |
| -------------- | ----------------------------------------------- | ---------------------------- |
| `INT`          | Whole number (no decimals)                      | 1, 42, 1000                  |
| `DECIMAL(M,N)` | Decimal — M total digits, N after decimal point | `DECIMAL(10,4)` → 9999.9999  |
| `VARCHAR(N)`   | Variable-length string up to N characters       | `VARCHAR(20)` → 'John Smith' |
| `BLOB`         | Binary Large Object — images, files             | Profile photo                |
| `DATE`         | Date in `YYYY-MM-DD` format                     | 1990-01-25                   |
| `TIMESTAMP`    | Date and time `YYYY-MM-DD HH:MM:SS`             | 2024-03-15 14:30:00          |

> **Note:** Different RDBMS may offer additional data types beyond these core ones.

## Creating, Modifying, and Deleting Tables

### CREATE TABLE

```sql
CREATE TABLE student (
  student_id INT PRIMARY KEY,
  name       VARCHAR(20),
  major      VARCHAR(20)
);
```

### Column Constraints

| Constraint        | Description                                             |
| ----------------- | ------------------------------------------------------- |
| `PRIMARY KEY`     | Uniquely identifies each row; cannot be NULL            |
| `NOT NULL`        | Column value cannot be empty / NULL                     |
| `UNIQUE`          | All values in the column must be different              |
| `DEFAULT 'value'` | Sets a default value if none is provided on insert      |
| `AUTO_INCREMENT`  | Automatically increments integer value for each new row |

### Example with All Constraints

```sql
CREATE TABLE student (
  student_id INT ,
  name       VARCHAR(20) NOT NULL,
  major      VARCHAR(20) DEFAULT 'Undecided',
  PRIMARY KEY(student_id)
);
```

### ALTER TABLE — Add or Drop Columns

```sql
-- Add a column
ALTER TABLE student ADD gpa DECIMAL(3,2);

-- Remove a column
ALTER TABLE student DROP COLUMN gpa;
```

### DROP TABLE

```sql
DROP TABLE student;
```

> ⚠️ **Warning:** `DROP TABLE` permanently deletes the table and all its data.

---

## Inserting Data

### Basic INSERT

```sql
INSERT INTO student VALUES (1, 'Jack', 'Biology');
```

The values must match the **order of columns** defined in the table.

### INSERT with Specific Columns

Use this when you don't have values for every column. Omitted columns receive `NULL` or their `DEFAULT` value.

```sql
INSERT INTO student (student_id, name) VALUES (3, 'Claire');
-- major will be NULL or default value
```

### Viewing Inserted Data

```sql
SELECT * FROM student;
```

### Multiple Inserts

```sql
INSERT INTO student VALUES (1, 'Jack',  'Biology');
INSERT INTO student VALUES (2, 'Kate',  'Sociology');
INSERT INTO student VALUES (3, 'Claire', NULL);
INSERT INTO student VALUES (4, 'Jack',  'Biology');
INSERT INTO student VALUES (5, 'Mike',  'Computer Science');
```

## Updating and Deleting Data

### UPDATE Statement

```sql
UPDATE student
SET major = 'Bio'
WHERE major = 'Biology';
```

### UPDATE Multiple Columns

```sql
UPDATE student
SET name = 'Tom', major = 'Undecided'
WHERE student_id = 1;
```

### UPDATE with OR Condition

```sql
UPDATE student
SET major = 'Biochemistry'
WHERE major = 'Bio' OR major = 'Chemistry';
```

### UPDATE All Rows (No WHERE)

```sql
UPDATE student SET major = 'Undecided';
```

> ⚠️ **Warning:** Without a `WHERE` clause, ALL rows are affected.

### DELETE Statement

```sql
-- Delete a specific row
DELETE FROM student WHERE student_id = 5;

-- Delete with multiple conditions
DELETE FROM student WHERE name = 'Tom' AND major = 'Undecided';

-- Delete ALL rows
DELETE FROM student;
```

---

## SELECT Queries

### Basic SELECT

```sql
-- Select all columns
SELECT * FROM student;

-- Select specific columns
SELECT name, major FROM student;

-- Prefix with table name (useful in complex queries)
SELECT student.name, student.major FROM student;
```

### ORDER BY

```sql
-- Ascending (default)
SELECT * FROM student ORDER BY name;

-- Descending
SELECT * FROM student ORDER BY name DESC;

-- Order by multiple columns
SELECT * FROM student ORDER BY major, student_id DESC;
```

### LIMIT

```sql
SELECT * FROM student LIMIT 5;

-- Combine with ORDER BY
SELECT * FROM student ORDER BY student_id DESC LIMIT 2;
```

### WHERE Clause (Filtering)

```sql
SELECT * FROM student WHERE major = 'Biology';

SELECT * FROM student WHERE major = 'Chemistry' OR major = 'Biology';

SELECT * FROM student WHERE student_id < 3 AND name <> 'Jack';
```

### Comparison Operators

| Operator     | Meaning                             |
| ------------ | ----------------------------------- |
| `=`          | Equal to                            |
| `<>` or `!=` | Not equal to                        |
| `<`          | Less than                           |
| `>`          | Greater than                        |
| `<=`         | Less than or equal to               |
| `>=`         | Greater than or equal to            |
| `AND`        | Both conditions must be true        |
| `OR`         | At least one condition must be true |

### IN Keyword

```sql
SELECT * FROM student
WHERE name IN ('Claire', 'Kate', 'Mike');

SELECT * FROM student
WHERE major IN ('Biology', 'Chemistry');
```

### AS (Aliases)

Rename a column in the result:

```sql
SELECT name AS first_name, major AS stream
FROM student;

SELECT first_name AS forename, last_name AS surname
FROM employee;
```

### DISTINCT

Return only unique values:

```sql
SELECT DISTINCT name FROM student

SELECT DISTINCT sex FROM employee;

SELECT DISTINCT branch_id FROM employee;
```

## SQL Functions & Aggregation

### COUNT

```sql
-- Count all employees
SELECT COUNT(emp_id) FROM employee;

-- Count employees WITH a supervisor (non-NULL only)
SELECT COUNT(super_id) FROM employee;

-- Count female employees born after 1970
SELECT COUNT(emp_id) FROM employee
WHERE sex = 'F' AND birth_date > '1970-01-01';
```

### AVG

```sql
-- Average salary of all employees
SELECT AVG(salary) FROM employee;

-- Average salary of male employees
SELECT AVG(salary) FROM employee WHERE sex = 'M';
```

### SUM

```sql
-- Total payroll cost
SELECT SUM(salary) FROM employee;
```

### GROUP BY (Aggregation)

`GROUP BY` groups rows by a column value, then applies aggregate functions per group.

```sql
-- Count of male vs female employees
SELECT COUNT(sex), sex
FROM employee
GROUP BY sex;

-- Total sales per employee
SELECT SUM(total_sales), emp_id
FROM works_with
GROUP BY emp_id;

-- Total spending per client
SELECT SUM(total_sales), client_id
FROM works_with
GROUP BY client_id;
```

### HAVING Clause

`HAVING` filters **grouped results** — like `WHERE` but applied **after** `GROUP BY`. You cannot use `WHERE` to filter on aggregate functions; use `HAVING` instead.

```sql
-- Branches with more than 2 employees
SELECT branch_id, COUNT(emp_id) AS total_employees
FROM employee
GROUP BY branch_id
HAVING COUNT(emp_id) > 2;

-- Employees whose total sales exceed $100,000
SELECT emp_id, SUM(total_sales) AS total
FROM works_with
GROUP BY emp_id
HAVING SUM(total_sales) > 100000;
```

> **WHERE vs HAVING:**
>
> - `WHERE` filters **rows** before grouping
> - `HAVING` filters **groups** after aggregation

### MIN and MAX

```sql
-- Lowest salary in the company
SELECT MIN(salary) FROM employee;

-- Highest salary in the company
SELECT MAX(salary) FROM employee;

-- Min and max salary per branch
SELECT branch_id, MIN(salary), MAX(salary)
FROM employee
GROUP BY branch_id;
```

---

## Wildcards and the LIKE Keyword

### Wildcard Characters

| Character | Meaning                                 |
| --------- | --------------------------------------- |
| `%`       | Any number of characters (zero or more) |
| `_`       | Exactly one character                   |

### LIKE Examples

```sql
-- Find clients who are LLCs (name ends with 'LLC')
SELECT * FROM client
WHERE client_name LIKE '%LLC';

-- Find suppliers with 'Label' anywhere in name
SELECT * FROM branch_supplier
WHERE supplier_name LIKE '%Label%';

-- Find employees born in October (month = 10)
-- Date format: YYYY-MM-DD → 4 chars, dash, then '10'
SELECT * FROM employee e WHERE e.birth_day::TEXT LIKE '____-10%';

-- Find employees born in February
SELECT * FROM employee WHERE birth_day::TEXT LIKE '____-02%';

-- Find clients that are schools
SELECT * FROM client
WHERE client_name LIKE '%school%';
```

> **Tip:** Wildcards are similar to regular expressions but simplified. `%` = `.*` and `_` = `.` in regex terms.

---

## UNION

### What is UNION?

`UNION` **combines the results** of two or more `SELECT` statements into a single result set.

**Rules:**

- Both SELECT statements must return the **same number of columns**
- Corresponding columns must have **compatible data types**
- Column names in the result come from the **first** SELECT statement

### UNION Examples

```sql
-- List all employee names AND branch names in one column
SELECT first_name AS company_names FROM employee
UNION
SELECT branch_name FROM branch;

-- Add client names too
SELECT first_name AS company_names FROM employee
UNION
SELECT branch_name FROM branch
UNION
SELECT client_name FROM client;

-- List all clients and suppliers with their branch IDs
SELECT client_name, client.branch_id FROM client
UNION
SELECT supplier_name, branch_supplier.branch_id FROM branch_supplier;

-- All money flowing in or out of the company
SELECT salary FROM employee
UNION
SELECT total_sales FROM works_with;
```

## JOINs

### What is a JOIN?

A **JOIN** combines rows from two or more tables based on a **related column** between them. Used when the data you need is spread across multiple tables.

### Types of JOINs

| JOIN Type                | Description                                                             |
| ------------------------ | ----------------------------------------------------------------------- |
| `INNER JOIN` (or `JOIN`) | Returns rows where there is a **match in BOTH tables**                  |
| `LEFT JOIN`              | Returns **ALL rows from the left table** + matching rows from the right |
| `RIGHT JOIN`             | Returns **ALL rows from the right table** + matching rows from the left |
| `FULL OUTER JOIN`        | Returns ALL rows from both tables (not natively supported in MySQL)     |

> **Left table** = the table in the `FROM` clause. **Right table** = the table after `JOIN`.

### JOIN Examples

```sql
-- INNER JOIN: Branches and their manager names
SELECT employee.emp_id, employee.first_name, branch.branch_name
FROM employee
JOIN branch ON employee.emp_id = branch.mgr_id;

-- LEFT JOIN: All employees (branch name shown only if they are a manager)
SELECT employee.emp_id, employee.first_name, branch.branch_name
FROM employee
LEFT JOIN branch ON employee.emp_id = branch.mgr_id;

-- RIGHT JOIN: All branches (manager name shown only if one exists)
SELECT employee.emp_id, employee.first_name, branch.branch_name
FROM employee
RIGHT JOIN branch ON employee.emp_id = branch.mgr_id;
```

### FULL OUTER JOIN

A `FULL OUTER JOIN` returns **all rows from both tables**, filling in `NULL` where there is no match. It is the combination of LEFT JOIN + RIGHT JOIN.

```sql
-- PostgreSQL / Standard SQL syntax
SELECT employee.first_name, branch.branch_name
FROM employee
FULL OUTER JOIN branch ON employee.emp_id = branch.mgr_id;
```

> **Note:** MySQL does **not** support `FULL OUTER JOIN` natively. Simulate it with a `UNION` of LEFT and RIGHT joins:

```sql
-- MySQL workaround for FULL OUTER JOIN
SELECT employee.first_name, branch.branch_name
FROM employee
LEFT JOIN branch ON employee.emp_id = branch.mgr_id

UNION

SELECT employee.first_name, branch.branch_name
FROM employee
RIGHT JOIN branch ON employee.emp_id = branch.mgr_id;
```

### Visual Summary of JOINs

```
Table A   Table B
  ┌───┐     ┌───┐
  │ A │─────│ B │
  └───┘     └───┘

INNER JOIN  → only the overlapping middle (matched rows)
LEFT JOIN   → all of A + matched rows from B (unmatched B = NULL)
RIGHT JOIN  → all of B + matched rows from A (unmatched A = NULL)
FULL OUTER  → everything from A and B (unmatched = NULL on either side)
```

## Nested Queries

### What is a Nested Query?

A **nested query** (subquery) is a `SELECT` statement embedded **inside another** `SELECT` statement. The **inner query runs first**; its result is used by the outer query.

### Example: Find Employees Who Sold Over $30,000

```sql
SELECT employee.first_name, employee.last_name
FROM employee
WHERE employee.emp_id IN (
  SELECT works_with.emp_id
  FROM works_with
  WHERE works_with.total_sales > 30000
);
```

**How it works:**

1. The inner query gets all `emp_id` values where `total_sales > 30000`
2. The outer query finds employees whose ID appears in that list

### Example: Clients Handled by Michael Scott's Branch

```sql
SELECT client.client_name
FROM client
WHERE client.branch_id = (
  SELECT branch.branch_id
  FROM branch
  WHERE branch.mgr_id = 102
  LIMIT 1
);
```

> **Tip:** Use `LIMIT 1` with `=` to ensure the subquery returns only one value. Use `IN` instead if multiple results are expected.

---

## ON DELETE — Handling Foreign Key Deletions

### The Problem

When a row is deleted that is **referenced by a foreign key** in another table, what happens to that foreign key value? SQL provides two strategies.

### ON DELETE SET NULL

When the referenced row is deleted, the foreign key column is **set to NULL**.

```sql
FOREIGN KEY (mgr_id)
  REFERENCES employee(emp_id)
  ON DELETE SET NULL;
```

**Use when:** The foreign key is **NOT** part of the primary key — the value is optional.

### ON DELETE CASCADE

When the referenced row is deleted, the **entire row** containing the foreign key is also deleted.

```sql
FOREIGN KEY (branch_id)
  REFERENCES branch(branch_id)
  ON DELETE CASCADE;
```

**Use when:** The foreign key **IS part of the primary key** — NULL is not allowed in a PK.

### Comparison Table

|                   | ON DELETE SET NULL      | ON DELETE CASCADE           |
| ----------------- | ----------------------- | --------------------------- |
| **What happens?** | FK becomes NULL         | Entire row is deleted       |
| **When to use?**  | FK is optional (not PK) | FK is part of PK            |
| **Example**       | `Branch.mgr_id`         | `Branch_Supplier.branch_id` |

---

## Triggers

### What is a Trigger?

A **trigger** is a block of SQL code that **automatically executes** when a specific database operation (`INSERT`, `UPDATE`, `DELETE`) occurs on a table.

### Basic Trigger Syntax

```sql
DELIMITER $$
CREATE TRIGGER trigger_name
  BEFORE INSERT ON employee
  FOR EACH ROW BEGIN
    INSERT INTO trigger_test VALUES ('added new employee');
  END$$
DELIMITER ;
```

```sql
CREATE OR REPLACE FUNCTION log_new_employee()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO trigger_test VALUES ('added new employee');
    RETURN NEW; -- Required for BEFORE INSERT triggers
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER my_trigger
  BEFORE INSERT ON employee
  FOR EACH ROW
  EXECUTE FUNCTION log_new_employee();
```

> **Important:** Triggers must be created in the **MySQL terminal** (not PopSQL) because the `DELIMITER` command is required.

### Accessing the New Row with `NEW`

`NEW` refers to the row being inserted. Use `NEW.column_name` to access its values.

```sql
DELIMITER $$
CREATE TRIGGER my_trigger
  BEFORE INSERT ON employee
  FOR EACH ROW BEGIN
    INSERT INTO trigger_test VALUES (NEW.first_name);
  END$$
DELIMITER ;
```

```sql
CREATE OR REPLACE FUNCTION log_new_employee()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO trigger_test VALUES (NEW.first_name);
    RETURN NEW; -- Required for BEFORE INSERT triggers
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER my_trigger
  BEFORE INSERT ON employee
  FOR EACH ROW
  EXECUTE FUNCTION log_new_employee();
```

### Trigger with IF / ELSEIF / ELSE

```sql
DELIMITER $$
CREATE TRIGGER my_trigger2
  BEFORE INSERT ON employee
  FOR EACH ROW BEGIN
    IF NEW.sex = 'M' THEN
      INSERT INTO trigger_test VALUES ('added male employee');
    ELSEIF NEW.sex = 'F' THEN
      INSERT INTO trigger_test VALUES ('added female employee');
    ELSE
      INSERT INTO trigger_test VALUES ('added other employee');
    END IF;
  END$$
DELIMITER ;
```

### Trigger Options

| Option          | Available Values                             |
| --------------- | -------------------------------------------- |
| **Timing**      | `BEFORE` or `AFTER`                          |
| **Event**       | `INSERT`, `UPDATE`, or `DELETE`              |
| **Row keyword** | `NEW` (INSERT/UPDATE), `OLD` (DELETE/UPDATE) |

### Drop a Trigger

```sql
DROP TRIGGER my_trigger ON employee;
```

## ER Diagrams

### What is an ER Diagram?

An **Entity-Relationship (ER) Diagram** is a visual tool for designing a database schema. It acts as a middleman between business/data requirements and the actual database implementation.

```
Requirements Document  →  ER Diagram  →  Database Schema
```

### ER Diagram Symbols

| Symbol                   | Shape               | Meaning                                                        |
| ------------------------ | ------------------- | -------------------------------------------------------------- |
| Entity                   | Rectangle           | An object to store (e.g., Student, Employee)                   |
| Attribute                | Oval                | A property of an entity (e.g., Name, GPA)                      |
| Primary Key              | Underlined Oval     | Attribute that uniquely identifies a row                       |
| Composite Attribute      | Oval with sub-ovals | Attribute broken into parts (Name → fname, lname)              |
| Multi-valued Attribute   | Double Oval         | Attribute with multiple values (e.g., Clubs)                   |
| Derived Attribute        | Dashed Oval         | Value derived from other attributes (e.g., Age from BirthDate) |
| Relationship             | Diamond             | How entities relate (a verb, e.g., "Takes")                    |
| Weak Entity              | Double Rectangle    | Entity that depends on another to be identified                |
| Identifying Relationship | Double Diamond      | Relationship that identifies a weak entity                     |

### Participation

- **Single Line** → **Partial Participation**: Not all instances need to participate
- **Double Line** → **Total Participation**: ALL instances must participate

> Example: All branches must have a manager (total), but not all employees are managers (partial).

### Cardinality Ratios

| Cardinality | Meaning                                        |
| ----------- | ---------------------------------------------- |
| **1 : 1**   | One entity relates to exactly one of the other |
| **1 : N**   | One entity relates to many of the other        |
| **M : N**   | Many entities relate to many of the other      |

### Company ER Diagram Relationships

| Relationship | Entities                 | Cardinality | Notes                             |
| ------------ | ------------------------ | ----------- | --------------------------------- |
| Works For    | Employee ↔ Branch        | N : 1       | All employees work at a branch    |
| Manages      | Employee ↔ Branch        | 1 : 1       | All branches have a manager       |
| Supervises   | Employee ↔ Employee      | 1 : N       | Self-referencing relationship     |
| Handles      | Branch ↔ Client          | 1 : N       | Each client belongs to one branch |
| Works With   | Employee ↔ Client        | M : N       | Tracks total sales                |
| Supplies     | Branch ↔ Branch Supplier | 1 : N       | Weak entity relationship          |

---

## Constraints — CHECK & Advanced Schema Rules

### Recap of All Constraints

| Constraint       | Description                                                     |
| ---------------- | --------------------------------------------------------------- |
| `PRIMARY KEY`    | Uniquely identifies each row; NOT NULL + UNIQUE                 |
| `FOREIGN KEY`    | Links to a primary key in another table                         |
| `NOT NULL`       | Column must always have a value                                 |
| `UNIQUE`         | All values in the column must be distinct                       |
| `DEFAULT`        | Provides a fallback value when none is given                    |
| `AUTO_INCREMENT` | Auto-increments integer values (MySQL) or `SERIAL` (PostgreSQL) |
| `CHECK`          | Ensures column values satisfy a boolean condition               |

### CHECK Constraint

The `CHECK` constraint enforces a **condition** on a column's value. Any row that violates the condition is rejected.

```sql
-- Salary must be positive
CREATE TABLE employee (
  emp_id   INT PRIMARY KEY,
  name     VARCHAR(50) NOT NULL,
  salary   DECIMAL(10,2) CHECK (salary > 0),
  age      INT CHECK (age >= 18 AND age <= 100),
  sex      CHAR(1) CHECK (sex IN ('M', 'F', 'O'))
);
```

### Named CHECK Constraint

Give constraints a name for easier error messages and management:

```sql
CREATE TABLE product (
  product_id  INT PRIMARY KEY,
  price       DECIMAL(10,2),
  discount    DECIMAL(5,2),
  CONSTRAINT chk_price_positive CHECK (price > 0),
  CONSTRAINT chk_discount_range CHECK (discount >= 0 AND discount <= 100)
);
```

### Adding CHECK to an Existing Table

```sql
ALTER TABLE employee
ADD CONSTRAINT chk_salary CHECK (salary > 0);
```

### Dropping a Constraint

```sql
-- MySQL
ALTER TABLE employee DROP CHECK chk_salary;

-- PostgreSQL
ALTER TABLE employee DROP CONSTRAINT chk_salary;
```

> **Note:** `CHECK` constraints are supported in PostgreSQL fully. In older MySQL versions (before 8.0.16) the syntax is accepted but **not enforced** — upgrade to MySQL 8.0.16+ or use PostgreSQL for reliable CHECK enforcement.

---

## Indexing

### What is an Index?

An **index** is a data structure that speeds up data retrieval on a table. Without an index, the database performs a **full table scan** (reads every row). With an index, it jumps directly to the matching rows.

> Think of it like a book's index — instead of reading every page, you look up the term and jump to the right page.

### Trade-offs

| Benefit                           | Cost                                         |
| --------------------------------- | -------------------------------------------- |
| Faster `SELECT` / `WHERE` queries | Slightly slower `INSERT`, `UPDATE`, `DELETE` |
| Faster `ORDER BY` and `JOIN`      | Uses extra disk space                        |
| Reduces full table scans          | Index must be maintained on writes           |

### Creating an Index

```sql
-- Basic index on one column
CREATE INDEX idx_last_name ON employee(last_name);

-- Index on multiple columns (composite index)
CREATE INDEX idx_name ON employee(last_name, first_name);

-- Unique index (also enforces uniqueness like UNIQUE constraint)
CREATE UNIQUE INDEX idx_email ON users(email);
```

### Viewing Indexes

```sql
-- MySQL
SHOW INDEX FROM employee;

-- PostgreSQL
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'employee';
```

### Dropping an Index

```sql
-- MySQL
DROP INDEX idx_last_name ON employee;

-- PostgreSQL
DROP INDEX idx_last_name;
```

### When to Use Indexes

**Good candidates for indexing:**

- Columns frequently used in `WHERE` clauses
- Columns used in `JOIN` conditions
- Columns used in `ORDER BY` or `GROUP BY`
- Foreign key columns

**Avoid indexing:**

- Columns with very low cardinality (e.g., a `sex` column with only 'M'/'F')
- Small tables where a full scan is fast anyway
- Columns rarely used in queries

### Primary Key Index

`PRIMARY KEY` columns are **automatically indexed** by the database. You do not need to create a separate index for them.

---

## Transactions — BEGIN, COMMIT, ROLLBACK

### What is a Transaction?

A **transaction** is a sequence of SQL operations executed as a **single unit of work**. Either **all operations succeed**, or **none of them are applied** — this is the principle of **atomicity**.

```
BEGIN → run SQL statements → COMMIT (save) or ROLLBACK (undo)
```

### ACID Properties

| Property        | Meaning                                                   |
| --------------- | --------------------------------------------------------- |
| **Atomicity**   | All operations in a transaction succeed or all are undone |
| **Consistency** | The database moves from one valid state to another        |
| **Isolation**   | Concurrent transactions don't interfere with each other   |
| **Durability**  | Committed changes survive crashes and power loss          |

### Basic Transaction Syntax

```sql
-- Start a transaction
BEGIN;

-- Run your SQL operations
UPDATE accounts SET balance = balance - 500 WHERE account_id = 1;
UPDATE accounts SET balance = balance + 500 WHERE account_id = 2;

-- Save all changes permanently
COMMIT;
```

### ROLLBACK — Undoing Changes

If something goes wrong, use `ROLLBACK` to undo all changes since `BEGIN`:

```sql
BEGIN;

UPDATE accounts SET balance = balance - 500 WHERE account_id = 1;
-- Oops! Something went wrong before the second update

ROLLBACK;  -- Reverts the first UPDATE — balance unchanged
```

### SAVEPOINT — Partial Rollbacks

`SAVEPOINT` lets you roll back to a specific point within a transaction without undoing everything:

```sql
BEGIN;

INSERT INTO orders VALUES (101, 'Laptop', 999.99);
SAVEPOINT after_order;

INSERT INTO order_items VALUES (101, 'Keyboard', 49.99);
-- Something wrong with this item

ROLLBACK TO after_order;  -- Undoes only the second INSERT

COMMIT;  -- Commits only the first INSERT
```

### When to Use Transactions

Use a transaction whenever you have **multiple operations that must all succeed together**:

- **Bank transfers** — debit one account, credit another; both must succeed
- **Order processing** — insert order, deduct inventory, charge payment
- **Data migrations** — move data between tables safely
- **Bulk updates** — update thousands of rows; rollback if an error occurs

```sql
-- Example: Transfer money between accounts
BEGIN;

UPDATE accounts SET balance = balance - 1000 WHERE id = 1;
UPDATE accounts SET balance = balance + 1000 WHERE id = 2;
INSERT INTO transaction_log VALUES (NOW(), 1, 2, 1000);

COMMIT;
```

### Auto-Commit

By default, most databases run in **auto-commit mode** — each statement is its own transaction and is committed immediately. Using `BEGIN` explicitly disables auto-commit for that block.

```sql
-- Disable auto-commit (MySQL)
SET autocommit = 0;

-- Re-enable
SET autocommit = 1;
```

---

## Views — CREATE VIEW

### What is a View?

A **view** is a **saved SQL query** stored in the database as a virtual table. It does not store data itself — it runs the underlying query each time you access it.

> Think of a view as a named shortcut for a complex `SELECT` statement.

### Benefits of Views

- **Simplify complex queries** — write the JOIN once, use it everywhere
- **Security** — expose only specific columns to certain users
- **Consistency** — changes to the view definition update all queries using it
- **Abstraction** — hide underlying table structure from application code

### Creating a View

```sql
-- Create a view showing employee names and their branch names
CREATE VIEW employee_branch AS
SELECT employee.first_name, employee.last_name, branch.branch_name
FROM employee
JOIN branch ON employee.branch_id = branch.branch_id;
```

### Using a View

Once created, query a view just like a table:

```sql
SELECT * FROM employee_branch;

SELECT * FROM employee_branch WHERE branch_name = 'Scranton';
```

### More View Examples

```sql
-- View: high-earning employees
CREATE VIEW high_earners AS
SELECT first_name, last_name, salary
FROM employee
WHERE salary > 80000;

-- View: client and their assigned branch info
CREATE VIEW client_branch_info AS
SELECT client.client_name, branch.branch_name
FROM client
JOIN branch ON client.branch_id = branch.branch_id;

-- View: total sales per employee with name
CREATE VIEW sales_summary AS
SELECT e.first_name, e.last_name, SUM(w.total_sales) AS total
FROM employee e
JOIN works_with w ON e.emp_id = w.emp_id
GROUP BY e.emp_id, e.first_name, e.last_name;
```

### Updating a View

```sql
-- Replace an existing view
CREATE OR REPLACE VIEW high_earners AS
SELECT first_name, last_name, salary
FROM employee
WHERE salary > 100000;
```

### Dropping a View

```sql
DROP VIEW employee_branch;

-- Drop only if it exists
DROP VIEW IF EXISTS employee_branch;
```

## Custom Functions — CREATE FUNCTION

### What is a Custom Function?

A **custom function** (user-defined function) is reusable SQL logic you write once and call by name in queries. Functions **always return a value** and can be used anywhere an expression is valid (in `SELECT`, `WHERE`, `ORDER BY`, etc.).

### Function vs Stored Procedure

| Feature          | Function                  | Stored Procedure          |
| ---------------- | ------------------------- | ------------------------- |
| Returns value    | **Always** (single value) | Optional (via OUT params) |
| Used in SELECT   | **Yes**                   | No                        |
| Can use in WHERE | **Yes**                   | No                        |
| Called with      | `SELECT fn()`             | `CALL proc()`             |
| Can modify data  | Limited (depends on DB)   | Yes                       |

### Creating a Function (MySQL)

```sql
DELIMITER $$

CREATE FUNCTION get_annual_salary(monthly_salary DECIMAL(10,2))
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
  RETURN monthly_salary * 12;
END$$

DELIMITER ;
```

**Key clauses:**

- `RETURNS` — declares the data type of the return value
- `DETERMINISTIC` — same inputs always produce the same output (required in some MySQL configs)
- `BEGIN ... END` — wraps the function body
- `RETURN` — sends back the result

### Using a Function in a Query

```sql
-- Use function in SELECT
SELECT first_name, last_name, get_annual_salary(salary) AS annual
FROM employee;

-- Use in WHERE
SELECT * FROM employee
WHERE get_annual_salary(salary) > 100000;
```

### Function with Multiple Parameters

```sql
DELIMITER $$

CREATE FUNCTION full_name(fname VARCHAR(50), lname VARCHAR(50))
RETURNS VARCHAR(101)
DETERMINISTIC
BEGIN
  RETURN CONCAT(fname, ' ', lname);
END$$

DELIMITER ;

-- Usage
SELECT full_name(first_name, last_name) AS name FROM employee;
```

### Function with IF Logic

```sql
DELIMITER $$

CREATE FUNCTION salary_grade(salary DECIMAL(10,2))
RETURNS VARCHAR(10)
DETERMINISTIC
BEGIN
  IF salary >= 100000 THEN
    RETURN 'Senior';
  ELSEIF salary >= 60000 THEN
    RETURN 'Mid';
  ELSE
    RETURN 'Junior';
  END IF;
END$$

DELIMITER ;

-- Usage
SELECT first_name, salary, salary_grade(salary) AS grade
FROM employee;
```

### Dropping a Function

```sql
DROP FUNCTION IF EXISTS get_annual_salary;
```

### PostgreSQL Function Syntax

PostgreSQL uses `CREATE FUNCTION` with `LANGUAGE plpgsql`:

```sql
CREATE OR REPLACE FUNCTION get_annual_salary(monthly_salary DECIMAL)
RETURNS DECIMAL AS $$
BEGIN
  RETURN monthly_salary * 12;
END;
$$ LANGUAGE plpgsql;

-- Usage
SELECT first_name, get_annual_salary(salary) FROM employee;
```

---

## Stored Procedures — CREATE PROCEDURE

### What is a Stored Procedure?

A **stored procedure** is a saved block of SQL code that can be **called by name**. Unlike functions, procedures do not have to return a value — they are used to execute a series of operations.

### Function vs Stored Procedure (Detailed)

|                            | Function                      | Stored Procedure                 |
| -------------------------- | ----------------------------- | -------------------------------- |
| `RETURNS` clause           | Required                      | Not required                     |
| Use in `SELECT`            | Yes                           | No                               |
| Multiple result sets       | No                            | Yes                              |
| `OUT` / `INOUT` parameters | No                            | Yes                              |
| Called with                | `SELECT fn()`                 | `CALL proc()`                    |
| Transaction control inside | No                            | Yes                              |
| Typical use                | Calculations, transformations | Business logic, batch operations |

### Creating a Basic Procedure (MySQL)

```sql
DELIMITER $$

CREATE PROCEDURE get_all_employees()
BEGIN
  SELECT * FROM employee;
END$$

DELIMITER ;

-- Call the procedure
CALL get_all_employees();
```

### Procedure with Input Parameters

```sql
DELIMITER $$

CREATE PROCEDURE get_employees_by_branch(IN branch_name_input VARCHAR(50))
BEGIN
  SELECT e.first_name, e.last_name, e.salary
  FROM employee e
  JOIN branch b ON e.branch_id = b.branch_id
  WHERE b.branch_name = branch_name_input;
END$$

DELIMITER ;

-- Call with an argument
CALL get_employees_by_branch('Scranton');
```

### Procedure with OUT Parameter

`OUT` parameters let procedures **send values back** to the caller:

```sql
DELIMITER $$

CREATE PROCEDURE count_employees(OUT total INT)
BEGIN
  SELECT COUNT(*) INTO total FROM employee;
END$$

DELIMITER ;

-- Call and capture output
CALL count_employees(@emp_count);
SELECT @emp_count;  -- Returns 9
```

### Procedure with INOUT Parameter

`INOUT` parameters work as both input and output:

```sql
DELIMITER $$

CREATE PROCEDURE apply_raise(INOUT emp_salary DECIMAL(10,2), IN raise_pct DECIMAL(5,2))
BEGIN
  SET emp_salary = emp_salary + (emp_salary * raise_pct / 100);
END$$

DELIMITER ;

SET @salary = 60000;
CALL apply_raise(@salary, 10);
SELECT @salary;  -- Returns 66000
```

### Procedure with Conditional Logic

```sql
DELIMITER $$

CREATE PROCEDURE promote_employee(IN emp_id_input INT)
BEGIN
  DECLARE current_salary DECIMAL(10,2);

  SELECT salary INTO current_salary
  FROM employee WHERE emp_id = emp_id_input;

  IF current_salary < 60000 THEN
    UPDATE employee SET salary = salary * 1.15 WHERE emp_id = emp_id_input;
  ELSE
    UPDATE employee SET salary = salary * 1.10 WHERE emp_id = emp_id_input;
  END IF;
END$$

DELIMITER ;

CALL promote_employee(103);
```

### Dropping a Procedure

```sql
DROP PROCEDURE IF EXISTS get_all_employees;
```

### PostgreSQL Procedure Syntax

```sql
CREATE OR REPLACE PROCEDURE update_salary(emp_id_input INT, new_salary DECIMAL)
LANGUAGE plpgsql AS $$
BEGIN
  UPDATE employee SET salary = new_salary WHERE emp_id = emp_id_input;
  COMMIT;
END;
$$;

-- Call
CALL update_salary(101, 95000);
```
