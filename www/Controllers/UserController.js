const app = require("./www/autoloader");

const Helpers = app.Core.Helpers,
	Validator = app.Core.Validator,
	Register = app.Forms.Register,
	UserService = app.Services.UserService;

module.exports = class UserController {

	PHJS;
	callback;

	constructor(PHJS,callback) {
		this.PHJS = PHJS;
		this.callback = callback;
	}

	addAction() {
		if (typeof(this.PHJS.session.errors) == "undefined") {
			this.PHJS.session.errors = {};
		}
		const form = Register();
		const validator = new Validator();
		this.PHJS.session.errors[form.config.actionName] = validator.checkForm(this.PHJS,form);
		if (this.PHJS.session.errors[form.config.actionName].length === 0) {
			let userService = new UserService();
			const datas = Helpers.getData(form.config.method,this.PHJS.args);

			let added = userService.addUser(datas);
			if (!added) {
				this.PHJS.session.errors[form.config.actionName] = [form.config.msgError];
			} else {
				added.then(this.loginAndRedirect);
			}
		}
		if (this.PHJS.session.errors[form.config.actionName].length > 0) {
			if (typeof(this.PHJS.session.fields) == "undefined") {
				this.PHJS.session.fields = {};
			}
			this.PHJS.session.fields[form.config.actionName] = { ...Helpers.getData(form.config.method,this.PHJS.args)};

			this.PHJS.redirectTo(this.PHJS.referer);

			this.callback();
		}
	}

	logoutAction() {
		delete this.PHJS.session.id;
		delete this.PHJS.session.firstname;
		delete this.PHJS.session.lastname;
		delete this.PHJS.session.email;

		this.PHJS.redirectTo(Helpers.getPath("Front", "index"));
		this.callback();
	}

	loginAndRedirect = (user) => {
		this.PHJS.session.id = user.dataValues.id;
		this.PHJS.session.firstname = user.dataValues.firstname;
		this.PHJS.session.lastname = user.dataValues.lastname;
		this.PHJS.session.email = user.dataValues.email;
		this.PHJS.redirectTo(Helpers.getPath("Front", "index"));
		this.callback();
	}

};
