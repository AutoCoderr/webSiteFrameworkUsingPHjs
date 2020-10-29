const app = require("./www/autoloader");

const User = app.Models.User,
	Produit = app.Models.Produit,
	Exemplaire = app.Models.Exemplaire,
	UserManager = app.Managers.UserManager,
	ProduitManager = app.Managers.ProduitManager,
	ExemplaireManager = app.Managers.ExemplaireManager,
	Manager = app.Core.Manager;

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

		/*for (let i=0;i<5;i++) {
			let produit = new Produit();
			produit.setName("Machin "+(i+1));
			produit.setDescription("Il s'agit d'un machin");
			produit.setUnits(12);
			(new ProduitManager()).save(produit);
		}*/

		/*(new ExemplaireManager()).findAll().then(res => {
			console.log(res);
		});*/

		let exemplaires = await Exemplaire.findAll();

		this.PHJS.print_r(exemplaires);


		view.assign("currentPath", this.PHJS.cd);
		view.render();
		this.callback();
	}
};
