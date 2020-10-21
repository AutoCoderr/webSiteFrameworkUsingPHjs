const fs = require('fs-extra'),
    Helpers = require('../../../www/Core/Helpers');

module.exports = function () {
    if (process.argv[3] === undefined) {
        console.log("You need to mentionne a controller name like that :");
        console.log("\tmake:controller Hello");
        return;
    }

    const variables = {
        view_path: process.argv[3]+"/index",
        controller_name: Helpers.ucFirst(process.argv[3])+"Controller"
    };

    fs.readFile(__dirname+"/../../../www/routes.json", 'utf-8', function(error, content) {
        let routes = JSON.parse(content);
        routes["/"+process.argv[3]] = {
            controller: Helpers.ucFirst(process.argv[3]),
            action: "index"
        };

        fs.writeFile(__dirname+'/../../../www/routes.json', JSON.stringify(routes, null, "\t"), function (err) {
            if (err) throw console.log(err);
            console.log('Route \'/'+process.argv[3]+'\' added in routes.json');
        });
    });

    fs.readFile(__dirname+"/../../../www/Core/Types/ControllerType.js", 'utf-8', function(error, content) {
        if (error) throw error;
        for (let variable in variables) {
            content = Helpers.replaceAll(content, "__"+variable+"__", variables[variable]);
        }

        fs.writeFile(__dirname+'/../../../www/Controllers/'+variables.controller_name+".js", content, function (err) {
            if (err) throw console.log(err);
            console.log('Controller '+variables.controller_name+' created');
        });

    });
    fs.readFile(__dirname+"/../../../www/Core/Types/ViewType.phjs", 'utf-8', function(err, content) {
        if (err) throw err;
        for (let variable in variables) {
            content = Helpers.replaceAll(content, "__"+variable+"__", variables[variable]);
        }

        fs.mkdir(__dirname+"/../../../www/Views/"+variables.view_path.split("/")[0], function(err) {
            if (err && err.message.split(":")[0] !== "EEXIST") {
                throw console.log(err)
            }

            fs.writeFile(__dirname+'/../../../www/Views/'+variables.view_path+".phjs", content, function (err) {
                if (err) throw console.log(err);
                console.log('View '+variables.view_path+' created');
            });
        })
    });
}