import express from "express";
import UserRepository from "../../database/UserRepository";
import { CreateUserUseCase } from "../../../usecase/user/CreateUserUseCase";
import { UserController } from "../../controllers/UserController";

const router = express.Router();
const userRepository = new UserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const userController = new UserController(createUserUseCase);

router.post("/", (req, res) => userController.createUser(req, res));

export default router;
