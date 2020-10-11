const app = require("./www/autoloader");

module.exports = class FormsController {

	PHJS;
	callback;

	constructor(PHJS, callback) {
		this.PHJS = PHJS;
		this.callback = callback;
	}

	registerAction() {
		let view = new app.Core.View(this.PHJS, "register");
		view.render();
		this.callback();
	}

};
