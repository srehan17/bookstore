const models = require("../models");

// Create a vendor
module.exports.createVendor = async (params) => {
    let vendor = models.Vendor.build({name: params.name});
    await vendor.save()

    await models.UserLogin.create({vendorId: vendor.id, email: params.email, password: params.password})

    return vendor    
}