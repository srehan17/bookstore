const {BookCategory} = require('../enums/BookCategory');
module.exports = function(sequelize, DataTypes) {

  var Book = sequelize.define('Book',  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter title'
        },
        len: {
          args: [1,255],
          msg: 'Title should be between 1 and 255 characters'
        }
      }
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter isbn'
        },
      }
    },
    author: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter author'
          },
          len: {
            args: [1,255],
            msg: 'Author name can be between 1 and 255 characters'
          }
        }
    },
    category:{
        type: DataTypes.ENUM, 
        values: Object.values(BookCategory), // [one of (fiction | humor | politics | science | tech)] 
        // ENUM values can be accessed from the values property:  console.log(Book.getAttributes().category.values);
        defaultValue: BookCategory.FICTION
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        min: 0,
        max: 10000,
        validate: {
          notNull: {
            msg: 'Please enter price'
          }
        }
    },
    sold: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },  {
		tableName: 'Books',
		timestamps: true,
		schema: 'public'
	})

  Book.associate = function(models) {
		Book.belongsTo(models.Vendor, {
			foreignKey: {
        name: 'vendorId',
				allowNull: false,
        foreignKeyConstraint: true
      }
		}),
    Book.belongsTo(models.Order, {
      foreignKey: {
        name: 'orderId',
        foreignKeyConstraint: true
      }
    });
	};

  // Book.prototype.vendorName = async function() {
  //   console.log("\n**************************************\n")
  //   console.log("Book Id: " + this.id)
  //   console.log("Book Title: " + this.title);  
  //   let vendorName = (await this.getVendor()).name;
  //   console.log("Vendor: " + vendorName)
  //   console.log("\n**************************************\n")
  // };
  
  return Book
}


// Book --
// - id: autogen -
// - title: text [not null, max length: 255] -
// - author: text [not null, max length: 255] - 
// - category: text [one of (fiction | humor | politics | science | tech)]
// - price: decimal [not null, min: 0, max: 10000]
// - sold: boolean [not null, default: false]
// - createdAt: timestamp
// - updatedAt: timestamp
// *- vendor: belongs_to [not null]
// *- order: belongsToMany

