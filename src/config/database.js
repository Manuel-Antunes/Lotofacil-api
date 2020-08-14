require('dotenv/config');

module.exports = {
    dialect: 'mysql',
    host: 'fechamentofacil',
    username: 'fechamentofacil',
    password: 'Manager01',
    database: 'lotofacil',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};