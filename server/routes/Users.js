const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const {sign} = require ('jsonwebtoken')

router.post("/", async (req, res) => {
  const { email, username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      email: email,
      username: username,
      password: hash,
    });
    res.json({msg : "SUCCESS"});
  });
});

router.post("/login/:user", async (req, res) => {
  const user = req.params.user;
  const listOfTasks = await Users.findAll({
    where : {
      id : user, 
    }
  });
  res.json(listOfTasks);
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email: email } });

  if (!user) {
    res.json({ error: "User Doesn't Exist" , status: 0});
    return;
  }
  bcrypt.compare(password, user.password).then((match) => {
    if (!match) 
    {
      res.json({ error: "Wrong Email And Password Combination" , status: 0});
      return;
    }
    const accessToken = sign({email: user.email, id: user.id },
       "importantSecret"
       );
    res.json({accessToken, id: user.id , status: 1});
  });
});

module.exports = router;
