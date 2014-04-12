'use strict';

var nodecr = require('nodecr');

var slice = Array.prototype.slice;

// similar to normal thunkify, but puts callback after 1 argument rather than at end
function thunkify1(fn) {
	return function () {
		var args = [].slice.call(arguments);
		var results;
		var called;
		var cb;

		args.splice(1, 0, function () {
			results = arguments;

			if (cb && !called) {
				called = true;
				cb.apply(this, results);
			}
		});

		fn.apply(this, args);

		return function (fn) {
			cb = fn;

			if (results && !called) {
				called = true;
				fn.apply(this, results);
			}
		}
	}
};

module.exports = {
	process: thunkify1(nodecr.process.bind(nodecr)),
	preprocessors: nodecr.preprocessors
}