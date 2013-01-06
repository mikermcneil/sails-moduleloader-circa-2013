var _ = require('underscore');


module.exports = {
	required: function(options) {
		return buildDictionary(options);
	},

	optional: function(options) {
		options.optional = true;
		return buildDictionary(options);
	}
};

// buildDictionary ()
// Go through each object, include the code, and determine its identity.
// Tolerates non-existent files/directories by ignoring them.
//
// @dirname		:: the path to the source directory
// @filter		:: the filter regex
// $replaceExpr	:: the replace regex
// @optional	:: if optional, don't throw an error if nothing is found
// @fullPathKeyNames	:: whether to use the full path as the key name (instead of just the filename)
function buildDictionary(options) {
	
	var files = require('include-all')(options);
	var objects = {};
	_.each(files, function(module, filename) {
		
		// If no 'identity' attribute was provided, 
		// take a guess based on the (case-insensitive) filename
		if(!module.identity) {
			module.identity = options.replaceExpr ? filename.replace(options.replaceExpr, "") : filename;
			module.identity = module.identity.toLowerCase();
		}
		objects[module.identity] = module;
	});	
	if(!objects) return {};
	return objects;
}