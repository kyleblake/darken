const compareTraversal = require('./compareTraversal');

describe('PrintStatement', function() {
  it('should generate correct syntax for print statements', function() {
    const testSrc ='print "test"';
    const expected = '?"test"';
    compareTraversal(testSrc, expected, 'PrintStatement');
  });
});
