const { Model } = require('sequelize');

const Manager = require("../Core/Manager").default;

module.exports = class ProduitManager extends Manager {
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