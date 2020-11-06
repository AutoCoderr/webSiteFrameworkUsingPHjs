import { Produit } from "./Produit";
import { User } from "./User";
import Model from "../Core/Model";

export class Exemplaire extends Model {

		static table = "Exemplaire";

		id: number = 0;
		units: number = 0;
		user: typeof User = User;
		produit: typeof Produit = Produit;

		UserId: number = 0;
		ProduitId: number = 0;

		setId(id) {
			this.id = id;
		}
		getId() {
			return this.id;
		}

		setUnits(units: number) {
			this.units = units;
		}
		getUnits() {
			return this.units;
		}

		setUser(user: typeof User) {
			this.user = user;
		}
		async getUser() {
			if (this.user == null) {
				// @ts-ignore
				this.setUser(await User.findById(this.UserId));
			}
			return this.user;
		}

		setProduit(produit: typeof Produit) {
			this.produit = produit;
		}
		async getProduit() {
			if (this.produit == null) {
				// @ts-ignore
				this.setProduit(await Produit.findById(this.ProduitId));
			}
			return this.produit;
		}

	}
