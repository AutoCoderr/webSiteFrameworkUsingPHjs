const { Model } = require('sequelize');

import Manager from "../Core/Manager";

export default class ProduitManager extends Manager {
	constructor(generateRelations = true) {
		class ProduitSequelize extends Model {
		}

		Manager.generateSequelizeManager("produit", ProduitSequelize, generateRelations);

		super(ProduitSequelize);
	}

	findById(id) {
		return this.findOne({id: id}, {include: Manager.getTable("exemplaire")});
	}
}
