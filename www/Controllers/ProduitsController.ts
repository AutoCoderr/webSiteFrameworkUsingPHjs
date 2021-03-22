import View from "../Core/View";

export default class ProduitsController {

    PHJS;

    constructor(PHJS) {
        this.PHJS = PHJS;
    }

    indexAction() {
        let view = new View(this.PHJS, "produits/index");
        view.assign("controller_name", "ProduitsController")
        view.render()
    }

};
