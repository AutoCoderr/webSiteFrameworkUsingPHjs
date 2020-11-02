const app = require("./../autoloader");
const { Model } = require('sequelize');

const Manager = app.Core.Manager;

class ProduitManager extends app.Core.Manager {
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

module.exports = ProduitManager;
