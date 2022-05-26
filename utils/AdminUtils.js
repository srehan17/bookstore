const models = require("../models");


/**
 * Creates an admin member
 * @param {string} name - name of admin to be created 
 * @returns created admin
 * @throws {Error}
 */
module.exports.createAdmin = async (params) => {
    let admin = models.Admin.build({name: params.name});
    await admin.save()

    await models.User.create({adminId: admin.id, email: params.email, password: params.password})

    return admin    
}


/**
 * Get admin
 * @returns admin
 * @throws {Error}
 */
 module.exports.getAdmin = async () => {
    let admin = models.Admin.findAll();

    return admin    
}