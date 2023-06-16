import { Request, Response } from "express";

import User from "../models/user";

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).exec();

    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    let newUser = new User(req.body);
    await newUser.save();

    res
      .status(201)
      .json({ message: "User saved successfully!", id: newUser._id });
  } catch (err) {
    res.status(400).json({ message: "Incorrect parameters", errors: err });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    let user = await User.findById(req.params.id).exec();

    if (user === null) {
      return res.status(404).json({ message: "This user doesn't exist" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({ message: "User updated successfully!" });
  } catch (err) {
    res.status(400).json({ message: "Missing parameters", errors: err });
  }
};

export const deleteOne = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndRemove(req.params.id);

    res.status(200).json({ message: "User deleted successfully!" });
  } catch (err) {
    res.status(400).json({ message: `Error delete user: ${err}` });
  }
};
