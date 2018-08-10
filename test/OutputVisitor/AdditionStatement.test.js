const compareTraversal = require('./compareTraversal');

describe('AdditionExpression', function() {
  it('should generate correct syntax for x + y', function() {
    const testSrc = 'x + 2';
    const expected = 'x+2';
    compareTraversal(testSrc, expected, 'AdditionExpression');
  });
});
