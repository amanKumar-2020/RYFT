import mongoose, { Model } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser {
  fullName: string;
  email: string;
  contact?: string;
  password?: string;
  googleId?: string;
  role: "buyer" | "seller";
}
interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;
const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  contact: {
    type: String,
    unique: true,
    sparse: true
  },
  password: {
    type: String,
    select: false,
    required: function (this: IUser) {
      return !this.googleId;
    },
  },
  googleId: {
    type: String,
  },
  role: {
    type: String,
    enum: ["buyer", "seller"],
    default: "buyer",
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser, UserModel>("User", userSchema);

export default User;
