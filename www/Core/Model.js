const app = require("./../autoloader");

module.exports =
class Model {

    populate = (entity) => {
        if (entity == null) {
            return null;
        }

        for (let key in entity.dataValues) {
            if (typeof(this[key]) != "undefined" ) {
                this[key] = entity.dataValues[key];
            }
        }
        return this;
    }

    static async findAll() {
        let manager = new app.Managers[this.table+"Manager"]();
        let entities = await manager.findAll();
        let models = [];
        for (let i=0;i<entities.length;i++) {
            models.push((new app.Models[this.table]).populate(entities[i]))
        }
        return models;
    }

    static async findById(id) {
        let manager = new app.Managers[this.table+"Manager"]();
        let entity = await manager.findById(id);
        return (new app.Models[this.table]).populate(entity);
    }

}