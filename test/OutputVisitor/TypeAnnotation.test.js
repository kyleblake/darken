const compareTraversal = require('./compareTraversal');

describe('TypeAnnotation', function() {
  it('should generate correct syntax for print statements', function() {
    const testSrc ='Integer';
    const expected = ' as Integer';
    compareTraversal(testSrc, expected, 'TypeAnnotation');
  });
});
