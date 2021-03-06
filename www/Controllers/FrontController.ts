
import Produit from "../Models/Produit";
import User from "../Models/User";
import UserManager from "../Managers/UserManager";
import ProduitManager from "../Managers/ProduitManager";
import View from "../Core/View";

module.exports = class FrontController {

	PHJS;
	callback;

	constructor(PHJS, callback) {
		this.PHJS = PHJS;
		this.callback = callback;
	}


	async indexAction() {
		let view = new View(this.PHJS, "accueil");


		// Examples of using managers and models to modify or create elements in database

		/*let user = await User.findById(4);
		if (user != null) {
			user.setFirstname("  Banana    ");
			(new UserManager()).save(user);
			this.PHJS.echo("successfull<br/>");
		} else {
			this.PHJS.echo("doesn't exist<br/>");
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

		/*let produit = await Produit.findById(1);

		this.PHJS.print_r(produit);
		this.PHJS.echo("<br/>");
		let user = await produit.getExemplaires()[0].getUser();
		this.PHJS.print_r(await user.getExemplaires()[0].getProduit());*/

		view.assign("currentPath", this.PHJS.cd);
		view.render();
		this.callback();
	}
};
