var stream = require('stream');
var util = require('util');
var transform = new stream.Transform( { objectMode: true } )

/* This class assumes we get the chunks one line at a time */

//see http://ltp.sourceforge.net/coverage/lcov/geninfo.1.php for full details of the cov files
var regexes = [
	// Next,  there  is a list of execution counts for each instrumented function:
	// FNDA:<execution count>,<function name>
	/^(FNDA\:)\d+(,.+)/,
	// FNH:<number of function hit>
	/^(FNH\:)\d+/,
	// Branch coverage information is stored which one line per branch:
	// BRDA:<line number>,<block number>,<branch number>,<taken>
	/^(BRDA\:\d+,\d+,\d+,)\d+/,
	// BRH:<number of branches hit>
	/^(BRH\:)\d+/,
	// Then  there  is  a  list of execution counts for each instrumented line (i.e. a line which resulted in executable code):
	// DA:<line number>,<execution count>[,<checksum>]
	/^(DA\:\d+,)\d+(,.+)?/,
	//LH:<number of lines with a non-zero execution count>
	/^(LH\:)\d+/
];

function ZeroTransform(options) {
  stream.Transform.call(this, options);
}
util.inherits(ZeroTransform, stream.Transform);

ZeroTransform.prototype._transform = function (chunk, encoding, done) {
	var input = chunk.toString();
	
	var found = false;
	for (var i = 0; i < regexes.length; i++) {
		var regex = regexes[i];
		if (regex.test(input)) {
			var match = input.match(regex);
			var newString = match[1] + "0";
			if (match[2] !== undefined) {
				newString += match[2];
			}
			this.push(newString);
			found = true;
			break;
		}
	}

	if (!found) { //didn't match any lines to be converted, so just send through as-is.
		this.push(input);
	}

	this.push("\n");
	done();
}
 
module.exports = ZeroTransform;
