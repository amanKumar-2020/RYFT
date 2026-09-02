import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface IUser {
  name: string;
  email: string;
  contact?: number;
  password?: string;
  googleId?: string;
  role: "buyer" | "seller";
}
interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser ,{},IUserMethods>({
  name: {
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
    type: Number,
  },
  password: {
    type: String,
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

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
