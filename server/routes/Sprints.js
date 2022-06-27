const express = require("express");
const router = express.Router();
const { Sprints } = require("../models");
const bcrypt = require("bcrypt");
const {sign} = require ('jsonwebtoken')

router.post("/", async (req, res) => {
  const listOfSprints = await Sprints.findAll();
  res.json(listOfSprints);
});

router.post("/sprint-overview/:id", async (req, res) => {
  const id = req.params.id;
  const sprintDetail = await Sprints.findAll({
    where: {
      id: id
    }
  });
  res.json(sprintDetail);
  console.log(sprintDetail);
});

router.post("/add-sprint", async (req, res) => {
  const sprint = req.body;
  await Sprints.create(sprint);
  res.json(sprint);
});

router.post("/update-sprint", async (req, res) => {
  const sprint = req.body;
  console.log(sprint);
  const sprintToUpdate = await Sprints.update(sprint, {
    where: {
      id: sprint.id
    }
  });
  res.json(sprintToUpdate);
});


router.post("/delete-sprint", async (req, res) => {
  const sprint = req.body;
  const sprintToDelete = await Sprints.destroy({
    where: {
      id: sprint.id
    }
  });
  res.json(sprintToDelete);
});


module.exports = router;
