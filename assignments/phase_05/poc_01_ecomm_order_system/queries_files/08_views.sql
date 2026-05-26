-- ==========================================
-- VIEWS
-- ==========================================

-- VIEW 1
-- Create sales summary report

-- Expected Result:
-- Product Name
-- Total Quantity Sold
-- Total Revenue

CREATE OR REPLACE VIEW sales_summary AS
SELECT 
	p.product_id, 
	p.product_name, 
	SUM(oi.quantity) AS total_quantity_sold, 
	SUM(oi.quantity * oi.price) AS total_revenue
FROM products p
JOIN order_items oi
ON p.product_id = oi.product_id
GROUP BY p.product_id, p.product_name;



-- ==========================================
-- Test View 1
-- ==========================================

SELECT *
FROM sales_summary;

--product_id|product_name      |total_quantity_sold|total_revenue|
------------+------------------+-------------------+-------------+
--         3|Realme Buds Air   |                  1|      2500.00|
--         5|Nike Shoes        |                  2|      7000.00|
--         2|Samsung Galaxy S25|                  2|    144000.00|
--         7|Atomic Habits     |                  1|       500.00|
--         1|iPhone 16         |                  1|     85000.00|



-- VIEW 2
-- Customer order report

-- Expected Result:
-- Customer Name
-- Order ID
-- Order Amount
-- Order Status

CREATE OR REPLACE VIEW customer_order_report AS 
SELECT 
	c.customer_id,
	c.full_name,
	o.order_id,
	o.total_amount,
	o.order_status
FROM customers c
JOIN orders o
ON c.customer_id = o.customer_id;


-- ==========================================
-- Test View 2
-- ==========================================

SELECT *
FROM customer_order_report;

--customer_id|full_name    |order_id|total_amount|order_status|
-------------+-------------+--------+------------+------------+
--          1|Pratik Jetani|       1|    87500.00|Completed   |
--          2|Rahul Sharma |       2|    72000.00|Completed   |
--          4|Sneha Shah   |       4|      500.00|Completed   |
--          3|Amit Patel   |       3|     3500.00|Completed   |
--          1|Pratik Jetani|       6|    75500.00|Pending     |
--          1|Pratik Jetani|       8|     2000.00|Pending     |



-- VIEW 3

-- Product inventory report

-- Expected Result:
-- Product details
-- Stock availability


CREATE OR REPLACE VIEW inventory_report AS 
SELECT
	product_id,
	product_name,
	price,
	stock_quantity,
	CASE 
		WHEN stock_quantity=0 THEN 'Out Of Stock'
		WHEN stock_quantity<=10 THEN 'Low Stock'
		ELSE 'Available'
	END	AS stock_status
FROM products;


-- ==========================================
-- Test View 3
-- ==========================================

SELECT *
FROM inventory_report;


--product_id|product_name      |price   |stock_quantity|stock_status|
------------+------------------+--------+--------------+------------+
--         6|Puma T-shirt      | 1200.00|            45|Available   |
--         7|Atomic Habits     |  500.00|            60|Available   |
--         8|Rich Dad Poor Dad |  400.00|            55|Available   |
--         9|LG Washing Machine|28000.00|            10|Low Stock   |
--        11|Cricket Bat       | 1500.00|            20|Available   |
--        12|Football          |  700.00|            25|Available   |
--         4|Laptop HP Victus  |58500.00|            12|Available   |
--         3|Realme Buds Air   | 2250.00|            60|Available   |
--         2|Samsung Galaxy S25|64800.00|            14|Available   |
--         5|Nike Shoes        | 3500.00|            29|Available   |
--         1|iPhone 16         |90000.00|            20|Available   |
--        10|Microwave Oven    | 8000.00|            10|Low Stock   |



-- VIEW 4
-- Payment report

-- Expected Result:
-- Customer + payment details


CREATE OR REPLACE VIEW payment_report AS
SELECT 
	c.full_name,
	o.order_id,
	p.amount,
	p.payment_method,
	p.payment_status
FROM customers c
JOIN orders o
ON c.customer_id=o.customer_id
JOIN payments p
ON o.order_id=p.order_id;


-- ==========================================
-- Test View 4
-- ==========================================

SELECT *
FROM payment_report;


--full_name    |order_id|amount  |payment_method|payment_status|
---------------+--------+--------+--------------+--------------+
--Pratik Jetani|       1|87500.00|UPI           |Success       |
--Rahul Sharma |       2|72000.00|Credit Card   |Success       |
--Amit Patel   |       3| 3500.00|UPI           |Pending       |
--Sneha Shah   |       4|  500.00|Debit Card    |Success       |
--Pratik Jetani|       6|75500.00|UPI           |Success       |
