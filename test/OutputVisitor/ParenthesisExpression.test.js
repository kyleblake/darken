const compareTraversal = require('./compareTraversal');

describe('ParenthesisExpression', function() {
  it('should generate correct syntax for parenthesis expression', function() {
    const testSrc ='(1 + 2)';
    const expected = '(1+2)';
    compareTraversal(testSrc, expected, 'ParenthesisExpression');
  });
});
