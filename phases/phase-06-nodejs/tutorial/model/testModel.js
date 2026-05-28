import pool from "../config/db.js";

async function createTestTable() {
  try {
    // CREATE SCHEMA
    await pool.query(`
      CREATE SCHEMA IF NOT EXISTS test
    `);

    console.log("Schema created");

    // CREATE TABLE
    await pool.query(`
        
        CREATE TABLE IF NOT EXISTS test.tests (

            test_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

            test_name VARCHAR(20) NOT NULL,

            email VARCHAR(50) UNIQUE NOT NULL,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        
        )

        `);

    console.log("Customers table created");
  } catch (error) {
    console.log(error.message);
  }
}

export default createTestTable;
