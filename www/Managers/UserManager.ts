import Manager from "../Core/Manager";
import Helpers from "../Core/Helpers";
import rfs from "require-from-string";
import fs from "fs-extra";

export default class UserManager extends Manager {
	constructor(generateRelations = true) {
		const UserSequelize = rfs(fs.readFileSync(__dirname+"/getModelSequelize.js", "UTF-8"));

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