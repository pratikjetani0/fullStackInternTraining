/* INNER JOIN*/

-- Show employee with department

SELECT e.first_name, e.last_name, d.department_name from Employee e
INNER JOIN Department d
on e.department_id =  d.department_id;

/* LEFT JOIN */
SELECT e.first_name,  d.department_name 
from Employee e
LEFT JOIN Department d
on e.department_id =  d.department_id;

/* RIGHT JOIN*/

SELECT e.first_name, d.department_name
FROM Employee e
RIGHT JOIN Department d
ON e.department_id=d.department_id;

/* Aggregate Functions*/

-- Total employees

SELECT COUNT(emp_id)
FROM Employee;

-- Average salary
SELECT AVG(salary) 
FRom Employee;


-- Total salary

SELECT SUM(salary)
FROM Employee;

-- Highest salary

SELECT MAX(salary)
FROM Employee;

-- Lowest salary

SELECT MIN(salary)
FROM Employee;

/* GROUP BY */

-- Number of employees in each department

SELECT department_id, COUNT(emp_id)
FROM Employee
GROUP BY department_id;

/* HAVING*/

-- Departments with more than one employee
SELECT department_id, COUNT(emp_id)
FROM Employee
GROUP by department_id
HAVING COUNT(emp_id) > 1;

/* UNION */

SELECT customer_name AS names
FROM Customer

UNION

SELECT supplier_name
FROM Supplier;