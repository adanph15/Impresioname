module.exports = {
    database: {
        HOST: "localhost",
        USER: "root",
        PASSWORD: "20591314",
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

// module.exports = {
//     database: {
//         HOST: process.env.DB_HOST,
//         USER: process.env.DB_USER,
//         PASSWORD: process.env.DB_PASSWORD,
//         DB: process.env.DB_NAME,
//         dialect: "mysql",
//         pool: {
//             max: 5,
//             min: 0,
//             acquire: 30000,
//             idle: 10000
//         }
//     }
// }