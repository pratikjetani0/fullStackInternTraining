-- Department Data

INSERT INTO Department(department_name) VALUES
('IT'),
('HR'),
('Sales'),
('Finance');


-- Employee Data

INSERT INTO Employee
(department_id,first_name,last_name,salary,hire_date)
VALUES
(1,'Pratik','Jetani',50000,'2026-01-10'),
(1,'Rahul','Sharma',65000,'2025-06-15'),
(2,'Priya','Patel',45000,'2025-03-12'),
(3,'Amit','Joshi',55000,'2026-02-01'),
(4,'Neha','Verma',70000,'2024-08-22');


-- Customer Data

INSERT INTO Customer
(customer_name,email)
VALUES
('John Doe','john@gmail.com'),
('Alice Smith','alice@gmail.com'),
('Michael Brown','michael@gmail.com');


-- Supplier Data

INSERT INTO Supplier
(supplier_name)
VALUES
('Dell'),
('HP'),
('Logitech');


-- Product Data

INSERT INTO Product
(supplier_id,product_name,price,stock)
VALUES
(1,'Laptop',60000,20),
(2,'Monitor',15000,35),
(3,'Keyboard',1000,100),
(3,'Mouse',500,120);


-- Orders

INSERT INTO Orders
(customer_id,order_date)
VALUES
(1,'2026-05-10'),
(2,'2026-05-11'),
(3,'2026-05-12');


-- Order Items

INSERT INTO Order_Items
(order_id,product_id,quantity,price)
VALUES
(1,1,1,60000),
(1,3,2,1000),
(2,2,1,15000),
(3,4,3,500);


-- Payments

INSERT INTO Payments
(order_id,amount,payment_date)
VALUES
(1,62000,'2026-05-10'),
(2,15000,'2026-05-11'),
(3,1500,'2026-05-12');

SELECT * FROM Department;

SELECT * FROM Employee;

SELECT * FROM Product;

SELECT * FROM Orders;

SELECT * FROM Customer;

SELECT * FROM Supplier;

SELECT * FROM Order_Items;

SELECT * from Payments;