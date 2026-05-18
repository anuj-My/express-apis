console.log("Task Manager App");
const express = require("express");
const tasksRouter = require("./routes/tasks.js");
const connectDB = require("./db.js");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/v1/tasks", tasksRouter);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(port, () => {
      console.log(`server is running on ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
