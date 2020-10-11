const app = require("./www/autoloader");

module.exports = class UserController {

	PHJS;

	constructor(PHJS) {
		this.PHJS = PHJS;
	}

	addAction() {
		if (typeof(this.PHJS.session.errors) == "undefined") {
			this.PHJS.session.errors = {};
		}
		const form = app.Forms.Register();
		const validator = new app.Core.Validator();
		this.PHJS.session.errors[form.config.actionName] = validator.checkForm(this.PHJS,form);
		if (this.PHJS.session.errors[form.config.actionName].length === 0) {
			this.PHJS.echo("C'est OK");
		} else {
			this.PHJS.redirectTo(this.PHJS.referer);
		}
	}

};
