const models = require("../models");
const orderUtils = require("../utils/OrderUtils");
const vendorUtils = require("../utils/VendorUtils");
const bookUtils = require("../utils/BookUtils");


beforeAll(async () => {
    await models.sequelize.sync({force: true});
});


test('order successfully created', async () => {  
    let vendorTom = await vendorUtils.createVendor({name: "Tom", email: "tom@gmail.com", password: "secure123"})

    let bookT = await bookUtils.createBook({
        title: "Title",
        author: "Author",
        isbn: "29392",
        price: 27,
        vendorId: vendorTom.id
    })  
    let order = models.Order.build({orderDate: "2022-01-29", status: "received", bookIds: [bookT.id]})
    try{
        await order.validate()
    }catch(err){
        console.log("order not created")
    }
})


test('orderDate cannot be null', async () => {    

    let order = models.Order.build({})
    try{
        await order.validate()
    }catch(err){
        expect(err.message).toContain("orderDate null")
    }
})



test('order status cannot be null', async () => {    

    let order = models.Order.build({})
    try{
        await order.validate()
    }catch(err){
        expect(err.message).toContain("order status null")
    }
})


afterAll(async () => {
    await models.sequelize.close();
});
