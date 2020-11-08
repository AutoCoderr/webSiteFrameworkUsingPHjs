
const env = require("../env");
import Helpers from "./Helpers";
import DB from "./DB";

export default class Manager {

	ModelSequelize;

	static getTable(name,generateRelation = true) {
		const AManager = require("../Managers/"+Helpers.ucFirst(name)+"Manager").default;
		return (new AManager(generateRelation)).ModelSequelize;
	}

	static generateSequelizeManager(table,manager, generateRelation) {
		let db = new DB();
		let migration = { ...db.migrations[table] };

		let relations = {"belongsTo": [], "hasMany": []};

		if (generateRelation) {
			for (let relation in relations) {
				relations[relation] = []
				if (typeof (migration[relation]) != "undefined") {
					relations[relation] = migration[relation] instanceof Array ? migration[relation] : [migration[relation]];
					delete migration[relation];
				}
			}
		}

		manager.init(migration, {
			sequelize: db.sequelize,
			modelName: env.DB_PREFIX+table
		});
		if (generateRelation) {
			for (let relation in relations) {
				for (let toRelate of relations[relation]) {
					manager[relation](Manager.getTable(toRelate, false));
				}
			}
		}
	}

	constructor(ModelSequelize) {
		this.ModelSequelize = ModelSequelize;
	}

	findAll(args) {
		return this.ModelSequelize.findAll(args);
	}

	findById(id) {
		return this.findOne({id: id});
	}

	findOne(where,args = {}) {
		return this.ModelSequelize.findOne({
			where: where, ...args
		});
	}

	async save(model) {
		if (model.getId() != null) {
			let entity = await this.findById(model.getId());
			for (let key in model) {
				if (key !== "populate" && key !== "table" && key !== "id") {
					entity[key] = model[key];
				}
			}
			return entity.save();
		} else {
			let config = {};
			for (let key in model) {
				if (key !== "populate" && key !== "table" && key !== "id") {
					config[key] = model[key];
				}
			}
			return this.ModelSequelize.create(config);
		}
	}
}
