const models = require("../models");
const book = require("../models/book");
const Sequelize = require("sequelize");


/**
 * Creates an order
 * @param {int} customerId - id of customer whose order needs to be created 
 * @returns order 
 * @throws {Error} - customerId must be passed
 */
module.exports.createOrder = async (params) => {
    let order = await models.Order.create(
        {
            customerId: params.customerId          
        }
    )
    await models.Book.update( 
        {
            orderId: order.id
        }, 
        {
            where: 
            {
                orderId: null,
                id: params.bookIds
            }
        }
    );
    return order;
}

/**
 * Order status marked completed and books marked as sold
 * @param {int} orderId 
 * @returns order
 * @throws {Error} - orderId must be passed
 */
module.exports.completeOrder = async(id) => {
    let order = await models.Order.findByPk(id)
    order.status = "completed"
    await order.save()

    let orderBooks = await order.getBooks();
    await models.Book.update(
        {
            sold: true
        },
        {
            where: {
                id: orderBooks.map(b=> b.id)
            }
        }
    )
    return order;
}


/**
 * Updates an order
 * @param {int} orderId, {int} array of bookIds  
 * @returns null 
 * @throws {Error} - orderId must be passed
 */
// Customer can change an order: update all previous books to a new selecton of books
// orderId, previous bookIds to same orderId and new bookIds. delete reference of orderId from the previous books
module.exports.updateOrder = async (orderId, bookIds) => {
    // remove orderIds from previous books in orderId = thirdOrder.id
    await models.Book.update( 
        {
            orderId: null
        },
        {   where: 
            {
                orderId: orderId
            }
        }
    );

    // update orderId for books where book Id is in bookIds array
    await models.Book.update(
        {
            orderId: orderId
        },
        {
            where: 
            {
                orderId: null,
                id: bookIds
            }
        }    
    )
}


/**
 * Gets orders
 * @returns orders
 * @throws {Error} 
 */
module.exports.getOrders = async( options ) => {

    let query = {}
    let whereClause = {};

    
    if(options["id"]){
        whereClause["id"] = options["id"]
    }
    
    if(options["sort"]) {
        query["order"] = [[options["sort"], options["sort_direction"] || 'ASC' ]]
    }

    if(options["limit"]) {
        query["limit"] = options["limit"]
    }

    if(options["offset"]) {
        query["offset"] = options["offset"]
    }

    if(options["attributes"]) {
        query["attributes"] = options["attributes"]
    }

    if(query["attributes"].includes("booksCount")){
        query["attributes"] = query["attributes"].filter(a => a !== "booksCount") // remove booksCount from array
        query["attributes"] = query["attributes"].concat([[Sequelize.fn("COUNT", Sequelize.col("Books.id")), "booksCount"]])
        query["include"] = {
            model: models.Book,
            attributes: [],
            required: false
        }
        query["group"] = ["Order.id"]    
    }

    query["where"] = whereClause
    

    let orders = await models.Order.findAll(query)
    return orders;
}



/**
 * Gets order details
 * @param {int} orderId  
 * @returns orderDetails
 * @throws {Error} - orderId must be passed
 */
// Customer can see details of their particular order
module.exports.getOrderDetails = async(orderId) => {
    let orderDetails = await models.Order.findAll( 
        {
            include: {
                model: models.Book,
                attributes: ["title", "author"],
                required: true
            },
            where: 
            {
                id: orderId
            }
        }
    );
    return orderDetails;
}


/**
 * Cancel an order that has not been completed yet
 * @param {int} orderId - to be deleted 
 * @returns 1 if order is found, 0 if order is not found
 * @throws {Error} - orderId must be passed where status: "received"
 */
// Can cancel an order that has not been completed yet - order delete and change orderId to null -- cascade Delete (only foreign key nullify - not delete the book)
module.exports.cancelOrderThatHasNotBeenCompletedYet = async(orderId) => {
    await models.Order.destroy(
        {
            where: {
                id: orderId,
                status: "received"
            }
        }
    ) 
}