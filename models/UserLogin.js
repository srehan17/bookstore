const bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {

    
    var UserLogin = sequelize.define('UserLogin',  {
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
          tableName: 'UserLogins',
          timestamps: true,
          schema: 'public'
      })
  
      UserLogin.associate = function(models) {
        UserLogin.hasMany(models.UserSession, {
          foreignKey: {
              name: 'userLoginId',
              allowNull: false
          }
      })
        UserLogin.belongsTo(models.Vendor, {
          foreignKey: {
              name: 'vendorId',
              unique: true,
              foreignKeyConstraint: true
          }})
        UserLogin.belongsTo(models.Customer, {
          foreignKey: {
              name: 'customerId',
              unique: true,
              foreignKeyConstraint: true
          }})
      };

    UserLogin.beforeCreate(async (userLogin, options) => {
      const salt = await bcrypt.genSalt(10); //whatever number you want
      userLogin.password = await bcrypt.hash(userLogin.password, salt);
      return userLogin;      
    });  

    UserLogin.prototype.validPassword = async function(password) {
      return await bcrypt.compare(password, this.password);
    }

    UserLogin.prototype.isCustomer = function() {
      return !!this.customerId;
    }

    UserLogin.prototype.isVendor = function() {
      return !!this.vendorId;
    }

    return UserLogin
  }


  
// UserLogin --
// - email: text [not null, valid email]
// unique pincode
// - password: text [not null]
// - createdAt: timestamp
// - updatedAt: timestamp
// - unique: true
// *- vendor: belongs_to
// *- customer: belongs_to
// *- userSessions: has_many 

