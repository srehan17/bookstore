const models = require("../models");
const orderUtils = require("../utils/OrderUtils")

module.exports.index = async (req, res, next) =>{

    let options = req.query

    
    // if user is vendor he cannot see any orders
    if(req.user.isVendor()) {
        res.status(403).send({"error": "Unauthorized"})  
    }

    // if user is a customer he can only see his orders and see only select columns
    else if(req.user.isCustomer()) {
        // options['customerId'] = req.user.customerId
        options["attributes"] = ["id", "orderDate", "customerId", "status", "booksCount"]
    }

   
    orderUtils.getOrders(options)
        .then(result => res.status(200).send(result))
        .catch(err => next(err));

}