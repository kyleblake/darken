const compareTraversal = require('./compareTraversal');

describe('WhileStatement', function() {
  it('should generate correct syntax for print statements', function() {
    const testSrc =
    `while x < 10
    end while`;
    const expected = 'while x<10\nend while';
    compareTraversal(testSrc, expected, 'WhileStatement');
  });
});
