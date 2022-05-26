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


/**
 * Get vendors
 * @returns list of vendors
 * @throws {Error}
 */
module.exports.getVendors = async (options) => {
    let query = {}
    let whereClause = {};

    if(options["id"]){
        whereClause["id"] = options["id"]
    }
    
    if(options["sort"]) {
        query["order"] = [[options["sort"], options["sort_direction"] || 'ASC' ]]
    }

    if(options["limit"]) {
        query["limit"] = options["limit"]
    }

    if(options["offset"]) {
        query["offset"] = options["offset"]
    }

    query["where"] = whereClause
    query["attributes"] = ["id", "name"]

    
    let vendors = await models.Vendor.findAll(query);
    return vendors
}