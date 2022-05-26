const passport = require('passport');
const ordersController =  require('../controllers/OrdersController')
const router = require("express").Router();
const bearerAuthenticated = require('../authentication')

router.get("/", 
  bearerAuthenticated,
  async (req, res, next) => {
    await ordersController.index(req, res, next)
  }
);

router.post("/", 
  // bearerAuthenticated,
  async (req, res) => {
    res.send("create order")
    // await ordersController.index(req, res)
  }
);

module.exports = router