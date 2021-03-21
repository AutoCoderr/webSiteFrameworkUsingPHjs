import Helpers from "./Helpers";


export default class Validator {
	datas;

	constructor() {}


	checkForm(PHJS,form,callback) {
		this.datas = Helpers.getData(form.config.method,PHJS.args);

		if (Object.keys(this.datas).length !== Object.keys(form.fields).length) {
			return ["Tentative de hack!!"];
		}
		this.checkFieldsLoop(Object.keys(form.fields), form.fields, [], callback);
	}

	checkFieldsLoop(names,fields,errors,callback, i=0) {
		if (i >= names.length) {
			callback(errors);
		} else {
			const name = names[i];
			const field = fields[name];

			if (typeof(this.datas[name]) == "undefined") {
				errors.push("Champs '"+name+"' manquant!");
				this.checkFieldsLoop(names,fields,errors,callback,i+1);
				return;
			}

			if (field.required && this.datas[name] === "") {
				errors.push(("Champs '"+name+"' vide!"));
				this.checkFieldsLoop(names,fields,errors,callback,i+1);
				return;
			}

			if (this.datas[name].length < field.minLength && this.datas[name].length > field.maxLength) {
				errors.push(field.msgError);
				this.checkFieldsLoop(names,fields,errors,callback,i+1);
				return;
			}

			if (
				(this.datas[name].length < field.minLength || this.datas[name].length > field.maxLength) ||

				(typeof(this["check"+Helpers.ucFirst(field.type)]) == "function" &&
					!this["check"+Helpers.ucFirst(field.type)](field,this.datas[name]))
			) {
				errors.push(field.msgError);
				this.checkFieldsLoop(names,fields,errors,callback,i+1);
				return;

			} else if (typeof(field.uniq) != "undefined") {
				// @ts-ignore
				let repository = require("../Repositories/"+field.uniq.table+"Repository").default;

				let where = {};
				where[field.uniq.column] = this.datas[name];
				repository.findOneByParams({where}).then((elem) => {
					if (elem != null) {
						errors.push(field.uniq.msgError);
					}
					this.checkFieldsLoop(names,fields,errors,callback,i+1);
				});
				return;
			}

			this.checkFieldsLoop(names,fields,errors,callback,i+1);
		}
	}


	checkPassword(field,password) {
		return !((typeof(field.confirmWith) != "undefined" &&
			password !== this.datas[field.confirmWith]) ||

			(typeof(field.confirmWith) == "undefined" &&
				(!this.thereIsAMinChar(password) ||
				!this.thereIsANumber(password) ||
				!this.thereIsASpecialChar(password))
			)
		);

	}

	checkEmail(field,email) {
		let regex = RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$");
		let res = regex.test(email);
		return res;
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

}
