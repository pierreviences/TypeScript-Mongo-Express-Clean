import { InsertOneResult } from "mongodb";
import { User } from "../../entities/User";
import { Database } from "../database/db";
import { ObjectId } from "mongodb";

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

  async findById(id: string): Promise<User | null> {
    try {
      await this.db.connected();
      const usersCollection = this.db.getUsersCollection();
      const user = await usersCollection.findOne({ _id: new ObjectId(id) });
      return user;
    } catch (error) {
      console.error("Error finding user:", error);
      throw error;
    }
  }

  async closeDatabase() {
    await this.db.close();
  }
}

export default UserRepository;
