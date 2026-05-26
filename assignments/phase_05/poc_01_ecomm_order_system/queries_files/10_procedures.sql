-- ==========================================
-- PROCEDURES
-- ==========================================



-- PROCEDURE 1
-- Update product stock

-- Instead of manually writing UPDATE
-- every time, create reusable logic

-- Expected Result:
-- Product stock changes


CREATE OR REPLACE PROCEDURE update_product_stock(input_product_id INT, input_quantity INT)
LANGUAGE plpgsql
AS $$

	BEGIN
		
		UPDATE products 
		SET stock_quantity = stock_quantity+input_quantity
		WHERE product_id = input_product_id;

	END;
$$;


-- ==========================================
-- Test Procedure 1
-- ==========================================

CALL update_product_stock(1,10);


SELECT product_name, stock_quantity
FROM products
WHERE product_id=1;

--product_name|stock_quantity|
--------------+--------------+
--iPhone 16   |            30|


-- PROCEDURE 2

-- Change order status

-- Expected Result:
-- Status changed

CREATE OR REPLACE PROCEDURE update_order_status(input_order_id INT, new_status VARCHAR)
LANGUAGE plpgsql
AS $$
	BEGIN

		UPDATE orders
		SET order_status=new_status
		WHERE order_id=input_order_id;
	
	END;
$$;



-- ==========================================
-- Test Procedure 2
-- ==========================================

CALL update_order_status(11,'Completed');


SELECT *
FROM orders
WHERE order_id=11;

--order_id|customer_id|shipping_address_id|order_date             |total_amount|order_status|
----------+-----------+-------------------+-----------------------+------------+------------+
--      11|          5|                  5|2026-05-25 15:34:44.263|     5700.00|Completed   |



-- PROCEDURE 3
-- Simulate order placement
--customer_input(it is all ids of table)

-- Expected Result:(Transcation also done )
-- Create order
-- Reduce stock
-- Create payment

CREATE OR REPLACE PROCEDURE place_order
(
	customer_input INT,
	address_input INT,
	product_input INT,
	quantity_input INT,
	payment_method_input VARCHAR
)
LANGUAGE plpgsql
AS $$
	DECLARE
	new_order_id INT;
	product_price DECIMAL;

	BEGIN
			
		SELECT price
		INTO product_price
		FROM products
		where product_id = product_input;


		INSERT INTO orders
		(
		customer_id,
		shipping_address_id,
		total_amount,
		order_status
		)
		VALUES
		(customer_input,address_input,product_price*quantity_input,'Pending')
		RETURNING order_id INTO new_order_id;


		INSERT INTO order_items
		(
		order_id,
		product_id,
		quantity,
		price
		)	
		VALUES
		(new_order_id,product_input,quantity_input,product_price);


		UPDATE products
		SET stock_quantity= stock_quantity-quantity_input
		WHERE product_id=product_input;


		INSERT INTO payments
		(
		order_id,
		amount,
		payment_method,
		payment_status
		)
		VALUES
		(new_order_id,product_price*quantity_input,payment_method_input,'Success');
	
	END;
$$;



-- ==========================================
-- Test Procedure 3
-- ==========================================

CALL place_order (1,1,2,1,'UPI');



SELECT *
FROM orders
ORDER BY order_id DESC;


--order_id|customer_id|shipping_address_id|order_date             |total_amount|order_status|
----------+-----------+-------------------+-----------------------+------------+------------+
--      13|          1|                  1|2026-05-25 16:37:03.385|    64800.00|Pending     |
--      12|          4|                  4|2026-05-25 15:41:03.464|    68000.00|Pending     |
--      11|          5|                  5|2026-05-25 15:34:44.263|     5700.00|Completed   |
--       8|          1|                  1|2026-05-25 12:37:08.101|     2000.00|Pending     |
--       6|          1|                  1|2026-05-25 11:24:35.392|    75500.00|Pending     |
--       4|          4|                  4|2026-05-24 11:22:07.979|      500.00|Completed   |
--       3|          3|                  3|2026-05-24 11:22:07.979|     3500.00|Completed   |
--       2|          2|                  2|2026-05-24 11:22:07.979|    72000.00|Completed   |
--       1|          1|                  1|2026-05-24 11:22:07.979|    87500.00|Completed   |

