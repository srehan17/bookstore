module.exports = function (sequelize, DataTypes) {
    var Admin = sequelize.define(
      "Admin",
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
              msg: "admin name null",
            },
            notEmpty: {
              msg: "admin name empty",
            },
            len: {
              args: [1, 255],
              msg: "Admin name should be less than 255",
            },
          },
        },
      },
      {
        tableName: "Admins",
        timestamps: true,
        schema: "public",
      }
    );
  
    Admin.associate = function (models) {
      Admin.hasOne(models.User, {
        foreignKey: {
          name: "adminId",
          unique: true,
          foreignKeyConstraint: true,
        },
      })
    };
  
    return Admin;
  };
  
  