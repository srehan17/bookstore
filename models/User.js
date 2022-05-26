const bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {

    
    var User = sequelize.define('User',  {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'email is null'
          },
          isEmail: {
            msg: 'email should be valid'
          }
        }
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter password'
          }
        }
      },
    },  
    {
        tableName: 'Users',
        timestamps: true,
        schema: 'public'
    })
  
    User.associate = function(models) {
      User.hasMany(models.UserSession, {
        foreignKey: {
            name: 'userId',
            allowNull: false
        }
    })
    User.belongsTo(models.Vendor, {
      foreignKey: {
          name: 'vendorId',
          unique: true,
          foreignKeyConstraint: true
      }}
    )
    User.belongsTo(models.Customer, {
      foreignKey: {
          name: 'customerId',
          unique: true,
          foreignKeyConstraint: true
      }}
    )
    User.belongsTo(models.Admin, {
      foreignKey: {
          name: 'adminId',
          unique: true,
          foreignKeyConstraint: true
      }}
    )
    };

    User.beforeCreate(async (user, options) => {
      const salt = await bcrypt.genSalt(10); //whatever number you want
      user.password = await bcrypt.hash(user.password, salt);
      return user;      
    });  

    User.prototype.validPassword = async function(password) {
      return (await bcrypt.compare(password, this.password));
    }

    User.prototype.isCustomer = function() {
      return !!this.customerId;
    }

    User.prototype.isVendor = function() {
      return !!this.vendorId;
    }

    User.prototype.isAdmin = function() {
      return !!this.adminId;
    }

    return User
  }


