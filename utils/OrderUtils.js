const models = require("../models");

// Create an order
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
    models.Book.update(
        {
            sold: true
        },
        {
            where: {
                id: orderBooks.map(b=> b.id)
            }
        }
    )
    
}

// Customer can edit an order (change the books in an order)


// Customer can see all their orders (Order No, Date, No of Books, Status)


// Can see details of one order (Order No, Date, No of Books, Status, Books details)
// Can cancel an order that has not been completed yet

