const { Model } = require('sequelize')

const Helpers = require("../Core/Helpers").default;
const Manager = require("../Core/Manager").default;

module.exports = class UserManager extends Manager {
	constructor(generateRelations = true) {
		class UserSequelize extends Model {
		}

		Manager.generateSequelizeManager("user", UserSequelize, generateRelations);

		super(UserSequelize);
	}

	findById(id) {
		return this.findOne({id: id}, {include: Manager.getTable("exemplaire")});
	}

	createUser(firstname,lastname,email,password,permission = null) {
		let config = {
			firstname: firstname,
			lastname: lastname,
			email: email,
			password: Helpers.hashPassword(password),
		};
		if (permission != null)  {
			// @ts-ignore
			config.permission = permission;
		}
		return this.ModelSequelize.create(config);
	}

	loginUser(email,password) {
		return this.findOne({
			email: email,
			password: Helpers.hashPassword(password)
		});
	}
};