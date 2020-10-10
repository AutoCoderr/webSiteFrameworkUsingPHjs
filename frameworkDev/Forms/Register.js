const app = require("./../autoloader");

module.exports = function Register() {
	return {
		config: {
			action: app.Core.Helpers.getPath("User", "add"),
			method: "POST",
			submit: "S'inscrire",
			actionName: "register"
		},
		fields: {
			firstname: {
				type: "text",
				label: "Votre prénom",
				required: true,
				maxLength: 50,
				minLength: 2,
				msgError: "Le prénom doit faire de 2 à 50 caractères"
			},
			lastname: {
				type: "text",
				label: "Votre nom",
				required: true,
				maxLength: 50,
				minLength: 2,
				msgError: "Le nom doit faire de 2 à 50 caractères"
			},
			email: {
				type: "email",
				label: "Votre adresse mail",
				required: true,
				maxLength: 50,
				minLength: 3,
				msgError: "Format d'email incorrect"
			},
			password: {
				type: "password",
				label: "Votre mot de passe",
				minLength: 8,
				required: true,
				msgError: "Format de mot de passe incorrect"
			},
			passwordConfirm: {
				type: "password",
				label: "Veuillez confirmer votre mot de passe",
				confirmWith: "password",
				required: true,
				msgError: "Les mots de passe ne correspondent pas"
			}
		}
	}
};
