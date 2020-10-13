const app = require("./../autoloader");
const { Sequelize, DataTypes, Model } = require('sequelize');
const env = require("./../env");

const db = new app.Core.DB();

class User extends Model {

}

User.init(db.migrations.user, {
	sequelize: db.sequelize,
	modelName: env.DB_PREFIX+"user"
});

module.exports = User;
