import Manager from "../Core/Manager";
import rfs from "require-from-string";
import fs from "fs-extra";

export default class ExemplaireManager extends Manager {
	constructor(generateRelations = true) {
		const ExemplaireSequelize = rfs(fs.readFileSync(__dirname+"/getModelSequelize.js", "UTF-8"));

		Manager.generateSequelizeManager("exemplaire", ExemplaireSequelize, generateRelations);

		super(ExemplaireSequelize);
	}

	findAll() {
		return this.ModelSequelize.findAll({ include: [Manager.getTable("user"), Manager.getTable("produit")]});
	}

	findById(id) {
		return this.findOne({id: id}, { include: [Manager.getTable("user"), Manager.getTable("produit")] });
	}
}
