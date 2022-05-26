const models = require("../models");

/**
 * Creates a user
 * @param {text}  - email  
 * @param {text}  - password  
 * @returns created user 
 * @throws {Error}
 */
module.exports.createUser = async (params) => {
    let user = models.User.build({email: params.email, password: params.password});
    await user.save()

    return user    
}


/**
 * Get all users
 * @returns list of users
 * @throws {Error}
 */
module.exports.getUsers = async () => {
    let users = await models.User.findAll();
    return users
}