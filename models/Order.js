const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {

    // Create an order 

    var Order = sequelize.define('Order',  {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        orderDate: {
            type: DataTypes.DATE, 
            allowNull: false,
            defaultValue: Sequelize.fn('now')
        },
        status: { 
            type: DataTypes.ENUM("received", "completed"), //console.log(Order.getAttributes().status.values);
            allowNull: false,
            defaultValue: "received"
        },     
    },
    {
          tableName: 'Orders',
          timestamps: true,
          schema: 'public'
      })

    Order.associate = function(models) {
        Order.hasMany(models.Book, {
            onDelete: 'CASCADE',
            foreignKey: {
                name: 'orderId',
                foreignKeyConstraint: true            }
        })
        Order.belongsTo(models.Customer, {
            foreignKey: {
                name: 'customerId',
                allowNull: false,
                foreignKeyConstraint: true
            }
        })
    };

    Order.prototype.printOrder = async function(){
        console.log("\n**************************************\n")
        console.log("Order Id: " + this.id)
        console.log("Order Date: " + this.orderDate)
        let customerName = (await this.getCustomer()).name 
        console.log("Customer: " + customerName)
        
        console.log("Books: ")

        let orderBooks = await this.getBooks()
        orderBooks.forEach(b =>{
            console.log(" > " + b.title + " by " + b.author)
        })
        console.log("\n**************************************\n")
    };
    return Order
  }