const models = require("../models");
const { Op } = require('sequelize');
const book = require("../models/book");

/**
 * Create a book
 * @param {string} title - title of book to be created 
 * @param {string} author - author of book to be created 
 * @param {string} isbn - isbn of book to be created 
 * @param {decimal} price - price of book to be created 
 * @returns created book 
 * @throws {Error}
 */
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


/**
 * Deletes the book with a given id.
 * @param {integer} id - Id of the book to be deleted 
 * @returns 1 if the book was found and deleted, 0 if no book with id was found
 * @throws {Error} - Id must be passed
 */
module.exports.deleteBook = async (id) => {
    if(!id){
        throw new Error("id is required")
    }

    return await models.Book.destroy(
        { where: 
            {
                id: id
            }
        }
    )
}

/**
 * gets book with options
 * @param {integer} id - Id of the book to be deleted 
 * @returns 1 if the book was found and deleted, 0 if no book with id was found
 * @throws {Error} - Id must be passed
 */
module.exports.getBooks = async (options) => {
    let query = {}
    let whereClause = {};

    if(options["vendorId"]){
        whereClause["vendorId"] = options["vendorId"]
    }

    if(options["customerId"]){
        whereClause["customerId"] = options["customerId"]
    }

    if(options["author"]){
        whereClause["author"] = options["author"]
    }

    if(options["title"]){
        whereClause["title"] = options["title"]
    }

    if (options["sold"]) {
        whereClause["sold"] = options["sold"]
    }

    if (options["category"]) {
        whereClause["category"] = options["category"]
    }

    if (options["numberOfDaysSince"]) {
        whereClause["start_datetime"] = options["start_datetime"]
    } 

    if(options["limit"]) {
        query["limit"] = options["limit"]
    }

    if(options["offset"]) {
        query["offset"] = options["offset"]
    }

    if(options["sort"]) {
        query["order"] = [[options["sort"], options["sort_direction"] || 'ASC' ]]
    }
    
    if(options["attributes"]) {
        query["attributes"] = options["attributes"]
    }

    
    query["where"] = whereClause


    let books = await models.Book.findAll(query);
    return books;
}

/* 
    TODO:  Can you combine 
    - getAllSoldBooksByVendor
    - getAllUnsoldBooksByVendor
    - soldBooksForVendorInLastXDays
    - getBooksThatHaveNotBeenSold
    - getBooksByTitle
    - getBooksByAuthor

    into one function with parameter options
    i.e 
    getBooks(options)    
    {
        vendorId:
        authorId:
        sort:{ 
            field:
            order: 
        }
        sold: 
    }
*/

    
// List all sold books for Vendor in the last X days
// TODO: This is incomplete, take the X days as parameter
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