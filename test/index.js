var zeroer = require('../index');
var fs = require('fs')
var tmp = require('tmp');
require('should');

//run test
function runTest(sampleFileName, done) {
	var sampleTmp = tmp.fileSync({ prefix: 'node-lcov-zeroer-', postfix: '.out' });
	zeroer('test/samples/' + sampleFileName + '.input', sampleTmp.name, function() {
		//compare test output with expected
		var expected = fs.readFileSync('test/samples/' + sampleFileName + '.output');
		var actual = fs.readFileSync(sampleTmp.name);
		expected.toString().should.equal(actual.toString());
		//clear up
		fs.unlinkSync(sampleTmp.name);
		done();
	});
}

describe('zeroer', function() {
	it('should convert sample 1', function(done) {
		runTest('sample1', done);
	});
	it('should convert sample 2', function(done) {
		runTest('sample2', done);
	});
});
