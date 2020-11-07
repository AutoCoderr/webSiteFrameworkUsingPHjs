const { Model } = require('sequelize');

const Manager = require("../Core/Manager").default;

module.exports = class ExemplaireManager extends Manager {
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
};
