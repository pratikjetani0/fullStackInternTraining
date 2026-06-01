import app from "./app";
import { env } from "./config/env";
import { AppDataSource } from "./config/data-source";

const startServer = async () => {
  try {
    await AppDataSource.initialize();

    console.log("Database Connected");

    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Database Connection Failed");
    console.error(error);

    process.exit(1);
  }
};

startServer();
