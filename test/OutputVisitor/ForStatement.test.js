const compareTraversal = require('./compareTraversal');

describe('ForStatement', function() {
  it('should generate correct syntax for "for" statements', function() {
    const testSrc =
    `for x = 0 to 10
        print "loop"
      end for`;
    const expected = 'for x=0 to 10\n?"loop"\nend for';
    compareTraversal(testSrc, expected, 'ForStatement');
  });
  it('should generate correct syntax when "step" is provided', function() {
    const testSrc =
    `for x = 0 to 10 step 2
        print "loop"
      end for`;
    const expected = 'for x=0 to 10 step 2\n?"loop"\nend for';
    compareTraversal(testSrc, expected, 'ForStatement');
  });
});
