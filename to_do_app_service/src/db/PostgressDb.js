const { Sequelize } = require("sequelize");

const dbConnect = () => {
    const sequelize = new Sequelize(
        'appintegro', //DbName
        'soportedb',  //User
        'P0stInt3gro2@23', //Password 
        {
            host: 'portalintegro.postgres.database.azure.com', //host
            dialect: 'postgres', 
            logging: false,
            options: {
                encrypt: true,
                database: 'appintegro'
            },
            define: {
                schema: 'todo'
            },
            dialectOptions: {
                ssl: {
                    require: true
                }
            }
        });
    
    const db = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    return db;
}

module.exports = {
    dbConnect
}