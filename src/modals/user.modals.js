import mongoose from "mongoose";
import bcrypt from "bcrypt";
import profileStatus from "../constant/profileStatus";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
      required: true,
    },
    lastname: {
      type: String,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email");
        }
      },
    },
    password: {
      type: String,
      trip: true,
      required: true,
    },
    avatar: {
      trype: String,
    },
    status: {
      type: String,
      enum: [profileStatus],
      default: profileStatus.NOT_VERIFIED,
    },
    onlinestatus: {
      type: String,
      default: "off",
    },
    refreshtoken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async (next) => {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});
userSchema.methods.isUserNameExist = async (username) => {
  const user = await this.findOne({ username: username });
  return !!user;
};
userSchema.methods.isEmailTaken = async (email) => {
  const user = await this.findOne({ email: email });
  return !!user;
};
userSchema.methods.isPassworCorrect = async (password) => {
  return bcrypt.compare(password, this.password);
};
const User = mongoose.model("User", userSchema);

export default User;
