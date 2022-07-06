const express = require("express");
const router = express.Router();
const { Tasks } = require("../models");
var Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const db = require("../models");

// const user = req.params.body;

router.post("/:user", async (req, res) => {
  const user = req.params.user;
  console.log(user);
  const listOfTasks = await Tasks.findAll({
    where : {
      assignedBy : user, 
    }
  });
  res.json(listOfTasks);
});

router.post("/line-chart/:user", async (req, res) => {
  const user = req.params.user;
  const listOfTasks = await db.sequelize.query(`SELECT COUNT(*) as total, MONTH(dueDate) as month FROM tasks WHERE YEAR(dueDate) = YEAR(CURRENT_DATE) AND assignedBy = ${user} GROUP BY MONTH(dueDate)`, { type: QueryTypes.SELECT });
  res.json(listOfTasks);
  console.log(listOfTasks);
});

router.post("/status-chart/:user", async (req, res) => {
  const user = req.params.user;
  const listOfTasks = await db.sequelize.query(`SELECT COUNT(status) as status FROM tasks WHERE assignedBy = ${user} GROUP BY status;`, { type: QueryTypes.SELECT });
  res.json(listOfTasks);
  console.log(listOfTasks);
});

router.post("/backlog/:id", async (req, res) => {
  const id = req.params.id;
  const listOfTasks = await Tasks.findAll({
    where: {
      backlogID: id
    }
  });
  res.json(listOfTasks);
});

router.post("/sprint/:id", async (req, res) => {
  const id = req.params.id;
  const listOfTasks = await Tasks.findAll({
    where: {
      sprintID: id
    }
  });
  res.json(listOfTasks);
});

router.post("/task-overview/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const taskDetail = await Tasks.findAll({
    where: {
      id: id
    }
  });
  res.json(taskDetail);
  console.log(taskDetail);
});

router.post("/backlog/task/overview/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const taskDetail = await Tasks.findAll({
    where: {
      id: id
    }
  });
  res.json(taskDetail);
});

router.post("/sprint/task/overview/:id", async (req, res) => {
  const id = req.params.id;
  const taskDetail = await Tasks.findAll({
    where: {
      id: id,
    }
  });
  res.json(taskDetail);
  console.log(taskDetail);
});

router.post("/add/task", async (req, res) => {
  const task = req.body;
  console.log(task);
  await Tasks.create(task);
  res.json(task);
});

router.post("/update/task", async (req, res) => {
  const task = req.body;
  const taskToUpdate = await Tasks.update(task, {
    where: {
      id: task.id
    }
  });
  res.json(task);
});

router.post("/updateTaskBySprint/task", async (req, res) => {
  const { task, sprintId } = req.body;
  console.log(task, parseInt(sprintId));
  for (let index = 0; index < task.length; index++) {
    const taskToUpdate = await Tasks.update({sprintID: parseInt(sprintId)}, {
      where: {
        id: task[index]
      }
    });
    res.json(taskToUpdate)
  }
});


router.post("/delete/task", async (req, res) => {
  const task = req.body;
  const taskToDelete = await Tasks.destroy({
    where: {
      id: task.id
    }
  });
  res.json(taskToDelete);
});


module.exports = router;
