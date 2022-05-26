const models = require("../models");
const vendorUtils = require("../utils/VendorUtils")


module.exports.index = async (req, res, next) =>{
    
    let options = req.query

    // if user is vendor, he can only see his own information
    if (req.user.isVendor()) {
        options['id'] = req.user.vendorId     
    }

    // if user is customer he cannot see any information
    else if (req.user.isCustomer()) {
        res.status(403).send({"error": "Unauthorized"})
    }

    vendorUtils.getVendors(options)
             .then(result => res.status(200).send(result))
             .catch(err => next(err));
}

    

module.exports.create = async (req, res) =>{
    let vendor = await vendorUtils.createVendor()
    return res.status(200).send(vendor)
}
    
module.exports.details = async (req, res) =>{
    let vendor = await vendorUtils.getVendor()
    return res.status(200).send(vendor)
}
    