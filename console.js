const DB = require("./www/Core/DB"),
	Helpers = require('./www/Core/Helpers'),
	fs = require('fs-extra');

const actions = {
	help: {
		default: function () {
			console.log("You can run :");
			console.log("\t- migration");
			console.log("\t- make");
		}
	},
	migration: {
		migrate: function() { // console migration:migrate
			const db = new DB();
			db.migrate();
		},
		drop: function() { // console migration:drop
			const db = new DB();
			db.drop();
		},
		default: function () {
			console.log("Possibles options :");
			console.log("\t- migration:migrate");
			console.log("\t- migration:drop");
		}
	},
	make: {
		default: function () {
			console.log("Possibles options :");
			console.log("\t- make:controller");
		},
		controller: function () { // console make:controller myController
			if (process.argv[3] === undefined) {
				console.log("You need to mentionne a controller name like that :");
				console.log("\tmake:controller Hello");
				return;
			}

			const variables = {
				view_path: process.argv[3]+"/index",
				controller_name: Helpers.ucFirst(process.argv[3])+"Controller"
			};

			fs.readFile("./www/routes.json", 'utf-8', function(error, content) {
				let routes = JSON.parse(content);
				routes["/"+process.argv[3]] = {
					controller: Helpers.ucFirst(process.argv[3]),
					action: "index"
				};

				fs.writeFile('./www/routes.json', JSON.stringify(routes, null, "\t"), function (err) {
					if (err) throw console.log(err);
					console.log('Route \'/'+process.argv[3]+'\' added in routes.json');
				});
			});

			fs.readFile("./www/Core/Types/ControllerType.js", 'utf-8', function(error, content) {
				if (error) throw error;
				for (let variable in variables) {
					content = Helpers.replaceAll(content, "__"+variable+"__", variables[variable]);
				}

				fs.writeFile('./www/Controllers/'+variables.controller_name+".js", content, function (err) {
					if (err) throw console.log(err);
					console.log('Controller '+variables.controller_name+' created');
				});

			});

			fs.readFile("./www/Core/Types/ViewType.phjs", 'utf-8', function(err, content) {
				if (err) throw err;
				for (let variable in variables) {
					content = Helpers.replaceAll(content, "__"+variable+"__", variables[variable]);
				}

				fs.mkdir("./www/Views/"+variables.view_path.split("/")[0], function(err) {
					if (err && err.message.split(":")[0] !== "EEXIST") {
						throw console.log(err)
					}

					fs.writeFile('./www/Views/'+variables.view_path+".phjs", content, function (err) {
						if (err) throw console.log(err);
						console.log('View '+variables.view_path+' created');
					});
				})
			});
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
