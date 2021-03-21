import Helpers from "../Core/Helpers";
import Validator from "../Core/Validator";
import Register from "../Forms/Register";
import Login from "../Forms/Login";
import User from "../Entities/User";
import UserRepository from "../Repositories/UserRepository";;

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
		validator.checkForm(this.PHJS,form, async (errors) => {
			this.PHJS.session.errors[form.config.actionName] = errors;
			if (this.PHJS.session.errors[form.config.actionName].length === 0) {
				let user = new User();
				user.setFirstname(datas.firstname);
				user.setLastname(datas.lastname);
				user.setEmail(datas.email);
				user.setPassword(datas.password);
				await user.save();
				this.loginAndRedirect(user);
			} else {
				this.getErrorAndRedirect(form,datas);
			}
		});

	}

	logoutAction() {
		delete this.PHJS.session.user;

		this.PHJS.redirectTo(Helpers.getPath("Front", "index"));
		this.callback();
	}

	async connectAction() {

		let datas = Helpers.getData("POST",this.PHJS.args);
		let user = await UserRepository.findOneByEmailAndPassword(datas.email, datas.password);

		if (user == null) {
			if (typeof(this.PHJS.session.errors) == "undefined") {
				this.PHJS.session.errors = {};
			}
			this.PHJS.session.errors[Login().config.actionName] = [Login().config.msgError];
			this.getErrorAndRedirect(Login(),datas)
		} else {
			this.loginAndRedirect(user);
		}
	}



	getErrorAndRedirect(form,datas) {
		if (typeof(this.PHJS.session.fields) == "undefined") {
			this.PHJS.session.fields = {};
		}

		this.PHJS.session.fields[form.config.actionName] = {...datas};

		this.PHJS.redirectTo(this.PHJS.referer);
		this.callback();
	}

	loginAndRedirect = (user: User) => {
		this.PHJS.session.user = user.serialize();
		this.PHJS.redirectTo(Helpers.getPath("Front", "index"));
		this.callback();
	}

};
