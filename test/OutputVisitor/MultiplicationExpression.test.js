const compareTraversal = require('./compareTraversal');

describe('MultiplicationExpression', function() {
  it('should generate correct syntax for multiplication expression', function() {
    const testSrc = '2 * 3';
    const expected = '2*3';
    compareTraversal(testSrc, expected, 'MultiplicationExpression');
  });
});
