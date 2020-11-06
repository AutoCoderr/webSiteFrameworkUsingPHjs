const DB = require("../../../www/Core/DB").default;

module.exports = function() { // console migration:migrate
    const db = new DB();
    db.migrate();
}