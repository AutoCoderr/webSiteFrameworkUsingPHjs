const env = require("./../env");
const Sequelize = require("sequelize");
const mysql = require("mysql2");
const fs = require("fs-extra");

export default class DB {

	path;
	sequelize;
	conn;

	constructor() {
		this.migrations = this.getLatestMigration();
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
				table.table.belongsTo(this.tables[belong].table);
			}
			for (let has of table.hasMany) {
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

	getLatestMigration() {
		const folder = __dirname+"/migrations";

		let files = fs.readdirSync(folder);
		return require(folder+"/"+files.reverse()[0]);
	}

	tables: Object = {};
	migrations: Object = {};
};
