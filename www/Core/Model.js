const app = require("./../autoloader"),
    env = require("./../env");

const Helpers = app.Core.Helpers;

module.exports =
class Model {

    populate = (entity) => {
        if (entity == null) {
            return null;
        }

        for (let key in entity.dataValues) {
            if (key !== key.replace(env.DB_PREFIX, "")) {
                key = key.replace(env.DB_PREFIX, "");
                entity.dataValues[key] = entity.dataValues[env.DB_PREFIX+key];
                delete entity.dataValues[env.DB_PREFIX+key];
            }
            if (typeof(this[key]) != "undefined" ) {
                if (typeof(entity.dataValues[key]) == "object") {
                    if (typeof(app.Models[Helpers.ucFirst(key)]) != "undefined") {
                        this[key] = (new app.Models[Helpers.ucFirst(key)]()).populate(entity.dataValues[key]);
                    } else {
                        this[key] = entity.dataValues[key].dataValues;
                    }
                } else {
                    this[key] = entity.dataValues[key];
                }
            }
        }
        return this;
    };

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
