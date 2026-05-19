const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async.js");
const {
  createCustomError,
  CustomAPIError,
} = require("../errors/custom-error.js");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({ success: true, tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ success: true, task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findById(id);
  if (!task) {
    return next(createCustomError(`No task with id: ${id}`, 404));
  }
  res.status(200).json({ success: true, task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id: ${id}`, 404));
  }

  res.status(200).json({ success: true, task });
});
const deleteTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    return next(createCustomError(`No task with id: ${id}`, 404));
  }
  res.status(200).json({ success: true, tasks: null });
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
