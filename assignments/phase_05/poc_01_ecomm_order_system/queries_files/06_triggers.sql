-- ==========================================
-- TRIGGERS
-- ==========================================

-- TRIGGER 1
-- Automatically update updated_at

-- Product changes should record
-- latest modification time

-- Expected Result:
-- updated_at changes automatically


CREATE OR REPLACE FUNCTION update_product_timestamp()
RETURNS TRIGGER 
AS $$
	BEGIN 
		NEW.updated_at=CURRENT_TIMESTAMP;
		RETURN NEW;
	END;
$$
LANGUAGE plpgsql;


CREATE TRIGGER product_timestamp_trigger
BEFORE UPDATE 
ON products 
FOR EACH ROW 
EXECUTE FUNCTION update_product_timestamp();


-- ==========================================
-- Testing Trigger 1
-- ==========================================

UPDATE products
SET price=90000
WHERE product_id=1;



SELECT product_name, price, updated_at
FROM products
WHERE product_id=1;

--product_name|price   |updated_at             |
--------------+--------+-----------------------+
--iPhone 16   |90000.00|2026-05-25 12:28:29.364|


-- TRIGGER 2
-- Log new order creation

-- Expected Result:
-- Insert row into audit_logs

CREATE OR REPLACE FUNCTION log_new_order()
RETURNS TRIGGER
AS $$
	BEGIN 
		
		INSERT INTO audit_logs
		(
		table_name,
		action_type,
		record_id,
		message
		)
		VALUES
		('orders','INSERT',NEW.order_id,'New order created');
		
		RETURN NEW;
	END;
$$
LANGUAGE plpgsql;


CREATE TRIGGER new_order_trigger
AFTER INSERT 
ON orders 
FOR EACH ROW
EXECUTE FUNCTION log_new_order();


-- ==========================================
-- Testing Trigger 2
-- ==========================================


INSERT INTO orders
(
customer_id,
shipping_address_id,
total_amount,
order_status
)
VALUES
(1,1,2000,'Pending');


SELECT *
FROM audit_logs
ORDER BY log_id DESC;

--log_id|table_name|action_type|record_id|message                    |created_at             |
--------+----------+-----------+---------+---------------------------+-----------------------+
--     5|orders    |INSERT     |        8|New order created          |2026-05-25 12:37:08.101|
--     4|orders    |DELETE     |        5|Cancelled order removed    |2026-05-24 11:31:21.441|
--     3|products  |UPDATE     |        3|Stock reduced              |2026-05-24 11:31:21.441|
--     2|payments  |UPDATE     |        1|Payment successful         |2026-05-24 11:31:21.441|
--     1|orders    |INSERT     |        1|Order created              |2026-05-24 11:31:21.441|


-- TRIGGER 3
-- Log stock quantity changes
--
-- Inventory changes are important
--
-- Expected Result:
-- Store message in audit_logs

CREATE OR REPLACE FUNCTION log_stock_change()
RETURNS TRIGGER
AS $$ 
	BEGIN

		IF OLD.stock_quantity <> NEW.stock_quantity
		THEN
			INSERT INTO audit_logs
			(
			table_name,
			action_type,
			record_id,
			message
			)
			VALUES
			('products','UPDATE',NEW.product_id, 'Stock changed from ' || OLD.stock_quantity || ' to ' || NEW.stock_quantity);
		END IF;
		
		RETURN NEW;
	END;
$$
LANGUAGE plpgsql;


CREATE TRIGGER stock_change_trigger
AFTER UPDATE 
ON products
FOR EACH ROW
EXECUTE FUNCTION log_stock_change();


-- ==========================================
-- Testing Trigger 3
-- ==========================================


UPDATE products
SET stock_quantity=10
WHERE product_id=10;


SELECT *
FROM audit_logs
ORDER BY log_id DESC;

--log_id|table_name|action_type|record_id|message                    |created_at             |
--------+----------+-----------+---------+---------------------------+-----------------------+
--     6|products  |UPDATE     |       10|Stock changed from 15 to 10|2026-05-25 12:47:55.058|
--     5|orders    |INSERT     |        8|New order created          |2026-05-25 12:37:08.101|
--     4|orders    |DELETE     |        5|Cancelled order removed    |2026-05-24 11:31:21.441|
--     3|products  |UPDATE     |        3|Stock reduced              |2026-05-24 11:31:21.441|
--     2|payments  |UPDATE     |        1|Payment successful         |2026-05-24 11:31:21.441|
--     1|orders    |INSERT     |        1|Order created              |2026-05-24 11:31:21.441|
