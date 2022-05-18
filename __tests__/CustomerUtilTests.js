const models = require("../models");
const customerUtils = require("../utils/CustomerUtils");

beforeAll(async () => {
    await models.sequelize.sync({force: true});
});


// test for customer // expect customerSuzy to be defined // expect added customer name and address to be correct // user login to match user login table
test('customer is created', async () => {    
    let customerSuzy = await customerUtils.createCustomer
    (
        { name: "Suzy Dan",
        address: "London ON",
        email: "suzy@hotmail.com",
        password: "abc1234"
        }
    )    
    expect(customerSuzy).toBeDefined();

    let loadedCustomer = await models.Customer.findByPk(customerSuzy.id);
    expect(loadedCustomer.name).toBe("Suzy Dan");
    expect(loadedCustomer.address).toBe("London ON");
    
    let loadedCustomerUser = await models.User.findOne({where: {email: "suzy@hotmail.com"}});
    expect(loadedCustomerUser).toBeDefined();
    expect(loadedCustomerUser.customerId).toBe(loadedCustomer.id)

});

afterAll(async () => {
    await models.sequelize.close();
});