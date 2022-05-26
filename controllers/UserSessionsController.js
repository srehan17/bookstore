const models = require("../models");
const crypto = require('crypto');

module.exports.create = async (req, res) =>{
    const user = await models.User.findOne({
        where: {
            email: req.body.email
        }
    })
    
    if (!user || !(await user.validPassword(req.body.password))) { 
        return res.status(401).send({error: "Access Denied"}); 
    }        
    
    const userSession = await models.UserSession.create({
        userId: user.id,
        authToken: crypto.randomUUID()
    })
    return res.status(201).send({authToken: userSession.authToken})
}


    
module.exports.destroy = async (req, res) =>{
    // let authToken = req.headers.authorization
    // if (authToken){
    //     authToken = authToken.replace('Bearer ', '') // strip out bearer part
    // }
    // const userSession = await models.UserSession.findOne({
    //     where: {
    //         authToken: authToken
    //     }
    // })
    
    if (userSession) { 
        await userSession.destroy()
    }        
    
    return res.status(204).send()
}

    
