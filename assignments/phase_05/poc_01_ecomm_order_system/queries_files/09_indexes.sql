-- ==========================================
-- INDEXES
-- ==========================================

-- INDEX 1
-- Purpose:
-- Create index on customer email

-- Expected Result:
-- Faster email search


CREATE INDEX idx_customer_email
ON customers(email);


-- ==========================================
-- Test Index 1
-- ==========================================

SELECT * 
FROM customers
WHERE email = 'pratik@gmail.com';

--customer_id|full_name    |email           |phone     |created_at             |
-------------+-------------+----------------+----------+-----------------------+
--          1|Pratik Jetani|pratik@gmail.com|9999999999|2026-05-24 11:19:09.447|


-- INDEX 2
-- Create index on customer_id in orders

-- Expected Result:
-- Faster joins and searches

CREATE INDEX idx_order_customer
ON orders(customer_id);


-- ==========================================
-- Test Index 2
-- ==========================================

SELECT *
FROM orders
WHERE customer_id=1;


--order_id|customer_id|shipping_address_id|order_date             |total_amount|order_status|
----------+-----------+-------------------+-----------------------+------------+------------+
--       1|          1|                  1|2026-05-24 11:22:07.979|    87500.00|Completed   |
--       6|          1|                  1|2026-05-25 11:24:35.392|    75500.00|Pending     |
--       8|          1|                  1|2026-05-25 12:37:08.101|     2000.00|Pending     |



-- INDEX 3
-- Create index on product name

-- Expected Result:
-- Faster product searching


CREATE INDEX idx_product_name
ON products(product_name);


-- ==========================================
-- Test Index 3
-- ==========================================

SELECT *
FROM products
WHERE product_name='iPhone 16';


--product_id|category_id|product_name|price   |stock_quantity|updated_at             |
------------+-----------+------------+--------+--------------+-----------------------+
--         1|          1|iPhone 16   |90000.00|            20|2026-05-25 12:28:29.364|



-- INDEX 4
-- Create index on category_id

-- Expected Result:
-- Faster category filtering

CREATE INDEX idx_product_category
ON products(category_id);


-- ==========================================
-- Test Index 4
-- ==========================================

SELECT *
FROM products
WHERE category_id=1;


--product_id|category_id|product_name      |price   |stock_quantity|updated_at             |
------------+-----------+------------------+--------+--------------+-----------------------+
--         4|          1|Laptop HP Victus  |58500.00|            12|2026-05-24 11:28:48.249|
--         3|          1|Realme Buds Air   | 2250.00|            60|2026-05-24 11:28:48.249|
--         2|          1|Samsung Galaxy S25|64800.00|            14|2026-05-24 11:28:48.249|
--         1|          1|iPhone 16         |90000.00|            20|2026-05-25 12:28:29.364|


-- INDEX 5
-- Composite Index

-- Expected Result:
-- Faster filtering


CREATE INDEX idx_category_price
ON products
(
category_id,
price
);


-- ==========================================
-- Test Index 5
-- ==========================================

SELECT *
FROM products
WHERE category_id=1 AND price>5000;


--product_id|category_id|product_name      |price   |stock_quantity|updated_at             |
------------+-----------+------------------+--------+--------------+-----------------------+
--         4|          1|Laptop HP Victus  |58500.00|            12|2026-05-24 11:28:48.249|
--         2|          1|Samsung Galaxy S25|64800.00|            14|2026-05-24 11:28:48.249|
--         1|          1|iPhone 16         |90000.00|            20|2026-05-25 12:28:29.364|



-- INDEX 6

-- Create index on payment status

-- Expected Result:
-- Faster filtering


CREATE INDEX idx_payment_status
ON payments(payment_status);



-- ==========================================
-- Test Index 6
-- ==========================================

SELECT *
FROM payments
WHERE payment_status='Pending';

--paymet_id|order_id|amount |payment_method|payment_status|paid_at                |
-----------+--------+-------+--------------+--------------+-----------------------+
--        3|       3|3500.00|UPI           |Pending       |2026-05-24 11:30:37.307|


-- ==========================================
-- View all created indexes
-- ==========================================

SELECT indexname, indexdef
FROM pg_indexes
WHERE schemaname='public';


--indexname                   |indexdef                                                                                         |
------------------------------+-------------------------------------------------------------------------------------------------+
--customers_pkey              |CREATE UNIQUE INDEX customers_pkey ON public.customers USING btree (customer_id)                 |
--customers_email_key         |CREATE UNIQUE INDEX customers_email_key ON public.customers USING btree (email)                  |
--categories_pkey             |CREATE UNIQUE INDEX categories_pkey ON public.categories USING btree (category_id)               |
--categories_category_name_key|CREATE UNIQUE INDEX categories_category_name_key ON public.categories USING btree (category_name)|
--products_pkey               |CREATE UNIQUE INDEX products_pkey ON public.products USING btree (product_id)                    |
--shipping_addresses_pkey     |CREATE UNIQUE INDEX shipping_addresses_pkey ON public.shipping_addresses USING btree (address_id)|
--orders_pkey                 |CREATE UNIQUE INDEX orders_pkey ON public.orders USING btree (order_id)                          |
--audit_logs_pkey             |CREATE UNIQUE INDEX audit_logs_pkey ON public.audit_logs USING btree (log_id)                    |
--payments_pkey               |CREATE UNIQUE INDEX payments_pkey ON public.payments USING btree (paymet_id)                     |
--order_items_pkey            |CREATE UNIQUE INDEX order_items_pkey ON public.order_items USING btree (order_item_id)           |
--idx_customer_email          |CREATE INDEX idx_customer_email ON public.customers USING btree (email)                          |
--idx_order_customer          |CREATE INDEX idx_order_customer ON public.orders USING btree (customer_id)                       |
--idx_product_name            |CREATE INDEX idx_product_name ON public.products USING btree (product_name)                      |
--idx_product_category        |CREATE INDEX idx_product_category ON public.products USING btree (category_id)                   |
--idx_category_price          |CREATE INDEX idx_category_price ON public.products USING btree (category_id, price)              |
--idx_payment_status          |CREATE INDEX idx_payment_status ON public.payments USING btree (payment_status)                  |



-- ==========================================
-- Delete Index Example
--
-- Sometimes indexes are no longer needed
-- ==========================================

-- DROP INDEX idx_customer_email;
