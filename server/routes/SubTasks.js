const express = require("express");
const router = express.Router();
const { SubTasks } = require("../models");


// SUBTASKS

router.post("/add-subTask", async (req, res) => {
  const subTask = req.body;
  await SubTasks.create(subTask);

  const currentId = await SubTasks.findOne({
    order: [
      ['id', 'DESC'],
  ],
  });
  subTask.id = currentId.id;

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
  
  const { subTask, checkedValue } = req.body;
  console.log(subTask, checkedValue)
  const subTaskToUpdate = await SubTasks.update({isChecked: checkedValue}, {
    where: {
      id: subTask
    }
  });
  const isChecked = await SubTasks.findOne({
    where: {
      id: subTask
    }
  });
  subTaskToUpdate.isChecked = isChecked.isChecked;

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
