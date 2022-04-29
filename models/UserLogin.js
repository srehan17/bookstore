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
            msg: 'Please enter email'
          },
          isEmail: {
            msg: 'Please enter valid email'
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
          }
      })
        UserLogin.belongsTo(models.Vendor, {
          foreignKey: {
              name: 'vendorId',
              unique: true
              //TODO: Why no foreign key constraint ?
          }})
        UserLogin.belongsTo(models.Customer, {
          foreignKey: {
              name: 'customerId',
              unique: true,
              foreignKeyConstraint: true
          }})
      };

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

