import Joi from "joi";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object().keys({
  NODE_ENV: Joi.string().valid("production", "development", "test"),
});

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

export const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL,
  },
  key: {
    accesskey: envVars.ACCESSSECRETKEY,
    refreshkey: envVars.REFRESHSECRETKEY,
    assessExpire: envVars.ACCESS_TOKEN_EXPIRY,
    refreshExpire: envVars.REFRESH_TOKEN_EXPIRY,
  },
};
