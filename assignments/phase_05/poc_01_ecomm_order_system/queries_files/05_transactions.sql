-- ==========================================
-- TRANSACTIONS
-- ==========================================

-- Simulate a customer purchase
-- Expected Result:
--
-- New order inserted
-- Product stock reduced
-- Payment inserted
--
-- If any step fails:
-- Rollback everything

BEGIN;

	-- Create order
	INSERT INTO orders 
	(
	customer_id,
	shipping_address_id,
	total_amount,
	order_status
	)
	VALUES 
	(1,1,75500,'Pending');
	
	
	-- Add products into order_items
	INSERT INTO order_items
	(
	order_id,
	product_id,
	quantity,
	price
	)
	VALUES
	(6,2,1,72000);
	
	INSERT INTO order_items
	(
	order_id,
	product_id,
	quantity,
	price
	)
	VALUES
	(6,5,1,3500);
	
	
	-- Reduce stock for Samsung Galaxy S25
	
	UPDATE products 
	SET stock_quantity = stock_quantity-1
	WHERE product_id = 2;
	
	
	-- Reduce stock for Nike Shoes
	UPDATE products 
	SET stock_quantity = stock_quantity-1
	WHERE product_id = 5;
	
	
	-- Create payment
	INSERT INTO payments
	(
	order_id,
	amount,
	payment_method,
	payment_status
	)
	VALUES 
	(6,75500,'UPI','Success')
	

COMMIT;


-- ==========================================
-- Verify Results
-- ==========================================

SELECT *
FROM orders
WHERE order_id=6;

--order_id|customer_id|shipping_address_id|order_date             |total_amount|order_status|
----------+-----------+-------------------+-----------------------+------------+------------+
--       6|          1|                  1|2026-05-25 11:24:35.392|    75500.00|Pending     |

SELECT *
FROM order_items
WHERE order_id=6;

--order_item_id|order_id|product_id|quantity|price   |
---------------+--------+----------+--------+--------+
--           13|       6|         2|       1|72000.00|
--           14|       6|         5|       1| 3500.00|


SELECT *
FROM payments
WHERE order_id=6;

--paymet_id|order_id|amount  |payment_method|payment_status|paid_at                |
-----------+--------+--------+--------------+--------------+-----------------------+
--        6|       6|75500.00|UPI           |Success       |2026-05-25 11:34:08.336|

SELECT product_name, stock_quantity
FROM products
WHERE product_id IN (2,5);

--product_name      |stock_quantity|
--------------------+--------------+
--Samsung Galaxy S25|            14|
--Nike Shoes        |            29|





-- Demonstrate rollback

-- Undo all changes if one step fails

-- Expected Result:
-- No data saved

BEGIN;

	INSERT INTO orders
	(
	customer_id,
	shipping_address_id,
	total_amount,
	order_status
	)
	VALUES
	(2,2,50000,'Pending');
	
	
	UPDATE products
	SET stock_quantity= stock_quantity-1
	WHERE product_id=2;
	
	
	/*
	Intentional error:
	
	payment_status='Done'
	
	Allowed values:
	
	Pending
	Success
	Failed
	*/
	
	INSERT INTO payments
	(
	order_id,
	amount,
	payment_method,
	payment_status
	)
	VALUES
	(7,50000,'UPI','Done');


ROLLBACK;
	

--Verify rollback

SELECT *
FROM orders
WHERE order_id=7;

--No rows returned