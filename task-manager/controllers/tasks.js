const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, msg: err });
  }
};
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, msg: err });
  }
};
const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      res.status(404).json({ success: false, msg: `No task with id ${id}` });
    }
    res.status(200).json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, msg: err });
  }
};
const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      res.status(404).json({ success: false, msg: `No task with id ${id}` });
    }

    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, msg: err });
  }
};
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      res.status(404).json({ success: false, msg: `No task with id ${id}` });
    }
    res.status(200).json({ success: true, tasks: null });
  } catch (err) {
    res.status(500).json({ success: false, msg: err });
  }
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
