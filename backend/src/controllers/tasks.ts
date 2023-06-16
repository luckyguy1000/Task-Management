import { Request, Response } from "express";

import Task from "../models/task";

export const getAll = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({}).exec();

    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    let newTask = new Task(req.body);
    await newTask.save();

    res
      .status(201)
      .json({ message: "Task saved successfully!", id: newTask._id });
  } catch (err) {
    res.status(400).json({ message: "Incorrect parameters", errors: err });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    let task = await Task.findById(req.params.id).exec();

    if (task === null) {
      return res.status(404).json({ message: "This task doesn't exist" });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({ message: "Task updated successfully!" });
  } catch (err) {
    res.status(400).json({ message: "Missing parameters", errors: err });
  }
};

export const deleteOne = async (req: Request, res: Response) => {
  try {
    await Task.findByIdAndRemove(req.params.id);

    res.status(200).json({ message: "Task deleted successfully!" });
  } catch (err) {
    res.status(400).json({ message: `Error delete task: ${err}` });
  }
};
