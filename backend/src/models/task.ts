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
    title: {
      type: String,
      require: true,
    },
    detail: {
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

schema.index({ "$**": "text" });

export const model = mongoose.model<ITask>("Task", schema);

export default model;
