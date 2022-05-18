const models = require("../models");
const customerUtils = require("../utils/CustomerUtils");


beforeAll(async () => {
    await models.sequelize.sync({force: true});
});


test('customer successfully created', async () => {    
    let customer = models.Customer.build({name: "Zen", address: "Honolooloo"})
    try{
        await customer.validate()
    }catch(err){
        console.log("customer not created")
    }
})


test('customer name cannot be null', async () => {    

    let customer = models.Customer.build({})
    try{
        await customer.validate()
    }catch(err){
        expect(err.message).toContain("customer name null")
    }
})


test('customer name cannot be empty', async () => {    

    let customer = models.Customer.build({name: ""})
    try{
        await customer.validate()
    }catch(err){
        console.log(err.message)
        expect(err.message).toContain("customer name empty")
    }
})


test('customer name should be less than 255', async () => {    

    let customer = models.Customer.build({name: "x".repeat(300)})
    try{
        await customer.validate()
    }catch(err){
        console.log(err.message)
        expect(err.message).toContain("Customer name should be less than 255")
    }
})


test('customer address cannot be null', async () => {    

    let customer = models.Customer.build({})
    try{
        await customer.validate()
    }catch(err){
        expect(err.message).toContain("customer address null")
    }
})


test('customer address cannot be empty', async () => {    

    let customer = models.Customer.build({address: ""})
    try{
        await customer.validate()
    }catch(err){
        console.log(err.message)
        expect(err.message).toContain("customer address empty")
    }
})


test('customer address should be less than 500', async () => {    

    let customer = models.Customer.build({address: "x".repeat(505)})
    try{
        await customer.validate()
    }
    catch(err){
        console.log(err.message)
        expect(err.message).toContain("Customer address should be less than 500")
    }
})



afterAll(async () => {
    await models.sequelize.close();
});
