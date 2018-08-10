const compareTraversal = require('./compareTraversal');

describe('ForEachStatement', function() {
  it('should generate correct syntax for "for each" statements', function() {
    const testSrc =
      `for each p in {a: 1}
        print "loop"
      end for`
    const expected = 'for each p in {a:1}\n?"loop"\nend for';
    compareTraversal(testSrc, expected, 'ForEachStatement');
  });
});
