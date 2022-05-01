const envConfigs = {
    development: {
        database: "bookstore",
        username: "postgres",
        password: "postgres",
        connection: {
            host: "localhost",
            dialect: "postgres",
            pool: {
              max: 5,
              min: 0,
              idle: 10000
            }      
        }
    },
    test: {
        database: "bookstore_test",
        username: "postgres",
        password: "postgres",
        connection: {
            host: "localhost",
            dialect: "postgres",
            pool: {
              max: 5,
              min: 0,
              idle: 10000
            }      
        }
    }

}

module.exports  = {
    envConfigs
}

