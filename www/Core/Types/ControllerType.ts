import View from "../Core/View";

export default class __controller_name__ {

    PHJS;

    constructor(PHJS) {
        this.PHJS = PHJS;
    }

    indexAction() {
        let view = new View(this.PHJS, "__view_path__");
        view.assign("controller_name", "__controller_name__");
        view.render();
    }

};
