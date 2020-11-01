const app = require("./../autoloader");
const { Model } = require('sequelize');

const Manager = app.Core.Manager;

class ExemplaireManager extends app.Core.Manager {
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

module.exports = ExemplaireManager;
