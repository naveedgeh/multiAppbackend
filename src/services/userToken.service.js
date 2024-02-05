import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "../modals";
import { ApiError } from "../utils/ApiEror";

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} [secret]
 * @returns {string}
 */

const generateToken = (id, expiredate, secret) => {
  const payload = {
    _id: id,
  };
  return jwt.sign(payload, secret, { expiresIn: expiredate });
};
const saveToken = async (id, token) => {
  try {
    const user = await User.findOne({ _id: id });
    if (user) {
      user.refreshtoken = token;
      await user.save({ validateBeforeSave: false });
    }
  } catch (error) {
    throw new ApiError(500, "Sothing went wrong while generating new Token");
  }
};

export const generateAuthToken = async (userId) => {
  try {
    const accessToken = generateToken(
      userId,
      config.key.assessExpire,
      config.key.accesskey
    );
    const refreshToken = generateToken(
      userId,
      config.key.refreshExpire,
      config.key.refreshkey
    );
    await saveToken(userId, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access token and refresh token"
    );
  }
};
export const verifyToken = (token) => {
  const payload = jwt.verify(token, config.key.accesskey);
  if (!payload) throw new ApiError(500, "invalid token");
  return payload;
};
