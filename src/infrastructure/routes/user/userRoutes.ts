import express from "express";
import UserRepository from "../../repository/UserRepository";
import { CreateUserUseCase } from "../../../usecase/user/CreateUserUseCase";
import { GetUserUseCase } from "../../../usecase/user/GetUserUseCase";
import { UpdateUserUseCase } from "../../../usecase/user/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../../usecase/user/DeleteUserUseCase";
import { UserController } from "../../controllers/UserController";
import { GetAllUsersUseCase } from "../../../usecase/user/GetAllUserUseCase";

const router = express.Router();
const userRepository = new UserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const getUserUseCase = new GetUserUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
const userController = new UserController(
  createUserUseCase,
  getUserUseCase,
  updateUserUseCase,
  deleteUserUseCase,
  getAllUsersUseCase
);

router.post("/", (req, res) => userController.createUser(req, res));
router.get("/:id", (req, res) => userController.getUser(req, res));
router.put("/:id", (req, res) => userController.updateUser(req, res));
router.delete("/:id", (req, res) => userController.deleteUser(req, res));
router.get("/", (req, res) => userController.getAllUsers(req, res));

export default router;
