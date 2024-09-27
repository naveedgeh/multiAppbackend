import mongoose from "mongoose";
import {PrismaClient} from "@prisma/client";
let prisma;
const mongoDbConnection = async (url,dbName) => {
  try {
    const dbConnect = await mongoose.connect(`${url}/${dbName}` || "");
    console.log("\n database is connected", dbConnect.connection.host);
  } catch (error) {
    console.log("Database is not connecte", error);
    process.exit(1);
  }
};
const connectPostgresql=async(url)=>{
  console.log(url)
  process.env.DATABASE_URL=url;
    if(!prisma){
      prisma=new PrismaClient();
      console.log("Connecting to PostgreSQL");
      await prisma.$connect();
      console.log("Connected to PostgreSQL");
    }
    return prisma;
}
export {
  mongoDbConnection,
  connectPostgresql
};
