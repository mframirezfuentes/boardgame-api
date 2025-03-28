import mongoose from "mongoose";
import bycript from "bcrypt";
import { IUser } from "../utils/IRole";
import { Role } from "../utils/role";

const userSchema = new mongoose.Schema<IUser>({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    minlength: 5,
    maxlength: 100,
    required: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 100,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 100,
    required: true,
  },
  role: {
    type: String,
    default: Role.USER,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bycript.genSalt(10);
    this.password = await bycript.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

const User = mongoose.models.Users || mongoose.model("Users", userSchema);
export default User;
