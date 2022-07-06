const express = require("express");
const router = express.Router();
const { Backlogs } = require("../models");
const { Op } = require("sequelize");


router.post("/:user", async (req, res) => {
  const user = req.params.user;
  const listOfBacklogs = await Backlogs.findAll({
    where : {
      assignedBy : user, 
    }
  });
  res.json(listOfBacklogs);
});

router.post("/search-backlog/:search", async (req, res) => {
  const search = req.params.search;
  const listOfBacklogs = await Backlogs.findAll({
    where : {
      title : {
        [Op.like] : "%"+search+"%"
      }
    }
  });
  res.json(listOfBacklogs);
});

router.post("/global/search-backlog/:search", async (req, res) => {
  const search = req.params.search;
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
  const backlogDetail = await Backlogs.findAll({
    where: {
      id: id
    }
  });
  res.json(backlogDetail);
});

router.post("/add/backlog", async (req, res) => {
  const backlog = req.body;
  await Backlogs.create(backlog);

  // ============================================

  const currentId = await Backlogs.findOne({
    order: [
      ['id', 'DESC'],
  ],
  });
backlog.id = currentId.id;

  // ============================================

  res.json(backlog);
});

router.post("/update/backlog", async (req, res) => {
  const backlog = req.body;
  const backlogToUpdate = await Backlogs.update(backlog, {
    where: {
      id: backlog.id
    }
  });
  res.json(backlog);
});


router.post("/delete/backlog", async (req, res) => {
  const backlog = req.body;
  const backlogToDelete = await Backlogs.destroy({
    where: {
      id: backlog.id
    }
  });
  res.json(backlogToDelete);
});


module.exports = router;
