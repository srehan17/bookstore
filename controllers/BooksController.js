const models = require("../models");

module.exports.index = async (req, res) =>{
    // console.log(req.user.isCustomer())
    let books = await models.Book.findAll()
    return res.status(200).send(books)
}

    
