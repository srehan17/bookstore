const models = require("../models");
const customerUtils = require("../utils/CustomerUtils")

module.exports.index = async (req, res, next) =>{

    let options = req.query

    // if user is customer he cannot see vendors
    if (req.user.isCustomer()) {
        options['id'] = req.user.customerId     
    }

    // if user is vendor he cannot see customers
    else if (req.user.isVendor()) {
        res.status(403).send({"error": "Unauthorized"})
    }

    
    customerUtils.getCustomers(options)
             .then(result => res.status(200).send(result))
             .catch(err => next(err));
}