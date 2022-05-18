const models = require("./models");
const vendorUtils = require("./utils/VendorUtils");
const bookUtils = require("./utils/BookUtils");
const orderUtils = require("./utils/OrderUtils");
const customerUtils = require("./utils/CustomerUtils");

(async () =>{
    try{
        // await models.sequelize.sync({alter: true});
        await models.sequelize.sync({force: true});
        
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
        
        let bookBN = await bookUtils.createBook(
            {
                title: "BottleNeck",
                isbn: "245029-13739-299",
                author: "KK Tom",
                price: 10,
                vendorId: vendorTom.id
            }
        );
        let bookBF = await bookUtils.createBook(
            {
                title: "Best Friends",
                isbn: "245029-13739-399",
                author: "Beet",
                price: 12,
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
        let bookST = await bookUtils.createBook(
            {
                title: "Smiling Teeth",
                isbn: "245019-13739-299",
                author: "Pete Pan",
                price: 14,
                vendorId: vendorDarcy.id
            }
        );
        let bookSat = await bookUtils.createBook(
            {
                title: "Saturday",
                isbn: "245129-13739-299",
                author: "Teek Tan",
                price: 17,
                vendorId: vendorTom.id
            }
        );


            
        // CREATE CUSTOMERS 
        let customerSuzy = await customerUtils.createCustomer(
            {
                name: "Suzy Dan",
                address: "London ON",
                email: "suzy@hotmail.com",
                password: "abc1234"
            }
        );
        let customerPolly = await customerUtils.createCustomer(
            {
                name: "Polly",
                address: "Pine Nut Avenue",
                email: "polly@winners.com",
                password: "abc123"
            }
        );
        let customerPinky = await customerUtils.createCustomer(
            {
                name: "Pinky Patrick",
                address: "Waterloo ON",
                email: "pinky@hotmail.com",
                password: "abc1234"
            });


        // CREATE ORDER - customer can create order with multiple books
        let firstOrder = await orderUtils.createOrder(
            {
                customerId: customerSuzy.id, 
                bookIds: [bookLBT.id, bookBBB.id, bookTIWH.id]
            }
        );

        // let secondOrder = await orderUtils.createOrder(
        //     {
        //         customerId: customerPinky.id, 
        //         bookIds: [bookSat.id, bookBN.id]
        //     }
        // );

        // let thirdOrder = await orderUtils.createOrder(
        //     {
        //         customerId: customerPolly.id, 
        //         bookIds: [bookSat.id, bookBBB.id, bookST.id]
        //     }
        // );

        // await firstOrder.printOrder()

        // await firstOrder.destroy()
        // await secondOrder.printOrder()
        // await thirdOrder.printOrder()

        // await orderUtils.completeOrder(firstOrder.id)

        // DELETE BOOK
        // await bookUtils.deleteBook(3)

        // // VENDOR CAN SEE ALL THEIR BOOKS
        // await bookUtils.getBooksByVendor(vendorKatie.id);

        // // VENDOR CAN SEE ALL SOLD BOOKS
        // await bookUtils.getAllSoldBooksByVendor(vendorTom.id);

        // // VENDOR CAN SEE ALL UNSOLD BOOKS
        // await bookUtils.getAllUnsoldBooksByVendor(vendorDarcy.id);

        // console.log("\n----------------------------------------------\n")
        // // VENDOR CAN SEE ALL SOLD BOOKS IN LAST X DAYS
        // let books = await bookUtils.soldBooksForVendorInLastXDays(vendorKatie.id);
        // books.forEach(b=>{
        //     console.log(b)
        // })

        // // VENDOR CAN UPDATE ALL BOOKS THAT HAVEN'T BEEN SOLD YET
        // await bookUtils.updateBookThatHasNotBeenSold(params);

        // // CUSTOMER CAN SEE ALL BOOKS THAT HAVENT BEEN SOLD YET
        // await bookUtils.getBooksThatHaveNotBeenSold();

        // // CUSTOMER CAN SEE AVAILABLE BOOKS BY TITLE
        // await bookUtils.getBooksByTitle();

        // // CUSTOMER CAN SEE AVAILABLE BOOKS BY Author
        // await bookUtils.getBooksByAuthor("BlueTruckAuthor");

        // console.log("\n--------------------------------PREVIOUS ORDER:---------------------\n")
        // CUSTOMER CAN SEE THEIR ORDER DETAILS FOR A PARTICULAR ORDER
        // await orderUtils.getOrderDetails(thirdOrder.id);

        // CUSTOMER CAN UPDATE ORDER
        //await orderUtils.updateOrder(thirdOrder.id, [bookBF.id, bookBBB.id])

        // // CUSTOMER CAN SEE ALL THEIR ORDERS (Order No, Date, No of Books, Status)
        // await orderUtils.getOrdersByCustomerId(customerSuzy.id);

        // console.log("\n--------------------------------UPDATED ORDER:----------------------\n")
        // CUSTOMER CAN SEE THEIR ORDER DETAILS FOR A PARTICULAR ORDER
        // await orderUtils.getOrderDetails(thirdOrder.id);

        // Can cancel an order that has not been completed yet - order delete and change orderId to null -- cascade Delete (only foreign key nullify - not delete the book)
        // await orderUtils.cancelOrderThatHasNotBeenCompletedYet(firstOrder.id);

        const books = await bookUtils.getBooks({author: "Beet"});
        console.log(JSON.stringify(books, null, 3));
    }
    catch(err){
        console.log(err)
        console.log(JSON.stringify(err, null, 3))
    }
})()