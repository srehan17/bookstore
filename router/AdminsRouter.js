const passport = require('passport');
const adminsController =  require('../controllers/AdminsController')
const router = require("express").Router();
const bearerAuthenticated = require('../authentication')

router.get("/", 
  bearerAuthenticated,
  async (req, res) => {
    await AdminsController.index(req, res)
  }
);

module.exports = router