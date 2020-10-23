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


	async indexAction() {
		let view = new app.Core.View(this.PHJS, "accueil");


		// Examples of using managers and models to modify or create elements in database

		/*let user = await User.findById(1);
		if (user != null) {
			user.setFirstname("  Banana    ");
			(new UserManager()).save(user);
		} else {
			console.log("doesn't exist");
		}*/
		/*for (let i=0;i<5;i++) {
			let user = new User();
			user.setFirstname("Toto "+(i+1));
			user.setLastname("du 78");
			user.setEmail("test"+(i+1)+"@test.com");
			user.setPassword("1234");
			user.setPermission("user");
			(new UserManager()).save(user);
		}*/
		/*let users = await User.findAll();
		this.PHJS.print_r(users);*/

		view.assign("currentPath", this.PHJS.cd);
		view.render();
		this.callback();
	}
};
