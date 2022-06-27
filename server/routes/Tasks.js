const express = require("express");
const router = express.Router();
const { Tasks } = require("../models");
var Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const db = require("../models");


router.post("/", async (req, res) => {
  const listOfTasks = await Tasks.findAll();
  res.json(listOfTasks);
});

router.post("/line-chart", async (req, res) => {
  const listOfTasks = await db.sequelize.query("SELECT COUNT(*) as total, MONTH(dueDate) as month FROM `tasks` WHERE YEAR(dueDate) = YEAR(CURRENT_DATE) GROUP BY MONTH(dueDate)", { type: QueryTypes.SELECT });
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
  console.log(taskDetail);
});

router.post("/sprint/task/overview/:id", async (req, res) => {
  const id = req.params.id;
  const taskDetail = await Tasks.findAll({
    where: {
      id: id
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
  res.json(taskToUpdate);
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
