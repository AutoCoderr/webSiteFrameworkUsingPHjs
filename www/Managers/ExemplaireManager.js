const app = require("./../autoloader");
const env = require("./../env");
const { Model } = require('sequelize');

const db = new app.Core.DB(),
	Helpers = app.Core.Helpers;

class ExemplaireSequelize extends Model {
}

let exemplaireMigration = { ...db.migrations.exemplaire };
let belongsTo = exemplaireMigration.belongsTo;
delete exemplaireMigration.belongsTo;

ExemplaireSequelize.init(exemplaireMigration, {
	sequelize: db.sequelize,
	modelName: env.DB_PREFIX+"exemplaire"
});

for (let belong of belongsTo) {
	ExemplaireSequelize.belongsTo((new app.Managers[Helpers.ucFirst(belong)+"Manager"]()).ModelSequelize);
}

class ExemplaireManager extends app.Core.Manager {
	constructor() {
		super(ExemplaireSequelize);
	}
}

module.exports = ExemplaireManager;
