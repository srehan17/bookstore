const models = require("../models");
const orderUtils = require("../utils/OrderUtils");
const customerUtils = require("../utils/CustomerUtils");
const vendorUtils = require("../utils/VendorUtils");
const bookUtils = require("../utils/BookUtils");


let firstOrder;

beforeAll(async () => {
    await models.sequelize.sync({force: true});
});

// test for order // expect firstOrder to be defined // expect added order, customerId and bookIds to be correct
test('order is created', async () => {    

    // CREATE VENDORS
    let vendorTom = await vendorUtils.createVendor({name: "Tom", email: "tom@gmail.com", password: "secure123"})
    let vendorKatie = await vendorUtils.createVendor({name: "Katie", email: "katie@gmail.com", password: "abcd123"})
        
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

    firstOrder = await orderUtils.createOrder(
        {
            customerId: customerSuzy.id, 
            orderDate: "2022-02-02",
            status: "received",
            bookIds: [bookLBT.id, bookBBB.id, bookTIWH.id]
        }
    )    
    expect(firstOrder).toBeDefined();
});

test('order is completed', async () => {
    // let firstOrder =  await models.Order.findOne()

    let order = await orderUtils.completeOrder(firstOrder.id);
    expect(order.status).toEqual("completed");
});    


afterAll(async () => {
    await models.sequelize.close();
});