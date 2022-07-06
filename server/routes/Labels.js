const express = require("express");
const router = express.Router();
const { Labels } = require("../models");


router.post("/", async (req, res) => {
  const listOfLabel = await Labels.findAll();
  res.json(listOfLabel);
});

router.post("/add-label", async (req, res) => {
  const label = req.body;
  await Labels.create(label);
  res.json(label);
});

router.post("/:id", async (req, res) => {
  const id = req.params.id;
  const listOfLabel = await Labels.findAll({
    where: {
      taskId: id
    }
  });
  res.json(listOfLabel);
});

router.post("/update-label", async (req, res) => {
  const label = req.body;
  const labelToUpdate = await Labels.update(label, {
    where: {
      id: label.id
    }
  });
  res.json(labelToUpdate);
});

router.post("/delete/label", async (req, res) => {
  const label = req.body;
  const labelToDelete = await Labels.destroy({
    where: {
      id: label.id
    }
  });
  res.json(labelToDelete);
});

module.exports = router;
