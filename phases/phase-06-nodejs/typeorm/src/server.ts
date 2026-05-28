import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/data-source.js";
import { Customer } from "./entity/Customer.js";


const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    console.log("Database Connected");

    //GET API
    app.get("/customers", async (req, res) => {
      try {
        const customerRepository = AppDataSource.getRepository(Customer);

        const customers = await customerRepository.find();

        res.status(200).json(customers);
      } catch (error: any) {
        res.status(500).json({
          message: error.message,
        });
      }
    });

    // POST API (INSERT DATA)
    app.post("/customers", async (req, res) => {
      try {
        const { full_name, email, phone } = req.body;

        const customerRepository = AppDataSource.getRepository(Customer);

        const newCustomer = customerRepository.create({
          full_name,
          email,
          phone,
        });

        const savedCustomer = await customerRepository.save(newCustomer);

        res.status(201).json({
          message: "Customer Created",
          data: savedCustomer,
        });
      } catch (error: any) {
        res.status(500).json({
          message: error.message,
        });
      }
    });

    //PUT UPDATE DATA
    app.put("/customers/:id", async (req, res) => {
      try {
        const customerId = Number(req.params.id);
        const { full_name, email, phone } = req.body;

        const customerRepository = AppDataSource.getRepository(Customer);

        // FIND
        const customer = await customerRepository.findOneBy({
          customer_id: customerId,
        });

        if (!customer) {
          return res.status(404).json({ message: "Customer not found" });
        }

        // UPDATE VALUES
        customer.full_name = full_name;
        customer.email = email;
        customer.phone = phone;

        // SAVE UPDATED DATA
        const updatedCustomer = await customerRepository.save(customer);

        res.json({
          message: "Customer Updated",
          data: updatedCustomer,
        });
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    });

    //DELETE CUSTOMER REMOVE
    app.delete("/customers/:id", async (req, res) => {
      try {
        const customerId = Number(req.params.id);

        const customerRepository = AppDataSource.getRepository(Customer);

        // FIND CUSTOMER
        const customer = await customerRepository.findOneBy({
          customer_id: customerId,
        });

        if (!customer) {
          return res.status(404).json({
            message: "Customer not found",
          });
        }

        // DELETE CUSTOMER
        await customerRepository.remove(customer);

        res.json({
          message: "Customer Deleted",
        });
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    });

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("DATABASE ERROR:");
    console.log(error.message);
  });
