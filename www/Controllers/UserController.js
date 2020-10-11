const app = require("./www/autoloader");

const Helpers = app.Core.Helpers,
	Validator = app.Core.Validator,
	Register = app.Forms.Register;

module.exports = class UserController {

	PHJS;

	constructor(PHJS) {
		this.PHJS = PHJS;
	}

	addAction() {
		if (typeof(this.PHJS.session.errors) == "undefined") {
			this.PHJS.session.errors = {};
		}
		const form = Register();
		const validator = new Validator();
		this.PHJS.session.errors[form.config.actionName] = validator.checkForm(this.PHJS,form);
		if (this.PHJS.session.errors[form.config.actionName].length === 0) {

		} else {
			if (typeof(this.PHJS.session.fields) == "undefined") {
				this.PHJS.session.fields = {};
			}
			this.PHJS.session.fields[form.config.actionName] = { ...Helpers.getData(form.config.method,this.PHJS.args)};

			this.PHJS.redirectTo(this.PHJS.referer);
		}
	}

};
