const app = require("./../autoloader");

const Helpers = app.Core.Helpers;

module.exports =

class Validator {
	datas;

	constructor() {
		this.datas = {};
	}


	checkForm(PHJS,form) {
		if (form.config.method === "GET") {
			this.datas = PHJS.args.GET;
		} else if (form.config.method === "POST") {
			for (let key in PHJS.args.POST) {
				this.datas[key] = PHJS.args.POST[key].content;
			}
		}
		let errors = [];

		if (Object.keys(this.datas).length !== Object.keys(form.fields).length) {
			return ["Tentative de hack!!"];
		}

		for (let name in form.fields) {
			const field = form.fields[name];

			if (typeof(this.datas[name]) == "undefined") {
				errors.push("Champs '"+name+"' manquant!");
				continue;
			}

			if (field.required && this.datas[name] === "") {
				errors.push(("Champs '"+name+"' vide!"));
				continue;
			}

			if (this.datas[name].length < field.minLength && this.datas[name].length > field.maxLength) {
				errors.push(field.msgError)
			}

			if (
				(this.datas[name].length < field.minLength || this.datas[name].length > field.maxLength) ||

				(typeof(this["check"+Helpers.ucFirst(field.type)]) == "function" &&
				!this["check"+Helpers.ucFirst(field.type)](field,this.datas[name]))
			) {
				errors.push(field.msgError);
			}

		}

		return errors;
	}

	checkPassword(field,password) {
		return !((typeof(field.confirmWith) != "undefined" &&
			password !== this.datas[field.confirmWith]) ||

			(typeof(field.confirmWith) == "undefined" &&
				(!this.thereIsAMinChar(password) ||
				!this.thereIsAMinChar(password) ||
				!this.thereIsANumber(password) ||
				!this.thereIsASpecialChar(password))
			)
		);

	}

	checkEmail(field,email) {
		let regex = RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$");
		return regex.test(email);
	}

	thereIsASpecialChar(str) {
		const specialChars = "?.*$_-#&<>";
		for (let i=0;i<specialChars.length;i++) {
			if (str !== str.replace(specialChars[i],"")) {
				return true;
			}
		}
		return false;
	}

	thereIsANumber(str) {
		const numbers = "0123456789";
		for (let i=0;i<numbers.length;i++) {
			if (str !== str.replace(numbers[i],"")) {
				return true;
			}
		}
		return false;
	}

	thereIsAMajChar(str) {
		const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		for (let i=0;i<alphabet.length;i++) {
			if (str !== str.replace(alphabet[i],"")) {
				return true;
			}
		}
		return false;
	}

	thereIsAMinChar(str) {
		const alphabet = "abcdefghijklmnopqrstuvwxyz";
		for (let i=0;i<alphabet.length;i++) {
			if (str !== str.replace(alphabet[i],"")) {
				return true;
			}
		}
		return false;
	}

};
