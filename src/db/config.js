 import { config } from "../config/config.js"
 const databaseConfig={
    "mongodb":{
        url:config.database.url,
        dbname:config.database.dbname || "multibackend"
    },
    "postgresql":{
        url:`${config.database.url}${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.dbname}?schema=${config.database.schema}`
    }
 }
 export default databaseConfig;