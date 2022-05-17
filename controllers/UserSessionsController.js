const models = require("../models");

module.exports.create = async (req, res) =>{
    const userLogin = await models.UserLogin.findOne({
        where: {
            email: req.body.email
        }
    })
    
    if (!userLogin || !userLogin.validPassword(req.body.password)) { 
        return res.status(401).send({error: "Access Denied"}); 
    }        
    
    const userSession = await models.UserSession.create({
        userLoginId: userLogin.id,
        authToken:`to_${Math.random()}`
    })
    return res.status(201).send({authToken: userSession.authToken})
}

    
module.exports.destroy = async (req, res) =>{
    let authToken = req.headers.authorization
    if (authToken){
        authToken = authToken.replace('Bearer ', '') // strip out bearer part
    }
    const userSession = await models.UserSession.findOne({
        where: {
            authToken: authToken
        }
    })
    
    if (userSession) { 
        await userSession.destroy()
    }        
    
    return res.status(204).send()
}

    
