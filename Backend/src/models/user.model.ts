import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import type { IUser } from "../types/user.types.js";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});
userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};
const userModel = mongoose.model("Users", userSchema);
export default userModel;
