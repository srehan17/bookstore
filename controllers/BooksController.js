const models = require("../models");
const bookUtils = require("../utils/BookUtils")

module.exports.index = async (req, res) =>{
    let options = {}
    if(req.user.isCustomer()){
        options['sold'] = false
    }else if(req.user.isVendor()) {
        options['vendorId'] = req.user.vendorId
    }

    let books = await bookUtils.getBooks(options)
    return res.status(200).send(books)
}

    
