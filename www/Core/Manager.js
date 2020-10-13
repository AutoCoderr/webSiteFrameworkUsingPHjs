
module.exports =
class Model {

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
};
