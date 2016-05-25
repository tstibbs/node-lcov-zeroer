var ZeroTransform = require('./lib/transform.js');
var fs = require('fs')
var LineStream = require('byline').LineStream;
var tmp = require('tmp');

tmp.setGracefulCleanup();

function convertFile(input, output, callback) {
	var source = fs.createReadStream(input);
	var dest = fs.createWriteStream(output);
	source.pipe(new LineStream()).pipe(new ZeroTransform()).pipe(dest).on('finish', function() {
		callback();
	});
}

module.exports = convertFile
