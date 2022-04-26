const models = require("../models");

// Create a customer
module.exports.createCustomer = async (params) => {
    let customer = models.Customer.build({name: params.name, address: params.address});
    await customer.save()

    await models.UserLogin.create({customerId: customer.id, email: params.email, password: params.password})

    return customer    
}