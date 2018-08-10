const compareTraversal = require('./compareTraversal');

describe('ParameterList', function() {
  it('should generate correct syntax for functions with a single parameter', function() {
    const testSrc = '(x)';
    const expected = '(x)';
    compareTraversal(testSrc, expected, 'ParameterList');
  });
  it('should generate correct syntax for functions with a multiple parameters', function() {
    const testSrc =`(x, y, z)`;
    const expected = '(x,y,z)';
    compareTraversal(testSrc, expected, 'ParameterList');
  });
});
