const app = require("./www/autoloader");

const Helpers = app.Core.Helpers,
	Validator = app.Core.Validator,
	Register = app.Forms.Register,
	Login = app.Forms.Login,
	User = app.Models.User;

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
		const datas = Helpers.getData(form.config.method,this.PHJS.args);
		validator.checkForm(this.PHJS,form, (errors) => {
			this.PHJS.session.errors[form.config.actionName] = errors;
			if (this.PHJS.session.errors[form.config.actionName].length === 0) {
				User.create({
					firstname: datas.firstname,
					lastname: datas.lastname,
					email: datas.email,
					password: Helpers.hashPassword(datas.password)
				}).then(this.loginAndRedirect);
				return;
			}
			if (this.PHJS.session.errors[form.config.actionName].length > 0) {
				this.getErrorAndRedirect(form,datas);
			}
		});

	}

	logoutAction() {
		delete this.PHJS.session.id;
		delete this.PHJS.session.firstname;
		delete this.PHJS.session.lastname;
		delete this.PHJS.session.email;

		this.PHJS.redirectTo(Helpers.getPath("Front", "index"));
		this.callback();
	}

	connectAction() {

		let datas = Helpers.getData("POST",this.PHJS.args);
		User.findOne({
			where: {
				email: datas.email,
				password: Helpers.hashPassword(datas.password)
			}
		}).then((user) => {
			if (!user) {
				if (typeof(this.PHJS.session.errors) == "undefined") {
					this.PHJS.session.errors = {};
				}
				this.PHJS.session.errors[Login().config.actionName] = [Login().config.msgError];
				this.getErrorAndRedirect(Login(),datas)
			} else {
				this.loginAndRedirect(user);
			}
		});
	}





	getErrorAndRedirect(form,datas) {
		if (typeof(this.PHJS.session.fields) == "undefined") {
			this.PHJS.session.fields = {};
		}

		this.PHJS.session.fields[form.config.actionName] = {...datas};

		this.PHJS.redirectTo(this.PHJS.referer);
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
