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