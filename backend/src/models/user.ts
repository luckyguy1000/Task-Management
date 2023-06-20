import * as mongoose from "mongoose";
import * as bcrypt from "bcryptjs";

export interface IUser extends mongoose.Document {
  email: String;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
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

// schema.pre("update", function (next) {
//   bcrypt.hash(this.password, 10, (err, hash) => {
//     this.password = hash;
//     next();
//   });
// });

schema.methods.comparePassword = function (
  candidatePassword: String
): Promise<boolean> {
  let password: String = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, password, (err, success) => {
      if (err) return reject(err);
      return resolve(success);
    });
  });
};

export const model = mongoose.model<IUser>("User", schema);

export default model;
