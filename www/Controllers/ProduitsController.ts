import View from "../Core/View";

module.exports = class ProduitsController {

    PHJS;
    callback;

    constructor(PHJS,callback) {
        this.PHJS = PHJS;
        this.callback = callback;
    }

    indexAction() {
        let view = new View(this.PHJS, "produits/index");
        view.assign("controller_name", "ProduitsController")
        view.render()
        this.callback();
    }

};
