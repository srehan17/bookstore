const models = require("../models");
const orderUtils = require("../utils/OrderUtils");
const customerUtils = require("../utils/CustomerUtils");
const vendorUtils = require("../utils/VendorUtils");
const bookUtils = require("../utils/BookUtils");


beforeAll(async () => {
    await models.sequelize.sync({force: true});
});

// test for order // expect firstOrder to be defined // expect added order, customerId and bookIds to be correct
test('order is created', async () => {    

        // CREATE VENDORS
        let vendorTom = await vendorUtils.createVendor({name: "Tom", email: "tom@gmail.com", password: "secure123"})
        let vendorKatie = await vendorUtils.createVendor({name: "Katie", email: "katie@gmail.com", password: "abcd123"})
        let vendorDarcy = await vendorUtils.createVendor({name: "Darcy", email: "darcy@headphones.com", password: "abc123"})
        
        // CREATE BOOKS
        let bookLBT =  await bookUtils.createBook(
            {
                title: "Little Blue Truck",
                isbn: "245029-13729-298",
                author: "BlueTruckAuthor",
                price: 25,
                vendorId: vendorTom.id
            });
        
        let bookBBB = await bookUtils.createBook(
            {
                title: "Beep Beep Book",
                isbn: "245029-13729-299",
                author: "BlueTruckAuthor",
                price: 20,
                vendorId: vendorKatie.id
            }
        );
        
        let bookTIWH = await bookUtils.createBook(
            {
                title: "This is what happens",
                isbn: "245029-13739-299",
                author: "Beet",
                price: 10,
                vendorId: vendorTom.id
            }
        );

        // CREATE CUSTOMER
        let customerSuzy = await customerUtils.createCustomer(
            {
                name: "Suzy Dan",
                address: "London ON",
                email: "suzy@hotmail.com",
                password: "abc1234"
            }
        );

    let firstOrder = await orderUtils.createOrder({customerId: customerSuzy.id, bookIds: [bookLBT.id, bookBBB.id, bookTIWH.id]})    
    expect(firstOrder).toBeDefined();

});

afterAll(async () => {
    await models.sequelize.close();
});