# Database Schema Documentation

## Users Table

| Column     | Type             | Constraints      |
| ---------- | ---------------- | ---------------- |
| id         | UUID             | Primary Key      |
| name       | VARCHAR(100)     | Not Null         |
| email      | VARCHAR(255)     | Unique, Not Null |
| password   | VARCHAR          | Not Null         |
| role       | ENUM(admin,user) | Default: user    |
| created_at | TIMESTAMP        | Auto Generated   |
| updated_at | TIMESTAMP        | Auto Generated   |

---

## Products Table

| Column      | Type          | Constraints    |
| ----------- | ------------- | -------------- |
| id          | UUID          | Primary Key    |
| name        | VARCHAR       | Not Null       |
| description | TEXT          | Not Null       |
| price       | DECIMAL(10,2) | Not Null       |
| stock       | INTEGER       | Default 0      |
| image_url   | VARCHAR       | Nullable       |
| is_active   | BOOLEAN       | Default true   |
| created_at  | TIMESTAMP     | Auto Generated |
| updated_at  | TIMESTAMP     | Auto Generated |

---

## Cart Items Table

| Column     | Type      | Constraints               |
| ---------- | --------- | ------------------------- |
| id         | UUID      | Primary Key               |
| user_id    | UUID      | Foreign Key → users.id    |
| product_id | UUID      | Foreign Key → products.id |
| quantity   | INTEGER   | Default 1                 |
| created_at | TIMESTAMP | Auto Generated            |
| updated_at | TIMESTAMP | Auto Generated            |

---

## Relationships

- One User can have many Cart Items.
- One Product can belong to many Cart Items.
- Cart Item acts as a junction table between Users and Products.

User (1) → (N) CartItems

Product (1) → (N) CartItems
