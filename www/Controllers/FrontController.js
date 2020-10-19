const app = require("./www/autoloader");

const User = app.Models.User,
	UserManager = app.Managers.UserManager;

module.exports = class TestController {

	PHJS;
	callback;

	constructor(PHJS, callback) {
		this.PHJS = PHJS;
		this.callback = callback;
	}


	indexAction() {
		let view = new app.Core.View(this.PHJS, "accueil");

		(new User()).findById(12, (user) => {
			if (user != null) {
				console.log(user);
			} else {
				console.log("doesn't exist");
			}
		});

		view.assign("currentPath", this.PHJS.cd);
		view.render();
		this.callback();
	}
};
