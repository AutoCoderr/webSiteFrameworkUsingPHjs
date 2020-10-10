const app = require("./frameworkDev/autoloader");

module.exports = class FormsController {

	PHJS;

	constructor(PHJS) {
		this.PHJS = PHJS;
	}

	registerAction() {
		let view = new app.Core.View(this.PHJS, "register");
		view.render();
	}

};
