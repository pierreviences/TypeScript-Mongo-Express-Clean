import { User } from "../../entities/User";
import { InsertOneResult, DeleteResult } from "mongodb";

export interface UserRepository {
  insertOne(user: User): Promise<InsertOneResult<User>>;
  findById(id: string): Promise<User | null>;
  updateById(id: string, updates: Partial<User>): Promise<boolean>;
  getAllUsers(): Promise<User[]>;
  deleteById(id: string): Promise<DeleteResult>;
}
