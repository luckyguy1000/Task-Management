import * as mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
}

export const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const model = mongoose.model<IUser>("User", schema);

export default model;
