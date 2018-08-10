const compareTraversal = require('./compareTraversal');

describe('EmptyStatement', function() {
  it('should generate correct syntax for empty statements', function() {
    const testSrc ='\n';
    const expected = '\n';
    compareTraversal(testSrc, expected, 'EmptyStatement');
  });
});
