-- =========================================
-- E-Commerce Tables
-- =========================================

-- =====================
-- CUSTOMERS
-- =====================

CREATE TABLE customers (

	customer_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

	full_name VARCHAR(100) NOT NULL,

	email VARCHAR(100) UNIQUE NOT NULL,

	phone VARCHAR(15),

	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);


-- =====================
-- CATEGORIES
-- =====================

CREATE TABLE categories (

	category_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	
	category_name VARCHAR(100)
	UNIQUE
	NOT NULL

);

-- =====================
-- PRODUCTS
-- =====================

CREATE TABLE products (

	product_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	
	category_id INT,
	
	product_name VARCHAR(150) NOT NULL,
	
	price DECIMAL(10,2) CHECK(price>0),
	
	stock_quantity INT CHECK(stock_quantity>=0),
	
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	
	CONSTRAINT fk_product_category
	FOREIGN KEY(category_id)
	REFERENCES categories(category_id)
	ON DELETE SET NULL

);


-- =====================
-- SHIPPING ADDRESSES
-- =====================

CREATE TABLE shipping_addresses (

	address_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	
	customer_id INT,
	
	city VARCHAR(100),
	
	state VARCHAR(100),
	
	pincode VARCHAR(20),
	
	CONSTRAINT fk_customer_address
	FOREIGN KEY(customer_id)
	REFERENCES customers(customer_id)
	ON DELETE CASCADE

);


-- =====================
-- ORDERS
-- =====================

CREATE TABLE orders (

	order_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	
	customer_id INT,
	
	shipping_address_id INT,
	
	order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	
	total_amount DECIMAL(10,2) DEFAULT 0,
	
	order_status VARCHAR(20)
	CHECK
	(
		order_status IN
		(
			'Pending',
			'Completed',
			'Cancelled'
		)
	),
	
	CONSTRAINT fk_customer_order
	FOREIGN KEY(customer_id)
	REFERENCES customers(customer_id)
	ON DELETE CASCADE,
	
	CONSTRAINT fk_order_address
	FOREIGN KEY(shipping_address_id)
	REFERENCES shipping_addresses(address_id)
	ON DELETE SET NULL

);

-- =====================
-- ORDER ITEMS
-- =====================

CREATE TABLE order_items (

	order_item_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	
	order_id INT,
	
	product_id INT,
	
	quantity INT CHECK(quantity>0),
	
	price DECIMAL(10,2) CHECK(price>0),
	
	CONSTRAINT fk_order_item_order
	FOREIGN KEY(order_id)
	REFERENCES orders(order_id)
	ON DELETE CASCADE,
	
	CONSTRAINT fk_order_item_product
	FOREIGN KEY(product_id)
	REFERENCES products(product_id)
	ON DELETE CASCADE

);




-- =====================
-- PAYMENTS
-- =====================

CREATE TABLE payments (

	paymet_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	
	order_id INT,
	
	amount DECIMAL(10,2) CHECK(amount > 0),
	
	payment_method VARCHAR(30),
	
	payment_status VARCHAR(30)
	CHECK (
		payment_status IN (
		'Pending',
		'Success',
		'Failed'
		)
	),
	
	paid_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	
	CONSTRAINT fk_payment_order
	FOREIGN KEY(order_id)
	REFERENCES orders(order_id)
	ON DELETE CASCADE
	
)



-- =====================
-- AUDIT LOGS
-- =====================

CREATE TABLE audit_logs (

	log_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	
	table_name VARCHAR(50),
	
	action_type VARCHAR(20),
	
	record_id INT,
	
	message TEXT,
	
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

);


SELECT table_name
FROM information_schema.tables
WHERE table_schema='public';

--table_name        |
--------------------+
--payments          |
--categories        |
--products          |
--customers         |
--shipping_addresses|
--orders            |
--audit_logs        |
--order_items       |