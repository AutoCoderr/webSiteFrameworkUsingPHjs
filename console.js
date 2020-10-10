const Migrations = require("./frameworkDev/Core/DB/Migrations");

const actions = {
	migration: {
		migrate: function() { // console migration:migrate
			const migration = new Migrations();
			migration.migrate();
		},
		drop: function() { // console migration:drop
			const migration = new Migrations();
			migration.drop();
		},
		default: function () {
			console.log("Possibles options :");
			console.log(" - migration:migrate");
			console.log(" - migration:drop");
		}
	}
};

const first = process.argv[2].split(':')[0],
	second = typeof(process.argv[2].split(':')[1]) != "undefined" ? process.argv[2].split(':')[1] : "";

for (let action in actions) {
	if (action === first) {
		if (second !== "" ) {
			for (let subaction in actions[action]) {
				if (subaction === process.argv[2].split(':')[1]) {
					actions[action][subaction]();
					return;
				}
			}
		} else if (typeof(actions[action].default) != "undefined") {
			actions[action].default();
			return;
		}
	}
}
console.log("Wrong command");
