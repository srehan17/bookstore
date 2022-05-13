module.exports = function(sequelize, DataTypes) {
    
    var UserSession = sequelize.define('UserSession',  {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      authtoken: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'authtoken is null'
          },
          notEmpty: {
            msg: 'authtoken is empty'
          }

        }
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'password is null'
          },
          notEmpty: {
            msg: 'password is empty'
          }
        }
      },
      expiresAt: {
        type: DataTypes.DATE      
      }
    },  
    {
          tableName: 'UserSessions',
          timestamps: true,
          schema: 'public'
      })

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

//   UserSession: --
//   - id: autogen
//   - authToken: text [unique, not null]
//   - expiresAt: timestamp
//   - createdAt: timestamp
//   - updatedAt: timestamp
  
  