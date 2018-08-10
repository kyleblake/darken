const compareTraversal = require('./compareTraversal');

describe('LibraryStatement', function() {
  it('should generate correct syntax', function() {
    const testSrc = 'library "testLib.brs"';
    const expected = 'library "testLib.brs"';
    compareTraversal(testSrc, expected, 'LibraryStatement');
  });
});
