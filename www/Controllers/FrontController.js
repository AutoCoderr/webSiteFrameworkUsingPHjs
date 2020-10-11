const app = require("./www/autoloader");

module.exports = class TestController {

	PHJS;
	callback;

	constructor(PHJS, callback) {
		this.PHJS = PHJS;
		this.callback = callback;
	}


	indexAction() {
		let view = new app.Core.View(this.PHJS, "accueil");

		view.assign("currentPath", this.PHJS.cd);
		view.render();
		this.callback();
	}
};
