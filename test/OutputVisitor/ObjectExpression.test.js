const compareTraversal = require('./compareTraversal');

describe('ObjectExpression', function() {
  it('should generate correct syntax for objects 0 properties', function() {
    const testSrc = '{}';
    const expected = '{}';
    compareTraversal(testSrc, expected, 'ObjectExpression');
  });
  it('should generate correct syntax for single-line object expression', function() {
    const testSrc = '{ x: 1, y: 2 }';
    //This appears to have the same problem with ArrayExpressions, dropping all but the last property.
    const expected = '{x:1,y:2}';
    compareTraversal(testSrc, expected, 'ObjectExpression');
  });
  it('should generate correct syntax for multi-line object expression', function() {
    const testSrc =
    `{
      x: 1,
      y: 2
    }`;
    const expected = '{x:1,y:2}';
    compareTraversal(testSrc, expected, 'ObjectExpression');
  });
});
