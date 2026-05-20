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
