const app = require("./www/autoloader");

const View = app.Core.View;

module.exports = class __controller_name__ {

    PHJS;
    callback;

    constructor(PHJS,callback) {
        this.PHJS = PHJS;
        this.callback = callback;
    }

    indexAction() {
        let view = new View(this.PHJS, "__view_path__");
        view.assign("controller_name", "__controller_name__")
        view.render()
        this.callback();
    }

};
