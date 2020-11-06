import Model from "../Core/Model";
import Exemplaire from "./Exemplaire";

export default class Produit extends Model {

    static table = "Produit";

    id: number = 0;
    name: string = "";
    description: string = "";
    units: number = 0;
    exemplaires: Array<typeof Exemplaire> = [];


    setId(id: number) {
        this.id = id;
    }
    getId() {
        return this.id;
    }

    setName(name: string) {
        this.name = name.trim();
    }
    getName() {
        return this.name;
    }

    setDescription(description: string) {
        this.description = description.trim();
    }
    getDescription() {
        return this.description;
    }

    setUnits(units: number) {
        this.units = units;
    }
    getUnits() {
        return this.units;
    }

    getExemplaires() {
        return this.exemplaires;
    }

}
