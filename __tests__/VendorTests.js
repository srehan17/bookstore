const models = require("../models");
const vendorUtils = require("../utils/VendorUtils");


beforeAll(async () => {
    await models.sequelize.sync({force: true});
});


test('vendor successfully created', async () => {    
    let vendor = models.Vendor.build({name: "John" })
    try{
        await vendor.validate()
    }catch(err){
        console.log("Vendor not created")
    }
})


test('vendor name cannot be null', async () => {    

    let vendor = models.Vendor.build({})
    try{
        await vendor.validate()
    }catch(err){
        expect(err.message).toContain("vendor name null")
    }
})


test('vendor name cannot be empty', async () => {    

    let vendor = models.Vendor.build({name: ""})
    try{
        await vendor.validate()
    }catch(err){
        console.log(err.message)
        expect(err.message).toContain("vendor name empty")
    }
})


test('vendor name should be less than 255', async () => {    

    let vendor = models.Vendor.build({name: "x".repeat(300)})
    try{
        await vendor.validate()
    }catch(err){
        console.log(err.message)
        expect(err.message).toContain("vendor name should be less than 255")
    }
})




afterAll(async () => {
    await models.sequelize.close();
});
