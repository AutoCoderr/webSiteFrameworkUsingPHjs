const app = require("./../../autoloader");
const env = require("./../../env");
const Sequelize = require("sequelize");
const mysql = require("mysql2");

module.exports = class DB {

	path;
	sequelize;
	conn;

	constructor() {
		this.sequelize = new Sequelize(env.DB_DRIVER+"://"+env.DB_USER+":"+env.DB_PASSWORD+"@"+env.DB_HOST+":"+env.DB_PORT+"/"+env.DB_NAME, { operatorsAliases: false });
		this.conn = mysql.createConnection({
			host: env.DB_HOST,
			user: env.DB_USER,
			password: env.DB_PASSWORD,
			port: env.DB_PORT,
			database: env.DB_NAME
		});
	}
};
