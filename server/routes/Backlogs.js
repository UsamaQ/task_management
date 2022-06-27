const express = require("express");
const router = express.Router();
const { Backlogs } = require("../models");
const bcrypt = require("bcrypt");
const {sign} = require ('jsonwebtoken')
const { Op } = require("sequelize");

router.post("/", async (req, res) => {
  const listOfBacklogs = await Backlogs.findAll();
  res.json(listOfBacklogs);
});

router.post("/search-backlog/:search", async (req, res) => {
  const search = req.params.search;
  console.log('AAAAA SEARCH WORKING          '+search);
  const listOfBacklogs = await Backlogs.findAll({
    where : {
      title : {
        [Op.like] : "%"+search+"%"
      }
    }
  });
  res.json(listOfBacklogs);
});

router.post("/backlog-overview/:id", async (req, res) => {
  const id = req.params.id;
  console.log("usama");
  const backlogDetail = await Backlogs.findAll({
    where: {
      id: id
    }
  });
  res.json(backlogDetail);
});

router.post("/add-backlog", async (req, res) => {
  const backlog = req.body;
  await Backlogs.create(backlog);
  res.json(backlog);
});

router.post("/update-backlog", async (req, res) => {
  const backlog = req.body;
  const backlogToUpdate = await Backlogs.update(backlog, {
    where: {
      id: backlog.id
    }
  });
  res.json(backlogToUpdate);
});


router.post("/delete-backlog", async (req, res) => {
  const backlog = req.body;
  const backlogToDelete = await Backlogs.destroy({
    where: {
      id: backlog.id
    }
  });
  res.json(backlogToDelete);
});


module.exports = router;
