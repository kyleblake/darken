const compareTraversal = require('./compareTraversal');

describe('PostfixExpression', function() {
  it('should generate correct syntax for increment', function() {
    const testSrc = 'x++';
    const expected = 'x++';
    compareTraversal(testSrc, expected, 'PostfixExpression');
  });
  it('should generate correct syntax for decrement', function() {
    const testSrc = 'x--'
    const expected = 'x--';
    compareTraversal(testSrc, expected, 'PostfixExpression');
  });
});
