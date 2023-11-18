module.exports = {
    database: {
        HOST: "localhost",
        USER: "root",
        PASSWORD: " ",
        DB: "db_impresioname",
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
}