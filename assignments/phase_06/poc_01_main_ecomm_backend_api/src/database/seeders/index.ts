import { AppDataSource } from "../../config/data-source";
import { seedAdmin } from "./seedAdmin";
import { seedProducts } from "./seedProducts";
import { seedUsers } from "./seedUsers";

const runSeeders = async () => {
  try {
    await AppDataSource.initialize();

    console.log("Database Connected");

    await seedAdmin();
    await seedUsers();
    await seedProducts();

    console.log("All seeders completed");

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

runSeeders();
