const app = require("./../autoloader");

const Model = app.Core.Model;

module.exports =
	class Exemplaire extends Model {

		static table = "Exemplaire";

		id = null;
		units = null;
		user = null;
		produit = null;

		setId(id) {
			this.id = id;
		}
		getId() {
			return this.id;
		}

		setUnits(units) {
			this.units = units;
		}
		getUnits() {
			return this.units;
		}

		setUser(user) {
			this.user = user;
		}
		getUser() {
			return this.user;
		}

		setProduit(produit) {
			this.produit = produit;
		}
		getProduit() {
			return this.produit;
		}

	};
