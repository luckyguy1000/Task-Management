import * as mongoose from "mongoose";
import * as bcrypt from "bcryptjs";

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

schema.pre("save", function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  });
});

schema.pre("update", function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  });
});

export const model = mongoose.model<IUser>("User", schema);

export default model;
