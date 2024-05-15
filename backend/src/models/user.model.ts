import { Schema, models, model, Document } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from "jsonwebtoken";

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateRefreshToken = function () {
  const payload = { userId: this._id };
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;
  const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY as string;

  const signOptions: SignOptions = { expiresIn: refreshTokenExpiry };

  return jwt.sign(payload, refreshTokenSecret, signOptions)
}

const User = models.User || model<IUser>("User", userSchema);

export default User;

