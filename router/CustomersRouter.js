const passport = require('passport');
const customersController =  require('../controllers/CustomersController')
const router = require("express").Router();
const bearerAuthenticated = require('../authentication')

router.get("/", 
  bearerAuthenticated,
  async (req, res, next) => {
    await customersController.index(req, res, next)
  }
);


router.post("/", 
  // bearerAuthenticated,
  async (req, res) => {
    res.send('create customer')
    // await customersController.index(req, res)
  }
);

module.exports = router