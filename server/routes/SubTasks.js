const express = require("express");
const router = express.Router();
const { SubTasks } = require("../models");


// SUBTASKS

router.post("/add/subTask", async (req, res) => {
  const subTask = req.body;
  await SubTasks.create(subTask);
  res.json(subTask);
});

router.post("/:id", async (req, res) => {
  const id = req.params.id;
  const listOfSubTasks = await SubTasks.findAll({
    where: {
      taskID: id
    }
  });
  res.json(listOfSubTasks);
});

router.post("/update/subTask", async (req, res) => {
  const subTask = req.body;
  const subTaskToUpdate = await SubTasks.update(subTask, {
    where: {
      id: subTask.id
    }
  });
  res.json(subTaskToUpdate);
});

router.post("/delete/subTask", async (req, res) => {
  const subTask = req.body;
  const subTaskToDelete = await SubTasks.destroy({
    where: {
      id: subTask.id
    }
  });
  res.json(subTaskToDelete);
});

module.exports = router;
