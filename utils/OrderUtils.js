const models = require("../models");
const book = require("../models/book");

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

    for (b of listOfAllOrders) {
        console.log(`-----------LIST OF ALL ORDERS FOR CUSTOMER: ${(await b.getCustomer()).name}----------------\n`)
        console.log(`Order No: ${b.id}, Order Date: ${b.orderDate}, Number of Books: ${(await b.getBooks()).length}, Order status: ${b.status}`);
    }
    console.log("\n-------------------------------------------------")

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

    let order = await JSON.stringify(orderDetails, null, 4);
    // console.log(order);
    let parsedObject = await JSON.parse(order);
    // console.log(parsedObject);
    let books = parsedObject[0]["Books"];

    console.log("**********************************************\n");
    console.log(`Order No: ${parsedObject[0].id} \n Order Date: ${parsedObject[0].orderDate} \n Number of Books: ${(await books.length)} \n Status: ${parsedObject[0].status}`);
    console.log("\n List of books in this order: ")
    books.forEach(b=> {console.log(`\t ${b.title} by ${b.author}`)});
    console.log("\n**********************************************");
    
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
