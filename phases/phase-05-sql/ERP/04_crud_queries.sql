
/*   SELECT Examples */

-- Show all employees
SELECT * FROM Employee;

-- Show specific columns
SELECT first_name,last_name,salary FROM Employee;

/* WHERE Examples */

-- Employees with salary > 50000

SELECT *
FROM Employee
WHERE salary > 50000;


-- Products with stock > 50

SELECT *
FROM Product
WHERE stock > 50;


-- Multiple conditions

SELECT *
FROM Employee
WHERE salary > 50000 AND department_id=1;



/* ORDER BY Examples */

-- Salary ascending

SELECT *
FROM Employee
ORDER BY salary;


-- Salary descending

SELECT *
FROM Employee
ORDER BY salary DESC;


-- Sort by department and salary

SELECT *
FROM Employee
ORDER BY department_id,salary DESC;



/* LIMIT Examples */

-- Top 3 employees

SELECT *
FROM Employee
LIMIT 3;


-- Highest paid employee

SELECT *
FROM Employee
ORDER BY salary DESC
LIMIT 1;



/* DISTINCT Examples */

-- Unique departments

SELECT DISTINCT department_id
FROM Employee;



/* LIKE Examples*/

-- Names starting with P

SELECT *
FROM Employee
WHERE first_name LIKE 'P%';


-- Names ending with a

SELECT *
FROM Employee
WHERE first_name LIKE '%a';


-- Email contains gmail

SELECT *
FROM Customer
WHERE email LIKE '%gmail%';


/* UPDATE Examples */

-- Increase salary

UPDATE Employee
SET salary=70000
WHERE emp_id=1;


-- Update product stock

UPDATE Product
SET stock=80
WHERE product_id=3;


/* DELETE Examples */

-- Delete customer

DELETE FROM Customer
WHERE customer_id=3;