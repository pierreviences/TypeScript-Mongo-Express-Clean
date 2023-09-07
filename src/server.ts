import express from "express";
import dotenv from "dotenv";
import UserRepository from "./infrastructure/database/UserRepository";

const PORT = process.env.PORT || 3000;
const app = express();
dotenv.config();

const userRepository = new UserRepository();

app.use(express.json());

app.use(async (req, res, next) => {
  try {
    if (userRepository.isConnected()) {
      console.log("MongoDB is connected");
    } else {
      console.log("MongoDB is not connected");
      res.status(500).json({ message: "MongoDB is not connected" });
    }
  } catch (error) {
    console.error("Error checking MongoDB connection:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
