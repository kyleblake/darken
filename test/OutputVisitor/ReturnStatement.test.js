const compareTraversal = require('./compareTraversal');

describe('ReturnStatement', function() {
  it('should generate correct syntax for print statements', function() {
    const testSrc ='return x';
    const expected = 'return x ';
    compareTraversal(testSrc, expected, 'ReturnStatement');
  });
});
