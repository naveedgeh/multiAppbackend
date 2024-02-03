import mongoose from "mongoose";
import { config } from "../config/config.js";

const connect = async () => {
  try {
    const dbConnect = await mongoose.connect(config.mongoose.url);
    console.log("\n database is connected", dbConnect.connection.host);
  } catch (error) {
    console.log("Database is not connecte", error);
    process.exit(1);
  }
};

export default connect;
