const { Model } = require('sequelize');

import Manager from "../Core/Manager";

export default class ExemplaireManager extends Manager {
	constructor(generateRelations = true) {
		class ExemplaireSequelize extends Model {
		}

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
