const models = require("../models");


/**
 * Creates a vendor
 * @param {string} name - name of vendor to be created 
 * @returns 1 if the vendor is created, 0 if no vendor is created
 * @throws {Error} - name must be passed
 */
module.exports.createVendor = async (params) => {
    let vendor = models.Vendor.build({name: params.name});
    await vendor.save()

    await models.UserLogin.create({vendorId: vendor.id, email: params.email, password: params.password})

    return vendor    
}