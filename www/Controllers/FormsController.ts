import View from "../Core/View";

module.exports = class FormsController {

	PHJS;
	callback;

	constructor(PHJS, callback) {
		this.PHJS = PHJS;
		this.callback = callback;
	}

	registerAction() {
		let view = new View(this.PHJS, "register");
		view.render();
		this.callback();
	}

	loginAction() {
		let view = new View(this.PHJS, "login");
		view.render();
		this.callback();
	}

};
