const models = require("../models");
const bookUtils = require("../utils/BookUtils");
const vendorUtils = require("../utils/VendorUtils");

beforeAll(async () => {
    await models.sequelize.sync({force: true});
});


test('book success test case', async () => {    
    let vendorTom = await vendorUtils.createVendor({name: "Tom", email: "tom@gmail.com", password: "secure123"})

    let book = models.Book.build({
        title: "Title",
        author: "Author",
        isbn: "29392",
        price: 27,
        vendorId: vendorTom.id
    })
    try{
        await book.validate()
    }catch(err){
        console.log("book not created");
    }
})


test('book title cannot be null', async () => {    

    let book = models.Book.build({})
    try{
        await book.validate()
    }catch(err){
        expect(err.message).toContain("title null")
    }
})


test('book title cannot be empty', async () => {    

    let book = models.Book.build({title: ""})
    try{
        await book.validate()
    }catch(err){
        console.log(err.message)
        expect(err.message).toContain("title empty")
    }
})


test('book title length is shorter than 255', async () => {    

    let book = models.Book.build({title: "x".repeat(300)})
    try{
        await book.validate()
    }catch(err){
        console.log(err.message)
        expect(err.message).toContain("Title should be less than 255")
    }
})


test('book author cannot be null', async () => {    

    let book = models.Book.build({})
    try{
        await book.validate()
    }catch(err){
        expect(err.message).toContain("author name null")
    }
})


test('book author cannot be empty', async () => {    

    let book = models.Book.build({author: ""})
    try{
        await book.validate()
    }catch(err){
        console.log(err.message)
        expect(err.message).toContain("author name empty")
    }
})


test('book author length is shorter than 255', async () => {    

    let book = models.Book.build({author: "x".repeat(300)})
    try{
        await book.validate()
    }catch(err){
        console.log(err.message)
        expect(err.message).toContain("Author name should be less than 255")
    }
})


test('book isbn cannot be null', async () => {    

    let book = models.Book.build({})
    try{
        await book.validate()
    }catch(err){
        expect(err.message).toContain("isbn null")
    }
})

test('book isbn cannot be empty', async () => {    

    let book = models.Book.build({isbn: ""})
    try{
        await book.validate()
    }catch(err){
        expect(err.message).toContain("isbn empty")
    }
})


test('book price cannot be null', async () => {    

    let book = models.Book.build({})
    try{
        await book.validate()
    }catch(err){
        expect(err.message).toContain("price null")
    }
})

test('book price cannot be empty', async () => {    

    let book = models.Book.build({price: ""})
    try{
        await book.validate()
    }catch(err){
        expect(err.message).toContain("price empty")
    }
})


test('book price should be less than 10000', async () => {    

    let book = models.Book.build({price: 10001})
    try{
        await book.validate()
    }catch(err){
        console.log(err.message)
        expect(err.message).toContain("Price should be less than 10000")
    }
})


test('book vendorId cannot be null', async () => {    
    let book = models.Book.build({})
    try{
        await book.validate()
    }catch(err){
        console.log(err.message)
        expect(err.message).toContain("vendorId cannot be null")
    }
})

test('book vendorId cannot be empty', async () => {    
    let book = models.Book.build({vendorId: ""})
    try{
        await book.validate()
    }catch(err){
        console.log(err.message)
        expect(err.message).toContain("vendorId cannot be empty")
    }
})


afterAll(async () => {
    await models.sequelize.close();
});
