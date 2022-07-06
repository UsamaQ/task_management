const express = require("express");
const router = express.Router();
const { Sprints } = require("../models");
const bcrypt = require("bcrypt");
const {sign} = require ('jsonwebtoken')
const { Op } = require("sequelize");


router.post("/:user", async (req, res) => {
  const user = req.params.user;
  const listOfSprints = await Sprints.findAll({
    where : {
      assignedBy : user, 
    }
  });
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
});

router.post("/global/search-sprint/:search", async (req, res) => {
  const search = req.params.search;
  const listOfSprints = await Sprints.findAll({
    where : {
      title : {
        [Op.like] : "%"+search+"%"
      }
    }
  });
  res.json(listOfSprints);
});

router.post("/add/sprint", async (req, res) => {
  const sprint = req.body;
  await Sprints.create(sprint);
  const currentId = await Sprints.findOne({
    order: [
      ['id', 'DESC'],
  ],
  });
sprint.id = currentId.id;
  res.json(sprint);
});

router.post("/update-sprint", async (req, res) => {
  const sprint = req.body;
  const sprintToUpdate = await Sprints.update(sprint, {
    where: {
      id: sprint.id
    }
  });
  res.json(sprintToUpdate);
});


router.post("/delete/sprint", async (req, res) => {
  const sprint = req.body;
  const sprintToDelete = await Sprints.destroy({
    where: {
      id: sprint.id
    }
  });
  res.json(sprintToDelete);
});


module.exports = router;
