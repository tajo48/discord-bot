pkg = require('./package.json');

try {
	require("./script.js");
} catch (err) {
    console.log(err);
} 
