const passport = require('passport');
const booksController =  require('../controllers/BooksController')
const router = require("express").Router();
const bearerAuthenticated = require('../authentication')

router.get("/", 
  bearerAuthenticated,
  async (req, res, next) => {
    await booksController.index(req, res, next)
  }
);


router.get("/:id", 
  bearerAuthenticated,
  async (req, res, next) => {
    await booksController.details(req, res, next)
  }
);


router.post("/", 
  // bearerAuthenticated,
  async (req, res) => {
    res.send('create book')
    // await booksController.index(req, res)
  }
);


    // // Create a new Tutorial
    // router.post("/", tutorials.create);
    // Retrieve all Tutorials
    
    // // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
    // // Retrieve a single Tutorial with id
    // router.get("/:id", tutorials.findOne);
    // // Update a Tutorial with id
    // router.put("/:id", tutorials.update);
    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
    
  module.exports = router