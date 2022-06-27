const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

const backlogsRouter = require("./routes/Backlogs");
app.use("/backlogs", backlogsRouter);

const tasksRouter = require("./routes/Tasks");
app.use("/tasks", tasksRouter);

const subTasksRouter = require("./routes/SubTasks");
app.use("/subTasks", subTasksRouter);

const sprintsRouter = require("./routes/Sprints");
app.use("/sprints", sprintsRouter);

const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
