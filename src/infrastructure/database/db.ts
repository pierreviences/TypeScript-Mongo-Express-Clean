// database.ts
import { Collection, InsertOneResult } from "mongodb";
import { User } from "../../entities/User";
import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.MONGO_URI as string;

export class Database {
  private static instance: Database;
  private usersCollection!: Collection<User>;
  private client: MongoClient;
  private db!: Db;

  private constructor() {
    this.client = new MongoClient(url);
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connected() {
    if (!this.usersCollection) {
      try {
        await this.client.connect();
        this.db = this.client.db();
        this.usersCollection = this.db.collection<User>("users");
        console.log("Connected to MongoDB");
      } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
      }
    }
  }
  public getUsersCollection(): Collection<User> {
    return this.usersCollection;
  }

  public async close() {
    if (this.client) {
      await this.client.close();
    }
  }
}
