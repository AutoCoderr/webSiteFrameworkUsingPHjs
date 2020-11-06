const Sequelize = require("sequelize");

module.exports = {
	user: {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING(50),
			allowNull: false
		},
		firstname: {
			type: Sequelize.STRING(50),
			allowNull: false
		},
		lastname: {
			type: Sequelize.STRING(50),
			allowNull: false
		},
		permission: {
			type: Sequelize.ENUM(["admin", "seller", "user"]),
			defaultValue: "user"
		},
		password: {
			type: Sequelize.STRING(40),
			allowNull: false
		},
		hasMany: "exemplaire"
	},
	produit: {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
		name: {
			type: Sequelize.STRING(30),
			allowNull: false
		},
		description: {
			type: Sequelize.STRING(255),
			allowNull: false
		},
		units: {
			type: Sequelize.INTEGER,
			defaultValue: 0
		},
		hasMany: "exemplaire"
	},
	exemplaire: {
		units: {
			type: Sequelize.INTEGER,
			defaultValue: 1
		},
		belongsTo: [
			"user",
			'produit'
		]
	}

};
