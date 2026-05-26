-- Show all customers
SELECT * FROM customers;

--customer_id|full_name    |email           |phone     |created_at             |
-------------+-------------+----------------+----------+-----------------------+
--          1|Pratik Jetani|pratik@gmail.com|9876543210|2026-05-24 11:19:09.447|
--          2|Rahul Sharma |rahul@gmail.com |9876543211|2026-05-24 11:19:09.447|
--          3|Amit Patel   |amit@gmail.com  |9876543212|2026-05-24 11:19:09.447|
--          4|Sneha Shah   |sneha@gmail.com |9876543213|2026-05-24 11:19:09.447|
--          5|Riya Mehta   |riya@gmail.com  |9876543214|2026-05-24 11:19:09.447|
--          6|Karan Verma  |karan@gmail.com |9876543215|2026-05-24 11:19:09.447|
--          7|Anjali Gupta |anjali@gmail.com|9876543216|2026-05-24 11:19:09.447|
--          8|Vivek Singh  |vivek@gmail.com |9876543217|2026-05-24 11:19:09.447|
--          9|Neha Joshi   |neha@gmail.com  |9876543218|2026-05-24 11:19:09.447|
--         10|Arjun Kumar  |arjun@gmail.com |9876543219|2026-05-24 11:19:09.447|


-- Show only customer name and email
SELECT full_name, email FROM customers;

--full_name    |email           |
---------------+----------------+
--Pratik Jetani|pratik@gmail.com|
--Rahul Sharma |rahul@gmail.com |
--Amit Patel   |amit@gmail.com  |
--Sneha Shah   |sneha@gmail.com |
--Riya Mehta   |riya@gmail.com  |
--Karan Verma  |karan@gmail.com |
--Anjali Gupta |anjali@gmail.com|
--Vivek Singh  |vivek@gmail.com |
--Neha Joshi   |neha@gmail.com  |
--Arjun Kumar  |arjun@gmail.com |


-- Products price greater than 5000
SELECT * 
FROM products 
WHERE price > 5000;

--product_id|category_id|product_name      |price   |stock_quantity|updated_at             |
------------+-----------+------------------+--------+--------------+-----------------------+
--         1|          1|iPhone 16         |85000.00|            20|2026-05-24 11:28:48.249|
--         2|          1|Samsung Galaxy S25|72000.00|            15|2026-05-24 11:28:48.249|
--         4|          1|Laptop HP Victus  |65000.00|            12|2026-05-24 11:28:48.249|
--         9|          4|LG Washing Machine|28000.00|            10|2026-05-24 11:28:48.249|
--        10|          4|Microwave Oven    | 8000.00|            15|2026-05-24 11:28:48.249|


-- Products from Electronics category
SELECT * 
FROM products 
WHERE category_id = 1;

--product_id|category_id|product_name      |price   |stock_quantity|updated_at             |
------------+-----------+------------------+--------+--------------+-----------------------+
--         1|          1|iPhone 16         |85000.00|            20|2026-05-24 11:28:48.249|
--         2|          1|Samsung Galaxy S25|72000.00|            15|2026-05-24 11:28:48.249|
--         3|          1|Realme Buds Air   | 2500.00|            40|2026-05-24 11:28:48.249|
--         4|          1|Laptop HP Victus  |65000.00|            12|2026-05-24 11:28:48.249|


-- Orders with Completed status
SELECT * 
FROM orders 
WHERE order_status = 'Completed';

--order_id|customer_id|shipping_address_id|order_date             |total_amount|order_status|
----------+-----------+-------------------+-----------------------+------------+------------+
--       1|          1|                  1|2026-05-24 11:22:07.979|    87500.00|Completed   |
--       2|          2|                  2|2026-05-24 11:22:07.979|    72000.00|Completed   |
--       4|          4|                  4|2026-05-24 11:22:07.979|      500.00|Completed   |


-- Names starting with P
SELECT *
FROM customers
WHERE full_name LIKE 'P%'

--customer_id|full_name    |email           |phone     |created_at             |
-------------+-------------+----------------+----------+-----------------------+
--          1|Pratik Jetani|pratik@gmail.com|9876543210|2026-05-24 11:19:09.447|


-- Email ending with gmail.com
SELECT *
FROM customers 
WHERE email LIKE '%gmail.com'

--customer_id|full_name    |email           |phone     |created_at             |
-------------+-------------+----------------+----------+-----------------------+
--          1|Pratik Jetani|pratik@gmail.com|9876543210|2026-05-24 11:19:09.447|
--          2|Rahul Sharma |rahul@gmail.com |9876543211|2026-05-24 11:19:09.447|
--          3|Amit Patel   |amit@gmail.com  |9876543212|2026-05-24 11:19:09.447|
--          4|Sneha Shah   |sneha@gmail.com |9876543213|2026-05-24 11:19:09.447|
--          5|Riya Mehta   |riya@gmail.com  |9876543214|2026-05-24 11:19:09.447|
--          6|Karan Verma  |karan@gmail.com |9876543215|2026-05-24 11:19:09.447|
--          7|Anjali Gupta |anjali@gmail.com|9876543216|2026-05-24 11:19:09.447|
--          8|Vivek Singh  |vivek@gmail.com |9876543217|2026-05-24 11:19:09.447|
--          9|Neha Joshi   |neha@gmail.com  |9876543218|2026-05-24 11:19:09.447|
--         10|Arjun Kumar  |arjun@gmail.com |9876543219|2026-05-24 11:19:09.447|


-- Product containing "Phone"
SELECT *
FROM products 
WHERE product_name LIKE '%Phone%'

--product_id|category_id|product_name|price   |stock_quantity|updated_at             |
------------+-----------+------------+--------+--------------+-----------------------+
--         1|          1|iPhone 16   |85000.00|            20|2026-05-24 11:28:48.249|


-- Products ascending by price
SELECT * 
FROM products 
ORDER BY price ASC;

--product_id|category_id|product_name      |price   |stock_quantity|updated_at             |
------------+-----------+------------------+--------+--------------+-----------------------+
--         8|          3|Rich Dad Poor Dad |  400.00|            55|2026-05-24 11:28:48.249|
--         7|          3|Atomic Habits     |  500.00|            60|2026-05-24 11:28:48.249|
--        12|          5|Football          |  700.00|            25|2026-05-24 11:28:48.249|
--         6|          2|Puma T-shirt      | 1200.00|            45|2026-05-24 11:28:48.249|
--        11|          5|Cricket Bat       | 1500.00|            20|2026-05-24 11:28:48.249|
--         3|          1|Realme Buds Air   | 2500.00|            40|2026-05-24 11:28:48.249|
--         5|          2|Nike Shoes        | 3500.00|            30|2026-05-24 11:28:48.249|
--        10|          4|Microwave Oven    | 8000.00|            15|2026-05-24 11:28:48.249|
--         9|          4|LG Washing Machine|28000.00|            10|2026-05-24 11:28:48.249|
--         4|          1|Laptop HP Victus  |65000.00|            12|2026-05-24 11:28:48.249|
--         2|          1|Samsung Galaxy S25|72000.00|            15|2026-05-24 11:28:48.249|
--         1|          1|iPhone 16         |85000.00|            20|2026-05-24 11:28:48.249|


-- Products descending by price
SELECT * 
FROM products 
ORDER BY price DESC;

--product_id|category_id|product_name      |price   |stock_quantity|updated_at             |
------------+-----------+------------------+--------+--------------+-----------------------+
--         1|          1|iPhone 16         |85000.00|            20|2026-05-24 11:28:48.249|
--         2|          1|Samsung Galaxy S25|72000.00|            15|2026-05-24 11:28:48.249|
--         4|          1|Laptop HP Victus  |65000.00|            12|2026-05-24 11:28:48.249|
--         9|          4|LG Washing Machine|28000.00|            10|2026-05-24 11:28:48.249|
--        10|          4|Microwave Oven    | 8000.00|            15|2026-05-24 11:28:48.249|
--         5|          2|Nike Shoes        | 3500.00|            30|2026-05-24 11:28:48.249|
--         3|          1|Realme Buds Air   | 2500.00|            40|2026-05-24 11:28:48.249|
--        11|          5|Cricket Bat       | 1500.00|            20|2026-05-24 11:28:48.249|
--         6|          2|Puma T-shirt      | 1200.00|            45|2026-05-24 11:28:48.249|
--        12|          5|Football          |  700.00|            25|2026-05-24 11:28:48.249|
--         7|          3|Atomic Habits     |  500.00|            60|2026-05-24 11:28:48.249|
--         8|          3|Rich Dad Poor Dad |  400.00|            55|2026-05-24 11:28:48.249|


-- Top 5 expensive products
SELECT * 
FROM products 
ORDER BY price DESC 
LIMIT 5;

--product_id|category_id|product_name      |price   |stock_quantity|updated_at             |
------------+-----------+------------------+--------+--------------+-----------------------+
--         1|          1|iPhone 16         |85000.00|            20|2026-05-24 11:28:48.249|
--         2|          1|Samsung Galaxy S25|72000.00|            15|2026-05-24 11:28:48.249|
--         4|          1|Laptop HP Victus  |65000.00|            12|2026-05-24 11:28:48.249|
--         9|          4|LG Washing Machine|28000.00|            10|2026-05-24 11:28:48.249|
--        10|          4|Microwave Oven    | 8000.00|            15|2026-05-24 11:28:48.249|


-- distinct payment method
SELECT DISTINCT payment_method
FROM payments;

--payment_method|
----------------+
--UPI           |
--Debit Card    |
--Credit Card   |


-- Count total customers
SELECT COUNT(*)
FROM customers;

--count|
-------+
--   10|
   

-- Find average product price
SELECT AVG(price)
FROM products;

--avg               |
--------------------+
--22358.333333333333|


-- Find total successful payment amount
SELECT SUM(amount)
FROM payments
WHERE payment_status='Success';

--sum      |
-----------+
--160000.00|


-- Find maximum price product
SELECT MAX(price)
FROM products;

--max     |
----------+
--85000.00|


-- Find minimum price product
SELECT MIN(price)
FROM products;

--min   |
--------+
--400.00|


-- count the porducts for each category
SELECT category_id, COUNT(product_id)
FROM products
GROUP BY category_id;

--category_id|count|
-------------+-----+
--          3|    2|
--          5|    2|
--          4|    2|
--          2|    2|
--          1|    4|


-- count the porducts for each category and give me above 1
SELECT category_id, COUNT(*)
FROM products
GROUP BY category_id
HAVING COUNT(*)>1;

--category_id|count|
-------------+-----+
--          3|    2|
--          5|    2|
--          4|    2|
--          2|    2|
--          1|    4|


-- Show customer orders
SELECT c.full_name, o.order_id, o.total_amount
FROM customers c
JOIN orders o
ON c.customer_id = o.customer_id

--full_name    |order_id|total_amount|
---------------+--------+------------+
--Pratik Jetani|       1|    87500.00|
--Rahul Sharma |       2|    72000.00|
--Amit Patel   |       3|     3500.00|
--Sneha Shah   |       4|      500.00|
--Riya Mehta   |       5|     8000.00|


-- Show customer orders and purchased products
SELECT c.full_name, o.order_id, p.product_name, oi.quantity
FROM customers c 
JOIN orders o  
ON c.customer_id = o.customer_id
JOIN order_items oi 
ON o.order_id = oi.order_id
JOIN products p 
ON oi.product_id = p.product_id;

--full_name    |order_id|product_name      |quantity|
---------------+--------+------------------+--------+
--Pratik Jetani|       1|iPhone 16         |       1|
--Pratik Jetani|       1|Realme Buds Air   |       1|
--Rahul Sharma |       2|Samsung Galaxy S25|       1|
--Amit Patel   |       3|Nike Shoes        |       1|
--Sneha Shah   |       4|Atomic Habits     |       1|
--Riya Mehta   |       5|Microwave Oven    |       1|


-- Find customers who spent more than ₹50,000

SELECT c.customer_id, o.order_id, o.total_amount
FROM customers c
JOIN orders o 
ON c.customer_id = o.customer_id
WHERE total_amount > 50000;

SELECT * 
FROM customers c 
WHERE c.customer_id IN (
	SELECT o.customer_id 
	FROM orders o
	WHERE total_amount > 50000
);

--customer_id|full_name    |email           |phone     |created_at             |
-------------+-------------+----------------+----------+-----------------------+
--          1|Pratik Jetani|pratik@gmail.com|9876543210|2026-05-24 11:19:09.447|
--          2|Rahul Sharma |rahul@gmail.com |9876543211|2026-05-24 11:19:09.447|

