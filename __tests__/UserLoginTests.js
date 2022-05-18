const models = require("../models");


beforeAll(async () => {
    await models.sequelize.sync({force: true});
});


test('userlogin successfully created', async () => {    

    let user = models.User.build({email: "teh@tam.co", password: "abcd1234"})
    try{
        await user.validate()
    }catch(err){
        console.log("userlogin not created")
    }
})


test('userlogin email cannot be null', async () => {    

    let user = models.User.build({})
    try{
        await user.validate()
    }catch(err){
        expect(err.message).toContain("email is null")
    }
})


test('userlogin email should be valid email', async () => {    

    let user = models.User.build({email: "sksaj"})
    try{
        await user.validate()
    }catch(err){
        expect(err.message).toContain("email should be valid")
    }
})



afterAll(async () => {
    await models.sequelize.close();
});
