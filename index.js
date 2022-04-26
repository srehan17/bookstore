const models = require("./models");
const vendorUtils = require("./utils/VendorUtils");
const customerUtils = require("./utils/CustomerUtils");
const bookUtils = require("./utils/BookUtils");
const orderUtils = require("./utils/OrderUtils");

// // - List all available books that belong to a category C
// // - List all available books whose title matches searchTerms K

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
            
        // CREATE CUSTOMERS - customer can create order with multiple books
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

        // CREATE ORDER
        let firstOrder = await orderUtils.createOrder(
            {
                customerId: customerSuzy.id, 
                bookIds: [bookLBT.id, bookBBB.id]
            }
        );
        
        // await orderUtils.createOrder(
        //     {
        //         customerId: customerPinky.id, 
        //         bookIds: [bookLBT.id, bookBBB.id]
        //     }
        // );
        
        await firstOrder.printOrder()

        await orderUtils.completeOrder(firstOrder.id)

        // DELETE BOOK
        // await bookUtils.deleteBook(3)

        // VENDOR CAN SEE ALL THEIR BOOKS
        await bookUtils.listAllBooksForVendor(vendorKatie.id);

        // VENDOR CAN SEE ALL SOLD BOOKS
        await bookUtils.listAllSoldBooksForVendor(vendorTom.id);

        // VENDOR CAN SEE ALL UNSOLD BOOKS
        await bookUtils.listAllUnsoldBooksForVendor(vendorDarcy.id);

        console.log("\n----------------------------------------------\n")
        //VENDOR CAN SEE ALL SOLD BOOKS IN LAST X DAYS ------------ need help
        let books = await bookUtils.listAllSoldBooksForVendorInLastXDays(vendorKatie.id);
        books.forEach(b=>{
            console.log(b)
        })
        // // VENDOR CAN UPDATE ALL BOOKS THAT HAVEN'T BEEN SOLD YET
        // await bookUtils.updateBookThatHasNotBeenSoldYet(
        //     {
        //         title: "Blue Truck Engine",
        //         category: "humour",
        //         price: 33,
        //         bookId: 2
        //     }
        // )

        // // CUSTOMER CAN SEE ALL BOOKS THAT HAVENT BEEN SOLD YET
        // await bookUtils.listAllBooksThatHaveNotBeenSoldYet();

        // // CUSTOMER CAN SEE AVAILABLE BOOKS BY TITLE
        // await bookUtils.listAllBooksByTitle();

        // // CUSTOMER CAN SEE AVAILABLE BOOKS BY Author
        // await bookUtils.listAllBooksByAuthor("BlueTruckAuthor");
    }
    catch(err){
        console.log(err)
    }
})()