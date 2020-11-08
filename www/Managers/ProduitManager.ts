import Manager from "../Core/Manager";
import rfs from "require-from-string";
import fs from "fs-extra";

export default class ProduitManager extends Manager {
	constructor(generateRelations = true) {
		const ProduitSequelize = rfs(fs.readFileSync(__dirname+"/getModelSequelize.js", "UTF-8"));

		Manager.generateSequelizeManager("produit", ProduitSequelize, generateRelations);

		super(ProduitSequelize);
	}

	findById(id) {
		return this.findOne({id: id}, {include: Manager.getTable("exemplaire")});
	}
}