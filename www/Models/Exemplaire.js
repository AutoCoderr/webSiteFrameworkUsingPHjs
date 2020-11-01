const app = require("./../autoloader");

const Model = app.Core.Model;

module.exports =
	class Exemplaire extends Model {

		static table = "Exemplaire";

		id = null;
		units = null;
		user = null;
		produit = null;

		UserId = null;
		ProduitId = null;

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
		async getUser() {
			if (this.user == null) {
				this.setUser(await app.Models.User.findById(this.UserId));
			}
			return this.user;
		}

		setProduit(produit) {
			this.produit = produit;
		}
		async getProduit() {
			if (this.produit == null) {
				this.setProduit(await app.Models.Produit.findById(this.ProduitId));
			}
			return this.produit;
		}

	};
