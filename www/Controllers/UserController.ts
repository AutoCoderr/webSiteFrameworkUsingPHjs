import Helpers from "../Core/Helpers";
import Validator from "../Core/Validator";
import Register from "../Forms/Register";
import Login from "../Forms/Login";
import User from "../Entities/User";
import UserRepository from "../Repositories/UserRepository";
import View from "../Core/View";


module.exports = class UserController {

	PHJS;
	callback;

	constructor(PHJS,callback) {
		this.PHJS = PHJS;
		this.callback = callback;
	}

	async registerAction() {
		const form = Register();

		const datas = Helpers.getData(form.config.method,this.PHJS.args)
		const validator = new Validator(this.PHJS,form);

		if (validator.isSubmitted() && (await validator.isValid())) {
			let user = new User();
			user.setFirstname(datas.firstname);
			user.setLastname(datas.lastname);
			user.setEmail(datas.email);
			user.setPassword(datas.password);
			await user.save();
			this.loginAndRedirect(user);
			return;
		}

		let view = new View(this.PHJS, "register");
		view.assign("form", form);
		view.render();
		this.callback();
	}

	async loginAction() {
		const form = Login();

		const datas = Helpers.getData(form.config.method, this.PHJS.args);
		const validator = new Validator(this.PHJS,form);
		if (validator.isSubmitted() && (await validator.isValid())) {
			let user = await UserRepository.findOneByEmailAndPassword(datas.email, datas.password);

			if (user == null) {
				if (typeof(this.PHJS.session.errors) == "undefined") {
					this.PHJS.session.errors = {};
				}
				this.PHJS.session.errors[form.config.actionName] = [form.config.msgError];
			} else {
				this.loginAndRedirect(user);
				return;
			}
		}

		let view = new View(this.PHJS, "login");
		view.assign("form", form);
		view.render();
		this.callback();
	}

	logoutAction() {
		delete this.PHJS.session.user;

		this.PHJS.redirectTo(Helpers.getPath("Front", "index"));
		this.callback();
	}

	loginAndRedirect = (user: User) => {
		this.PHJS.session.user = user.serialize();
		this.PHJS.redirectTo(Helpers.getPath("Front", "index"));
		this.callback();
	}

};
