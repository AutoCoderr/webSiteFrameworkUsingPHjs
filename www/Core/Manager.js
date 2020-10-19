module.exports =
class Manager {

	ModelSequelize;

	constructor(ModelSequelize) {
		this.ModelSequelize = ModelSequelize;
	}

	findById(id) {
		return this.findOne({id: id});
	}

	findOne(where) {
		return this.ModelSequelize.findOne({
			where: where
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
			await entity.save();
		} else {
			let config = {};
			for (let key in model) {
				if (key !== "populate" && key !== "table" && key !== "id") {
					config[key] = model[key];
				}
			}
			await this.ModelSequelize.create(config);
		}
	}
};
