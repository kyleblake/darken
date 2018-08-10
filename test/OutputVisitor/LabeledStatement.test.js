const compareTraversal = require('./compareTraversal');

describe('Labels and Goto Statements', function() {
  describe('LabeledStatement', function() {
    it('should generate correct syntax for labels', function() {
      const testSrc =
      `testLabel:
        print "foo"`;
      const expected = 'testLabel:\n?"foo"';
      compareTraversal(testSrc, expected, 'LabeledStatement');
    });
  });

  describe('GoToStatement', function() {
    it('should generate correct syntax for goto statements', function() {
      const testSrc = 'goto testLabel';
      const expected = 'goto testLabel';
      compareTraversal(testSrc, expected, 'GoToStatement');
    });
  });
});
