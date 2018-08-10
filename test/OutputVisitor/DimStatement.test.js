const compareTraversal = require('./compareTraversal');

describe('DimStatement', function() {
  it('should generate correct syntax for one dimension', function() {
    const testSrc = 'dim x[5]'
    // This test also fails because all of the ArrayExpression elements except the last seem
    // to be dropped by the Bright AST generator
    // See ArrayExpression.test.js
    const expected = 'dim x[5]';
    compareTraversal(testSrc, expected, 'DimStatement');
  });
  it('should generate correct syntax for multiple dimensions', function() {
    const testSrc = 'dim x[5, 5, 5]';
    // This test also fails because all of the ArrayExpression elements except the last seem
    // to be dropped by the Bright AST generator
    // See ArrayExpression.test.js
    const expected = 'dim x[5, 5 ,5]';
    compareTraversal(testSrc, expected, 'DimStatement');
  });
});
