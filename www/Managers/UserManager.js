const app = require("./../autoloader");
const env = require("./../env");
const { Model } = require('sequelize');

const db = new app.Core.DB(),
	Helpers = app.Core.Helpers;

class UserSequelize extends Model {
}

UserSequelize.init(db.migrations.user, {
	sequelize: db.sequelize,
	modelName: env.DB_PREFIX+"user"
});

class UserManager extends app.Core.Manager {
	constructor() {
		super(UserSequelize);
	}

	createUser(firstname,lastname,email,password,permission = null) {
		let config = {
			firstname: firstname,
			lastname: lastname,
			email: email,
			password: Helpers.hashPassword(password)
		};
		if (permission != null)  {
			config.permission = permission;
		}
		return UserSequelize.create(config);
	}

	loginUser(email,password) {
		return this.findOne({
			email: email,
			password: Helpers.hashPassword(password)
		});
	}
}

module.exports = UserManager;
