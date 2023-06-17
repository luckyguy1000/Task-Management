import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";

import { model as User, IUser } from "../models/user";

const generateToken = (user: IUser): Object => {
  let token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token };
};

export const login = async (req: Request, res: Response) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
    }).exec();

    if (user === null) throw "User not found";

    let success = await user.comparePassword(req.body.password);
    if (success === false) throw "";

    res.status(200).json(generateToken(user));
  } catch (err) {
    res.status(401).json({
      message: "Invalid credentials",
      errors: err,
    });
  }
};
