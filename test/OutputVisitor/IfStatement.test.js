const compareTraversal = require('./compareTraversal');

describe('If, ElseIf, and Else Statements', function() {
  describe('IfStatement', function() {
    it('should generate correct syntax for single line statements', function() {
      const testSrc = 'if test x = 1';
      const expected = 'if test x=1';
      compareTraversal(testSrc, expected, 'IfStatement');
    });
    it('should generate correct syntax with block forms', function() {
      const testSrc =
      `if test
          x = 1
          y = 2
        end if`;
      const expected = 'if test\nx=1\ny=2\nend if';
      compareTraversal(testSrc, expected, 'IfStatement');
    });
  });

  describe('ElseIfStatement', function() {
    it('should generate correct syntax for "else if"', function() {
      const testSrc =
      `elseif test2
          y = 2`
      const expected = 'else if test2\ny=2\n';
      compareTraversal(testSrc, expected, 'ElseIfStatement');
    });
  });

  describe('ElseStatement', function() {
    it('should generate correct syntax for single line statements', function() {
      const testSrc = 'else y = 2';
      const expected = 'else y=2';
      compareTraversal(testSrc, expected, 'ElseStatement');
    });
    it('should work for blocks', function() {
      const testSrc =
      `else
          y = 2`;
      const expected = 'else \ny=2\n';
      compareTraversal(testSrc, expected, 'ElseStatement');
    });
  });
});
