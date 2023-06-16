import * as mongoose from "mongoose";
import { IUser } from "./user";

export interface ITask extends mongoose.Document {
  title: String;
  detail: String;
  scheduled_date: Date;
  user: IUser;
}

export const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    scheduled_date: {
      type: Date,
      default: new Date(),
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const model = mongoose.model<IUser>("Task", schema);

export default model;
