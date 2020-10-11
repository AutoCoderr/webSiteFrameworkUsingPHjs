const app = require("./www/autoloader");

module.exports = class TestController {

	PHJS;

	constructor(PHJS) {
		this.PHJS = PHJS;
	}


	indexAction() {
		let view = new app.Core.View(this.PHJS, "accueil");

		/*let user = app.Models.User.create({
			firstname: "Julien",
			lastname: "BOUVET",
			email: "ntm@truc.com",
			password: app.Core.Helpers.hashString("abcd")
		});*/

		view.assign("currentPath", this.PHJS.cd);
		view.assign("hashedCurrentPath", app.Core.Helpers.hashString(this.PHJS.cd));
		view.render();
	}
};
