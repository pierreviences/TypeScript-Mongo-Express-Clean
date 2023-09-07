// UserRepository.ts
import { InsertOneResult } from "mongodb";
import { User } from "../../entities/User";
import { Database } from "./db";

class UserRepository {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  async insertOne(user: User): Promise<InsertOneResult<User>> {
    try {
      await this.db.connected();
      const usersCollection = this.db.getUsersCollection();
      const result = await usersCollection.insertOne(user);
      return result;
    } catch (error) {
      console.error("Error inserting user:", error);
      throw error;
    }
  }

  async closeDatabase() {
    await this.db.close();
  }
}

export default UserRepository;
