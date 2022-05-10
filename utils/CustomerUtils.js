const models = require("../models");


/**
 * Creates a customer
 * @param {string} name - name of customer to be created 
 * @param {string} address - address of customer to be created 
 * @returns 1 if the customer is created, 0 if no customer is created
 * @throws {Error} - name must be passed
 * @throws {Error} - address must be passed
 */
module.exports.createCustomer = async (params) => {
    let customer = models.Customer.build({name: params.name, address: params.address});
    await customer.save()

    await models.UserLogin.create({customerId: customer.id, email: params.email, password: params.password})

    return customer    
}