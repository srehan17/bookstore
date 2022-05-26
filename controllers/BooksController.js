const models = require("../models");
const bookUtils = require("../utils/BookUtils")

module.exports.index = async (req, res, next) =>{
    
    let options = req.query

    // show all unsold books to customers
    if(req.user.isCustomer()){
        options['sold'] = false
        options["attributes"] = ["title", "author", "price", "category"]
    }

    // show all vendor specific books to vendor sold and unsold
    else if(req.user.isVendor()) {
        options['vendorId'] = req.user.vendorId
        options["attributes"] = ["title", "author", "price", "category", "sold"]
        // options["start_datetime"] =  [[Op.gte]: moment().subtract(7, 'days').toDate()]
    }

    bookUtils.getBooks(options)
             .then(result => res.status(200).send(result))
             .catch(err => next(err));
}

    
// create admin data
// add admin info in User model
// fix routes POST /books/new to POST /books
// show select fields to customer / vendor and all fields to admin including timestamps
 
// Get LIST routes for add models including sort orders, query parameters

