-- ==========================================
-- UPDATE & DELETE OPERATIONS
-- ==========================================


-- Apply 10% discount to Electronics products
UPDATE products 
SET price = price * 0.90
WHERE category_id = 1

-- Verify changes
SELECT * 
FROM products 
WHERE category_id = 1;

--product_id|category_id|product_name      |price   |stock_quantity|updated_at             |
------------+-----------+------------------+--------+--------------+-----------------------+
--         1|          1|iPhone 16         |76500.00|            20|2026-05-24 11:28:48.249|
--         2|          1|Samsung Galaxy S25|64800.00|            15|2026-05-24 11:28:48.249|
--         3|          1|Realme Buds Air   | 2250.00|            40|2026-05-24 11:28:48.249|
--         4|          1|Laptop HP Victus  |58500.00|            12|2026-05-24 11:28:48.249|



-- Increase stock quantity by 20
UPDATE products 
SET stock_quantity = stock_quantity + 20
WHERE product_id = 3;

-- Verify changes
SELECT product_name, stock_quantity
FROM products
WHERE product_id=3;

--product_name   |stock_quantity|
-----------------+--------------+
--Realme Buds Air|            60|



-- Change order status
UPDATE orders
SET order_status = 'Completed'
WHERE order_id = 3;

-- Verify changes
SELECT *
FROM orders
WHERE order_id=3;

--order_id|customer_id|shipping_address_id|order_date             |total_amount|order_status|
----------+-----------+-------------------+-----------------------+------------+------------+
--       3|          3|                  3|2026-05-24 11:22:07.979|     3500.00|Completed   |



-- Update customer phone number
UPDATE customers 
SET phone = '9999999999'
WHERE customer_id = 1;

-- Verify changes

SELECT full_name, phone
FROM customers
WHERE customer_id=1;

--full_name    |phone     |
---------------+----------+
--Pratik Jetani|9999999999|



-- Update payment status
UPDATE payments
SET payment_status='Success'
WHERE paymet_id=5;

-- Verify changes
SELECT *
FROM payments
WHERE paymet_id=5;

--paymet_id|order_id|amount |payment_method|payment_status|paid_at                |
-----------+--------+-------+--------------+--------------+-----------------------+
--        5|       5|8000.00|UPI           |Success       |2026-05-24 11:30:37.307|


-- Delete cancelled orders
DELETE FROM orders
WHERE order_status='Cancelled';

-- Verify deletion
SELECT *
FROM orders;

--order_id|customer_id|shipping_address_id|order_date             |total_amount|order_status|
----------+-----------+-------------------+-----------------------+------------+------------+
--       1|          1|                  1|2026-05-24 11:22:07.979|    87500.00|Completed   |
--       2|          2|                  2|2026-05-24 11:22:07.979|    72000.00|Completed   |
--       4|          4|                  4|2026-05-24 11:22:07.979|      500.00|Completed   |
--       3|          3|                  3|2026-05-24 11:22:07.979|     3500.00|Completed   |



-- Delete products with zero stock
DELETE FROM products
WHERE stock_quantity=0;


