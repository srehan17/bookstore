const models = require("../models");


beforeAll(async () => {
    await models.sequelize.sync({force: true});
});


// success test case ???????


test('userSession authtoken cannot be null', async () => {    

    let userSession = models.UserSession.build({})
    try{
        await userSession.validate()
    }catch(err){
        expect(err.message).toContain("authtoken is null")
    }
})


test('userSession authtoken cannot be empty', async () => {    

    let userSession = models.UserSession.build({authtoken: ""})
    try{
        await userSession.validate()
    }catch(err){
        console.log(err.message)
        expect(err.message).toContain("authtoken is empty")
    }
})


test('userSession password cannot be null', async () => {    

    let userSession = models.UserSession.build({})
    try{
        await userSession.validate()
    }catch(err){
        expect(err.message).toContain("password is null")
    }
})


test('userSession password cannot be empty', async () => {    

    let userSession = models.UserSession.build({password: ""})
    try{
        await userSession.validate()
    }catch(err){
        console.log(err.message)
        expect(err.message).toContain("password is empty")
    }
})



afterAll(async () => {
    await models.sequelize.close();
});
