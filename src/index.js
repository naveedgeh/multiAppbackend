import connect from "./db/index.js";
import app from "./app.js";
import { config } from "./config/config.js";
connect()
  .then(() => {
    app.listen(config.port, () => {
      console.log("\n Server start on !! Port:", config.port);
    });
  })
  .catch((error) => {
    console.log("Database connection faild ", error);
  });
