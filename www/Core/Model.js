const app = require("./../autoloader");

const Manager = app.Core.Manager;

module.exports =
class Model {

    populate = (entity,callback = null) => {
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

    async findById(id,callback) {
        let manager = new app.Managers[this.table+"Manager"]();
        let user = await manager.findById(id);
        return this.populate(user,callback);
    }

}