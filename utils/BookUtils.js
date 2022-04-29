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
module.exports.getBooksByVendor = async (vendorId) => {
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
        console.log(" > " + b.title + " by " + b.author + " sold by Vendor Name " + (await b.getVendor()).name)
    }

    return booksForVendor;
}


// List all sold books for Vendor
module.exports.getAllSoldBooksByVendor = async (vendorId) => {
    let soldBooksByVendor = await models.Book.findAll(
        {
            where: 
            {
                vendorId: vendorId,
                sold: true
            }
        }
    );
    if (soldBooksByVendor.length == 0) {
        return console.log("None sold");
    }
    console.log(`Sold Books for Vendor Id: ${vendorId}`)
    soldBooksByVendor.forEach(b =>{
        console.log(" > " + b.title + " by " + b.author)
    })
    return soldBooksByVendor;
}


// List all unsold books for Vendor
module.exports.getAllUnsoldBooksByVendor = async (vendorId) => {
    let unsoldBooksByVendor = await models.Book.findAll(
        {
            where: 
            {
                vendorId: vendorId,
                sold: false
            }
        }
    );

    
    let booksByVendor = await models.Book.findAll(
        {
            where: 
            {
                vendorId: vendorId,
            }
        }
    );
    
    if ((unsoldBooksByVendor.length == 0) && (unsoldBooksByVendor.length < booksByVendor.length)){ 
        return console.log(`All of the books for Vendor Id ${vendorId} have been sold`);
    }

    console.log(`Unsold Books for Vendor Id: ${vendorId}`)
    
    unsoldBooksByVendor.forEach(b =>{
        console.log(" > " + b.title + " by " + b.author)
    })
    
    return unsoldBooksByVendor;
}


// List all sold books for Vendor in the last X days
module.exports.soldBooksForVendorInLastXDays = async (vendorId) => {
    
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
module.exports.updateBookThatHasNotBeenSold = async (params) => {
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
module.exports.getBooksThatHaveNotBeenSold = async () => {
    let books = await models.Book.findAll(
        {
            where: {
                sold: false
            }
        }
    )
    console.log("***********************************\n")
    console.log("Books available for customer:")
    books.forEach(
        b => 
        {
            console.log(`${b.title} by ${b.author}`)
        }
    );
    console.log("\n***********************************")
    return books;
} 


// Customer can list all not sold books by title 
module.exports.getBooksByTitle = async (params) => {
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
    booksByTitle.forEach(b=> {
        console.log(b.title)
    });
    console.log("\n***********************************");
    return booksByTitle;
}

// Customer can list all books by author 
module.exports.getBooksByAuthor = async (author) => {
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
    booksByAuthor.forEach(b=> {
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


// - List all available books that belong to a category C


// - List all available books whose title matches searchTerms K