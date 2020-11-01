const app = require("./../autoloader");
const env = require("./../env");
const Sequelize = require("sequelize");
const mysql = require("mysql2");

module.exports = class DB {

	path;
	sequelize;
	conn;

	constructor() {
		this.sequelize = new Sequelize(env.DB_DRIVER+"://"+env.DB_USER+":"+env.DB_PASSWORD+"@"+env.DB_HOST+":"+env.DB_PORT+"/"+env.DB_NAME, { operatorsAliases: false });
		this.conn = mysql.createConnection({
			host: env.DB_HOST,
			user: env.DB_USER,
			password: env.DB_PASSWORD,
			port: env.DB_PORT,
			database: env.DB_NAME
		});
	}

	migrate()  {
		for (let tableName in this.migrations) {
			let migration = this.migrations[tableName];

			let belongsTo = [];
			if (typeof(migration.belongsTo) == "string" || migration.belongsTo instanceof Array) {
				belongsTo = (migration.belongsTo instanceof Array) ? migration.belongsTo : [migration.belongsTo] ;
				delete migration.belongsTo;
			}

			let hasMany = [];
			if (typeof(migration.hasMany) == "string" || migration.hasMany instanceof Array) {
				hasMany = (migration.hasMany instanceof Array) ? migration.hasMany : [migration.hasMany];
				delete migration.hasMany;
			}

			this.tables[tableName] = {};
			this.tables[tableName].table = this.sequelize.define(env.DB_PREFIX+tableName, migration);
			this.tables[tableName].belongsTo = belongsTo;
			this.tables[tableName].hasMany = hasMany;
		}
		for (let tableName in this.tables) {
			const table = this.tables[tableName];
			for (let belong of table.belongsTo) {
				console.log(tableName+" belongs to "+belong);
				table.table.belongsTo(this.tables[belong].table);
			}
			for (let has of table.hasMany) {
				console.log(tableName+" has many "+has);
				table.table.hasMany(this.tables[has].table);
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
		let table = this.tables[listTables[i]].table;
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
};
