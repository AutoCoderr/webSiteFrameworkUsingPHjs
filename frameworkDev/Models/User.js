const app = require("./../autoloader");
const { Sequelize, DataTypes, Model } = require('sequelize');
const env = require("./../env");

const migrations = new app.Core.DB.Migrations();

class User extends Model {

}

User.init(migrations.migrations.user, {
	sequelize: migrations.sequelize,
	modelName: env.DB_PREFIX+"user"
});

module.exports = User;
