const env = require("./../env");

import Helpers from "./Helpers";

export default class Model {

    static table: string = "";

    populate = (entity) => {
        if (entity == null) {
            return null;
        }
        const Models = Helpers.getModels();

        for (let key in entity.dataValues) {
            const prefixTests = [env.DB_PREFIX, Helpers.replaceAll(env.DB_PREFIX,"_",""), Helpers.replaceAll(env.DB_PREFIX,"-","")];
            for (let prefix of prefixTests) {
                if (key !== key.replace(prefix, "")) {
                    key = key.replace(prefix, "");
                    entity.dataValues[key] = entity.dataValues[prefix + key];
                    delete entity.dataValues[prefix + key];
                }
            }

            if (typeof(this[key]) != "undefined" ) {
                if (typeof(entity.dataValues[key]) == "object") {

                    let areMany = false;
                    if (entity.dataValues[key] instanceof Array) {
                        areMany = true;
                    }

                    let modelExists = typeof(Models[Helpers.ucFirst(key.substring(0,areMany ? key.length-1 : key.length))]) != "undefined";

                    if (areMany) {
                        this[key] = [];
                        for (let element of entity.dataValues[key]) {
                            if (modelExists) {
                                this[key].push(
                                    (new Models[Helpers.ucFirst(key.substring(0,key.length-1))]()).populate(element)
                                );
                            } else {
                                this[key].push(element.dataValues);
                            }
                        }
                    } else {
                        if (modelExists) {
                            this[key] = (new Models[Helpers.ucFirst(key)]()).populate(entity.dataValues[key]);
                        } else {
                            this[key] = entity.dataValues[key].dataValues;
                        }
                    }
                } else {
                    this[key] = entity.dataValues[key];
                }
            }
        }
        return this;
    };

    static async findAll() {
        const Managers = Helpers.getManagers();
        let manager = new Managers[this.table+"Manager"]();
        let entities = await manager.findAll();

        const Models = Helpers.getModels();
        let models: Array<any> = [];

        for (let i=0;i<entities.length;i++) {
            models.push((new Models[this.table]).populate(entities[i]))
        }
        return models;
    }

    static async findById(id) {
        const Managers = Helpers.getManagers();
        let manager = new Managers[this.table+"Manager"]();
        let entity = await manager.findById(id);

        const Models = Helpers.getModels();
        return (new Models[this.table]).populate(entity);
    }

}
