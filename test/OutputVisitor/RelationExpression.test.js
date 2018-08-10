const compareTraversal = require('./compareTraversal');

describe('RelationExpression', function() {
  it('should generate correct syntax for greater than', function() {
    const testSrc = 'x > 1';
    const expected = 'x>1';
    compareTraversal(testSrc, expected, 'RelationExpression');
  });
  it('should generate correct syntax for greater than or equals', function() {
    const testSrc = 'x >= 1';
    const expected = 'x>=1';
    compareTraversal(testSrc, expected, 'RelationExpression');
  });
  it('should generate correct syntax for less than', function() {
    const testSrc = 'x < 1';
    const expected = 'x<1';
    compareTraversal(testSrc, expected, 'RelationExpression');
  });
  it('should generate correct syntax for less than or equals', function() {
    const testSrc = 'x <= 1';
    const expected = 'x<=1';
    compareTraversal(testSrc, expected, 'RelationExpression');
  });
  it('should generate correct syntax for equality', function() {
    const testSrc = 'x = 1';
    const expected = 'x=1';
    compareTraversal(testSrc, expected, 'RelationExpression');
  });
  it('should generate correct syntax for inequality', function() {
    const testSrc = 'x <> 1';
    const expected = 'x<>1';
    compareTraversal(testSrc, expected, 'RelationExpression');
  });
});
