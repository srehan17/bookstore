const passport = require('passport');
const vendorsController =  require('../controllers/VendorsController')
const router = require("express").Router();
const bearerAuthenticated = require('../authentication')

router.get("/", 
  bearerAuthenticated,
  async (req, res, next) => {
    await vendorsController.index(req, res, next)
  }
);

router.post("/", 
  // bearerAuthenticated,
  async (req, res) => {
    res.send('create vendor')
    // await vendorsController.create(req, res)
  }
);


router.get("/:id", 
  // bearerAuthenticated,
  async (req, res) => {
    // res.send(`get vendor with id ${req.params.id}`)
    await vendorsController.details(req, res)
  }
);


module.exports = router