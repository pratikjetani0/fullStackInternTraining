-- ==========================================
-- FUNCTIONS
-- ==========================================

-- FUNCTION 1
-- Calculate total amount of an order

-- Instead of manually calculating:
-- quantity * price
-- every time,
-- we create reusable logic

-- Expected Result:
-- Returns total order amount

CREATE OR REPLACE FUNCTION calculate_order_total(input_order_id INT)
RETURNS DECIMAL
AS $$ 

	DECLARE total DECIMAL;
	BEGIN
	
		SELECT SUM(quantity * price) 
		INTO total
		FROM order_items
		WHERE order_id=input_order_id;
		
		RETURN total;

	END;
$$
LANGUAGE plpgsql;


-- ==========================================
-- Testing Function 1
-- ==========================================

SELECT calculate_order_total(1);

--calculate_order_total|
-----------------------+
--             87500.00|

SELECT calculate_order_total(6);

--calculate_order_total|
-----------------------+
--             75500.00|


-- FUNCTION 2
-- Calculate total spending of customer

-- Expected Result:
-- Total amount spent by customer


CREATE OR REPLACE FUNCTION customer_total_spending (input_customer_id INT) 
RETURNS DECIMAL
AS $$ 

	DECLARE total_spent DECIMAL;
	BEGIN 

		SELECT SUM(total_amount) 
		INTO total_spent
		FROM orders
		WHERE customer_id = input_customer_id AND order_status = 'Completed';

		RETURN total_spent;
	END;

$$
LANGUAGE plpgsql;


-- ==========================================
-- Testing Function 2
-- ==========================================

SELECT customer_total_spending(3);

--customer_total_spending|
-------------------------+
--                3500.00|


-- FUNCTION 3

-- Check product stock availability

-- Expected Result:
-- In Stock
-- Low Stock
-- Out Of Stock


CREATE OR REPLACE FUNCTION check_stock_status(input_product_id INT)
RETURNS VARCHAR
AS $$
	DECLARE current_stock INT;
	BEGIN
		
		SELECT stock_quantity 
		INTO current_stock
		FROM products
		WHERE product_id = input_product_id;	
	
		
		IF current_stock = 0
		THEN 
		RETURN 'Out Of Stock';

		ELSEIF current_stock <= 10
		THEN
		RETURN 'Low Stock';

		ELSE
		RETURN 'In Stock';

		END IF;
	
	END;

$$
LANGUAGE plpgsql;



-- ==========================================
-- Testing Function 3
-- ==========================================

SELECT check_stock_status(1);

SELECT check_stock_status(9);

