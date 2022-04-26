
module.exports = function(sequelize, DataTypes) {

    var Customer = sequelize.define('Customer',  {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        max: 255,
        validate: {
          notNull: {
            msg: 'Please enter name'
          }
        }
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
        max: 500,
        validate: {
          notNull: {
            msg: 'Please enter address'
          }
        }
      }
    }, 
    {
          tableName: 'Customers',
          timestamps: true,
          schema: 'public'
      })
      
      Customer.associate = function(models) {
        Customer.hasOne(models.UserLogin, {
          foreignKey: {
              name: 'customerId',
              unique: true,
              foreignKeyConstraint: true
          }})
        Customer.hasMany(models.Order, {
          foreignKey: {
              name: 'customerId',
              foreignKeyConstraint: true
          }});
      };
    
    return Customer
}



// Customer --
// - id: autogen
// - name: text [not null, max length: 255]
// - address: text [not null, max length: 500]
// - createdAt: timestamp
// - updatedAt: timestamp
// *- userLogin: has_one
// *- orders: has_many