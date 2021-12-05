const Sequelize = require('sequelize');

const dbStorage = process.env.dbStorage;

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: dbStorage,
});

module.exports = sequelize;
