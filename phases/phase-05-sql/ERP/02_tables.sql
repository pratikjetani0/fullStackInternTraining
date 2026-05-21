CREATE TABLE Department
(
    department_id INTEGER PRIMARY KEY AUTOINCREMENT,
    department_name VARCHAR(50) NOT NULL
);

CREATE TABLE Employee
(
    emp_id INTEGER PRIMARY KEY AUTOINCREMENT,
    department_id INT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    salary DECIMAL(10,2) CHECK(salary>0),
    hire_date DATE,
    FOREIGN KEY(department_id) REFERENCES Department(department_id) ON DELETE SET NULL
);

CREATE TABLE Customer
(
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name VARCHAR(50),
    email VARCHAR(100) UNIQUE
);

CREATE TABLE Supplier
(
    supplier_id INTEGER PRIMARY KEY AUTOINCREMENT,
    supplier_name VARCHAR(50)
);

CREATE TABLE Product
(
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    supplier_id INT,
    product_name VARCHAR(100),
    price DECIMAL(10,2) CHECK(price>0),
    stock INT CHECK(stock>=0),
    FOREIGN KEY(supplier_id) REFERENCES Supplier(supplier_id)
);

CREATE TABLE Orders
(
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INT,
    order_date DATE,
    FOREIGN KEY(customer_id) REFERENCES Customer(customer_id)
);

CREATE TABLE Order_Items
(
    order_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10,2),
    PRIMARY KEY(order_id,product_id),
    FOREIGN KEY(order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY(product_id) REFERENCES Product(product_id)
);

CREATE TABLE Payments
(
    payment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INT,
    amount DECIMAL(10,2),
    payment_date DATE,
    FOREIGN KEY(order_id) REFERENCES Orders(order_id)
);

CREATE TABLE Audit_Log
(
    log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    message VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
