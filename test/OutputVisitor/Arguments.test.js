const compareTraversal = require('./compareTraversal');

describe('Arguments', function() {
  it('should generate correct syntax for function calls with 0 arguments', function() {
    const testSrc = '()';
    const expected = '()';
    compareTraversal(testSrc, expected, 'Arguments');
  });
  it('should generate correct syntax for function calls with 1+ arguments', function() {
    const testSrc = '(x, y)';
    const expected = '(x,y)';
    compareTraversal(testSrc, expected, 'Arguments');
  });
});
