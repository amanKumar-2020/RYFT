import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface IUser {
  fullName: string;
  email: string;
  contact?: string;
  googleId?: string;
  password?: string;
  role: "buyer" | "seller";
}

const userSchema = new mongoose.Schema<IUser>({
  fullName: {
    type: String,
    required: true,
    trim:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim:true,
  },
  contact: {
    type: String,
  },
  password: {
    type: String,
    required: function (this: IUser) {
      return !this.googleId;
    },
  },
  role: {
    type: String,
    enum: ["buyer", "seller"],
    default: "buyer",
  },
  googleId: {
    type: String,
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

const User = mongoose.model<IUser>("User", userSchema);

export default User;
