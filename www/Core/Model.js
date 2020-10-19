const app = require("./../autoloader");

const Manager = app.Core.Manager;

module.exports =
class Model {

    populate = (entity,callback = null) => {
        if (entity == null) {
            if (callback != null) callback(null);
            return null;
        }

        for (let key in entity.dataValues) {
            if (typeof(this[key]) != "undefined" ) {
                this[key] = entity.dataValues[key];
            }
        }
        if (callback != null) callback(this);
    }

    findById(id,callback) {
        let manager = new app.Managers[this.table+"Manager"]();
        manager.findById(id).then((user) => {
            this.populate(user,callback);
        });
    }

}