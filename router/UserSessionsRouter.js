const passport = require('passport');
const userSessionsController =  require('../controllers/UserSessionsController')
const router = require("express").Router();

router.post("/sign_in", 
  async (req, res) => {
    await userSessionsController.create(req, res)
  }
);

router.delete("/sign_out", 
  async (req, res) => {
    await userSessionsController.destroy(req, res)
  }
);
    
module.exports = router