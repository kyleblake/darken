const compareTraversal = require('./compareTraversal');

describe('LogicExpression', function() {
  it('should generate correct syntax for "and"', function() {
    const testSrc ='1 and 2';
    const expected = '1 and 2';
    compareTraversal(testSrc, expected, 'LogicExpression');
  });
  it('should generate correct syntax for "not"', function() {
    const testSrc = 'not true';
    const expected = 'not true';
    compareTraversal(testSrc, expected, 'LogicExpression');
  });
  it('should generate correct syntax for a combination', function() {
    const testSrc = 'c and not b';
    const expected = 'c and not b';
    compareTraversal(testSrc, expected, 'LogicExpression');
  });
});
