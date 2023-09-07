import express from "express";
import dotenv from "dotenv";
import router from "./infrastructure/routes";
import { Database } from "./infrastructure/database/db";

const PORT = process.env.PORT || 3000;
const app = express();
dotenv.config();

app.use(express.json());
app.use("/api", router);

async function connectDatabase() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running in port ${PORT}`);
    });
    const database = Database.getInstance();
    await database.connected();
  } catch (error) {
    console.error("Error starting server:", error);
  }
}
connectDatabase();
