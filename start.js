const PHjs = require("./PHjs");

const options = {};

const libs = {util: require("util")};

PHjs(__dirname+"/frameworkDev/","http",5001,options,libs,__dirname+"/access.log",__dirname+"/error.log",__dirname+"/config.txt");
