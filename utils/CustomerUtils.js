const models = require("../models");


/**
 * Creates a customer
 * @param {string} name - name of customer to be created 
 * @param {string} address - address of customer to be created 
 * @returns created customer
 * @throws {Error}
 */
module.exports.createCustomer = async (params) => {
    let customer = models.Customer.build({name: params.name, address: params.address});
    await customer.save()

    await models.User.create({customerId: customer.id, email: params.email, password: params.password})

    return customer    
}


/**
 * Gets customers
 * @returns customers
 * @throws {Error}
 */
 module.exports.getCustomers = async (options) => {
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
    query["attributes"] = ["id", "name", "address"]


    let customers = await models.Customer.findAll(query);
    return customers
}