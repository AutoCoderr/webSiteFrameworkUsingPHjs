const app = require("./../autoloader");
const env = require("./../env");
const { Model } = require('sequelize');

const db = new app.Core.DB();

class ProduitSequelize extends Model {
}

ProduitSequelize.init(db.migrations.produit, {
	sequelize: db.sequelize,
	modelName: env.DB_PREFIX+"produit"
});

class ProduitManager extends app.Core.Manager {
	constructor() {
		super(ProduitSequelize);
	}
}

module.exports = ProduitManager;
