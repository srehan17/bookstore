const models = require("../models");
const book = require("../models/book");

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
 * Order completed
 * @param {int} orderId 
 * @returns order
 * @throws {Error} - orderId must be passed
 */

module.exports.completeOrder = async(orderId) => {
    let order = await models.Order.findByPk(orderId)
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
 * Gets orders by customerId
 * @param {int} orderId  
 * @returns listOfOrders for customerId
 * @throws {Error} - if no customerId passed
 */
// Customer can see all their orders (Order No, Date, No of Books, Status)
module.exports.getOrdersByCustomerId = async(customerId) => {
    let listOfAllOrders = await models.Order.findAll( 
        {
            where: 
            {
                customerId: customerId
            }
        }
    )
    return listOfAllOrders;
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