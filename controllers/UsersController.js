const models = require("../models");
const userUtils = require("../utils/UserUtils")

module.exports.index = async (req, res) =>{
    let users = await userUtils.getUsers()
    return res.status(200).send(users)
}