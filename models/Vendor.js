module.exports = function(sequelize, DataTypes) {

    var Vendor = sequelize.define('Vendor',  {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'vendor name null'
          },
          notEmpty: {
            msg: 'vendor name empty'
          },
          len: {
            args: [1,255],
            msg: 'vendor name should be less than 255' 
          }
        }
      },
    },  {
      tableName: 'Vendor',
      timestamps: true,
      schema: 'public'
    })

    Vendor.associate = function(models) {
      Vendor.hasOne(models.UserLogin, {
        foreignKey: {
            name: 'vendorId',
            unique: true,
            foreignKeyConstraint: true
        }})
      Vendor.hasMany(models.Book, {
        foreignKey: {
            name: 'vendorId',
            allowNull: false,
            foreignKeyConstraint: true
        }
    });
    };

    return Vendor
  }

  
//   Vendor --
// - id: autogen
// - name: text [not null, max length: 255]
// - createdAt: timestamp
// - updatedAt: timestamp
// *- books: has_many
// *- userLogin: has_one

