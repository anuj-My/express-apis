console.log("Task Manager App");
const express = require("express");
const tasksRouter = require("./routes/tasks.js");

const app = express();

const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/v1/tasks", tasksRouter);

app.listen(port, () => {
  console.log(`server is running on ${port}...`);
});
