const models = require("../models");
const book = require("../models/book");

/**
 * Creates an order
 * @param {int} customerId - id of customer whose order needs to be created 
 * @returns 1 if the order is created, 0 if no order is created
 * @throws {Error} - customerId must be passed
 * @throws {Error} - address must be passed
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