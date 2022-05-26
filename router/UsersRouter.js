const passport = require('passport');
const usersController =  require('../controllers/UsersController')
const router = require("express").Router();
const bearerAuthenticated = require('../authentication')

router.get("/", 
  bearerAuthenticated,
  async (req, res) => {
    await usersController.index(req, res)
  }
);

router.post("/", 
  async (req, res) => {
      res.send("create user")
    //await usersController.index(req, res)
  }
);


module.exports = router