const Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
    
    var UserSession = sequelize.define('UserSession',  {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      authToken: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'authToken is null'
          },
          notEmpty: {
            msg: 'authtoken is empty'
          }
        }
      }           
    },  
    {
        tableName: 'UserSessions',
        timestamps: true,
        schema: 'public'
    }
  )

    UserSession.associate = function(models) {
      UserSession.belongsTo(models.UserLogin, {
        foreignKey: {
            name: 'userLoginId',
            allowNull: false,
            foreignKeyConstraint: true
        }
      })
    };

    return UserSession;
  }
