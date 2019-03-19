var dbConfig = {
    user: "sa",
    password: "123",
    server: 'DESKTOP-ISUJFMM', 
    database: "testDatabase",

    "dialect": "mssql",
    port:15120,
    connectionTimeout:300000,
    requestTimeout:300000,

    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};
module.exports = dbConfig; 