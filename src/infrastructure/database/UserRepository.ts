import { MongoClient, Db, Collection } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.MONGO_URI as string;

class UserRepository {
  private client: MongoClient;
  private db: Db;
  private usersCollection: Collection;
  private connected: boolean = false;

  constructor() {
    this.client = new MongoClient(url);
    this.db = this.client.db();
    this.usersCollection = this.db.collection("users");
    this.connectToDatabase();
  }

  private async connectToDatabase() {
    try {
      await this.client.connect();
      this.connected = true;
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }

  public isConnected(): boolean {
    return this.connected;
  }
}
export default UserRepository;
