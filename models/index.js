'use strict';
const fs = require("fs")
const path = require("path")
const Sequelize = require("sequelize");
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || "development"
const {envConfigs} = require("../config/config")
const config = envConfigs[env]
const db = {}

// const sequelize =  new Sequelize(
//   "bookstore",
//   "postgres",
//   "postgres",
//   {
//     host: "localhost",
//     dialect: "postgres",
//     pool: {
//       max: 5,
//       min: 0,
//       idle: 10000
//     }      
//   }
// );

const sequelize =  new Sequelize(
  config.database,
  config.username,
  config.password,
  config.connection
);


const files = []
const sortDir = (maniDir) => {
  const folders = []
  const CheckFile = (filePath) => fs.statSync(filePath).isFile()
  const sortPath = (dir) => {
    fs.readdirSync(dir)
      .filter((file) => file.indexOf(".") !== 0 && file !== "index.js")
      .forEach((res) => {
        const filePath = path.join(dir, res)
        if (CheckFile(filePath)) {
          files.push(filePath)
        } else {
          folders.push(filePath)
        }
      })
  }
  folders.push(maniDir)
  let i = 0
  do {
    sortPath(folders[i])
    i += 1
  } while (i < folders.length)
}
sortDir(__dirname)

files.forEach((file) => {
  const model = require(file)(sequelize, Sequelize.DataTypes)
  db[model.name] = model
})

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db