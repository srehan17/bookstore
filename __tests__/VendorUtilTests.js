const models = require("../models");
const vendorUtils = require("../utils/VendorUtils");

beforeAll(async () => {await models.sequelize.sync({force: true});
});


// test for vendor // expect vendorTom to be defined // expect added vendor name to be correct // user login to match user login table
test('vendor is created', async () => {    
    let vendorTom = await vendorUtils.createVendor(
        {
            name: "Tom", 
            email: "tom@gmail.com", 
            password: "secure123"
        }
    )    
    expect(vendorTom).toBeDefined();

    let loadedVendor = await models.Vendor.findByPk(vendorTom.id);
    expect(loadedVendor.name).toBe("Tom");
    
    let loadedVendorUser = await models.User.findOne({where: {email: "tom@gmail.com"}});
    expect(loadedVendorUser).toBeDefined();
    expect(loadedVendorUser.vendorId).toBe(loadedVendor.id);

});

afterAll(async () => {
    await models.sequelize.close();
});