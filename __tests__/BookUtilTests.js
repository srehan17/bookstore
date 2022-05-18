const models = require("../models");
const bookUtils = require("../utils/BookUtils");
const vendorUtils = require("../utils/VendorUtils");


beforeAll(async () => {
    await models.sequelize.sync({force: true});
});


// test for book // expect bookLBT to be defined // expect added book title (and other details) to be correct // vendorId to be correct
test('book is created', async () => {    

    // Create vendorTom
    let vendorTom = await vendorUtils.createVendor({name: "Tom", email: "tom@gmail.com", password: "secure123"})


    let bookLBT = await bookUtils.createBook(
        { 
            title: "Little Blue Truck", 
            isbn: "245029-13729-298", 
            author: "BlueTruckAuthor",
            price: 25,
            vendorId: vendorTom.id
        }
    )    
    expect(bookLBT).toBeDefined();

    let loadedBook = await models.Book.findByPk(bookLBT.id);
    expect(loadedBook.title).toBe("Little Blue Truck");
    expect(loadedBook.isbn).toBe("245029-13729-298");
    expect(loadedBook.author).toBe("BlueTruckAuthor");
    expect(loadedBook.price).toBeCloseTo(25); 
});

afterAll(async () => {
    await models.sequelize.close();
});