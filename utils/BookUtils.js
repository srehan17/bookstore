const models = require("../models");
const { Op } = require('sequelize');
const book = require("../models/book");

// create a book
module.exports.createBook = async (params) => {
    return await models.Book.create(
        {
            title: params.title, 
            author: params.author, 
            isbn: params.isbn,
            price: params.price,
            vendorId: params.vendorId
        }
    )
}


// Delete a book record 
module.exports.deleteBook = async (id) => {
    return await models.Book.destroy(
        { where: 
            {
                id: id
            }
        }
    )
}


// List all books for Vendor
module.exports.listAllBooksForVendor = async (vendorId) => {
    let booksForVendor = await models.Book.findAll(
        {
            where: 
            {
                vendorId: vendorId
            }
        }
    );
    
    console.log(`Books for Vendor Id: ${vendorId}`)
    
    for (b of booksForVendor){
        console.log(" > " + b.title + " by " + b.author + " sold by Vendor Name " + (await b.getVendor()).name) //vendor name not printed?
    }

    return booksForVendor;
}


// List all sold books for Vendor
module.exports.listAllSoldBooksForVendor = async (vendorId) => {
    let soldBooksForVendor = await models.Book.findAll(
        {
            where: 
            {
                vendorId: vendorId,
                sold: true
            }
        }
    );
    if (soldBooksForVendor.length == 0) {
        return console.log("None sold");
    }
    console.log(`Sold Books for Vendor Id: ${vendorId}`)
    await soldBooksForVendor.forEach(b =>{
        console.log(" > " + b.title + " by " + b.author)
    })
    return soldBooksForVendor;
}


// List all unsold books for Vendor
module.exports.listAllUnsoldBooksForVendor = async (vendorId) => {
    let unsoldBooksForVendor = await models.Book.findAll(
        {
            where: 
            {
                vendorId: vendorId,
                sold: false
            }
        }
    );

    
    let booksForVendor = await models.Book.findAll(
        {
            where: 
            {
                vendorId: vendorId,
            }
        }
    );
    
    if ((unsoldBooksForVendor.length == 0) && (unsoldBooksForVendor.length < booksForVendor.length)){ 
        return console.log(`All of the books for Vendor Id ${vendorId} have been sold`);
    }

    console.log(`Unsold Books for Vendor Id: ${vendorId}`)
    
    unsoldBooksForVendor.forEach(b =>{
        console.log(" > " + b.title + " by " + b.author)
    })
    
    return unsoldBooksForVendor;
}


// List all sold books for Vendor in the last X days
module.exports.listAllSoldBooksForVendorInLastXDays = async (vendorId) => {
    
    const startedDate = new Date("2022-04-01 00:00:00");
    // const endDate = new Date("2020-12-26 00:00:00");

    let soldBooksForVendorinLastXDays = await models.Book.findAll(
        {
            include: {
                model: models.Order,
                attributes: ["orderDate"],
                required: true
            },
            where: 
            {
                vendorId: vendorId,
                sold: true,
                "$Order.orderDate$": {[Op.gt] : startedDate}
            }
        }
    );
    // console.log
    // if (soldBooksForVendorinLastXDays.length == 0) {
    //     return console.log("None sold in specified timeline");
    // }

    // console.log(`Sold Books for Vendor Id: ${vendorId} in last X days`)
    
    // await soldBooksForVendorinLastXDays.forEach(b =>{
    //     console.log(" > " + b.title + " by " + b.author)
    // })
    
    return soldBooksForVendorinLastXDays;
}


// Vendor can update book if it has not been sold yet
module.exports.updateBookThatHasNotBeenSoldYet = async (params) => {
    let bookToBeUpdated = await models.Book.update( 
        {
            title: params.title,
            author: params.author,
            price: params.price,
            category: params.category 
        },
        { 
            where:
            {
                sold: false,    
                id: params.bookId          
            }
        }
    )
    return bookToBeUpdated
};
    

// Customer can see all available books ( available = not sold and not in any order)
module.exports.listAllBooksThatHaveNotBeenSoldYet = async () => {
    let books = await models.Book.findAll(
        {
            where: {
                sold: false
            }
        }
    )
    console.log("***********************************\n")
    console.log("Books available for customer:")
    await books.forEach(
        b => 
        {
            console.log(`${b.title} by ${b.author}`)
        }
    );
    console.log("\n***********************************")
    return books;
} 


// Customer can list all not sold books by title 
module.exports.listAllBooksByTitle = async (params) => {
    let booksByTitle = await models.Book.findAll(
        {
            where: {
                sold: false
            },
            order: 
            [
                ['title', 'ASC']
            ]
        },
        
    );
    console.log("***********************************\n");
    console.log("Listing all books by title ")
    await booksByTitle.forEach(b=> {
        console.log(b.title)
    });
    console.log("\n***********************************");
    return booksByTitle;
}

// Customer can list all books by author 
module.exports.listAllBooksByAuthor = async (author) => {
    let booksByAuthor = await models.Book.findAll(
        {
            where: {
                author: author,
                sold: false
            },   
            order: 
            [
                ['title', 'ASC']
            ]
        }
    );
    console.log("***********************************\n");
    console.log(`Searching books for Author ${author}`)
    await booksByAuthor.forEach(b=> {
        console.log(b.title)
    });
    console.log("\n***********************************");
    return booksByAuthor;
}


// // List all available books sorted by price
// async function listAllBooksSortedByPrice(){
//     let books = await models.Book.findAll({order: [
//         ['price', 'ASC']
//     ]});
//     //console.log(books.map(b=> b.price))
// }

