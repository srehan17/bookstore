module.exports = function (sequelize, DataTypes) {
  var Customer = sequelize.define(
    "Customer",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "customer name null",
          },
          notEmpty: {
            msg: "customer name empty",
          },
          len: {
            args: [1, 255],
            msg: "Customer name should be less than 255",
          },
        },
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "customer address null",
          },
          notEmpty: {
            msg: "customer address empty",
          },
          len: {
            args: [1, 500],
            msg: "Customer address should be less than 500",
          },
        },
      },
    },
    {
      tableName: "Customers",
      timestamps: true,
      schema: "public",
    }
  );

  Customer.associate = function (models) {
    Customer.hasOne(models.UserLogin, {
      foreignKey: {
        name: "customerId",
        unique: true,
        foreignKeyConstraint: true,
      },
    });
    Customer.hasMany(models.Order, {
      foreignKey: {
        name: "customerId",
        foreignKeyConstraint: true,
      },
    });
  };

  return Customer;
};

// Customer --
// - id: autogen
// - name: text [not null, max length: 255]
// - address: text [not null, max length: 500]
// - createdAt: timestamp
// - updatedAt: timestamp
// *- userLogin: has_one
// *- orders: has_many
