const compareTraversal = require('./compareTraversal');

describe('ArrayExpression / ArrayElement', function() {
  it('should generate correct syntax for arrays with 0 elements', function() {
    const testSrc = '[]';
    const expected = '[]';
    compareTraversal(testSrc, expected, 'ArrayExpression');
  });
  it('should generate correct syntax for arrays expression on a single line with multiple arguments', function() {
    const testSrc = `[1, 2]`;
    // I don't understand why this is coming out 'sub test()\nx=[2]\nend sub'
    // Something seems to be wrong with the Bright AST output. Works in Roku project.
    const expected = '[1,2]';
    compareTraversal(testSrc, expected, 'ArrayExpression');
  });
  it('should for generate correct syntax for arrays expression on a multiple lines with multiple arguments', function() {
    const testSrc =
      `[
        1,
        2
      ]`;
    const expected = '[1,2]';
    compareTraversal(testSrc, expected, 'ArrayExpression');
  });
});
