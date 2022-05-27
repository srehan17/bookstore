const models = require("../models");
const bookUtils = require("../utils/BookUtils")


const applyAuthorization = (user, options) => {


    if(user.isCustomer()){
        options["sold"] = "false"  // only show available(unsold) books to customer ?? It is showing sold false books even when selection is sold true, shouldnt it show empty array?
        options["attributes"] = ["title", "author", "price", "category", "sold"]
    }


    // show all vendor specific books to vendor sold and unsold
    else if(user.isVendor()) {
        options['vendorId'] = user.vendorId
        options["attributes"] = ["title", "author", "price", "category", "sold"]
        // options["start_datetime"] =  [[Op.gte]: moment().subtract(7, 'days').toDate()]
    }    

    options["searchTerm"] = options.searchTerm

}


module.exports.index = async (req, res, next) =>{

    let options = req.query

    applyAuthorization(req.user, options);

    bookUtils.getBooks(options)
             .then(result => res.status(200).send(result))
             .catch(err => next(err));
}


// books/:id
module.exports.details = async (req, res, next) => {

    let options = req.query

    applyAuthorization(req.user, options);

    options["bookId"] = req.params.id

    bookUtils.getBooks(options)
            .then(result => {
                if(result.length > 0){
                    res.status(200).send(result[0])
                }else{
                    res.status(404).send({error: "Record Not Found"})
                }
            })
            .catch(err => next(err));
}

    // (1) books/search new branch git commit

    // (2) books/:id 
    // books/7 -------- should show this message: record not found (unauthorised)
    // commit continously 
// set pagination offset 0 limit 1 to get one element here instead of calling books/:id
    



// create admin data
// add admin info in User model
// fix routes POST /books/new to POST /books
// show select fields to customer / vendor and all fields to admin including timestamps
 
// Get LIST routes for add models including sort orders, query parameters

