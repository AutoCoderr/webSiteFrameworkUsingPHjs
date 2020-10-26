const app = require("./../autoloader");

const Model = app.Core.Model;

module.exports =
class Produit extends Model {

    static table = "Produit";

    id = null;
    name = null;
    description = null;
    units = null;

    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }

    setName(name) {
        this.name = name.trim();
    }
    getName() {
        return this.name;
    }

    setDescription(description) {
        this.description = description.trim();
    }
    getDescription() {
        return this.description;
    }

    setUnits(units) {
        this.units = units;
    }
    getUnits() {
        return this.units;
    }

};
