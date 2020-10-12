const app = require("./../autoloader");

module.exports = function Login() {
	return {
		config: {
			action: app.Core.Helpers.getPath("User", "connect"),
			method: "POST",
			submit: "Se connecter",
			actionName: "login",
			msgError: "Erreur lors de la connexion"
		},
		fields: {
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
			}
		}
	}
};
