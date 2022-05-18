const models = require("../models");


/**
 * Creates a vendor
 * @param {string} name - name of vendor to be created 
 * @returns created vendor 
 * @throws {Error}
 */
module.exports.createVendor = async (params) => {
    let vendor = models.Vendor.build({name: params.name});
    await vendor.save()

    await models.User.create({vendorId: vendor.id, email: params.email, password: params.password})

    return vendor    
}