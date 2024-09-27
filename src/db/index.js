import databaseConfig from "./config.js";
import { mongoDbConnection,connectPostgresql } from "./connection.js";
const connect = async (type) => {
  const details=databaseConfig[type];
  switch (type) {
    case "mongodb":
     await mongoDbConnection(details.url,details.dbname);
      break;
    case "postgresql":
        await connectPostgresql(details.url);
        break;
    default:
        console.log("\n please check database configuration");
      throw new Error("Database not configure");
      break;
  }
};

export default connect;
