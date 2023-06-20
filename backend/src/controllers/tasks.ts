import { Request, Response, NextFunction } from "express";

import Task from "../models/task";

type QueryType = {
  page?: number;
  pageSize?: number;
  searchKey?: string;
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const query: QueryType = req.query;
    let filter: object = { user: req.body.user._id };
    if (query.searchKey)
      filter = {
        ...filter,
        $or: [
          { title: { $regex: query.searchKey, $options: "i" } },
          { detail: { $regex: query.searchKey, $options: "i" } },
        ],
      };
    const tasks = await Task.find(filter)
      .skip((query.page - 1) * query.pageSize)
      .limit(query.pageSize)
      .exec();
    const total = await Task.find(filter).count();
    res.status(200).json({ tasks, total });
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

export const isEditable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let task = await Task.findById(req.params.id).exec();

    if (task === null) {
      return res.status(404).json({ message: "This task doesn't exist" });
    }

    if (task.user.toString() == req.body.user._id.toString()) {
      return next();
    }

    return res.status(403).json({ message: "You have no permission." });
  } catch (err) {
    res.status(400).json(err);
  }
};
