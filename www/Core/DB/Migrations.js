const app = require("./../../autoloader");
const env = require("./../../env");
const Sequelize = require("sequelize");

module.exports = class Migrations extends app.Core.DB.DB {

	constructor() {
		super();
	}

	migrate()  {
		for (let tableName in this.migrations) {
			let migration = this.migrations[tableName];

			let belongsTo = [];
			if (typeof(migration.belongsTo) == "string" || migration.belongsTo instanceof Array) {
				belongsTo = (migration.belongsTo instanceof Array) ? migration.belongsTo : [migration.belongsTo] ;
				delete migration.belongsTo;
			}

			this.tables[tableName] = this.sequelize.define(env.DB_PREFIX+tableName, migration);
			for (let i=0;i<belongsTo.length;i++) {
				this.tables[tableName].belongsTo(this.tables[belongsTo[i]]);
			}
		}
		this.executeMigrate(Object.keys(this.tables), 0);
	}

	executeMigrate(listTables, i) {
		if (i >= listTables.length) {
			console.log("Migration finished");
			this.sequelize.close();
			return;
		}
		let table = this.tables[listTables[i]];
		table.sync().then(() => {
			console.log(listTables[i]+" created!");
			this.executeMigrate(listTables,i+1)
		});
	}

	drop() {
		this.conn.connect((err) => {
			if (err) throw err;
			let tables = Object.keys(this.migrations).reverse();
			for (let i=0;i<tables.length;i++) {
				const table = env.DB_PREFIX+tables[i]+"s";
				this.conn.query("DROP TABLE "+table, (err, result) => {
					if (err) throw err;
					console.log("Table '"+table+"' deleted");
				});
			}
		});
	}

	tables = {};

	migrations = {
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
			password: {
				type: Sequelize.STRING(40),
				allowNull: false
			}
		},
		jouet: {
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
			belongsTo: [
				"user"
			]
		}
	};

};
