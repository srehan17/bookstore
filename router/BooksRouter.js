const booksController =  require('../controllers/BooksController')
const router = require("express").Router();

router.get("/", async (req, res) => {
  await booksController.index(req, res)
});
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