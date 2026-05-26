-- =========================================
-- INSERT SAMPLE DATA
-- =========================================


-- =====================
-- CATEGORIES
-- =====================

INSERT INTO categories(category_name)
VALUES
('Electronics'),
('Fashion'),
('Books'),
('Home Appliances'),
('Sports');


-- =====================
-- CUSTOMERS
-- =====================

INSERT INTO customers
(
full_name,
email,
phone
)
VALUES
('Pratik Jetani','pratik@gmail.com','9876543210'),

('Rahul Sharma','rahul@gmail.com','9876543211'),

('Amit Patel','amit@gmail.com','9876543212'),

('Sneha Shah','sneha@gmail.com','9876543213'),

('Riya Mehta','riya@gmail.com','9876543214'),

('Karan Verma','karan@gmail.com','9876543215'),

('Anjali Gupta','anjali@gmail.com','9876543216'),

('Vivek Singh','vivek@gmail.com','9876543217'),

('Neha Joshi','neha@gmail.com','9876543218'),

('Arjun Kumar','arjun@gmail.com','9876543219');


-- =====================
-- PRODUCTS
-- =====================


INSERT INTO products
(
category_id,
product_name,
price,
stock_quantity
)
VALUES
(1,'iPhone 16',85000,20),

(1,'Samsung Galaxy S25',72000,15),

(1,'Realme Buds Air',2500,40),

(1,'Laptop HP Victus',65000,12),

(2,'Nike Shoes',3500,30),

(2,'Puma T-shirt',1200,45),

(3,'Atomic Habits',500,60),

(3,'Rich Dad Poor Dad',400,55),

(4,'LG Washing Machine',28000,10),

(4,'Microwave Oven',8000,15),

(5,'Cricket Bat',1500,20),

(5,'Football',700,25);


-- =====================
-- SHIPPING ADDRESSES
-- =====================

INSERT INTO shipping_addresses
(
customer_id,
city,
state,
pincode
)
VALUES
(1,'Ahmedabad','Gujarat','380001'),

(2,'Surat','Gujarat','395001'),

(3,'Mumbai','Maharashtra','400001'),

(4,'Delhi','Delhi','110001'),

(5,'Pune','Maharashtra','411001');


-- =====================
-- ORDERS
-- =====================

INSERT INTO orders
(
customer_id,
shipping_address_id,
total_amount,
order_status
)
VALUES
(1,1,87500,'Completed'),

(2,2,72000,'Completed'),

(3,3,3500,'Pending'),

(4,4,500,'Completed'),

(5,5,8000,'Cancelled');


-- =====================
-- ORDER ITEMS
-- =====================

INSERT INTO order_items
(
order_id,
product_id,
quantity,
price
)

VALUES

(1,1,1,85000),

(1,3,1,2500),

(2,2,1,72000),

(3,5,1,3500),

(4,7,1,500),

(5,10,1,8000);


-- =====================
-- PAYMENTS
-- =====================

INSERT INTO payments
(
order_id,
amount,
payment_method,
payment_status
)
VALUES
(1,87500,'UPI','Success'),

(2,72000,'Credit Card','Success'),

(3,3500,'UPI','Pending'),

(4,500,'Debit Card','Success'),

(5,8000,'UPI','Failed');



-- =====================
-- AUDIT LOGS
-- =====================

INSERT INTO audit_logs
(
table_name,
action_type,
record_id,
message
)

VALUES

('orders','INSERT',1,'Order created'),

('payments','UPDATE',1,'Payment successful'),

('products','UPDATE',3,'Stock reduced'),

('orders','DELETE',5,'Cancelled order removed');


SELECT * FROM customers;

SELECT * FROM products;

SELECT * FROM orders;

SELECT * FROM order_items;

SELECT * FROM payments;

SELECT * FROM SHIPPING_ADDRESSES SA;

SELECT * FROM CATEGORIES C;

SELECT * FROM AUDIT_LOGS AL;