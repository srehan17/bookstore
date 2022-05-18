const models = require("../models");


beforeAll(async () => {
    await models.sequelize.sync({force: true});
});


test('userlogin successfully created', async () => {    

    let userLogin = models.UserLogin.build({email: "teh@tam.co", password: "abcd1234"})
    try{
        await userLogin.validate()
    }catch(err){
        console.log("userlogin not created")
    }
})


test('userlogin email cannot be null', async () => {    

    let userLogin = models.UserLogin.build({})
    try{
        await userLogin.validate()
    }catch(err){
        expect(err.message).toContain("email is null")
    }
})


test('userlogin email should be valid email', async () => {    

    let userLogin = models.UserLogin.build({email: "sksaj"})
    try{
        await userLogin.validate()
    }catch(err){
        expect(err.message).toContain("email should be valid")
    }
})



afterAll(async () => {
    await models.sequelize.close();
});
