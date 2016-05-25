// run using 'node node_modules/lcov-zeroer/cli.js ./coverage/lcov.info ./coverage/lcov.info.baseline'

var zeroer = require('./index.js')

var inputFile = process.argv[2];
var outputFile = process.argv[3];

zeroer(inputFile, outputFile, function() {
	console.log('Finished zeroing file ' + inputFile);
});
