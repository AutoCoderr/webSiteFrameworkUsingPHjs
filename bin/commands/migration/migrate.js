const Migration = require("../../../www/Core/Migration").default;

module.exports = async function() { // console migration:migrate
    await Migration.migrate();
    process.exit();
}